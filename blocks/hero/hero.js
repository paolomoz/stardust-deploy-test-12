/**
 * hero — emotional hook (ElevenLabs lead). Brand-faithful: light Waldenburg
 * headline over warm ground, gradient orbs + audio waveform motif.
 *
 * Authoring (one cell per row): 1 eyebrow · 2 <h1> · 3 lede · 4 CTAs.
 * Read by CELL/textContent (#79) — robust whether the pipeline wraps single-
 * text cells in <p> or not, and to the consolidated single-cell shape (#62).
 */
export default async function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const heading = block.querySelector('h1, h2, h3');
  let ctaCell = null;
  const texts = [];
  cells.forEach((cell) => {
    if (cell.querySelector('h1, h2, h3')) return; // heading cell
    if (cell.querySelector('a')) { ctaCell = ctaCell || cell; return; }
    const t = cell.textContent.trim();
    if (t) texts.push(t);
  });
  const [eyebrowText, ledeText] = texts; // document order: eyebrow, then lede

  const wrap = document.createElement('div');
  wrap.className = 'wrap hero-inner';

  const orbs = document.createElement('div');
  orbs.className = 'orbs';
  orbs.setAttribute('aria-hidden', 'true');
  orbs.innerHTML = '<span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span>';

  if (eyebrowText) {
    const p = document.createElement('p');
    p.className = 'eyebrow';
    p.textContent = eyebrowText;
    wrap.append(p);
  }
  if (heading) wrap.append(heading);
  if (ledeText) {
    const p = document.createElement('p');
    p.className = 'hero-sub';
    p.textContent = ledeText;
    wrap.append(p);
  }

  if (ctaCell && ctaCell.querySelector('a')) {
    const actions = document.createElement('div');
    actions.className = 'actions btn-group';
    [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    wrap.append(actions);
  }

  // audio waveform motif (decorative, sound-made-visible)
  const wave = document.createElement('div');
  wave.className = 'wave';
  wave.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 64; i += 1) {
    const s = document.createElement('span');
    const amp = Math.abs(Math.sin(i * 0.5)) * (0.45 + 0.55 * Math.sin(i * 0.13));
    s.style.height = `${Math.round(16 + 84 * amp)}%`;
    wave.append(s);
  }

  block.replaceChildren(orbs, wrap, wave);
}
