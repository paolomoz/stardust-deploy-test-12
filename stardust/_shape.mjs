import fs from 'fs';
const OUT = 'stardust/current';
const raw = JSON.parse(fs.readFileSync(`${OUT}/_raw-capture.json`, 'utf8'));
const c = raw.capture;
const prov = raw._provenance;
const now = prov.fetchedAt;

// pages/home.json
const homePage = {
  _provenance: { ...prov, renderedBy: 'playwright' },
  slug: 'home', url: raw.url, finalUrl: prov.finalUrl,
  title: c.title, metaDescription: c.metaDescription, og: c.og, themeColor: c.themeColor,
  headings: c.headings,
  landmarks: c.landmarks,
  ctas: c.ctas, links: c.links, media: c.media, forms: c.forms,
  cssVars: c.cssVars,
};
fs.writeFileSync(`${OUT}/pages/home.json`, JSON.stringify(homePage, null, 2));

// _brand-extraction.json
const brand = {
  _provenance: { writtenBy: 'stardust:extract', writtenAt: now, againstInput: raw.url, renderedBy: 'playwright',
    notes: 'Single-page (--single) capture of adaline.ai homepage.' },
  palette: {
    background: '#FBFDF6', surface: '#F8F9F5', surfaceAlt: '#EFF2E8', surfaceMuted: '#E1E6DF',
    text: '#0A1D08', textMuted: '#2A332A', textSubtle: '#6B7860',
    primary: '#203B14', primaryHover: '#2E4320', accentPill: '#ECF2DF',
    dark: '#2A332A', darker: '#1D2226', darkest: '#050E11',
    border: 'rgba(46,67,32,0.40)', borderSubtle: '#E1E6DF',
    _source: 'colorAgg cross-element weighted', raw: c.colorAgg,
  },
  type: {
    headingFamily: 'Akkurat', bodyFamily: 'Akkurat', monoFamily: 'Fragment Mono', displayFamily: 'Instrument Serif',
    scaleAudit: { kind: 'modular', note: 'h1 53/64, h2 30/34.7, display 104/98.8 — large jump to serif display' },
    headings: c.headings.map(h => ({ level: h.level, family: h.fontFamily.split(',')[0].replace(/"/g,''), weight: h.fontWeight, size: h.fontSize, lineHeight: h.lineHeight, letterSpacing: h.letterSpacing, color: h.color, sample: h.text })),
    files: raw.fontFiles.map(f => ({ url: f.url, localPath: f.localPath, licensingFlag: /akkurat|fragment|instrument/i.test(f.url) ? 'verify-license' : 'unknown' })),
    notes: 'Akkurat (Lineto grotesque) for headings+body; Fragment Mono pervasive for technical labels/eyebrows and live-trace UI; Instrument Serif used ONCE at 104px for the footer call-to-action — a captured-but-underused display register.',
  },
  motifs: {
    radius: { dominant: 'pill (9999px) for buttons/eyebrows', secondary: '3px small cards', raw: c.radiusAgg },
    shadow: { style: 'flat — minimal box-shadow; 1px ring borders preferred', raw: c.shadowAgg },
    patterns: ['pill-button', 'mono-eyebrow-label', 'live-trace-panel (monospace rows: timestamp · op · latency · cost)', 'behavior-list (B01..B25 codes with ISSUE/CHANGED/NEW tags)', 'floating product UI over landscape/nature photography', 'trusted-by logo row', 'giant serif closing statement'],
  },
  voice: {
    heroHeadline: 'Never stop learning',
    tagline: 'Ship Agents That Self-Improve',
    firstParagraph: 'Adaline helps AI teams improve their agents autonomously, so you can find fires before they happen, ship fixes in minutes, and feel confidence in their agents — for the first time.',
    positioning: 'Adaline is the ML layer between your traces and your agent diffs — behaviors, evals, data.',
    ctaLabels: ['Sign Up', 'Read Docs', 'Contact sales', 'The Self-Improving Agent'],
    closingStatement: 'Self-improve your agents now.',
    heroImage: 'landscape/nature photography behind floating product UI (mountain valley, snow ridge)',
    register: 'product / developer-tool — precise, technical, confident, organic-growth metaphor ("never stop learning")',
  },
  customers: ['Salesforce','DoorDash','Reforge','HubSpot','Superhuman','Discord','McKinsey & Company','Coframe','Glue','Atria','Daybreak','SimpleDocs'],
  testimonials: [
    { text: 'Adaline has become an invaluable tool for my team to develop GenAI products.', attribution: 'Tan S. · Product Manager for Lilli · McKinsey & Company' },
    { text: "Adaline is simply the best platform I've found that bridges the gap between technical & nontechnical LLM development.", attribution: 'Ian W. · Member of Technical Staff · OpenAI' },
    { text: 'Before Adaline, iterating and evaluating prompts was a nightmare. Adaline totally changes the game here.', attribution: 'Josh P. · CEO · Coframe' },
    { text: 'Adaline has become a crucial part of our tech stack — brought our insufficient answer rate down to practically 0%.', attribution: 'undisclosed' },
  ],
  security: ['SOC 2 Type II audited and certified','GDPR compliant','SSO / SAML','HIPAA compliant','PII DPAs'],
  systemComponents: [
    { name: 'site-nav', evidence: 'sticky top-0 nav: logo + Docs/Pricing/Blog + Sign in/Contact sales/Sign up' },
    { name: 'site-footer', evidence: 'Instrument Serif CTA + COMPANY/RESOURCES/CONNECT columns + © 2026 Adaline Inc.' },
    { name: 'trusted-by-row', evidence: 'customer SVG logo row under hero' },
  ],
  cssVarCount: c.cssVars.length,
};
fs.writeFileSync(`${OUT}/_brand-extraction.json`, JSON.stringify(brand, null, 2));

// _crawl-log.json
fs.writeFileSync(`${OUT}/_crawl-log.json`, JSON.stringify({
  _provenance: { writtenBy: 'stardust:extract', writtenAt: now, againstInput: raw.url },
  discovery: { mode: 'single', fetchTechnique: 'headless-chromium', waitMode: prov.waitMode, totalDiscovered: 1, kept: ['home'] },
  consent: { method: 'none-detected' },
  crawl: { crawled: ['home'], failures: [] },
}, null, 2));

// state.json
fs.writeFileSync('stardust/state.json', JSON.stringify({
  _provenance: { writtenBy: 'stardust:uplift', writtenAt: now },
  site: { originUrl: raw.url, extractedAt: now, pageCap: 1, totalDiscovered: 1, crawled: 1 },
  pages: [ { slug: 'home', url: raw.url, status: 'extracted', currentStatePath: 'stardust/current/pages/home.json', prototypePath: '', migratedPath: '' } ],
}, null, 2));

console.log('SHAPED OK', JSON.stringify({ headings: c.headings.length, sections: c.landmarks.length, customers: brand.customers.length, fonts: brand.type.files.length }));
