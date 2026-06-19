/*
 * creative block
 * Authoring (single cell, document order):
 *   <h2>Create, edit and localize in one AI platform</h2>
 *   <p><strong><a href="/creative">Learn more</a></strong></p>
 *   <p>Create ultra-realistic speech, turn ideas into videos, ...</p>
 *   <h3>All-in-one AI editor</h3>
 *   <p>Create podcasts, audiobooks and voiceovers ...</p>
 *   <h3>Ultra-realistic speech</h3>
 *   <p>Create comfortable, expressive speech layered across 70+ languages</p>
 *   <h3>Music</h3><p>Generate studio-quality tracks instantly ...</p>
 *   <h3>SFX</h3><p>Create custom sound effects ...</p>
 *   <h3>Voices</h3><p>Clone a replica of your own voice ...</p>
 *   <h3>Image & Video</h3><p>Create or edit images ...</p>
 *   <p>Clay — Using synthetic voice technology to power multilingual marketing content</p>
 *   <p><strong><a href="/app/sign-up">Get started</a></strong></p>
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

/* groups nodes into [{title:h3, desc:p}] starting at the first h3 */
function cardGroups(nodes, titles) {
  return titles.map((h3) => {
    const idx = nodes.indexOf(h3);
    const next = nodes[idx + 1];
    return { title: h3, desc: next && is(next, 'p') ? next : null };
  });
}

function makeWaveform() {
  const wrap = document.createElement('div');
  wrap.className = 'creative-waveform';
  wrap.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 28; i += 1) {
    const bar = document.createElement('span');
    wrap.append(bar);
  }
  return wrap;
}

function makeSpeechStrip() {
  const strip = document.createElement('div');
  strip.className = 'creative-strip';
  strip.setAttribute('aria-hidden', 'true');
  ['English', 'Spuds Oxley', 'Play'].forEach((label, i) => {
    const pill = document.createElement('span');
    pill.className = `creative-pill${i === 2 ? ' creative-pill-play' : ''}`;
    pill.textContent = label;
    strip.append(pill);
  });
  return strip;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const nodes = collectNodes(block);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  // header: h2 + Learn more link + intro paragraph
  const head = document.createElement('div');
  head.className = 'creative-head';

  const h2 = nodes.find((n) => is(n, 'h2'));
  const learnMore = nodes.find((n) => is(n, 'a'));
  const headRow = document.createElement('div');
  headRow.className = 'creative-head-row';
  if (h2) headRow.append(h2);
  if (learnMore) {
    const actions = document.createElement('div');
    actions.className = 'creative-actions';
    actions.append(learnMore);
    headRow.append(actions);
  }
  head.append(headRow);

  const titles = nodes.filter((n) => is(n, 'h3'));
  // intro = first p that is not inside head links and appears before first h3
  const firstH3Idx = titles.length ? nodes.indexOf(titles[0]) : nodes.length;
  const intro = nodes
    .slice(0, firstH3Idx)
    .find((n) => is(n, 'p') && !n.querySelector('a'));
  if (intro) {
    intro.className = 'creative-intro';
    head.append(intro);
  }
  wrap.append(head);

  const groups = cardGroups(nodes, titles);

  // First two h3 groups are the big feature cards.
  const feature = document.createElement('div');
  feature.className = 'creative-feature';

  const left = document.createElement('article');
  left.className = 'creative-card creative-card-editor dark';
  if (groups[0]) {
    left.append(groups[0].title);
    if (groups[0].desc) left.append(groups[0].desc);
  }
  left.append(makeWaveform());

  const right = document.createElement('article');
  right.className = 'creative-card creative-card-speech';
  right.append(makeSpeechStrip());
  if (groups[1]) {
    right.append(groups[1].title);
    if (groups[1].desc) right.append(groups[1].desc);
  }
  feature.append(left, right);
  wrap.append(feature);

  // Remaining groups (Music / SFX / Voices / Image & Video) -> 4-up grid.
  const grid = document.createElement('div');
  grid.className = 'creative-grid';
  groups.slice(2).forEach((g) => {
    const cell = document.createElement('article');
    cell.className = 'creative-tile';
    cell.append(g.title);
    if (g.desc) cell.append(g.desc);
    grid.append(cell);
  });
  wrap.append(grid);

  // Case callout: the trailing p (text, has Clay link) + Get started CTA.
  // Exclude everything already consumed: h2, intro, learn-more, and every
  // card title + description paragraph.
  const used = new Set([h2, intro, learnMore]);
  groups.forEach((g) => {
    used.add(g.title);
    if (g.desc) used.add(g.desc);
  });
  const remaining = nodes.filter((n) => !used.has(n));
  const ctaNode = remaining.find((n) => is(n, 'a') && /get started/i.test(n.textContent));
  const caseNode = remaining.find(
    (n) => n !== ctaNode && is(n, 'p') && n.textContent.trim(),
  );

  if (caseNode || ctaNode) {
    const callout = document.createElement('div');
    callout.className = 'creative-callout';
    const mark = document.createElement('span');
    mark.className = 'creative-mark';
    mark.setAttribute('aria-hidden', 'true');
    callout.append(mark);
    if (caseNode) {
      caseNode.className = 'creative-case';
      callout.append(caseNode);
    }
    if (ctaNode) {
      const actions = document.createElement('div');
      actions.className = 'creative-callout-actions';
      actions.append(ctaNode);
      callout.append(actions);
    }
    wrap.append(callout);
  }

  absolutize(wrap);
  block.replaceChildren(wrap);
}
