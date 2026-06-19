function collectNodes(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) out.push(...kids);
    else if (cell.textContent.trim()) { const p = document.createElement('p'); p.textContent = cell.textContent.trim(); out.push(p); }
  });
  return out.length ? out : [...block.children];
}

function splitWords(headingEl, fullText, accentIndexes = []) {
  headingEl.setAttribute('aria-label', fullText);
  headingEl.classList.add('split'); headingEl.setAttribute('data-split', '');
  headingEl.textContent = '';
  fullText.split(' ').forEach((tok, i) => {
    const w = document.createElement('span');
    w.className = `word${accentIndexes.includes(i) ? ' accent' : ''}`;
    w.setAttribute('aria-hidden', 'true'); w.textContent = tok;
    headingEl.append(w, document.createTextNode(' '));
  });
}

function initMotion(root) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GL = '0123456789/';
  if (!reduced) {
    root.querySelectorAll('[data-split]').forEach((el) => {
      let c = 0;
      el.querySelectorAll('.word').forEach((word) => {
        if (word.querySelector('[data-flip]')) { c += 4; return; }
        const t = word.textContent; word.textContent = '';
        [...t].forEach((ch) => {
          const s = document.createElement('span');
          s.className = 'ltr'; s.setAttribute('aria-hidden', 'true');
          s.textContent = ch; s.style.setProperty('--d', c); c += 1;
          word.appendChild(s);
        });
      });
    });
    root.querySelectorAll('[data-flip]').forEach((el) => {
      const target = el.getAttribute('data-target'); el.textContent = '';
      [...target].forEach((ch) => { const d = document.createElement('span'); d.className = 'fd'; d.textContent = ch; d.dataset.final = ch; el.appendChild(d); });
    });
  }
  const runFlap = (el) => {
    if (el.dataset.done) return; el.dataset.done = '1';
    el.querySelectorAll('.fd').forEach((d, idx) => {
      const fin = d.dataset.final; if (!/[0-9/]/.test(fin)) { d.textContent = fin; return; }
      const ticks = 8 + idx * 3; let n = 0;
      const iv = setInterval(() => {
        n += 1;
        if (n >= ticks) {
          clearInterval(iv);
          d.textContent = fin;
        } else {
          d.textContent = GL[Math.floor(Math.random() * GL.length)];
        }
      }, 45);
    });
  };
  const reveal = (el) => {
    if (el.classList.contains('in')) return;
    el.classList.add('in');
    if (el.hasAttribute('data-split')) el.querySelectorAll('[data-flip]').forEach(runFlap);
    if (el.classList.contains('flap')) runFlap(el);
  };
  const animated = [...root.querySelectorAll('.split, .wipe, .rise, .flap')];
  if (reduced || !('IntersectionObserver' in window)) { animated.forEach(reveal); return; }
  const io = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } }); }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
  animated.forEach((el) => io.observe(el));
  const sweep = () => animated.forEach((el) => { if (el.classList.contains('in')) return; const r = el.getBoundingClientRect(); if (r.top < window.innerHeight && r.bottom > 0) reveal(el); });
  window.addEventListener('load', sweep); setTimeout(sweep, 100);
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const nodes = collectNodes(block);

  const headingNode = nodes.find((n) => /^H[1-6]$/.test(n.tagName));
  const ctaNode = nodes.find((n) => n.querySelector && n.querySelector('a'));
  const textNodes = nodes.filter((n) => n !== headingNode && n !== ctaNode && n.textContent.trim());
  // shortest = kicker, longest = lede
  const len = (n) => n.textContent.trim().length;
  const sorted = [...textNodes].sort((a, b) => len(a) - len(b));
  const kickerNode = sorted[0];
  const ledeNode = sorted.length > 1 ? sorted[sorted.length - 1] : null;

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  if (kickerNode) {
    const kicker = document.createElement('p');
    kicker.className = 'kicker wipe'; kicker.setAttribute('data-anim', '');
    kicker.style.marginBottom = '1.4rem';
    kicker.textContent = kickerNode.textContent.trim();
    wrap.appendChild(kicker);
  }

  if (headingNode) {
    const h2 = document.createElement('h2');
    splitWords(h2, headingNode.textContent.trim(), [3]);
    wrap.appendChild(h2);
  }

  if (ledeNode) {
    const lede = document.createElement('p');
    lede.className = 'lede rise'; lede.style.setProperty('--s', '1');
    lede.textContent = ledeNode.textContent.trim();
    wrap.appendChild(lede);
  }

  if (ctaNode) {
    const actions = document.createElement('div');
    actions.className = 'actions rise'; actions.style.setProperty('--s', '2');
    [...ctaNode.childNodes].forEach((child) => actions.appendChild(child.cloneNode(true)));
    wrap.appendChild(actions);
  }

  if (!wrap.children.length) return;
  block.replaceChildren(wrap);
  initMotion(wrap);
}
