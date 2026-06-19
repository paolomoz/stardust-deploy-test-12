# ⚠️ Font licensing — action required before going live

This project self-hosts Apple's **SF Pro** typeface for brand-faithful prototype
review of an apple.com redesign. SF Pro is **proprietary to Apple Inc.**

| File | Family | Weight | Foundry | Status |
|---|---|---|---|---|
| `sf-pro-display_regular.woff2` | SF Pro Display | 400 | Apple Inc. | ⚠️ license required |
| `sf-pro-display_semibold.woff2` | SF Pro Display | 600 | Apple Inc. | ⚠️ license required |
| `sf-pro-display_bold.woff2` | SF Pro Display | 700 | Apple Inc. | ⚠️ license required |
| `sf-pro-text_regular.woff2` | SF Pro Text | 400 | Apple Inc. | ⚠️ license required |
| `sf-pro-text_semibold.woff2` | SF Pro Text | 600 | Apple Inc. | ⚠️ license required |
| `sf-pro-text_bold.woff2` | SF Pro Text | 700 | Apple Inc. | ⚠️ license required |

The woff2 files were captured from apple.com's own publicly-served `/wss/fonts/`.
Internal/presales review on a branch preview is generally fine; **publishing to
`aem.live` requires confirming Apple's webfont/embedding terms.**

## Remove path (fall back cleanly)

If the license cannot be confirmed:
1. Delete the six `sf-pro-*.woff2` files in this folder.
2. Delete the six `@font-face` rules at the top of `styles/styles.css`.

The `--font-display` / `--font-text` stacks then fall back to
`-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif` — which
renders SF natively on Apple devices and Helvetica/Arial elsewhere. No code
changes needed beyond the deletions.
