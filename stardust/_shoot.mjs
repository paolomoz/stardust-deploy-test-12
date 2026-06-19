import pw from 'file:///Users/paolo/.nvm/versions/node/v25.2.1/lib/node_modules/playwright/index.js';
const { chromium } = pw;
const files = process.argv.slice(2);
const b = await chromium.launch({headless:true});
const ctx = await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
for (const f of files){
  const p = await ctx.newPage();
  await p.goto('file://'+process.cwd()+'/stardust/prototypes/'+f, {waitUntil:'networkidle', timeout:30000}).catch(()=>{});
  await p.waitForTimeout(1200);
  // scroll to trigger anims for cinematic
  const h = await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<h;y+=900){ await p.evaluate(yy=>scrollTo(0,yy),y); await p.waitForTimeout(150);} 
  await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(300);
  const out = 'stardust/prototypes/_shot-'+f.replace('.html','.png');
  await p.screenshot({path:out, fullPage:true});
  console.log('shot', out);
  await p.close();
}
await b.close();
