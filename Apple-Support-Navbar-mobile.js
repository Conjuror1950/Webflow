// menu-button-scroll.js
(function(){
  const menuButton = document.querySelector('[data-menu-button="true"]');
  const navMenu = document.querySelector('[data-menu="true"]');
  if(!menuButton || !navMenu) return;

  let scrollPos = 0;
  let locked = false;
  const tickDelay = 40; // ms: lascia il tempo a Webflow di aggiornare la classe

  function lockScroll() {
    if (locked) return;
    scrollPos = window.scrollY || document.documentElement.scrollTop;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPos}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    locked = true;
  }

  function unlockScroll() {
    if (!locked) return;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    // ripristina la scroll position salvata
    window.scrollTo(0, scrollPos);
    locked = false;
  }

  // Click sul bottone: aspetta un tick, poi leggi lo stato aggiornato e applica lock/unlock
  menuButton.addEventListener('click', () => {
    setTimeout(() => {
      const isOpen = navMenu.classList.contains('w--open');
      if (isOpen) {
        lockScroll();
      } else {
        unlockScroll();
      }
    }, tickDelay);
  });

  // Observer per gestire chiusure/aperture fatte da altri meccanismi (link interni, overlay, ecc.)
  const observer = new MutationObserver(() => {
    const isOpen = navMenu.classList.contains('w--open');
    if (isOpen && !locked) lockScroll();
    if (!isOpen && locked) unlockScroll();
  });
  observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });

  // Optional: chiudi con ESC se aperto
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && locked) {
      // prova a chiudere il menu (se possibile) e sblocca lo scroll
      // se usi Webflow standard questo non chiude il menu automaticamente,
      // ma observer si occuperà dello sblocco se il menu viene chiuso.
      unlockScroll();
    }
  });

})();
