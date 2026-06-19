/**
 * app — "learn anytime, anywhere" download band.
 * Authoring rows: heading | body | store links (two <a>) | picture.
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
  const isPic = (el) => el.matches('picture, img') || el.querySelector('picture, img');
  const isHeading = (el) => el.matches('h1, h2, h3') || el.querySelector('h1, h2, h3');
  const hasLink = (el) => el.matches('a') || el.querySelector('a');

  const picEl = nodes.find(isPic);
  const headEl = nodes.find(isHeading);
  const anchors = [];
  nodes.forEach((n) => {
    if (n.matches?.('a')) anchors.push(n);
    else n.querySelectorAll?.('a').forEach((a) => anchors.push(a));
  });
  const body = nodes.find((n) => !isPic(n) && !isHeading(n) && !hasLink(n));

  const wrap = document.createElement('div');
  wrap.className = 'wrap app-grid';
  const col = document.createElement('div');
  col.className = 'app-text';
  if (headEl) {
    const inner = headEl.querySelector('h1, h2, h3') || headEl;
    const h2 = document.createElement('h2');
    h2.append(...inner.childNodes);
    col.append(h2);
  }
  if (body) col.append(body);
  if (anchors.length) {
    const badges = document.createElement('div');
    badges.className = 'badges';
    anchors.forEach((a) => {
      const c = a.cloneNode(true);
      c.classList.add('badge');
      // split "Download on the App Store" -> small prefix + bold store name
      const m = c.textContent.trim().match(/^(Download on the|Get it on)\s+(.+)$/i);
      if (m) {
        const icon = /apple|app store/i.test(m[2]) ? '\u{1F34E}' : '▶';
        c.replaceChildren();
        const ic = document.createElement('span');
        ic.className = 'badge-ic';
        ic.textContent = icon;
        const txt = document.createElement('span');
        txt.className = 'badge-txt';
        txt.innerHTML = `<small>${m[1]}</small><b>${m[2]}</b>`;
        c.append(ic, txt);
      }
      badges.append(c);
    });
    col.append(badges);
  }
  const art = document.createElement('div');
  art.className = 'app-art';
  const pic = picEl ? (picEl.matches('picture, img') ? picEl : picEl.querySelector('picture, img')) : null;
  if (pic) art.append(pic);

  wrap.append(col, art);
  block.replaceChildren(wrap);
}
