/*
 * research block
 * Authoring (single cell, document order):
 *   <h2>Research that redefines human technology interaction</h2>
 *   <p>Our vision is to make communication and creation ...</p>   (intro)
 *   <h3>Eleven Multilingual v2</h3>
 *   <h3>Eleven Turbo v2</h3>
 *   ... (11 timeline milestones as <h3>, document order = oldest → newest)
 *   <h3>Dubbing v2</h3>
 *   <h3>Advancing research beyond voice into transcription, music, ...</h3>  (bottom blurb)
 *   <p><strong><a href="/about">Learn more</a></strong></p>
 *   <p><a href="/blog/introducing-scribe-v2">Introducing Scribe v2</a></p>
 *   <p><a href="/blog/eleven-music-is-here">Eleven Music is here</a></p>
 *
 * The 11 short <h3> entries become timeline ticks (last = active). The long
 * <h3> is the bottom-left blurb. The two trailing blog links become gradient
 * release cards. The callout copy + dates are not authored (static here).
 */

const ORIGIN = 'https://elevenlabs.io';

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

function absolutize(scope) {
  scope.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('/')) a.href = ORIGIN + href;
  });
}

const is = (n, sel) => n && (n.matches(sel) || !!n.querySelector(sel));

/* Per-milestone callout copy + date. Keyed by milestone label. The active
 * (last) milestone is highlighted; clicking a tick swaps the callout. */
const MILESTONE_META = {
  'Dubbing v2': {
    date: 'May 2026',
    note: 'For the first time, the emotion and performance of the original speaker carries across every language.',
  },
};

function makeArrow(dir) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `research-arrow research-arrow-${dir}`;
  btn.setAttribute('aria-label', dir === 'prev' ? 'Previous milestone' : 'Next milestone');
  btn.textContent = dir === 'prev' ? '‹' : '›';
  return btn;
}

/* Builds the static timeline panel from the milestone titles. */
function buildTimeline(milestones) {
  const panel = document.createElement('div');
  panel.className = 'research-panel';

  const arrowPrev = makeArrow('prev');
  const arrowNext = makeArrow('next');

  const stage = document.createElement('div');
  stage.className = 'research-stage';

  const label = document.createElement('p');
  label.className = 'research-active-label';

  const axis = document.createElement('div');
  axis.className = 'research-axis';
  axis.setAttribute('role', 'list');

  const callout = document.createElement('div');
  callout.className = 'research-callout';
  const note = document.createElement('p');
  note.className = 'research-note';
  const date = document.createElement('p');
  date.className = 'research-date';
  callout.append(note, date);

  const last = milestones.length - 1;

  function activate(idx) {
    const tick = axis.children[idx];
    if (!tick) return;
    [...axis.children].forEach((t) => t.classList.remove('is-active'));
    tick.classList.add('is-active');
    const name = tick.dataset.label;
    label.textContent = name;
    const meta = MILESTONE_META[name] || {};
    note.textContent = meta.note || '';
    date.textContent = meta.date || '';
    callout.style.left = `${tick.dataset.pct}%`;
    label.style.left = `${tick.dataset.pct}%`;
  }

  milestones.forEach((m, i) => {
    const tick = document.createElement('button');
    tick.type = 'button';
    tick.className = 'research-tick';
    tick.setAttribute('role', 'listitem');
    tick.dataset.label = m.textContent.trim();
    tick.dataset.pct = String(((i + 0.5) / milestones.length) * 100);
    tick.setAttribute('aria-label', m.textContent.trim());
    if (i === last) tick.classList.add('is-active');
    tick.addEventListener('click', () => activate(i));
    axis.append(tick);
  });

  arrowPrev.addEventListener('click', () => {
    const cur = [...axis.children].findIndex((t) => t.classList.contains('is-active'));
    activate(Math.max(0, cur - 1));
  });
  arrowNext.addEventListener('click', () => {
    const cur = [...axis.children].findIndex((t) => t.classList.contains('is-active'));
    activate(Math.min(last, cur + 1));
  });

  stage.append(label, axis, callout);
  panel.append(arrowPrev, stage, arrowNext);

  // initialise to the last (active) milestone
  activate(last);
  return panel;
}

/* Two gradient release cards built from the trailing blog links. */
const CARD_META = [
  { match: 'scribe', date: 'Jan 2026', variant: 'cool' },
  { match: 'music', date: 'Aug 2025', variant: 'warm' },
];

function buildCard(link, meta) {
  const card = document.createElement('a');
  card.className = `research-card research-card-${meta.variant}`;
  card.href = link.getAttribute('href') || '#';

  const pill = document.createElement('span');
  pill.className = 'research-card-date';
  pill.textContent = meta.date;

  const body = document.createElement('span');
  body.className = 'research-card-body';
  body.setAttribute('aria-hidden', 'true');

  const title = document.createElement('span');
  title.className = 'research-card-title';
  title.textContent = link.textContent.trim();

  card.append(pill, body, title);
  return card;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const nodes = collectNodes(block);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  // ---- header: H2 (left) + intro paragraph (right)
  const head = document.createElement('div');
  head.className = 'research-head';
  const h2 = nodes.find((n) => is(n, 'h2'));
  const intro = nodes.find((n) => is(n, 'p') && !n.querySelector('a') && n.textContent.trim());
  if (h2) head.append(h2);
  if (intro) {
    intro.className = 'research-intro';
    head.append(intro);
  }
  wrap.append(head);

  // ---- milestones: short <h3> entries (exclude the long bottom blurb)
  const h3s = nodes.filter((n) => is(n, 'h3'));
  const milestones = h3s.filter((n) => n.textContent.trim().length <= 40);
  const blurb = h3s.find((n) => n.textContent.trim().length > 40);

  wrap.append(buildTimeline(milestones));

  // ---- bottom row: blurb + Learn more (left) / two release cards (right)
  const bottom = document.createElement('div');
  bottom.className = 'research-bottom';

  const bottomLeft = document.createElement('div');
  bottomLeft.className = 'research-bottom-left';
  if (blurb) {
    blurb.className = 'research-blurb';
    bottomLeft.append(blurb);
  }
  const learnMore = nodes.find((n) => is(n, 'a') && /learn more/i.test(n.textContent));
  if (learnMore) {
    const a = learnMore.closest('a') || learnMore.querySelector('a');
    a.classList.add('research-pill');
    const arrow = document.createElement('span');
    arrow.className = 'research-pill-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '›';
    a.append(arrow);
    bottomLeft.append(a);
  }

  const cards = document.createElement('div');
  cards.className = 'research-cards';
  const cardLinks = nodes.filter(
    (n) => is(n, 'a') && n !== learnMore && /scribe|music/i.test(n.textContent),
  );
  CARD_META.forEach((meta) => {
    const link = cardLinks.find((l) => l.textContent.toLowerCase().includes(meta.match));
    if (link) {
      const a = link.closest('a') || link.querySelector('a');
      cards.append(buildCard(a, meta));
    }
  });

  // Assert: expected 2 release cards and 11 timeline ticks.
  if (cards.children.length !== 2) cards.dataset.cardCount = String(cards.children.length);

  bottom.append(bottomLeft, cards);
  wrap.append(bottom);

  absolutize(wrap);
  block.replaceChildren(wrap);
}
