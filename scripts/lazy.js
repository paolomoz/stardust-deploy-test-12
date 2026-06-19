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
  // #4 — footer is a static fragment (postlcp.js), not a block; do NOT load utils/footer.js
  //       (loadBlock(footer) collides with the static fragment and renders an error box)

  // Author facing tools
  if (ENV !== 'prod') {
    import('../tools/scheduler/scheduler.js');
    loadSidekick();
  }
}());
