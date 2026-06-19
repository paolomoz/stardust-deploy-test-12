/**
 * team — eyebrow + heading, a 3-up member grid, then a "Build with us." hiring block.
 *
 * Authoring (DA-flattened — members are portrait-led groups):
 *   head     : eyebrow ("05 — Our team") + heading -> <h2>
 *   member×3 : <img> portrait, role line, name (<h3>), then social links (<a>×2)
 *   hiring   : trailing group — a heading ("Build with us.") with NO portrait,
 *              followed by 2 paragraphs (mailto + a Medium link).
 *
 * Segmentation: each <picture>/<img> opens a member card; the first heading-led
 * run with no preceding image (and after all images) is the hiring block.
 */

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

const isMedia = (n) => n.matches('picture, img') || n.querySelector('picture, img');
const isHeading = (n) => n.matches('h1,h2,h3,h4,h5,h6') || n.querySelector('h1,h2,h3,h4,h5,h6');
const isLink = (n) => n.matches('a') || n.querySelector('a');
function buildEyebrow(srcEl) {
  const raw = srcEl.textContent.trim();
  const p = document.createElement('p');
  p.className = 'eyebrow';
  const m = raw.match(/^\s*(\d+)\s*(—|–|-)?\s*(.*)$/);
  if (m && m[1]) {
    const num = document.createElement('span');
    num.className = 'eyebrow__num';
    [, num.textContent] = m;
    p.append(num);
    p.append(document.createTextNode(m[3] ? ` — ${m[3]}` : ''));
  } else {
    p.textContent = raw;
  }
  return p;
}

export default async function decorate(block) {
  const nodes = collectNodes(block);

  // head = leading nodes up to (but not including) the first portrait
  const firstMediaIdx = nodes.findIndex(isMedia);
  const headNodes = firstMediaIdx === -1 ? nodes.slice() : nodes.slice(0, firstMediaIdx);
  const rest = firstMediaIdx === -1 ? [] : nodes.slice(firstMediaIdx);

  const headEyebrow = headNodes.find((n) => !isHeading(n) && n.textContent.trim());
  const headHeading = headNodes.find(isHeading);

  // segment rest: a media node opens a member; once we hit a heading with no
  // image in its group, the remainder is the hiring block.
  const members = [];
  let hiringNodes = [];
  let cur = null;
  rest.forEach((n) => {
    if (isMedia(n)) {
      cur = [n];
      members.push(cur);
    } else if (cur) {
      cur.push(n);
    } else {
      hiringNodes.push(n);
    }
  });
  // If a heading appears in a member group AFTER its socials with no own image,
  // the prototype keeps hiring strictly after the last member's links — detect a
  // trailing heading group inside the last member and split it out.
  if (members.length) {
    const last = members[members.length - 1];
    const hidx = last.findIndex((n, i) => i > 0 && isHeading(n)
      && last.slice(0, i).some(isLink));
    if (hidx > 0) {
      hiringNodes = last.splice(hidx);
    }
  }

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const head = document.createElement('div');
  head.className = 'section__head';
  if (headEyebrow) head.append(buildEyebrow(headEyebrow));
  if (headHeading) {
    const h2 = document.createElement('h2');
    h2.className = 'headline';
    const hInner = headHeading.matches('h1,h2,h3,h4,h5,h6')
      ? headHeading : (headHeading.querySelector('h1,h2,h3,h4,h5,h6') || headHeading);
    [...hInner.childNodes].forEach((n) => h2.append(n.cloneNode(true)));
    head.append(h2);
  }
  wrap.append(head);

  const grid = document.createElement('ul');
  grid.className = 'team__grid';
  grid.setAttribute('role', 'list');

  members.forEach((group) => {
    const li = document.createElement('li');
    li.className = 'member';

    const mediaNode = group.find(isMedia);
    if (mediaNode) {
      const img = mediaNode.matches('img') ? mediaNode : mediaNode.querySelector('img');
      const pic = mediaNode.matches('picture') ? mediaNode : mediaNode.querySelector('picture');
      const m = (pic || img).cloneNode(true);
      const realImg = m.matches('img') ? m : m.querySelector('img');
      if (realImg) realImg.classList.add('member__photo');
      li.append(m);
    }

    const headingNode = group.find(isHeading);
    const links = group.filter(isLink);
    // role = a text node that's neither heading nor link
    const roleNode = group.find((n) => n !== mediaNode && !isHeading(n) && !isLink(n)
      && n.textContent.trim());
    if (roleNode) {
      const role = document.createElement('p');
      role.className = 'member__role';
      role.textContent = roleNode.textContent.trim();
      li.append(role);
    }
    if (headingNode) {
      const h3 = document.createElement('h3');
      h3.className = 'title member__name';
      const hInner = headingNode.matches('h1,h2,h3,h4,h5,h6')
        ? headingNode : (headingNode.querySelector('h1,h2,h3,h4,h5,h6') || headingNode);
      [...hInner.childNodes].forEach((n) => h3.append(n.cloneNode(true)));
      li.append(h3);
    }
    if (links.length) {
      const social = document.createElement('div');
      social.className = 'member__social';
      links.forEach((srcLink) => {
        const a = (srcLink.matches('a') ? srcLink : srcLink.querySelector('a')).cloneNode(true);
        a.classList.add('lnk');
        social.append(a);
      });
      li.append(social);
    }
    grid.append(li);
  });
  wrap.append(grid);

  if (hiringNodes.length) {
    const hiring = document.createElement('div');
    hiring.className = 'hiring';
    hiringNodes.forEach((n) => {
      if (isHeading(n)) {
        const h3 = document.createElement('h3');
        const hInner = n.matches('h1,h2,h3,h4,h5,h6')
          ? n : (n.querySelector('h1,h2,h3,h4,h5,h6') || n);
        [...hInner.childNodes].forEach((c) => h3.append(c.cloneNode(true)));
        hiring.append(h3);
      } else if (n.textContent.trim()) {
        const p = document.createElement('p');
        const inner = n.matches('p') ? n : (n.querySelector('p') || n);
        [...inner.childNodes].forEach((c) => p.append(c.cloneNode(true)));
        p.querySelectorAll('a').forEach((a) => a.classList.add('lnk'));
        hiring.append(p);
      }
    });
    wrap.append(hiring);
  }

  block.replaceChildren(wrap);

  // entrance reveal
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    const items = [head, ...grid.children, ...(hiringNodes.length ? [wrap.querySelector('.hiring')] : [])];
    items.forEach((el) => el && el.classList.add('na-anim'));
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('na-in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    items.forEach((el) => el && io.observe(el));
  }
}
