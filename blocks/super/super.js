/**
 * super — Super Duolingo promo (dark navy band).
 * Authoring rows: wordmark picture | heading | body | CTA (<strong><a>) | Duo picture.
 * The first picture renders in the text column (wordmark), the last in the art column (Duo).
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
  const pickPic = (el) => (el.matches('picture, img') ? el : el.querySelector('picture, img'));
  const isPic = (el) => !!pickPic(el);
  const isHeading = (el) => el.matches('h1, h2, h3') || el.querySelector('h1, h2, h3');
  const hasLink = (el) => el.matches('a') || el.querySelector('a');

  const pics = nodes.filter(isPic).map(pickPic);
  const headEl = nodes.find(isHeading);
  const anchors = [];
  nodes.forEach((n) => {
    if (n.matches?.('a')) anchors.push(n);
    else n.querySelectorAll?.('a').forEach((a) => anchors.push(a));
  });
  const body = nodes.find((n) => !isPic(n) && !isHeading(n) && !hasLink(n));

  const glow = document.createElement('div');
  glow.className = 'glow';

  const wrap = document.createElement('div');
  wrap.className = 'wrap super-grid';
  const col = document.createElement('div');
  col.className = 'super-text';
  if (pics[0]) { pics[0].classList?.add('mark'); col.append(pics[0]); }
  if (headEl) {
    const inner = headEl.querySelector('h1, h2, h3') || headEl;
    const h2 = document.createElement('h2');
    h2.append(...inner.childNodes);
    col.append(h2);
  }
  if (body) col.append(body);
  if (anchors.length) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    anchors.forEach((a) => actions.append(a.cloneNode(true)));
    col.append(actions);
  }
  const art = document.createElement('div');
  art.className = 'super-art';
  if (pics[1]) art.append(pics[1]);

  wrap.append(col, art);
  block.replaceChildren(glow, wrap);
}
