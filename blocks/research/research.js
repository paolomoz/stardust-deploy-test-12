/**
 * research — model/research index. Authoring (one cell per row):
 *   1: eyebrow   2: <h2> heading   3..N: one model name per row
 *   last row: optional impact sentence (detected: contains a period / >25 chars)
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow accent';
  eyebrow.textContent = (rows[0]?.textContent || '').trim();
  const heading = rows[1]?.querySelector('h1,h2,h3') || document.createElement('h2');
  if (!heading.textContent) heading.textContent = (rows[1]?.textContent || '').trim();
  heading.classList.add('section-h');
  wrap.append(eyebrow, heading);

  let items = rows.slice(2).map((r) => (r.textContent || '').trim()).filter(Boolean);
  let impact = null;
  const last = items[items.length - 1];
  if (last && (last.includes('.') || last.length > 28)) { impact = last; items = items.slice(0, -1); }

  const grid = document.createElement('div');
  grid.className = 'model-grid';
  items.forEach((name) => {
    const m = name.match(/v?(\d+(?:\.\d+)?)/i);
    const card = document.createElement('article');
    card.className = 'model';
    const n = document.createElement('span'); n.className = 'model-name'; n.textContent = name;
    card.append(n);
    if (m) { const v = document.createElement('span'); v.className = 'model-ver'; v.textContent = `v${m[1]}`; card.append(v); }
    grid.append(card);
  });
  wrap.append(grid);
  if (impact) { const p = document.createElement('p'); p.className = 'impact'; p.textContent = impact; wrap.append(p); }
  block.replaceChildren(wrap);
}
