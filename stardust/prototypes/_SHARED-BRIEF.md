# Shared render brief — Superhuman home prototype (all variants)

You are rendering a presales redesign prototype of the **superhuman.com**
homepage as a single self-contained HTML file. Brand-faithful (Mode A): the
palette and typography below are PINNED — do not invent colors or swap the type
voice. The redesign moves *presentation*, not content or positioning.

## Captured content — use VERBATIM. Invent nothing. (content sourcing hierarchy)

- Top utility banner: `Looking for Superhuman Mail? Learn more` → https://superhuman.com/products/mail
- Brand wordmark: **SUPERHUMAN** (text logo, no asset). Links to /
- Nav: Product · Enterprise · Education · Pricing  |  Contact sales · Log in · **Sign up**
- Hero H1: **Superpowers, everywhere you work**
- Hero subcopy: **Mail, Docs, and AI that works in every app and tab**
- Hero primary CTA: **Get Superhuman** → https://superhuman.com/auth/signup?screen_hint=signup
- Hero secondary CTA: **Get the suite** → https://superhuman.com/plans
- Trusted-by logo wall (text is fine): Zoom · Expensify · Zapier · Brex · Geico · Rivian
- Suite section H2: **Your Superhuman suite**
- Four products (each its own section/card):
  - **Mail** — "The most productive email app ever made" → https://superhuman.com/products/mail
  - **Grammarly** — "Everyone's favorite AI writing partner" → https://superhuman.com/products/grammarly
  - **Coda** — "The all-in-one AI workspace for teams" → https://superhuman.com/products/coda
  - **Go** — "AI that actually works in every app you use" → https://superhuman.com/products/go-ai-assistant
- Manifesto band H2: **Becoming Superhuman.**  CTA: **Read our announcement** → https://blog.superhuman.com/introducing-new-superhuman/
- Footer link groups (use these real labels):
  - Products: Superhuman Mail, Grammarly, Coda, Superhuman Go, Agent Store
  - Company: About, Mission & Values, Careers, Partners, Contact Us
  - Resources: Help Center, Status, Superhuman Platform, Enterprise, Education
  - Legal: Terms, Trust, Legal Notices

Any content the layout demands but the page does NOT provide (stats, quotes,
addresses, prices) → render with the mandatory PLACEHOLDER signature (2px dashed
var(--color-accent) outline, monospace eyebrow `PLACEHOLDER · <type>`, illustrative
hint) and add it to the provenance `unsourcedContent[]`. DO NOT invent factual content.

## Imagery (real brand CDN assets — use as <img> src, they load publicly)

- Hero portrait (purple-toned person in profile):
  `https://superhumanstatic.com/vwfkeyj6n9ac/5638budzR16gFR9CjmQwf6/4254a1638f76a23f30e1119022e76671/person-1.webp?w=1280`
- Manifesto image ("Girl drafting a Superhuman manifesto"):
  `https://superhumanstatic.com/vwfkeyj6n9ac/6dRKs0BhqWbnOdnl43ifjt/0a2f56e8ac1c8cddfe72634f7983b440/homepage-manifesto.webp?w=1280`
- Tonal Flower (wide painterly band):
  `https://superhumanstatic.com/vwfkeyj6n9ac/1MZDaABlJ6y5NbSOUUeaTN/0e6ab0d1c98158fb9b6c6a6c2e089734/homepage-tonal-flower.webp?w=2560`

## PINNED :root token block — paste as the FIRST thing in <style>, extend freely

```css
:root{
  --heading-font-family:"Super Sans VF",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  --body-font-family:"Super Sans VF",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  --serif-font-family:"Super Serif VF",Georgia,"Times New Roman",serif;
  --heading-xxl:clamp(3rem,7vw,5.5rem);
  --heading-xl:clamp(2.25rem,4.5vw,3.5rem);
  --heading-lg:clamp(1.75rem,3vw,2.6rem);
  --heading-md:1.5rem;
  --body:1.0625rem; --body-sm:0.875rem;
  --line-height-heading:1.05; --line-height-body:1.55;
  --color-bg:#f2f0eb; --color-surface:#f7f5f2; --color-surface-2:#ece9e2;
  --color-fg:#292827; --color-fg-soft:#5b5853;
  --color-accent:#714cb6; --color-primary-soft:#d4c7ff;
  --color-mulberry:#421d24; --color-teal:#0c4243; --color-white:#ffffff;
  --spacing-xs:4px;--spacing-sm:8px;--spacing-md:16px;--spacing-lg:24px;--spacing-xl:48px;--spacing-2xl:96px;
  --section-padding:clamp(56px,8vw,96px); --max-width:1200px;
  --radius:8px; --radius-card:16px; --radius-pill:999px;
  --shadow-card:0 1px 2px rgba(20,20,19,.08),0 12px 32px -16px rgba(20,20,19,.16);
}
```

To approximate the bespoke Super Sans VF, add this Google Fonts import at the very
top of <style> (allowed for prototyping) — a close grotesk + serif accent:
```css
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
```
…and append `,"Hanken Grotesk"` into the sans stacks and `,"Instrument Serif"` into the serif stack so the rendering face is high-quality even though Super Sans VF stays named first (brand-faithful).

Note `--color-fg-soft` is `#5b5853` (raised from the captured 66%-alpha ink to meet AA — this is improvement #3, apply it in every variant).

## Hard file requirements (all variants)
1. Self-contained: all CSS inline in one <style>; the only external refs are the Google Fonts @import and the three image URLs above. The ONLY inline <script> allowed is a ≤10-line mobile-nav a11y toggle (+ for variant C, the motion runtime). No other JS.
2. First child of <head> = a `<!-- stardust:provenance ... -->` comment with writtenBy, page:home, pageUrl, variant, readArtifacts, unsourcedContent[].
3. `:root` block is the first content of <style> (after the @import).
4. Every section carries `data-section`, `data-intent`, `data-layout` (kebab-case). Hero is `data-section="hero"`.
5. Proper heading hierarchy (one h1, then h2s). Warm cream ground #f2f0eb (NOT white). No glassmorphism, no gradient text, no side stripes >1px.
6. Responsive mobile-first: nav collapses to a hamburger under 900px (with the a11y toggle script); grids stack on mobile.
7. Accessible: alt text on images, aria-labels on icon buttons, focus-visible states, AA contrast.

## Structure (IA — same baseline for A & C; B re-composes per its brief)
header (utility banner + nav) → hero → trusted-by logo wall → "Your Superhuman suite" (overview) → 4 product sections → "Becoming Superhuman." manifesto → closing CTA → footer.

Target: a polished, premium, presales-grade page. Make it genuinely beautiful — this is shown to a buyer.
