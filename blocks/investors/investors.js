/**
 * investors — eyebrow + heading + lead, then a list of investor rows.
 *
 * Authoring (DA-flattened — one <p> line per investor, "·"-delimited #39/#50):
 *   head : eyebrow ("06 — Our investors") + heading -> <h2> + lead paragraph
 *   rows : "Name · optional note · Kind"  (last segment = Fund/Operator kind;
 *          first = name; any middle = note). Spans are rebuilt in decorate()
 *          since EDS strips <span> in block cells.
 *
 * The lead is the first post-heading paragraph; investor rows are the "·"-lines.
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
const DELIM = /\s*[·|]\s*/;

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
    p.append(document.createTextNode(m[3] ? ` — ${m[3]}` : ''));
  } else {
    p.textContent = raw;
  }
  return p;
}

export default async function decorate(block) {
  const nodes = collectNodes(block);

  const headingSrc = nodes.find(isHeading);
  const headingIdx = headingSrc ? nodes.indexOf(headingSrc) : 0;

  const eyebrowSrc = nodes.slice(0, headingIdx).find((n) => n.textContent.trim());
  const after = nodes.slice(headingIdx + 1).filter((n) => n.textContent.trim());

  // investor rows = lines containing the unit delimiter; lead = the rest
  const rowNodes = after.filter((n) => DELIM.test(n.textContent.trim()));
  const leadNodes = after.filter((n) => !DELIM.test(n.textContent.trim()));

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const head = document.createElement('div');
  head.className = 'section__head';
  if (eyebrowSrc) head.append(buildEyebrow(eyebrowSrc));
  if (headingSrc) {
    const h2 = document.createElement('h2');
    h2.className = 'headline';
    const hInner = headingSrc.matches('h1,h2,h3,h4,h5,h6')
      ? headingSrc : (headingSrc.querySelector('h1,h2,h3,h4,h5,h6') || headingSrc);
    [...hInner.childNodes].forEach((n) => h2.append(n.cloneNode(true)));
    head.append(h2);
  }
  leadNodes.forEach((n) => {
    const lead = document.createElement('p');
    lead.className = 'investors__lead';
    lead.textContent = n.textContent.trim();
    head.append(lead);
  });
  wrap.append(head);

  const list = document.createElement('ul');
  list.className = 'investors__list';
  list.setAttribute('role', 'list');

  rowNodes.forEach((n) => {
    const parts = n.textContent.trim().split(DELIM).map((s) => s.trim()).filter(Boolean);
    if (!parts.length) return;
    const li = document.createElement('li');
    li.className = 'investors__item';

    const name = document.createElement('span');
    name.className = 'investors__name';
    [name.textContent] = parts;
    li.append(name);

    const kind = parts.length > 1 ? parts[parts.length - 1] : '';
    const noteParts = parts.slice(1, parts.length - 1);
    noteParts.forEach((np) => {
      const note = document.createElement('span');
      note.className = 'investors__note';
      note.textContent = np;
      li.append(note);
    });
    if (kind) {
      const k = document.createElement('span');
      k.className = 'investors__kind';
      k.textContent = kind;
      li.append(k);
    }
    list.append(li);
  });
  wrap.append(list);

  block.replaceChildren(wrap);

  // entrance reveal
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    const items = [head, ...list.children];
    items.forEach((el) => el.classList.add('na-anim'));
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('na-in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    items.forEach((el) => io.observe(el));
  }
}
