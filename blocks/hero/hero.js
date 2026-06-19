/**
 * hero — Duolingo lead section (faithful + improvement 1 & 5).
 *
 * Authoring rows (any order tolerated; flattened single-cell shape also handled):
 *   - eyebrow      short text line before the heading
 *   - headline     the page's single <h1>
 *   - lede         link-free sentence after the heading
 *   - CTAs         <strong><a> primary, <em><a> secondary (ghost)
 *   - picture      the hero illustration
 */

function collectNodes(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) out.push(...kids);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      out.push(p);
    }
  });
  return out.length ? out : [...block.children];
}

export default async function decorate(block) {
  const nodes = collectNodes(block);
  const isPic = (el) => el.matches('picture, img') || el.querySelector('picture, img');
  const isHeading = (el) => el.matches('h1, h2, h3') || el.querySelector('h1, h2, h3');
  const hasLink = (el) => el.matches('a') || el.querySelector('a');

  const picEl = nodes.find(isPic);
  const headEl = nodes.find(isHeading);
  // anchors are already class-decorated by ak.js decorateButton (runs before block JS)
  const anchors = [];
  nodes.forEach((n) => {
    if (n.matches?.('a')) anchors.push(n);
    else n.querySelectorAll?.('a').forEach((a) => anchors.push(a));
  });
  const plain = nodes.filter((n) => !isPic(n) && !isHeading(n) && !hasLink(n));
  const eyebrow = plain[0];
  const lede = plain[1];

  const wrap = document.createElement('div');
  wrap.className = 'wrap hero-grid';

  const col = document.createElement('div');
  col.className = 'hero-text';
  if (eyebrow) { eyebrow.classList.add('eyebrow'); col.append(eyebrow); }
  if (headEl) {
    const inner = headEl.querySelector('h1, h2, h3') || headEl;
    const h1 = document.createElement('h1');
    h1.append(...inner.childNodes);
    col.append(h1);
  }
  if (lede) { lede.classList.add('lead'); col.append(lede); }
  if (anchors.length) {
    const actions = document.createElement('div');
    actions.className = 'hero-cta';
    anchors.forEach((a) => actions.append(a.cloneNode(true)));
    col.append(actions);
  }

  const art = document.createElement('div');
  art.className = 'hero-art';
  const pic = picEl ? (picEl.matches('picture, img') ? picEl : picEl.querySelector('picture, img')) : null;
  if (pic) art.append(pic);

  wrap.append(col, art);
  block.replaceChildren(wrap);
}
