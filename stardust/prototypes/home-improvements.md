<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-06-19T05:20:00Z
  againstInput: https://dala.craftedbygc.com/
  adaptedFrom: stardust/uplift-improvements.md
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/home.json
    - stardust/current/brand-review.html
    - stardust/uplift-improvements.md
  stardustVersion: 0.10.0
-->

# Improvements — home

The load-bearing brief for variant A. Variant A applies every item exactly;
variants B and C honor the list as a floor (they may go further but not
contradict it).

1. **[dated-pattern]** Centered single-column "stealth teaser" hero with no
   product surface — one centered headline ("Unlock collective wisdom.") over a
   particle cloud, funneling exclusively to a gated Typeform ("Request Access").
   Zero product glimpse, zero proof above the fold. This is the 2021–22
   stealth-startup teaser pattern; premium brands now pair the manifesto with a
   concrete product moment. Evidence: `pages/home.json` hero section + sole CTA
   `Request Access`.
   *Fix:* Pair the manifesto headline with a concrete product moment in the
   hero, keeping "Request Access" as the single conversion path.

2. **[ia-clutter]** Flat, undifferentiated hierarchy across a long scroll — 12
   sibling H2s with no eyebrows, no section numbering, no scroll-progress
   affordance, so the manifesto reads as one continuous wall of prose.
   Evidence: heading outline carries 12 distinct headings,
   `voiceTable.toneMetrics.headingsUppercasePercent: 0`, no eyebrow/kicker
   labels captured.
   *Fix:* Add numbered mixed-case section eyebrows and a clearer hierarchy
   across the 12 headings; give the long scroll a spine (keep
   headingsUppercasePercent at 0 — mixed-case, not uppercase).

3. **[contrast-or-density]** Hierarchy collapses onto size alone — a single
   typeface (PP Neue Montreal) set mostly at weight 400 across display, body and
   UI, on an ad-hoc scale (112.5 → 78 → 48 → 42 → 27 → 24px, no consistent
   ratio). Without weight or modular-scale discipline, mid-page sections blur
   into one another. Evidence: `_brand-extraction.json § type.scaleAudit.kind =
   "ad-hoc"`; heading weights `[400]`.
   *Fix:* Drive hierarchy from weight (exercise the captured 200/400/600 range)
   plus a strict modular scale (≥1.25); retire the ad-hoc scale (T-scale).

4. **[cliché]** Conventional trust-strip clichés undercut the otherwise
   high-craft surface — a decorative "Our investors" logo-PNG strip and a generic
   horizontal team-portrait slider are exactly the patterns the brand's restraint
   elsewhere earns the right to avoid. Also a content-free `"here"` link label in
   the "Build with us." block (a11y failure — `T-link-content-free`). Evidence:
   `motifs.patterns` `investor-logo-marks` (5 decorative PNGs) +
   `team-portrait-slider`.
   *Fix:* Replace the investor logo strip and portrait slider with a restrained,
   on-brand treatment (stated investor signal in text; a calm static team grid,
   not a slider); give the bare "here" link descriptive text.

5. **[missed-opportunity]** The brand's single most distinctive asset — the
   generative particle-cloud "collective wisdom" constellation — appears only
   once, at the hero, then is abandoned for plain prose. The constellation
   metaphor (scattered fragments resolving into shared knowledge) is the whole
   product thesis and is left on the table after the first viewport. Evidence:
   `motifs.patterns.generative-particle-hero` present at hero only; remaining
   sections are `manifesto-longform` prose with no recurring motif.
   *Fix:* Reprise the constellation motif past the hero as a quiet recurring
   accent so the brand's thesis asset is not abandoned (variant C extends this
   into a full structural system).
