// menu-mobile-apple-fixed.js
(function(){
  // --- helper per trovare elemento per token di classe (case-insensitive) ---
  function findByClassTokens(tokens) {
    tokens = tokens.map(t => t.toLowerCase());
    const els = document.querySelectorAll('[class]');
    for (let el of els) {
      const classTokens = Array.from(el.classList).map(c => c.toLowerCase());
      // verifica che tutti i token richiesti siano presenti
      let ok = true;
      for (let t of tokens) {
        if (!classTokens.includes(t)) { ok = false; break; }
      }
      if (ok) return el;
    }
    return null;
  }

  // prova a trovare il menu (es. "Nav Menu mobile" => token: Nav, Menu, mobile)
  const navMenu = findByClassTokens(['nav','menu','mobile']) || document.querySelector('.nav-menu-mobile');
  if (!navMenu) {
    console.warn('menu-mobile-apple: menu element not found');
    return;
  }

  // trova il pulsante toggle (es. "Menu Button 5" => token: menu + button)
  const toggleButton = findByClassTokens(['menu','button']);

  let scrollPos = 0;
  const duration = 300; // ms

  // stato iniziale (chiuso o aperto)
  navMenu.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
  navMenu.style.willChange = 'transform, opacity';

  if (navMenu.classList.contains('w--open') || navMenu.classList.contains('open')) {
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
    // attendi la fine dell'animazione prima di sbloccare
    setTimeout(() => {
      unlockScroll();
    }, duration + 20);
  }

  // --- osserva cambi classe per capire se il menu è aperto ---
  const observed = navMenu; // osserviamo direttamente il menu trovato
  const observer = new MutationObserver(() => {
    // Webflow di solito aggiunge 'w--open' al menu; fallback a 'open'
    const isOpen = observed.classList.contains('w--open') || observed.classList.contains('open');
    if (isOpen) openMenu();
    else closeMenu();
  });
  observer.observe(observed, { attributes: true, attributeFilter: ['class'] });

  // --- Fallback: se Webflow aggiunge la classe ad un parent invece che al menu, osserviamo anche il parent ---
  if (observed.parentElement) {
    const parent = observed.parentElement;
    const parentObserver = new MutationObserver(() => {
      const isOpen = parent.classList.contains('w--open') || parent.classList.contains('open');
      if (isOpen) openMenu();
      else closeMenu();
    });
    parentObserver.observe(parent, { attributes: true, attributeFilter: ['class'] });
  }

  // --- Fallback ulteriore: ascolta il click sul toggle button (se lo trovi) ---
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      // aspettiamo un tick perché Webflow potrebbe aggiungere la classe subito dopo il click
      setTimeout(() => {
        const isOpen = navMenu.classList.contains('w--open') || navMenu.classList.contains('open') ||
                       (navMenu.parentElement && navMenu.parentElement.classList.contains('w--open'));
        if (isOpen) openMenu(); else closeMenu();
      }, 20);
    });
  }

  // Debug opzionale: stampa stato iniziale
  // console.log('menu-mobile-apple: initialized', { menu: navMenu, toggle: toggleButton });

})();
