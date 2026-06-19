/**
 * metrics — "Synthetic data for the gaps": intro copy + a count-up metric grid.
 *
 * Authoring rows:
 *   1. eyebrow      e.g. "03 · Generate"
 *   2. heading      -> <h2>
 *   3. body paragraph
 *   4..N. metric rows, two cells: [value] | [label]   e.g.  "2.4M" | "traces ingested / wk"
 *
 * Count-up animates the numeric portion of each value on scroll (reduced-motion safe).
 */

function t(cell) { return cell ? cell.textContent.trim() : ''; }

export default async function decorate(block) {
  const rows = [...block.children];
  const eyebrow = t(rows[0]?.firstElementChild);
  const headingCell = rows[1]?.firstElementChild;
  const body = t(rows[2]?.firstElementChild);
  const metricRows = rows.slice(3).filter((r) => r.children.length >= 2 && t(r.children[0]));

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const intro = document.createElement('div');
  intro.className = 'mx-intro';
  if (eyebrow) intro.innerHTML += `<span class="eyebrow">${eyebrow}</span>`;
  const h = document.createElement('h2');
  const inner = headingCell?.querySelector('h1,h2,h3,h4,h5,h6') || headingCell;
  if (inner) [...inner.childNodes].forEach((n) => h.append(n.cloneNode(true)));
  intro.append(h);
  if (body) { const p = document.createElement('p'); p.textContent = body; intro.append(p); }
  wrap.append(intro);

  const grid = document.createElement('div');
  grid.className = 'mx-grid';
  metricRows.forEach((r) => {
    const val = t(r.children[0]);
    const label = t(r.children[1]);
    const m = document.createElement('div');
    m.className = 'metric';
    m.innerHTML = `<div class="v" data-count="${val}">${val}</div><div class="k">${label}</div>`;
    grid.append(m);
  });
  wrap.append(grid);
  block.replaceChildren(wrap);

  // ---- count-up ----
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const countUp = (el) => {
    const raw = el.getAttribute('data-count');
    const match = raw.match(/^([\d,.]+)(.*)$/);
    if (!match) return;
    const target = parseFloat(match[1].replace(/,/g, ''));
    const suffix = match[2];
    const dec = (match[1].split('.')[1] || '').length;
    let t0 = null;
    const dur = 1400;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      const e = 1 - (1 - p) ** 3;
      const val = target * e;
      el.textContent = (dec ? val.toFixed(dec) : Math.round(val).toLocaleString()) + suffix;
      if (p < 1) requestAnimationFrame(step); else el.textContent = raw;
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { countUp(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  block.querySelectorAll('[data-count]').forEach((el) => io.observe(el));
}
