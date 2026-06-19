import { chromium } from '/Users/paolo/.nvm/versions/node/v25.2.1/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
import path from 'path';

const TARGET = 'https://www.adaline.ai/';
const SLUG = 'home';
const OUT = 'stardust/current';
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

context.on('response', async (resp) => {
  const u = resp.url();
  if (/\.(woff2?|ttf|otf|eot)(\?|$)/i.test(u) || (resp.headers()['content-type']||'').startsWith('font/')) {
    if (!fontResponses.has(u)) {
      try { const buf = await resp.body(); fontResponses.set(u, buf); } catch {}
    }
  }
});

const page = await context.newPage();
const t0 = Date.now();
let httpStatus = 0;
let waitMode = 'medium';
try {
  const r = await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 8000 });
  httpStatus = r ? r.status() : 0;
} catch (e) {
  waitMode = 'domcontentloaded(fallback)';
}
await page.waitForTimeout(2000); // grace
// scroll to bottom in 4 steps
for (let i = 1; i <= 4; i++) {
  await page.evaluate((step) => window.scrollTo(0, window.innerHeight * step), i);
  await page.waitForTimeout(300);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
const waitMs = Date.now() - t0;
const finalUrl = page.url();

const cap = await page.evaluate(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const cs = (el, pseudo) => getComputedStyle(el, pseudo || undefined);
  const out = {};
  out.title = document.title;
  out.metaDescription = document.querySelector('meta[name="description"]')?.content || null;
  out.og = {};
  for (const p of ['og:title','og:description','og:image','og:type','og:site_name']) {
    const m = document.querySelector(`meta[property="${p}"]`); if (m) out.og[p] = m.content;
  }
  out.themeColor = document.querySelector('meta[name="theme-color"]')?.content || null;

  // headings
  out.headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => {
    const c = cs(h);
    return { level: +h.tagName[1], text: norm(h.innerText),
      fontFamily: c.fontFamily, fontWeight: c.fontWeight, fontSize: c.fontSize,
      lineHeight: c.lineHeight, letterSpacing: c.letterSpacing, color: c.color };
  }).filter(h => h.text);

  // landmarks / sections
  const landmarkSel = 'header,nav,main,aside,footer,section,[role=banner],[role=navigation],[role=main],[role=contentinfo],[role=region]';
  const seen = new Set();
  out.landmarks = [...document.querySelectorAll(landmarkSel)].filter(el => {
    const r = el.getBoundingClientRect();
    return r.height > 40; // skip tiny
  }).slice(0, 60).map(el => {
    const c = cs(el);
    const heads = [...el.querySelectorAll(':scope h1,:scope h2,:scope h3')].map(h=>norm(h.innerText)).filter(Boolean);
    const body = [...el.querySelectorAll(':scope > p, :scope p')].slice(0,12).map(p=>norm(p.textContent)).filter(t=>t.length>0);
    const lists = [...el.querySelectorAll(':scope ul, :scope ol')].slice(0,6).map(l=>({ordered:l.tagName==='OL', items:[...l.querySelectorAll(':scope > li')].slice(0,10).map(li=>norm(li.textContent)).filter(Boolean)})).filter(l=>l.items.length);
    return {
      tag: el.tagName.toLowerCase(), role: el.getAttribute('role')||null,
      id: el.id||null, class: el.className?.toString().slice(0,120)||null,
      childCount: el.children.length,
      bg: c.backgroundColor, color: c.color,
      paddingBlock: c.paddingTop+' '+c.paddingBottom, paddingInline: c.paddingLeft+' '+c.paddingRight,
      headings: [...new Set(heads)].slice(0,10),
      innerText: norm(el.innerText).slice(0, 3000),
      body: body.slice(0,10), lists,
    };
  });

  // CTAs
  out.ctas = [...document.querySelectorAll('a,button,[role=button]')].map(el=>{
    const c = cs(el); const r = el.getBoundingClientRect();
    const bg = c.backgroundColor; const radius = parseFloat(c.borderRadius)||0;
    const looksBtn = (bg && bg!=='rgba(0, 0, 0, 0)' && bg!=='transparent') || el.tagName==='BUTTON' || el.getAttribute('role')==='button';
    if (!looksBtn || r.height < 12 || !norm(el.innerText)) return null;
    return { label: norm(el.innerText).slice(0,60), href: el.getAttribute('href')||null,
      bg, color: c.color, fontFamily: c.fontFamily, fontWeight: c.fontWeight,
      borderRadius: c.borderRadius, padding: c.padding, boxShadow: c.boxShadow };
  }).filter(Boolean).slice(0,40);

  // links
  const host = location.host;
  const linkMap = {};
  [...document.querySelectorAll('a[href]')].forEach(a=>{
    let href = a.getAttribute('href'); if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')) return;
    let internal = true; try { internal = new URL(href, location.href).host === host; } catch {}
    const key = norm(a.innerText).slice(0,40)+'|'+href;
    if(!linkMap[key]) linkMap[key] = { label: norm(a.innerText).slice(0,40), href, internal };
  });
  out.links = Object.values(linkMap).slice(0,80);

  // media
  out.media = { images: [], cssBackgrounds: [], inlineSvgCount: document.querySelectorAll('svg').length, videos: [] };
  out.media.images = [...document.querySelectorAll('img')].map(img=>({src:img.currentSrc||img.src, srcset:img.getAttribute('srcset')||null, alt:img.alt||null, w:img.naturalWidth, h:img.naturalHeight})).filter(i=>i.src).slice(0,40);
  [...document.querySelectorAll('video')].forEach(v=>out.media.videos.push({src:v.currentSrc||v.src||v.querySelector('source')?.src||null, poster:v.poster||null}));
  const bgSeen = new Set();
  [...document.querySelectorAll('*')].forEach(el=>{
    const r = el.getBoundingClientRect(); if(r.width<100||r.height<80) return;
    for (const pseudo of [null,'::before','::after']) {
      const bi = cs(el, pseudo).backgroundImage;
      if (bi && bi!=='none' && bi.includes('url(')) {
        const urls = [...bi.matchAll(/url\(["']?(.*?)["']?\)/g)].map(m=>m[1]);
        urls.forEach(u=>{ const k=u+pseudo; if(bgSeen.has(k))return; bgSeen.add(k);
          out.media.cssBackgrounds.push({url:u, pseudo:pseudo||null, w:Math.round(r.width), h:Math.round(r.height), size:cs(el,pseudo).backgroundSize, position:cs(el,pseudo).backgroundPosition}); });
      }
    }
  });
  out.media.cssBackgrounds = out.media.cssBackgrounds.slice(0,30);

  // CSS custom properties
  const rootCs = cs(document.documentElement);
  out.cssVars = [];
  for (let i=0;i<rootCs.length;i++){ const n=rootCs[i]; if(n.startsWith('--')) out.cssVars.push({name:n, value:rootCs.getPropertyValue(n).trim().slice(0,80)}); }

  // forms
  out.forms = [...document.querySelectorAll('form')].map(f=>({action:f.getAttribute('action')||null, method:f.getAttribute('method')||null, fields:[...f.querySelectorAll('input,select,textarea')].map(i=>({type:i.type||i.tagName.toLowerCase(), name:i.name||null}))})).slice(0,10);

  // palette aggregation: sample colors across elements
  const colorCount = {};
  [...document.querySelectorAll('*')].forEach(el=>{
    const r = el.getBoundingClientRect(); if(r.width<4||r.height<4) return;
    const c = cs(el);
    for (const prop of ['color','backgroundColor','borderTopColor']) {
      const v = c[prop]; if(!v||v==='rgba(0, 0, 0, 0)'||v==='transparent') continue;
      const area = prop==='backgroundColor'? r.width*r.height : (prop==='color'? 200 : 20);
      colorCount[v] = (colorCount[v]||0) + area;
    }
  });
  out.colorAgg = Object.entries(colorCount).sort((a,b)=>b[1]-a[1]).slice(0,30).map(([c,wt])=>({color:c, weight:Math.round(wt)}));

  // radius / shadow aggregation
  const radCount={}, shadowCount={};
  [...document.querySelectorAll('*')].forEach(el=>{
    const c=cs(el); const br=c.borderRadius; if(br&&br!=='0px') radCount[br]=(radCount[br]||0)+1;
    const sh=c.boxShadow; if(sh&&sh!=='none') shadowCount[sh]=(shadowCount[sh]||0)+1;
  });
  out.radiusAgg = Object.entries(radCount).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([v,n])=>({value:v,count:n}));
  out.shadowAgg = Object.entries(shadowCount).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([v,n])=>({value:v.slice(0,120),count:n}));

  // type families aggregation
  const famCount={};
  [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,span,li,button,div')].slice(0,3000).forEach(el=>{
    const t=norm(el.innerText); if(!t) return; const c=cs(el);
    const key=c.fontFamily+'|'+c.fontWeight; famCount[key]=(famCount[key]||0)+1;
  });
  out.fontAgg = Object.entries(famCount).sort((a,b)=>b[1]-a[1]).slice(0,12).map(([k,n])=>({key:k,count:n}));

  return out;
});

// screenshot
await page.screenshot({ path: `${OUT}/assets/screenshots/${SLUG}.png`, fullPage: true });

// save fonts
const fontFiles = [];
for (const [u, buf] of fontResponses) {
  const base = path.basename(new URL(u).pathname);
  if (!base) continue;
  const lp = `${OUT}/assets/fonts/${base}`;
  try { fs.writeFileSync(lp, buf); fontFiles.push({ url: u, localPath: lp }); } catch {}
}

const provenance = {
  renderedBy: 'playwright', fetchedAt: new Date(t0).toISOString(),
  waitMs, waitMode, httpStatus, finalUrl, viewport: '1440x900@2x',
};

fs.writeFileSync(`${OUT}/_raw-capture.json`, JSON.stringify({ _provenance: provenance, slug: SLUG, url: TARGET, fontFiles, capture: cap }, null, 2));
console.log('CAPTURE OK', JSON.stringify({ httpStatus, waitMs, waitMode, headings: cap.headings.length, landmarks: cap.landmarks.length, ctas: cap.ctas.length, images: cap.media.images.length, cssBg: cap.media.cssBackgrounds.length, fonts: fontFiles.length, cssVars: cap.cssVars.length }));

await browser.close();
