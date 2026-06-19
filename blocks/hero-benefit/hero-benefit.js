/**
 * hero-benefit — one promoted benefit: eyebrow + heading + body + CTA on the
 * left, a large display number on the right.
 *
 * Authoring rows: eyebrow <p>, <h2> (with the number to pull out wrapped in
 * <strong> or written as "10 minutes"), body <p>, CTA <p> (<strong><a>), and a
 * final row "10 | minutes to apply" for the big number (num | label).
 */
function collectRows(block) {
  return [...block.children].map((row) => [...row.children]);
}

export default async function decorate(block) {
  const heading = block.querySelector('h2, h3, h1');
  const ps = [...block.querySelectorAll('p')];
  const eyebrow = ps.find((p) => !p.querySelector('a'));
  const ctaP = ps.find((p) => p.querySelector('a'));
  const body = ps.filter((p) => !p.querySelector('a'))[1];

  // big-number row: last row with two cells where the first is a short number
  const rows = collectRows(block);
  let num = '';
  let numLabel = '';
  rows.forEach((cells) => {
    if (cells.length >= 2 && /^[$\d.]+\+?$/.test(cells[0].textContent.trim())) {
      num = cells[0].textContent.trim();
      numLabel = cells[1].textContent.trim();
    }
  });

  const left = document.createElement('div');
  left.className = 'hb-copy';
  if (eyebrow) { const e = document.createElement('p'); e.className = 'eyebrow'; e.textContent = eyebrow.textContent.trim(); left.append(e); }
  if (heading) { const h = document.createElement('h2'); h.innerHTML = heading.innerHTML; left.append(h); }
  if (body) { body.classList.add('hb-body'); left.append(body); }
  if (ctaP) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    [...ctaP.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    left.append(actions);
  }

  const right = document.createElement('div');
  right.className = 'hb-num';
  right.innerHTML = `${num || '10'}<small>${numLabel || 'minutes to apply'}</small>`;

  const panel = document.createElement('div');
  panel.className = 'hb-panel';
  panel.append(left, right);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.append(panel);
  block.replaceChildren(wrap);
}
