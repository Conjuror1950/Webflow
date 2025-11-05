// menu-button-scroll.js (Mobile-only + transizione dolce)
(function() {
  // --- CONFIGURAZIONE: selettori tramite data-attributes (più affidabili)
  const menuButton = document.querySelector('[data-menu-button="true"]');
  const navMenu = document.querySelector('[data-menu="true"]');

  // fallback: selettori Webflow standard
  const fallbackButton = document.querySelector('.w-nav-button, .Menu-Button, .menu-button');
  const fallbackMenu = document.querySelector('.w-nav-menu, .nav-menu, .Nav.Menu.mobile');

  const btn = menuButton || fallbackButton;
  const menu = navMenu || fallbackMenu;

  if (!btn || !menu) return;

  // --- ICONE ---
  const menuIcon = btn.querySelector('.support-menu-icon');
  const closeIcon = btn.querySelector('.support-close-icon');

  if (!menuIcon || !closeIcon) return;

  let scrollPos = 0;
  let locked = false;

  // --- FUNZIONI ---
  function isMobile() {
    return window.innerWidth <= 449;
  }

  function isMenuOpen() {
    try {
      if (menu.classList.contains('w--open')) return true;
      const aria = btn.getAttribute('aria-expanded');
      if (aria === 'true') return true;
      const cs = window.getComputedStyle(menu);
      if (cs.display !== 'none' && cs.visibility !== 'hidden') {
        const h = parseFloat(cs.height) || 0;
        const op = parseFloat(cs.opacity) || 0;
        return h > 2 || op > 0.05;
      }
    } catch (e) { /* ignore */ }
    return false;
  }

  // --- ANIMAZIONE ICONE ---
  function toggleMenuIcons(open) {
    if (open) {
      // Hamburger → X
      menuIcon.style.opacity = '0';
      menuIcon.style.transform = 'scale(0.8)';
      closeIcon.style.display = 'block';
      requestAnimationFrame(() => {
        closeIcon.style.opacity = '1';
        closeIcon.style.transform = 'scale(1)';
      });
    } else {
      // X → Hamburger
      closeIcon.style.opacity = '0';
      closeIcon.style.transform = 'scale(0.8)';

      // Hamburger appare subito
      menuIcon.style.opacity = '1';
      menuIcon.style.transform = 'scale(1)';

      // Nascondi X solo dopo breve delay
      setTimeout(() => {
        closeIcon.style.display = 'none';
      }, 200); // corrisponde al CSS transition
    }
  }

  // --- BLOCCO SCROLL MOBILE ---
  function lockScroll() {
    if (locked || !isMobile()) return;
    scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.position = 'fixed';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
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
    }, 80);
  }

  // --- SINCRONIZZA ICONE E SCROLL ---
  function handleAfterToggle() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (isMobile()) {
          if (isMenuOpen()) lockScroll();
          else unlockScroll();
        }
        toggleMenuIcons(isMenuOpen());
      });
    });
  }

  // --- EVENT LISTENERS ---
  btn.addEventListener('click', handleAfterToggle, { passive: true });

  try {
    const observer = new MutationObserver(handleAfterToggle);
    observer.observe(menu, { attributes: true, attributeFilter: ['class', 'style', 'aria-hidden'] });
  } catch (e) { /* ignore */ }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && locked) unlockScroll();
  });

  window.addEventListener('resize', handleAfterToggle);

  requestAnimationFrame(handleAfterToggle);

  // --- CSS ICONE APPLE STYLE ---
  const supportCSS = `
.support-menu-icon,
.support-close-icon {
  position: absolute; /* sopra la navbar */
  top: 12;
  right: 16;
  z-index: 1000;
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: center;
}

.support-menu-icon {
  display: block;
  opacity: 1;
  transform: scale(1);
}

.support-close-icon {
  display: none;
  opacity: 0;
  transform: scale(0.8);
}
`;

  function addStyle(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  addStyle(supportCSS);

})();
