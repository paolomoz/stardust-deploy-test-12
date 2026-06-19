---
_provenance:
  writtenBy: stardust:uplift
  writtenAt: 2026-06-19
  againstInput: https://www.apple.com/
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/home.json
    - stardust/current/brand-review.html
---

# "What if…" candidates — apple.com

## Picked

### Variant C · Display-typography amplification
What if: "What if SF Pro Display stopped being a polite caption and became the page, scaling and resolving as you scroll?"
Cinematic register: kinetic-display
Evidence: `_brand-extraction.json#type` captures SF Pro Display used only at 34 to 56px in a single semibold weight, while the headline is always just the product name. The most refined display face Apple ships never performs on the home. `typographic-restraint-ceiling` tension in brand-review.html.
Motion bet: oversized product-name headlines reveal with a blur-to-sharp + scale settle on scroll; section heads wipe in; the type, not a card, is the protagonist. Applied in the restrained Apple-faithful subset of kinetic-display (type reveals + scroll-scale), explicitly NOT the departure-board flips or signage marquees the register also permits.

### Variant B · Photography re-foregrounding
What if: "What if every product got the full-bleed editorial canvas on the home that it gets on its own product page?"
Captured trait amplified: first-party product photography
Evidence: `pages/home.json#media` captures 3008×692 product renders cropped into 1262×580 two-up grid tiles. The photography is premium first-party work (not stock), so amplifying it is safe. `uniform-tile flatten` + `missed-opportunity` improvements.
Composition bet: dissolve the uniform 2-up grid into a stack of full-bleed editorial sections, each product photo at hero scale with the headline set into the image's quiet band. Static (no cinematic layer); the bet is composition and share-of-canvas.

## Disqualified

- **Live-data promotion** — disqualified because the home exposes no real-time operational signals (no wait times, inventory, prices, tickers). A marketing brand surface cannot fake liveness.
- **Voice-register pivot** — disqualified because the captured voice is uniform (confident, terse, product-forward across every sample). There is no second tone held in the margins to foreground.
- **Audience-routing reframe** — disqualified because the home serves a single clear audience (consumer shopper). The CTA verbs (Shop, Buy, Learn more, Get your estimate) are all one explore-and-purchase intent, not four competing audiences compressed into one viewport.

## Considered but not picked

- **Color-ladder re-weighting** — strong trigger: near-black is used as ground on only ~3 dark tiles (iPhone, Privacy, MacBook Pro) while white dominates, so promoting it to a full-dark home is a real "Pro-page" move. Runner-up for B. Not picked because Photography re-foregrounding is a more visual, more distinctly-Apple design-team pitch and gives a cleaner axis split from C (composition vs motion, photo vs type).
- **Signature-gesture extension** — trigger present (the 980px pill and the Apple glyph) but the pill is already systemic, so "extend the gesture into a system" has little headroom. Differentiation better served by the type bet (C).
- **Motif vocabulary swap** — trigger present (bento-grid primary, entertainment gallery/full-bleed as the under-used alternate; would map to kinetic-grid). Not picked because C took kinetic-display, and swapping the grid primitive overlaps conceptually with B's photo re-foreground (both restructure the grid).
