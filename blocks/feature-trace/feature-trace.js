/**
 * feature-trace — "Truly understand your agents": copy + a live trace panel (demo data).
 *
 * Authoring rows (one cell each):
 *   1. eyebrow      e.g. "01 · Observe"
 *   2. heading      -> <h2>
 *   3. body paragraph
 *   4. narration    plain-language gloss (optional)
 */

const TRACE = [
  ['06:10:12', 'agent.plan.revise', '3.8s', '$0.10', 'step 40/30 — fan-in failed, back to branch B', 'WRN'],
  ['06:10:10', 'git.merge', '340ms', '$1.45', 'clean merge to main · no conflicts', ''],
  ['06:10:10', 'agent.fix_proposal', '1.6s', '$0.02', 'adding mutex to checkoutSession.flush()', ''],
  ['06:10:11', 'pytest.run', '14s', '$4.89', 'FAILED tests/race/test_parallel_checkout.py', 'ERR'],
  ['06:10:11', 'pr.opened', '420ms', '$0.02', 'acme/infra/pull/284 · fixes HPA drift', ''],
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
  grid.className = 'ft-grid';

  const copy = document.createElement('div');
  copy.className = 'ft-copy';
  if (eyebrow) copy.innerHTML += `<span class="eyebrow">${eyebrow}</span>`;
  const h = document.createElement('h2');
  const inner = headingCell?.querySelector('h1,h2,h3,h4,h5,h6') || headingCell;
  if (inner) [...inner.childNodes].forEach((n) => h.append(n.cloneNode(true)));
  copy.append(h);
  if (body) { const p = document.createElement('p'); p.textContent = body; copy.append(p); }
  if (narration) { const n = document.createElement('p'); n.className = 'narr'; n.innerHTML = `<b>In plain terms:</b> ${narration}`; copy.append(n); }

  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.innerHTML = '<div class="ph"><span>$TR_4F1A</span><span>LIVE TRACE</span>'
    + '<span class="live"><span class="dot-live" data-pulse></span>STREAMING</span></div>';
  const trace = document.createElement('div');
  trace.className = 'trace';
  TRACE.forEach(([a, b, c, d, e, tag]) => {
    const r = document.createElement('div');
    r.className = 'r';
    r.innerHTML = `<span class="t">${a}</span><span class="op">${b}</span><span>${c}</span><span>${d}</span>`
      + `<span class="msg">${tag ? `<span class="tag tag-${tag.toLowerCase()}">${tag}</span> ` : ''}${e}</span>`;
    trace.append(r);
  });
  panel.append(trace);

  grid.append(panel, copy);
  wrap.append(grid);
  block.replaceChildren(wrap);
}
