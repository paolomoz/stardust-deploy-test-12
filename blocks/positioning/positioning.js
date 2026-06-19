/**
 * positioning — a single large centered statement line.
 *
 * Authoring rows:
 *   1. statement   the positioning sentence -> <h2>
 */

export default async function decorate(block) {
  const cell = block.querySelector(':scope > div > div') || block.firstElementChild;
  const text = cell ? cell.textContent.trim() : '';
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const h = document.createElement('h2');
  h.className = 'position-line';
  h.textContent = text;
  wrap.append(h);
  block.replaceChildren(wrap);
}
