/**
 * products — "more from Duolingo" cluster (improvement 3).
 * Authoring:
 *   head rows (before the first card): heading (h2) and an optional sub paragraph
 *   card rows: | picture | title (h3) | body | link |  — one row per product
 */
export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const headParts = [];
  const cards = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    const hasHeading3 = cells.some((c) => c.matches('h3') || c.querySelector('h3'));
    const pic = cells.map((c) => (c.matches('picture, img') ? c : c.querySelector('picture, img'))).find(Boolean);
    if (pic || hasHeading3 || cells.length >= 3) {
      const titleCell = cells.find((c) => c.matches('h3') || c.querySelector('h3'))
        || cells.find((c) => c.textContent.trim() && !(c.matches('picture, img') || c.querySelector('picture, img')) && !c.querySelector('a'));
      const linkCell = cells.find((c) => c.matches('a') || c.querySelector('a'));
      const bodyCell = cells.find((c) => c !== titleCell && c !== linkCell && c.textContent.trim()
        && !(c.matches('picture, img') || c.querySelector('picture, img')));
      cards.push({ pic, title: titleCell ? titleCell.textContent.trim() : '', body: bodyCell ? bodyCell.textContent.trim() : '', link: linkCell ? linkCell.querySelector('a') || linkCell : null });
    } else if (cells.length) {
      headParts.push(cells[0]);
    }
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (headParts.length) {
    const head = document.createElement('div');
    head.className = 'p-head';
    const h2 = document.createElement('h2');
    h2.textContent = headParts[0].textContent.trim();
    head.append(h2);
    if (headParts[1]) {
      const p = document.createElement('p');
      p.textContent = headParts[1].textContent.trim();
      head.append(p);
    }
    wrap.append(head);
  }
  const grid = document.createElement('div');
  grid.className = 'pgrid';
  cards.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = `pcard p${i + 1}`;
    const top = document.createElement('div');
    top.className = 'top';
    if (c.pic) top.append(c.pic);
    const body = document.createElement('div');
    body.className = 'body';
    body.innerHTML = `<h3>${c.title}</h3><p>${c.body}</p>`;
    if (c.link) {
      const a = c.link.cloneNode(true);
      a.classList.add('p-link');
      body.append(a);
    }
    card.append(top, body);
    grid.append(card);
  });
  wrap.append(grid);
  block.replaceChildren(wrap);
}
