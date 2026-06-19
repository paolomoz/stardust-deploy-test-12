import pw from '/Users/paolo/.nvm/versions/node/v25.2.1/lib/node_modules/playwright/index.js';
const { chromium } = pw;
import fs from 'fs';
import path from 'path';

const protoDir = path.resolve('stardust/prototypes');
const valDir = path.resolve('stardust/validation');
const viewports = [
  { name: 'desktop', w: 1440, h: 900 },
  { name: 'tablet', w: 768, h: 1024 },
  { name: 'mobile', w: 390, h: 844 },
];
const files = [
  { id: 'A', file: 'home-A-proposed.html' },
  { id: 'B', file: 'home-B-proposed.html' },
  { id: 'C', file: 'home-C-cinematic.html' },
];

const browser = await chromium.launch({ headless: true });
const report = {};

for (const f of files) {
  report[f.id] = {};
  const url = 'file://' + path.join(protoDir, f.file);
  for (const vp of viewports) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
    const failed = [];
    page.on('requestfailed', (r) => failed.push(r.url().split('/').pop()));
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(600);
    // scroll through to trigger IO reveals
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += vp.h) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(120); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    const landmarks = await page.evaluate(() => ({ nav: !!document.querySelector('header,nav'), main: !!document.querySelector('main'), footer: !!document.querySelector('footer'), h2: document.querySelectorAll('h2').length }));
    // C: check reveal elements became visible after scroll
    let revealed = null;
    if (f.id === 'C') {
      revealed = await page.evaluate(() => {
        const all = document.querySelectorAll('[data-anim]');
        let vis = 0; all.forEach((n) => { if (getComputedStyle(n).opacity === '1') vis++; });
        return { total: all.length, visible: vis };
      });
    }
    const dir = path.join(valDir, 'home-' + f.id);
    fs.mkdirSync(dir, { recursive: true });
    await page.screenshot({ path: path.join(dir, vp.name + '.png'), fullPage: vp.name === 'desktop' });
    report[f.id][vp.name] = { errors: errors.slice(0, 5), failedAssets: [...new Set(failed)], overflow, landmarks, revealed };
    await ctx.close();
  }
}

// C reduced-motion check
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(protoDir, 'home-C-cinematic.html'), { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const rm = await page.evaluate(() => {
    const all = document.querySelectorAll('[data-anim]'); let vis = 0;
    all.forEach((n) => { const s = getComputedStyle(n); if (s.opacity === '1' && s.filter === 'none') vis++; });
    return { total: all.length, visibleStatic: vis };
  });
  report.C.reducedMotion = rm;
  await ctx.close();
}

fs.writeFileSync(path.join(valDir, '_report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
