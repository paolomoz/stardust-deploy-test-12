/**
 * hero — Linear lead section (variant A).
 *
 * Authoring rows (one cell each):
 *   1. eyebrow         — short label ("For teams and agents")
 *   2. headline        — <h1> (the page's single h1)
 *   3. subhead         — sentence-length paragraph
 *   4. CTAs            — <strong><a> primary + <em><a> secondary
 *
 * Read by CELL/textContent (not querySelectorAll('p')) so the off-pipeline harness
 * and the live pipeline shape both work (#79). The CTAs are decorated to .btn by
 * decorateLinks() before this runs, so we just clone the cell's anchors.
 *
 * The product-UI mock is a FIXED decorative visual (aria-hidden, not authorable).
 */

function buildMock() {
  const wrap = document.createElement('div');
  wrap.className = 'hero-mock-wrap';
  wrap.setAttribute('aria-hidden', 'true');
  const sidebar = ['Inbox', 'My issues', 'Reviews', 'Pulse', 'Workspace', 'Initiatives', 'Projects'];
  const rows = [
    ['LIN-2451', 'Wire up agent task routing', 'AG', 'progress'],
    ['LIN-2447', 'Pulse: velocity rollup per cycle', 'MK', 'review'],
    ['LIN-2440', 'Review PR #1182 — agent output', 'AG', 'progress'],
    ['LIN-2436', 'Define Q3 initiative scope', 'PR', 'todo'],
    ['LIN-2431', 'Self-driving triage rules', 'AG', 'done'],
  ];
  wrap.innerHTML = `
    <div class="hero-mock">
      <div class="mock-side">
        <div class="mock-brand">Linear</div>
        ${sidebar.map((s, i) => `<div class="mock-nav${i === 3 ? ' is-active' : ''}">${s}</div>`).join('')}
      </div>
      <div class="mock-main">
        <div class="mock-head">
          <span class="mock-crumb">Workspace / Cycle 24</span>
          <span class="mock-count"><b>145</b> issues · <b>27</b> agent tasks</span>
        </div>
        <div class="mock-bars">
          <div class="mock-bar"><span>Velocity</span><i class="bar"><b style="width:78%"></b></i></div>
          <div class="mock-bar"><span>Cycle scope</span><i class="bar"><b style="width:61%"></b></i></div>
        </div>
        ${rows.map(([id, t, who, st]) => `
          <div class="mock-row">
            <span class="mock-st mock-st-${st}"></span>
            <span class="mock-id">${id}</span>
            <span class="mock-t">${t}</span>
            <span class="mock-who" data-who="${who}">${who}</span>
          </div>`).join('')}
      </div>
    </div>`;
  return wrap;
}

export default async function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const headingCell = cells.find((c) => c.querySelector('h1, h2'));
  const ctaCell = cells.find((c) => c.querySelector('a'));
  const textCells = cells.filter((c) => c !== headingCell && c !== ctaCell && c.textContent.trim());
  const eyebrowCell = textCells.find((c) => c.textContent.trim().length < 40);
  const subCell = textCells.find((c) => c.textContent.trim().length >= 40);

  const wrap = document.createElement('div');
  wrap.className = 'wrap hero-inner';

  if (eyebrowCell) {
    const eb = document.createElement('p');
    eb.className = 'eyebrow';
    eb.textContent = eyebrowCell.textContent.trim();
    wrap.append(eb);
  }

  if (headingCell) {
    const src = headingCell.querySelector('h1, h2') || headingCell;
    const h1 = document.createElement('h1');
    const txt = src.textContent.trim();
    const m = txt.match(/^(.*\s)(\S+)$/);
    if (m) {
      const [, lead, lastWord] = m;
      h1.append(document.createTextNode(lead));
      const span = document.createElement('span');
      span.className = 'hero-accent';
      span.textContent = lastWord;
      h1.append(span);
    } else {
      h1.textContent = txt;
    }
    wrap.append(h1);
  }

  if (subCell) {
    const sub = document.createElement('p');
    sub.className = 'hero-sub';
    sub.textContent = subCell.textContent.trim();
    wrap.append(sub);
  }

  if (ctaCell) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    wrap.append(actions);
  }

  wrap.append(buildMock());
  block.replaceChildren(wrap);
}
