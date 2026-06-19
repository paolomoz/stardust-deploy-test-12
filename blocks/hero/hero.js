/**
 * hero — Adaline "Never stop learning" lead block (live-systems variant).
 *
 * Authoring rows (one cell each):
 *   1. eyebrow        e.g. "The Self-Improving Agent"
 *   2. headline       -> page <h1> (wrap emphasis in <strong> if needed)
 *   3. body paragraph
 *   4. CTAs           <strong><a>Sign Up</a></strong> <em><a>Read Docs</a></em>
 *   5. trusted label  e.g. "Trusted by teams at"
 *   6. trusted logos  comma-separated wordmarks (no assets) e.g. "Salesforce, DoorDash, …"
 *
 * The live-trace panel is a fixed product demo rendered by this block (not authored),
 * with a `live-systems` motion layer (streaming rows + ticking clock), reduced-motion safe.
 */

const TRACE = [
  ['06:10:12', 'agent.plan.revise', '3.8s', '$0.10', 'step 40/30 — fan-in failed, back to branch B', 'WRN'],
  ['06:10:10', 'git.merge', '340ms', '$1.45', 'clean merge to main · no conflicts · 14 commits', ''],
  ['06:10:10', 'agent.fix_proposal', '1.6s', '$0.02', 'adding mutex to parallel-safe checkoutSession.flush()', ''],
  ['06:10:11', 'pytest.run', '14s', '$4.89', 'FAILED tests/race/test_parallel_checkout.py 3/18', 'ERR'],
  ['06:10:11', 'pr.reviewed', '—', '$3.73', 'SRE: “looks good, but can we add a drift alert?”', ''],
  ['06:10:11', 'pr.opened', '420ms', '$0.02', 'acme/infra/pull/284 · fixes HPA drift on billing-api', ''],
];

function cellText(cell) { return cell ? cell.textContent.trim() : ''; }

function traceRowEl([t, op, lat, cost, msg, tag], hidden) {
  const r = document.createElement('div');
  r.className = 'r';
  if (hidden) r.dataset.rowHidden = '';
  r.innerHTML = `<span class="t">${t}</span><span class="op">${op}</span><span>${lat}</span><span>${cost}</span>`
    + `<span class="msg">${tag ? `<span class="tag tag-${tag.toLowerCase()}">${tag}</span> ` : ''}${msg}</span>`;
  return r;
}

export default async function decorate(block) {
  const rows = [...block.children];
  const eyebrow = cellText(rows[0]?.firstElementChild);
  const headingCell = rows[1]?.firstElementChild;
  const bodyCell = rows[2]?.firstElementChild;
  const ctaCell = rows[3]?.firstElementChild;
  const trustedLabel = cellText(rows[4]?.firstElementChild) || 'Trusted by teams at';
  const logosRaw = cellText(rows[5]?.firstElementChild);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const grid = document.createElement('div');
  grid.className = 'hero-grid';

  // copy column
  const copy = document.createElement('div');
  copy.className = 'hero-copy';
  if (eyebrow) {
    copy.innerHTML += `<span class="hero-pill"><span class="dot"></span><span class="mono">${eyebrow}</span></span>`;
  }
  const h1 = document.createElement('h1');
  const inner = headingCell?.querySelector('h1,h2,h3,h4,h5,h6') || headingCell;
  if (inner) [...inner.childNodes].forEach((n) => h1.append(n.cloneNode(true)));
  copy.append(h1);
  if (bodyCell) {
    const p = document.createElement('p');
    p.className = 'hero-sub';
    p.textContent = bodyCell.textContent.trim();
    copy.append(p);
  }
  if (ctaCell && ctaCell.querySelector('a')) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    copy.append(actions);
  }

  // panel column
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.dataset.anim = 'trace';
  panel.innerHTML = '<div class="ph"><span>$BH_B82E1D</span><span>TRACES</span>'
    + '<span class="live"><span class="dot-live" data-pulse></span>LIVE <span data-clock>06:10:12</span></span></div>';
  const trace = document.createElement('div');
  trace.className = 'trace';
  TRACE.forEach((r, i) => trace.append(traceRowEl(r, i >= 2)));
  panel.append(trace);

  grid.append(copy, panel);
  wrap.append(grid);

  // trusted-by
  if (logosRaw) {
    const trusted = document.createElement('div');
    trusted.className = 'trusted';
    const logos = logosRaw.split(/[,·|]/).map((s) => s.trim()).filter(Boolean)
      .map((l) => `<span class="l">${l}</span>`)
      .join('');
    trusted.innerHTML = `<div class="lbl">${trustedLabel}</div><div class="logos">${logos}</div>`;
    wrap.append(trusted);
  }

  block.replaceChildren(wrap);

  // ---- live-systems motion (reduced-motion safe) ----
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    block.querySelectorAll('[data-row-hidden]').forEach((r) => { r.style.opacity = '1'; });
    return;
  }
  block.querySelectorAll('[data-row-hidden]').forEach((r, i) => {
    r.style.opacity = '0';
    setTimeout(() => {
      r.style.transition = 'opacity .5s ease, transform .5s ease';
      r.style.transform = 'translateY(-4px)';
      r.style.opacity = '1';
      requestAnimationFrame(() => { r.style.transform = 'translateY(0)'; });
    }, 700 + i * 650);
  });
  const clk = block.querySelector('[data-clock]');
  if (clk) {
    let base = 22212;
    setInterval(() => {
      base += 1;
      const h = Math.floor(base / 3600) % 24;
      const m = Math.floor(base / 60) % 60;
      const s = base % 60;
      const pad = (n) => String(n).padStart(2, '0');
      clk.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
    }, 1000);
  }
}
