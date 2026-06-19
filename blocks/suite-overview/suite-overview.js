/**
 * suite-overview — the 4-up product overview tile row.
 *
 * Authoring rows:
 *   1. <h2> section heading
 *   2. section lede paragraph
 *   3..N. one row per tile, cells: <h3>name</h3> | description | <a>link</a>
 *
 * Tile accent colors are assigned positionally (teal / purple / mulberry / gold),
 * reconstructing the prototype's per-product accent (the marker does not survive DA).
 * The <h2> wipes in left-to-right on scroll (kinetic-display); no-JS = visible.
 */

const TILE_ACCENTS = ['var(--color-teal)', 'var(--color-accent)', 'var(--color-mulberry)', '#a98b3e'];

function rows(block) { return [...block.querySelectorAll(':scope > div')]; }

export default async function decorate(block) {
  const all = rows(block);
  const head = [];
  const tiles = [];
  all.forEach((row) => {
    if (row.querySelector('h3')) tiles.push(row);
    else head.push(row);
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const headWrap = document.createElement('div');
  headWrap.className = 'suite-head';
  head.forEach((row) => {
    const cell = row.querySelector(':scope > div');
    if (!cell) return;
    const h = cell.querySelector('h1, h2, h3');
    if (h) {
      const h2 = document.createElement('h2');
      h2.textContent = h.textContent.trim();
      headWrap.append(h2);
    } else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.className = 'soft';
      p.textContent = cell.textContent.trim();
      headWrap.append(p);
    }
  });

  const grid = document.createElement('div');
  grid.className = 'suite-grid';
  tiles.forEach((row, i) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    const nameEl = row.querySelector('h3') || cells[0];
    const link = row.querySelector('a');
    const desc = cells.find((c) => !c.querySelector('h3, a') && c.textContent.trim());

    const tile = document.createElement('article');
    tile.className = 'suite-tile';
    tile.style.setProperty('--tile-accent', TILE_ACCENTS[i % TILE_ACCENTS.length]);

    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.setAttribute('aria-hidden', 'true');

    const h3 = document.createElement('h3');
    h3.textContent = nameEl ? nameEl.textContent.trim() : '';

    tile.append(dot, h3);

    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      tile.append(p);
    }
    if (link) {
      const a = link.cloneNode(true);
      a.className = 'more';
      if (!/→/.test(a.textContent)) {
        const arr = document.createElement('span');
        arr.setAttribute('aria-hidden', 'true');
        arr.textContent = '→';
        a.append(' ', arr);
      }
      tile.append(a);
    }
    grid.append(tile);
  });

  wrap.append(headWrap, grid);
  block.replaceChildren(wrap);

  // wipe-in heading on scroll. The clipped state is added by JS only (so no-JS
  // renders the heading visible), with a timer fallback so it always reveals.
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const h2 = headWrap.querySelector('h2');
  if (h2 && !reduce && 'IntersectionObserver' in window) {
    h2.classList.add('wipe');
    const reveal = () => h2.classList.add('in');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    io.observe(h2);
    setTimeout(reveal, 1600);
  }
}
