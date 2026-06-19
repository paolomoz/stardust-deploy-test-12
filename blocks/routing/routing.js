/**
 * routing — dark dual-audience routing band: two cards (business / personal),
 * each with a heading, body, and a CTA.
 *
 * Reads by CELL, tolerant of <p> unwrapping (#79): heading via querySelector,
 * body via a heading/link-stripped textContent, CTA anchors cloned verbatim
 * (ak.js decorateButton has already styled <strong>/<em> wrapped anchors).
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'rt-grid';

  rows.forEach((row) => {
    const cell = row.querySelector(':scope > div') || row;
    const h = cell.querySelector('h2, h3, h4');
    const anchors = [...cell.querySelectorAll('a')];

    const clone = cell.cloneNode(true);
    clone.querySelectorAll('h1, h2, h3, h4, a, strong, em').forEach((e) => e.remove());
    const body = clone.textContent.trim();

    const card = document.createElement('div');
    card.className = 'rt-card';
    if (h) { const hh = document.createElement('h3'); hh.innerHTML = h.innerHTML; card.append(hh); }
    if (body) { const p = document.createElement('p'); p.textContent = body; card.append(p); }
    if (anchors.length) {
      const actions = document.createElement('div');
      actions.className = 'actions';
      anchors.forEach((a) => actions.append(a.cloneNode(true)));
      card.append(actions);
    }
    grid.append(card);
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.append(grid);
  block.replaceChildren(wrap);
}
