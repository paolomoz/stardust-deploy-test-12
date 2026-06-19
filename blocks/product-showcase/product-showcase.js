/**
 * product-showcase — eyebrow + heading + subhead, a tab rail derived from the
 * card titles, and a 4-up product card grid.
 *
 * Authoring: a head (eyebrow <p>, <h2>, sub <p>) followed by one row per card,
 * each card cell holding <h3>title</h3><p>description</p>. Tolerant of the
 * DA-flattened single-cell shape (segment cards on their <h3> boundary).
 */
const ICONS = ['◎', '▭', '⇄', '∑'];

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
  const heading = nodes.find((n) => n.matches('h1, h2, h3') && n.tagName !== 'H3') || nodes.find((n) => /^H[12]$/.test(n.tagName));
  const cards = [];
  const head = [];
  // segment: anything from an <h3> onward (in pairs h3 + following p) is a card
  for (let i = 0; i < nodes.length; i += 1) {
    const n = nodes[i];
    if (n.tagName === 'H3') {
      const desc = nodes[i + 1] && nodes[i + 1].tagName === 'P' ? nodes[i + 1] : null;
      cards.push({ title: n.textContent.trim(), desc: desc ? desc.textContent.trim() : '' });
      if (desc) i += 1;
    } else if (n !== heading) {
      head.push(n);
    }
  }

  const eyebrow = head.find((n) => n.tagName === 'P');
  const sub = head.filter((n) => n.tagName === 'P')[1];

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  if (eyebrow) { const e = document.createElement('p'); e.className = 'eyebrow'; e.textContent = eyebrow.textContent.trim(); wrap.append(e); }
  if (heading) { const h = document.createElement('h2'); h.innerHTML = heading.innerHTML; wrap.append(h); }
  if (sub) { const s = document.createElement('p'); s.className = 'ps-sub'; s.textContent = sub.textContent.trim(); wrap.append(s); }

  if (cards.length) {
    const tabs = document.createElement('div');
    tabs.className = 'ps-tabs';
    cards.forEach((c, i) => {
      const t = document.createElement('span');
      t.className = `ps-tab${i === 0 ? ' active' : ''}`;
      t.textContent = c.title;
      tabs.append(t);
    });
    wrap.append(tabs);

    const grid = document.createElement('div');
    grid.className = 'ps-grid';
    cards.forEach((c, i) => {
      const card = document.createElement('div');
      card.className = 'ps-card';
      card.innerHTML = `<div class="ps-ic">${ICONS[i % ICONS.length]}</div><h3>${c.title}</h3><p>${c.desc}</p>`;
      grid.append(card);
    });
    wrap.append(grid);

    // tabs highlight the matching card on hover/click (block JS runs)
    const tabEls = [...tabs.children];
    const cardEls = [...grid.children];
    tabEls.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabEls.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        cardEls.forEach((cd) => cd.classList.remove('ps-card-focus'));
        cardEls[i].classList.add('ps-card-focus');
      });
    });
  }

  block.replaceChildren(wrap);
}
