// viewport-fix-mobile.js
// Versione: 1.1
// Scopo: rimuovere bande laterali bianche, sistemare full-width e --vh per tutti i device

(function () {
  'use strict';

  const DEBUG = false; // imposta true se vuoi vedere outlines e logs più dettagliati

  // 1) Imposta variabile --vh corretta
  function setVhUnit() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  // 2) Inietta regole CSS globali "safe"
  function injectGlobalStyles() {
    if (document.getElementById('vf-global-styles')) return;

    const css = `
      /* Viewport-fix global rules */
      html, body {
        overflow-x: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
      }

      *, *::before, *::after { box-sizing: border-box !important; }

      /* Make media responsive by default */
      img, picture, svg, video, iframe {
        max-width: 100% !important;
        height: auto !important;
        display: block !important;
      }

      /* Ensure common nav wrappers span full width */
      header, nav, .w-nav, .navbar, .site-nav, .site-navbar, .nav {
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }

      /* Helper class applied to fixed elements to keep them pinned to edges */
      .vf-pin-fullwidth {
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
      }

      /* Debug outline (only if DEBUG true and the script toggles the class) */
      .vf-debug-outline { outline: 2px dashed rgba(255,0,0,0.75) !important; }
    `;

    const style = document.createElement('style');
    style.id = 'vf-global-styles';
    style.appendChild(document.createTextNode(css));
    document.head ? document.head.appendChild(style) : document.documentElement.appendChild(style);
  }

  // 3) Cerca elementi che overflowano la larghezza e prova a correggerli
  function detectAndFixOverflow() {
    const w = Math.round(window.innerWidth);
    const eps = 0.5; // tolleranza
    const overflows = [];

    // seleziona tutti gli elementi visibili tranne html/body
    const all = Array.from(document.querySelectorAll('body *'));

    all.forEach((el) => {
      // skip elements that are not displayed
      const cs = window.getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return;

      const rect = el.getBoundingClientRect();

      // consideriamo overflow se parte del bounding supera la viewport orizzontalmente
      if (rect.left < -eps || rect.right > (w + eps)) {
        overflows.push({ el, rect, computedStyle: cs });
      }
    });

    if (overflows.length === 0) {
      if (DEBUG) console.info('[vf] Nessun overflow orizzontale trovato.');
      return [];
    }

    // Applica correzioni conservative sugli elementi overflowanti
    overflows.forEach((item, i) => {
      const el = item.el;
      const cs = item.computedStyle;

      // preferiamo correggere impostando max-width e box-sizing
      try {
        // se l'elemento ha width impostata in inline style contenente "vw", la sovrascriviamo con 100%
        const inlineStyle = (el.getAttribute && el.getAttribute('style')) || '';
        if (/(\d+(\.\d+)?vw)/.test(inlineStyle) || /100vw/.test(inlineStyle) || /100\.?vw/.test(cs.width)) {
          el.style.width = '100%';
        }

        // regole generali di fallback
        el.style.maxWidth = '100%';
        el.style.boxSizing = 'border-box';

        // immagini/video/iframes: assicurati che siano responsivi
        if (/img|picture|video|iframe/.test(el.tagName.toLowerCase())) {
          el.style.maxWidth = '100%';
          el.style.height = 'auto';
          el.removeAttribute('width');
          el.removeAttribute('height');
        }

        // Se l'elemento è posizionato fixed/stick e tende a creare gap, pinniamolo
        if (cs.position === 'fixed' || cs.position === 'sticky') {
          el.classList.add('vf-pin-fullwidth');
        }

        // se DEBUG, aggiungi outline temporaneo per individuare
        if (DEBUG) {
          el.classList.add('vf-debug-outline');
          // togli l'outline dopo qualche secondo per non rovinare la UX
          setTimeout(() => el.classList.remove('vf-debug-outline'), 4000);
        }
      } catch (e) {
        console.warn('[vf] Errore nella correzione di un elemento', e, el);
      }
    });

    // Log degli elementi in overflow (semplice)
    console.group(`[vf] elementi overflow: ${overflows.length}`);
    overflows.forEach((it, idx) => {
      console.log(`#${idx + 1}`, it.el, 'rect:', it.rect, 'computedWidth:', it.computedStyle.width);
    });
    console.groupEnd();

    return overflows;
  }

  // 4) Applicazioni globali una tantum / chiamate di update
  function applyAll() {
    setVhUnit();
    injectGlobalStyles();

    // Forza overflow-x hidden anche direttamente (ulteriore guardia)
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';

    // se il body non ha background esplicito, non forziamo il colore; lascialo trasparente
    // (ma se vuoi che la navbar si estenda visualmente, assicurati che il body abbia lo stesso bg del header)

    // Correggi elementi che overflowano
    detectAndFixOverflow();
  }

  // 5) Event listeners
  window.addEventListener('load', () => {
    applyAll();

    // dopo load aspettiamo un piccolo timeout per catturare elementi caricati dinamicamente
    setTimeout(() => {
      applyAll();
    }, 600);
  });

  // ridimensiona / rotate / orientation change
  ['resize', 'orientationchange'].forEach((ev) => {
    window.addEventListener(ev, () => {
      setVhUnit();
      // ritarda la ricerca degli overflow per far finire eventuali transizioni
      clearTimeout(window.__vf_resize_to);
      window.__vf_resize_to = setTimeout(() => {
        detectAndFixOverflow();
      }, 120);
    }, { passive: true });
  });

  // espone funzione globale per debug manuale (opzionale)
  window.vf_force_check = function () {
    setVhUnit();
    injectGlobalStyles();
    return detectAndFixOverflow();
  };

})();
