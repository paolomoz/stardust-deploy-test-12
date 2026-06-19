/**
 * stats — navy proof band (improvement 4: surface the social proof).
 * Authoring: one row per stat, two cells: | 100M+ | Monthly learners |
 * Tolerates a flattened single-row/many-cell shape by pairing sequentially.
 */
export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const pairs = [];

  const rowCells = rows.map((r) => [...r.children]);
  if (rowCells.every((c) => c.length >= 2)) {
    rowCells.forEach((c) => pairs.push([c[0].textContent.trim(), c[1].textContent.trim()]));
  } else {
    const flat = [];
    block.querySelectorAll(':scope > div > div').forEach((c) => {
      const t = c.textContent.trim();
      if (t) flat.push(t);
    });
    for (let i = 0; i < flat.length; i += 2) pairs.push([flat[i], flat[i + 1] || '']);
  }

  const wrap = document.createElement('div');
  wrap.className = 'wrap stats-row';
  pairs.forEach(([n, l]) => {
    const stat = document.createElement('div');
    stat.className = 'stat';
    const num = document.createElement('div');
    num.className = 'n';
    num.textContent = n;
    const lab = document.createElement('div');
    lab.className = 'l';
    lab.textContent = l;
    stat.append(num, lab);
    wrap.append(stat);
  });
  block.replaceChildren(wrap);
}
