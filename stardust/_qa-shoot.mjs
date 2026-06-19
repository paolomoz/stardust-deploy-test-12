import { chromium } from '/Users/paolo/.nvm/versions/node/v25.2.1/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
const errs = [];
p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
p.on('pageerror', (e) => errs.push('PAGEERR ' + e.message));
await p.goto('http://localhost:3000/qa/page.html', { waitUntil: 'networkidle' });
await p.waitForTimeout(3000);
// assertions
const checks = await p.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const blocks = ['hero', 'feature-trace', 'feature-behaviors', 'metrics', 'positioning', 'testimonials', 'security'];
  const out = {};
  blocks.forEach((bn) => {
    const el = q(`.${bn}`);
    out[bn] = el ? { h: Math.round(el.getBoundingClientRect().height), kids: el.children.length } : null;
  });
  out.h1count = document.querySelectorAll('h1').length;
  out.h1text = q('h1')?.textContent.trim();
  out.btnPrimary = !!q('a.btn-primary');
  out.btnSecondary = !!q('a.btn-secondary');
  out.behaviors = document.querySelectorAll('.behaviors .b').length;
  out.metrics = document.querySelectorAll('.metric').length;
  out.quotes = document.querySelectorAll('.quote').length;
  out.badges = document.querySelectorAll('.badge').length;
  out.session = document.body.classList.contains('session');
  return out;
});
console.log('CHECKS', JSON.stringify(checks, null, 2));
console.log('CONSOLE ERRORS', errs.length, JSON.stringify(errs.slice(0, 8)));
await p.screenshot({ path: 'qa/full.png', fullPage: true });
// wide viewport content-width check
await p.setViewportSize({ width: 1680, height: 1000 });
await p.waitForTimeout(500);
const widths = await p.evaluate(() => {
  const out = {};
  ['hero', 'feature-trace', 'metrics', 'testimonials', 'security'].forEach((bn) => {
    const inner = document.querySelector(`.${bn} .wrap`) || document.querySelector(`.${bn}`)?.firstElementChild;
    out[bn] = inner ? Math.round(inner.getBoundingClientRect().width) : null;
  });
  return out;
});
console.log('WIDE WIDTHS(1680)', JSON.stringify(widths));
await b.close();
