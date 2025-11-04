// menu-mobile.js
(function(){
  // Seleziona il menu mobile Webflow
  const navMenu = document.querySelector('.nav menu mobile');
  if(!navMenu) return;

  let scrollPos = 0;

  // Funzione per bloccare lo scroll
  function lockScroll() {
    scrollPos = window.scrollY || document.documentElement.scrollTop;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPos}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }

  // Funzione per sbloccare lo scroll
  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPos);
  }

  // Osserva quando il menu aggiunge/toglie la classe 'w--open' (Webflow standard)
  const observer = new MutationObserver(() => {
    if(navMenu.classList.contains('w--open')) {
      lockScroll();
    } else {
      unlockScroll();
    }
  });

  observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });

})();
