// menu-button-scroll.js (Mobile-only + transizione dolce + icon toggle)
(function(){
  // --- CONFIGURAZIONE: selettori tramite data-attributes (più affidabili)
  const menuButton = document.querySelector('[data-menu-button="true"]');
  const navMenu = document.querySelector('[data-menu="true"]');

  // fallback: tenta selettori Webflow standard se non usi data-attributes
  const fallbackButton = document.querySelector('.w-nav-button, .Menu-Button, .menu-button, .Menu.Button.5');
  const fallbackMenu = document.querySelector('.w-nav-menu, .nav-menu, .Nav.Menu.mobile, .Nav.Menu.mobile');

  const btn = menuButton || fallbackButton;
  const menu = navMenu || fallbackMenu;

  if(!btn || !menu) return;

  // --- Icon elements (all'interno del button)
  const menuIcon = btn.querySelector('.menu-icon');   // hamburger
  const closeIcon = btn.querySelector('.close-icon'); // x di chiusura

  let scrollPos = 0;
  let locked = false;

  // --- FUNZIONI UTILI ---
  function isMobile() {
    return window.innerWidth <= 449; // come da tuo setting
  }

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
  // Default animation params
  const ICON_DURATION = 250; // ms
  const ICON_EASING = 'cubic-bezier(.2,.9,.3,1)'; // smooth, Apple-like

  // Initialize icons so both are display:block but one hidden via opacity
  function initIcons() {
    if (!menuIcon && !closeIcon) return;

    // Ensure both are block so opacity animations don't cause layout shift
    if (menuIcon) {
      menuIcon.style.display = menuIcon.style.display || 'block';
      menuIcon.style.transition = `opacity ${ICON_DURATION}ms ${ICON_EASING}, transform ${ICON_DURATION}ms ${ICON_EASING}`;
      menuIcon.style.transformOrigin = '50% 50%';
      // if menu is open at load, hide hamburger
      if (isMenuOpen()) {
        menuIcon.style.opacity = '0';
        menuIcon.style.transform = 'scale(.9) rotate(-10deg)';
        menuIcon.style.pointerEvents = 'none';
      } else {
        menuIcon.style.opacity = '1';
        menuIcon.style.transform = 'none';
        menuIcon.style.pointerEvents = 'auto';
      }
    }

    if (closeIcon) {
      // make it block so it occupies same area, but hide via opacity if closed
      closeIcon.style.display = closeIcon.style.display || 'block';
      closeIcon.style.transition = `opacity ${ICON_DURATION}ms ${ICON_EASING}, transform ${ICON_DURATION}ms ${ICON_EASING}`;
      closeIcon.style.transformOrigin = '50% 50%';
      if (isMenuOpen()) {
        closeIcon.style.opacity = '1';
        closeIcon.style.transform = 'none';
        closeIcon.style.pointerEvents = 'auto';
      } else {
        closeIcon.style.opacity = '0';
        closeIcon.style.transform = 'scale(.9) rotate(10deg)';
        closeIcon.style.pointerEvents = 'none';
      }
    }
  }

  // Toggle icons smoothly depending on open state
  function updateIcons(open) {
    if (!menuIcon && !closeIcon) return;

    if (open) {
      // animate hamburger out, close in
      if (menuIcon) {
        menuIcon.style.pointerEvents = 'none';
        menuIcon.style.opacity = '0';
        menuIcon.style.transform = 'scale(.9) rotate(-10deg)';
      }
      if (closeIcon) {
        closeIcon.style.pointerEvents = 'auto';
        closeIcon.style.opacity = '1';
        closeIcon.style.transform = 'none';
      }
      // set aria-expanded for accessibility
      try { btn.setAttribute('aria-expanded', 'true'); } catch(e){}
    } else {
      // animate close out, hamburger in
      if (closeIcon) {
        closeIcon.style.pointerEvents = 'none';
        closeIcon.style.opacity = '0';
        closeIcon.style.transform = 'scale(.9) rotate(10deg)';
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
    // transizione dolce per top (Apple-style)
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
    }, 100);
  }

  // --- Main handler after DOM update ---
  function handleAfterToggle() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const open = isMenuOpen();
        // icons animation
        updateIcons(open);
        // scroll lock only on mobile
        if (isMobile()) {
          if (open) lockScroll();
          else unlockScroll();
        } else {
          // ensure unlocked on desktop
          if (locked) unlockScroll();
        }
      });
    });
  }

  // --- Set initial icon states
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
    if (e.key === 'Escape') {
      // assume Webflow will close menu; call handler to sync
      handleAfterToggle();
    }
  });

  // Resize finestra: sincronizza stato mobile/non-mobile + icons
  window.addEventListener('resize', handleAfterToggle);

  // All’avvio: sincronizza lo stato
  requestAnimationFrame(handleAfterToggle);

})();
