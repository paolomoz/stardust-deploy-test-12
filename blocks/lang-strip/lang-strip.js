/**
 * lang-strip — row of language chips under the hero.
 * Authoring: one cell per chip, e.g. "Spanish", "French", "+ 40 more".
 */
export default async function decorate(block) {
  const items = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const t = cell.textContent.trim();
    if (t) items.push(t);
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const rail = document.createElement('div');
  rail.className = 'chips';
  items.forEach((t) => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = t;
    rail.append(chip);
  });
  wrap.append(rail);
  block.replaceChildren(wrap);
}
