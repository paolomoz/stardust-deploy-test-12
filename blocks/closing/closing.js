/**
 * closing — final CTA band (variant A): "Built for the future. Available today."
 *
 * Authoring rows (one cell each):
 *   1. eyebrow   — short label ("Now")
 *   2. headline  — big closing line (-> <h2>)
 *   3. CTAs      — <strong><a> primary + <em><a> secondary
 *
 * Read by CELL/textContent (#79); CTAs are already .btn-decorated by decorateLinks().
 */
export default async function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const headingCell = cells.find((c) => c.querySelector('h1, h2, h3'));
  const ctaCell = cells.find((c) => c.querySelector('a'));
  const eyebrowCell = cells.find((c) => {
    if (c === headingCell || c === ctaCell) return false;
    const t = c.textContent.trim();
    return t && t.length < 40;
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap closing-inner';

  if (eyebrowCell) {
    const eb = document.createElement('p');
    eb.className = 'eyebrow';
    eb.textContent = eyebrowCell.textContent.trim();
    wrap.append(eb);
  }

  const h2 = document.createElement('h2');
  const src = headingCell ? (headingCell.querySelector('h1, h2, h3') || headingCell) : null;
  h2.textContent = src ? src.textContent.trim() : '';
  wrap.append(h2);

  if (ctaCell) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    wrap.append(actions);
  }

  block.replaceChildren(wrap);
}
