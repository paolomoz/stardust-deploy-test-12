# Font licensing — ACTION REQUIRED before going live

This project self-hosts a **proprietary commercial** typeface for brand fidelity.
Do **NOT** publish to `*.aem.live` until the embedding/webfont license is confirmed.

| File | Family | Weight | Foundry | License status |
|---|---|---|---|---|
| `PPNeueMontreal-Light.woff2` | PP Neue Montreal | 200 | Pangram Pangram (private) | ⚠️ UNCONFIRMED — embedding license required |
| `PPNeueMontreal-Regular.woff2` | PP Neue Montreal | 400 | Pangram Pangram (private) | ⚠️ UNCONFIRMED — embedding license required |
| `PPNeueMontreal-SemiBold.woff2` | PP Neue Montreal | 600 | Pangram Pangram (private) | ⚠️ UNCONFIRMED — embedding license required |

The fonts were captured from the source site's private deck and lifted for a
brand-faithful presales conversion. Shipping them on the served domain requires a
valid web embedding license from the foundry.

## Remove path (if licensing cannot be confirmed)

1. Delete the three `PPNeueMontreal-*.woff2` files in this folder.
2. Delete the three `@font-face { font-family: "PP Neue Montreal"; … }` rules at the
   top of `styles/styles.css`.

The `--font-body` stack (`"PP Neue Montreal", arial, sans-serif`) then falls back to
the **metric-matched `"Arial"`** face also declared in `styles/styles.css`
(`size-adjust:121.66% / ascent-override:78.75% / descent-override:19.89%`). This is a
zero-CLS swap — the brand display face degrades to system Arial but the page does not
shift. No other change is required.
