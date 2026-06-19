---
name: Dala — Variant B (Type as Interface)
description: What if type was the interface?
colors:
  ink-black: "#000000"
  paper-white: "#ffffff"
  electric-purple: "#8052ff"
  muted-gray: "#9a9a9a"
typography:
  display:
    fontFamily: "PPNeueMontreal, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "clamp(3.5rem, 11vw, 9rem)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "PPNeueMontreal, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 5.05rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "PPNeueMontreal, system-ui, -apple-system, sans-serif"
    fontSize: "2.369rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "PPNeueMontreal, system-ui, -apple-system, sans-serif"
    fontSize: "1.333rem"
    fontWeight: 200
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "PPNeueMontreal, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  pill: "22.5px"
  md: "24px"
  circle: "50%"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.electric-purple}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
---

# Design System: Dala — Variant B

> **What if type *was* the interface?** Variant B amplifies one captured trait:
> the display-typography signature — a single private typeface (PP Neue
> Montreal) that already carries display, body, and UI, but on the captured site
> renders at weight 400 only, on an ad-hoc scale. B exercises the full captured
> weight range (200 → 600) and a strict modular scale, and lets oversized type —
> not imagery — do all the structural work.
> **Static — no cinematic motion layer.** Palette, typeface, IA spine all pinned.

## 1. Overview

**Creative North Star: "The Specimen in the Dark"**

B amplifies the captured display-typography signature in service of the brand's
"type carries the brand" personality move. The structural primitive is the
typeface itself: Light 200 sets atmospheric lead-ins and long-form body, while
SemiBold 600 sets the structural heads — so the page reads as a living type
specimen of one family across its full captured weight range. The hero is
type-led: the manifesto headline at the top modular step (clamp up to 9rem) is
the composition; there is no product-moment panel and no constellation field
competing with the letterforms. Mid-page, a type-as-interface ladder replaces
the captured investor strip and team slider entirely — the mission reads as
oversized type set against negative space.

This is amplification of a *captured* trait, not "A but bolder": the trait is
the single-family display signature the site owns but never exercises, and the
amplification is concrete (full weight range + strict scale + type-led
composition), not a slider pushed past A.

**Key Characteristics:**
- One typeface across the full captured weight range (200 / 400 / 600).
- Strict modular scale at ratio **1.333** (perfect fourth).
- Type-led hero: letterforms are the composition, not a particle field.
- Mid-page type-specimen ladder replaces the slider/strip sections.

## 2. Colors

Inherited verbatim from the shared base. No fourth color. Purple stays on
conversion only — type, not color, carries the amplification.

### Primary
- **Electric Purple** (#8052ff): conversion only (the One-Voice Rule).

### Neutral
- **Ink Black** (#000000), **Paper White** (#ffffff), **Muted Gray** (#9a9a9a).

## 3. Typography

**Display Font:** PP Neue Montreal · **Body Font:** PP Neue Montreal · single
family, full captured weight range exercised.

**Character:** Type *is* the interface. Hierarchy is built on a strict modular
scale at ratio **1.333** (perfect fourth) — a steeper ratio than the base's 1.25,
chosen to give the display steps real drama while staying a fixed modular
system. Weight does structural work: Light 200 for atmosphere and body, SemiBold
600 for structure.

### Hierarchy
- **Display** (600, clamp 3.5–9rem, line-height 0.96): hero headline; the
  composition itself.
- **Headline** (600, clamp 2.75–5.05rem): section heads.
- **Title** (400, 2.369rem): sub-heads.
- **Body** (**200**, 1.333rem, line-height 1.55): manifesto prose set in Light
  for atmospheric contrast against SemiBold heads. Larger than the base body
  because type leads the layout.
- **Label** (600, 0.75rem, 0.06em): numbered eyebrows, mixed-case.

### Named Rules
**The Full-Range Rule.** All three captured weights (200 / 400 / 600) are in
play on every long section: Light body, Regular sub-heads, SemiBold heads.
Weight-400-only flatness is retired (improvement #3, amplified).

**The Modular-Scale Rule** (ratio 1.333 override of the base 1.25). Every step
is a power of the perfect fourth; no ad-hoc sizes.

## 4. Elevation

Flat (inherited). **The No-Shadow Rule** holds. Type and negative space carry
all structure; there are no surfaces to lift.

## 5. Components

### Buttons
- **Primary:** purple pill, "Request Access" → Typeform. The single funnel,
  unchanged.

### Section Eyebrow
Numbered mixed-case eyebrow, tighter and smaller than A — it defers to the
oversized heads.

### Type-Specimen Ladder (signature, replaces investor strip + team slider)
The mid-page sections are re-typeset as a specimen ladder: each mission beat is
one oversized line stepping down the modular scale, with weight shifting from
600 heads to 200 body. The captured investor logo strip and team slider are
removed — type, not logos or portraits, carries these beats.

### Generative Particle Constellation — suppressed
B's bet is type. The constellation is reduced to a near-static faint hero
backdrop (or removed) so the letterforms own the first viewport. The motif is
*not* the structural system here — that is variant C's role.

## 6. Do's and Don'ts

Inherited from the shared base. Variant-B-specific:

### Do:
- **Do** exercise all three captured weights (200/400/600) on every long
  section (the Full-Range Rule).
- **Do** let oversized type be the layout; negative space is the second
  material.
- **Do** keep the IA spine and the single 'Request Access' funnel intact.

### Don't:
- **Don't** read B as "A but bigger fonts" — the amplification is the full
  weight range + strict 1.333 scale + type-led composition, a captured trait.
- **Don't** add imagery to compensate; type carries the page.
- **Don't** exceed 64px desktop section padding even with oversized type — the
  density floor holds.
