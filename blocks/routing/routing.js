/**
 * routing — dark dual-audience routing band: two cards (business / personal),
 * each with a heading, body, and a CTA.
 *
 * Authoring: one row per card, each cell holding <h3>title</h3><p>body</p> and
 * a CTA paragraph (<strong><a> primary / <em><a> secondary).
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'rt-grid';

  rows.forEach((row) => {
    const cell = row.querySelector(':scope > div') || row;
    const h = cell.querySelector('h2, h3, h4');
    const body = [...cell.querySelectorAll('p')].find((p) => !p.querySelector('a'));
    const ctaP = [...cell.querySelectorAll('p')].find((p) => p.querySelector('a'));

    const card = document.createElement('div');
    card.className = 'rt-card';
    if (h) { const hh = document.createElement('h3'); hh.innerHTML = h.innerHTML; card.append(hh); }
    if (body) card.append(body);
    if (ctaP) {
      const actions = document.createElement('div');
      actions.className = 'actions';
      [...ctaP.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
      card.append(actions);
    }
    grid.append(card);
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.append(grid);
  block.replaceChildren(wrap);
}
