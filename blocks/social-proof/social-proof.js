/**
 * social-proof — dark band: heading + customer-logo wordmark strip + up to 3
 * testimonial cards.
 *
 * Authoring: <h2> heading; one row of comma/pipe-listed logo names; then one
 * row per testimonial holding a <blockquote> (or <p>) quote + an attribution
 * line "Name — Role". Unverified quotes are authored as a [data-placeholder]
 * blockquote and rendered with the placeholder signature.
 */
function collectRows(block) {
  return [...block.children].map((row) => [...row.children]);
}

export default async function decorate(block) {
  const heading = block.querySelector('h2, h1');
  const rows = collectRows(block);

  let logos = [];
  const testimonials = [];

  rows.forEach((cells) => {
    const cell = cells[cells.length - 1];
    if (!cell) return;
    const txt = cell.textContent.trim();
    if (cell.querySelector('h1, h2')) return; // heading row
    const quote = cell.querySelector('blockquote, p');
    const isPlaceholder = cell.querySelector('[data-placeholder]') || /^PLACEHOLDER/i.test(txt);
    if (cells.length >= 2 && (cell.previousElementSibling || cells[0]) && quote && /—|–|,/.test(cells.length > 1 ? cells[cells.length - 1].textContent : '')) {
      // fall through to generic below
    }
    if (quote && (txt.includes('"') || txt.includes('“') || isPlaceholder || cells.length >= 2)) {
      const attrCell = cells.length >= 2 ? cells[cells.length - 1] : null;
      testimonials.push({ quoteHTML: quote.outerHTML, attr: attrCell && attrCell !== cell ? attrCell.textContent.trim() : '', placeholder: !!isPlaceholder });
    } else if (txt && /,|\|/.test(txt) && logos.length === 0) {
      logos = txt.split(/[,|]/).map((s) => s.trim()).filter(Boolean);
    }
  });

  // re-scan for testimonial cards authored as two-cell rows (quote | attribution)
  if (!testimonials.length) {
    rows.forEach((cells) => {
      const q = cells[0] && cells[0].querySelector('blockquote, p');
      if (q && cells.length >= 2) {
        testimonials.push({ quoteHTML: q.outerHTML, attr: cells[1].textContent.trim(), placeholder: !!cells[0].querySelector('[data-placeholder]') });
      }
    });
  }

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (heading) { const h = document.createElement('h2'); h.innerHTML = heading.innerHTML; wrap.append(h); }

  if (logos.length) {
    const strip = document.createElement('div');
    strip.className = 'sp-logos';
    logos.forEach((name) => { const s = document.createElement('span'); s.textContent = name; strip.append(s); });
    wrap.append(strip);
  }

  if (testimonials.length) {
    const grid = document.createElement('div');
    grid.className = 'sp-testi';
    testimonials.forEach((t) => {
      const card = document.createElement('div');
      card.className = 'sp-card';
      const [name, ...rest] = t.attr.split(/—|–/);
      card.innerHTML = `
        <blockquote class="${t.placeholder ? 'sp-placeholder' : ''}">${t.placeholder ? '<span class="sp-pe">PLACEHOLDER · quote</span>' : ''}${t.quoteHTML.replace(/<\/?blockquote[^>]*>/g, '')}</blockquote>
        <div class="sp-who"><span class="sp-av"></span><div><b>${(name || '').trim()}</b><span>${rest.join('—').trim()}</span></div></div>`;
      grid.append(card);
    });
    wrap.append(grid);
  }

  block.replaceChildren(wrap);
}
