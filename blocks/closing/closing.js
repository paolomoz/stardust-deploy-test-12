/**
 * closing — centered closing CTA. Heading -> <h2>, plus a primary CTA.
 *
 * Authoring (DA-flattened single cell, or one row each):
 *   - heading : "Your workplace has the answer…" -> <h2>
 *   - CTA     : <strong><a> -> .btn.btn-primary (cloned; decorateButton classes it)
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

const isHeading = (n) => n.matches('h1,h2,h3,h4,h5,h6') || n.querySelector('h1,h2,h3,h4,h5,h6');
const isLink = (n) => n.matches('a') || n.querySelector('a');

export default async function decorate(block) {
  const nodes = collectNodes(block);

  const headingSrc = nodes.find(isHeading);
  const linkCell = nodes.find(isLink);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  if (headingSrc) {
    const h2 = document.createElement('h2');
    h2.className = 'headline';
    const hInner = headingSrc.matches('h1,h2,h3,h4,h5,h6')
      ? headingSrc : (headingSrc.querySelector('h1,h2,h3,h4,h5,h6') || headingSrc);
    [...hInner.childNodes].forEach((n) => h2.append(n.cloneNode(true)));
    wrap.append(h2);
  }

  if (linkCell && linkCell.querySelector('a')) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    const host = linkCell.matches('a') ? linkCell.parentElement || linkCell : linkCell;
    [...host.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    wrap.append(actions);
  }

  block.replaceChildren(wrap);

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    [...wrap.children].forEach((el) => el.classList.add('na-anim'));
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('na-in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    [...wrap.children].forEach((el) => io.observe(el));
  }
}
