// menu-button-scroll.js
(function(){
  const menuButton = document.querySelector('.Menu.Button.5'); // il bottone che apre/chiude il menu
  const navMenu = document.querySelector('.Nav.Menu.mobile'); // il menu mobile
  if(!menuButton || !navMenu) return;

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

  // Gestione clic sul bottone
  menuButton.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('w--open'); // controlla se il menu è aperto
    if(!isOpen) {
      // il menu si aprirà → blocca scroll
      lockScroll();
    } else {
      // il menu si chiuderà → sblocca scroll
      unlockScroll();
    }
  });

})();
