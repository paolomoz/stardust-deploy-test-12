/**
 * api — developer API cards. Authoring:
 *   row 1: <h2> heading (one cell)
 *   rows 2..N: one card per row, cells: [name <h3>] [models <ul><li>…] [CTA <em><a>]
 *     models cell may instead be newline / "·"-delimited text.
 */
function models(cell) {
  if (!cell) return [];
  const items = [...cell.querySelectorAll('li')].map((li) => li.textContent.trim()).filter(Boolean);
  if (items.length) return items;
  return cell.textContent.split(/[\n·]/).map((s) => s.trim()).filter(Boolean);
}
export default async function decorate(block) {
  const rows = [...block.children];
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const heading = rows[0]?.querySelector('h1,h2,h3') || document.createElement('h2');
  if (!heading.textContent) heading.textContent = (rows[0]?.textContent || '').trim();
  heading.classList.add('section-h');
  wrap.append(heading);

  const grid = document.createElement('div');
  grid.className = 'api-grid';
  rows.slice(1).forEach((row) => {
    const cells = [...row.children];
    if (!cells.length) return;
    const card = document.createElement('article');
    card.className = 'api-card';
    const h3 = cells[0].querySelector('h1,h2,h3,h4') || document.createElement('h3');
    if (!h3.textContent) h3.textContent = cells[0].textContent.trim();
    card.append(h3);
    const ul = document.createElement('ul');
    models(cells[1]).forEach((m) => {
      const li = document.createElement('li');
      li.innerHTML = '<span class="dot"></span>';
      li.append(document.createTextNode(m));
      ul.append(li);
    });
    if (ul.children.length) card.append(ul);
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
