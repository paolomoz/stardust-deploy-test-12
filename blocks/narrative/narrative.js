/**
 * narrative — a stacked prose section: eyebrow, headline, optional lead, prose.
 * Used 3× (mission / lightbulb / better-world).
 *
 * Authoring (DA-flattened single cell, or one row each — order matters):
 *   - eyebrow : a "NN — Label" line (rebuilt with a highlighted number span, #39)
 *   - heading : the section title -> <h2>
 *   - lead    : OPTIONAL — the first prose paragraph wrapped in <strong> signals
 *               the larger lead/intro line (the <strong> is unwrapped). Only the
 *               mission instance has one.
 *   - prose   : the remaining paragraphs (inline <a> links preserved). A
 *               paragraph beginning "NN%" animates a count-up on scroll.
 *
 * Progressive enhancement only; content renders visible. Count-up + reveal are
 * gated on prefers-reduced-motion.
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

function buildEyebrow(srcEl) {
  const raw = srcEl.textContent.trim();
  const p = document.createElement('p');
  p.className = 'eyebrow';
  const m = raw.match(/^\s*(\d+)\s*(—|–|-)?\s*(.*)$/);
  if (m && m[1]) {
    const num = document.createElement('span');
    num.className = 'eyebrow__num';
    [, num.textContent] = m;
    p.append(num);
    p.append(document.createTextNode(`${m[3] ? ` — ${m[3]}` : ''}`));
  } else {
    p.textContent = raw;
  }
  return p;
}

export default async function decorate(block) {
  const nodes = collectNodes(block);

  const headingSrc = nodes.find((n) => n.matches('h1,h2,h3,h4,h5,h6') || n.querySelector('h1,h2,h3,h4,h5,h6'));
  const headingIdx = headingSrc ? nodes.indexOf(headingSrc) : 0;

  const eyebrowSrc = nodes.slice(0, headingIdx).find((n) => n.textContent.trim());

  // everything after the heading that carries prose text
  const after = nodes.slice(headingIdx + 1).filter((n) => n.textContent.trim());

  // lead = first post-heading paragraph wrapped in <strong> (no link)
  let leadSrc = null;
  if (after.length) {
    const first = after[0];
    const strong = first.matches('strong') ? first : first.querySelector(':scope > strong');
    const onlyStrong = strong && !first.querySelector('a')
      && first.textContent.trim() === strong.textContent.trim();
    if (onlyStrong) leadSrc = first;
  }
  const proseSrc = after.filter((n) => n !== leadSrc);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const head = document.createElement('div');
  head.className = 'section__head';

  if (eyebrowSrc) head.append(buildEyebrow(eyebrowSrc));

  const h2 = document.createElement('h2');
  h2.className = 'headline';
  const hInner = headingSrc?.matches('h1,h2,h3,h4,h5,h6')
    ? headingSrc
    : (headingSrc?.querySelector('h1,h2,h3,h4,h5,h6') || headingSrc);
  if (hInner) [...hInner.childNodes].forEach((n) => h2.append(n.cloneNode(true)));
  head.append(h2);

  if (leadSrc) {
    const lead = document.createElement('p');
    lead.className = 'section__lead';
    lead.textContent = leadSrc.textContent.trim();
    head.append(lead);
  }
  wrap.append(head);

  const prose = document.createElement('div');
  prose.className = 'prose';
  proseSrc.forEach((srcP) => {
    const p = document.createElement('p');
    const inner = srcP.matches('p') ? srcP : (srcP.querySelector('p') || srcP);
    [...inner.childNodes].forEach((n) => p.append(n.cloneNode(true)));
    // inline prose links use the brand underline treatment, not the button system
    p.querySelectorAll('a').forEach((a) => a.classList.add('lnk'));
    // count-up: paragraph beginning "NN%"
    const m = p.textContent.match(/^\s*(\d+)%/);
    if (m && p.firstChild && p.firstChild.nodeType === Node.TEXT_NODE) {
      const target = m[1];
      const rest = p.firstChild.textContent.replace(/^\s*\d+/, '');
      const num = document.createElement('span');
      num.className = 'countup';
      num.dataset.countup = target;
      num.textContent = target;
      p.firstChild.textContent = rest;
      p.insertBefore(num, p.firstChild);
      p.classList.add('stat-line');
    }
    prose.append(p);
  });
  wrap.append(prose);

  block.replaceChildren(wrap);

  // ── progressive enhancement ──
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // count-up
  const counters = block.querySelectorAll('[data-countup]');
  if (counters.length) {
    if (reduced) {
      counters.forEach((el) => { el.textContent = el.dataset.countup; });
    } else {
      const easeOut3 = (t) => 1 - (1 - t) ** 3;
      const seen = new WeakSet();
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          const tgt = +entry.target.dataset.countup;
          const dur = tgt > 20 ? 1400 : 900;
          const start = performance.now();
          const step = (now) => {
            const t = Math.min((now - start) / dur, 1);
            entry.target.textContent = String(Math.round(easeOut3(t) * tgt));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      }, { threshold: 0.6 });
      counters.forEach((el) => io.observe(el));
    }
  }

  // entrance reveal
  if (!reduced) {
    const items = [head, ...prose.children];
    items.forEach((el) => el.classList.add('na-anim'));
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('na-in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    items.forEach((el) => io.observe(el));
  }
}
