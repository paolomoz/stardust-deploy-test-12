/**
 * showcase — kinetic-display product section (variant C, register: kinetic-display).
 *
 * One block, reused per product moment. Ground variant is a block class:
 *   showcase            → white ground
 *   showcase surface    → #f5f5f7 ground
 *   showcase dark       → black ground
 *
 * Authoring rows (each a single cell; tolerant of DA single-cell flattening):
 *   1. eyebrow text            (e.g. "iPhone")
 *   2. headline                — <h1> on the lead section, <h2> elsewhere (rendered as authored)
 *   3. subhead text            (optional)
 *   4. CTAs                    — <strong><a> primary, <em><a> secondary (decorateButton applies .btn)
 *   5. product image           (optional <picture>/<img>)
 *
 * Motion (ported from the prototype, runs as block JS): oversized headline wipes
 * in, supporting nodes blur-to-sharp + scale-settle on scroll. First-viewport
 * content reveals on load (hero never blank); a safety timeout guarantees nothing
 * stays hidden; prefers-reduced-motion neutralises every move.
 */

/** Cell-cascade collector — recovers both rich multi-row and DA single-cell shapes. */
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

const isHeading = (el) => el.matches('h1,h2,h3,h4,h5,h6') || el.querySelector('h1,h2,h3,h4,h5,h6');
const isMedia = (el) => el.matches('picture,img') || el.querySelector('picture,img');
const isCta = (el) => el.matches('a') || el.querySelector('a');

export default async function decorate(block) {
  const nodes = collectNodes(block);
  if (!nodes.length) return;

  let headingEl = null;
  let mediaEl = null;
  const ctaCells = [];
  const textEls = [];

  nodes.forEach((el) => {
    if (isHeading(el)) headingEl = el.matches('h1,h2,h3,h4,h5,h6') ? el : el.querySelector('h1,h2,h3,h4,h5,h6');
    else if (isCta(el)) ctaCells.push(el);
    else if (isMedia(el)) mediaEl = el.matches('picture,img') ? el : el.querySelector('picture,img');
    else if (el.textContent.trim()) textEls.push(el);
  });

  const inner = document.createElement('div');
  inner.className = 'showcase__in';

  // eyebrow = first text node, subhead = the rest
  if (textEls[0]) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'showcase__eyebrow';
    eyebrow.textContent = textEls[0].textContent.trim();
    eyebrow.setAttribute('data-anim', '');
    inner.append(eyebrow);
  }

  if (headingEl) {
    headingEl.classList.add('showcase__title', 'wipe');
    inner.append(headingEl);
  }

  if (textEls[1]) {
    const sub = document.createElement('p');
    sub.className = 'showcase__sub';
    sub.textContent = textEls.slice(1).map((t) => t.textContent.trim()).join(' ');
    sub.setAttribute('data-anim', '');
    sub.setAttribute('data-d', '1');
    inner.append(sub);
  }

  if (ctaCells.length) {
    const actions = document.createElement('div');
    actions.className = 'showcase__actions btn-group';
    actions.setAttribute('data-anim', '');
    actions.setAttribute('data-d', '2');
    // clone the WHOLE wrapper (<strong>/<em> + its <a>) so decorateButton can
    // apply .btn-primary / .btn-secondary from the emphasis.
    ctaCells.forEach((cell) => actions.append(cell.cloneNode(true)));
    inner.append(actions);
  }

  if (mediaEl) {
    const media = document.createElement('div');
    media.className = 'showcase__media';
    media.setAttribute('data-anim', '');
    media.setAttribute('data-d', '2');
    media.append(mediaEl);
    inner.append(media);
  }

  block.replaceChildren(inner);

  // ---- motion ----
  const animated = [...block.querySelectorAll('[data-anim], .wipe')];
  const reveal = (n) => n.classList.add('in');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    animated.forEach(reveal);
    return;
  }
  const vh = window.innerHeight;
  animated.forEach((n) => { if (n.getBoundingClientRect().top < vh * 0.92) reveal(n); });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.01, rootMargin: '0px 0px -10% 0px' });
  animated.forEach((n) => { if (!n.classList.contains('in')) io.observe(n); });
  setTimeout(() => animated.forEach(reveal), 3500);
}
