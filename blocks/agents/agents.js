/**
 * agents — ElevenAgents capability grid (dark cards).
 * Authoring (one cell per row):
 *   1: eyebrow   2: <h2> heading   3: subcopy   4..N: one capability name per row
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = (rows[0]?.textContent || '').trim();
  const heading = rows[1]?.querySelector('h1,h2,h3') || document.createElement('h2');
  if (!heading.textContent) heading.textContent = (rows[1]?.textContent || '').trim();
  heading.classList.add('section-h');
  const sub = document.createElement('p');
  sub.className = 'section-sub';
  sub.textContent = (rows[2]?.textContent || '').trim();
  wrap.append(eyebrow, heading);
  if (sub.textContent) wrap.append(sub);

  const grid = document.createElement('div');
  grid.className = 'card-grid five';
  rows.slice(3).forEach((row) => {
    const name = (row.textContent || '').trim();
    if (!name) return;
    const card = document.createElement('article');
    card.className = 'cap dark';
    const h4 = document.createElement('h4');
    h4.textContent = name;
    card.append(h4);
    grid.append(card);
  });
  wrap.append(grid);
  block.replaceChildren(wrap);
}
