/**
 * closing — centered closing CTA band.
 * Authoring rows: heading | body | CTA (<strong><a>).
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

export default async function decorate(block) {
  const nodes = collectNodes(block);
  const isHeading = (el) => el.matches('h1, h2, h3') || el.querySelector('h1, h2, h3');
  const hasLink = (el) => el.matches('a') || el.querySelector('a');

  const headEl = nodes.find(isHeading);
  const anchors = [];
  nodes.forEach((n) => {
    if (n.matches?.('a')) anchors.push(n);
    else n.querySelectorAll?.('a').forEach((a) => anchors.push(a));
  });
  const body = nodes.find((n) => !isHeading(n) && !hasLink(n));

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (headEl) {
    const inner = headEl.querySelector('h1, h2, h3') || headEl;
    const h2 = document.createElement('h2');
    h2.append(...inner.childNodes);
    wrap.append(h2);
  }
  if (body) wrap.append(body);
  if (anchors.length) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    anchors.forEach((a) => actions.append(a.cloneNode(true)));
    wrap.append(actions);
  }
  block.replaceChildren(wrap);
}
