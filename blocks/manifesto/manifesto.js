/**
 * manifesto — full-bleed image brand-narrative band on a dark mulberry ground.
 *
 * Authoring rows:
 *   1. image   — <picture>/<img> background (optional; falls back to mulberry)
 *   2. <h2>    — the manifesto headline (wipes in on scroll)
 *   3. body    — paragraph
 *   4. CTA     — <em><strong><a> -> accent button
 *
 * The owning section gets class "dark" so the global on-dark button rules apply.
 */

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

export default async function decorate(block) {
  const nodes = collectNodes(block);
  const media = nodes.find((n) => n.matches && (n.matches('picture, img') || n.querySelector('picture, img')));
  const heading = nodes.find((n) => n.matches && /^H[1-6]$/.test(n.tagName));
  const body = nodes.find((n) => n.matches && n.tagName === 'P' && !n.querySelector('a'));
  const anchors = [];
  nodes.forEach((n) => {
    if (!n.matches) return;
    if (n.matches('a')) anchors.push(n);
    else n.querySelectorAll('a').forEach((a) => anchors.push(a));
  });

  const section = block.closest('.section') || block;
  section.classList.add('dark');

  if (media) {
    const pic = media.matches('picture, img') ? media : media.querySelector('picture, img');
    pic.removeAttribute('class');
    block.append(pic);
  }
  const veil = document.createElement('div');
  veil.className = 'manifesto-veil';
  veil.setAttribute('aria-hidden', 'true');
  block.append(veil);

  const wrap = document.createElement('div');
  wrap.className = 'wrap manifesto-inner';

  const h2 = document.createElement('h2');
  h2.textContent = heading ? heading.textContent.trim() : '';
  wrap.append(h2);

  if (body) {
    const p = document.createElement('p');
    p.textContent = body.textContent.trim();
    wrap.append(p);
  }
  if (anchors.length) {
    const holder = document.createElement('p');
    anchors.forEach((a) => holder.append(a.cloneNode(true)));
    wrap.append(holder);
  }

  // keep the image + veil, drop the original rows, add the content wrap
  [...block.querySelectorAll(':scope > div')].forEach((d) => {
    if (!d.classList.contains('manifesto-veil')) d.remove();
  });
  block.append(wrap);

  // wipe-in heading. The clipped state is JS-added (no-JS keeps the heading
  // visible), with a timer fallback so it always reveals even if IO misses.
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    h2.classList.add('wipe');
    const reveal = () => h2.classList.add('in');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    io.observe(h2);
    setTimeout(reveal, 1600);
  }
}
