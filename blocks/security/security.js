/**
 * security — enterprise-readiness band: copy + compliance badges.
 *
 * Authoring rows:
 *   1. eyebrow      e.g. "Enterprise-ready"
 *   2. heading      -> <h2>
 *   3. badges       comma-separated list e.g. "SOC 2 Type II, GDPR, SSO / SAML, HIPAA, PII DPAs"
 */

function t(cell) { return cell ? cell.textContent.trim() : ''; }

export default async function decorate(block) {
  const rows = [...block.children];
  const eyebrow = t(rows[0]?.firstElementChild);
  const headingCell = rows[1]?.firstElementChild;
  const badgesRaw = t(rows[2]?.firstElementChild);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const grid = document.createElement('div');
  grid.className = 'sec-grid';

  const copy = document.createElement('div');
  copy.className = 'sec-copy';
  if (eyebrow) copy.innerHTML += `<span class="eyebrow">${eyebrow}</span>`;
  const h = document.createElement('h2');
  const inner = headingCell?.querySelector('h1,h2,h3,h4,h5,h6') || headingCell;
  if (inner) [...inner.childNodes].forEach((n) => h.append(n.cloneNode(true)));
  copy.append(h);

  const badges = document.createElement('div');
  badges.className = 'sec-badges';
  badgesRaw.split(/[,·|]/).map((s) => s.trim()).filter(Boolean).forEach((b) => {
    badges.innerHTML += `<span class="badge"><span class="c"></span>${b}</span>`;
  });

  grid.append(copy, badges);
  wrap.append(grid);
  block.replaceChildren(wrap);
}
