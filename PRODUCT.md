<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-06-19T05:20:00Z
  againstInput: https://dala.craftedbygc.com/
  mode: A (brand-faithful, signal-strong)
  sharedAcross: [variant-A, variant-B, variant-C]
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/PRODUCT.md
    - stardust/current/brand-review.html
    - stardust/uplift-improvements.md
    - stardust/uplift-questions.md
    - stardust/direction.md
  stardustVersion: 0.10.0
-->

# Dala — Target Strategy

> Shared across all three variants. Strategy (register, audience, purpose,
> personality, anti-references, principles) does not change between variants
> under Mode A — only the visual treatment does.

## Register

**brand** _(inherited from current/PRODUCT.md; confirmed by the captured surface)_

Dala is a single-page marketing / manifesto landing for an early-stage AI
workplace-knowledge product. Every signal is brand-surface, not
product-surface: a cinematic generative hero, mission and manifesto prose, a
founder team section, an investor signal, and a single conversion path
("Request Access" → an external Typeform). There is no authenticated app, no
data tables, no in-product navigation. The page exists to make a visitor
believe in Dala and request access. The deliverable is the impression itself.

## Users

_(inherited from the captured copy, CTAs, and the team / hiring blocks)_

- **Knowledge workers on fragmented teams** — the primary audience. People who
  "spend 30% of their time trying to organise and find the information and
  expertise" they need. Addressed in the second person ("your workplace",
  "your team's shared brainpower"). This audience leads the home in every
  variant.
- **Prospective hires** — a "Build with us." block recruits "intentional,
  empathetic and curious people." Below the fold by design.
- **Investors / operators** — an investor-signal section signals traction to a
  financing audience. Below the fold by design.

The conversion ask is uniform across all audiences: gated early access via
Typeform rather than self-serve signup — a pre-launch / waitlist posture.
This single funnel is an IA-priority constraint (see DESIGN.json
`extensions.iaPriorities`), not a stylistic choice.

## Product Purpose

_(quoted and paraphrased from captured body copy)_

Dala is positioned as an AI-powered workplace knowledge tool: it "automates
extracting knowledge from across your organisation so that you can take the
guesswork out of your work." It frames a problem ("Countless fragments of
critical knowledge scattered across hundreds of disparate systems") and a
solution ("your intelligent, real-time source of truth").

The stated mission is philosophical rather than feature-driven: "to make work
more coherent and delightful — reframing productivity from doing more to being
better." Dala wants to recreate the feeling of being "in flow, intellectually
stimulated, and creating value." Scope of this redesign: the home / manifesto
landing only (slug `home`).

## Brand Personality

_(derived from the resolved expressive axis + captured tone + reference set)_

Confident, aspirational, and quietly premium — a **manifesto, not a feature
sheet**. The identity is cinematic and restrained: a pure-black canvas, a
single electric-purple accent (#8052ff) used only on conversion, oversized
editorial typography in one private typeface, and a generative particle-cloud
"collective wisdom" constellation that literalises scattered knowledge
coalescing into shared understanding. The voice is warm and human ("delightful",
"in flow") layered over a high-craft, almost luxury-tech surface. The register
sits closer to Linear / Vercel / Arc than to conventional B2B SaaS.

**Key personality traits:** cinematic · editorial · restrained · aspirational ·
human-warm-over-premium-dark · display-typography-signature ·
signature-gesture (generative constellation).

The two traits that drive variant differentiation are both captured, not
invented: `display-typography-signature` (one private typeface carrying display,
body, and UI — variant B amplifies this) and the `signature-gesture` generative
constellation (variant C amplifies this; it also selects the cinematic motion
register `arrival` — civic/institutional-adjacent "introducing an entity"
arrival choreography, not editorial crossfade).

## Anti-references

_(captured avoidances + anti-toolbox guardrails relevant to this direction)_

- **Generic 2026 SaaS landing silhouette** — no blue gradient hero, no 3-up
  feature-card grid, no stock illustration, no conventional logo-soup
  "trusted by" strip. (Anti-toolbox: the "modernise" Generic-2026-SaaS
  guardrail is in force; prototype and polish must enforce it.)
- **Light, busy, dense dashboards** — the site is dark, spacious,
  slow-scrolling; blackspace is the dominant material.
- **Feature-list marketing** — copy leads with mission and feeling, not
  bullet-pointed capabilities.
- **Loud multi-color palettes** — black, white, one purple, one muted gray.
  No fourth color is introduced in any variant.
- **Editorial-register costume vocabulary** — "atelier", "the studio",
  "mise-en-place", "the journal" are forbidden. Dala is a product/manifesto
  brand; editorial vocabulary smuggled in would be anti-toolbox drift. (See
  the anti-toolbox audit in DESIGN.json.)
- **Photography re-foregrounding** — the brand deliberately avoids photography;
  the hero is generative abstraction. Do not promote the founder portraits or
  investor PNGs to a hero treatment (this was a disqualified what-if).

## Design Principles

_(3–5, each mapped to a specific axis movement applied in this redesign)_

- **Black is the canvas.** Pure #000000 ground throughout; the design is built
  in negative space and light. _(density axis: balanced — calm but compact;
  the captured 120px sections are reduced to ≤64px under the multi-audience
  density floor.)_
- **One accent, used for conversion only.** Electric purple #8052ff touches
  well under 10% of any viewport and means exactly one thing: "act." _(color
  axis: held — restraint preserved; the One-Voice Rule is load-bearing.)_
- **Hierarchy from weight and modular scale, not size alone.** A single private
  typeface does the work, but the redesign retires the ad-hoc scale and the
  weight-400-only flatness: a strict modular scale plus the captured 200/400/600
  weight range carries hierarchy. _(expressive + distinctiveness axes: the
  captured display-typography signature is exercised, not just described.)_
- **The constellation is the brand's thesis, not a hero backdrop.** The
  generative "collective wisdom" motif is reprised past the first viewport as a
  recurring structural accent. _(distinctiveness axis: the signature gesture is
  extended; variant C makes it the structural spine.)_
- **A single, gated conversion path.** Everything funnels to "Request Access" →
  Typeform; the funnel is never fragmented across competing verbs. _(IA-priority
  constraint, preserved site-wide across variants.)_

## Accessibility & Inclusion

_(impeccable defaults + direction-specific constraints)_

- White (#ffffff) on black (#000000) is the primary pairing — 21:1, far above
  WCAG AA. Muted gray (#9a9a9a) on black is 7.0:1 — passes AA for text; do not
  drop secondary text below #9a9a9a on black.
- Purple (#8052ff) is used as a fill behind white pill labels only; verify the
  white-on-purple pairing at ≥4.5:1 in deployment (it passes for the captured
  pill sizes).
- Fix the content-free `"here"` link label captured in the "Build with us."
  block (`T-link-content-free`) — links carry descriptive text in all variants.
- All motion in variant C is gated behind `prefers-reduced-motion`: every
  cinematic element (parallax, rising plates, staggered entrances, the
  constellation divider system, the footer wordmark wipe) is neutralised to a
  static end-state under `prefers-reduced-motion: reduce`. The reduced-motion
  render must be a complete, legible page on its own.
- Proper heading hierarchy and the numbered-section eyebrows (improvement #2)
  improve scannability of the long single-page scroll for screen-reader users.
