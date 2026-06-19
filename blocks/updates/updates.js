/*
 * updates block
 * Authoring (single cell, document order):
 *   <h2>Latest updates</h2>
 *   <p><em><a href="/blog">All posts</a></em></p>   (text link / pill, top-right)
 *   <h3><a href="/blog/introducing-flows-in-elevencreative">Introducing Flows ...</a></h3>
 *   <p>Product · Mar 11, 2026</p>
 *   <h3><a href="/blog/introducing-elevenlabs-for-government">... for Government</a></h3>
 *   <p>Company · Feb 11, 2026</p>
 *   <h3><a href="/blog/introducing-expressive-mode">Introducing Expressive Mode ...</a></h3>
 *   <p>Product · Feb 10, 2026</p>
 * Each <h3> + following meta <p> (tag · date) becomes one blog card. The card's
 * gradient image area is supplied by CSS (no real images ship); a short overlay
 * label is derived from the heading. Gradient class assigned by index.
 */

const ORIGIN = 'https://elevenlabs.io';

// Short overlay labels (the source overlays a teaser, not the full title).
const OVERLAYS = ['Introducing Flows', 'ElevenLabs for Government', 'Expressive mode'];

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
  head.className = 'updates-head';

  const heading = nodes.find((n) => n.matches('h2') || n.querySelector('h2'));
  if (heading) head.append(heading);

  // "All posts" pill: first link before any card heading.
  const firstCardIdx = nodes.findIndex(isHeading);
  const linkNode = nodes
    .slice(0, firstCardIdx === -1 ? nodes.length : firstCardIdx)
    .find((n) => (n.matches('a[href]') || n.querySelector('a[href]')) && n !== heading);
  if (linkNode) {
    const a = linkNode.matches('a[href]') ? linkNode : linkNode.querySelector('a[href]');
    a.classList.add('updates-pill');
    head.append(a);
  }
  wrap.append(head);

  const grid = document.createElement('div');
  grid.className = 'updates-grid';

  const titles = nodes.filter(isHeading);
  titles.forEach((h3, i) => {
    const link = h3.querySelector('a[href]') || (h3.matches('a[href]') ? h3 : null);
    const href = link ? link.getAttribute('href') : null;
    const title = h3.textContent.trim();

    const card = document.createElement('article');
    card.className = `updates-card updates-card-${i % 3}`;

    // gradient image area with overlay teaser
    const media = document.createElement(href ? 'a' : 'div');
    media.className = 'updates-media';
    if (href) media.href = href;
    media.setAttribute('aria-hidden', href ? 'false' : 'true');
    const overlay = document.createElement('span');
    overlay.className = 'updates-overlay';
    overlay.textContent = OVERLAYS[i] || title;
    media.append(overlay);
    card.append(media);

    // caption: full title (as a link) below the image
    const cap = document.createElement('p');
    cap.className = 'updates-cap';
    if (href) {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = title;
      cap.append(a);
    } else {
      cap.textContent = title;
    }
    card.append(cap);

    // meta: tag · date (the following paragraph)
    let meta = h3.nextElementSibling;
    if (!meta || isHeading(meta) || meta.matches('h2')) {
      const idx = nodes.indexOf(h3);
      meta = nodes[idx + 1];
    }
    if (meta && meta.matches('p') && meta.textContent.includes('·')) {
      const [tag, date] = meta.textContent.split('·').map((s) => s.trim());
      const metaEl = document.createElement('p');
      metaEl.className = 'updates-meta';
      const tagEl = document.createElement('span');
      tagEl.className = 'updates-tag';
      tagEl.textContent = tag;
      metaEl.append(tagEl);
      if (date) {
        const dateEl = document.createElement('span');
        dateEl.className = 'updates-date';
        dateEl.textContent = date;
        metaEl.append(dateEl);
      }
      card.append(metaEl);
    }

    grid.append(card);
  });

  wrap.append(grid);

  if (grid.children.length < titles.length) {
    grid.dataset.cardCount = grid.children.length;
  }

  absolutize(wrap);
  block.replaceChildren(wrap);
}
