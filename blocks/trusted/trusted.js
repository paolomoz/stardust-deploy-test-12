/**
 * Trusted block — H2 + a grid of company "logos" rendered as styled text.
 *
 * Expected authoring (single cell, elements in document order):
 *   <h2>Trusted by leading developers and enterprises</h2>
 *   <p><a href="/blog/twilio-conversation-relay">Twilio</a></p>
 *   <p><a href="/customer-stories/creative">The Walt Disney Studios</a></p>
 *   …one link-bearing <p> per company (18 total)…
 *
 * We have no logo images: each company link is shown as its styled name.
 */

const BASE = 'https://elevenlabs.io';

/** Flatten DA cells into a flat list of child elements (cell-level cascade). */
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

function absolutize(a) {
  const href = a.getAttribute('href');
  if (href && href.startsWith('/')) a.setAttribute('href', `${BASE}${href}`);
}

/**
 * @param {Element} block
 */
export default async function decorate(block) {
  const nodes = collectNodes(block);

  const heading = nodes.find((n) => n.matches('h2') || n.querySelector('h2'));
  const links = [];
  nodes.forEach((n) => {
    if (n === heading) return;
    n.querySelectorAll('a[href]').forEach((a) => links.push(a));
  });

  const wrap = document.createElement('div');
  wrap.className = 'trusted-wrap';

  if (heading) {
    const h2 = heading.matches('h2') ? heading : heading.querySelector('h2');
    h2.classList.add('trusted-title');
    wrap.append(h2);
  }

  const grid = document.createElement('ul');
  grid.className = 'trusted-grid';
  links.forEach((a) => {
    absolutize(a);
    a.classList.add('trusted-logo');
    const li = document.createElement('li');
    li.className = 'trusted-cell';
    li.append(a);
    grid.append(li);
  });
  wrap.append(grid);

  block.textContent = '';
  block.append(wrap);
}
