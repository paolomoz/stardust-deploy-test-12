---
_provenance:
  writtenBy: stardust:uplift
  writtenAt: 2026-06-19T04:10:09.299Z
  againstInput: https://www.adaline.ai/
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/home.json
    - stardust/current/brand-review.html
---

# Improvements — https://www.adaline.ai/

1. **[dated-pattern]** Hero under-sells its own voice — the `h1` "Never stop
   learning" renders at a modest 53px with a flat double-CTA ("Sign Up" /
   "Read Docs") and no clear primary, while the brand's most expressive type
   (Instrument Serif, 104px) is hidden in the footer. The first viewport reads
   restrained-to-a-fault for a category-defining claim. _(headings[0], ctas)_

2. **[ia-clutter]** Long dead vertical stretches between proof sections — the
   full-page render shows large blank zones separating the trace / behavior /
   eval panels, so the page feels under-filled on scroll and the proof floats
   in isolation without connective narrative. _(screenshot, landmarks[3,4,5])_

3. **[contrast-or-density]** The "Trusted by" logo row is visually faint —
   small, low-contrast monochrome SVGs (several failing to load, captured at
   0×0) under-leverage genuinely marquee logos (Salesforce, DoorDash, HubSpot,
   Superhuman, McKinsey). Top-tier social proof is present but whispered.
   _(media.images, landmarks[2])_

4. **[cliché]** The live-trace and behavior panels are impressive but
   uninterpreted — dense monospace dumps (`B01 ISSUE pytest failures…`,
   trace rows with timestamps and costs) with no plain-language framing of
   *what self-improvement looks like*. The machinery is shown but never
   narrated, so a first-time visitor sees texture, not meaning.
   _(landmarks[3,4] innerText, ctas B01..B25)_

5. **[missed-opportunity]** Instrument Serif — the single most distinctive
   type asset on the page — is used exactly once, at 104px, in the closing
   footer. Its expressive power is spent on the surface the fewest visitors
   reach. _(headings[3], _brand-extraction.json § type)_
