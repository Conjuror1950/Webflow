// viewport-fix.js
// Versione: 1.0
// Inserire <script src=".../viewport-fix.js"></script> prima di </body>

(function () {
  'use strict';

  const MOBILE_MAX_WIDTH = 1400; // soglia sotto la quale applichiamo alcune correzioni (evita modifiche inutili su desktop larghi)

  /* -------------------------
     Inserisce meta viewport (se non presente)
     ------------------------- */
  function ensureViewportMeta() {
    try {
      const head = document.head || document.getElementsByTagName('head')[0];
      if (!head) return;
      const existing = head.querySelector('meta[name="viewport"]');
      const desiredContent = 'width=device-width, initial-scale=1, viewport-fit=cover';
      if (existing) {
        // se è diverso, aggiorniamo (non sempre cambia il rendering immediatamente ma è utile)
        if (existing.getAttribute('content') !== desiredContent) {
          existing.setAttribute('content', desiredContent);
        }
      } else {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.setAttribute('content', desiredContent);
        head.appendChild(meta);
      }
    } catch (e) {
      // non critico
      console.warn('[viewport-fix] impossibile inserire meta viewport', e);
    }
  }

  /* -------------------------
     Aggiunge style globale necessario
     ------------------------- */
  function injectBaseStyles() {
    const css = `
/* ---------------- viewport-fix: base rules ---------------- */
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden !important; /* blocca scroll orizzontale */
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
}

/* safe-area per iOS (fallback compat) */
body {
  /* old iOS Safari */
  padding-left: constant(safe-area-inset-left);
  padding-right: constant(safe-area-inset-right);
  /* modern */
  padding-left: env(safe-area-inset-left, 0px);
  padding-right: env(safe-area-inset-right, 0px);
}

/* helper per fullscreen (usa --vh calcolato dal JS) */
.vf-fullscreen {
  height: calc(var(--vh, 1vh) * 100) !important;
  min-height: calc(var(--vh, 1vh) * 100) !important;
  box-sizing: border-box !important;
}

/* evita che elementi con 100vw forzino overflow */
[vf-protect] {
  max-width: 100% !important;
  box-sizing: border-box !important;
  left: 0 !important;
  right: 0 !important;
}

/* classe applicabile manualmente se vuoi forzare nav a bordo schermo */
.vf-edge-to-edge {
  position: relative !important;
  left: calc(0px - env(safe-area-inset-left, 0px)) !important;
  right: calc(0px - env(safe-area-inset-right, 0px)) !important;
  width: calc(100% + env(safe-area-inset-left, 0px) + env(safe-area-inset-right, 0px)) !important;
  max-width: none !important;
  box-sizing: border-box !important;
  z-index: 9999 !important;
}
`;
    const style = document.createElement('style');
    style.id = 'viewport-fix-styles';
    style.appendChild(document.createTextNode(css));
    (document.head || document.documentElement).appendChild(style);
  }

  /* -------------------------
     Calcola e imposta --vh
     ------------------------- */
  function setVhUnit() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  /* -------------------------
     Corregge elementi che "sbordano"
     - cerca elementi più larghi del viewport e applica protezione
     - corregge stili inline che usano 100vw
     ------------------------- */
  function fixOverflowingElements() {
    try {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      // Scansiona elementi visibili: limitiamo a quelli con bounding box maggiore del viewport
      const all = document.querySelectorAll('body *');
      for (let i = 0; i < all.length; i++) {
        const el = all[i];

        // Ignora elementi invisibili o script/style
        if (!(el instanceof Element)) continue;
        const cs = window.getComputedStyle ? window.getComputedStyle(el) : null;
        if (!cs) continue;
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;

        const rect = el.getBoundingClientRect();
        // Se l'elemento è più largo del viewport anche per 1px: lo proteggiamo
        if (rect.width > vw + 0.5) {
          el.setAttribute('vf-protect', '1');
          // se aveva width inline in vw -> settalo a 100%
          const inlineW = (el.style && el.style.width) ? el.style.width : '';
          if (inlineW && inlineW.indexOf('vw') !== -1) {
            el.style.width = '100%';
          }
        } else {
          // rimuovi attributo se presente e ora non serve
          if (el.hasAttribute('vf-protect')) {
            // lasciamo l'attributo per sicurezza: non rimuoviamo automaticamente
          }
        }
      }
    } catch (e) {
      console.warn('[viewport-fix] fixOverflowingElements error', e);
    }
  }

  /* -------------------------
     Forza elementi common-nav ad essere edge-to-edge
     - riconosce tag e classi comuni (nav, header, .w-nav, .navbar, .site-header, etc.)
     - applica la classe .vf-edge-to-edge per estenderli fino ai bordi della safe area
     ------------------------- */
  function extendCommonNavs() {
    try {
      const selectors = [
        'nav', 'header', '.navbar', '.site-header', '.w-nav', '.nav', '.topbar', '.main-nav', '.menu', '.header'
      ];
      const found = new Set();
      selectors.forEach(sel => {
        const nodes = document.querySelectorAll(sel);
        nodes.forEach(n => {
          // applichiamo solo se l'elemento è visibile e si trova nella parte superiore della pagina (navbar tipica)
          if (!(n instanceof Element)) return;
          const rect = n.getBoundingClientRect();
          if (rect.width < 10 || rect.height < 10) return;
          // preferiamo applicare se si trova vicino al top o ha aria di nav
          if (rect.top < window.innerHeight * 0.3 || /nav|menu|header/i.test(n.className || n.id || '')) {
            n.classList.add('vf-edge-to-edge');
            found.add(n);
          }
        });
      });

      // Opportunità: se non abbiamo trovato nulla, tentiamo di estendere il primo header/nav visibile
      if (found.size === 0) {
        const fallback = document.querySelector('header, nav, .w-nav, .navbar');
        if (fallback && fallback instanceof Element) {
          fallback.classList.add('vf-edge-to-edge');
        }
      }
    } catch (e) {
      console.warn('[viewport-fix] extendCommonNavs error', e);
    }
  }

  /* -------------------------
     Applicazioni iniziali: eseguite al load e dopo resize/orientation change
     ------------------------- */
  function applyAllFixes() {
    // Applichiamo solo se la larghezza è sensata (evitiamo interferenze su desktop molto larghi)
    try {
      const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      // Applichiamo quasi sempre, ma alcune regole di "forzatura nav" sono più utili sotto MOBILE_MAX_WIDTH
      setVhUnit();
      fixOverflowingElements();
      if (width <= MOBILE_MAX_WIDTH) {
        extendCommonNavs();
      } else {
        // anche su desktop applichiamo overflow fix e vh
      }
    } catch (e) {
      console.warn('[viewport-fix] applyAllFixes error', e);
    }
  }

  /* -------------------------
     Inizializzazione (esegui il prima possibile quando il file viene caricato)
     ------------------------- */
  function init() {
    ensureViewportMeta();
    injectBaseStyles();
    // Imposta subito --vh e altre correzioni iniziali
    setVhUnit();

    // Se il DOM è già pronto, esegui le correzioni; altrimenti attendi DOMContentLoaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // piccola delay per permettere caricamento di alcuni stili inline
      setTimeout(applyAllFixes, 50);
    } else {
      document.addEventListener('DOMContentLoaded', () => setTimeout(applyAllFixes, 50));
    }

    // ricalcoli utili su eventi
    window.addEventListener('resize', () => {
      setVhUnit();
      // leggero debounce
      clearTimeout(window.__vf_resize_timer);
      window.__vf_resize_timer = setTimeout(applyAllFixes, 120);
    });

    window.addEventListener('orientationchange', () => {
      // il cambio orientamento su iOS può richiedere un piccolo delay
      setTimeout(() => {
        setVhUnit();
        applyAllFixes();
      }, 160);
    });

    // eventualmente ricalcola dopo load completo (immagini/caricamenti)
    window.addEventListener('load', () => setTimeout(applyAllFixes, 60));
  }

  // Avvia
  init();

  /* -------------------------
     API utili per debug / override manuale
     - window.vfForceRecalc() -> richiama applyAllFixes() dal browser console
     - window.vfAddEdgeToElement(el) -> aggiunge la classe edge-to-edge a un elemento DOM
     ------------------------- */
  window.vfForceRecalc = function () {
    applyAllFixes();
  };
  window.vfAddEdgeToElement = function (el) {
    try {
      if (typeof el === 'string') {
        el = document.querySelector(el);
      }
      if (el && el.classList) el.classList.add('vf-edge-to-edge');
    } catch (e) { /* ignore */ }
  };
})();
