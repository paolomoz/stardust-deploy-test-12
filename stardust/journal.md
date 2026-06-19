# Stardust journal — ElevenLabs uplift

## 2026-06-19 · uplift https://elevenlabs.io/ (three variants)

**Prompt.** One-shot presales uplift of the ElevenLabs homepage —
three differentiated brand-faithful variants, all phases without
stopping.

**Extract.** Single-page live Playwright render (spec wait, HTTP 200,
consent dismissed via Accept selector). Captured: 52 headings, 21
CTAs, 46 images, 16 css backgrounds, 453 CSS custom properties, 4 font
families (Waldenburg display / Inter body / Geist Mono labels /
WaldenburgFH buttons), inline-SVG logo. Brand surface: warm off-white
(#fdfcfc) ground, black ink, warm neutrals, red accent ramp
(#EB524B→#B52720) used in <1% of surface; pill geometry (9999px, 195
occ); gradient-orb imagery. Register: brand.

**Tensions / direction.** 6 tensions surfaced (ad-hoc type scale,
accent used text/fill only, "Learn more" ×5, Talk/Contact sales
redundancy, single logo variant, empty alt). Picked:
- A — faithful + 5 improvements (static).
- B — colour-ladder re-weighting (gradient-orb spectrum + red ramp to
  large grounds; static).
- C — display-typography amplification via `kinetic-display` register
  (Waldenburg light becomes kinetic; letter reveals, animated
  waveform, signage marquee, numeral flips). Register auto-picked from
  display-typography signature; chosen over kinetic-grid to avoid the
  C-cliff of generic card animation.

**Prototype.** Generated home-A/B/C-proposed.html + home-C-cinematic.html
via a deterministic generator (shared captured IA, per-variant CSS).
Screenshot-verified all three; differentiation by axis (faithful /
colour / motion). Reduced-motion neutralises all of C's motion.

**Open question for step 2.** Which single variant to convert to EDS +
deploy (org=paolomoz, repo=stardust-deploy-test-12, branch=test-12-2,
page test-2/index). Leaning toward the variant that best balances
brand fidelity, presales impact, and clean authorability in DA.
