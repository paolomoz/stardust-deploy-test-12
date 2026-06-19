import { chromium } from '/Users/paolo/.nvm/versions/node/v25.2.1/lib/node_modules/playwright/index.mjs';
const files = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1 });
for (const f of files) {
  const p = await ctx.newPage();
  await p.goto('file://'+f, { waitUntil:'networkidle' });
  await p.waitForTimeout(1200);
  // full page
  await p.screenshot({ path: f.replace(/\.html$/,'.full.png'), fullPage:true });
  // hero only
  await p.setViewportSize({width:1440,height:900});
  await p.screenshot({ path: f.replace(/\.html$/,'.hero.png') });
  await p.close();
  console.log('shot', f);
}
await b.close();
