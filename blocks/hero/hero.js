/**
 * hero — kinetic display-type lede (page LCP + single <h1>).
 *
 * Authoring rows (each its own row; tolerant of DA flattening into one cell):
 *   1. headline  — <h1> (the accent half is derived after the first comma)
 *   2. subcopy   — plain paragraph
 *   3. CTAs      — <strong><a> primary + <em><a> secondary
 *   4. image     — <picture>/<img> hero media (optional)
 *
 * Motion (kinetic-display): the <h1> splits into words and blur/weight-reveals on
 * load. Content is fully visible by default; motion only runs when the user has no
 * reduced-motion preference.
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

function splitWords(el) {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  let i = 0;
  const walk = (node, target) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach((w) => {
          if (w.trim() === '') { target.appendChild(document.createTextNode(w)); return; }
          const s = document.createElement('span');
          s.className = 'word';
          s.setAttribute('aria-hidden', 'true');
          s.textContent = w;
          s.style.setProperty('--unit-i', i);
          i += 1;
          target.appendChild(s);
        });
      } else if (n.nodeType === 1) {
        const clone = n.cloneNode(false);
        target.appendChild(clone);
        walk(n, clone);
      }
    });
  };
  const label = el.textContent;
  const frag = document.createDocumentFragment();
  walk(el, frag);
  el.textContent = '';
  el.appendChild(frag);
  el.setAttribute('aria-label', label);
  el.classList.add('kin');
}

export default async function decorate(block) {
  const nodes = collectNodes(block);
  const heading = nodes.find((n) => n.matches && /^H[1-6]$/.test(n.tagName));
  const anchors = [];
  nodes.forEach((n) => {
    if (!n.matches) return;
    if (n.matches('a')) anchors.push(n);
    else n.querySelectorAll('a').forEach((a) => anchors.push(a));
  });
  const sub = nodes.find((n) => n.matches && n.tagName === 'P' && !n.querySelector('a'));
  const media = nodes.find((n) => n.matches && (n.matches('picture, img') || n.querySelector('picture, img')));

  const wrap = document.createElement('div');
  wrap.className = 'wrap hero-inner';

  // headline -> single <h1> with an accent second half (split on the first comma)
  const h1 = document.createElement('h1');
  const text = heading ? heading.textContent.trim() : '';
  const ci = text.indexOf(',');
  if (ci > -1 && ci < text.length - 1) {
    const l1 = document.createElement('span');
    l1.className = 'line';
    l1.textContent = `${text.slice(0, ci + 1)}`;
    const l2 = document.createElement('span');
    l2.className = 'line accent';
    l2.textContent = text.slice(ci + 1).trim();
    h1.append(l1, l2);
  } else {
    h1.textContent = text;
  }
  wrap.append(h1);

  if (sub) {
    sub.classList.add('hero-sub');
    wrap.append(sub);
  }

  if (anchors.length) {
    const ctas = document.createElement('div');
    ctas.className = 'hero-ctas';
    anchors.forEach((a) => ctas.append(a.cloneNode(true)));
    wrap.append(ctas);
  }

  if (media) {
    const mediaWrap = document.createElement('div');
    mediaWrap.className = 'hero-media';
    const pic = media.matches('picture, img') ? media : media.querySelector('picture, img');
    mediaWrap.append(pic.cloneNode(true));
    wrap.append(mediaWrap);
  }

  block.replaceChildren(wrap);

  // kinetic reveal of the headline
  splitWords(h1);
}
