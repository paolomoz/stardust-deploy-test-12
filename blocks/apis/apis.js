/*
 * apis block
 * Authoring (single cell, document order):
 *   <h2>Or build anything with a powerful host of APIs</h2>
 *   <p><a href="/docs/overview/intro">Explore docs</a></p>
 *   <h3>Text to Speech API</h3>
 *   <p>Independently rated the leading Text to Speech models. ...</p>
 *   <h4>Eleven Flash</h4><p>Low latency</p>
 *   <h4>Eleven Multilingual</h4><p>Best lifelike consistent speech</p>
 *   <h4>Eleven v3</h4><p>Our most expressive model yet</p>
 *   <h3>Speech to Text API</h3>
 *   <p>The most accurate ASR model. ...</p>
 *   <h4>Eleven Scribe</h4><p>96% accuracy</p>
 *   <h3>Music API</h3>
 *   <p>Studio-grade music with natural language prompts ...</p>
 *   <h4>Music</h4><p>Trained on licensed data, suitable for commercial use</p>
 *
 * Each <h3> starts an API row. The first <p> after the <h3> is the row
 * description; each following <h4>+<p> pair is a sub-item. Code samples are
 * generated per row (keyed by the row title) — they are not authored.
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

/* Build a static, syntax-coloured code panel from a token list.
 * Each token is [text, kind] where kind maps to a CSS class. */
function makeCode(tokens) {
  const panel = document.createElement('div');
  panel.className = 'apis-code';
  panel.setAttribute('aria-hidden', 'true');
  const pre = document.createElement('pre');
  const code = document.createElement('code');
  tokens.forEach(([text, kind]) => {
    if (!kind) {
      code.append(document.createTextNode(text));
      return;
    }
    const span = document.createElement('span');
    span.className = `apis-tok-${kind}`;
    span.textContent = text;
    code.append(span);
  });
  pre.append(code);
  panel.append(pre);
  return panel;
}

/* token kinds: kw (keyword), str (string), com (comment), fn (function),
 * pun (plain punctuation/identifier handled as default text) */
const SAMPLES = {
  tts: [
    ['import', 'kw'], [' { ElevenLabsClient } ', null], ['from', 'kw'],
    [' ', null], ["'@elevenlabs/elevenlabs-js'", 'str'], [';\n\n', null],
    ['const', 'kw'], [' client ', null], ['=', null], [' ', null],
    ['new', 'kw'], [' ', null], ['ElevenLabsClient', 'fn'], ['({ ', null],
    ['apiKey', null], [': ', null], ["'YOUR_API_KEY'", 'str'], [' });\n\n', null],
    ['const', 'kw'], [' audio ', null], ['=', null], [' ', null],
    ['await', 'kw'], [' client.textToSpeech.', null], ['convert', 'fn'],
    ['(', null], ["'JBFqnCBsd6RMkjVDRZzb'", 'str'], [', {\n', null],
    ['  text', null], [': ', null], ["'The first move is what sets everything in motion.'", 'str'], [',\n', null],
    ['  modelId', null], [': ', null], ["'eleven_multilingual_v2'", 'str'], [',\n', null],
    ['});', null],
  ],
  stt: [
    ['import', 'kw'], [' { ElevenLabsClient } ', null], ['from', 'kw'],
    [' ', null], ["'@elevenlabs/elevenlabs-js'", 'str'], [';\n\n', null],
    ['const', 'kw'], [' client ', null], ['=', null], [' ', null],
    ['new', 'kw'], [' ', null], ['ElevenLabsClient', 'fn'], ['({ ', null],
    ['apiKey', null], [': ', null], ["'YOUR_API_KEY'", 'str'], [' });\n\n', null],
    ['// Transcribe with speaker diarization\n', 'com'],
    ['const', 'kw'], [' transcript ', null], ['=', null], [' ', null],
    ['await', 'kw'], [' client.speechToText.', null], ['convert', 'fn'],
    ['({\n', null],
    ['  modelId', null], [': ', null], ["'scribe_v1'", 'str'], [',\n', null],
    ['  file', null], [': audioFile,\n', null],
    ['  diarize', null], [': ', null], ['true', 'kw'], [',\n', null],
    ['});', null],
  ],
  music: [
    ['import', 'kw'], [' { ElevenLabsClient } ', null], ['from', 'kw'],
    [' ', null], ["'@elevenlabs/elevenlabs-js'", 'str'], [';\n\n', null],
    ['const', 'kw'], [' client ', null], ['=', null], [' ', null],
    ['new', 'kw'], [' ', null], ['ElevenLabsClient', 'fn'], ['({ ', null],
    ['apiKey', null], [': ', null], ["'YOUR_API_KEY'", 'str'], [' });\n\n', null],
    ['const', 'kw'], [' track ', null], ['=', null], [' ', null],
    ['await', 'kw'], [' client.music.', null], ['compose', 'fn'],
    ['({\n', null],
    ['  prompt', null], [': ', null], ["'Warm lo-fi beat with a mellow piano hook'", 'str'], [',\n', null],
    ['  musicLengthMs', null], [': ', null], ['10000', 'str'], [',\n', null],
    ['});', null],
  ],
};

function sampleFor(title) {
  const t = title.toLowerCase();
  if (t.includes('speech to text')) return SAMPLES.stt;
  if (t.includes('music')) return SAMPLES.music;
  return SAMPLES.tts;
}

/* Group flat nodes into API rows keyed by <h3> boundaries. */
function buildRows(nodes) {
  const rows = [];
  let current = null;
  nodes.forEach((n) => {
    if (is(n, 'h3')) {
      current = { title: n, desc: null, items: [] };
      rows.push(current);
      return;
    }
    if (!current) return;
    if (is(n, 'h4')) {
      current.items.push({ title: n, desc: null });
      return;
    }
    if (is(n, 'p')) {
      const last = current.items[current.items.length - 1];
      if (last && !last.desc) last.desc = n;
      else if (!current.desc) current.desc = n;
    }
  });
  return rows;
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
  head.className = 'apis-head';

  const h2 = nodes.find((n) => is(n, 'h2'));
  const docsLink = nodes.find((n) => is(n, 'a'));
  if (h2) head.append(h2);
  if (docsLink) {
    const a = is(docsLink, 'a') ? docsLink.closest('a') || docsLink.querySelector('a') : docsLink;
    a.classList.add('apis-doclink');
    const arrow = document.createElement('span');
    arrow.className = 'apis-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    a.append(arrow);
    head.append(a);
  }
  wrap.append(head);

  // The docs link may have been the same node we appended to head; rebuild row
  // set from the remaining content nodes (those at/after the first <h3>).
  const firstH3 = nodes.find((n) => is(n, 'h3'));
  const startIdx = firstH3 ? nodes.indexOf(firstH3) : nodes.length;
  const rows = buildRows(nodes.slice(startIdx));

  const list = document.createElement('div');
  list.className = 'apis-list';

  rows.forEach((row) => {
    const article = document.createElement('article');
    article.className = 'apis-row';

    const left = document.createElement('div');
    left.className = 'apis-row-left';
    row.title.classList.add('apis-row-title');
    left.append(row.title);
    if (row.desc) {
      row.desc.className = 'apis-row-desc';
      left.append(row.desc);
    }
    if (row.items.length) {
      const items = document.createElement('div');
      items.className = 'apis-items';
      row.items.forEach((it) => {
        const item = document.createElement('div');
        item.className = 'apis-item';
        it.title.classList.add('apis-item-title');
        item.append(it.title);
        if (it.desc) {
          it.desc.className = 'apis-item-desc';
          item.append(it.desc);
        }
        items.append(item);
      });
      left.append(items);
    }

    const right = document.createElement('div');
    right.className = 'apis-row-right';
    right.append(makeCode(sampleFor(row.title.textContent)));

    article.append(left, right);
    list.append(article);
  });

  // Assert: expected three API rows.
  if (rows.length !== 3) {
    list.dataset.rowCount = String(rows.length);
  }

  wrap.append(list);
  absolutize(wrap);
  block.replaceChildren(wrap);
}
