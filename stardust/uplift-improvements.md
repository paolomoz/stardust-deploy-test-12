---
_provenance:
  writtenBy: stardust:uplift
  writtenAt: 2026-06-19T00:00:00Z
  againstInput: https://elevenlabs.io/
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/home.json
    - stardust/current/brand-review.html
---

# Improvements — https://elevenlabs.io/

1. **[ia-clutter]** The home page compresses three audiences (enterprise · creator · developer) across three products (ElevenCreative · ElevenAgents · ElevenAPI) plus a research index into one long scroll, with no single dominant path — the first viewport offers five competing CTA verbs (`Sign up`, `Log in`, `Contact sales`, `Learn more`, `Get started`). Evidence: `pages/home.json#ctas` shows 12 distinct CTA labels; nav carries 5 product/section items before any primary action lands.

2. **[cliché]** Generic secondary-CTA voice — `Learn more` is reused **5×** as the catch-all affordance (→ /creative, /agents, /about, /safety, …); the label never names its destination. Evidence: `_brand-extraction.json#voiceTable.ctaFrequency` (`Learn more` total 5). Scannability + screen-reader weakness.

3. **[cliché]** Two phrasings for the same sales action — both `Talk to sales` and `Contact sales` appear on one page. Evidence: `pages/home.json#ctas`. The redesign should pick one canonical sales CTA.

4. **[missed-opportunity]** The brand's two most distinctive visual assets — the **gradient-orb color system** and the **audio waveform** — render at thumbnail / decorative scale while the layout stays monochrome warm-neutral. Evidence: palette shows color used in <1% of computed surface (`accent #eb524b`, 9 occurrences, `usedAs: text/fill` only); the gradient imagery lives inside small research cards. The signature colour-and-sound identity is cropped to garnish.

5. **[contrast-or-density]** Type scale is ad-hoc — heading sizes step unevenly with no consistent modular ratio (`_brand-extraction.json#type.scaleAudit.kind: ad-hoc`). Across a page this long the vertical rhythm reads loose; a single modular scale would tighten section-to-section cadence. Secondary: muted body (`#777169`) on the warm ground (`#fdfcfc`) is borderline for small captions and should be verified against AA.
