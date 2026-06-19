/**
 * why-it-works — compact 3-up feature rail (improvement 2).
 * Authoring:
 *   row 1: section heading (single cell)
 *   rows 2..N: card rows, cells: | icon | title | body |
 */
export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  let headText = '';
  const cards = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 3) {
      cards.push({ icon: cells[0].textContent.trim(), title: cells[1].textContent.trim(), body: cells[2].textContent.trim() });
    } else if (cells.length && !headText) {
      headText = cells[0].textContent.trim();
    }
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (headText) {
    const head = document.createElement('div');
    head.className = 'wiw-head';
    const h2 = document.createElement('h2');
    h2.textContent = headText;
    head.append(h2);
    wrap.append(head);
  }
  const grid = document.createElement('div');
  grid.className = 'cards';
  cards.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = `card c${i + 1}`;
    card.innerHTML = `<div class="ic">${c.icon}</div><h3>${c.title}</h3><p>${c.body}</p>`;
    grid.append(card);
  });
  wrap.append(grid);
  block.replaceChildren(wrap);
}
