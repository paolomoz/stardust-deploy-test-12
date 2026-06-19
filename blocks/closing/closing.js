/**
 * closing — centered conversion CTA with a kinetic display headline.
 *
 * Authoring rows:
 *   1. <h2>   — closing headline (char-reveals on scroll, kinetic-display)
 *   2. body   — paragraph
 *   3. CTAs   — <strong><a> primary + <em><a> secondary
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

function splitChars(el) {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  const text = el.textContent;
  el.setAttribute('aria-label', text);
  el.textContent = '';
  let i = 0;
  [...text].forEach((ch) => {
    if (ch === ' ') { el.appendChild(document.createTextNode(' ')); return; }
    const s = document.createElement('span');
    s.className = 'char';
    s.setAttribute('aria-hidden', 'true');
    s.textContent = ch;
    s.style.setProperty('--unit-i', i);
    i += 1;
    el.append(s);
  });
  el.classList.add('kin');
}

export default async function decorate(block) {
  const nodes = collectNodes(block);
  const heading = nodes.find((n) => n.matches && /^H[1-6]$/.test(n.tagName));
  const body = nodes.find((n) => n.matches && n.tagName === 'P' && !n.querySelector('a'));
  const anchors = [];
  nodes.forEach((n) => {
    if (!n.matches) return;
    if (n.matches('a')) anchors.push(n);
    else n.querySelectorAll('a').forEach((a) => anchors.push(a));
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const h2 = document.createElement('h2');
  h2.className = 'reveal-display';
  h2.textContent = heading ? heading.textContent.trim() : '';
  wrap.append(h2);

  if (body) {
    const p = document.createElement('p');
    p.className = 'soft';
    p.textContent = body.textContent.trim();
    wrap.append(p);
  }
  if (anchors.length) {
    const ctas = document.createElement('div');
    ctas.className = 'closing-ctas';
    anchors.forEach((a) => ctas.append(a.cloneNode(true)));
    wrap.append(ctas);
  }

  block.replaceChildren(wrap);

  splitChars(h2);
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && h2.classList.contains('kin') && 'IntersectionObserver' in window) {
    const reveal = () => h2.classList.add('in');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    io.observe(h2);
    setTimeout(reveal, 1800);
  }
}
