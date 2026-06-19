/**
 * stats — heading + subhead + a confident 3-cell stat row.
 *
 * Reads by ROW/CELL (not <p>, #79): heading row (h2), a single text row = sub,
 * two-cell rows "num | label" = stats (also tolerant of "num — label").
 */
export default async function decorate(block) {
  const rows = [...block.children];
  let heading;
  let subCell;
  const stats = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.some((c) => c.querySelector('h1, h2, h3'))) {
      heading = row.querySelector('h1, h2, h3');
      return;
    }
    if (cells.length >= 2 && /^[$\d]/.test(cells[0].textContent.trim())) {
      stats.push({ num: cells[0].textContent.trim(), lbl: cells[1].textContent.trim() });
      return;
    }
    const [c0] = cells;
    const t = c0 ? c0.textContent.trim() : '';
    const m = t.match(/^([$\d][\d.,%BMK+]*)\s*[—–-]\s*(.+)$/);
    if (m) { stats.push({ num: m[1], lbl: m[2] }); return; }
    if (t && !subCell) subCell = c0;
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (heading) { const h = document.createElement('h2'); h.innerHTML = heading.innerHTML; wrap.append(h); }
  if (subCell) { const s = document.createElement('p'); s.className = 'st-sub'; s.textContent = subCell.textContent.trim(); wrap.append(s); }

  if (stats.length) {
    const row = document.createElement('div');
    row.className = 'st-row';
    stats.forEach((st) => {
      const cell = document.createElement('div');
      cell.className = 'st-cell';
      cell.innerHTML = `<div class="st-num">${st.num}</div><div class="st-lbl">${st.lbl}</div>`;
      row.append(cell);
    });
    wrap.append(row);
  }
  block.replaceChildren(wrap);
}
