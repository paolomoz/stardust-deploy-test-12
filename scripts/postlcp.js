import { getConfig, getMetadata } from './ak.js';

/**
 * Inject a static chrome fragment (header / footer) into its host element.
 *
 * The fragment is fetched from the code origin (`codeBase`) and injected via
 * innerHTML — it carries its own <style> + DOM and runs no JavaScript.
 *
 * #21: set the host element's class to the fragment name BEFORE injecting, so
 * the fragment's own root selector (`footer.footer { background: … }`) matches.
 * Without this the footer's root styling (background/padding) silently no-ops —
 * ak.js classes the <header> in decorateHeader() but never touches the <footer>.
 */
async function loadStaticFragment(el, name) {
  const meta = getMetadata(name);
  if (meta === 'off') {
    el.remove();
    return;
  }
  const { codeBase } = getConfig();
  const resp = await fetch(`${codeBase}/fragments/${name}.html`);
  if (!resp.ok) return;
  const html = await resp.text();
  el.className = name; // #21 — so header.header / footer.footer match
  el.innerHTML = html;
}

export default async function loadPostLCP() {
  const header = document.querySelector('header');
  if (header) await loadStaticFragment(header, 'header');
  const footer = document.querySelector('footer');
  if (footer) await loadStaticFragment(footer, 'footer');
}
