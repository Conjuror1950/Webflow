// menu-button-scroll.js (versione robusta)
(function(){
  // --- CONFIGURAZIONE: selettori tramite data-attributes (più affidabili)
  const menuButton = document.querySelector('[data-menu-button="true"]');
  const navMenu = document.querySelector('[data-menu="true"]');

  // fallback: tenta selettori Webflow standard se non usi data-attributes
  const fallbackButton = document.querySelector('.w-nav-button, .Menu-Button, .menu-button');
  const fallbackMenu = document.querySelector('.w-nav-menu, .nav-menu, .Nav.Menu.mobile');

  const btn = menuButton || fallbackButton;
  const menu = navMenu || fallbackMenu;

  if(!btn || !menu) {
    // Se vuoi debug, decommenta la riga sotto per vedere cosa manca
    // console.warn('menu-button-scroll: missing button or menu (btn, menu):', !!btn, !!menu);
    return;
  }

  let scrollPos = 0;
  let locked = false;

  // Determina se il menu è aperto (più metodi di controllo)
  function isMenuOpen() {
    try {
      // 1) Controllo classe Webflow
      if (menu.classList && menu.classList.contains('w--open')) return true;

      // 2) Controllo aria-expanded sul bottone (molti toggle liscono questo attributo)
      const aria = btn.getAttribute && btn.getAttribute('aria-expanded');
      if (aria === 'true') return true;

      // 3) Controllo stile computato (visibilità/altezza)
      const cs = window.getComputedStyle(menu);
      if (cs && (cs.display !== 'none' && cs.visibility !== 'hidden')) {
        // se ha un'altezza > 0 o opacity > 0 consideralo aperto
        const h = parseFloat(cs.height) || 0;
        const op = parseFloat(cs.opacity) || 0;
        if (h > 2 || op > 0.05) return true;
      }
    } catch(e){
      // ignore
    }
    return false;
  }

  function lockScroll() {
    if (locked) return;
    scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPos}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    locked = true;
    // console.log('scroll locked at', scrollPos);
  }

  function unlockScroll() {
    if (!locked) return;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    // ripristina la posizione salvata
    window.scrollTo(0, scrollPos);
    locked = false;
    // console.log('scroll unlocked, restored to', scrollPos);
  }

  // Funzione che legge lo stato DOPO l'aggiornamento del DOM usando RAF
  function handleAfterToggle() {
    // doppio rAF per essere molto sicuri che Webflow abbia applicato classi / aria
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (isMenuOpen()) {
          lockScroll();
        } else {
          unlockScroll();
        }
      });
    });
  }

  // Listener sul bottone: chiama handleAfterToggle (non fa assunzioni sul timing)
  btn.addEventListener('click', handleAfterToggle, { passive: true });

  // MutationObserver per intercettare cambi fatti da altri meccanismi (link interni, chiusure automatiche, ecc.)
  try {
    const observerTarget = menu;
    const observer = new MutationObserver(() => {
      // quando cambia la classe/attributo del menu, aggiorna stato
      handleAfterToggle();
    });
    observer.observe(observerTarget, { attributes: true, attributeFilter: ['class', 'style', 'aria-hidden'] });
  } catch (e) {
    // observer potrebbe fallire in ambienti stretti; non bloccare l'esecuzione
  }

  // fallback: se l'utente chiude con ESC vogliamo sbloccare la pagina
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && locked) {
      unlockScroll();
    }
  });

  // all'avvio: sincronizza lo stato (nel caso il menu fosse già aperto)
  requestAnimationFrame(handleAfterToggle);

})();
