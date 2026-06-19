/**
 * trusted-by — social-proof logo wall (text logos).
 *
 * Authoring rows (tolerant of DA flattening):
 *   1. label   — the lead-in line
 *   2..N. one company name per row (or one cell holding a list)
 */

function collectTextRows(block) {
  const rows = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const li = [...cell.querySelectorAll('li')];
    if (li.length) { li.forEach((l) => rows.push(l.textContent.trim())); return; }
    const t = cell.textContent.trim();
    if (t) rows.push(t);
  });
  return rows;
}

export default async function decorate(block) {
  const rows = collectTextRows(block);
  const label = rows.shift() || '';

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const p = document.createElement('p');
  p.className = 'trusted-label';
  p.textContent = label;

  const ul = document.createElement('ul');
  ul.className = 'logo-wall';
  rows.forEach((name) => {
    const li = document.createElement('li');
    li.textContent = name;
    ul.append(li);
  });

  wrap.append(p, ul);
  block.replaceChildren(wrap);
}
