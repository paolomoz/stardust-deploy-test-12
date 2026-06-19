/**
 * testimonials — quote cards.
 *
 * Authoring rows:
 *   1. eyebrow        e.g. "Trusted in production"
 *   2..N. quote rows, three cells: [quote] | [author] | [role]
 */

function t(cell) { return cell ? cell.textContent.trim() : ''; }

export default async function decorate(block) {
  const rows = [...block.children];
  const eyebrow = t(rows[0]?.firstElementChild);
  const quoteRows = rows.slice(1).filter((r) => r.children.length >= 2 && t(r.children[0]));

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (eyebrow) {
    const intro = document.createElement('div');
    intro.className = 'tq-intro';
    intro.innerHTML = `<span class="eyebrow">${eyebrow}</span>`;
    wrap.append(intro);
  }
  const grid = document.createElement('div');
  grid.className = 'tq-grid';
  quoteRows.forEach((r) => {
    const quote = t(r.children[0]);
    const author = t(r.children[1]);
    const role = t(r.children[2]);
    const fig = document.createElement('figure');
    fig.className = 'quote';
    fig.innerHTML = `<p>“${quote}”</p><figcaption class="who"><b>${author}</b>${role}</figcaption>`;
    grid.append(fig);
  });
  wrap.append(grid);
  block.replaceChildren(wrap);
}
