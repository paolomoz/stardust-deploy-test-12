---
_provenance:
  writtenBy: stardust:uplift
  writtenAt: 2026-06-19T05:10:00Z
  againstInput: https://dala.craftedbygc.com/
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/home.json
    - stardust/current/brand-review.html
---

# Improvements — https://dala.craftedbygc.com/

1. **[dated-pattern]** Centered single-column "stealth teaser" hero with no product surface — the hero is one centered headline ("Unlock collective wisdom.") over a particle cloud, funneling exclusively to a gated Typeform ("Request Access"). Zero product glimpse, zero proof above the fold. This is the 2021–22 stealth-startup teaser pattern; premium brands now pair the manifesto with a concrete product moment. Evidence: `pages/home.json` hero section + sole CTA `Request Access`.

2. **[ia-clutter]** Flat, undifferentiated hierarchy across a long scroll — 12 sibling H2s with no eyebrows, no section numbering, and no scroll progress affordance, so the manifesto reads as one continuous wall of prose. Evidence: heading outline carries 12 distinct headings, `voiceTable.toneMetrics.headingsUppercasePercent: 0`, no eyebrow/kicker labels captured.

3. **[contrast-or-density]** Hierarchy collapses onto size alone — a single typeface (PP Neue Montreal) set mostly at weight 400 across display, body, and UI, on an ad-hoc scale (112.5 → 78 → 48 → 42 → 27 → 24px, ratios 1.44/1.63/1.14/1.56/1.13, no consistent ratio). Without weight or modular-scale discipline, mid-page sections blur into one another. Evidence: `_brand-extraction.json § type.scaleAudit.kind = "ad-hoc"`; heading weights `[400]`.

4. **[cliché]** Conventional trust-strip clichés undercut the otherwise high-craft surface — a decorative "Our investors" logo-PNG strip and a generic horizontal team-portrait slider are exactly the patterns the brand's restraint elsewhere earns the right to avoid. Evidence: `motifs.patterns` `investor-logo-marks` (5 decorative PNGs) + `team-portrait-slider`. Also: a content-free `"here"` link label in the "Build with us." block (a11y failure — `T-link-content-free`).

5. **[missed-opportunity]** The brand's single most distinctive asset — the generative particle-cloud "collective wisdom" constellation — appears only once, at the hero, then is abandoned for plain prose. The constellation metaphor (scattered fragments resolving into shared knowledge) is the whole product thesis and is left on the table after the first viewport. Evidence: `motifs.patterns.generative-particle-hero` present at hero only; remaining sections are `manifesto-longform` prose with no recurring motif.
