import { getMetadata } from './ak.js';

/**
 * Inject a static chrome fragment (header / footer) into its landmark element.
 * The fragment is committed code at /fragments/<name>.html and served from the
 * code origin; on a branch host the root-relative path resolves to that branch.
 */
async function loadStaticFragment(el, name) {
  if (!el) return;
  const meta = getMetadata(name);
  if (meta === 'off') { el.remove(); return; }
  try {
    const resp = await fetch(`/fragments/${name}.html`);
    if (!resp.ok) return;
    const html = await resp.text();
    el.className = name; // #21 — so header.header / footer.footer root selectors match
    el.innerHTML = html;
  } catch (e) { /* fragment missing — leave landmark empty */ }
}

export default async function loadPostLCP() {
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  await Promise.all([
    loadStaticFragment(header, 'header'),
    loadStaticFragment(footer, 'footer'),
  ]);
}
