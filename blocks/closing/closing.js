/**
 * Closing block — reusable closing band: large left title + right CTAs.
 *
 * Expected authoring (single cell, elements in document order):
 *   <h2>AI Communication Platform</h2>
 *   <p><em><a href="/contact-sales">Talk to sales</a></em>
 *      <strong><a href="/app/agents">Create an AI agent</a></strong></p>
 *
 * CTA anchors are cloned into .actions; ak.js applies .btn classes from the
 * <strong>/<em> wrappers.
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

function absolutize(scope) {
  scope.querySelectorAll('a[href^="/"]').forEach((a) => {
    a.setAttribute('href', `${BASE}${a.getAttribute('href')}`);
  });
}

/**
 * @param {Element} block
 */
export default async function decorate(block) {
  const nodes = collectNodes(block);

  const heading = nodes.find((n) => n.matches('h1, h2, h3') || n.querySelector('h1, h2, h3'));
  const ctaP = nodes.find((n) => n !== heading && n.querySelector('a'));

  const wrap = document.createElement('div');
  wrap.className = 'closing-wrap';

  if (heading) {
    const h = heading.matches('h1, h2, h3') ? heading : heading.querySelector('h1, h2, h3');
    h.classList.add('closing-title');
    wrap.append(h);
  }

  if (ctaP) {
    const actions = document.createElement('div');
    actions.className = 'closing-actions';
    [...ctaP.querySelectorAll('a')].forEach((a) => {
      actions.append(a.closest('strong, em') || a);
    });
    wrap.append(actions);
  }

  block.textContent = '';
  block.append(wrap);
  absolutize(block);
}
