// menu-mobile-apple.js
(function(){
  const navMenu = document.querySelector('.nav-menu-mobile'); // Classe menu Webflow
  if(!navMenu) return;

  let scrollPos = 0;
  const duration = 300; // durata animazione in ms

  // Imposta animazione iniziale del menu
  navMenu.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
  navMenu.style.transform = 'translateY(-100%)';
  navMenu.style.opacity = '0';
  navMenu.style.willChange = 'transform, opacity';

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

  // Osserva quando Webflow aggiunge/toglie la classe 'nav-menu-mobile'
  const observer = new MutationObserver(() => {
    if(navMenu.classList.contains('nav-menu-mobile')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });

})();
