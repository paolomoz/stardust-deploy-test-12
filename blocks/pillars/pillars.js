/**
 * pillars — capability grid (variant A): 2 lead cards + 4 rail cards.
 *
 * Authoring shape (robust to DA flattening):
 *   - First row/cell: eyebrow text (no heading).
 *   - Each subsequent card authored as a cell containing <h3>Title</h3><p>body</p>.
 *     Cards may arrive as one-row-per-card OR flattened into a single cell with
 *     repeated <h3>+<p> — both are segmented on the <h3> boundary.
 *
 * Index numerals (01..0N) are generated here (idempotent), per variant-A improvement
 * "sharper section markers". The first two cards render as lead cards.
 */
function collectNodes(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) out.push(...kids);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      out.push(p);
    }
  });
  return out.length ? out : [...block.children];
}

export default async function decorate(block) {
  const nodes = collectNodes(block);

  // eyebrow = leading text before the first heading
  let eyebrowText = '';
  const firstHeadingIdx = nodes.findIndex((n) => /^H[1-6]$/.test(n.tagName));
  if (firstHeadingIdx > 0) eyebrowText = nodes[firstHeadingIdx - 1].textContent.trim();
  else if (firstHeadingIdx === -1 && nodes[0]) eyebrowText = nodes[0].textContent.trim();

  // segment cards on heading boundary
  const cards = [];
  let cur = null;
  nodes.forEach((n, i) => {
    if (firstHeadingIdx > 0 && i < firstHeadingIdx) return; // skip eyebrow region
    if (/^H[1-6]$/.test(n.tagName)) {
      cur = { title: n.textContent.trim(), body: '' };
      cards.push(cur);
    } else if (cur && n.textContent.trim()) {
      cur.body = cur.body ? `${cur.body} ${n.textContent.trim()}` : n.textContent.trim();
    }
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap pillars-inner';

  if (eyebrowText) {
    const eb = document.createElement('p');
    eb.className = 'eyebrow';
    eb.textContent = eyebrowText;
    wrap.append(eb);
  }

  const leadGrid = document.createElement('div');
  leadGrid.className = 'lead-grid';
  const rail = document.createElement('div');
  rail.className = 'rail';

  cards.forEach((c, i) => {
    const lead = i < 2;
    const card = document.createElement('article');
    card.className = lead ? 'card card-lead' : 'card';
    const idx = document.createElement('span');
    idx.className = 'idx';
    idx.textContent = String(i + 1).padStart(2, '0');
    const h3 = document.createElement('h3');
    h3.textContent = c.title;
    const p = document.createElement('p');
    p.textContent = c.body;
    card.append(idx, h3, p);
    (lead ? leadGrid : rail).append(card);
  });

  if (leadGrid.children.length) wrap.append(leadGrid);
  if (rail.children.length) wrap.append(rail);
  block.replaceChildren(wrap);
}
