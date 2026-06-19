import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('stardust/current');
const be = JSON.parse(fs.readFileSync(path.join(ROOT,'_brand-extraction.json')));
const home = JSON.parse(fs.readFileSync(path.join(ROOT,'pages/home.json')));

const esc = (s)=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

// chrome tokens
const C = {
  bg: be.palette.find(p=>p.role==='background')?.value || '#fdfcfc',
  surface: be.palette.find(p=>p.role==='surface')?.value || '#f5f3f1',
  surfaceAlt: be.palette.find(p=>p.role==='surface-alt')?.value || '#ebe8e4',
  text: be.palette.find(p=>p.role==='text-primary')?.value || '#000',
  muted: be.palette.find(p=>p.role==='text-muted')?.value || '#777169',
  border: be.palette.find(p=>p.role==='border')?.value || '#e5e5e5',
  accent: be.palette.find(p=>p.role==='accent')?.value || '#eb524b',
};
const display = be.type.headingFamily.stack;
const body = be.type.bodyFamily.stack;
const mono = be.type.monoFamily.stack;
// near-black primary-dark for nav chrome (brand is monochrome → use ink)
const primaryDark = '#111';

// ---- tensions ----
const tensions = [];
if (be.type.scaleAudit.kind === 'ad-hoc')
  tensions.push({tag:'T-scale', title:'Type scale is ad-hoc', body:`Heading sizes don't follow a single modular ratio (${be.type.scaleAudit.ratios.join(' · ')}). Direct will need to decide whether the target adopts a modular scale.`, src:'_brand-extraction.json § type.scaleAudit'});
// color imbalance
be.palette.forEach(p=>{
  if (['text-primary','text-muted','background','surface','surface-alt','surface-inverse','border'].includes(p.role)) return;
  if (p.value==='#000000'||p.value==='#ffffff') return;
  const u = p.usedAs||[];
  if (u.length && !u.includes('background') && !u.includes('border')) {
    const missing = ['background','border'].filter(x=>!u.includes(x));
    tensions.push({tag:'T-color-imbalance', title:`Accent ${p.value} used in one context only`, body:`${p.value} (${p.role}) appears as ${u.join('/')} only — never as ${missing.join('/')}. It lives almost exclusively on the waveform/research surfaces. Direct must decide: keep as rare signal, expand, or drop.`, src:'_brand-extraction.json § palette[].usedAs'});
  }
});
// cta redundancy (nuanced)
const labels = be.voiceTable.ctaFrequency.map(c=>c.label.toLowerCase());
if (labels.includes('talk to sales') && labels.includes('contact sales'))
  tensions.push({tag:'T-cta-vocab', title:'Two phrasings for the sales path', body:`"Talk to sales" and "Contact sales" both appear for the same action. Direct should pick one canonical sales CTA.`, src:'pages/home.json § ctas'});
if (be.voiceTable.ctaFrequency.find(c=>c.label.toLowerCase()==='learn more')?.total >= 4)
  tensions.push({tag:'T-cta-vocab', title:'"Learn more" carries every secondary CTA', body:`"Learn more" appears 5× as the generic secondary affordance (creative, agents, about, safety…). Screen-reader and scan-clarity tension — the destination isn't in the label. Direct could differentiate ("See ElevenAgents", "Read the research").`, src:'pages/home.json § ctas'});
// logo variants
tensions.push({tag:'T-logo-variants', title:'Single logo variant captured', body:`Only the inline-SVG wordmark was captured. The redesign will likely need monochrome / inverted variants; direct should plan that.`, src:'_brand-extraction.json § logo'});
// alt text
const imgs = home.media.images;
const emptyAlt = imgs.filter(i=>!(i.alt||'').trim()).length;
if (imgs.length && emptyAlt/imgs.length >= 0.3)
  tensions.push({tag:'T-img-alt-empty', title:'Empty alt text widespread', body:`${Math.round(100*emptyAlt/imgs.length)}% of captured images (${emptyAlt}/${imgs.length}) carry empty alt text. Accessibility + content-sourcing decision for direct.`, src:'pages/home.json § media.images[].alt'});

// ---- palette swatches ----
const swatches = be.palette.map(p=>`
  <div class="swatch">
    <div class="chip" style="background:${esc(p.value)};${p.value.toLowerCase()==='#ffffff'||p.value.toLowerCase()==='#fdfcfc'?'border:1px solid var(--border)':''}"></div>
    <div class="srole">${esc(p.role)}</div>
    <div class="shex">${esc(p.value)}</div>
    <div class="smeta">${p.occurrences.toLocaleString()} · ${(p.usedAs||[]).map(u=>`<span class="uchip">${esc(u)}</span>`).join('')}</div>
  </div>`).join('');

// ---- type specimens ----
const hsizes = be.type.headingFamily;
const specimens = [
  {lab:`H1 · Waldenburg ${hsizes.weights[0]} / display / lh ${hsizes.lineHeights[0]}`, size:'4.25rem', weight:300, fam:display, ls:'-0.02em', text:be.voice.heroHeadline},
  {lab:`H2 · Waldenburg / section / lh ${hsizes.lineHeights[1]}`, size:'2.5rem', weight:400, fam:display, ls:'-0.015em', text:'Two platforms built on the same research foundation'},
  {lab:`H3 · Waldenburg / subhead`, size:'1.5rem', weight:400, fam:display, ls:'-0.01em', text:'Create, edit and localize in one AI platform'},
  {lab:`Eyebrow · Geist Mono / uppercase`, size:'0.8125rem', weight:400, fam:mono, ls:'0.08em', text:'RESEARCH', up:true},
  {lab:`Body · Inter 400 / 1.125rem / lh 1.55`, size:'1.125rem', weight:400, fam:body, ls:'normal', text:be.voice.heroSubcopy},
].map(s=>`
  <div class="spec">
    <div class="spec-lab">${esc(s.lab)}</div>
    <div class="spec-face" style="font-family:${s.fam};font-weight:${s.weight};font-size:${s.size};letter-spacing:${s.ls};${s.up?'text-transform:uppercase':''}">${esc(s.text)}</div>
  </div>`).join('');

// ---- motif radius cards ----
const radii = Object.entries(be.motifs.borderRadius.occurrences).sort((a,b)=>b[1]-a[1]);
const radCards = radii.map(([r,n])=>`
  <div class="motif">
    <div class="motif-box" style="border-radius:${esc(r)};${r==='9999px'?'width:120px;height:48px':''}"></div>
    <div class="smeta"><b>${esc(r)}</b> · ${n}×</div>
  </div>`).join('');

// ---- ctas table ----
const ctaRows = be.voiceTable.ctaFrequency.map(c=>`<tr><td><span class="pill">${esc(c.label)}</span></td><td>${c.total}</td><td>${c.pageCount}</td></tr>`).join('');

// ---- components ----
const comps = Object.entries(home.components).filter(([k,v])=>v&&v.count>0).map(([k,v])=>`<li><b>${esc(k)}</b> — ${v.count}</li>`).join('');
const patterns = be.motifs.patterns.map(p=>`<li><b>${esc(p.name)}</b> — ${esc(p.evidence)}</li>`).join('');

// ---- nav links ----
const sections = ['Coverage','Pages','Palette','Typography','Voice','Tensions','Motifs','Components','System','Logo','Spacing'];
const navlinks = sections.map(s=>`<a href="#${s.toLowerCase()}">${s}</a>`).join('');

const upper = be.voiceTable.toneMetrics.headingsUppercasePercent >= 25;

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ElevenLabs · Current-state brand review</title>
<style>
:root{--bg:${C.bg};--surface:${C.surface};--surface-alt:${C.surfaceAlt};--text:${C.text};--muted:${C.muted};--border:${C.border};--accent:${C.accent};--primary-dark:${primaryDark};--display:${display};--body:${body};--mono:${mono};}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:var(--body);line-height:1.55;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:var(--display);font-weight:400;letter-spacing:-0.015em;${upper?'text-transform:uppercase;':''}}
h1{font-weight:300;letter-spacing:-0.02em}
.nav{position:sticky;top:0;z-index:10;background:var(--primary-dark);color:#fff;display:flex;flex-wrap:wrap;gap:4px;align-items:center;padding:10px 24px;font-family:var(--display);text-transform:uppercase;letter-spacing:1.5px;font-size:12px}
.nav .brand{font-weight:700;margin-right:auto}
.nav a{color:#fff;text-decoration:none;padding:4px 10px;border-radius:150px}
.nav a:hover{background:rgba(255,255,255,0.18)}
.wrap{max-width:1180px;margin:0 auto;padding:0 24px}
section{padding:56px 0;border-bottom:1px solid var(--border)}
.eyebrow{font-family:var(--mono);text-transform:uppercase;letter-spacing:0.08em;font-size:12px;color:var(--muted);margin:0 0 8px}
.badge{display:inline-block;font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:0.06em;background:var(--surface);border:1px solid var(--border);border-radius:150px;padding:2px 10px;margin-left:8px;color:var(--muted);vertical-align:middle}
.masthead{padding:72px 0 56px}
.masthead .hero-line{font-family:var(--display);font-weight:300;font-size:clamp(2.5rem,6vw,4.5rem);line-height:1.05;letter-spacing:-0.02em;color:var(--accent);margin:12px 0}
.masthead .tagline{font-size:1.125rem;color:var(--muted);max-width:60ch}
.masthead .url{font-family:var(--mono);font-size:13px;color:var(--muted);margin-top:16px}
.cov{display:flex;flex-wrap:wrap;gap:16px}
.cov .box{flex:1;min-width:220px;background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:20px}
.cov .num{font-family:var(--display);font-size:2rem}
.grid-sw{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:18px}
.swatch{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:16px}
.chip{height:96px;border-radius:14px;margin-bottom:12px}
.srole{font-family:var(--display);text-transform:uppercase;letter-spacing:0.04em;font-size:13px}
.shex{font-family:var(--mono);font-size:13px;color:var(--muted)}
.smeta{font-size:12px;color:var(--muted);margin-top:6px}
.uchip{display:inline-block;background:var(--bg);border:1px solid var(--border);border-radius:150px;padding:1px 8px;margin:2px 2px 0 0;font-family:var(--mono);font-size:11px}
.spec{padding:18px 0;border-bottom:1px dashed var(--border)}
.spec-lab{font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:8px}
.spec-face{color:var(--text)}
.cards{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.vcard{background:var(--surface-alt);border-radius:20px;padding:22px}
.vcard .k{font-family:var(--mono);font-size:11px;text-transform:uppercase;color:var(--muted)}
.vcard .v{font-family:var(--display);font-size:1.25rem;margin-top:6px}
table{width:100%;border-collapse:collapse;margin-top:16px}
th,td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--border);font-size:14px}
th{font-family:var(--display);text-transform:uppercase;letter-spacing:0.04em;font-size:12px}
.pill{display:inline-block;background:#000;color:#fff;border-radius:9999px;padding:4px 14px;font-family:var(--mono);font-size:12px}
.tens{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.tcard{border-left:4px solid var(--accent);background:var(--surface);border-radius:0 16px 16px 0;padding:16px 18px}
.tcard .tag{font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:0.06em;background:var(--accent);color:#fff;border-radius:150px;padding:2px 10px}
.tcard h4{margin:10px 0 6px}
.tcard .src{font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:8px}
.motifs{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:16px}
.motif{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:16px;text-align:center}
.motif-box{width:72px;height:72px;background:#000;margin:0 auto 10px}
.cols{columns:2;gap:32px}
ul.clean{list-style:none;padding:0;margin:0}
ul.clean li{padding:8px 0 8px 14px;border-left:3px solid var(--accent);margin-bottom:8px;font-size:14px}
.foot{color:var(--muted);font-size:13px}
.logo-row{display:flex;gap:24px;align-items:center;flex-wrap:wrap}
.logo-box{max-width:280px;background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:24px}
dl{display:grid;grid-template-columns:auto 1fr;gap:6px 18px;font-size:14px}
dt{font-family:var(--display);text-transform:uppercase;font-size:12px;letter-spacing:0.04em;color:var(--muted)}
@media(max-width:720px){.tens,.cards{grid-template-columns:1fr}.cols{columns:1}}
</style></head>
<body>
<nav class="nav"><span class="brand">ElevenLabs · Current state</span>${navlinks}</nav>
<header class="wrap masthead">
  <p class="eyebrow">Stardust · current-state brand review</p>
  <h1 style="margin:0;font-size:clamp(2rem,4vw,3rem)">ElevenLabs</h1>
  <p class="hero-line">${esc(be.voice.heroHeadline)}</p>
  <p class="tagline">${esc(be.site.tagline)}</p>
  <p class="url">${esc(be.site.originUrl)}</p>
</header>

<section id="coverage" class="wrap"><p class="eyebrow">Coverage</p><h2>Extraction coverage <span class="badge">cross-page n/a · single page</span></h2>
<div class="cov">
  <div class="box"><div class="num">1 / 1</div>pages extracted (--single, homepage)</div>
  <div class="box"><div class="num">${(home._provenance.waitMs/1000).toFixed(1)}s</div>wait · mode <b>${esc(home._provenance.waitMode)}</b> · HTTP ${home._provenance.httpStatus}</div>
  <div class="box"><div class="num">${be.palette.length} · ${be.type.files.length}</div>palette colors · captured font files</div>
</div></section>

<section id="pages" class="wrap"><p class="eyebrow">Pages</p><h2>Captured surface <span class="badge">screenshot</span></h2>
<div class="logo-row"><div class="logo-box" style="max-width:520px"><img src="assets/screenshots/home.png" alt="ElevenLabs home" style="width:100%;border-radius:12px;border:1px solid var(--border)"><div class="smeta" style="margin-top:8px"><b>${esc(home.title)}</b> · <span style="font-family:var(--mono)">/</span></div></div></div></section>

<section id="palette" class="wrap"><p class="eyebrow">Color</p><h2>Palette <span class="badge">home-only</span></h2>
<div class="grid-sw">${swatches}</div></section>

<section id="typography" class="wrap"><p class="eyebrow">Type</p><h2>Typography <span class="badge">No modular scale</span></h2>
${specimens}</section>

<section id="voice" class="wrap"><p class="eyebrow">Voice</p><h2>Voice <span class="badge">${esc(be.voice.tone.guess)}</span></h2>
<div class="cards">
  <div class="vcard"><div class="k">Hero headline</div><div class="v">${esc(be.voice.heroHeadline)}</div></div>
  <div class="vcard"><div class="k">Tagline</div><div class="v">${esc(be.site.tagline)}</div></div>
  <div class="vcard"><div class="k">First paragraph</div><div class="v" style="font-size:1rem;font-family:var(--body)">${esc(be.voice.firstParagraph)}</div></div>
</div>
<h3 style="margin-top:32px">CTA frequency</h3>
<table><thead><tr><th>Label</th><th>Total</th><th>Pages</th></tr></thead><tbody>${ctaRows}</tbody></table>
<div class="cov" style="margin-top:24px">
  <div class="box"><div class="num">${be.voiceTable.toneMetrics.headingsUppercasePercent}%</div>headings uppercase</div>
  <div class="box"><div class="num">${be.voiceTable.toneMetrics.distinctHeadings}</div>distinct headings</div>
  <div class="box"><div class="num">${be.voiceTable.toneMetrics.distinctCtaLabels}</div>distinct CTA labels</div>
</div></section>

<section id="tensions" class="wrap"><p class="eyebrow">Decisions for direct</p><h2>Tensions <span class="badge">${tensions.length}</span></h2>
<div class="tens">${tensions.map(t=>`<div class="tcard"><span class="tag">${esc(t.tag)}</span><h4>${esc(t.title)}</h4><p>${esc(t.body)}</p><div class="src">Source: ${esc(t.src)}</div></div>`).join('')}</div></section>

<section id="motifs" class="wrap"><p class="eyebrow">Shape</p><h2>Motifs <span class="badge">home-only</span></h2>
<div class="motifs">${radCards}</div></section>

<section id="components" class="wrap"><p class="eyebrow">Components & patterns</p><h2>Components <span class="badge">observed</span></h2>
<div class="cols"><ul class="clean">${comps}${patterns}</ul></div></section>

<section id="system" class="wrap"><p class="eyebrow">System components</p><h2>Repeated structure <span class="badge">home-only</span></h2>
<ul class="clean">${be.systemComponents.map(s=>`<li><b>${esc(s.name)}</b> (${esc(s.kind)}) — ${esc((s.headingSequence||[]).join(' · '))}${s.ctaLabels.length?` — CTAs: ${esc(s.ctaLabels.join(', '))}`:''}</li>`).join('')}</ul></section>

<section id="logo" class="wrap"><p class="eyebrow">Logo</p><h2>Logo & marks</h2>
<div class="logo-row">
  <div class="logo-box"><img src="assets/logo.svg" alt="ElevenLabs logo" style="width:100%;max-height:80px;object-fit:contain"></div>
  <dl>
    <dt>Source</dt><dd>${esc(be.logo.source)}</dd>
    <dt>File</dt><dd>${esc(be.logo.format)} · inline</dd>
    <dt>Variants captured</dt><dd>1 (primary)</dd>
    <dt>Variants not captured</dt><dd>monochrome / inverted (see T-logo-variants)</dd>
  </dl>
</div></section>

<section id="spacing" class="wrap"><p class="eyebrow">Spacing & shape</p><h2>Spacing & radii</h2>
<p>Base unit <b>${be.spacing.baseUnit}px</b> · section padding <b>${esc(be.spacing.sectionPadding)}</b> · container <b>${esc(be.spacing.containerMaxWidth)}</b></p>
<div class="motifs" style="margin-top:16px">${radii.map(([r,n])=>`<div class="motif"><div class="motif-box" style="border-radius:${esc(r)};background:var(--surface);border:1px solid var(--border)"></div><div class="smeta">${esc(r)}</div></div>`).join('')}</div></section>

<footer class="wrap" style="padding:40px 0">
  <p class="foot">Generated by <b>stardust:extract</b> (uplift) from a single live Playwright render of ${esc(be.site.originUrl)}. Read: pages/home.json, _brand-extraction.json, assets/screenshots/home.png, assets/logo.svg.</p>
  <p class="foot">What's next → <b>/stardust:direct</b> resolves a redesign direction from these tensions.</p>
</footer>
</body></html>`;

fs.writeFileSync(path.join(ROOT,'brand-review.html'), html);
console.log('BRAND_REVIEW_OK tensions='+tensions.length+' swatches='+be.palette.length);
