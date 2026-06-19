/*
 * platforms block
 * Authoring (single cell, document order):
 *   <h2>Two platforms built on the same research foundation</h2>
 *   <h3>ElevenCreative</h3>
 *   <p>Generate ultra-realistic speech, videos, music, and sound effects.</p>
 *   <h3>ElevenAgents</h3>
 *   <p>Configure, deploy and monitor conversational agents.</p>
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

  // Pair each h3 with the following description paragraph.
  const intro = document.createElement('div');
  intro.className = 'platforms-intro';
  const titles = nodes.filter((n) => n.matches('h3') || n.querySelector('h3'));
  titles.forEach((h3) => {
    const col = document.createElement('div');
    col.className = 'platforms-col';
    col.append(h3);
    let next = h3.nextElementSibling;
    if (next && (next.matches('p') || (!next.matches('h3') && !next.matches('h2')))) {
      col.append(next);
    } else {
      // flattened siblings: locate by document index in collected nodes
      const idx = nodes.indexOf(h3);
      next = nodes[idx + 1];
      if (next && next.matches('p')) col.append(next);
    }
    intro.append(col);
  });
  wrap.append(intro);

  // Product-visual placeholder panel: two faux app panes.
  const panel = document.createElement('div');
  panel.className = 'platforms-panel';
  panel.setAttribute('aria-hidden', 'true');

  ['platforms-pane platforms-pane-creative', 'platforms-pane platforms-pane-agents'].forEach((cls) => {
    const pane = document.createElement('div');
    pane.className = cls;
    const side = document.createElement('div');
    side.className = 'platforms-sidebar';
    for (let i = 0; i < 6; i += 1) {
      const bar = document.createElement('span');
      side.append(bar);
    }
    const body = document.createElement('div');
    body.className = 'platforms-body';
    for (let i = 0; i < 5; i += 1) {
      const row = document.createElement('span');
      body.append(row);
    }
    pane.append(side, body);
    panel.append(pane);
  });

  const eyebrow = document.createElement('p');
  eyebrow.className = 'platforms-eyebrow';
  eyebrow.textContent = 'ElevenCreative';
  panel.append(eyebrow);

  wrap.append(panel);

  absolutize(wrap);
  block.replaceChildren(wrap);
}
