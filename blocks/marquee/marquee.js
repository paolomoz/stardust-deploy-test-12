function collectNodes(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) out.push(...kids);
    else if (cell.textContent.trim()) { const p = document.createElement('p'); p.textContent = cell.textContent.trim(); out.push(p); }
  });
  return out.length ? out : [...block.children];
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const nodes = collectNodes(block);
  const phrase = nodes.map((n) => n.textContent).join(' ').trim();
  const parts = phrase.split('·').map((p) => p.trim().toUpperCase()).filter(Boolean);
  if (!parts.length) return;

  const buildSpan = () => {
    const span = document.createElement('span');
    // repeat the phrase set twice to fill the track width
    for (let r = 0; r < 2; r += 1) {
      parts.forEach((part) => {
        span.appendChild(document.createTextNode(part));
        const dot = document.createElement('span');
        dot.className = 'dot'; dot.textContent = '—';
        span.appendChild(dot);
      });
    }
    return span;
  };

  const track = document.createElement('div');
  track.className = 'marquee-track';
  track.append(buildSpan(), buildSpan());

  block.closest('.section')?.classList.add('marquee-section');

  block.replaceChildren(track);
}
