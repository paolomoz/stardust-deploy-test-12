---
_provenance:
  writtenBy: stardust:extract
  writtenAt: 2026-06-19
  againstInput: https://www.apple.com/
  mode: descriptive
colors:
  background: "#ffffff"
  surface: "#f5f5f7"
  text: "#1d1d1f"
  textSecondary: "#6e6e73"
  primary: "#0071e3"
  accent: "#2997ff"
typography:
  headingFamily: "SF Pro Display, Helvetica Neue, Helvetica, Arial, sans-serif"
  bodyFamily: "SF Pro Text, Helvetica Neue, Helvetica, Arial, sans-serif"
  scale: modular
rounded: pill (980px CTA) + 28px tile cards
spacing: generous; section rhythm driven by full-bleed tiles with ~22px gutters
components: [globalnav, pill-cta, product-tile, bento-grid, gallery, globalfooter]
---

# DESIGN — apple.com (current state)

## Color
A near-monochrome system. Near-black `#1d1d1f` text on white `#ffffff` and the
signature light gray `#f5f5f7` section fill. A single functional blue
(`#0071e3` for pill CTAs, `#0066cc`/`#2997ff` for links) is the only chromatic
accent. Dark tiles invert to near-black backgrounds with `#f5f5f7` text. No
gradients, no decorative color — color is reserved for product photography.

## Typography
SF Pro Display (semibold 600) for headlines, SF Pro Text for body and links.
Clean modular scale: hero headers 56px, tile headers 40px, h1 34px, footer 12px.
The display/text optical-size split is the load-bearing typographic signature.

## Shape & depth
Two radii only: the 980px pill (CTAs) and a large ~28px card radius on tiles.
Shadow is almost absent (one soft `rgba(0,0,0,.22) 3px 5px 30px`); depth comes
from the light/dark tile alternation, not elevation.

## Layout
The bento grid: full-width hero tiles (Father's Day, iPhone) stacked with 2-up
tile rows (MacBook Air + iPad Air, MacBook Pro + Apple Privacy, Trade In +
Apple Card). Each tile = centered headline + one subhead line + a Learn more /
Buy link pair, set over (or above) a full-bleed product photo. A persistent
44px globalnav on top; a deep 5-column directory footer below.
