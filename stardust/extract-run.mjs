import pw from '/Users/paolo/.nvm/versions/node/v25.2.1/lib/node_modules/playwright/index.js';
const { chromium } = pw;
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import http from 'node:http';

const URL = 'https://www.duolingo.com/';
const SLUG = 'home';
const ROOT = '/Users/paolo/stardust/deploy/test-12/8/stardust/current';
const ASSETS = path.join(ROOT, 'assets');
const nowISO = new Date().toISOString();

function download(url, dest) {
  return new Promise((resolve) => {
    try {
      const mod = url.startsWith('https') ? https : http;
      const f = fs.createWriteStream(dest);
      mod.get(url, (res) => {
        if (res.statusCode >= 400) { resolve(false); return; }
        res.pipe(f);
        f.on('finish', () => f.close(() => resolve(true)));
      }).on('error', () => resolve(false));
    } catch { resolve(false); }
  });
}

const fontResponses = new Map();

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: 'light',
  locale: 'en-US',
  reducedMotion: 'reduce',
  ignoreHTTPSErrors: true,
});

const fontUrls = new Set();
context.on('response', async (res) => {
  const u = res.url();
  const ct = res.headers()['content-type'] || '';
  if (/\.(woff2?|ttf|otf|eot)(\?|$)/i.test(u) || ct.startsWith('font/')) {
    if (!fontUrls.has(u)) { fontUrls.add(u); fontResponses.set(u, ct); }
  }
});

// consent dismissal preflight
async function dismissConsent() {
  const p = await context.newPage();
  let method = 'none-detected';
  try {
    await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    method = await p.evaluate(() => {
      try { if (window.OneTrust?.RejectAll) { window.OneTrust.RejectAll(); return 'api:OneTrust.RejectAll'; } } catch {}
      try { if (window.Cookiebot?.dismiss) { window.Cookiebot.dismiss(); return 'api:Cookiebot.dismiss'; } } catch {}
      return null;
    }) || 'none-detected';
    if (method === 'none-detected') {
      const chain = ['#onetrust-reject-all-handler','#onetrust-accept-btn-handler','[data-testid="uc-deny-all-button"]','[aria-label*="reject" i]','[aria-label*="accept" i]','button:has-text("Accept")'];
      for (const sel of chain) {
        try { await p.click(sel, { timeout: 2500 }); method = `selector:${sel}`; break; } catch {}
      }
    }
  } catch {}
  await p.close();
  return method;
}
const consentMethod = await dismissConsent();

const page = await context.newPage();
const t0 = Date.now();
let resp;
let waitMode = 'medium';
try {
  resp = await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 8000 });
} catch (e) {
  resp = await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  waitMode = 'domcontentloaded(fallback)';
}
await page.waitForTimeout(2000);
// scroll pass
for (let i = 0; i < 4; i++) {
  await page.evaluate((step) => window.scrollTo(0, window.innerHeight * step), i + 1);
  await page.waitForTimeout(300);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
const waitMs = Date.now() - t0;
const httpStatus = resp ? resp.status() : 0;
const finalUrl = page.url();

const capture = await page.evaluate(() => {
  const cs = (el, pseudo) => getComputedStyle(el, pseudo || undefined);
  const txt = (el) => (el?.innerText || '').replace(/\s+/g, ' ').trim();
  const rectOf = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };

  // metadata
  const meta = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content || null,
    og: {
      title: document.querySelector('meta[property="og:title"]')?.content || null,
      description: document.querySelector('meta[property="og:description"]')?.content || null,
      image: document.querySelector('meta[property="og:image"]')?.content || null,
      siteName: document.querySelector('meta[property="og:site_name"]')?.content || null,
    },
    themeColor: document.querySelector('meta[name="theme-color"]')?.content || null,
    appleTouchIcon: document.querySelector('link[rel="apple-touch-icon"]')?.href || null,
    favicon: document.querySelector('link[rel="icon"]')?.href || null,
    lang: document.documentElement.lang || null,
  };

  // headings
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => {
    const s = cs(h);
    return {
      level: +h.tagName[1], text: txt(h),
      fontFamily: s.fontFamily, fontWeight: s.fontWeight, fontSize: s.fontSize,
      lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, color: s.color,
      textTransform: s.textTransform,
    };
  }).filter((h) => h.text);

  // landmarks
  const landmarkSel = 'header,nav,main,aside,footer,section,[role="banner"],[role="navigation"],[role="main"],[role="contentinfo"],[role="region"]';
  const landmarks = [...document.querySelectorAll(landmarkSel)].slice(0, 60).map((el) => {
    const s = cs(el);
    const body = [...el.querySelectorAll(':scope > p, :scope > div > p, :scope > blockquote')].map((p) => txt(p)).filter(Boolean).slice(0, 30);
    const lists = [...el.querySelectorAll(':scope ul, :scope ol')].slice(0, 8).map((l) => ({ ordered: l.tagName === 'OL', items: [...l.children].map((li) => txt(li)).filter(Boolean).slice(0, 15) }));
    return {
      tag: el.tagName.toLowerCase(), role: el.getAttribute('role') || null,
      id: el.id || null, class: el.className?.toString().slice(0, 120) || null,
      childCount: el.children.length,
      rect: rectOf(el),
      bg: s.backgroundColor, color: s.color,
      paddingBlock: s.paddingTop + ' ' + s.paddingBottom, paddingInline: s.paddingLeft + ' ' + s.paddingRight,
      gap: s.gap, borderRadius: s.borderRadius,
      innerText: txt(el).slice(0, 6000),
      body, lists,
    };
  }).filter((l) => l.rect.w > 0 && l.rect.h > 0);

  // CTAs
  const ctaEls = [...document.querySelectorAll('button,[role="button"],a')];
  const ctas = ctaEls.map((el) => {
    const s = cs(el);
    const bg = s.backgroundColor;
    const radius = parseFloat(s.borderRadius) || 0;
    const padTop = parseFloat(s.paddingTop) || 0;
    const isButton = el.tagName === 'BUTTON' || el.getAttribute('role') === 'button' || (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' && radius > 2 && padTop > 4);
    if (!isButton) return null;
    return {
      label: txt(el).slice(0, 80), href: el.getAttribute('href') || null,
      bg, color: s.color, fontFamily: s.fontFamily, fontWeight: s.fontWeight,
      fontSize: s.fontSize, borderRadius: s.borderRadius, padding: s.padding, boxShadow: s.boxShadow,
    };
  }).filter(Boolean).filter((c) => c.label);

  // links
  const host = location.host;
  const linkSet = {};
  [...document.querySelectorAll('a[href]')].forEach((a) => {
    try {
      const u = new URL(a.href);
      const key = u.origin + u.pathname;
      const internal = u.host === host;
      if (!linkSet[key]) linkSet[key] = { href: key, internal, label: txt(a).slice(0, 60) };
    } catch {}
  });
  const links = Object.values(linkSet);

  // media — imgs
  const imgs = [...document.querySelectorAll('img')].map((im) => ({
    src: im.currentSrc || im.src, srcset: im.getAttribute('srcset') || null, alt: im.alt || null,
    naturalWidth: im.naturalWidth, naturalHeight: im.naturalHeight,
    rect: rectOf(im),
  })).filter((i) => i.src);
  const inlineSvgCount = document.querySelectorAll('svg').length;
  const videos = [...document.querySelectorAll('video,iframe')].map((v) => ({ tag: v.tagName.toLowerCase(), src: v.src || v.currentSrc || null, poster: v.poster || null }));

  // css backgrounds
  const cssBackgrounds = [];
  [...document.querySelectorAll('*')].forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 100 || r.height < 80) return;
    for (const pseudo of [null, '::before', '::after']) {
      const s = cs(el, pseudo);
      const bi = s.backgroundImage;
      if (bi && bi !== 'none' && bi.includes('url(')) {
        const urls = [...bi.matchAll(/url\(["']?(.*?)["']?\)/g)].map((m) => m[1]).filter((u) => !u.startsWith('data:'));
        if (urls.length) cssBackgrounds.push({ urls, domPath: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (pseudo || ''), rect: { w: Math.round(r.width), h: Math.round(r.height) }, backgroundSize: s.backgroundSize, backgroundPosition: s.backgroundPosition });
      }
    }
  });

  // css custom props
  const rootStyle = cs(document.documentElement);
  const customProps = [];
  for (const name of rootStyle) {
    if (name.startsWith('--')) customProps.push({ name, value: rootStyle.getPropertyValue(name).trim().slice(0, 80) });
  }

  // forms
  const forms = [...document.querySelectorAll('form')].map((f) => ({ action: f.action || null, method: f.method || null, fields: [...f.querySelectorAll('input,select,textarea')].map((i) => ({ type: i.type || i.tagName.toLowerCase(), name: i.name || null })) }));

  // body bg + global font
  const bodyStyle = cs(document.body);

  return { meta, headings, landmarks, ctas, links, media: { imgs, inlineSvgCount, videos, cssBackgrounds }, customProps, forms,
    bodyBg: bodyStyle.backgroundColor, bodyColor: bodyStyle.color, bodyFont: bodyStyle.fontFamily };
});

// screenshot
await page.screenshot({ path: path.join(ASSETS, 'screenshots', SLUG + '.png'), fullPage: true }).catch(() => {});

// save fonts
const fontFiles = [];
for (const u of fontUrls) {
  try {
    const base = u.split('?')[0].split('/').pop();
    const dest = path.join(ASSETS, 'fonts', base);
    const ok = await download(u, dest);
    if (ok) fontFiles.push({ url: u, localPath: 'assets/fonts/' + base, contentType: fontResponses.get(u) });
  } catch {}
}

// download key images (hero candidates + og image + logo svgs)
const downloadedMedia = [];
const mediaToGet = capture.media.imgs.filter((i) => i.rect.w >= 120 && i.rect.h >= 80).slice(0, 14);
let mi = 0;
for (const m of mediaToGet) {
  try {
    const clean = m.src.split('?')[0];
    let base = clean.split('/').pop() || ('img' + mi);
    if (!/\.(png|jpe?g|webp|avif|svg|gif)$/i.test(base)) base = 'img' + (mi++) + '.img';
    base = (mi++) + '-' + base;
    const dest = path.join(ASSETS, 'media', base);
    const ok = await download(m.src, dest);
    if (ok) downloadedMedia.push({ src: m.src, localPath: 'assets/media/' + base, alt: m.alt, rect: m.rect, naturalWidth: m.naturalWidth, naturalHeight: m.naturalHeight });
  } catch {}
}

const provenance = {
  renderedBy: 'playwright', fetchedAt: nowISO, waitMs, waitMode, httpStatus, finalUrl, consentMethod,
};

const pageRecord = { _provenance: provenance, url: URL, slug: SLUG, ...capture };
fs.writeFileSync(path.join(ROOT, 'pages', SLUG + '.json'), JSON.stringify(pageRecord, null, 2));

fs.writeFileSync(path.join(ROOT, '_extract-raw.json'), JSON.stringify({ provenance, fontFiles, downloadedMedia }, null, 2));

console.log(JSON.stringify({ httpStatus, waitMs, waitMode, finalUrl, consentMethod,
  headings: capture.headings.length, landmarks: capture.landmarks.length, ctas: capture.ctas.length,
  links: capture.links.length, imgs: capture.media.imgs.length, svg: capture.media.inlineSvgCount,
  cssBackgrounds: capture.media.cssBackgrounds.length, customProps: capture.customProps.length,
  fonts: fontFiles.length, media: downloadedMedia.length }, null, 2));

await browser.close();
