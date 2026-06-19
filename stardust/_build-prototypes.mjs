import fs from 'fs';
const OUT = 'stardust/prototypes';

/* ---------------- shared faithful content (from capture) ---------------- */
const C = {
  brand: 'Adaline',
  nav: { primary: ['Docs', 'Pricing', 'Blog'], cta: ['Sign in', 'Contact sales', 'Sign up'] },
  hero: {
    eyebrow: 'The Self-Improving Agent',
    h1: 'Never stop learning',
    sub: 'Adaline helps AI teams improve their agents autonomously, so you can find fires before they happen, ship fixes in minutes, and feel confidence in their agents — for the first time.',
    ctaPrimary: 'Sign Up', ctaSecondary: 'Read Docs',
  },
  trustedBy: ['Salesforce', 'DoorDash', 'HubSpot', 'Superhuman', 'Reforge', 'Discord', 'McKinsey', 'Coframe'],
  trace: {
    id: '$BH_B82E1D', label: 'TRACES', clock: '06:10:12',
    rows: [
      ['06:10:12', 'agent.plan.revise', '3.8s', '$0.10', 'step 40/30 — fan-in failed, back to branch B', 'WRN'],
      ['06:10:10', 'git.merge', '340ms', '$1.45', 'clean merge to main · no conflicts · 14 commits', ''],
      ['06:10:10', 'agent.fix_proposal', '1.6s', '$0.02', 'adding mutex to parallel-safe checkoutSession.flush()', ''],
      ['06:10:11', 'pytest.run', '14s', '$4.89', 'FAILED tests/race/test_parallel_checkout.py 3/18', 'ERR'],
      ['06:10:11', 'pr.reviewed', '—', '$3.73', 'SRE: “looks good, but can we add a drift alert?”', ''],
      ['06:10:11', 'pr.opened', '420ms', '$0.02', 'acme/infra/pull/284 · fixes HPA drift on billing-api', ''],
    ],
  },
  behaviors: [
    ['B01', 'ISSUE', 'pytest failures on first run', 'tool · pytest.run'],
    ['B02', 'CHANGED', 'Fix-test-failure proposals', 'ai · agent.fix_proposal'],
    ['B03', '', 'PRs opened successfully', 'ai · pr.opened'],
    ['B04', '', 'Ambiguous refactor requests', 'user · ticket.ingest'],
    ['B05', 'ISSUE', 'Plan steps exceed 30 iterations', 'ai · agent.plan.step'],
    ['B06', '', 'Spec ambiguity', 'user · agent.ask_clarification'],
    ['B07', '', 'Code review roundtrips', 'ai · pr.reviewed'],
    ['B09', 'CHANGED', 'Git merge conflicts on rebase', 'tool · git.rebase'],
    ['B13', 'ISSUE', 'Long refactor proposals (>200 LOC)', 'ai · agent.refactor'],
    ['B24', 'NEW', 'Hallucinated import paths', 'ai · codegen.edit.insert'],
    ['B25', '', 'Security scan hits (Snyk / SAST)', 'tool · security.scan'],
  ],
  sections: {
    understand: { h: 'Truly understand your agents', p: 'Adaline ingests production traces and groups recurring agent patterns into behavior maps your team can inspect.' },
    evals: { h: 'Evals that write themselves', p: 'Adaline generates evals from detected behaviors and user feedback, so regressions are caught before agent changes ship.' },
    synthetic: { h: 'Synthetic data for the gaps', p: 'Adaline generates production-faithful synthetic data for the scenarios you keep meaning to cover and the ones you never knew existed.' },
  },
  positioning: 'Adaline is the ML layer between your traces and your agent diffs — behaviors, evals, data.',
  metrics: [ ['2.4M', 'traces ingested / wk'], ['1,830', 'behaviors grouped'], ['312', 'regressions caught'], ['0%', 'insufficient-answer rate'] ],
  testimonials: [
    { q: 'Adaline has become an invaluable tool for my team to develop GenAI products.', a: 'Tan S.', r: 'Product Manager for Lilli · McKinsey & Company' },
    { q: "Adaline is simply the best platform I've found that bridges the gap between technical & nontechnical LLM development.", a: 'Ian W.', r: 'Member of Technical Staff · OpenAI' },
    { q: 'Before Adaline, iterating and evaluating prompts was a nightmare. Adaline totally changes the game here.', a: 'Josh P.', r: 'CEO · Coframe' },
  ],
  security: ['SOC 2 Type II', 'GDPR', 'SSO / SAML', 'HIPAA', 'PII DPAs'],
  footer: {
    close: 'Self-improve your agents now.',
    cols: {
      COMPANY: ['The Self-Improving Agent', 'Labs', 'Applied', 'Pricing', 'Blog', 'Careers'],
      RESOURCES: ['Documentation', 'API reference', 'DPA', 'Privacy policy', 'Terms of service', 'Report vulnerability'],
      CONNECT: ['Github', 'Newsletter', 'LinkedIn', 'X (Twitter)', 'YouTube'],
    },
    tag: 'Never stop learning', copy: '© 2026 Adaline Inc.',
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------------- shared CSS ---------------- */
function fonts() {
  return `
@font-face{font-family:Akkurat;src:url(fonts/Akkurat-Regular.woff2) format('woff2');font-weight:400;font-display:swap}
@font-face{font-family:Akkurat;src:url(fonts/Akkurat-Bold.woff2) format('woff2');font-weight:700;font-display:swap}
@font-face{font-family:Akkurat;src:url(fonts/Akkurat-Italic.woff2) format('woff2');font-weight:400;font-style:italic;font-display:swap}
@font-face{font-family:'Fragment Mono';src:url(fonts/FragmentMono-Regular.woff2) format('woff2');font-weight:400;font-display:swap}
@font-face{font-family:'Instrument Serif';src:url(fonts/InstrumentSerif-Regular.woff2) format('woff2');font-weight:400;font-display:swap}
@font-face{font-family:Newsreader;src:url(fonts/Newsreader-Regular.woff2) format('woff2');font-weight:400;font-display:swap}`;
}

function baseCss(v) {
  const headFam = v.headlineFamily === 'serif'
    ? `'Instrument Serif', Newsreader, Georgia, serif`
    : `Akkurat, Inter, system-ui, sans-serif`;
  const heroSize = v.headlineFamily === 'serif' ? 'clamp(56px, 9vw, 116px)' : 'clamp(44px, 6.4vw, 84px)';
  const heroLh = v.headlineFamily === 'serif' ? '0.94' : '1.02';
  const heroLs = v.headlineFamily === 'serif' ? '-0.01em' : '-0.03em';
  const secHeadFam = headFam;
  const secHeadSize = v.headlineFamily === 'serif' ? 'clamp(34px, 4.4vw, 56px)' : 'clamp(26px, 3vw, 38px)';
  const secHeadLs = v.headlineFamily === 'serif' ? '0' : '-0.02em';
  return `
:root{
  --paper:#FBFDF6;--ink:#0A1D08;--ink2:#2A332A;--subtle:#6B7860;
  --forest:#203B14;--forest2:#2E4320;--pill:#ECF2DF;
  --surface:#F8F9F5;--surface2:#EFF2E8;--surface3:#E1E6DF;
  --dark:#22301d;--darkest:#101a10;--border:rgba(46,67,32,.16);--border2:rgba(46,67,32,.28);
  --ridge1:#cdd8c4;--ridge2:#aebfa3;--ridge3:#8aa07f;--sky:#eef3e6;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--paper);color:var(--ink);font-family:Akkurat,Inter,system-ui,sans-serif;
  font-size:17px;line-height:1.55;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
.wrap{max-width:1200px;margin:0 auto;padding:0 clamp(20px,5vw,56px)}
.mono{font-family:'Fragment Mono',ui-monospace,monospace}
.eyebrow{font-family:'Fragment Mono',ui-monospace,monospace;text-transform:uppercase;font-size:11px;
  letter-spacing:.12em;color:var(--subtle)}
a{color:inherit;text-decoration:none}
h1,h2,h3{font-weight:400}
h1{font-family:${headFam};font-size:${heroSize};line-height:${heroLh};letter-spacing:${heroLs}}
.sec-head{font-family:${secHeadFam};font-size:${secHeadSize};line-height:1.05;letter-spacing:${secHeadLs};max-width:18ch}

/* nav */
nav.top{position:sticky;top:0;z-index:50;backdrop-filter:blur(10px);
  background:color-mix(in srgb,var(--paper) 82%,transparent);border-bottom:1px solid var(--border)}
nav.top .wrap{display:flex;align-items:center;gap:28px;height:64px}
.logo{display:flex;align-items:center;gap:9px;font-weight:700;font-size:18px;letter-spacing:-.02em}
.logo .mark{width:20px;height:20px;border-radius:6px;background:
  radial-gradient(circle at 30% 30%,#6f8a5f,var(--forest))}
nav.top .links{display:flex;gap:22px;font-size:14.5px;color:var(--ink2)}
nav.top .right{margin-left:auto;display:flex;align-items:center;gap:18px;font-size:14.5px}
.btn{display:inline-flex;align-items:center;gap:8px;border-radius:9999px;padding:10px 20px;font-size:15px;
  border:1px solid transparent;transition:.18s ease;cursor:pointer;white-space:nowrap}
.btn-pri{background:var(--forest);color:var(--paper)}
.btn-pri:hover{background:var(--forest2);transform:translateY(-1px)}
.btn-ghost{background:transparent;color:var(--ink);border-color:var(--border2)}
.btn-ghost:hover{background:var(--surface2)}
.btn-sm{padding:8px 16px;font-size:14px}

/* hero */
.hero{position:relative;overflow:hidden;border-bottom:1px solid var(--border)}
.hero-bg{position:absolute;inset:0;z-index:0;background:
  linear-gradient(180deg,var(--sky) 0%,#e7eede 38%,var(--paper) 100%)}
.hero-bg::after{content:"";position:absolute;inset:0;
  background:
   radial-gradient(120% 80% at 50% 120%, transparent 38%, rgba(32,59,20,.05) 70%),
   url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><circle cx='1' cy='1' r='.5' fill='%23203b14' opacity='.05'/></svg>")}
.ridge{position:absolute;left:0;right:0;bottom:0;width:100%;display:block;z-index:0}
.hero .wrap{position:relative;z-index:1;padding-top:clamp(56px,8vw,104px);padding-bottom:48px}
.hero-pill{display:inline-flex;align-items:center;gap:8px;background:var(--pill);
  border:1px solid var(--border2);border-radius:9999px;padding:7px 15px 7px 12px;font-size:13px;margin-bottom:26px}
.hero-pill .dot{width:7px;height:7px;border-radius:50%;background:var(--forest)}
.hero h1{margin-bottom:22px;max-width:15ch}
.hero .sub{font-size:clamp(17px,1.5vw,20px);line-height:1.5;max-width:46ch;color:var(--ink2)}
.hero .cta-row{display:flex;gap:14px;margin-top:30px;flex-wrap:wrap;align-items:center}
.hero .cta-note{font-size:13px;color:var(--subtle)}

/* trusted */
.trusted{padding:30px 0 8px}
.trusted .lbl{font-family:'Fragment Mono',monospace;font-size:11px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--subtle);margin-bottom:16px}
.logos{display:flex;flex-wrap:wrap;gap:14px 30px;align-items:center}
.logos .l{font-weight:700;font-size:19px;letter-spacing:-.02em;color:var(--ink);opacity:.62;
  filter:saturate(0);transition:.2s}
.logos .l:hover{opacity:1}

/* section scaffold */
section.band{padding:clamp(40px,5vw,64px) 0;border-bottom:1px solid var(--border)}
section.band.alt{background:var(--surface)}
.sec-intro{max-width:62ch;margin-bottom:30px}
.sec-intro .narr{margin-top:12px;color:var(--ink2);font-size:17px;max-width:54ch}
.feature{display:grid;grid-template-columns:0.82fr 1.18fr;gap:40px;align-items:center}
@media(max-width:880px){.feature{grid-template-columns:1fr;gap:24px}}
.feature.rev{grid-template-columns:1.18fr 0.82fr}
.feature.rev .copy{order:2}@media(max-width:880px){.feature.rev .copy{order:0}}

/* panel */
.panel{background:#fff;border:1px solid var(--border2);border-radius:12px;overflow:hidden;
  box-shadow:0 1px 0 rgba(46,67,32,.04),0 18px 40px -28px rgba(16,26,16,.5)}
.panel .ph{display:flex;align-items:center;gap:10px;padding:11px 14px;border-bottom:1px solid var(--border);
  background:var(--surface2);font-family:'Fragment Mono',monospace;font-size:11.5px;color:var(--ink2)}
.panel .ph .live{margin-left:auto;display:inflex;display:flex;align-items:center;gap:7px;color:var(--forest)}
.dot-live{width:7px;height:7px;border-radius:50%;background:#3f7d3a;box-shadow:0 0 0 0 rgba(63,125,58,.5)}
.trace{font-family:'Fragment Mono',monospace;font-size:12px;line-height:1.5}
.trace .r{display:grid;grid-template-columns:62px 132px 50px 56px 1fr;gap:10px;padding:8px 14px;
  border-bottom:1px solid var(--border);align-items:baseline;color:var(--ink2)}
.trace .r:last-child{border-bottom:0}
.trace .t{color:var(--subtle)}
.trace .op{color:var(--forest)}
.trace .msg{color:var(--ink2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tag{font-family:'Fragment Mono',monospace;font-size:10px;padding:1px 6px;border-radius:4px;letter-spacing:.04em}
.tag.ERR{background:#f4e3df;color:#8a3b27}
.tag.WRN{background:#f1ecd9;color:#7a6a23}
.tag.ISSUE{background:#f4e3df;color:#8a3b27}
.tag.CHANGED{background:#e3ecdb;color:#3f6a2e}
.tag.NEW{background:var(--forest);color:var(--paper)}

/* behaviors list */
.behaviors{font-family:'Fragment Mono',monospace;font-size:12.5px}
.behaviors .b{display:grid;grid-template-columns:42px 1fr auto;gap:12px;padding:10px 14px;
  border-bottom:1px solid var(--border);align-items:center}
.behaviors .b:last-child{border-bottom:0}
.behaviors .bid{color:var(--subtle)}
.behaviors .bname{color:var(--ink);font-family:Akkurat,sans-serif;font-size:14.5px}
.behaviors .bsrc{color:var(--subtle);font-size:11px}
.behaviors .b .left{display:flex;align-items:center;gap:10px;min-width:0}

/* metrics */
.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:26px}
@media(max-width:760px){.metrics{grid-template-columns:repeat(2,1fr)}}
.metric{border:1px solid var(--border);border-radius:10px;padding:18px;background:var(--paper)}
.metric .v{font-size:34px;letter-spacing:-.03em;line-height:1}
.metric .k{font-family:'Fragment Mono',monospace;font-size:11px;text-transform:uppercase;
  letter-spacing:.08em;color:var(--subtle);margin-top:8px}

/* positioning */
.position{padding:clamp(48px,6vw,84px) 0;text-align:center;border-bottom:1px solid var(--border)}
.position p{font-family:${secHeadFam};font-size:clamp(26px,3.4vw,44px);line-height:1.15;
  letter-spacing:${secHeadLs};max-width:20ch;margin:0 auto;color:var(--ink)}

/* testimonials */
.quotes{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:880px){.quotes{grid-template-columns:1fr}}
.quote{border:1px solid var(--border);border-radius:12px;padding:24px;background:var(--paper);display:flex;flex-direction:column;gap:16px}
.quote p{font-size:17px;line-height:1.45}
.quote .who{font-size:13px;color:var(--subtle);font-family:'Fragment Mono',monospace}
.quote .who b{color:var(--ink);font-family:Akkurat,sans-serif;font-weight:700;display:block;font-size:14px;margin-bottom:2px}

/* security */
.security{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.badge{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--border2);border-radius:9999px;
  padding:8px 16px;font-size:13.5px;background:var(--paper)}
.badge .c{width:6px;height:6px;border-radius:50%;background:var(--forest)}

/* footer */
footer{background:var(--darkest);color:#dfe7d8;padding:clamp(56px,7vw,96px) 0 40px;position:relative;overflow:hidden}
footer .close{font-family:'Instrument Serif',Newsreader,Georgia,serif;
  font-size:clamp(48px,9vw,116px);line-height:.96;letter-spacing:-.01em;color:var(--paper);max-width:14ch}
footer .fcta{display:flex;gap:14px;margin:32px 0 56px;flex-wrap:wrap}
footer .fcta .btn-ghost{color:#dfe7d8;border-color:rgba(223,231,216,.28)}
footer .fcta .btn-ghost:hover{background:rgba(223,231,216,.08)}
footer .cols{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:32px;
  border-top:1px solid rgba(223,231,216,.16);padding-top:40px}
@media(max-width:760px){footer .cols{grid-template-columns:1fr 1fr}}
footer h4{font-family:'Fragment Mono',monospace;font-size:11px;letter-spacing:.12em;color:#9fae93;
  text-transform:uppercase;margin-bottom:14px;font-weight:400}
footer ul{list-style:none}
footer li{margin-bottom:9px;font-size:14px;color:#c4cfba}
footer li a:hover{color:#fff}
footer .brandcol .mono{color:#9fae93;font-size:13px;margin-top:10px}
footer .legal{display:flex;justify-content:space-between;margin-top:40px;font-size:12px;color:#8a9a7e;
  font-family:'Fragment Mono',monospace;flex-wrap:wrap;gap:8px}

/* reduced motion */
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;
}

/* ---------------- markup fragments ---------------- */
function ridgeSVG() {
  return `<svg class="ridge" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
  <path d="M0,180 L120,150 L260,168 L420,120 L560,150 L720,96 L900,140 L1080,110 L1260,150 L1440,128 L1440,220 L0,220 Z" fill="%23ridge" style="fill:var(--ridge3);opacity:.5"/>
  <path d="M0,196 L160,176 L340,190 L520,160 L700,184 L880,150 L1060,182 L1240,164 L1440,188 L1440,220 L0,220 Z" fill="var(--ridge2)" style="opacity:.55"/>
  <path d="M0,210 L200,200 L420,208 L640,196 L860,208 L1080,198 L1300,210 L1440,202 L1440,220 L0,220 Z" style="fill:var(--ridge1);opacity:.7"/>
</svg>`;
}

function navHTML() {
  return `<nav class="top"><div class="wrap">
    <a class="logo" href="#"><span class="mark"></span>${C.brand}</a>
    <div class="links">${C.nav.primary.map(l=>`<a href="#">${l}</a>`).join('')}</div>
    <div class="right">
      <a href="#">Sign in</a>
      <a href="#">Contact sales</a>
      <a class="btn btn-pri btn-sm" href="#">Sign up</a>
    </div>
  </div></nav>`;
}

function heroHTML(v) {
  const tickClass = v.motion ? ' data-anim="trace"' : '';
  return `<header class="hero">
  <div class="hero-bg"></div>
  ${ridgeSVG()}
  <div class="wrap">
    <div class="feature">
      <div class="copy">
        <span class="hero-pill"><span class="dot"></span><span class="mono" style="font-size:12px">${C.hero.eyebrow}</span></span>
        <h1>${C.hero.h1}</h1>
        <p class="sub">${esc(C.hero.sub)}</p>
        <div class="cta-row">
          <a class="btn btn-pri" href="#">${C.hero.ctaPrimary}</a>
          <a class="btn btn-ghost" href="#">${C.hero.ctaSecondary}</a>
          <span class="cta-note">No credit card · SOC 2 Type II</span>
        </div>
      </div>
      <div class="panel"${tickClass}>
        <div class="ph"><span>${C.trace.id}</span><span>${C.trace.label}</span>
          <span class="live"><span class="dot-live"${v.motion?' data-pulse':''}></span>LIVE <span data-clock>${C.trace.clock}</span></span></div>
        <div class="trace" data-trace>
          ${C.trace.rows.map((r,i)=>traceRow(r,i,v)).join('')}
        </div>
      </div>
    </div>
    <div class="trusted">
      <div class="lbl">Trusted by teams at</div>
      <div class="logos">${C.trustedBy.map(l=>`<span class="l">${l}</span>`).join('')}</div>
    </div>
  </div>
</header>`;
}

function traceRow(r,i,v){
  const [t,op,lat,cost,msg,tag]=r;
  const hidden = v.motion && i>=2 ? ' data-row-hidden' : '';
  return `<div class="r"${hidden} style="${v.motion&&i>=2?'opacity:0':''}">
    <span class="t">${t}</span><span class="op">${op}</span><span>${lat}</span>
    <span>${cost}</span><span class="msg">${tag?`<span class="tag ${tag}">${tag}</span> `:''}${esc(msg)}</span></div>`;
}

function understandSection(v){
  const s=C.sections.understand;
  return `<section class="band"><div class="wrap"><div class="feature rev">
    <div class="copy">
      <span class="eyebrow">01 · Observe</span>
      <h2 class="sec-head" style="margin:10px 0 14px">${s.h}</h2>
      <p style="color:var(--ink2);max-width:46ch">${esc(s.p)}</p>
      <p class="narr" style="margin-top:14px;color:var(--subtle);font-size:15px;max-width:46ch">
        <b style="color:var(--ink2)">In plain terms:</b> every run your agent makes — tool calls, merges, test runs — streams in with latency and cost, grouped so you can see the patterns, not just the noise.</p>
    </div>
    <div class="panel"${v.motion?' data-anim="trace2"':''}>
      <div class="ph"><span>$TR_4F1A</span><span>LIVE TRACE</span><span class="live"><span class="dot-live"${v.motion?' data-pulse':''}></span>STREAMING</span></div>
      <div class="trace">
        ${C.trace.rows.slice(0,5).map((r,i)=>traceRow(r,i,{motion:false})).join('')}
      </div>
    </div>
  </div></div></section>`;
}

function evalsSection(v){
  const s=C.sections.evals;
  return `<section class="band alt"><div class="wrap"><div class="feature">
    <div class="copy">
      <span class="eyebrow">02 · Evaluate</span>
      <h2 class="sec-head" style="margin:10px 0 14px">${s.h}</h2>
      <p style="color:var(--ink2);max-width:46ch">${esc(s.p)}</p>
      <p class="narr" style="margin-top:14px;color:var(--subtle);font-size:15px;max-width:46ch">
        <b style="color:var(--ink2)">Behaviors</b> are the recurring agent patterns Adaline groups for you. Each becomes an eval that runs on every change — regressions caught before they ship.</p>
    </div>
    <div class="panel"${v.motion?' data-anim="behaviors"':''}>
      <div class="ph"><span>$EV_02CC4A</span><span>BEHAVIORS</span><span class="live"><span class="dot-live"${v.motion?' data-pulse':''}></span>LIVE</span></div>
      <div class="behaviors" data-behaviors>
        ${C.behaviors.map((b,i)=>behaviorRow(b,i,v)).join('')}
      </div>
    </div>
  </div></div></section>`;
}

function behaviorRow(b,i,v){
  const [id,tag,name,src]=b;
  const hide=v.motion?' data-bhide':'';
  return `<div class="b"${hide} style="${v.motion?`opacity:0;--d:${i*70}ms`:''}">
    <span class="bid">${id}</span>
    <div class="left">${tag?`<span class="tag ${tag}">${tag}</span>`:''}<span class="bname">${esc(name)}</span></div>
    <span class="bsrc">${src}</span></div>`;
}

function syntheticSection(v){
  const s=C.sections.synthetic;
  return `<section class="band"><div class="wrap">
    <div class="sec-intro">
      <span class="eyebrow">03 · Generate</span>
      <h2 class="sec-head" style="margin:10px 0 12px">${s.h}</h2>
      <p style="color:var(--ink2);max-width:54ch">${esc(s.p)}</p>
    </div>
    <div class="metrics">
      ${C.metrics.map(m=>`<div class="metric"><div class="v" data-count="${m[0]}">${m[0]}</div><div class="k">${m[1]}</div></div>`).join('')}
    </div>
  </div></section>`;
}

function positionSection(){
  return `<section class="position"><div class="wrap"><p>${esc(C.positioning)}</p></div></section>`;
}

function testimonialSection(){
  return `<section class="band alt"><div class="wrap">
    <div class="sec-intro"><span class="eyebrow">Trusted in production</span></div>
    <div class="quotes">${C.testimonials.map(t=>`<figure class="quote">
      <p>“${esc(t.q)}”</p>
      <figcaption class="who"><b>${t.a}</b>${t.r}</figcaption></figure>`).join('')}</div>
  </div></section>`;
}

function securitySection(){
  return `<section class="band"><div class="wrap">
    <div class="feature rev" style="align-items:center">
      <div class="copy">
        <span class="eyebrow">Enterprise-ready</span>
        <h2 class="sec-head" style="margin:10px 0 12px">Anything your CISO's wishlist might have, we have more</h2>
      </div>
      <div class="security">${C.security.map(s=>`<span class="badge"><span class="c"></span>${s}</span>`).join('')}</div>
    </div>
  </div></section>`;
}

function footerHTML(){
  const f=C.footer;
  return `<footer><div class="wrap">
    <div class="close">${f.close}</div>
    <div class="fcta">
      <a class="btn btn-pri" href="#">Sign Up</a>
      <a class="btn btn-ghost" href="#">Read Docs</a>
    </div>
    <div class="cols">
      <div class="brandcol">
        <a class="logo" href="#" style="color:#fff"><span class="mark"></span>${C.brand}</a>
        <div class="mono">${f.tag}</div>
      </div>
      ${Object.entries(f.cols).map(([h,items])=>`<div><h4>${h}</h4><ul>${items.map(i=>`<li><a href="#">${i}</a></li>`).join('')}</ul></div>`).join('')}
    </div>
    <div class="legal"><span>${f.copy}</span><span>${f.tag}</span></div>
  </div></footer>`;
}

function motionScript(){
  return `<script>
(function(){
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(rm) return;
  // streaming trace rows: reveal hidden rows on a tick
  document.querySelectorAll('[data-anim="trace"] [data-row-hidden]').forEach(function(r,i){
    setTimeout(function(){ r.style.transition='opacity .5s ease, transform .5s ease';
      r.style.transform='translateY(-4px)'; r.style.opacity='1';
      requestAnimationFrame(function(){r.style.transform='translateY(0)'}); }, 700+i*650);
  });
  // pulsing live dots
  var st=document.createElement('style');
  st.textContent='@keyframes pl{0%{box-shadow:0 0 0 0 rgba(63,125,58,.45)}70%{box-shadow:0 0 0 7px rgba(63,125,58,0)}100%{box-shadow:0 0 0 0 rgba(63,125,58,0)}}[data-pulse]{animation:pl 1.8s infinite}';
  document.head.appendChild(st);
  // ticking clock
  var clk=document.querySelector('[data-clock]');
  if(clk){var base=22212; setInterval(function(){base++;var h=Math.floor(base/3600)%24,m=Math.floor(base/60)%60,s=base%60;clk.textContent=String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');},1000);}
  // behaviors stagger-resolve when scrolled into view
  var bio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){
    e.target.querySelectorAll('[data-bhide]').forEach(function(b){
      b.style.transition='opacity .5s ease, transform .5s ease';
      b.style.transitionDelay=getComputedStyle(b).getPropertyValue('--d');
      b.style.transform='translateX(6px)';
      requestAnimationFrame(function(){b.style.opacity='1';b.style.transform='translateX(0)'});});
    bio.unobserve(e.target);}});},{threshold:.25});
  document.querySelectorAll('[data-behaviors]').forEach(function(el){bio.observe(el);});
  // safety: never leave behaviors hidden if the observer misses
  setTimeout(function(){document.querySelectorAll('[data-bhide]').forEach(function(b){
    if(getComputedStyle(b).opacity!=='1'){b.style.transition='opacity .5s ease';b.style.opacity='1';b.style.transform='translateX(0)';}});},2600);
  // count-up numerals
  function countUp(el){
    var raw=el.getAttribute('data-count'); var m=raw.match(/^([\\d,\\.]+)(.*)$/); if(!m)return;
    var target=parseFloat(m[1].replace(/,/g,'')); var suf=m[2]; var dec=(m[1].split('.')[1]||'').length;
    var t0=null,dur=1400;
    function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1);var e=1-Math.pow(1-p,3);
      var val=target*e; var out= dec? val.toFixed(dec): Math.round(val).toLocaleString();
      el.textContent=out+suf; if(p<1)requestAnimationFrame(step); else el.textContent=raw;}
    requestAnimationFrame(step);
  }
  var mio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){countUp(e.target);mio.unobserve(e.target);}});},{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(el){mio.observe(el);});
})();
</script>`;
}

/* ---------------- page assembly ---------------- */
function page(v){
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${C.brand} — ${v.title}</title>
<meta name="description" content="Adaline is an observability and evals platform for self-improving AI agents.">
<style>${fonts()}${baseCss(v)}</style>
</head><body data-variant="${v.id}">
${navHTML()}
${heroHTML(v)}
${understandSection(v)}
${evalsSection(v)}
${syntheticSection(v)}
${positionSection()}
${testimonialSection()}
${securitySection()}
${footerHTML()}
${v.motion?motionScript():''}
</body></html>`;
}

const variants = [
  { id:'A', title:'Never stop learning', headlineFamily:'sans', motion:false, file:'home-A-proposed.html' },
  { id:'B', title:'Never stop learning', headlineFamily:'serif', motion:false, file:'home-B-proposed.html' },
  { id:'C', title:'Never stop learning', headlineFamily:'sans', motion:false, file:'home-C-proposed.html' },
  { id:'C', title:'Never stop learning', headlineFamily:'sans', motion:true,  file:'home-C-cinematic.html' },
];
for (const v of variants) fs.writeFileSync(`${OUT}/${v.file}`, page(v));
console.log('BUILT', variants.map(v=>v.file).join(', '));
