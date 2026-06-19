import pw from '/Users/paolo/.nvm/versions/node/v25.2.1/lib/node_modules/playwright/index.js';
const { chromium } = pw;
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const ORIGIN = 'https://www.apple.com/';
const SLUG = 'home';
const ROOT = path.resolve('stardust/current');
const ISO = new Date().toISOString();

function dl(url, dest) {
  return new Promise((res) => {
    try {
      const mod = url.startsWith('https') ? https : http;
      const f = fs.createWriteStream(dest);
      mod.get(url, { headers: { 'user-agent': 'Mozilla/5.0' } }, (r) => {
        if (r.statusCode >= 400) { f.close(); res(false); return; }
        r.pipe(f); f.on('finish', () => f.close(() => res(true)));
      }).on('error', () => res(false));
    } catch { res(false); }
  });
}

async function launch() {
  // Try headless first; on H2 fingerprint failure, fall back to headed real Chrome.
  let technique = 'headless-chromium';
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2,
      colorScheme: 'light', locale: 'en-US', reducedMotion: 'reduce',
      ignoreHTTPSErrors: true,
    });
    const p = await ctx.newPage();
    const resp = await p.goto(ORIGIN, { waitUntil: 'domcontentloaded', timeout: 15000 });
    if (!resp || resp.status() >= 400) throw new Error('bad status ' + (resp && resp.status()));
    await p.close(); await ctx.close();
    return { browser, technique };
  } catch (e) {
    if (browser) await browser.close().catch(() => {});
    technique = 'headed-chrome-fallback';
    const b2 = await chromium.launch({ headless: false, channel: 'chrome' });
    return { browser: b2, technique };
  }
}

const { browser, technique } = await launch();
const fontResponses = new Map();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2,
  colorScheme: 'light', locale: 'en-US', reducedMotion: 'reduce',
  ignoreHTTPSErrors: true,
});
ctx.on('response', async (r) => {
  const u = r.url();
  if (/\.(woff2?|ttf|otf|eot)(\?|$)/i.test(u) || (r.headers()['content-type'] || '').startsWith('font/')) {
    if (!fontResponses.has(u)) {
      try { fontResponses.set(u, await r.body()); } catch {}
    }
  }
});

const page = await ctx.newPage();

// consent dismissal pre-flight
let consentMethod = 'none-detected';
try {
  await page.goto(ORIGIN, { waitUntil: 'domcontentloaded', timeout: 30000 });
  consentMethod = await page.evaluate(() => {
    try { if (window.OneTrust?.RejectAll) { window.OneTrust.RejectAll(); return 'api:OneTrust.RejectAll'; } } catch {}
    return null;
  }) || 'none-detected';
} catch {}

// navigation (medium wait)
const navResp = await page.goto(ORIGIN, { waitUntil: 'domcontentloaded', timeout: 30000 });
const httpStatus = navResp ? navResp.status() : 0;
const finalUrl = page.url();
const t0 = Date.now();
await page.waitForTimeout(2000); // grace
// scroll pass
const vh = 900;
for (let i = 1; i <= 4; i++) { await page.evaluate((y) => window.scrollTo(0, y), vh * i); await page.waitForTimeout(300); }
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
const waitMs = Date.now() - t0;

const cap = await page.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const cs = (el, p) => getComputedStyle(el).getPropertyValue(p);
  const meta = (sel, attr = 'content') => { const e = document.querySelector(sel); return e ? e.getAttribute(attr) : null; };

  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].slice(0, 80).map((h) => {
    const c = getComputedStyle(h);
    return { tag: h.tagName.toLowerCase(), text: norm(h.innerText), fontFamily: c.fontFamily, fontWeight: c.fontWeight, fontSize: c.fontSize, lineHeight: c.lineHeight, letterSpacing: c.letterSpacing, color: c.color };
  }).filter((h) => h.text);

  const landmarkSel = 'header,nav,main,aside,footer,[role=banner],[role=navigation],[role=main],[role=complementary],[role=contentinfo],[role=region]';
  const landmarks = [...document.querySelectorAll(landmarkSel)].slice(0, 40).map((el) => {
    const c = getComputedStyle(el);
    return { tag: el.tagName.toLowerCase(), role: el.getAttribute('role') || null, id: el.id || null, class: (el.className && el.className.toString().slice(0, 120)) || null, childCount: el.children.length, bg: c.backgroundColor, color: c.color, text: norm(el.innerText).slice(0, 2000) };
  });

  // CTA inventory
  const ctas = [];
  [...document.querySelectorAll('a,button,[role=button]')].forEach((el) => {
    const c = getComputedStyle(el);
    const label = norm(el.innerText || el.getAttribute('aria-label'));
    if (!label || label.length > 40) return;
    const radius = parseFloat(c.borderRadius) || 0;
    const bg = c.backgroundColor;
    const hasBg = bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
    if (hasBg && radius > 2) {
      ctas.push({ label, href: el.getAttribute('href') || null, bg, color: c.color, fontFamily: c.fontFamily, fontWeight: c.fontWeight, borderRadius: c.borderRadius, padding: c.padding });
    }
  });
  const seen = new Set();
  const ctasU = ctas.filter((c) => { const k = c.label.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 30);

  // links
  const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter(Boolean);

  // media: imgs
  const imgs = [...document.querySelectorAll('img')].map((im) => ({ src: im.currentSrc || im.src, srcset: im.getAttribute('srcset') || null, alt: im.getAttribute('alt') || null, w: im.naturalWidth, h: im.naturalHeight })).filter((im) => im.src && im.w > 50);

  // css backgrounds (visible, >=100x80)
  const cssBackgrounds = [];
  [...document.querySelectorAll('*')].forEach((el) => {
    const c = getComputedStyle(el);
    const bi = c.backgroundImage;
    if (bi && bi !== 'none' && bi.includes('url(')) {
      const r = el.getBoundingClientRect();
      if (r.width >= 100 && r.height >= 80) {
        const urls = [...bi.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map((m) => m[1]);
        cssBackgrounds.push({ urls, rect: { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top) }, backgroundSize: c.backgroundSize, backgroundPosition: c.backgroundPosition });
      }
    }
  });

  // color frequency across many elements
  const colorCount = {};
  const bump = (col) => { if (!col || col === 'rgba(0, 0, 0, 0)') return; colorCount[col] = (colorCount[col] || 0) + 1; };
  [...document.querySelectorAll('body *')].slice(0, 4000).forEach((el) => { const c = getComputedStyle(el); bump(c.color); bump(c.backgroundColor); });

  // fonts in use
  const fontCount = {};
  [...document.querySelectorAll('body *')].slice(0, 4000).forEach((el) => { const f = getComputedStyle(el).fontFamily; if (f) fontCount[f] = (fontCount[f] || 0) + 1; });

  // radius / shadow modes
  const radiusCount = {}; const shadowCount = {};
  [...document.querySelectorAll('body *')].slice(0, 4000).forEach((el) => { const c = getComputedStyle(el); const r = c.borderRadius; if (r && r !== '0px') radiusCount[r] = (radiusCount[r] || 0) + 1; const s = c.boxShadow; if (s && s !== 'none') shadowCount[s] = (shadowCount[s] || 0) + 1; });

  // css custom props
  const rootStyle = getComputedStyle(document.documentElement);
  const customProps = [];
  for (let i = 0; i < rootStyle.length; i++) { const n = rootStyle[i]; if (n.startsWith('--')) customProps.push({ name: n, value: rootStyle.getPropertyValue(n).trim().slice(0, 80) }); }

  // body paragraphs
  const body = [...document.querySelectorAll('p')].map((p) => norm(p.textContent)).filter((t) => t.length > 30).slice(0, 20);

  return {
    title: document.title,
    description: meta('meta[name=description]'),
    og: { title: meta('meta[property="og:title"]'), description: meta('meta[property="og:description"]'), image: meta('meta[property="og:image"]'), type: meta('meta[property="og:type"]'), siteName: meta('meta[property="og:site_name"]') },
    themeColor: meta('meta[name=theme-color]'),
    appleTouchIcon: (document.querySelector('link[rel="apple-touch-icon"]') || {}).href || null,
    favicon: (document.querySelector('link[rel="icon"],link[rel="shortcut icon"]') || {}).href || null,
    headings, landmarks, ctas: ctasU,
    links: { all: links },
    media: { imgs: imgs.slice(0, 60), cssBackgrounds: cssBackgrounds.slice(0, 40), inlineSvgCount: document.querySelectorAll('svg').length, videoCount: document.querySelectorAll('video').length, iframeCount: document.querySelectorAll('iframe').length },
    colorCount, fontCount, radiusCount, shadowCount, customProps, body,
  };
});

// screenshot
await page.screenshot({ path: path.join(ROOT, 'assets/screenshots', SLUG + '.png'), fullPage: true }).catch(() => {});

// save fonts
const fontFiles = [];
for (const [u, buf] of fontResponses) {
  try { const base = u.split('?')[0].split('/').pop(); const dest = path.join(ROOT, 'assets/fonts', base); fs.writeFileSync(dest, buf); fontFiles.push({ url: u, localPath: 'assets/fonts/' + base }); } catch {}
}

// helpers: sort counts
const topN = (obj, n) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({ value: k, count: v }));

// logo: try apple inline svg / nav glyph -> apple uses an SVG apple logo in nav
let logoSaved = null;
try {
  const logoSvg = await page.evaluate(() => {
    const el = document.querySelector('nav svg, header svg, [aria-label="Apple"] svg, .globalnav-logo');
    if (el && el.tagName.toLowerCase() === 'svg') return el.outerHTML;
    return null;
  });
  if (logoSvg) { fs.writeFileSync(path.join(ROOT, 'assets/logo.svg'), logoSvg); logoSaved = 'assets/logo.svg (inline svg)'; }
} catch {}
if (!logoSaved && cap.appleTouchIcon) { const ok = await dl(cap.appleTouchIcon, path.join(ROOT, 'assets/logo.png')); if (ok) logoSaved = 'assets/logo.png (apple-touch-icon)'; }

// download hero/top images (first few large)
const heroImgs = cap.media.imgs.filter((i) => i.w >= 600).slice(0, 6);
const savedMedia = [];
for (let i = 0; i < heroImgs.length; i++) {
  const im = heroImgs[i]; const ext = (im.src.split('?')[0].split('.').pop() || 'jpg').slice(0, 4);
  const dest = path.join(ROOT, 'assets/media', `img${i}.${ext}`);
  const ok = await dl(im.src, dest); if (ok) savedMedia.push({ src: im.src, localPath: 'assets/media/' + `img${i}.${ext}`, w: im.w, h: im.h, alt: im.alt });
}

const provenance = { renderedBy: 'playwright', fetchedAt: ISO, waitMs, waitMode: 'medium', httpStatus, finalUrl, fetchTechnique: technique, consentMethod };

const pageJson = { _provenance: provenance, slug: SLUG, url: ORIGIN, ...cap };
fs.writeFileSync(path.join(ROOT, 'pages', SLUG + '.json'), JSON.stringify(pageJson, null, 2));

// crawl log
fs.writeFileSync(path.join(ROOT, '_crawl-log.json'), JSON.stringify({ _provenance: { writtenBy: 'stardust:extract', writtenAt: ISO, againstInput: ORIGIN }, discovery: { mode: 'single', fetchTechnique: technique, waitMode: 'medium' }, consent: { method: consentMethod }, crawl: { crawled: [SLUG], failures: [] } }, null, 2));

const out = {
  technique, httpStatus, finalUrl, waitMs,
  topColors: topN(cap.colorCount, 12), topFonts: topN(cap.fontCount, 8),
  topRadius: topN(cap.radiusCount, 6), topShadow: topN(cap.shadowCount, 4),
  headingCount: cap.headings.length, ctaCount: cap.ctas.length,
  imgCount: cap.media.imgs.length, cssBgCount: cap.media.cssBackgrounds.length,
  fontFiles: fontFiles.length, savedMedia: savedMedia.length, logoSaved, customProps: cap.customProps.length,
};
fs.writeFileSync(path.join(ROOT, '_extract-summary.json'), JSON.stringify({ ...out, savedMediaList: savedMedia, fontFilesList: fontFiles, topColorsFull: topN(cap.colorCount, 20), topFontsFull: topN(cap.fontCount, 12) }, null, 2));
console.log(JSON.stringify(out, null, 2));

await browser.close();
