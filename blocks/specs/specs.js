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
    w.setAttribute('aria-hidden', 'true');
    if (/^\d[\d/]*$/.test(tok)) {
      const flap = document.createElement('span');
      flap.className = 'flap'; flap.setAttribute('data-flip', ''); flap.setAttribute('data-target', tok);
      flap.textContent = tok;
      w.appendChild(flap);
    } else {
      w.textContent = tok;
    }
    headingEl.append(w, document.createTextNode(' '));
  });
}

function buildCaption(p, text) {
  p.className = 'caption mono rise'; p.setAttribute('data-anim', '');
  p.textContent = '';
  const tokens = text.split(' ');
  tokens.forEach((tok, i) => {
    if (/^\d[\d/]*$/.test(tok)) {
      const flap = document.createElement('span');
      flap.className = 'flap'; flap.setAttribute('data-flip', ''); flap.setAttribute('data-target', tok);
      flap.textContent = tok;
      p.appendChild(flap);
    } else {
      p.appendChild(document.createTextNode(tok));
    }
    if (i < tokens.length - 1) p.appendChild(document.createTextNode(' '));
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
  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  // First h2 is the section head
  const headNode = nodes.find((n) => /^H2$/.test(n.tagName));
  if (headNode) {
    const head = document.createElement('div');
    head.className = 'specs-head';
    const h2 = document.createElement('h2');
    h2.className = 'wipe'; h2.setAttribute('data-anim', '');
    h2.textContent = headNode.textContent.trim();
    head.appendChild(h2);
    wrap.appendChild(head);
  }

  // Segment remaining nodes: each H3 opens a spec; following non-heading text = caption
  let current = null;
  nodes.forEach((n) => {
    if (/^H2$/.test(n.tagName)) return;
    if (/^H3$/.test(n.tagName)) {
      current = document.createElement('div');
      current.className = 'spec';
      const h3 = document.createElement('h3');
      const text = n.textContent.trim();
      // accent indexes: words that are pure-numeric OR uppercase tech tokens preceding a numeric
      const words = text.split(' ');
      const accentIndexes = [];
      words.forEach((w, i) => {
        if (/^\d[\d/]*$/.test(w)) accentIndexes.push(i);
        else if (/^[A-Z0-9]{2,}$/.test(w) && words[i + 1] && /^\d[\d/]*$/.test(words[i + 1])) accentIndexes.push(i);
      });
      splitWords(h3, text, accentIndexes);
      current.appendChild(h3);
      wrap.appendChild(current);
    } else if (current) {
      const txt = n.textContent.trim();
      if (txt) {
        const p = document.createElement('p');
        buildCaption(p, txt);
        current.appendChild(p);
      }
    }
  });

  const specCount = wrap.querySelectorAll('.spec').length;
  if (specCount !== 4) {
    // eslint-disable-next-line no-console
    console.warn(`specs block expected 4 specs, rendered ${specCount}`);
  }

  if (!wrap.children.length) return;
  block.replaceChildren(wrap);
  initMotion(wrap);
}
