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

# "What if…" candidates — https://elevenlabs.io/

## Picked

### Variant C · Display-typography amplification
What if: "What if Waldenburg stopped whispering — the light display cut became kinetic, type assembling like sound resolving into speech?"
Cinematic register: `kinetic-display` (auto-picked from PRODUCT.md Brand Personality: display-typography-signature + uppercase mono labels as structural chrome)
Evidence: `_brand-extraction.json#type.headingFamily` — Waldenburg is a private cut (KMR-Waldenburg Buch/Normal/Fett captured) used almost entirely at the hero in weight 300; its structural potential (section heads, dividers, big numerals) is unexercised. `--f-ui-*-text-transform: uppercase` shows uppercase mono labels already used as a label system.
Motion bet: hero + section heads reveal letter-by-letter (`clip-path` / `blur 8px→0`), echoing audio resolving into speech; the waveform motif becomes the reveal mechanic; big model-version numerals count/flip in. One register, brand-faithful.

### Variant B · Color-ladder re-weighting
What if: "What if ElevenLabs' reserved colour — the gradient-orb spectrum and the research red — became the page's primary surface instead of a rare event?"
Captured trait amplified: Color-ladder re-weighting
Evidence: `_brand-extraction.json#palette` — the accent ramp (`#FAABA7 → #EB524B → #D7332B → #B52720`) and the gradient-orb imagery appear in <1% of computed surface; the page ground is monochrome warm-neutral (`#fdfcfc` 29,224 occ vs accent 9 occ). The colour identity exists but is proportionally suppressed.
Composition bet: promote the gradient spectrum to one or two large grounds (a colour-flooded hero band and a research/CTA band), let the orbs scale up as section anchors, keep typography and IA identical to A. Pure proportion shift — no motion layer. Differentiates from C by axis (colour/composition vs type/motion).

## Disqualified

- **Photography re-foregrounding** — disqualified: ElevenLabs ships almost no editorial photography; its visual assets are abstract gradient renders, UI screenshots, and the waveform. Amplifying "photography at editorial scale" would have nothing to amplify.
- **Live-data promotion** — disqualified: the home page exposes no real-time operational signals (no wait times, queue counts, status board). It is a marketing surface; liveness can't be faked from captured data.
- **Voice-register pivot** — disqualified: voice samples are uniformly technical-precise; there is no underused contrasting tone (warm/casual/civic) sitting in the margins to foreground.

## Considered but not picked

- **Signature-gesture extension (waveform/orb)** — strong trigger, but its motion-led form overlaps with C's reveal mechanic and its composition-led form overlaps with B's colour re-weighting; folding the waveform into C's reveal and the orbs into B's colour bet covers it without a redundant fourth variant.
- **Audience-routing reframe** — real trigger (3 audiences compressed), but it is addressed inside Variant A's improvements (resolve the competing CTA verbs), so it doesn't need a dedicated amplification variant.
- **Motif vocabulary swap** — moderate trigger (card-grid dominant), but its natural register is `kinetic-grid`, which we did not pick for C; promoting it would make B/C differ by intensity rather than axis.
