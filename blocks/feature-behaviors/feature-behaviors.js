/**
 * feature-behaviors — "Evals that write themselves": copy + a BEHAVIORS taxonomy panel.
 *
 * Authoring rows (one cell each):
 *   1. eyebrow      e.g. "02 · Evaluate"
 *   2. heading      -> <h2>
 *   3. body paragraph
 *   4. narration    plain-language gloss (optional)
 *
 * Behavior list is fixed demo data. Cards stagger-resolve on scroll (reduced-motion safe).
 */

const BEHAVIORS = [
  ['B01', 'ISSUE', 'pytest failures on first run', 'tool · pytest.run'],
  ['B02', 'CHANGED', 'Fix-test-failure proposals', 'ai · agent.fix_proposal'],
  ['B03', '', 'PRs opened successfully', 'ai · pr.opened'],
  ['B04', '', 'Ambiguous refactor requests', 'user · ticket.ingest'],
  ['B05', 'ISSUE', 'Plan steps exceed 30 iterations', 'ai · agent.plan.step'],
  ['B07', '', 'Code review roundtrips', 'ai · pr.reviewed'],
  ['B09', 'CHANGED', 'Git merge conflicts on rebase', 'tool · git.rebase'],
  ['B13', 'ISSUE', 'Long refactor proposals (>200 LOC)', 'ai · agent.refactor'],
  ['B24', 'NEW', 'Hallucinated import paths', 'ai · codegen.edit.insert'],
  ['B25', '', 'Security scan hits (Snyk / SAST)', 'tool · security.scan'],
];

function t(cell) { return cell ? cell.textContent.trim() : ''; }

export default async function decorate(block) {
  const rows = [...block.children];
  const eyebrow = t(rows[0]?.firstElementChild);
  const headingCell = rows[1]?.firstElementChild;
  const body = t(rows[2]?.firstElementChild);
  const narration = t(rows[3]?.firstElementChild);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const grid = document.createElement('div');
  grid.className = 'fb-grid';

  const copy = document.createElement('div');
  copy.className = 'fb-copy';
  if (eyebrow) copy.innerHTML += `<span class="eyebrow">${eyebrow}</span>`;
  const h = document.createElement('h2');
  const inner = headingCell?.querySelector('h1,h2,h3,h4,h5,h6') || headingCell;
  if (inner) [...inner.childNodes].forEach((n) => h.append(n.cloneNode(true)));
  copy.append(h);
  if (body) { const p = document.createElement('p'); p.textContent = body; copy.append(p); }
  if (narration) { const n = document.createElement('p'); n.className = 'narr'; n.innerHTML = `<b>Behaviors</b> ${narration}`; copy.append(n); }

  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.innerHTML = '<div class="ph"><span>$EV_02CC4A</span><span>BEHAVIORS</span>'
    + '<span class="live"><span class="dot-live" data-pulse></span>LIVE</span></div>';
  const list = document.createElement('div');
  list.className = 'behaviors';
  list.dataset.behaviors = '';
  BEHAVIORS.forEach(([id, tag, name, src], i) => {
    const b = document.createElement('div');
    b.className = 'b';
    b.dataset.bhide = '';
    b.style.setProperty('--d', `${i * 60}ms`);
    b.innerHTML = `<span class="bid">${id}</span>`
      + `<div class="left">${tag ? `<span class="tag tag-${tag.toLowerCase()}">${tag}</span>` : ''}<span class="bname">${name}</span></div>`
      + `<span class="bsrc">${src}</span>`;
    list.append(b);
  });
  panel.append(list);

  grid.append(copy, panel);
  wrap.append(grid);
  block.replaceChildren(wrap);

  // ---- resolve animation ----
  const reveal = (b) => {
    b.style.transition = 'opacity .5s ease, transform .5s ease';
    b.style.transitionDelay = getComputedStyle(b).getPropertyValue('--d');
    b.style.opacity = '1';
    b.style.transform = 'translateX(0)';
  };
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    block.querySelectorAll('[data-bhide]').forEach((b) => { b.style.opacity = '1'; });
    return;
  }
  block.querySelectorAll('[data-bhide]').forEach((b) => { b.style.opacity = '0'; b.style.transform = 'translateX(6px)'; });
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting) { e.target.querySelectorAll('[data-bhide]').forEach(reveal); io.unobserve(e.target); }
    });
  }, { threshold: 0.2 });
  io.observe(list);
  // safety: never leave hidden
  setTimeout(() => { block.querySelectorAll('[data-bhide]').forEach((b) => { if (getComputedStyle(b).opacity !== '1') reveal(b); }); }, 2600);
}
