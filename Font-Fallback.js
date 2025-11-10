// File: setFontsFallback-safe.js
(function() {
  const sfTextFamily = `"SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif`;
  const sfDisplayFamily = `"SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif`;
  const FONT_LOAD_TIMEOUT = 1200; // ms

  // CSS iniziale: fallback system-ui per ridurre FOUT visibile
  const initialCSS = `
    .sf-pro-text, .sf-pro-display {
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
      transition: none !important;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .wf-sf-loaded .sf-pro-text { font-family: ${sfTextFamily} !important; }
    .wf-sf-loaded .sf-pro-display { font-family: ${sfDisplayFamily} !important; }
  `;

  // inietta style il prima possibile
  (function injectStyle() {
    if (document.getElementById('wf-font-fallback-style')) return;
    const s = document.createElement('style');
    s.id = 'wf-font-fallback-style';
    s.appendChild(document.createTextNode(initialCSS));
    (document.head || document.documentElement).appendChild(s);
  })();

  // prova a caricare i font con la Font Loading API
  function tryLoadFonts(timeout=FONT_LOAD_TIMEOUT) {
    if (!('fonts' in document)) return Promise.resolve(false);

    const loads = [
      document.fonts.load('1em "SF Pro Text"'),
      document.fonts.load('1em "SF Pro Display"'),
      document.fonts.load('700 1em "SF Pro Display"')
    ];

    const all = Promise.allSettled(loads);
    const timer = new Promise(resolve => setTimeout(() => resolve('timeout'), timeout));

    return Promise.race([all, timer]).then(result => {
      if (result === 'timeout') return false;
      // se almeno una load è stata fulfilled, consideriamo OK (migliora UX)
      return result.every(r => r.status === 'fulfilled') || result.some(r => r.status === 'fulfilled');
    }).catch(()=>false);
  }

  // attiva la classe quando i font sono pronti
  function activateIfLoaded() {
    tryLoadFonts().then(loaded => {
      if (loaded) {
        document.documentElement.classList.add('wf-sf-loaded');
      } else {
        // se non caricano entro timeout, non facciamo swap forzato
        // proviamo in background e attiviamo se arrivano più tardi
        if ('fonts' in document) {
          Promise.allSettled([document.fonts.load('1em "SF Pro Text"'), document.fonts.load('1em "SF Pro Display"')])
            .then(() => {
              if (document.fonts.check('1em "SF Pro Text"') || document.fonts.check('1em "SF Pro Display"')) {
                document.documentElement.classList.add('wf-sf-loaded');
              }
            }).catch(()=>{});
        }
      }
    });
  }

  // esegui subito (posiziona questo script il piu' in alto possibile)
  try {
    activateIfLoaded();
  } catch (e) {
    // fallback silenzioso
    document.addEventListener('DOMContentLoaded', activateIfLoaded, { once: true });
  }
})();
