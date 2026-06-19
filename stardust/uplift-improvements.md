---
_provenance:
  writtenBy: stardust:uplift
  writtenAt: 2026-06-19
  againstInput: https://www.duolingo.com/
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/home.json
    - stardust/current/assets/screenshots/home.png
---

# Improvements — https://www.duolingo.com/

1. **[contrast-or-density]** The single most important headline is the quietest text on the page — the hero `<h1>` renders at **32px in eel-gray `#4B4B4B`**, while the marketing section `<h2>`s below it render at **48px in owl-green `#58CC02`**. The hero promise ("The free, fun, and effective way to learn a language!") is literally out-ranked, in both size and color, by every feature heading beneath it. Fix: promote the hero headline to the top of the type ladder (64px Feather, brand-color) and let the sections recede.

2. **[cliché]** The whole body is the **canonical 2018 SaaS alternating image-left / image-right / image-left feature row** — "free. fun. effective.", "backed by science", "stay motivated", "personalized learning" all get the identical 50/50 split. Because every claim is weighted the same, nothing is emphasized. Fix: break the rhythm — make one or two claims full-bleed hero-scale, demote the rest to a compact rail.

3. **[ia-clutter]** Below the four feature rows the page keeps going with **three near-identical product cross-sells** (English Test, Schools, ABC) plus a Super promo and a second closing CTA — ~13 sections of the same alternating cadence with no pacing change. The page reads as a long, undifferentiated scroll and fatigue sets in well before the footer. Fix: cluster the three products into one compact "more from Duolingo" band so the primary learn-a-language story stays the spine.

4. **[missed-opportunity]** Duolingo's actual differentiator — **gamification and scale (streaks, XP, leagues, "world's most popular," hundreds of millions of learners)** — is almost entirely absent from the marketing page. The `<title>` says "The world's most popular way to learn" but no number, streak, league, or social-proof figure appears anywhere on the surface. The most ownable, most persuasive asset is missing. Fix: surface the proof — a learner-count stat band, a streak/XP visual, the gamification loop made legible.

5. **[dated-pattern]** The **CTA hierarchy is muddy**: the primary action ("GET STARTED" / "TRY 1 WEEK FREE") competes with a uppercase, low-contrast secondary ("I ALREADY HAVE AN ACCOUNT" in macaw outline) and a `#AFAFAF` hare-gray "SITE LANGUAGE" control, all in the same header band. The brand's signature **pushable 3D button** is the most recognizable affordance Duolingo owns, yet it isn't given clear primacy. Fix: one unmistakable primary pushable CTA per viewport; demote sign-in and language to quiet text links.
