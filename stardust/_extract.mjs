import pw from 'file:///Users/paolo/.nvm/versions/node/v25.2.1/lib/node_modules/playwright/index.js';
const { chromium } = pw;
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import https from 'node:https';

const ORIGIN = 'https://elevenlabs.io/';
const SLUG = 'home';
const ROOT = path.resolve('stardust/current');
const MEDIA = path.join(ROOT, 'assets/media');
const SHOTS = path.join(ROOT, 'assets/screenshots');
const FONTS = path.join(ROOT, 'assets/fonts');
for (const d of [ROOT, path.join(ROOT,'pages'), MEDIA, SHOTS, FONTS]) fs.mkdirSync(d, { recursive: true });

const now = () => new Date().toISOString();
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0,8);

function download(url, dest) {
  return new Promise((resolve) => {
    try {
      const file = fs.createWriteStream(dest);
      https.get(url, { headers: { 'user-agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode >= 400) { file.close(); fs.unlink(dest, ()=>{}); return resolve(null); }
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(dest); });
      }).on('error', () => { file.close(); fs.unlink(dest, ()=>{}); resolve(null); });
    } catch { resolve(null); }
  });
}

const fontResponses = new Map();

async function run() {
  const t0 = Date.now();
  let browser, headed = false, fetchTechnique = 'headless-chromium';
  try {
    browser = await chromium.launch({ headless: true });
  } catch (e) { browser = await chromium.launch({ headless: false, channel: 'chrome' }); headed = true; }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
    locale: 'en-US',
    reducedMotion: 'reduce',
    ignoreHTTPSErrors: true,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
  });

  context.on('response', async (res) => {
    try {
      const url = res.url();
      const ct = res.headers()['content-type'] || '';
      if (/\.(woff2?|ttf|otf|eot)(\?|$)/i.test(url) || ct.startsWith('font/')) {
        if (!fontResponses.has(url)) {
          const buf = await res.body().catch(()=>null);
          if (buf) fontResponses.set(url, buf);
        }
      }
    } catch {}
  });

  let page = await context.newPage();

  // consent dismissal pre-flight
  let consentMethod = 'none-detected';
  try {
    const cp = await context.newPage();
    let nav;
    try { nav = await cp.goto(ORIGIN, { waitUntil: 'domcontentloaded', timeout: 30000 }); }
    catch (e) {
      // bot-management fallback
      if (/ERR_HTTP2|ERR_QUIC/.test(String(e)) && !headed) {
        await browser.close();
        browser = await chromium.launch({ headless: false, channel: 'chrome' });
        headed = true; fetchTechnique = 'headed-chrome';
        // recreate context/page
        return run(); // simple restart
      }
      throw e;
    }
    consentMethod = await cp.evaluate(() => {
      try { if (window.OneTrust?.RejectAll){window.OneTrust.RejectAll();return 'api:OneTrust.RejectAll';} } catch {}
      try { if (window.Cookiebot?.dismiss){window.Cookiebot.dismiss();return 'api:Cookiebot.dismiss';} } catch {}
      return null;
    }) || 'none-detected';
    if (consentMethod === 'none-detected') {
      const chain = ['#onetrust-reject-all-handler','#onetrust-accept-btn-handler','[data-testid="uc-deny-all-button"]','[aria-label*="reject" i]','[aria-label*="accept" i]','button:has-text("Accept")','button:has-text("Allow all")'];
      for (const sel of chain) { try { await cp.click(sel, { timeout: 2500 }); consentMethod = 'selector:'+sel; break; } catch {} }
    }
    await cp.close();
  } catch (e) { /* continue */ }

  // main navigation — spec wait (SPA-ish marketing)
  let waitMode = 'spec', waitMs = 0, httpStatus = 0, contentType = '', finalUrl = ORIGIN;
  let resp;
  try {
    resp = await page.goto(ORIGIN, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    waitMode = 'domcontentloaded(fallback)';
    resp = await page.goto(ORIGIN, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(()=>null);
  }
  if (resp) { httpStatus = resp.status(); contentType = (resp.headers()['content-type']||'').split(';')[0]; }
  finalUrl = page.url();
  // grace
  await page.waitForTimeout(1500);
  // scroll pass
  const vh = 900;
  const total = await page.evaluate(() => document.body.scrollHeight);
  const steps = Math.max(4, Math.ceil(total / vh));
  for (let i = 1; i <= steps; i++) { await page.evaluate((y)=>window.scrollTo(0,y), i*vh); await page.waitForTimeout(300); }
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.waitForTimeout(500);
  waitMs = Date.now() - t0;

  // ---- big in-page capture ----
  const cap = await page.evaluate(() => {
    const txt = (el) => (el?.innerText || '').replace(/\s+/g,' ').trim();
    const cs = (el, p) => getComputedStyle(el).getPropertyValue(p);
    const domPath = (el) => {
      const parts = [];
      let e = el;
      while (e && e.nodeType === 1 && parts.length < 6) {
        let s = e.tagName.toLowerCase();
        if (e.id) { s += '#'+e.id; parts.unshift(s); break; }
        const cls = (e.className && typeof e.className === 'string') ? '.'+e.className.trim().split(/\s+/).slice(0,2).join('.') : '';
        s += cls;
        parts.unshift(s);
        e = e.parentElement;
      }
      return parts.join(' > ');
    };
    const rgbToHex = (c) => {
      const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return c;
      const [r,g,b,a] = m[1].split(',').map(x=>parseFloat(x));
      if (a !== undefined && a === 0) return null;
      return '#'+[r,g,b].map(x=>('0'+Math.round(x).toString(16)).slice(-2)).join('');
    };

    // meta
    const meta = (n,attr='name') => document.querySelector(`meta[${attr}="${n}"]`)?.content || null;
    const og = {
      title: meta('og:title','property'), description: meta('og:description','property'),
      image: meta('og:image','property'), type: meta('og:type','property'), siteName: meta('og:site_name','property')
    };

    // headings
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => {
      const st = getComputedStyle(h);
      return { level: +h.tagName[1], text: txt(h), id: h.id||null, domPath: domPath(h),
        style: { fontFamily: st.fontFamily, fontWeight: st.fontWeight, fontSize: st.fontSize, lineHeight: st.lineHeight, letterSpacing: st.letterSpacing, color: st.color },
        visible: !!(h.offsetWidth||h.offsetHeight||h.getClientRects().length) };
    });

    // landmarks
    const lmSel = 'header,nav,main,aside,footer,[role="banner"],[role="navigation"],[role="main"],[role="complementary"],[role="contentinfo"],[role="region"]';
    const purposeOf = (sec) => {
      const c = (sec.className||'').toString().toLowerCase();
      const t = txt(sec).toLowerCase();
      if (/hero/.test(c)) return 'hero';
      if (/(testimonial|review|quote)/.test(c)) return 'social-proof';
      if (/(feature|grid|cards)/.test(c)) return 'feature-list';
      if (/(cta|get-started|signup)/.test(c)) return 'cta-band';
      if (/footer/.test(c)) return 'footer-nav';
      if (sec.querySelector('form')) return 'form';
      return 'unknown';
    };
    const landmarks = [...document.querySelectorAll(lmSel)].slice(0,40).map(lm => {
      const kids = [...lm.children].filter(c=>['SECTION','DIV','ARTICLE'].includes(c.tagName)).slice(0,30).map(sec => {
        const heading = sec.querySelector('h1,h2,h3');
        const body = [...sec.querySelectorAll(':scope > p, :scope > * > p')].slice(0,8).map(p=>p.textContent.trim()).filter(Boolean);
        const lists = [...sec.querySelectorAll(':scope ul, :scope ol')].slice(0,4).map(l=>({ordered:l.tagName==='OL', items:[...l.querySelectorAll(':scope > li')].slice(0,8).map(li=>li.textContent.trim()).filter(Boolean)})).filter(l=>l.items.length);
        return { tag: sec.tagName.toLowerCase(), role: sec.getAttribute('role')||null, id: sec.id||null,
          classes: (sec.className||'').toString().split(/\s+/).filter(Boolean).slice(0,4),
          purpose: purposeOf(sec), innerTextSummary: txt(sec).slice(0,240), wordCount: txt(sec).split(/\s+/).filter(Boolean).length,
          body, lists, qa: [], quotes: [], heading: heading?txt(heading):null };
      });
      return { tag: lm.tagName.toLowerCase(), role: lm.getAttribute('role')||null, id: lm.id||null,
        classes: (lm.className||'').toString().split(/\s+/).filter(Boolean).slice(0,4), innerText: txt(lm), children: kids };
    });

    // CTAs
    const ctas = [];
    const seen = new Set();
    [...document.querySelectorAll('a,button,[role="button"]')].forEach(el => {
      const st = getComputedStyle(el);
      const bg = st.backgroundColor;
      const br = parseFloat(st.borderRadius)||0;
      const hasBg = bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
      const label = txt(el);
      if (!label || label.length > 40) return;
      const looksButton = (hasBg && br >= 2) || /\bbtn|button\b/i.test(el.className||'');
      if (!looksButton) return;
      const rect = el.getBoundingClientRect();
      const key = label+'|'+(el.getAttribute('href')||'');
      if (seen.has(key)) return; seen.add(key);
      ctas.push({ label, href: el.getAttribute('href')||null, tag: el.tagName.toLowerCase(), domPath: domPath(el),
        style: { backgroundColor: bg, color: st.color, fontFamily: st.fontFamily, fontWeight: st.fontWeight, borderRadius: st.borderRadius, padding: st.padding, boxShadow: st.boxShadow },
        appearsAbove: rect.top < 900 ? 'fold' : 'below-fold' });
    });

    // links
    const internal = [], external = [];
    const lseen = new Set();
    [...document.querySelectorAll('a[href]')].forEach(a => {
      const href = a.getAttribute('href'); if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      const text = txt(a);
      const key = href+'|'+text; if (lseen.has(key)) return; lseen.add(key);
      let host=''; try { host = new URL(a.href).host; } catch {}
      const entry = { href, text, domPath: domPath(a) };
      if (host && host !== location.host) external.push(entry); else internal.push(entry);
    });

    // media
    const images = [...document.querySelectorAll('img')].map(img => {
      const r = img.getBoundingClientRect();
      return { src: img.currentSrc || img.src, srcset: img.srcset||'', alt: img.alt||'', naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight,
        rect: { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) } };
    }).filter(i=>i.src);
    const inlineSvgs = [...document.querySelectorAll('svg')].slice(0,50).map(s => ({ viewBox: s.getAttribute('viewBox')||null, domPath: domPath(s) }));
    const cssBackgrounds = [];
    [...document.querySelectorAll('*')].forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width < 100 || r.height < 80) return;
      for (const pseudo of ['', '::before', '::after']) {
        const bi = getComputedStyle(el, pseudo||undefined).backgroundImage;
        if (bi && bi !== 'none' && bi.includes('url(')) {
          const urls = [...bi.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(m=>m[1]);
          urls.forEach(u => {
            if (u.startsWith('data:')) return;
            const stp = getComputedStyle(el, pseudo||undefined);
            cssBackgrounds.push({ url: new URL(u, location.href).href, domPath: domPath(el)+(pseudo?pseudo:''),
              boundingClientRect: { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) },
              backgroundSize: stp.backgroundSize, backgroundPosition: stp.backgroundPosition, backgroundRepeat: stp.backgroundRepeat });
          });
        }
      }
    });
    const videos = [...document.querySelectorAll('video')].map(v=>({src:v.currentSrc||v.src||'', poster:v.poster||''}));
    const iframes = [...document.querySelectorAll('iframe')].map(f=>({src:f.src||'', title:f.title||''}));

    // forms
    const forms = [...document.querySelectorAll('form')].map(f => ({
      action: f.getAttribute('action')||'', method: (f.getAttribute('method')||'get').toLowerCase(),
      fields: [...f.querySelectorAll('input,textarea,select')].map(i=>({type:i.type||i.tagName.toLowerCase(), name:i.name||'', required:i.required||false})),
      thirdParty: null
    }));

    // widgets
    const widgets = {
      modals: [...document.querySelectorAll('dialog,[role="dialog"]')].map(d=>({domPath:domPath(d)})),
      accordions: [...document.querySelectorAll('details')].map(d=>({domPath:domPath(d), itemCount:1})),
      tabs: [...document.querySelectorAll('[role="tablist"]')].map(t=>({domPath:domPath(t), tabCount:t.querySelectorAll('[role="tab"]').length}))
    };

    // components
    const count = (sel) => { try { return document.querySelectorAll(sel).length; } catch { return 0; } };
    const components = {
      cards: { count: count('[class*="card" i]'), examples: [] },
      grids: { count: count('[class*="grid" i]'), examples: [] },
      accordions: { count: count('details'), examples: [] },
      tabs: { count: count('[role="tablist"]'), examples: [] },
      tables: { count: count('table:not([role="presentation"])'), examples: [] },
      modals: { count: count('dialog,[role="dialog"]'), examples: [] },
      carousels: { count: count('[class*="carousel" i],[class*="swiper" i],[class*="slick" i]'), examples: [] },
      videos: { count: count('video'), examples: [] },
      iframes: { count: count('iframe'), examples: [] },
      dataVizEmbeds: { count: count('[class*="chart" i]'), examples: [] },
      teamTiles: { count: 0, examples: [] },
      pricingTiles: { count: count('[class*="pricing" i] [class*="tier" i],[class*="plan" i]'), examples: [] },
      testimonialCards: { count: count('[class*="testimonial" i],blockquote'), examples: [] },
      logoStrip: { count: count('[class*="logo" i][class*="strip" i],[class*="marquee" i]'), examples: [] },
      timeline: { count: 0, examples: [] },
      breadcrumbs: { count: count('[class*="breadcrumb" i]'), examples: [] },
      statRow: { count: 0, examples: [] },
      ctaBand: { count: 0, examples: [] },
      formFields: { count: count('form input, form textarea'), examples: [] },
      other: []
    };

    // per-section style (direct children of main, else section landmarks)
    const main = document.querySelector('main') || document.body;
    const perSectionStyle = [...main.children].filter(c=>['SECTION','DIV','ARTICLE'].includes(c.tagName)).slice(0,30).map((sec,i) => {
      const st = getComputedStyle(sec);
      const radii = [...sec.querySelectorAll('*')].slice(0,200).map(e=>getComputedStyle(e).borderRadius).filter(r=>r&&r!=='0px');
      const mode = (arr)=>{const m={};arr.forEach(v=>m[v]=(m[v]||0)+1);return Object.entries(m).sort((a,b)=>b[1]-a[1])[0]?.[0]||null;};
      const fams = new Set(); [...sec.querySelectorAll('h1,h2,h3,p,span')].slice(0,40).forEach(e=>{const f=getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g,'');if(f)fams.add(f);});
      return { sectionRef: `main > *:nth-child(${i+1})`, purpose: purposeOf(sec),
        background: { color: st.backgroundColor, hasImage: st.backgroundImage!=='none', hasGradient: /gradient/.test(st.backgroundImage) },
        text: { dominantColor: st.color }, spacing: { paddingBlock: st.paddingTop, paddingInline: st.paddingLeft, gap: st.gap||'normal' },
        borderRadius: mode(radii), fontFamilies: [...fams].slice(0,3), shadowsUsed: [] };
    });

    // css custom properties
    const rootCS = getComputedStyle(document.documentElement);
    const cssCustomProperties = [];
    for (let i = 0; i < rootCS.length; i++) { const n = rootCS[i]; if (n.startsWith('--')) cssCustomProperties.push({ name: n, value: rootCS.getPropertyValue(n).trim() }); }

    // color aggregation
    const colorCount = {};
    const colorCtx = {};
    [...document.querySelectorAll('*')].slice(0,4000).forEach(el => {
      const st = getComputedStyle(el);
      const r = el.getBoundingClientRect(); const area = Math.max(0, r.width*r.height);
      const add = (val, ctx) => { const hex = rgbToHex(val); if (!hex) return; colorCount[hex]=(colorCount[hex]||0)+ (ctx==='background'?Math.max(1,area/1000):1); (colorCtx[hex]=colorCtx[hex]||new Set()).add(ctx); };
      add(st.backgroundColor,'background'); add(st.color,'text'); add(st.borderTopColor,'border'); add(st.fill,'fill');
    });
    const colors = Object.entries(colorCount).map(([value,occurrences])=>({value, occurrences: Math.round(occurrences), usedAs: [...(colorCtx[value]||[])]})).sort((a,b)=>b.occurrences-a.occurrences).slice(0,30);

    // fonts in use
    const fontUse = {};
    [...document.querySelectorAll('h1,h2,h3,h4,p,a,span,li,button')].slice(0,2000).forEach(el=>{
      const st = getComputedStyle(el); const fam = st.fontFamily; const key = fam;
      fontUse[key] = fontUse[key]||{count:0, weights:new Set(), sizes:new Set(), lineHeights:new Set(), letterSpacing:new Set(), tags:new Set()};
      fontUse[key].count++; fontUse[key].weights.add(st.fontWeight); fontUse[key].sizes.add(st.fontSize);
      fontUse[key].lineHeights.add(st.lineHeight); fontUse[key].letterSpacing.add(st.letterSpacing); fontUse[key].tags.add(el.tagName.toLowerCase());
    });
    const fonts = Object.entries(fontUse).map(([stack,d])=>({stack, count:d.count, weights:[...d.weights], sizes:[...d.sizes], lineHeights:[...d.lineHeights], letterSpacing:[...d.letterSpacing], tags:[...d.tags]})).sort((a,b)=>b.count-a.count);

    // radius aggregation
    const radCount = {};
    [...document.querySelectorAll('*')].slice(0,4000).forEach(el=>{const v=getComputedStyle(el).borderRadius; if(v&&v!=='0px'){radCount[v]=(radCount[v]||0)+1;}});
    // shadow aggregation
    const shadowCount = {};
    [...document.querySelectorAll('*')].slice(0,4000).forEach(el=>{const v=getComputedStyle(el).boxShadow; if(v&&v!=='none'){shadowCount[v]=(shadowCount[v]||0)+1;}});

    // logo
    let logo = null;
    const header = document.querySelector('header,[role="banner"],nav');
    if (header) {
      const svg = header.querySelector('svg');
      if (svg && (svg.getBoundingClientRect().width >= 40)) logo = { source:'inline-svg', sourceSelector:'header svg', markup: svg.outerHTML.slice(0,20000), format:'svg' };
      if (!logo) {
        const img = [...header.querySelectorAll('img')].find(im=>/logo|brand/i.test(im.src+im.alt+im.className) && im.getBoundingClientRect().height>=20);
        if (img) logo = { source:'img', sourceSelector: domPath(img), url: img.currentSrc||img.src, format:(img.src.split('.').pop()||'svg').split('?')[0] };
      }
    }

    const heroHeadline = headings.find(h=>h.level===1&&h.visible)?.text || headings.find(h=>h.visible)?.text || '';
    const firstP = (document.querySelector('main p, p')?.textContent||'').trim().slice(0,400);
    const navItems = [...document.querySelectorAll('header a, nav a')].map(a=>txt(a)).filter(t=>t&&t.length<24).slice(0,12);

    return { title: document.title, metaDescription: meta('description'), og,
      themeColor: { light: meta('theme-color')||null, dark: null }, language: document.documentElement.lang||'en',
      headings, landmarks, ctas, links:{internal,external}, media:{images,inlineSvgs,cssBackgrounds,videos,iframes}, forms, widgets, components,
      perSectionStyle, cssCustomProperties, colors, fonts, radCount, shadowCount, logo, heroHeadline, firstP, navItems,
      bodyTextLen: (document.body.innerText||'').length };
  });

  // screenshot
  await page.screenshot({ path: path.join(SHOTS, SLUG+'.png'), fullPage: true }).catch(()=>{});

  // download key media (hero candidates + first 12 images + css backgrounds)
  const dlTargets = [];
  cap.media.images.slice(0,16).forEach(im=>dlTargets.push(im));
  cap.media.cssBackgrounds.slice(0,8).forEach(bg=>dlTargets.push({src:bg.url, _bg:true, _ref:bg}));
  for (const t of dlTargets) {
    try {
      const u = new URL(t.src, ORIGIN).href;
      let ext = (u.split('?')[0].split('.').pop()||'img').replace(/[^a-z0-9]/gi,'').slice(0,5) || 'img';
      const base = (u.split('?')[0].split('/').pop()||'img').replace(/\.[^.]+$/,'').replace(/[^a-z0-9\-]/gi,'_').slice(0,40) || 'img';
      const dest = path.join(MEDIA, base+'-'+sha(u)+'.'+ext);
      const ok = await download(u, dest);
      if (ok) { const rel = path.relative(process.cwd(), dest); if (t._bg) t._ref.localPath = rel; else t.localPath = rel; }
    } catch {}
  }

  // save fonts
  const fontFiles = [];
  for (const [url, buf] of fontResponses) {
    try {
      const base = (url.split('?')[0].split('/').pop()||'font.woff2').replace(/[^a-z0-9.\-]/gi,'_');
      const dest = path.join(FONTS, base);
      fs.writeFileSync(dest, buf);
      fontFiles.push({ url, localPath: path.relative(process.cwd(), dest), family: null, weight: null, style: null });
    } catch {}
  }

  // save logo
  let logoMeta = null;
  if (cap.logo) {
    if (cap.logo.source === 'inline-svg' && cap.logo.markup) {
      const dest = path.join(ROOT, 'assets/logo.svg'); fs.writeFileSync(dest, cap.logo.markup);
      logoMeta = { source:'inline-svg', sourceSelector: cap.logo.sourceSelector, localPath: path.relative(process.cwd(),dest), format:'svg', synthesized:false };
    } else if (cap.logo.url) {
      const ext = (cap.logo.format||'svg').replace(/[^a-z0-9]/gi,'').slice(0,4)||'svg';
      const dest = path.join(ROOT, 'assets/logo.'+ext);
      const ok = await download(new URL(cap.logo.url, ORIGIN).href, dest);
      logoMeta = { source:'img', sourceSelector: cap.logo.sourceSelector, localPath: ok?path.relative(process.cwd(),dest):null, format:ext, synthesized:false };
    }
  }

  await browser.close();

  // write outputs
  const provenance = { writtenBy:'stardust:extract', writtenAt: now(), readArtifacts:[ORIGIN], synthesizedInputs:[], stardustVersion:'uplift',
    renderedBy:'playwright', fetchedAt: now(), waitMode, waitMs, httpStatus, contentType, finalUrl, headed, fetchTechnique, consentMethod };

  const pageJson = {
    _provenance: provenance, slug: SLUG, url: ORIGIN, finalUrl, title: cap.title, metaDescription: cap.metaDescription,
    og: cap.og, themeColor: cap.themeColor, language: cap.language,
    headings: cap.headings, landmarks: cap.landmarks, ctas: cap.ctas, links: cap.links, media: cap.media,
    forms: cap.forms, widgets: cap.widgets, components: cap.components, perSectionStyle: cap.perSectionStyle,
    embedDominance: { dominated:false, iframeSrc:null, viewportCoveragePct:null, mainHeightCoveragePct:null, screenshot:null },
    cssCustomProperties: cap.cssCustomProperties, screenshot: `stardust/current/assets/screenshots/${SLUG}.png`,
    stats: { wordCount: cap.bodyTextLen, ctaCount: cap.ctas.length, internalLinkCount: cap.links.internal.length, externalLinkCount: cap.links.external.length, imageCount: cap.media.images.length }
  };
  fs.writeFileSync(path.join(ROOT,'pages',SLUG+'.json'), JSON.stringify(pageJson, null, 2));

  // raw aggregates for brand-surface authoring step
  fs.writeFileSync(path.join(ROOT,'_raw-aggregates.json'), JSON.stringify({
    colors: cap.colors, fonts: cap.fonts, radCount: cap.radCount, shadowCount: cap.shadowCount,
    logo: logoMeta, heroHeadline: cap.heroHeadline, firstP: cap.firstP, navItems: cap.navItems,
    fontFiles, og: cap.og, title: cap.title, metaDescription: cap.metaDescription
  }, null, 2));

  console.log('EXTRACT_OK', JSON.stringify({ waitMode, waitMs, httpStatus, contentType, headed, consentMethod,
    headings: cap.headings.length, ctas: cap.ctas.length, images: cap.media.images.length, cssBg: cap.media.cssBackgrounds.length,
    fonts: cap.fonts.length, fontFiles: fontFiles.length, colors: cap.colors.length, sections: cap.perSectionStyle.length,
    cssVars: cap.cssCustomProperties.length, logo: logoMeta?.source, hero: cap.heroHeadline.slice(0,80) }, null, 2));
}

run().catch(e => { console.error('EXTRACT_FAIL', e); process.exit(1); });
