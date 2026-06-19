# EDS conversion log — ElevenLabs uplift, Variant A

## Source
- Prototype: `stardust/prototypes/home-A-proposed.html` (uplift Variant A — faithful + improvements)
- Chosen variant: **A**. Rationale: honors ElevenLabs' core brand thesis (restraint
  as credibility); ships concrete UX wins (single CTA path, destination-named CTAs,
  one sales CTA, modular type scale, AA muted text); cleanest/most robust EDS
  conversion (no JS-gated content like C, fully authorable).

## Runtime bootstrap (vanilla aem-boilerplate → AuthorKit)
- Ported from `github.com/aemsites/author-kit`: ak.js, scripts.js, postlcp.js,
  lazy.js, scripts/utils/*, tools/**, deps/**, head.html, blocks/fragment,
  blocks/section-metadata, .hlxignore concept.
- Removed boilerplate: scripts/aem.js, scripts/delayed.js, blocks/{header,footer,cards,columns,widget}, styles/{fonts.css,lazy-styles.css}.
- **postlcp.js** rewritten to inject static fragments `/fragments/{header,footer}.html`
  via `loadStaticFragment` with `el.className = name` (#21). (The author-kit `main`
  ships a block-loading postlcp; the skill runtime uses static fragments.)
- **lazy.js**: removed `import('./utils/footer.js')` (#4) — footer is a static fragment.
- `.eslintignore` + `.stylelintignore`: vendored runtime/blocks excluded.

## Blocks (one per prototype section)
hero · social-proof · platforms (two-platform split) · suite (ElevenCreative grid,
numbered light cards) · agents (dark cards) · api (model-list cards) · research
(model index) · closing (dark CTA band). Header + footer are static fragments.

## Foundation (styles/styles.css)
- Tokens lifted from the prototype `:root` (warm off-white, ink, accent ramp).
- Fonts self-hosted in `styles/fonts/`: Waldenburg 300/400/700 (**proprietary —
  licensing alert raised**, see styles/fonts/LICENSING.md), Inter + Geist Mono (OFL).
- `body` → `body.session` font gate; metric-matched "Arial" + "Waldenburg Fallback"
  faces → zero CLS on swap. Header `min-height` reserved (#81).
- Each block owns vertical rhythm so `closing` (dark) + `social-proof` paint full-bleed.

## Decisions / gotchas
- hero reads eyebrow/lede by CELL textContent, not `querySelectorAll('p')` (#79) —
  pipeline may not wrap single-text cells in `<p>`.
- Content page is a DA body fragment (starts at `<body>`, no `<head>`), begins with
  a `metadata` block (Title ≤60 / Description ~155) (#34), exactly one `<h1>` (#35).
- Local QA harness (qa/page.html via dev server): all 8 blocks decorate (children>0),
  0 console errors, 1 `<h1>`, content constrained at 1600px (no full-width leak).

## Deploy target
- org=paolomoz, repo=stardust-deploy-test-12, branch=test-12-2, page=test-2/index.
- DA write: PUT admin.da.live/source/paolomoz/stardust-deploy-test-12/test-2/index.html
- Renders at: https://test-12-2--stardust-deploy-test-12--paolomoz.aem.page/test-2/index
