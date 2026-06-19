# EDS conversion log — Linear variant A

Converted `stardust/prototypes/home-A-proposed.html` (uplift variant A,
"faithful + improvements") into Edge Delivery blocks + a DA content page.

## Decisions locked
- **Variant deployed: A** (chosen for the cleanest EDS conversion — pure static,
  one block per section, no motion runtime, no above-the-fold reveal risk).
- Runtime: AuthorKit, ported from sibling `test-12/9` (carries both mandatory
  edits: `lazy.js` footer-import removed; `postlcp.js` `el.className = name`).
- One prototype `<section>` = one block. No abstraction.

## Block inventory
| Block | Source section | Notes |
|---|---|---|
| `hero` | hero | eyebrow + h1 (single page h1; last word accented indigo) + sub + 2 CTAs + fixed product-UI mock (decorative, built in JS) |
| `manifesto` | "A new species of product tool" | eyebrow + h2 + body, centered |
| `pillars` | capabilities | eyebrow + 2 lead cards + 4 rail cards; index numerals generated in JS; heading-boundary segmentation, flatten-tolerant |
| `closing` | closing CTA | eyebrow + h2 + 2 CTAs |
| `fragments/header.html` | sticky nav | wordmark SVG + links + Log in / Sign up; CSS-only mobile menu |
| `fragments/footer.html` | 6-column footer | Product/Features/Company/Resources/Connect/Legal |

## Foundation (`styles/styles.css`)
- Brand tokens lifted verbatim from `DESIGN.json` (Mode A).
- Body defaults to metric-matched `arial`; `body.session` → Inter (CLS-free swap;
  @fontsource Inter→Arial calibration: size-adjust 107.64%, ascent 90%, descent 22.43%).
- Inter Variable (opsz) self-hosted at `styles/fonts/inter-opsz.woff2` (SIL OFL).
- Header `min-height: 56px` reserved so the late `postlcp.js` fragment injection
  doesn't shift the hero.
- Global button system: primary = Linear's light pill (#e5e5e6 on #08090a),
  secondary = ghost outline. CTAs authored as `<strong><a>` / `<em><a>`.

## FONT LICENSING NOTE
- **Berkeley Mono** is Linear's eyebrow/label face — a PROPRIETARY commercial
  typeface (Berkeley Graphics). It is **NOT shipped**. Mono is used only in small
  eyebrows + index numerals, so the `--font-mono` stack falls back to the system
  monospace (`ui-monospace`/`SF Mono`/`Menlo`). To restore exact fidelity, license
  Berkeley Mono and add an `@font-face` in `styles/styles.css`. No proprietary font
  is shipped to `aem.live`, so there is no blocking licensing obligation.

## Anti-patterns avoided
- #79 / #62: hero + closing read content by CELL/textContent, not
  `querySelectorAll('p')` (the off-pipeline harness has no `<p>` wrappers — caught
  in local QA: buttons + eyebrows were 0 until switched to cell reads).
- #13/#37: every block constrains content to `.wrap` (`--maxw` 1120); verified at
  1440 and 1680 (all blocks 1120, none full-width).
- #35: exactly one `<h1>` (hero); section titles are h2/h3.
- #4: no font lines in `head.html`; all `@font-face` in `styles.css`.
- #44: no absolute-origin URLs in `blocks/`.
- Stylelint BEM `--` modifiers renamed to single-hyphen (`mock-st-done`).

## Local QA result (1440)
1 h1 · hero accent "agents" · mock present · 2 lead + 4 rail cards · 2 primary +
2 secondary buttons · 4 eyebrows · body.session active · all content widths 1120.

## Deploy target
- org `paolomoz`, repo `stardust-deploy-test-12`, branch `test-12-4`.
- Content: `test-4/index` (DA PUT `.../source/paolomoz/stardust-deploy-test-12/test-4/index.html`).
- Renders at `https://test-12-4--stardust-deploy-test-12--paolomoz.aem.page/test-4/index`.
