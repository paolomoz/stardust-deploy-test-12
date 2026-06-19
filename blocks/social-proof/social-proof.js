/**
 * social-proof — trust strip. Authoring:
 *   row 1: label text ("Trusted by leading developers and enterprises")
 *   rows 2..N: one brand name per row
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const label = document.createElement('p');
  label.className = 'proof-h';
  label.textContent = (rows[0]?.textContent || '').trim();
  const logos = document.createElement('div');
  logos.className = 'logos';
  rows.slice(1).forEach((r) => {
    const name = (r.textContent || '').trim();
    if (!name) return;
    const chip = document.createElement('span');
    chip.className = 'logo-chip';
    chip.textContent = name;
    logos.append(chip);
  });
  wrap.append(label, logos);
  block.replaceChildren(wrap);
}
