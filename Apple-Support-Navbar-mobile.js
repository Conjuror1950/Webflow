// menu-button-scroll.js (Mobile-only + transizione dolce)
(function(){
  // --- CONFIGURAZIONE: selettori tramite data-attributes (più affidabili)
  const menuButton = document.querySelector('[data-menu-button="true"]');
  const navMenu = document.querySelector('[data-menu="true"]');

  // fallback: tenta selettori Webflow standard se non usi data-attributes
  const fallbackButton = document.querySelector('.w-nav-button, .Menu-Button, .menu-button');
  const fallbackMenu = document.querySelector('.w-nav-menu, .nav-menu, .Nav.Menu.mobile');

  const btn = menuButton || fallbackButton;
  const menu = navMenu || fallbackMenu;

  if(!btn || !menu) return;

  let scrollPos = 0;
  let locked = false;

  // --- FUNZIONI UTILI ---
  // Determina se siamo su mobile (Webflow breakpoint)
  function isMobile() {
    return window.innerWidth <= 449;
  }

  // Determina se il menu è aperto (classe, aria-expanded o visibilità)
  function isMenuOpen() {
    try {
      if (menu.classList && menu.classList.contains('w--open')) return true;
      const aria = btn.getAttribute && btn.getAttribute('aria-expanded');
      if (aria === 'true') return true;
      const cs = window.getComputedStyle(menu);
      if (cs && cs.display !== 'none' && cs.visibility !== 'hidden') {
        const h = parseFloat(cs.height) || 0;
        const op = parseFloat(cs.opacity) || 0;
        if (h > 2 || op > 0.05) return true;
      }
    } catch(e){ /* ignore */ }
    return false;
  }

  // Blocca scroll solo su mobile
  function lockScroll() {
    if (locked || !isMobile()) return;
    scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.position = 'fixed';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    // top con transizione dolce Apple-style
    document.body.style.transition = 'top 0.25s ease-out';
    document.body.style.top = `-${scrollPos}px`;
    locked = true;
  }

  // Sblocca scroll solo se era bloccato su mobile
  function unlockScroll() {
    if (!locked || !isMobile()) return;
    document.body.style.top = '0';
    setTimeout(() => {
      document.body.style.position = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.transition = '';
      window.scrollTo(0, scrollPos);
      locked = false;
    }, 200); // stesso tempo della transizione CSS
  }

  // Funzione che legge lo stato DOPO l'aggiornamento del DOM
  function handleAfterToggle() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (isMobile()) {
          if (isMenuOpen()) lockScroll();
          else unlockScroll();
        }
      });
    });
  }

  // Listener sul bottone
  btn.addEventListener('click', handleAfterToggle, { passive: true });

  // Observer per intercettare cambi fatti da altri meccanismi (link interni, overlay, ecc.)
  try {
    const observer = new MutationObserver(handleAfterToggle);
    observer.observe(menu, { attributes: true, attributeFilter: ['class', 'style', 'aria-hidden'] });
  } catch (e) { /* ignore */ }

  // ESC chiude / sblocca scroll
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && locked) unlockScroll();
  });

  // Resize finestra: sincronizza stato mobile/non-mobile
  window.addEventListener('resize', handleAfterToggle);

  // All’avvio: sincronizza lo stato
  requestAnimationFrame(handleAfterToggle);

})();
