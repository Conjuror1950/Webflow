// viewport-fix-mobile.js
(function() {
  // Funzione per impostare la variabile --vh corretta
  function setVhUnit() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  // Funzione per applicare padding safe-area e overflow-x hidden
  function applyViewportFixes() {
    // Blocca scroll orizzontale
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';

    // Safe area per iOS (ignored su Android e desktop)
    document.body.style.paddingLeft = 'env(safe-area-inset-left, 0)';
    document.body.style.paddingRight = 'env(safe-area-inset-right, 0)';

    // Background di default, puoi cambiare colore se vuoi
    if (!document.body.style.backgroundColor) {
      document.body.style.backgroundColor = 'transparent';
    }

    // Sezioni full-width sicure
    const sections = document.querySelectorAll('.section, .container');
    sections.forEach(el => {
      el.style.width = '100%';
      el.style.maxWidth = '100%';
      el.style.boxSizing = 'border-box';
    });
  }

  // Aggiorna viewport su load e resize
  window.addEventListener('load', () => {
    setVhUnit();
    applyViewportFixes();
  });
  window.addEventListener('resize', () => {
    setVhUnit();
    applyViewportFixes();
  });
})();
