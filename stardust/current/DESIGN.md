---
_provenance:
  writtenBy: stardust:extract
  writtenAt: 2026-06-19T00:00:00Z
  againstInput: https://elevenlabs.io/
  mode: descriptive
  readArtifacts:
    - stardust/current/_brand-extraction.json
colors:
  background: "#fdfcfc"
  surface: "#f5f3f1"
  surfaceAlt: "#ebe8e4"
  surfaceInverse: "#ffffff"
  textPrimary: "#000000"
  textMuted: "#777169"
  border: "#e5e5e5"
  accent: "#eb524b"
typography:
  headingFamily: "Waldenburg"
  headingStack: "\"Waldenburg\", \"Waldenburg Fallback\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif"
  bodyFamily: "Inter"
  bodyStack: "\"Inter\", \"Inter Fallback\", system-ui, sans-serif"
  monoFamily: "Geist Mono"
  scale: ad-hoc
rounded: "9999px"
spacing:
  baseUnit: 4
  sectionPadding: "96px"
  containerMaxWidth: "1280px"
components:
  - pill-cta
  - feature-grid
  - api-model-cards
  - research-index
  - social-proof-logos
---

# DESIGN — ElevenLabs (current state)

Descriptive visual system extracted from the home page.

## Color

Near-monochrome, warm. The ground is a warm off-white `#fdfcfc` (not
pure white), with `#f5f3f1` and `#ebe8e4` as warm surfaces and
`#e5e5e5` hairline borders. Ink is pure black `#000000`; muted text is
a warm gray `#777169`. The only chromatic move is a **red ramp**
(`#FAABA7` → `#EB524B` → `#D7332B` → `#B52720`) used sparingly on the
waveform / research surfaces. Buttons are black-on-white (primary) or
white-outline (secondary).

## Typography

- **Display:** Waldenburg — a distinctive private cut. Hero/H1 set in
  the *Buch* (light, 300) weight; this lightness at large sizes is the
  signature. WaldenburgFH (Fett Halbschmal, 700) sets button/label text.
- **Body:** Inter (400/500).
- **Mono/eyebrows:** Geist Mono, uppercase, for the `f-ui` label chrome.
- **Scale:** ad-hoc (no single modular ratio detected).

## Shape & motif

Pill geometry dominates (`9999px`, 195 occurrences) — every CTA and
input is a pill. Cards use a softer `20px` radius and a hairline ring
shadow (`rgba(0,0,0,0.06) 0 0 0 1px`). Recurring patterns: pill CTAs,
social-proof logo strip, two-platform split, feature grids, API model
cards, and a research index.

## Fonts

Private Waldenburg cuts captured under `assets/fonts/` (flagged
`private` — verify usage rights before redeploying). Inter and Geist
Mono are open.
