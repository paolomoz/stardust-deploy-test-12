/**
 * constellation-divider — content-free motion spine between content sections.
 *
 * Authored as an EMPTY block (no cells). decorate() injects a <canvas> + the
 * diamond node and animates a small particle field. Under prefers-reduced-motion
 * it draws a single static frame.
 *
 * A per-instance seed is derived from the block's DOM position so successive
 * dividers differ (matching the prototype's `seed: 3 + i*5`).
 */

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
    spread: opts.spread,
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
    f.pts = [];
    for (let i = 0; i < opts.count; i += 1) {
      const a = rnd() * Math.PI * 2;
      const r = (rnd() ** 0.7) * opts.spread;
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
}

export default async function decorate(block) {
  block.setAttribute('aria-hidden', 'true');
  block.replaceChildren();

  const canvas = document.createElement('canvas');
  const node = document.createElement('span');
  node.className = 'divider__node';
  block.append(canvas, node);

  // per-instance seed from position among siblings (prototype: 3 + i*5)
  const dividers = [...document.querySelectorAll('.constellation-divider')];
  const idx = Math.max(0, dividers.indexOf(block));

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const field = makeField(canvas, {
    cx: 0.5, cy: 0.5, count: 46, spread: 240, flat: 0.4, link: 54, seed: 3 + idx * 5, node: false,
  });

  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => field.resize(), 150);
  }, { passive: true });

  // Block CSS loads async — re-measure once the canvas gains real layout size.
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
