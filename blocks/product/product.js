/**
 * product — a single product deep-dive band (reused once per suite product).
 *
 * Authoring rows:
 *   1. variant   — one of: mail | grammarly | coda | go  (drives accent + panel colors + side)
 *   2. eyebrow   — product name (also the panel glyph)
 *   3. <h3>      — product headline (char-reveals on scroll, kinetic-display)
 *   4. body      — paragraph
 *   5. link      — <a> discover link
 *   6. tag       — panel caption line
 *
 * Content is fully visible without JS; the headline reveal only runs when
 * reduced-motion is not preferred.
 */

const VARIANTS = {
  mail: {
    accent: 'var(--color-teal)', panelBg: '#0c4243', panelInk: '#e7f3f1', sectionBg: 'var(--color-surface)', reverse: false,
  },
  grammarly: {
    accent: 'var(--color-accent)', panelBg: '#714cb6', panelInk: '#f0eaff', sectionBg: 'var(--color-bg)', reverse: true,
  },
  coda: {
    accent: 'var(--color-mulberry)', panelBg: '#421d24', panelInk: '#f3e2e6', sectionBg: 'var(--color-surface)', reverse: false,
  },
  go: {
    accent: '#8a6f2e', panelBg: '#e6e0d4', panelInk: '#4a4232', sectionBg: 'var(--color-bg)', reverse: true,
  },
};

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
  const texts = nodes.filter((n) => n.matches && n.tagName === 'P');
  const heading = nodes.find((n) => n.matches && /^H[1-6]$/.test(n.tagName));
  const link = nodes.find((n) => n.matches && (n.matches('a') || n.querySelector('a')));

  // variant key = first short text matching a known product
  const keyEl = texts.find((p) => /^(mail|grammarly|coda|go)$/i.test(p.textContent.trim()));
  const key = keyEl ? keyEl.textContent.trim().toLowerCase() : 'mail';
  const v = VARIANTS[key] || VARIANTS.mail;

  // remaining paragraphs (excluding the variant key): eyebrow (short) then body / tag
  const rest = texts.filter((p) => p !== keyEl);
  const eyebrowEl = rest[0];
  const eyebrow = eyebrowEl ? eyebrowEl.textContent.trim() : key;
  const bodyEl = rest.find((p, idx) => idx > 0 && p.textContent.trim().length > 40);
  const tagEl = rest.find((p) => p !== eyebrowEl && p !== bodyEl && p.textContent.trim());

  // section-level styling
  const section = block.closest('.section') || block;
  section.style.setProperty('--accent-c', v.accent);
  section.style.background = v.sectionBg;
  block.classList.add('product');
  if (v.reverse) block.classList.add('reverse');

  const wrap = document.createElement('div');
  wrap.className = 'wrap product-inner';

  // media panel
  const media = document.createElement('div');
  media.className = 'product-media';
  media.style.setProperty('--panel-bg', v.panelBg);
  media.style.setProperty('--panel-ink', v.panelInk);
  const panel = document.createElement('div');
  panel.className = 'product-panel';
  const glyph = document.createElement('span');
  glyph.className = 'glyph';
  glyph.textContent = eyebrow;
  panel.append(glyph);
  if (tagEl) {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = tagEl.textContent.trim();
    panel.append(tag);
  }
  media.append(panel);

  // copy
  const copy = document.createElement('div');
  copy.className = 'product-copy';
  const eb = document.createElement('p');
  eb.className = 'eyebrow';
  eb.textContent = eyebrow;
  const h3 = document.createElement('h3');
  h3.className = 'reveal-display';
  h3.textContent = heading ? heading.textContent.trim() : '';
  copy.append(eb, h3);
  if (bodyEl) {
    const p = document.createElement('p');
    p.className = 'soft';
    p.textContent = bodyEl.textContent.trim();
    copy.append(p);
  }
  if (link) {
    const a = (link.matches('a') ? link : link.querySelector('a')).cloneNode(true);
    a.className = 'product-link';
    if (!/→/.test(a.textContent)) {
      const arr = document.createElement('span');
      arr.setAttribute('aria-hidden', 'true');
      arr.textContent = '→';
      a.append(' ', arr);
    }
    copy.append(a);
  }

  wrap.append(media, copy);
  block.replaceChildren(wrap);

  // char-reveal headline on scroll
  splitChars(h3);
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && h3.classList.contains('kin') && 'IntersectionObserver' in window) {
    const reveal = () => h3.classList.add('in');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    io.observe(h3);
    setTimeout(reveal, 1800);
  }
}
