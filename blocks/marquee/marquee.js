/**
 * marquee — kinetic-display signage band (decorative brand rhythm).
 *
 * Authoring: one cell, a single line of terms separated by " · ".
 * Terms wrapped in <strong> render solid; others render as outlined display type.
 * The whole band is aria-hidden; it duplicates content for a seamless infinite
 * scroll only when reduced-motion is not preferred (static otherwise).
 */

export default async function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  const raw = cell ? cell.textContent.trim() : '';
  block.setAttribute('aria-hidden', 'true');

  const terms = raw.split('·').map((t) => t.trim()).filter(Boolean);

  const track = document.createElement('div');
  track.className = 'marquee-track';

  const buildItems = (target) => {
    terms.forEach((term, idx) => {
      const span = document.createElement('span');
      // alternate solid / outlined for signage texture
      if (idx % 3 === 0) span.className = 'solid';
      span.textContent = term;
      target.append(span);
      const sep = document.createElement('span');
      sep.textContent = '·';
      target.append(sep);
    });
  };
  buildItems(track);

  block.replaceChildren(track);

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    buildItems(track); // duplicate for a seamless -50% loop
    track.classList.add('kin');
  }
}
