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

## 2026-06-19 · deploy Variant A → EDS/DA (step 2)

Chose **Variant A** (faithful + improvements) — best brand fit for ElevenLabs'
restraint thesis + cleanest authorable EDS conversion. Bootstrapped AuthorKit
runtime over vanilla boilerplate (static header/footer fragments; lazy.js #4 +
postlcp.js #21 edits; eslint/stylelint ignores). 8 blocks + foundation + self-
hosted fonts (Waldenburg licensing alert). Pushed test-12-2 → Code Sync built.
Sanitised + DA PUT (201) to test-2/index.html; preview POST (200).
Renders at https://test-12-2--stardust-deploy-test-12--paolomoz.aem.page/test-2/
(EDS resolves index → directory; /test-2/index 404s by design). Editable at
https://da.live/#/paolomoz/stardust-deploy-test-12/test-2/index.
Diff probes: visual red flags none; content-diff 0 structural 🔴 (75/75 nodes,
matching role counts); lone 🟠 FONT FORK is correct (#77 — EDS serves real Inter,
proto fell back). Lint clean.
