/**
 * benefit-grid — eyebrow + heading + a 3-up grid of benefit cards. A card may
 * lead with an icon glyph OR a stat (e.g. "1.5%"); both render at the card top.
 *
 * Authoring: head (eyebrow <p>, <h2>) then one row per card. Each card cell:
 * <h3>title</h3><p>description</p>, optionally preceded by a "stat" cell
 * (a short token like "1.5%") — otherwise a default icon is used.
 * Tolerant of the DA-flattened single-cell shape (segment on the <h3> boundary).
 */
const ICONS = ['⚡', '✓', '🌐', '⏱', '∞', '◎'];

function collectCells(block) {
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
  return out;
}

export default async function decorate(block) {
  const nodes = collectCells(block);
  const heading = nodes.find((n) => /^H[12]$/.test(n.tagName));
  const cards = [];
  const head = [];
  let pendingStat = '';

  for (let i = 0; i < nodes.length; i += 1) {
    const n = nodes[i];
    const txt = n.textContent.trim();
    if (n === heading) {
      // skip the section heading; handled separately
    } else if (n.tagName === 'H3') {
      const desc = nodes[i + 1] && nodes[i + 1].tagName === 'P' && !/^[$\d]/.test(nodes[i + 1].textContent.trim())
        ? nodes[i + 1] : null;
      cards.push({ stat: pendingStat, title: txt, desc: desc ? desc.textContent.trim() : '' });
      pendingStat = '';
      if (desc) i += 1;
    } else if (/^[$\d][\d.%]*\+?$/.test(txt) && txt.length <= 6) {
      pendingStat = txt; // a stat token that leads the next card
    } else {
      head.push(n);
    }
  }

  const eyebrow = head.find((n) => n.tagName === 'P');

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (eyebrow) { const e = document.createElement('p'); e.className = 'eyebrow'; e.textContent = eyebrow.textContent.trim(); wrap.append(e); }
  if (heading) { const h = document.createElement('h2'); h.innerHTML = heading.innerHTML; wrap.append(h); }

  const grid = document.createElement('div');
  grid.className = 'bg-grid';
  cards.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'bg-card';
    const lead = c.stat
      ? `<div class="bg-stat">${c.stat}</div>`
      : `<div class="bg-ic">${ICONS[i % ICONS.length]}</div>`;
    card.innerHTML = `${lead}<h3>${c.title}</h3><p>${c.desc}</p>`;
    grid.append(card);
  });
  wrap.append(grid);
  block.replaceChildren(wrap);
}
