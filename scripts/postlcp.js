import { getConfig, getMetadata } from './ak.js';

/**
 * Load a static chrome fragment (header/footer) and inject it verbatim.
 * The class MUST be set before injection so the fragment's own root selector
 * (e.g. `footer.footer { background: … }`) matches (#21).
 * @param {HTMLElement} el the host element (<header> or <footer>)
 * @param {string} name the fragment name (header|footer)
 */
async function loadStaticFragment(el, name) {
  const { codeBase } = getConfig();
  try {
    const resp = await fetch(`${codeBase}/fragments/${name}.html`);
    if (!resp.ok) return;
    const html = await resp.text();
    el.className = name;
    el.innerHTML = html;
    el.dataset.status = 'decorated';
  } catch (ex) {
    // chrome is non-critical; never block the page on it
  }
}

export default async function loadPostLCP() {
  const header = document.querySelector('header');
  if (header && getMetadata('header') !== 'off') {
    await loadStaticFragment(header, 'header');
  }
  const footer = document.querySelector('footer');
  if (footer && getMetadata('footer') !== 'off') {
    await loadStaticFragment(footer, 'footer');
  }
}
