/**
 * platforms — two-platform split (ElevenCreative / ElevenAgents).
 * Authoring:
 *   row 1: <h2> section heading (one cell)
 *   rows 2..N: one card per row, cells: [name <h3>] [description] [CTA <em><a>]
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const heading = rows[0]?.querySelector('h1, h2, h3') || (() => {
    const h = document.createElement('h2'); h.textContent = (rows[0]?.textContent || '').trim(); return h;
  })();
  heading.classList.add('section-h');
  wrap.append(heading);

  const grid = document.createElement('div');
  grid.className = 'plat-grid';
  rows.slice(1).forEach((row, i) => {
    const cells = [...row.children];
    if (!cells.length) return;
    const card = document.createElement('article');
    card.className = 'plat';
    const orb = document.createElement('div');
    orb.className = `plat-orb po${(i % 2) + 1}`;
    orb.setAttribute('aria-hidden', 'true');
    card.append(orb);
    const nameCell = cells[0];
    const h3 = nameCell.querySelector('h1,h2,h3,h4') || document.createElement('h3');
    if (!h3.textContent) h3.textContent = nameCell.textContent.trim();
    card.append(h3);
    if (cells[1]) { const p = document.createElement('p'); p.textContent = cells[1].textContent.trim(); card.append(p); }
    const ctaCell = cells[2];
    if (ctaCell && ctaCell.querySelector('a')) {
      const actions = document.createElement('div');
      actions.className = 'actions btn-group';
      [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
      card.append(actions);
    }
    grid.append(card);
  });
  wrap.append(grid);
  block.replaceChildren(wrap);
}
