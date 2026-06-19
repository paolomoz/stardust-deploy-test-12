/**
 * Hero block — owns the page's only <h1>.
 *
 * Expected authoring (single cell, elements in document order):
 *   <h1>Bringing technology to life</h1>
 *   <p>Powering the best enterprises, creators, and developers… (subhead)</p>
 *   <p><strong><a href="/app/sign-up">Sign up</a></strong>
 *      <em><a href="/contact-sales">Contact sales</a></em></p>
 *
 * The interactive platform demo (tabs / orbs / pills) is decorative chrome and
 * is rendered as a fixed static scaffold in JS — it is not authored content.
 */

const BASE = 'https://elevenlabs.io';

function absolutize(scope) {
  scope.querySelectorAll('a[href^="/"]').forEach((a) => {
    a.setAttribute('href', `${BASE}${a.getAttribute('href')}`);
  });
}

/** Flatten DA cells into a flat list of child elements (cell-level cascade). */
function collectNodes(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) out.push(...kids);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      out.push(p);
    }
  });
  return out.length ? out : [...block.children];
}

const PLAY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
  + '<path d="M8 5v14l11-7z" fill="currentColor"/></svg>';

function buildDemo() {
  const demo = document.createElement('div');
  demo.className = 'hero-demo';

  // top tab row
  const tabs = document.createElement('div');
  tabs.className = 'hero-tabs';
  [['ElevenCreative', true], ['ElevenAgents', false], ['ElevenAPI', false]]
    .forEach(([label, active]) => {
      const tab = document.createElement('span');
      tab.className = `hero-tab${active ? ' is-active' : ''}`;
      tab.textContent = label;
      tabs.append(tab);
    });

  // orbs
  const orbs = document.createElement('div');
  orbs.className = 'hero-orbs';
  const orbData = [
    { mod: 'side', label: 'Characters', play: false },
    { mod: 'center', label: 'Narration', play: true },
    { mod: 'side', label: 'Conversational', play: false },
  ];
  orbData.forEach(({ mod, label, play }) => {
    const fig = document.createElement('figure');
    fig.className = `hero-orb hero-orb-${mod}`;
    const disc = document.createElement('span');
    disc.className = 'hero-orb-disc';
    if (play) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hero-orb-play';
      btn.setAttribute('aria-label', `Play ${label}`);
      btn.innerHTML = PLAY_ICON;
      disc.append(btn);
    }
    const cap = document.createElement('figcaption');
    cap.className = 'hero-orb-label';
    cap.textContent = label;
    fig.append(disc, cap);
    orbs.append(fig);
  });

  // sub-tab pills + get started
  const pills = document.createElement('div');
  pills.className = 'hero-pills';
  const group = document.createElement('div');
  group.className = 'hero-pill-group';
  ['AI Voice Generator', 'Text to Speech', 'Music', 'Speech to Text', 'Image & Video']
    .forEach((label, i) => {
      const pill = document.createElement('span');
      pill.className = `hero-pill${i === 0 ? ' is-active' : ''}`;
      pill.textContent = label;
      group.append(pill);
    });
  const cta = document.createElement('span');
  cta.className = 'hero-pill hero-pill-cta';
  cta.textContent = 'Get started';
  pills.append(group, cta);

  demo.append(tabs, orbs, pills);
  return demo;
}

/**
 * @param {Element} block
 */
export default async function decorate(block) {
  const nodes = collectNodes(block);

  const heading = nodes.find((n) => n.matches('h1') || n.querySelector('h1'));
  const ctaP = nodes.find((n) => n !== heading && n.querySelector('a'));
  const subhead = nodes.find((n) => n.matches('p')
    && n !== ctaP && n !== heading && !n.querySelector('a') && n.textContent.trim());

  const wrap = document.createElement('div');
  wrap.className = 'hero-wrap';

  const intro = document.createElement('div');
  intro.className = 'hero-intro';

  if (heading) {
    const h1 = heading.matches('h1') ? heading : heading.querySelector('h1');
    h1.classList.add('hero-title');
    intro.append(h1);
  }

  const copy = document.createElement('div');
  copy.className = 'hero-copy';
  if (subhead) {
    subhead.classList.add('hero-subhead');
    copy.append(subhead);
  }
  if (ctaP) {
    const actions = document.createElement('div');
    actions.className = 'hero-actions';
    [...ctaP.querySelectorAll('a')].forEach((a) => {
      actions.append(a.closest('strong, em') || a);
    });
    copy.append(actions);
  }
  intro.append(copy);

  wrap.append(intro, buildDemo());

  block.textContent = '';
  block.append(wrap);
  absolutize(block);
}
