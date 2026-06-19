---
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-06-19T00:00:00Z
  mode: A (brand-faithful)
colors:
  background: "#fdfcfc"
  surface: "#f5f3f1"
  surfaceAlt: "#ebe8e4"
  ink: "#000000"
  muted: "#5c574f"
  border: "#e5e5e5"
  accent: "#eb524b"
  accentDeep: "#b52720"
typography:
  headingFamily: "Waldenburg"
  headingStack: "\"Waldenburg\", \"Waldenburg Fallback\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif"
  bodyFamily: "Inter"
  bodyStack: "\"Inter\", system-ui, -apple-system, sans-serif"
  monoFamily: "Geist Mono"
  monoStack: "\"Geist Mono\", ui-monospace, SFMono-Regular, Menlo, monospace"
  scale: perfect-fourth
rounded: "9999px"
spacing:
  baseUnit: 4
  sectionPadding: "88px"
  containerMaxWidth: "1200px"
components:
  - pill-cta
  - two-platform-split
  - feature-grid
  - api-model-cards
  - research-index
  - social-proof-logos
  - waveform-motif
---

# DESIGN — ElevenLabs (redesign target)

Mode A brand-faithful system. Tokens are the captured ElevenLabs
surface, refined:

- **Colour.** Warm off-white ground `#fdfcfc`; surfaces `#f5f3f1` /
  `#ebe8e4`; black ink; muted text darkened to `#5c574f` for AA on the
  warm ground (improvement #5). Accent red ramp `#eb524b → #b52720`
  kept; the gradient-orb spectrum is a brand asset variants may scale.
- **Type.** Waldenburg display (300 hero, 400 sections), Inter body,
  Geist Mono uppercase eyebrows. A perfect-fourth (1.333) modular
  scale replaces the captured ad-hoc steps.
- **Shape.** Pill (`9999px`) for every CTA/input; `20px` cards with a
  hairline ring shadow.
- **Motif.** The audio waveform is the one recurring gesture.

Per-variant overrides live in `DESIGN-A.json`, `DESIGN-B.json`,
`DESIGN-C.json`.
