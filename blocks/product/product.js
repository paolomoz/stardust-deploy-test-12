function collectNodes(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) out.push(...kids);
    else if (cell.textContent.trim()) { const p = document.createElement('p'); p.textContent = cell.textContent.trim(); out.push(p); }
  });
  return out.length ? out : [...block.children];
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
        if (n >= ticks) { clearInterval(iv); d.textContent = fin; } else {
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

function buildLine(parent, tokens, accentTokens = []) {
  const line = document.createElement('span');
  line.className = 'line';
  tokens.forEach((tok, i) => {
    const w = document.createElement('span');
    w.className = `word${accentTokens.includes(tok) ? ' accent' : ''}`;
    w.setAttribute('aria-hidden', 'true');
    w.textContent = tok;
    line.append(w);
    if (i < tokens.length - 1) line.append(document.createTextNode(' '));
  });
  parent.append(line);
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const nodes = collectNodes(block);

  let heading;
  let caption;
  nodes.forEach((el) => {
    if (!heading && (el.matches('h1,h2,h3,h4') || el.querySelector('h1,h2,h3,h4'))) {
      heading = el.matches('h1,h2,h3,h4') ? el : el.querySelector('h1,h2,h3,h4');
      return;
    }
    const text = el.textContent.trim();
    if (text && !caption) caption = text;
  });

  const fullText = (heading && heading.textContent.trim()) || 'Runs on the edge. Refuses the cloud.';

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const h2 = document.createElement('h2');
  h2.className = 'display split';
  h2.setAttribute('data-split', '');
  h2.setAttribute('aria-label', fullText);

  // Split on the sentence boundary after "edge."
  const marker = 'edge.';
  const idx = fullText.indexOf(marker);
  let line1Text = fullText;
  let line2Text = '';
  if (idx !== -1) {
    line1Text = fullText.slice(0, idx + marker.length).trim();
    line2Text = fullText.slice(idx + marker.length).trim();
  }
  buildLine(h2, line1Text.split(/\s+/).filter(Boolean), ['edge.']);
  if (line2Text) buildLine(h2, line2Text.split(/\s+/).filter(Boolean));
  wrap.append(h2);

  if (caption) {
    const cap = document.createElement('p');
    cap.className = 'mono wipe';
    cap.setAttribute('data-anim', '');
    cap.textContent = caption;
    wrap.append(cap);
  }

  block.replaceChildren(wrap);
  if (!wrap.children.length) throw new Error('product: empty wrap');

  initMotion(wrap);
}
