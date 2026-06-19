# EDS conversion log — apple.com uplift, variant C (kinetic-display)

## What shipped
Single-page conversion of the chosen uplift prototype
(`stardust/prototypes/home-C-cinematic.html`) to EDS, deployed via DA to
`paolomoz/stardust-deploy-test-12`, branch `test-12-1`, path `test-1/index`.

## Variant chosen: C (kinetic-display)
Strongest single statement (SF Pro Display as the protagonist), cleanest EDS port
(each section is content-light → maps ~1:1 to authorable rows), motion ports as
progressive-enhancement block JS. See chat rationale.

## Runtime bootstrap
Ported AuthorKit runtime from `stardust-deploy-test-11` (latest, both mandatory
edits already present): `scripts/{ak,scripts,postlcp,lazy}.js`, `scripts/utils/`,
`tools/`, `deps/`, `head.html`, `blocks/{fragment,section-metadata}`, `.hlxignore`.
Removed boilerplate: `scripts/{aem,delayed}.js`, `blocks/{header,footer,cards,
columns,widget,hero}`, `styles/{fonts,lazy-styles}.css`.
Verified: `lazy.js` has 0 `utils/footer` imports; `postlcp.js` has the
`el.className = name` edit. `.eslintignore` extended for the vendored runtime.

## Blocks
- **showcase** (one block, reused 7×). Ground variants via block class
  (`showcase` / `showcase surface` / `showcase dark`). Each prototype section is
  the same kinetic-display treatment → one block with variants (sections are not
  byte-distinct components). Reads eyebrow / heading (h1 lead, h2 rest) / subhead /
  CTAs / optional image via a cell-cascade collector (DA-flatten tolerant).
  Motion (blur-to-sharp + wipe) ported as block JS: first-viewport reveal on load,
  3.5s safety net, full `prefers-reduced-motion` neutralisation.

## Chrome
Static fragments `fragments/header.html` (Apple globalnav, CSS-only, inline logo)
and `fragments/footer.html` (Apple directory). No JS (fragments are inert).

## Fonts (LICENSING — see styles/fonts/LICENSING.md)
Self-hosted SF Pro Display + SF Pro Text (6 woff2, captured from apple.com).
**Proprietary to Apple Inc. — license required before aem.live.** Alert present in
3 places: styles.css banner, styles/fonts/LICENSING.md, this log.
**Metric-matched fallback @font-face skipped deliberately:** the proprietary woff2
subsets report unreliable OS/2 `xAvgCharWidth` (fonttools computed a nonsensical
244% size-adjust), so shipping a computed override would be wrong. Instead the
fallback is the `-apple-system` system stack, which IS SF Pro on Apple hardware
(zero shift on the review machine) and Helvetica/Arial elsewhere. CLS impact is
small: the woff2 is self-hosted/local and gated behind `body.session`.

## Images
5 product photos committed to `img/apple/` (content images, fully-qualified to the
code origin in the content page per Step 9). Privacy + Apple TV+ sections are
type-only (no image), matching the prototype.

## Notes for next person
- The page is type-led; sections intentionally tall (14vh padding) per the
  kinetic-display register.
- Block JS motion needs no Lenis (dependency-free rAF/IO) — chosen for a clean port.
