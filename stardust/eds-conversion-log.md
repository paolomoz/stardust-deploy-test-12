# ElevenLabs.io → EDS conversion log

Branch: `test-10-elevenlabs` · Source: https://elevenlabs.io/ (homepage)
Deploy target: `da.live/#/paolomoz/stardust-deploy-test-12/test-10-elevenlabs/index`

This is a `stardust:deploy` TEST against an arbitrary public URL (not a stardust
prototype). The source is a Next.js/Tailwind/shadcn site — there is NO per-section
`<style>` to lift, so each block is rebuilt semantically with scoped CSS using the
brand tokens lifted from the page `:root` (see `styles/styles.css`).

## Runtime
- Vanilla aem-boilerplate → AuthorKit runtime ported from `origin/test-12-9`
  (ak.js, lazy.js, postlcp.js, scripts.js, utils, tools, deps, fragment +
  section-metadata blocks, head.html, .hlxignore). Both mandatory edits already
  present (no footer import in lazy.js; `el.className = name` in postlcp.js).

## Fonts (self-hosted, styles/fonts/)
- Inter (OFL) — body. Geist Mono (OFL) — code samples.
- Waldenburg + WaldenburgFH (PROPRIETARY, ElevenLabs/Kometa) — headings/display.
  ⚠️ LICENSING ALERT raised (styles.css banner + fonts/LICENSING.md + here).
  Do NOT publish to *.aem.live until license confirmed.
- Metric-matched Arial fallback (Inter calibration 107.06%) for zero-CLS swap.

## Block names — LOCKED (one prototype section = one block)
| # | block | section heading | notes |
|---|---|---|---|
| 1 | `hero` | Bringing technology to life | H1 + subhead + 2 CTAs + static platform-demo (tab row + 3 gradient orbs + sub-tab row) |
| 2 | `trusted` | Trusted by leading developers and enterprises | 18-logo grid (text logos) |
| 3 | `platforms` | Two platforms built on the same research foundation | 2 intro columns + product visual (gradient placeholder) |
| 4 | `creative` | Create, edit and localize in one AI platform | Learn more + intro + 2 feature cards + 4-up grid + case callout |
| 5 | `agents` | Deploy agents that talk, type, and take action | Learn more + intro + 2 feature cards + 3-up grid + case callout |
| 6 | `apis` | Or build anything with a powerful host of APIs | Explore docs + 3 API rows (title/desc/sub-items + code sample, Geist Mono) |
| 7 | `impact` | Showcasing the global impact of AI audio research | 3 image cards (gradient placeholders + overlay captions) |
| 8 | `research` | Research that redefines human technology interaction | intro + static timeline + 2 gradient release cards |
| 9 | `safety` | Safety, built in | Learn more + 3 line-art cards (inline SVG) |
| 10 | `updates` | Latest updates | All posts + 3 gradient image cards |
| 11 | `closing` | AI Communication Platform | reusable closing band, 2 CTAs |

Header + footer are static fragments (fragments/header.html, fragments/footer.html).

## Decisions
- Image strategy: source uses product screenshots/photos + CSS-gradient orbs/cards.
  No real assets lifted (proprietary). Use tasteful CSS-gradient placeholders in
  block CSS for image areas; authored image cells left EMPTY. The gradient orbs/
  cards in the original are literally CSS gradients, so this is faithful.
- Interactive demos (hero tabs, creative editor, agents dashboard, research
  timeline, API code tabs) rendered as static default state (#14/#17): visible,
  no JS reveal. Minimal block JS where a real interaction adds value.
- Links: rewritten absolute to `https://elevenlabs.io/...` so they resolve.
- Surfaces: page is light (eggshell #FDFCFC). Most sections light; gradient
  feature cards carry their own dark wash with light text (scope on-dark CTA
  overrides to the block class, #41).

## Anti-patterns watched
- One section = one block (no variant abstraction). `creative`/`agents` are
  similar but kept separate (different grids/content).
- DA-flattened single-cell contract: blocks use a cell-level cascade collector.
- Exactly one `<h1>` (hero); all other section titles `<h2>`, sub-items `<h3>`.
- No fonts in head.html; all @font-face in styles.css.
