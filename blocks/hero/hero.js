/**
 * hero — Mercury dark, asymmetric hero (copy left, live product card right).
 *
 * Authoring rows (queried, not hard-indexed):
 *   - heading  -> page <h1>
 *   - link-free <p> -> lede
 *   - link-bearing <p> -> CTAs (<strong><a> primary, <em><a> secondary)
 * The product card on the right is a decorative mock generated here (no authored content).
 */
export default async function decorate(block) {
  const h1 = block.querySelector('h1, h2');
  const ps = [...block.querySelectorAll('p')];
  const lede = ps.find((p) => !p.querySelector('a'));
  const ctaP = ps.find((p) => p.querySelector('a'));

  const copy = document.createElement('div');
  copy.className = 'hero-copy';
  if (h1) {
    h1.outerHTML = `<h1>${h1.innerHTML}</h1>`;
    copy.append(block.querySelector('h1'));
  }
  if (lede) { lede.classList.add('hero-lede'); copy.append(lede); }
  if (ctaP) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    [...ctaP.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
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
