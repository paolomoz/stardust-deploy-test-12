import ENV from './utils/env.js';

async function loadSidekick() {
  const getSk = () => document.querySelector('aem-sidekick');

  const sk = getSk() || await new Promise((resolve) => {
    document.addEventListener('sidekick-ready', () => resolve(getSk()));
  });
  if (sk) import('../tools/sidekick/sidekick.js').then((mod) => mod.default(sk));
}

(function loadLazy() {
  import('./utils/lazyhash.js');
  import('./utils/favicon.js');
  // #4: footer loads as a STATIC fragment in postlcp.js, not as a block.
  // The stock utils/footer.js does loadBlock(footer) and collides with the
  // static footer fragment (renders an "Error" box; no blocks/footer exists).

  // Author facing tools
  if (ENV !== 'prod') {
    import('../tools/scheduler/scheduler.js');
    loadSidekick();
  }
}());
