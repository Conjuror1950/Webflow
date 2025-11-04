// menu-button-scroll.js (Mobile-only + transizione dolce + icon toggle)
(function(){
  // --- CONFIGURAZIONE: selettori tramite data-attributes (più affidabili)
  const menuButton = document.querySelector('[data-menu-button="true"]');
  const navMenu = document.querySelector('[data-menu="true"]');

  // fallback: tenta selettori Webflow standard se non usi data-attributes
  const fallbackButton = document.querySelector('.w-nav-button, .Menu-Button, .menu-button, .Menu.Button.5');
  const fallbackMenu = document.querySelector('.w-nav-menu, .nav-menu, .Nav.Menu.mobile');

  const btn = menuButton || fallbackButton;
  const menu = navMenu || fallbackMenu;

  if(!btn || !menu) return;

  // --- Icon elements (all'interno del button)
  const menuIcon = btn.querySelector('.menu-icon');   // hamburger
  const closeIcon = btn.querySelector('.close-icon'); // x di chiusura

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

  // --- Icon animation helpers ---
  const ICON_DURATION = 250; // ms (modifica qui se vuoi diverso)
  const ICON_EASING = 'cubic-bezier(.2,.9,.3,1)'; // smooth, Apple-like

  function initIcons() {
    // se non ci sono icone, esci
    if (!menuIcon && !closeIcon) return;

    // assicurati che entrambi siano display:block così possiamo animare opacity
    if (menuIcon) {
      // se Webflow ha già display inline/block non lo sovrascriviamo, altrimenti impostiamo block
      if (!menuIcon.style.display) menuIcon.style.display = 'block';
      menuIcon.style.transition = `opacity ${ICON_DURATION}ms ${ICON_EASING}, transform ${ICON_DURATION}ms ${ICON_EASING}`;
      menuIcon.style.transformOrigin = '50% 50%';
      // stato iniziale
      if (isMenuOpen()) {
        menuIcon.style.opacity = '0';
        menuIcon.style.transform = 'scale(.95) rotate(-8deg)';
        menuIcon.style.pointerEvents = 'none';
      } else {
        menuIcon.style.opacity = '1';
        menuIcon.style.transform = 'none';
        menuIcon.style.pointerEvents = 'auto';
      }
    }

    if (closeIcon) {
      if (!closeIcon.style.display) closeIcon.style.display = 'block';
      closeIcon.style.transition = `opacity ${ICON_DURATION}ms ${ICON_EASING}, transform ${ICON_DURATION}ms ${ICON_EASING}`;
      closeIcon.style.transformOrigin = '50% 50%';
      if (isMenuOpen()) {
        closeIcon.style.opacity = '1';
        closeIcon.style.transform = 'none';
        closeIcon.style.pointerEvents = 'auto';
      } else {
        closeIcon.style.opacity = '0';
        closeIcon.style.transform = 'scale(.95) rotate(8deg)';
        closeIcon.style.pointerEvents = 'none';
      }
    }
  }

  function updateIcons(open) {
    if (!menuIcon && !closeIcon) return;

    if (open) {
      if (menuIcon) {
        menuIcon.style.pointerEvents = 'none';
        menuIcon.style.opacity = '0';
        menuIcon.style.transform = 'scale(.95) rotate(-8deg)';
      }
      if (closeIcon) {
        closeIcon.style.pointerEvents = 'auto';
        closeIcon.style.opacity = '1';
        closeIcon.style.transform = 'none';
      }
      try { btn.setAttribute('aria-expanded', 'true'); } catch(e){}
    } else {
      if (closeIcon) {
        closeIcon.style.pointerEvents = 'none';
        closeIcon.style.opacity = '0';
        closeIcon.style.transform = 'scale(.95) rotate(8deg)';
      }
      if (menuIcon) {
        menuIcon.style.pointerEvents = 'auto';
        menuIcon.style.opacity = '1';
        menuIcon.style.transform = 'none';
      }
      try { btn.setAttribute('aria-expanded', 'false'); } catch(e){}
    }
  }

  // --- Scroll lock / unlock (mobile only) ---
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
    }, Math.max(ICON_DURATION, 250)); // aspetta la durata icone/scroll per evitare salti
  }

  // Funzione che legge lo stato DOPO l'aggiornamento del DOM
  function handleAfterToggle() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const open = isMenuOpen();
        // aggiorna icone (prima visivo)
        updateIcons(open);
        // scroll lock solo su mobile
        if (isMobile()) {
          if (open) lockScroll();
          else unlockScroll();
        } else {
          if (locked) unlockScroll();
        }
      });
    });
  }

  // Inizializza icone
  initIcons();

  // Listener sul bottone
  btn.addEventListener('click', handleAfterToggle, { passive: true });

  // Observer per intercettare cambi fatti da altri meccanismi
  try {
    const observer = new MutationObserver(handleAfterToggle);
    observer.observe(menu, { attributes: true, attributeFilter: ['class', 'style', 'aria-hidden'] });
  } catch (e) { /* ignore */ }

  // ESC chiude / sblocca scroll e aggiorna icone
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') handleAfterToggle();
  });

  // Resize finestra: sincronizza stato mobile/non-mobile + icons
  window.addEventListener('resize', handleAfterToggle);

  // All’avvio: sincronizza lo stato
  requestAnimationFrame(handleAfterToggle);

})();
