import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('stardust/prototypes');
fs.mkdirSync(OUT, { recursive: true });
const logoSvg = fs.readFileSync('stardust/current/assets/logo.svg','utf8').replace(/height:0\.9375rem/,'height:1.05rem');

// ---- captured content (verbatim from current/pages/home.json + voice samples) ----
const NAV = ['ElevenCreative','ElevenAgents','ElevenAPI','Enterprise','Pricing'];
const HERO_H = 'Bringing technology to life';
const HERO_SUB = 'Powering the best enterprises, creators, and developers. From ElevenAgents for customer experience to a full creative suite for speech, music, sound effects, and video.';
const PLATFORMS = [
  { name:'ElevenCreative', desc:'A full creative suite — ultra-realistic speech, music, sound effects, voices, and image &amp; video, in one AI platform.', cta:'Explore ElevenCreative', href:'/creative' },
  { name:'ElevenAgents', desc:'Configure, deploy and monitor natural, human-sounding agents in 70+ languages with leading latency.', cta:'Explore ElevenAgents', href:'/agents' },
];
const CREATIVE = ['All-in-one AI editor','Ultra-realistic speech','Music','SFX','Voices','Image &amp; Video'];
const AGENTS = ['Omnichannel agents','Analytics','Testing','Guardrails','Workflows'];
const APIS = [
  { name:'Text to Speech API', models:['Eleven Flash','Eleven Multilingual','Eleven v3'] },
  { name:'Speech to Text API', models:['Eleven Scribe'] },
  { name:'Music API', models:['Music'] },
];
const RESEARCH = ['Eleven Multilingual v2','Eleven Turbo v2','Eleven Flash v2.5','Scribe','Eleven v3','Eleven Music','Scribe v2 Realtime','Scribe v2'];
const FOOTER = {
  Product:['ElevenCreative','ElevenAgents','ElevenAPI','Pricing','Enterprise'],
  Company:['About','Safety','Careers','Blog'],
  Resources:['Docs','Customer stories','Help center','Status'],
  Solutions:['Speech','Music','Sound effects','Dubbing','Voice agents'],
};

function shared(variant) {
  const isB = variant==='B', isC = variant==='C';
  return `
  <header class="site" data-section="site-header" data-intent="navigate" data-layout="contained">
    <div class="wrap nav">
      <a class="brand" href="/" aria-label="ElevenLabs home">${logoSvg}</a>
      <nav class="primary" aria-label="Primary">
        ${NAV.map(n=>`<a href="#">${n}</a>`).join('')}
      </nav>
      <div class="nav-cta">
        <a class="btn ghost" href="/app">Log in</a>
        <a class="btn solid" href="/app/sign-up">Sign up</a>
        <button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="m-nav"><span></span><span></span></button>
      </div>
    </div>
    <nav id="m-nav" class="mobile-nav" aria-label="Mobile" hidden>
      ${NAV.map(n=>`<a href="#">${n}</a>`).join('')}
      <a href="/app">Log in</a><a class="btn solid" href="/app/sign-up">Sign up</a>
    </nav>
  </header>

  <main data-template="landing">
    <section class="hero" data-section="hero" data-intent="emotional hook" data-layout="${isB?'full-bleed':'contained'}" data-media="animation">
      <div class="orbs" aria-hidden="true">
        <span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span>
      </div>
      <div class="wrap hero-inner">
        <p class="eyebrow">${isC?'<span data-split>AI&nbsp;AUDIO&nbsp;RESEARCH</span>':'AI AUDIO RESEARCH'}</p>
        <h1 class="hero-h"${isC?' data-split data-anim':''}>${HERO_H}</h1>
        <p class="hero-sub"${isC?' data-anim':''}>${HERO_SUB}</p>
        <div class="hero-cta"${isC?' data-anim':''}>
          <a class="btn solid lg" href="/app/sign-up">Get started</a>
          <a class="btn ghost lg" href="/contact-sales">Contact sales</a>
        </div>
        <div class="wave" aria-hidden="true">${Array.from({length:64}).map((_,i)=>{const h=Math.round(16+84*Math.abs(Math.sin(i*0.5))*(0.45+0.55*Math.sin(i*0.13)));return `<span style="--i:${i};height:${h}%"></span>`;}).join('')}</div>
      </div>
    </section>

    <section class="proof" data-section="social-proof" data-intent="build trust" data-layout="contained">
      <div class="wrap">
        <p class="proof-h">Trusted by leading developers and enterprises</p>
        <div class="logos" data-items="6">${['Cisco','Epic Games','HubSpot','Reuters','The Washington Post','Salesforce'].map(b=>`<span class="logo-chip">${b}</span>`).join('')}</div>
      </div>
    </section>

    <section class="platforms${isB?' flood':''}" data-section="two-platform-split" data-intent="value proposition" data-layout="split-media" data-items="2">
      <div class="wrap">
        <h2 class="section-h"${isC?' data-split data-anim':''}>Two platforms built on the same research foundation</h2>
        <div class="plat-grid">
          ${PLATFORMS.map((p,i)=>`<article class="plat" data-anim>
            <div class="plat-orb po${i+1}" aria-hidden="true"></div>
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <a class="btn ghost" href="${p.href}">${p.cta}</a>
          </article>`).join('')}
        </div>
      </div>
    </section>

    <section class="suite" data-section="creative-suite" data-intent="explain mechanic" data-layout="grid" data-items="${CREATIVE.length}">
      <div class="wrap">
        <p class="eyebrow">${isC?'<span data-split>ELEVENCREATIVE</span>':'ELEVENCREATIVE'}</p>
        <h2 class="section-h"${isC?' data-split data-anim':''}>Create, edit and localize in one AI platform</h2>
        <p class="section-sub">Turn ideas into ultra-realistic speech, compose music in any genre, design sound effects, and produce video — all in one editor.</p>
        <div class="card-grid">
          ${CREATIVE.map((c,i)=>`<article class="cap" data-anim><span class="cap-num">${String(i+1).padStart(2,'0')}</span><h4>${c}</h4></article>`).join('')}
        </div>
      </div>
    </section>

    <section class="agents" data-section="agents" data-intent="explain mechanic" data-layout="grid" data-items="${AGENTS.length}">
      <div class="wrap">
        <p class="eyebrow">${isC?'<span data-split>ELEVENAGENTS</span>':'ELEVENAGENTS'}</p>
        <h2 class="section-h"${isC?' data-split data-anim':''}>Deploy agents that talk, type, and take action</h2>
        <p class="section-sub">Configure, deploy and monitor natural, human-sounding agents in 70+ languages with leading latency.</p>
        <div class="card-grid five">
          ${AGENTS.map(a=>`<article class="cap dark" data-anim><h4>${a}</h4></article>`).join('')}
        </div>
      </div>
    </section>

    <section class="apis${isB?' flood-deep':''}" data-section="api" data-intent="drive action" data-layout="grid" data-items="${APIS.length}">
      <div class="wrap">
        <h2 class="section-h"${isC?' data-split data-anim':''}>Or build anything with a powerful host of APIs</h2>
        <div class="api-grid">
          ${APIS.map(a=>`<article class="api-card" data-anim>
            <h3>${a.name}</h3>
            <ul>${a.models.map(m=>`<li><span class="dot"></span>${m}</li>`).join('')}</ul>
            <a class="btn ghost sm" href="/docs">Explore docs</a>
          </article>`).join('')}
        </div>
      </div>
    </section>

    <section class="research" data-section="research-index" data-intent="build trust" data-layout="grid" data-items="${RESEARCH.length}">
      <div class="wrap">
        <p class="eyebrow accent">${isC?'<span data-split>RESEARCH</span>':'RESEARCH'}</p>
        <h2 class="section-h"${isC?' data-split data-anim':''}>Research that redefines human&ndash;technology interaction</h2>
        <div class="model-grid">
          ${RESEARCH.map(r=>{const m=r.match(/v?(\d+(?:\.\d+)?)/i); const num=m?m[1]:''; return `<article class="model" data-anim>
            <span class="model-name">${r}</span>
            ${num?`<span class="model-ver"${isC?' data-flip':''}>v${num}</span>`:''}
          </article>`;}).join('')}
        </div>
        <p class="impact">Showcasing the global impact of AI audio research.</p>
      </div>
    </section>

    <section class="closing${isB?' flood-deep':''}" data-section="closing-cta" data-intent="drive action" data-layout="full-bleed">
      <div class="wrap closing-inner">
        <h2 class="closing-h"${isC?' data-split data-anim':''}>Bring your ideas to life</h2>
        <p>Start free, or talk to our team about enterprise deployments.</p>
        <div class="hero-cta">
          <a class="btn solid lg ${isB?'invert':''}" href="/app/sign-up">Get started</a>
          <a class="btn ghost lg ${isB?'on-dark':''}" href="/contact-sales">Contact sales</a>
        </div>
      </div>
    </section>
  </main>

  <footer data-section="footer" data-intent="navigate" data-layout="grid">
    <div class="wrap foot-grid">
      <div class="foot-brand"><a href="/" aria-label="ElevenLabs">${logoSvg}</a><p>Bringing technology to life.</p></div>
      ${Object.entries(FOOTER).map(([h,items])=>`<div class="foot-col"><h5>${h}</h5><ul>${items.map(i=>`<li><a href="#">${i}</a></li>`).join('')}</ul></div>`).join('')}
    </div>
    <div class="wrap foot-base"><span>&copy; 2026 ElevenLabs</span><span>Redesign prototype &middot; variant ${variant}</span></div>
  </footer>`;
}

// ---- per-variant CSS ----
const fontFace = `
@font-face{font-family:Waldenburg;src:url('../current/assets/fonts/KMR-Waldenburg-Buch-latin.1f7863d3c4317f3d.woff2') format('woff2');font-weight:300;font-display:swap}
@font-face{font-family:Waldenburg;src:url('../current/assets/fonts/KMR-Waldenburg-Normal-latin.47fcefe5bf77b4e5.woff2') format('woff2');font-weight:400;font-display:swap}
@font-face{font-family:Waldenburg;src:url('../current/assets/fonts/KMR-Waldenburg-Fett-latin.e6b0db8ee0a63897.woff2') format('woff2');font-weight:700;font-display:swap}
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap');`;

const baseCSS = (variant, cinematic) => {
  const isB = variant==='B';
  return `${fontFace}
:root{
  --bg:#fdfcfc;--surface:#f5f3f1;--surface-alt:#ebe8e4;--ink:#0a0a0a;--muted:#5c574f;--border:#e5e5e5;
  --accent:#eb524b;--accent-deep:#b52720;--blue:#0a59d2;--violet:#635bff;
  --display:"Waldenburg","Waldenburg Fallback",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;
  --body:"Inter",system-ui,-apple-system,sans-serif;--mono:"Geist Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
  --maxw:1200px;--pad:88px;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--body);font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 24px}
h1,h2,h3,h4,h5{font-family:var(--display);font-weight:400;margin:0;letter-spacing:-0.02em;line-height:1.06}
a{color:inherit;text-decoration:none}
.eyebrow{font-family:var(--mono);text-transform:uppercase;letter-spacing:0.14em;font-size:12px;color:var(--muted);margin:0 0 16px}
.eyebrow.accent{color:var(--accent)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:9999px;font-family:var(--display);font-weight:700;font-size:15px;padding:10px 22px;border:1px solid transparent;cursor:pointer;transition:transform .25s cubic-bezier(.42,0,0,1),background .25s,color .25s,box-shadow .25s}
.btn.solid{background:var(--ink);color:#fff}
.btn.solid:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.18)}
.btn.ghost{background:#fff;color:var(--ink);border-color:var(--border)}
.btn.ghost:hover{border-color:var(--ink)}
.btn.lg{padding:14px 30px;font-size:16px}
.btn.sm{padding:8px 16px;font-size:13px}
.btn.invert{background:#fff;color:var(--ink)}
.btn.on-dark{background:transparent;color:#fff;border-color:rgba(255,255,255,.4)}
.btn.on-dark:hover{border-color:#fff}
section{padding:var(--pad) 0}

/* header */
.site{position:sticky;top:0;z-index:50;background:rgba(253,252,252,.82);backdrop-filter:blur(12px);border-bottom:1px solid var(--border)}
.nav{display:flex;align-items:center;gap:28px;padding-top:14px;padding-bottom:14px}
.brand{display:flex;align-items:center;color:var(--ink)}
.primary{display:flex;gap:24px;margin-right:auto;font-size:14px;font-weight:500}
.primary a{color:var(--ink);opacity:.82;transition:opacity .2s}
.primary a:hover{opacity:1}
.nav-cta{display:flex;align-items:center;gap:10px}
.burger{display:none;flex-direction:column;gap:5px;background:none;border:0;padding:8px}
.burger span{width:22px;height:2px;background:var(--ink);display:block}
.mobile-nav{display:none}

/* hero */
.hero{position:relative;overflow:hidden;padding-top:96px;padding-bottom:96px}
.hero-inner{position:relative;z-index:2;text-align:center;max-width:880px}
.hero-h{font-weight:300;font-size:clamp(2.9rem,7vw,5.5rem);letter-spacing:-0.03em}
.hero-sub{font-size:clamp(1.05rem,1.6vw,1.35rem);color:var(--muted);max-width:680px;margin:24px auto 0;line-height:1.5}
.hero-cta{display:flex;gap:12px;justify-content:center;margin-top:34px;flex-wrap:wrap}
.orbs{position:absolute;inset:0;z-index:1;filter:blur(38px);opacity:.9}
.orb{position:absolute;border-radius:50%}
.o1{width:460px;height:460px;left:-90px;top:-120px;background:radial-gradient(circle at 30% 30%,#FAABA7,#eb524b 55%,transparent 72%)}
.o2{width:520px;height:520px;right:-120px;top:-60px;background:radial-gradient(circle at 60% 40%,#a9c7ff,#635bff 55%,transparent 72%)}
.o3{width:420px;height:420px;left:38%;bottom:-200px;background:radial-gradient(circle at 50% 50%,#ffd9a8,#eb524b 50%,transparent 72%)}
.wave{display:flex;align-items:center;justify-content:center;gap:3px;height:72px;margin:48px auto 0;max-width:620px}
.wave span{flex:1;background:linear-gradient(180deg,var(--accent),var(--violet));border-radius:9999px;opacity:.5;min-height:4px}

/* proof */
.proof{padding-top:40px;padding-bottom:40px;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.proof-h{text-align:center;font-family:var(--mono);text-transform:uppercase;letter-spacing:.12em;font-size:12px;color:var(--muted);margin:0 0 24px}
.logos{display:flex;flex-wrap:wrap;gap:16px 40px;justify-content:center;align-items:center}
.logo-chip{font-family:var(--display);font-weight:700;font-size:20px;color:var(--ink);opacity:.45;letter-spacing:-.01em}

/* section heads */
.section-h{font-size:clamp(2rem,4vw,3.2rem)}
.section-sub{color:var(--muted);max-width:620px;margin:18px 0 0;font-size:1.1rem}
.platforms .section-h,.suite .section-h,.agents .section-h,.apis .section-h,.research .section-h{margin-bottom:0}

/* platforms */
.plat-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:48px}
.plat{position:relative;overflow:hidden;background:var(--surface);border:1px solid var(--border);border-radius:24px;padding:40px}
.plat h3{font-size:1.9rem;margin-bottom:12px}
.plat p{color:var(--muted);margin:0 0 24px}
.plat-orb{position:absolute;width:200px;height:200px;border-radius:50%;right:-50px;top:-50px;filter:blur(28px);opacity:.55}
.po1{background:radial-gradient(circle,#eb524b,transparent 70%)}
.po2{background:radial-gradient(circle,#635bff,transparent 70%)}

/* card grids */
.card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:44px}
.card-grid.five{grid-template-columns:repeat(5,1fr)}
.cap{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:28px;min-height:150px;display:flex;flex-direction:column;justify-content:flex-end;transition:transform .38s cubic-bezier(.42,0,0,1),box-shadow .38s}
.cap:hover{transform:translateY(-4px);box-shadow:0 14px 30px rgba(0,0,0,.07)}
.cap-num{font-family:var(--mono);font-size:12px;color:var(--accent);margin-bottom:auto}
.cap h4{font-size:1.4rem;font-weight:400}
.cap.dark{background:var(--ink);color:#fff;min-height:120px}
.cap.dark h4{color:#fff}

/* api */
.api-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:44px}
.api-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:32px;transition:transform .38s cubic-bezier(.42,0,0,1),box-shadow .38s}
.api-card:hover{transform:translateY(-4px);box-shadow:0 14px 30px rgba(0,0,0,.07)}
.api-card h3{font-size:1.5rem;margin-bottom:18px}
.api-card ul{list-style:none;margin:0 0 24px;padding:0}
.api-card li{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);font-size:15px;font-family:var(--mono)}
.api-card li:last-child{border-bottom:0}
.dot{width:8px;height:8px;border-radius:50%;background:var(--accent)}

/* research */
.research .eyebrow{margin-top:0}
.model-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:44px}
.model{display:flex;justify-content:space-between;align-items:center;gap:12px;background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px 20px}
.model-name{font-family:var(--display);font-size:1.05rem}
.model-ver{font-family:var(--mono);font-size:13px;color:var(--accent)}
.impact{text-align:center;color:var(--muted);margin-top:36px;font-size:1.05rem}

/* closing */
.closing{background:var(--ink);color:#fff;text-align:center;border-radius:0}
.closing-inner{max-width:680px}
.closing-h{font-size:clamp(2.4rem,5vw,4rem);font-weight:300}
.closing p{color:rgba(255,255,255,.7);margin:18px 0 30px}
.closing .btn.ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.35)}
.closing .btn.ghost:hover{border-color:#fff}

/* footer */
footer{background:var(--bg);border-top:1px solid var(--border);padding:64px 0 32px}
.foot-grid{display:grid;grid-template-columns:1.6fr repeat(4,1fr);gap:32px}
.foot-brand p{color:var(--muted);font-size:14px;margin-top:14px}
.foot-col h5{font-family:var(--mono);text-transform:uppercase;letter-spacing:.1em;font-size:11px;color:var(--muted);margin:0 0 14px;font-weight:500}
.foot-col ul{list-style:none;margin:0;padding:0}
.foot-col li{margin-bottom:10px}
.foot-col a{font-size:14px;color:var(--ink);opacity:.75}
.foot-col a:hover{opacity:1;color:var(--accent)}
.foot-base{display:flex;justify-content:space-between;margin-top:48px;padding-top:24px;border-top:1px solid var(--border);font-family:var(--mono);font-size:12px;color:var(--muted)}

/* responsive */
@media(max-width:900px){
  .primary,.nav-cta .btn{display:none}
  .burger{display:flex}
  .mobile-nav[hidden]{display:none}
  .mobile-nav{display:flex;flex-direction:column;gap:4px;padding:16px 24px;border-top:1px solid var(--border)}
  .mobile-nav a{padding:10px 0;font-size:16px}
  .plat-grid,.api-grid{grid-template-columns:1fr}
  .card-grid,.card-grid.five{grid-template-columns:repeat(2,1fr)}
  .model-grid{grid-template-columns:repeat(2,1fr)}
  .foot-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:560px){.card-grid,.card-grid.five,.model-grid{grid-template-columns:1fr}.foot-grid{grid-template-columns:1fr}}
${isB?variantBcss:''}
${cinematic?variantCcss:''}
`;
};

const variantBcss = `
/* Variant B — colour re-weighting: gradient grounds, oversized orbs, saturated bands */
.hero{background:linear-gradient(135deg,#FDE4E3 0%,#FAABA7 22%,#f0a6c8 45%,#a9b8ff 70%,#cdb8ff 100%)}
.hero .orbs{opacity:1;filter:blur(30px)}
.hero .o1{width:560px;height:560px}.hero .o2{width:620px;height:620px}.hero .o3{width:520px;height:520px}
.hero-h{color:#1a0d12}
.hero-sub{color:#4a2e36}
.hero .btn.ghost{background:rgba(255,255,255,.75)}
.platforms.flood{background:linear-gradient(180deg,var(--bg),#fff)}
.plat.po-big .plat-orb{width:340px;height:340px}
.platforms .plat:nth-child(1) .plat-orb{width:300px;height:300px;opacity:.8}
.platforms .plat:nth-child(2) .plat-orb{width:300px;height:300px;opacity:.8}
.apis.flood-deep{background:linear-gradient(160deg,#2a0f0d,#b52720 70%,#eb524b);color:#fff}
.apis.flood-deep .section-h{color:#fff}
.apis.flood-deep .api-card{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.18);color:#fff}
.apis.flood-deep .api-card li{border-color:rgba(255,255,255,.18)}
.apis.flood-deep .btn.ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.4)}
.research{background:radial-gradient(120% 90% at 50% 0%,#FFF1F0,var(--bg) 60%)}
.closing.flood-deep{background:linear-gradient(135deg,#b52720,#eb524b 55%,#635bff)}
.closing.flood-deep .btn.solid.invert{background:#fff;color:#b52720}
`;

const variantCcss = `
/* Variant C — kinetic-display: motion identity (reduced-motion neutralises all) */
.split-char{display:inline-block;will-change:transform,filter,opacity;opacity:0;filter:blur(8px);transform:translateY(0.16em)}
[data-anim]{opacity:0;transform:translateY(26px)}
[data-anim].in{opacity:1;transform:none;transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
.kx-marquee{overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:var(--surface);padding:14px 0}
.kx-marquee__track{display:inline-flex;gap:48px;white-space:nowrap;font-family:var(--mono);text-transform:uppercase;letter-spacing:.16em;font-size:13px;color:var(--muted);animation:kxmarq 30s linear infinite}
.kx-marquee__track span{display:inline-flex;gap:48px}
.kx-marquee__track .acc{color:var(--accent)}
@keyframes kxmarq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.model-ver[data-flip]{font-variant-numeric:tabular-nums}
.hero .wave span{animation:kxwave 1.8s ease-in-out infinite;animation-delay:calc(var(--i) * 28ms)}
@keyframes kxwave{0%,100%{transform:scaleY(.5);opacity:.4}50%{transform:scaleY(1);opacity:.7}}
@media(prefers-reduced-motion:reduce){
  .hero .wave span{animation:none!important;transform:none!important}
  .split-char{opacity:1!important;filter:none!important;transform:none!important}
  [data-anim]{opacity:1!important;transform:none!important}
  .kx-marquee__track{animation:none!important}
}
`;

const motionJS = `
<script>
(function(){
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // split text into chars
  document.querySelectorAll('[data-split]').forEach(function(el){
    var txt = el.textContent; el.setAttribute('aria-label', txt); el.textContent='';
    [].forEach.call(txt, function(ch){
      var s=document.createElement('span'); s.className='split-char'; s.setAttribute('aria-hidden','true');
      s.textContent = ch===' '? '\\u00a0' : ch; el.appendChild(s);
    });
  });
  if(rm){ document.querySelectorAll('.split-char').forEach(function(s){s.style.opacity=1;s.style.filter='none';s.style.transform='none';}); }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el = e.target;
      if(el.hasAttribute('data-anim')) el.classList.add('in');
      if(el.hasAttribute('data-split') && !rm){
        var chars = el.querySelectorAll('.split-char');
        chars.forEach(function(c,i){ setTimeout(function(){ c.style.transition='opacity .5s ease, filter .5s ease, transform .5s cubic-bezier(.16,1,.3,1)'; c.style.opacity=1; c.style.filter='none'; c.style.transform='none'; }, i*50); });
      }
      if(el.hasAttribute('data-flip') && !rm){
        var target=el.textContent, n=0, iv=setInterval(function(){ el.textContent='v'+(Math.floor(Math.random()*9)); if(++n>6){clearInterval(iv);el.textContent=target;} },60);
      }
      io.unobserve(el);
    });
  },{threshold:.2});
  document.querySelectorAll('[data-anim],[data-split],[data-flip]').forEach(function(el){io.observe(el);});
  // mobile nav
  var b=document.querySelector('.burger'), mn=document.getElementById('m-nav');
  if(b&&mn){ b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);mn.hidden=o;}); document.addEventListener('keydown',function(e){if(e.key==='Escape'){b.setAttribute('aria-expanded','false');mn.hidden=true;}}); }
})();
</script>`;

const mobileNavJS = `
<script>
(function(){var b=document.querySelector('.burger'),mn=document.getElementById('m-nav');if(!b||!mn)return;b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);mn.hidden=o;});document.addEventListener('keydown',function(e){if(e.key==='Escape'){b.setAttribute('aria-expanded','false');mn.hidden=true;}});})();
</script>`;

function build(variant, cinematic) {
  const isC = variant==='C';
  let bodyHTML = shared(variant);
  // C cinematic: inject a signage marquee strip between agents and api
  if (isC && cinematic) {
    const marq = `<div class="kx-marquee" data-section="signage" data-intent="brand texture" data-layout="full-bleed" aria-hidden="true"><div class="kx-marquee__track"><span>SPEECH &middot; MUSIC &middot; SFX &middot; VOICES &middot; <em class="acc">DUBBING</em> &middot; AGENTS &middot; SCRIBE &middot; FLASH &middot; MULTILINGUAL &middot; </span><span>SPEECH &middot; MUSIC &middot; SFX &middot; VOICES &middot; <em class="acc">DUBBING</em> &middot; AGENTS &middot; SCRIBE &middot; FLASH &middot; MULTILINGUAL &middot; </span></div></div>`;
    bodyHTML = bodyHTML.replace('<section class="apis', marq + '\n    <section class="apis');
  }
  const provenance = `<!-- stardust:provenance
  writtenBy:        stardust:prototype (uplift)
  writtenAt:        2026-06-19T00:00:00Z
  page:             home
  pageUrl:          https://elevenlabs.io/
  variant:          ${variant}${isC&&cinematic?' (cinematic)':''}
  againstDirection: stardust/direction.md
  readArtifacts:
    - stardust/current/pages/home.json
    - stardust/current/_brand-extraction.json
    - DESIGN.md
    - DESIGN-${variant}.json
  ${isC?`motion:\n    register:       kinetic-display\n    registerSource: heuristic`:'motion:           null'}
  unsourcedContent: []
  stardustVersion:  uplift
-->`;
  const css = baseCSS(variant, cinematic);
  const js = (isC && cinematic) ? motionJS : mobileNavJS;
  const titleMap = { A:'Bringing technology to life | ElevenLabs', B:'Bringing technology to life | ElevenLabs', C:'Bringing technology to life | ElevenLabs' };
  return `<!DOCTYPE html>
<html lang="en">
<head>
${provenance}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titleMap[variant]}</title>
<style>
${css}
</style>
</head>
<body>
${bodyHTML}
${js}
</body>
</html>`;
}

// emit files
fs.writeFileSync(path.join(OUT,'home-A-proposed.html'), build('A', false));
fs.writeFileSync(path.join(OUT,'home-B-proposed.html'), build('B', false));
fs.writeFileSync(path.join(OUT,'home-C-proposed.html'), build('C', false)); // static reference for C
fs.writeFileSync(path.join(OUT,'home-C-cinematic.html'), build('C', true)); // cinematic
console.log('PROTOTYPES_OK', fs.readdirSync(OUT).filter(f=>f.endsWith('.html')).join(', '));
