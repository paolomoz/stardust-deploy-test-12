/**
 * closing — final CTA band (dark). Authoring (one cell per row):
 *   1: <h2> heading   2: subcopy   3: CTAs (<strong><a> primary, <em><a> secondary)
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const wrap = document.createElement('div');
  wrap.className = 'wrap closing-inner';
  const heading = rows[0]?.querySelector('h1,h2,h3') || document.createElement('h2');
  if (!heading.textContent) heading.textContent = (rows[0]?.textContent || '').trim();
  heading.classList.add('closing-h');
  wrap.append(heading);
  const subRow = rows.find((r, i) => i > 0 && !r.querySelector('a') && r.textContent.trim());
  if (subRow) { const p = document.createElement('p'); p.textContent = subRow.textContent.trim(); wrap.append(p); }
  const ctaRow = rows.find((r) => r.querySelector('a'));
  if (ctaRow) {
    const actions = document.createElement('div');
    actions.className = 'actions btn-group';
    [...ctaRow.firstElementChild.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    wrap.append(actions);
  }
  block.replaceChildren(wrap);
}
