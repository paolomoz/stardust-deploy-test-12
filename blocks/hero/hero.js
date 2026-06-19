/**
 * hero — emotional hook. Generative constellation canvas behind the lead copy.
 *
 * Authoring (DA-flattened single cell, or one row each):
 *   - eyebrow  : short link-free <p> BEFORE the heading
 *   - heading  : the page's single <h1>
 *   - sub      : sentence-length link-free <p> AFTER the heading
 *   - CTA      : <strong><a> -> .btn.btn-primary (cloned, decorateButton applies class)
 *
 * The constellation is a progressive enhancement: under prefers-reduced-motion
 * it renders one static resolved frame; otherwise it animates via rAF.
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

const PURPLE = 'rgba(128,82,255,';
const WHITE = 'rgba(255,255,255,';
const GOLD = 'rgba(255,224,168,';

function makeField(canvas, opts) {
  const ctx = canvas.getContext('2d');
  const f = {
    canvas,
    ctx,
    opts,
    pts: [],
    w: 0,
    h: 0,
    cx: 0,
    cy: 0,
    dpr: Math.min(window.devicePixelRatio || 1, 2),
  };
  f.resize = function resize() {
    f.w = canvas.clientWidth;
    f.h = canvas.clientHeight;
    if (!f.w || !f.h) return;
    canvas.width = f.w * f.dpr;
    canvas.height = f.h * f.dpr;
    ctx.setTransform(f.dpr, 0, 0, f.dpr, 0, 0);
    let seed = opts.seed || 7;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const cx = opts.cx * f.w;
    const cy = opts.cy * f.h;
    const spread = typeof opts.spread === 'function' ? opts.spread() : opts.spread;
    f.pts = [];
    for (let i = 0; i < opts.count; i += 1) {
      const a = rnd() * Math.PI * 2;
      const r = (rnd() ** 0.7) * spread;
      f.pts.push({
        bx: cx + Math.cos(a) * r,
        by: cy + Math.sin(a) * r * opts.flat,
        s: 0.6 + rnd() * 1.6,
        c: rnd(),
        ph: rnd() * Math.PI * 2,
        amp: 3 + rnd() * 8,
        x: 0,
        y: 0,
      });
    }
    f.cx = cx;
    f.cy = cy;
    f.spread = spread;
  };
  f.resize();
  return f;
}

function draw(f, t, reduced) {
  const { ctx, opts } = f;
  if (!f.w || !f.h) return;
  ctx.clearRect(0, 0, f.w, f.h);
  f.pts.forEach((p) => {
    p.x = p.bx + (reduced ? 0 : Math.sin(t / 1600 + p.ph) * p.amp);
    p.y = p.by + (reduced ? 0 : Math.cos(t / 1900 + p.ph) * p.amp * 0.6);
  });
  ctx.lineWidth = 0.5;
  for (let i = 0; i < f.pts.length; i += 1) {
    for (let j = i + 1; j < f.pts.length; j += 1) {
      const dx = f.pts[i].x - f.pts[j].x;
      const dy = f.pts[i].y - f.pts[j].y;
      const d = Math.hypot(dx, dy);
      if (d < opts.link) {
        ctx.strokeStyle = `${WHITE}${(0.05 * (1 - d / opts.link)).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(f.pts[i].x, f.pts[i].y);
        ctx.lineTo(f.pts[j].x, f.pts[j].y);
        ctx.stroke();
      }
    }
  }
  f.pts.forEach((p) => {
    let col = WHITE;
    if (p.c < 0.18) col = PURPLE;
    else if (p.c < 0.30) col = GOLD;
    const op = 0.18 + (1 - Math.min(1, Math.hypot(p.x - f.cx, p.y - f.cy) / f.spread)) * 0.6;
    ctx.fillStyle = `${col}${op.toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
    ctx.fill();
  });
  if (opts.node) {
    ctx.save();
    ctx.translate(f.cx, f.cy);
    ctx.rotate(Math.PI / 4);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 26);
    g.addColorStop(0, `${WHITE}0.95)`);
    g.addColorStop(0.5, `${PURPLE}0.5)`);
    g.addColorStop(1, `${PURPLE}0)`);
    ctx.fillStyle = g;
    ctx.fillRect(-26, -26, 52, 52);
    ctx.fillStyle = `${WHITE}0.9)`;
    ctx.fillRect(-3, -3, 6, 6);
    ctx.restore();
  }
}

export default async function decorate(block) {
  const nodes = collectNodes(block);
  const headingSrc = nodes.find((n) => n.matches('h1, h2, h3, h4, h5, h6') || n.querySelector('h1, h2, h3, h4, h5, h6'));
  const linkCell = nodes.find((n) => n.matches('a') || n.querySelector('a'));

  // eyebrow = short link-free text BEFORE the heading; sub = link-free <p> AFTER it
  const headingIdx = nodes.indexOf(headingSrc);
  const textNodes = nodes.filter((n) => !(n.matches('a') || n.querySelector('a'))
    && !(n.matches('h1,h2,h3,h4,h5,h6')));
  const eyebrowSrc = textNodes.find((n) => nodes.indexOf(n) < headingIdx);
  const subSrc = textNodes.find((n) => nodes.indexOf(n) > headingIdx);

  const wrap = document.createElement('div');
  wrap.className = 'wrap hero__inner';

  if (eyebrowSrc) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'eyebrow';
    eyebrow.textContent = eyebrowSrc.textContent.trim();
    wrap.append(eyebrow);
  }

  const h1 = document.createElement('h1');
  h1.className = 'display';
  const inner = headingSrc?.matches('h1,h2,h3,h4,h5,h6')
    ? headingSrc
    : (headingSrc?.querySelector('h1,h2,h3,h4,h5,h6') || headingSrc);
  if (inner) [...inner.childNodes].forEach((n) => h1.append(n.cloneNode(true)));
  else h1.textContent = 'Unlock collective wisdom.';
  wrap.append(h1);

  if (subSrc) {
    const sub = document.createElement('p');
    sub.className = 'hero__sub';
    sub.textContent = subSrc.textContent.trim();
    wrap.append(sub);
  }

  if (linkCell && linkCell.querySelector('a')) {
    const cta = document.createElement('div');
    cta.className = 'hero__cta';
    const host = linkCell.matches('a') ? linkCell.parentElement || linkCell : linkCell;
    [...host.childNodes].forEach((n) => cta.append(n.cloneNode(true)));
    wrap.append(cta);
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'hero__canvas';
  canvas.setAttribute('aria-hidden', 'true');

  block.replaceChildren(canvas, wrap);

  // ── constellation ──
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opts = {
    cx: 0.72,
    cy: 0.42,
    count: 150,
    spread: () => Math.min(window.innerWidth, 900) * 0.42,
    flat: 0.9,
    link: 70,
    seed: 11,
    node: true,
  };
  const field = makeField(canvas, opts);
  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => field.resize(), 150);
  }, { passive: true });

  // The block CSS (position:absolute; inset:0) loads async, so the canvas has
  // 0×0 layout at decorate time. Re-measure when it first gains real size.
  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => {
      if (canvas.clientWidth && canvas.clientHeight) {
        field.resize();
        if (reduced) draw(field, 0, true); // static frame must redraw at the real size
      }
    });
    ro.observe(canvas);
  }

  if (reduced) {
    const drawWhenReady = () => {
      field.resize();
      draw(field, 0, true);
      if (!field.w) requestAnimationFrame(drawWhenReady);
    };
    requestAnimationFrame(drawWhenReady);
  } else {
    const loop = (t) => { draw(field, t, false); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }
}
