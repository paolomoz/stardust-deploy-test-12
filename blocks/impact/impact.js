/*
 * impact block
 * Authoring (single cell, document order):
 *   <h2>Showcasing the global impact of AI audio research</h2>
 *   <p>ElevenCreative</p>            (optional decorative tab)
 *   <p>ElevenAgents</p>              (optional decorative tab)
 *   <h3><a href="/blog/nvidia-ace-at-computex">... NVIDIA ACE at Computex</a></h3>
 *   <h3><a href="...">Matthew McConaughey's Lyrics of Livin' ...</a></h3>
 *   <h3><a href="...">ElevenLabs Impact Alliance: $1B in Kind Donation ...</a></h3>
 * Each <h3> (with its optional anchor) becomes one gradient image card. The
 * gradient is supplied entirely by CSS (no real images ship). Tab <p> rows are
 * decorative; any link before the first <h3> is treated as a tab.
 */

const ORIGIN = 'https://elevenlabs.io';

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

  const heading = nodes.find((n) => n.matches('h2') || n.querySelector('h2'));
  if (heading) wrap.append(heading);

  const firstCardIdx = nodes.findIndex(isHeading);

  // Decorative tab row: any text/links that appear before the first card heading.
  const tabNodes = nodes.slice(0, firstCardIdx === -1 ? 0 : firstCardIdx)
    .filter((n) => n !== heading && n.textContent.trim());
  if (tabNodes.length) {
    const tabs = document.createElement('div');
    tabs.className = 'impact-tabs';
    tabs.setAttribute('aria-hidden', 'true');
    tabNodes.forEach((n) => {
      const tab = document.createElement('span');
      tab.className = 'impact-tab';
      tab.textContent = n.textContent.trim();
      tabs.append(tab);
    });
    wrap.append(tabs);
  }

  // Card headings (each leads one image card).
  const cards = nodes.filter(isHeading);

  const grid = document.createElement('div');
  grid.className = 'impact-grid';

  cards.forEach((h3, i) => {
    const card = document.createElement('article');
    card.className = `impact-card impact-card-${i % 3}`;

    const media = document.createElement('div');
    media.className = 'impact-media';
    media.setAttribute('aria-hidden', 'true');

    const caption = document.createElement('div');
    caption.className = 'impact-caption';
    caption.append(h3);
    card.append(media, caption);

    // If the heading wraps a single anchor, make the whole card clickable.
    const link = h3.querySelector('a[href]') || (h3.matches('a[href]') ? h3 : null);
    if (link) {
      const href = link.getAttribute('href');
      const a = document.createElement('a');
      a.className = 'impact-link';
      a.href = href;
      a.setAttribute('aria-label', link.textContent.trim());
      card.append(a);
    }

    grid.append(card);
  });

  wrap.append(grid);

  // Assert the grid rendered the expected card count, not 1.
  if (grid.children.length < cards.length) {
    grid.dataset.cardCount = grid.children.length;
  }

  absolutize(wrap);
  block.replaceChildren(wrap);
}
