/*
 * agents block
 * Authoring (single cell, document order):
 *   <h2>Deploy agents that talk, type, and take action</h2>
 *   <p><strong><a href="/agents">Learn more</a></strong></p>
 *   <p>Configure, deploy and monitor natural, human-sounding agents ...</p>
 *   <h3>Omnichannel agents</h3>
 *   <p>Agents listen, read and respond just like humans would ...</p>
 *   <h3>Analytics</h3>
 *   <p>Easily measure success rates and CX metrics, optimizing flows over time.</p>
 *   <h3>Testing</h3><p>Simulate real-world conversations ...</p>
 *   <h3>Guardrails</h3><p>Establish clear behavioral and compliance rules ...</p>
 *   <h3>Workflows</h3><p>Handle complex conversation flows ...</p>
 *   <p>Deliveroo — Using voice agents to enhance rider and restaurant experience</p>
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

function cardGroups(nodes, titles) {
  return titles.map((h3) => {
    const idx = nodes.indexOf(h3);
    const next = nodes[idx + 1];
    return { title: h3, desc: next && is(next, 'p') ? next : null };
  });
}

function makeChat() {
  const chat = document.createElement('div');
  chat.className = 'agents-chat';
  chat.setAttribute('aria-hidden', 'true');
  const lines = [
    ['in', 'Sure. Can you share your order number please?'],
    ['out', 'It’s X-LR240469'],
    ['in', 'Thank you. I have initiated the order refund process.'],
    ['done', 'Refund completed'],
  ];
  lines.forEach(([kind, text]) => {
    const b = document.createElement('span');
    b.className = `agents-bubble agents-bubble--${kind}`;
    b.textContent = text;
    chat.append(b);
  });
  return chat;
}

function makeChart() {
  const chart = document.createElement('div');
  chart.className = 'agents-chart';
  chart.setAttribute('aria-hidden', 'true');
  const label = document.createElement('span');
  label.className = 'agents-chart-label';
  label.textContent = 'Resolution Rate';
  chart.append(label);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 300 90');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.classList.add('agents-spark');
  const a = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  a.setAttribute('d', 'M0 70 L40 60 L80 65 L120 40 L160 48 L200 30 L240 36 L300 20');
  a.setAttribute('class', 'agents-spark-a');
  const bPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  bPath.setAttribute('d', 'M0 78 L40 72 L80 68 L120 58 L160 60 L200 50 L240 52 L300 44');
  bPath.setAttribute('class', 'agents-spark-b');
  svg.append(a, bPath);
  chart.append(svg);
  return chart;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const nodes = collectNodes(block);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const head = document.createElement('div');
  head.className = 'agents-head';

  const h2 = nodes.find((n) => is(n, 'h2'));
  const learnMore = nodes.find((n) => is(n, 'a'));
  const headRow = document.createElement('div');
  headRow.className = 'agents-head-row';
  if (h2) headRow.append(h2);
  if (learnMore) {
    const actions = document.createElement('div');
    actions.className = 'agents-actions';
    actions.append(learnMore);
    headRow.append(actions);
  }
  head.append(headRow);

  const titles = nodes.filter((n) => is(n, 'h3'));
  const firstH3Idx = titles.length ? nodes.indexOf(titles[0]) : nodes.length;
  const intro = nodes
    .slice(0, firstH3Idx)
    .find((n) => is(n, 'p') && !n.querySelector('a'));
  if (intro) {
    intro.className = 'agents-intro';
    head.append(intro);
  }
  wrap.append(head);

  const groups = cardGroups(nodes, titles);

  const feature = document.createElement('div');
  feature.className = 'agents-feature';

  const left = document.createElement('article');
  left.className = 'agents-card agents-card-omni dark';
  if (groups[0]) {
    left.append(makeChat());
    left.append(groups[0].title);
    if (groups[0].desc) left.append(groups[0].desc);
  }

  const right = document.createElement('article');
  right.className = 'agents-card agents-card-analytics';
  if (groups[1]) {
    right.append(makeChart());
    right.append(groups[1].title);
    if (groups[1].desc) right.append(groups[1].desc);
  }
  feature.append(left, right);
  wrap.append(feature);

  const grid = document.createElement('div');
  grid.className = 'agents-grid';
  groups.slice(2).forEach((g) => {
    const cell = document.createElement('article');
    cell.className = 'agents-tile';
    cell.append(g.title);
    if (g.desc) cell.append(g.desc);
    grid.append(cell);
  });
  wrap.append(grid);

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
    callout.className = 'agents-callout';
    const mark = document.createElement('span');
    mark.className = 'agents-mark';
    mark.setAttribute('aria-hidden', 'true');
    callout.append(mark);
    if (caseNode) {
      caseNode.className = 'agents-case';
      callout.append(caseNode);
    }
    if (ctaNode) {
      const actions = document.createElement('div');
      actions.className = 'agents-callout-actions';
      actions.append(ctaNode);
      callout.append(actions);
    }
    wrap.append(callout);
  }

  absolutize(wrap);
  block.replaceChildren(wrap);
}
