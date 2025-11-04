// menu-scroll-lock.js
(function(){
  // Seleziona il menu mobile Webflow
  const navMenu = document.querySelector('.Nav.Menu.mobile'); // usa i punti al posto degli spazi
  if(!navMenu) return;

  let scrollPos = 0;

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

  // Osserva quando Webflow aggiunge/rimuove la classe "w--open" al menu
  const observer = new MutationObserver(() => {
    if(navMenu.classList.contains('w--open')) {
      lockScroll();
    } else {
      unlockScroll();
    }
  });

  observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });

})();
