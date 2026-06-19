<!-- Descriptive current-state snapshot written by stardust:extract. Describes what the existing dala.craftedbygc.com site IS, not what it should be. The target PRODUCT.md is authored later by stardust:direct. -->

# Dala — Current State

## Register

**brand** _(synthesized from the landing surface)_

The site is a single-page marketing / manifesto landing for an early-stage product. Every signal is brand-surface, not product-surface: a full-bleed cinematic hero, mission and manifesto prose, a founder team section, an investor strip, and a single conversion path ("Request Access" → an external Typeform). There is no authenticated app, no data tables, no in-product navigation, no settings. The page exists to make a visitor believe in Dala and request access.

## Users

_(inferred from copy, CTAs, and the team/hiring sections)_

- **Knowledge workers on fragmented teams** — the primary audience the copy speaks to: people who "spend 30% of their time trying to organise and find the information and expertise" they need. Addressed in the second person ("your workplace", "your team's shared brainpower").
- **Prospective hires** — a dedicated "Build with us." block actively recruits "intentional, empathetic and curious people," linking to a values essay on Medium and an email contact.
- **Investors / operators** — an "Our investors" section signals traction to a financing audience ("supported by some of the world's most pioneering operators and progressive funds").

The conversion ask is uniform: gated early access via Typeform rather than a self-serve signup, consistent with a pre-launch / waitlist posture.

## Product Purpose

_(quoted and paraphrased from captured body copy)_

Dala is positioned as an AI-powered workplace knowledge tool: "Dala's bleeding-edge AI search tool automates extracting knowledge from across your organisation so that you can take the guesswork out of your work." It frames a problem ("Countless fragments of critical knowledge scattered across hundreds of disparate systems") and a solution ("your intelligent, real-time source of truth that eliminates the cultural, financial and operational struggles of splintered tools").

The stated mission is philosophical rather than feature-driven: "to make work more coherent and delightful—reframing productivity from doing more to being better." Dala wants to recreate the feeling of being "in flow, intellectually stimulated, and creating value."

## Brand Personality

_(inferred; tone guess from `_brand-extraction.json#voice.tone`)_

Confident, aspirational, and quietly premium. The brand reads like a **manifesto, not a feature sheet**. The visual identity is cinematic and restrained: a pure-black canvas, a single electric-purple accent (#8052ff), oversized editorial typography (a 112px hero headline), and a generative particle-cloud hero that evokes "collective wisdom" as a glowing constellation. The voice is warm and human ("delightful", "in flow") layered over a high-craft, almost luxury-tech surface. It signals ambition and taste — closer to a Linear / Vercel / Arc register than a conventional B2B SaaS site.

**Key personality traits:** cinematic · editorial · restrained · aspirational · human-warm-over-premium-dark.

## Anti-references

_(inferred from what the captured surface deliberately avoids)_

- **Generic B2B SaaS landing pages** — no blue gradient hero, no 3-up feature-card grid, no stock illustration, no logo-soup "trusted by" strip in the conventional sense.
- **Light, busy, dense dashboards** — the site is dark, spacious, and slow-scrolling; whitespace (blackspace) is the dominant material.
- **Feature-list marketing** — copy leads with mission and feeling, not bullet-pointed capabilities.
- **Loud multi-color palettes** — the brand restricts itself to black, white, one purple, and a muted gray.

## Design Principles

_(observed from the captured surface)_

- **Black is the canvas.** Pure #000000 backgrounds throughout; the design is built in negative space and light.
- **One accent, used sparingly.** Electric purple #8052ff appears only on the primary CTA and the nav-toggle — roughly a "one-voice" rarity discipline.
- **Type carries the brand.** A single private typeface (PP Neue Montreal, weights 200/400/600) does all the work — display headlines, body, and UI. No display/body pairing. Hero type is enormous (112px).
- **Cinematic, generative imagery.** The hero is a computed particle field, not a photograph — abstraction over literal product screenshots.
- **Motion as narrative.** A long single-page scrollytelling structure reveals the manifesto section by section (animations were frozen at capture by `prefers-reduced-motion`).
- **A single, gated conversion path.** Everything funnels to "Request Access."

---

_Provenance: single-page (`--single`) extraction of `https://dala.craftedbygc.com/` on 2026-06-19. Sections marked `inferred` / `synthesized` are agent judgments over captured copy and the brand surface; all visual facts trace to `stardust/current/_brand-extraction.json` and `stardust/current/pages/home.json`._
