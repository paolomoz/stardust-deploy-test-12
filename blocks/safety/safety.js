/*
 * safety block
 * Authoring (single cell, document order):
 *   <h2>Safety, built in</h2>
 *   <p><em><a href="/safety">Learn more</a></em></p>   (text link / pill, top-right)
 *   <h3>Moderation</h3>
 *   <p>We actively monitor content generated with our technology.</p>
 *   <h3>Accountability</h3>
 *   <p>We believe misuse must have consequences.</p>
 *   <h3>Provenance</h3>
 *   <p>We believe that you should know if audio is AI-generated.</p>
 * Each <h3> + following <p> becomes one card. A line-art SVG (inlined below) is
 * matched to the card by index: 0 hourglass, 1 cube, 2 spiral arcs.
 */

const ORIGIN = 'https://elevenlabs.io';

const SVGS = [
  // 0 — Moderation: double-cone / hourglass wireframe with dotted axes
  `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="100" y1="40" x2="100" y2="160" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
    <line x1="40" y1="120" x2="160" y2="120" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
    <line x1="58" y1="150" x2="142" y2="70" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
    <ellipse cx="74" cy="100" rx="20" ry="34" stroke="currentColor" stroke-width="1"/>
    <ellipse cx="132" cy="120" rx="28" ry="42" stroke="currentColor" stroke-width="1"/>
    <path d="M74 66 L132 78" stroke="currentColor" stroke-width="1"/>
    <path d="M74 134 L132 162" stroke="currentColor" stroke-width="1"/>
    <path d="M94 100 L104 120" stroke="currentColor" stroke-width="1"/>
  </svg>`,
  // 1 — Accountability: wireframe cube with dotted diagonals
  `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="58" y="64" width="84" height="84" stroke="currentColor" stroke-width="1"/>
    <rect x="86" y="44" width="84" height="84" stroke="currentColor" stroke-width="1"/>
    <line x1="58" y1="64" x2="86" y2="44" stroke="currentColor" stroke-width="1"/>
    <line x1="142" y1="64" x2="170" y2="44" stroke="currentColor" stroke-width="1"/>
    <line x1="58" y1="148" x2="86" y2="128" stroke="currentColor" stroke-width="1"/>
    <line x1="142" y1="148" x2="170" y2="128" stroke="currentColor" stroke-width="1"/>
    <line x1="58" y1="64" x2="142" y2="148" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
    <line x1="142" y1="64" x2="58" y2="148" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
    <line x1="86" y1="44" x2="170" y2="128" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
    <line x1="100" y1="106" x2="128" y2="86" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
  </svg>`,
  // 2 — Provenance: nested offset circles (spiral arcs) with dotted outer ring
  `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="118" cy="100" r="60" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
    <circle cx="112" cy="100" r="52" stroke="currentColor" stroke-width="1"/>
    <circle cx="106" cy="100" r="44" stroke="currentColor" stroke-width="1"/>
    <circle cx="100" cy="100" r="36" stroke="currentColor" stroke-width="1"/>
    <circle cx="94" cy="100" r="28" stroke="currentColor" stroke-width="1"/>
    <circle cx="88" cy="100" r="20" stroke="currentColor" stroke-width="1"/>
    <circle cx="82" cy="100" r="12" stroke="currentColor" stroke-width="1"/>
  </svg>`,
];

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

function absolutize(scope) {
  scope.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('/')) a.href = ORIGIN + href;
  });
}

function isHeading(n) {
  return n.matches('h3') || n.querySelector('h3');
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const nodes = collectNodes(block);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const head = document.createElement('div');
  head.className = 'safety-head';

  const heading = nodes.find((n) => n.matches('h2') || n.querySelector('h2'));
  if (heading) head.append(heading);

  // "Learn more" pill: the first link that appears before any card heading.
  const firstCardIdx = nodes.findIndex(isHeading);
  const linkNode = nodes
    .slice(0, firstCardIdx === -1 ? nodes.length : firstCardIdx)
    .find((n) => (n.matches('a[href]') || n.querySelector('a[href]')) && n !== heading);
  if (linkNode) {
    const a = linkNode.matches('a[href]') ? linkNode : linkNode.querySelector('a[href]');
    a.classList.add('safety-pill');
    head.append(a);
  }
  wrap.append(head);

  // Build cards: each h3 + following description paragraph.
  const grid = document.createElement('div');
  grid.className = 'safety-grid';

  const titles = nodes.filter(isHeading);
  titles.forEach((h3, i) => {
    const card = document.createElement('article');
    card.className = 'safety-card';

    const figure = document.createElement('div');
    figure.className = 'safety-figure';
    figure.innerHTML = SVGS[i % SVGS.length];

    const body = document.createElement('div');
    body.className = 'safety-body';
    body.append(h3);

    // Description: nextElementSibling, else by collected index.
    let desc = h3.nextElementSibling;
    if (!desc || isHeading(desc) || desc.matches('h2')) {
      const idx = nodes.indexOf(h3);
      desc = nodes[idx + 1];
    }
    if (desc && desc.matches('p') && !desc.querySelector('a')) body.append(desc);

    card.append(figure, body);
    grid.append(card);
  });

  wrap.append(grid);

  if (grid.children.length < titles.length) {
    grid.dataset.cardCount = grid.children.length;
  }

  absolutize(wrap);
  block.replaceChildren(wrap);
}
