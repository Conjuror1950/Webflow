// menu-button-scroll.js
(function(){
  const menuButton = document.querySelector('[data-menu-button="true"]');
  const navMenu = document.querySelector('[data-menu="true"]');
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

  menuButton.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('w--open');
    if(!isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  });

})();
