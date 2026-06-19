/**
 * stats — heading + subhead + a confident 3-cell stat row.
 *
 * Authoring: <h2> heading, sub <p>, then one row per stat (num | label),
 * e.g. "$5.2B | Company valuation". Tolerant of one-cell-per-line shapes
 * ("$5.2B — Company valuation").
 */
function collectRows(block) {
  return [...block.children].map((row) => [...row.children]);
}

export default async function decorate(block) {
  const heading = block.querySelector('h2, h1');
  const ps = [...block.querySelectorAll('p')];
  const sub = ps.find((p) => !p.querySelector('a'));

  const rows = collectRows(block);
  const stats = [];
  rows.forEach((cells) => {
    if (cells.some((c) => c.querySelector('h1, h2'))) return;
    if (cells.length >= 2) {
      const num = cells[0].textContent.trim();
      const lbl = cells[1].textContent.trim();
      if (/^[$\d]/.test(num)) stats.push({ num, lbl });
    } else if (cells.length === 1) {
      const t = cells[0].textContent.trim();
      const m = t.match(/^([$\d][\d.,%BMK+]*)\s*[—–-]\s*(.+)$/);
      if (m) stats.push({ num: m[1], lbl: m[2] });
    }
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (heading) { const h = document.createElement('h2'); h.innerHTML = heading.innerHTML; wrap.append(h); }
  if (sub && sub.textContent.trim()) { const s = document.createElement('p'); s.className = 'st-sub'; s.textContent = sub.textContent.trim(); wrap.append(s); }

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
