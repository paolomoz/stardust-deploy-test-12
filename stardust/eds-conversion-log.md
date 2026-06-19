# EDS Conversion Log — Dala redesign (variant C, "Constellation as Spine")

## Source
- Chosen variant: **C** (cinematic, `arrival` register) — `stardust/prototypes/home-C-proposed.html` (static resolved end-state = authorable content) + `home-C-cinematic.html` (motion reference).
- Why C: Dala's identity IS the generative constellation manifesto; C makes the product thesis (scattered fragments → shared knowledge) the page's structural spine. Static end-state is the verified no-JS/reduced-motion fallback, so it converts to authorable EDS cleanly and motion layers on progressively.

## Deploy target (locked)
- org=`paolomoz`, repo=`stardust-deploy-test-12`, branch=`test-12-5`
- content path = `test-5/index` → DA PUT `…/source/paolomoz/stardust-deploy-test-12/test-5/index.html`
- preview: https://test-12-5--stardust-deploy-test-12--paolomoz.aem.page/test-5/index
- DA edit: https://da.live/#/paolomoz/stardust-deploy-test-12/test-5/index

## Runtime bootstrap (DONE)
Vanilla aem-boilerplate → AuthorKit runtime. Ported ak.js/lazy.js/postlcp.js/scripts.js/utils/tools/deps/fragment+section-metadata/.hlxignore from github.com/aemsites/author-kit (main). Removed aem.js, delayed.js, header/footer/cards/columns/widget/hero blocks, fonts.css, lazy-styles.css.
- **Note on the two mandatory edits:** upstream author-kit `main` has moved its header/footer to a block-based loader (`loadBlock`), so the skill's `loadStaticFragment` no longer ships. Reconstructed the static-fragment model the skill specifies: rewrote `scripts/postlcp.js` with `loadStaticFragment(el, name)` that fetches `/fragments/<name>.html` and injects via innerHTML **with `el.className = name` applied first (#21)**, loading BOTH header and footer; removed the `utils/footer.js` block-load import from `scripts/lazy.js` (#4). `.eslintignore` extended with the vendored runtime. head.html → ak.js boot (CSP preserved). 404.html cleaned of aem.js/lazy-styles.css.

## Block plan (LOCKED) — one prototype <section> = one block
| Block | Source section(s) | Notes |
|---|---|---|
| `hero` | `.hero` (data-section=hero) | h1.display, eyebrow, sub, Request Access CTA. Generative constellation `<canvas>` background via block JS (reduced-motion: static node). |
| `constellation-divider` | `.divider` ×6 | Motion-spine between sections. Content-free; decorate() injects canvas + node, animates (reduced-motion: static). Authored as empty block 6×. |
| `narrative` | 3× `.section.narrative` | eyebrow(num — label), headline, optional lead, prose paragraphs. Reused 3×: mission-confidence (has lead + 30% count-up), lightbulb, better-world. |
| `team` | `.section` data-section=team | eyebrow 05, headline, 3 member cards (img/role/name/social), "Build with us." hiring block. |
| `investors` | `.section` data-section=investors | eyebrow 06, headline, lead, 5 investor rows (name · note? · kind). |
| `closing` | `.closing` | headline + Request Access CTA. |

Header (`.header` nav) + footer (`.site-footer`) → static fragments `fragments/header.html` + `fragments/footer.html` (Step 6). Footer carries the "Dala" wordmark wipe.

## Fonts (LOCKED)
PP Neue Montreal (PROPRIETARY — PANGRAM-style private foundry). Self-host the 3 captured woff2 (Light 200 / Regular 400 / SemiBold 600) from `stardust/current/assets/fonts/` → `styles/fonts/`. body.session pattern with metric-matched "Arial" fallback (sans brand). **LICENSING ALERT required** (styles.css banner + styles/fonts/LICENSING.md + this log + hand-off): do NOT publish to aem.live until the webfont/embedding license is confirmed.

## Motion decisions
- Preserve the signature constellation canvas motion (hero + dividers) in block JS — the brand's whole thesis.
- Render all prose/content VISIBLE (never lift opacity:0 reveal — anti-pattern #16); entrance animations are progressive enhancement via IntersectionObserver, gated on prefers-reduced-motion.
- "30%" count-up in the narrative (mission) block via IntersectionObserver.
- No global lenis smooth-scroll (scripts.js stays minimal); motion owned per-block.

## Conversion COMPLETE (local QA passing) — 2026-06-19

### Final block inventory (all under blocks/<name>/{js,css})
- `hero` — eyebrow / h1.display / sub / Request Access CTA + generative constellation canvas (luminous diamond node). Flatten-first cell collector; queries content (not row index). ResizeObserver re-measures the async-loaded canvas.
- `constellation-divider` — empty authored block ×6; injects canvas + diamond node, per-instance seed `3 + idx*5` from DOM position. ResizeObserver.
- `narrative` — eyebrow(rebuilt num span #39) / h2 / optional lead (signalled by a lone `<strong>` paragraph, unwrapped) / prose. Count-up on a `\d+%`-leading paragraph; inline `<a>` get `.lnk`. Used 3×.
- `team` — head + 3 portrait-led member cards (img→role→h3 name→2 social links) + trailing "Build with us." hiring block (h3 + 2 paras). Segments members by `<img>` boundary; hiring = trailing heading group after the last member's links.
- `investors` — head + lead + 5 rows. Each row authored as one `Name · note? · Kind` line; spans rebuilt in decorate (#39/#50): last segment=kind, first=name, middle=note.
- `closing` — centered h2 + Request Access CTA (cloned cell → `.actions`).

All entrance reveals are IntersectionObserver progressive enhancement gated on `prefers-reduced-motion: no-preference`; content renders visible (no lifted opacity:0, #16). Constellation canvases animate under motion and draw a STATIC resolved frame under reduced-motion.

### Foundation (styles/styles.css)
- :root tokens lifted verbatim (ink-black/paper-white/electric-purple/muted-gray/hairline, --step-* scale, spacing, --r-pill 22.5px, --maxw 1200px, --gutter).
- Reset incl. `img { display:block; max-width:100%; height:auto }` (#36). body stays VISIBLE (no display:none gate, #40).
- EDS section scaffold; global pill button system (`a.btn-primary` purple fill / `a.btn-secondary` outline) mapped to the brand `.btn--primary`.
- Header reservation (#81): bare `header { min-height:69px; background:var(--ink-black); border-bottom hairline }` matches the fragment's 68px content + 1px border, so the late postlcp.js header injection doesn't shift the hero.

### Font metric-override (computed from PPNeueMontreal-Regular.woff2, fontTools; Arial ref upm2048/xAvg904)
`@font-face "Arial"` { local("Arial"); size-adjust: 121.66%; ascent-override: 78.75%; descent-override: 19.89%; line-gap-override: 0% } → zero CLS on the body→session font swap.

### LICENSING ALERT (#80) — placed in 3 spots
styles.css banner + styles/fonts/LICENSING.md + this log. PP Neue Montreal is proprietary (Pangram Pangram). DO NOT publish to *.aem.live until the embedding license is confirmed. Remove path: delete the 3 woff2 + their @font-face; stack falls back to metric-matched Arial (zero CLS).

### Content page — content/test-5/index.html (DA body fragment)
Starts at `<body>`, no DOCTYPE/html/head, empty `<header></header>`/`<footer></footer>`. FIRST block = `metadata` (Title "Dala — Unlock your team's collective wisdom" 44 chars; Description ~150 chars). Exactly ONE `<h1>` (hero). CTAs authored `<strong><a href=typeform>Request Access</a></strong>`. Section order: metadata, hero, divider, narrative×3 (with dividers between), divider, team, divider, investors, closing (no divider before closing, matching the proposed file's 6-divider placement). Portraits copied to img/dala/{haroun,poppy,joel}.jpg, referenced root-relative.

### Local QA results (Playwright, harness at :3000, 1440 + 1600)
- All sections render; 0 console/page errors.
- Exactly 1 `<h1>` ("Unlock collective wisdom.").
- Counts: 3 members (3 portraits load, naturalWidth 780), 5 investors (name/note/kind segmented correctly), mission 6 prose paras + lead + count-up "30".
- eyebrow nums 02–06 with highlighted span; inline `.lnk` present in better-world; hiring block + 2 paras.
- 2 styled `a.btn-primary` CTAs.
- Wrap check @1600: every content block wrapW=1200, wrapLeft=200 (centered, NOT flush-left). Dividers full-bleed (no wrap). PASS.
- Constellation canvases: hero 1440×791, dividers 1440×120; draw ink under motion AND a distinct static frame per divider under reduced-motion.
- body.session → "PP Neue Montreal" stack active.
- Header fragment (tested in a chrome harness, harness strips main `<header>`): header.header class applied, 69px height = reservation; desktop links shown / mobile burger checkbox-hack; footer.footer black ground + "Dala" wordmark.
- `grep -rn "http://localhost\|aem.page/img\|aem.live/img" blocks/` → CLEAN (empty).

### Notes for the next person
- Lint tooling in this env is partial (`npm install` incomplete): installed eslint is v10/flat-config but the repo uses legacy `.eslintrc.js`, and stylelint-config-standard isn't resolvable. All block JS passes `node --check`; CSS follows standard conventions (scoped, modern color syntax, expanded rules). Re-run `npm install && npm run lint` in a complete env before deploy.
- Dropped from prototype (fragments run no JS): nav scroll-state shadow, footer wordmark clip-path wipe, lenis smooth-scroll. Mobile nav re-implemented as CSS checkbox-hack.

### Divider count reconciliation
Brief table said "constellation-divider ×6", but the authoritative proposed prototype (home-C-proposed.html) ships exactly **5** dividers — between hero→mission, mission→lightbulb, lightbulb→better-world, better-world→team, team→investors; NO divider before closing. The content page matches the prototype's 5-divider placement (the prototype is the visual spec).

## Step 10 — diff reconciliation vs prototype (home-C-proposed.html) — 2026-06-19
Probes: stardust:diff visual-diff.mjs + content-diff.mjs, `--profile eds`, against the live
branch render https://test-12-5--stardust-deploy-test-12--paolomoz.aem.page/test-5/.

**Visual / layout diff:** initial run flagged 3× FLUSH-LEFT on the hero (eyebrow/h1/sub at left 0).
Root cause: hero.css never styled `.hero__inner`'s gutter (#74) — the inner carried the `wrap`
class but no `.wrap` rule reached it (each block scopes its own `.wrap`; hero had none). Fix:
added `margin-inline:auto; padding-inline:var(--gutter); box-sizing:border-box` to `.hero .hero__inner`.
Re-measured: EDS h1Left = 536px = PROTO 536px (centered 30ch column, exact match). **Re-run: red flags = none.**
Portrait `stretched` fires on BOTH proto and EDS = justified (#45): the prototype itself crops the
780×1140 portraits to object-fit:cover cards; faithful lift, not a defect.

**Structural content / type diff:** 3 🔴 MISSING CTA (member "LinkedIn" links) = **confirmed FALSE POSITIVE**:
the live render contains all 6 social links (3 Twitter + 3 LinkedIn) with exact text + hrefs (verified by
direct DOM inspection). The probe's role classifier split each member's two adjacent links asymmetrically
(Twitter→CTA, LinkedIn→body), so a CTA-vs-CTA match missed. No content dropped.
🟡 MISSING BODY/EXTRA pairs = benign: same paragraphs with curly-vs-straight apostrophes, plus the
narrative count-up splitting "30%" into "30"+"%". EDS body-node count (44) ≥ proto (43); every MISSING has a
matching EXTRA. No prose lost.

**Live render verification:** 6 constellation canvases sized/drawn (hero 2560×1732 + 5 dividers), single
`<h1>`, 3 members, 5 investors, footer "Dala" wordmark, `body.session` → PP Neue Montreal active, 0 about:error.
