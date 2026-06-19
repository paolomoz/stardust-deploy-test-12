/**
 * hero — Mercury dark, asymmetric hero (copy left, live product card right).
 *
 * Reads by CELL (not <p>): the EDS pipeline unwraps single <p> in cells (#79),
 * so a querySelectorAll('p') read drops the lede/CTAs on the live build.
 *   - cell with h1/h2     -> page <h1>
 *   - cell with a link     -> CTAs (cloned verbatim; ak.js decorateButton has
 *                             already styled <strong>/<em> wrapped anchors)
 *   - remaining text cell  -> lede
 * The product card on the right is a decorative mock generated here.
 */
export default async function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  let heading;
  let ledeCell;
  let ctaCell;
  cells.forEach((cell) => {
    if (!heading && cell.querySelector('h1, h2, h3')) heading = cell.querySelector('h1, h2, h3');
    else if (!ctaCell && cell.querySelector('a')) ctaCell = cell;
    else if (!ledeCell && cell.textContent.trim()) ledeCell = cell;
  });

  const copy = document.createElement('div');
  copy.className = 'hero-copy';
  if (heading) {
    const h1 = document.createElement('h1');
    h1.innerHTML = heading.innerHTML;
    copy.append(h1);
  }
  if (ledeCell) {
    const p = document.createElement('p');
    p.className = 'hero-lede';
    p.textContent = ledeCell.textContent.trim();
    copy.append(p);
  }
  if (ctaCell) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    copy.append(actions);
  }

  // decorative live-account card (mock)
  const card = document.createElement('div');
  card.className = 'hero-card';
  card.setAttribute('aria-hidden', 'true');
  card.innerHTML = `
    <div class="hc-top"><span>Mercury</span><span>Checking ····4921</span></div>
    <div class="hc-ballabel">Available balance</div>
    <div class="hc-bal">$2,481,930.42</div>
    <div class="hc-rows">
      <div class="hc-row"><span>Treasury yield</span><span class="v">3.61%</span></div>
      <div class="hc-row"><span>Credit cashback</span><span class="v">1.5%</span></div>
      <div class="hc-row"><span>USD wire · global</span><span class="v">No fee</span></div>
    </div>
    <span class="hc-chip"><span class="hc-dot"></span>Live · synced 2s ago</span>`;

  const grid = document.createElement('div');
  grid.className = 'wrap hero-grid';
  grid.append(copy, card);
  block.replaceChildren(grid);
}
