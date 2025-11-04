// menu-mobile-apple.js
(function(){
  const navMenu = document.querySelector('.nav-menu-mobile'); // Classe menu Webflow
  if(!navMenu) return;

  let scrollPos = 0;
  const duration = 300; // durata animazione in ms

  // Imposta stato iniziale (chiuso o aperto se la classe è già presente)
  navMenu.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
  navMenu.style.willChange = 'transform, opacity';

  if (navMenu.classList.contains('w--open') || navMenu.classList.contains('open')) {
    // se per qualche motivo la classe di "open" è già presente al load
    navMenu.style.transform = 'translateY(0)';
    navMenu.style.opacity = '1';
  } else {
    navMenu.style.transform = 'translateY(-100%)';
    navMenu.style.opacity = '0';
  }

  function lockScroll() {
    scrollPos = window.scrollY || document.documentElement.scrollTop;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPos}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }

  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPos);
  }

  function openMenu() {
    navMenu.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
    navMenu.style.transform = 'translateY(0)';
    navMenu.style.opacity = '1';
    lockScroll();
  }

  function closeMenu() {
    navMenu.style.transition = `transform ${duration}ms ease-in, opacity ${duration}ms ease-in`;
    navMenu.style.transform = 'translateY(-100%)';
    navMenu.style.opacity = '0';
    setTimeout(() => {
      unlockScroll();
    }, duration);
  }

  // Osserva quando Webflow aggiunge/toglie la classe 'w--open' (o 'open' come fallback)
  const observer = new MutationObserver(() => {
    if (navMenu.classList.contains('w--open') || navMenu.classList.contains('open')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });

})();
