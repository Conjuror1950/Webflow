// viewport-fix-mobile.js
// Versione migliorata: calcola --vh/--vw, safe-area, blocco overflow-x e corregge elementi overflow dinamicamente.
// Debug: aggiungi ?debugViewport=1 all'URL per evidenziare gli elementi che sforano.

(function () {
  'use strict';

  // Debounce utility
  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), wait);
    };
  }

  // Ottieni dimensioni viewport affidabili (visualViewport se disponibile)
  function getViewportDims() {
    if (window.visualViewport) {
      return {
        width: Math.round(window.visualViewport.width),
        height: Math.round(window.visualViewport.height)
      };
    }
    return { width: window.innerWidth, height: window.innerHeight };
  }

  // Imposta CSS variables --vh e --vw su :root
  function setViewportCSSVars() {
    const dims = getViewportDims();
    document.documentElement.style.setProperty('--vh', `${dims.height * 0.01}px`);
    document.documentElement.style.setProperty('--vw', `${dims.width * 0.01}px`);
  }

  // Inject basic global CSS that aiuta (appende un <style> in head)
  function injectGlobalCSS() {
    if (document._viewportFixCSSInjected) return;
    const css = `
      /* viewport-fix-mobile injected styles */
      html, body {
        overflow-x: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      /* fallback: usa le variabili calcolate invece di 100vh/100vw quando possibile */
      .vf-fullscreen {
        height: calc(var(--vh, 1vh) * 100) !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      /* protezione per immagini/media che a volte sforano */
      img, picture, video, iframe, svg {
        max-width: 100% !important;
        height: auto !important;
        box-sizing: border-box !important;
      }
    `;
    const style = document.createElement('style');
    style.setAttribute('data-viewport-fix', 'true');
    style.appendChild(document.createTextNode(css));
    document.head && document.head.appendChild(style);
    document._viewportFixCSSInjected = true;
  }

  // Corregge singoli elementi che sforano orizzontalmente
  function fixOverflowElements(debug) {
    const docWidth = getViewportDims().width;
    const offenders = [];

    // Itera tutti gli elementi (si può limitare se performance diventa problema)
    const all = document.getElementsByTagName('*');
    for (let i = 0; i < all.length; i++) {
      const el = all[i];

      // Ignora elementi invisibili o non renderizzati
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;

      // calcola bounding; considera margin collapse ecc.
      const left = Math.floor(rect.left);
      const right = Math.ceil(rect.right);

      // se sfora a sinistra o destra oltre 1px
      if (left < -1 || right > docWidth + 1) {
        // Escludi elementi che normalmente sforano e sono intenzionali (es. modali centrati con transform)
        const cs = window.getComputedStyle(el);
        const position = cs.position;
        const overflowX = cs.overflowX;

        // Non toccare se è fixed/fullscreen modale con overflow gestito manualmente
        // (ma logghiamo comunque se debug)
        const isLikelyIntentional = (position === 'fixed' || position === 'sticky') && (overflowX === 'visible');

        offenders.push({ el, left, right, width: rect.width, position, overflowX, intentional: isLikelyIntentional });

        // Se non sembra intenzionale, correggilo con stili inline:
        if (!isLikelyIntentional) {
          try {
            // Se l'elemento ha width in vw, sostituiscilo con percentuale massima
            el.style.maxWidth = '100%';
            el.style.boxSizing = 'border-box';
            // se ha trasformazioni che possono espandere, forza overflow hidden sul contenitore
            el.style.overflowX = 'hidden';
          } catch (e) {
            // ignore
          }
        }
      }
    }

    // Debug visuale: borda gli elementi che hanno causato overflow
    if (debug && offenders.length) {
      offenders.forEach(o => {
        try {
          o.el.style.outline = '2px dashed rgba(255,0,0,0.8)';
          o.el.style.outlineOffset = '-4px';
        } catch (e) { }
      });
      // Stampo una tabella nel console per ispezionare
      console.group('[viewport-fix] elementi che sforano');
      offenders.forEach(o => {
        console.log('Elemento:', o.el, ' left:', o.left, ' right:', o.right, ' w:', o.width, ' position:', o.position, ' overflowX:', o.overflowX, ' intentional:', o.intentional);
      });
      console.groupEnd();
    }
  }

  // Applicazioni generali per il body e le sezioni
  function applyBasicBodyFixes() {
    // safe-area insets (usa fallback 0)
    try {
      document.body.style.paddingLeft = 'env(safe-area-inset-left, 0)';
      document.body.style.paddingRight = 'env(safe-area-inset-right, 0)';
    } catch (e) { /* non supportato */ }

    // background trasparente di default (mantieni come hai richiesto)
    if (!document.body.style.backgroundColor) {
      document.body.style.backgroundColor = 'transparent';
    }
  }

  // Funzione principale chiamata su load/resize/orientationchange
  function runFixes() {
    const debug = !!(new URLSearchParams(window.location.search).get('debugViewport'));
    setViewportCSSVars();
    injectGlobalCSS();
    applyBasicBodyFixes();
    fixOverflowElements(debug);
  }

  // inizializza subito e su eventi rilevanti
  const debouncedRun = debounce(runFixes, 120);
  window.addEventListener('load', runFixes);
  window.addEventListener('orientationchange', debouncedRun);
  window.addEventListener('resize', debouncedRun);

  // supporto visualViewport: aggiorna al suo resize (più preciso su mobile)
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', debouncedRun);
    window.visualViewport.addEventListener('scroll', debouncedRun);
  }

  // Esegui subito (se lo script viene inserito alla fine del body)
  runFixes();
})();
