---
_provenance:
  writtenBy: stardust:direct (via uplift)
  writtenAt: 2026-06-19
  mode: A (brand-faithful)
colors:
  background: "#ffffff"
  surface: "#f5f5f7"
  ground-dark: "#000000"
  text: "#1d1d1f"
  text-on-dark: "#f5f5f7"
  textSecondary: "#6e6e73"
  primary: "#0071e3"
  accent: "#2997ff"
typography:
  headingFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
  bodyFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
  scale: modular
rounded: "pill 980px CTA; 18-28px cards"
spacing: "generous; full-bleed sections, 22px gutters"
components: [globalnav, pill-cta, product-section, bento-grid, gallery, globalfooter]
---

# DESIGN — apple.com redesign target (shared, Mode A)

## Color
Near-monochrome. Near-black `#1d1d1f` text on white `#ffffff` and signature
light gray `#f5f5f7`. A pure-black `#000000` ground for dark sections (carried
from the captured dark tiles). One functional blue `#0071e3` for primary pill
CTAs; `#2997ff` for links/accents on dark. No gradients, no decorative color.

## Typography
SF Pro Display semibold (600) for headlines, SF Pro Text for body and links.
`-apple-system`/`system-ui` fallback renders SF natively on Apple devices.
Modular scale: hero 56px, tile 40px, h1 34px. The display/text optical split is
the typographic signature. Variant C amplifies the display scale dramatically.

## Shape & depth
Two radii: the 980px pill (CTAs) and ~18-28px cards. Shadow near-absent; depth
comes from light/dark section alternation, not elevation.

## Layout
Persistent 44px globalnav; an edited sequence of product sections; a deep
5-column directory footer. Section composition varies by variant (faithful bento
grid in A, full-bleed editorial stack in B, IA-faithful bento with kinetic type
in C).

## :root token contract
Every prototype exposes: `--bg --surface --ground-dark --text --text-on-dark
--text-secondary --primary --accent --font-display --font-text --radius-pill
--radius-card --gutter`.
