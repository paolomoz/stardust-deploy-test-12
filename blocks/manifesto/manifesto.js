/**
 * manifesto — "A new species of product tool" positioning band (variant A).
 *
 * Authoring rows:
 *   1. eyebrow    — short label
 *   2. headline   — section title (-> <h2>)
 *   3. body       — paragraph
 *
 * Reads by content classification so the flattened single-cell DA shape works too.
 */
export default async function decorate(block) {
  const cells = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) cells.push(...kids);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      cells.push(p);
    }
  });

  const headingEl = cells.find((el) => /^H[1-6]$/.test(el.tagName));
  const texts = cells.filter((el) => el !== headingEl && el.textContent.trim());
  const eyebrowText = texts[0] ? texts[0].textContent.trim() : '';
  const bodyText = texts.find((t, i) => i > 0) ? texts[texts.length - 1].textContent.trim() : '';

  const wrap = document.createElement('div');
  wrap.className = 'wrap manifesto-inner';

  if (eyebrowText) {
    const eb = document.createElement('p');
    eb.className = 'eyebrow';
    eb.textContent = eyebrowText;
    wrap.append(eb);
  }

  const h2 = document.createElement('h2');
  h2.textContent = headingEl ? headingEl.textContent.trim() : '';
  wrap.append(h2);

  if (bodyText && bodyText !== eyebrowText) {
    const p = document.createElement('p');
    p.className = 'manifesto-body';
    p.textContent = bodyText;
    wrap.append(p);
  }

  block.replaceChildren(wrap);
}
