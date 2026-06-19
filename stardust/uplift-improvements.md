---
_provenance:
  writtenBy: stardust:uplift
  writtenAt: 2026-06-19
  againstInput: https://linear.app/
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/home.json
    - stardust/current/brand-review.html
---

# Improvements — https://linear.app/

1. **[dated-pattern]** The page now reads as the *category default* it
   invented — Linear pioneered the near-black canvas + gradient display
   type + embedded product-screenshot template, and as of 2026 every
   dev-tool homepage (Vercel, Resend, Clerk, et al.) ships the same look.
   The captured surface (`#08090a` ground, `linear-gradient` display
   text, product mock hero) no longer signals "Linear" specifically; it
   signals "modern dev tool." The redesign should reclaim a distinctive
   note rather than restate the template.

2. **[ia-clutter]** The mid-page is six near-identical feature sections
   at the same altitude — "Make product operations self-driving",
   "Define the product direction", "Move work forward across teams and
   agents", "Review PRs and agent output", "Understand progress at
   scale", "Changelog" — every one an h2 at 48px / weight 510 with the
   same heading-over-mock composition. They blur into an undifferentiated
   stack; nothing signals which capability is the lead. Hierarchy needs
   re-weighting so one or two pillars carry the section, not six equals.

3. **[contrast-or-density]** The muted text ramp bottoms out at
   `#62666d` on the `#08090a` ground (≈3.0:1) and `#8a8f98` (~5.1:1) is
   used for substantive supporting copy. The subtle step fails WCAG AA
   for body/caption text against the near-black canvas — a real
   accessibility gap on a page that otherwise prizes craft.

4. **[cliché]** Gradient-on-dark display text ("A new species of product
   tool.") is now an AI/dev-tool tell — the impeccable hook flags it as
   decorative-not-meaningful, and the four-stop pastel gradient is the
   single most-copied 2024–2026 landing-page gesture. Linear can move
   past it while staying recognisably itself (the indigo + lime + Inter
   system is distinctive without the gradient crutch).

5. **[missed-opportunity]** The product's whole claim is *speed* and
   *self-driving operations* — issues moving, agents working, progress
   updating in real time — yet the page is entirely static and the hero
   is a frozen product screenshot. The most kinetic value proposition on
   the page is delivered as still type. Separately, **Berkeley Mono** —
   a characterful, licensed monospace — is captured but used only in
   tiny eyebrows/labels; a signature typographic asset left almost
   entirely on the table.
