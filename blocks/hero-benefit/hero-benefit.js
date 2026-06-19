/**
 * hero-benefit — one promoted benefit: eyebrow + heading + body + CTA on the
 * left, a large display number on the right.
 *
 * Reads by ROW/CELL (not <p>): the pipeline unwraps single <p> cells (#79).
 * Rows: eyebrow (text), heading (h2), body (text), CTA (link), and a final
 * two-cell row "10 | minutes to apply" for the big number.
 */
export default async function decorate(block) {
  const rows = [...block.children];
  let heading;
  let eyebrowCell;
  let bodyCell;
  let ctaCell;
  let num = '';
  let numLabel = '';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2 && /^[$\d.]+\+?$/.test(cells[0].textContent.trim())) {
      num = cells[0].textContent.trim();
      numLabel = cells[1].textContent.trim();
      return;
    }
    const cell = cells[0];
    if (!cell) return;
    if (!heading && cell.querySelector('h1, h2, h3')) heading = cell.querySelector('h1, h2, h3');
    else if (!ctaCell && cell.querySelector('a')) ctaCell = cell;
    else if (!eyebrowCell && cell.textContent.trim()) eyebrowCell = cell;
    else if (!bodyCell && cell.textContent.trim()) bodyCell = cell;
  });

  const left = document.createElement('div');
  left.className = 'hb-copy';
  if (eyebrowCell) { const e = document.createElement('p'); e.className = 'eyebrow'; e.textContent = eyebrowCell.textContent.trim(); left.append(e); }
  if (heading) { const h = document.createElement('h2'); h.innerHTML = heading.innerHTML; left.append(h); }
  if (bodyCell) { const p = document.createElement('p'); p.className = 'hb-body'; p.textContent = bodyCell.textContent.trim(); left.append(p); }
  if (ctaCell) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    left.append(actions);
  }

  const right = document.createElement('div');
  right.className = 'hb-num';
  right.innerHTML = `${num || '10'}<small>${numLabel || 'minutes to apply'}</small>`;

  const panel = document.createElement('div');
  panel.className = 'hb-panel';
  panel.append(left, right);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.append(panel);
  block.replaceChildren(wrap);
}
