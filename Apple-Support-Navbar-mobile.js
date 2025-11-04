// menu-mobile-apple.js
document.addEventListener("DOMContentLoaded", function () {
  // Seleziona elementi tramite data-attributes (aggiungili in Webflow come spiegato)
  const menuButton = document.querySelector('[data-menu-button="true"]');
  const navMenu = document.querySelector('[data-menu="true"]');

  if (!menuButton || !navMenu) {
    console.warn("[menu-mobile-apple] Elementi mancanti: assicurati di avere data-menu-button='true' sul bottone e data-menu='true' sul menu.");
    return;
  }

  // ---- CONFIG ----
  const duration = 500; // ms (animazione complessiva)
  const navHeightDefault = 40; // fallback per --nav-height (px)
  // ----------------

  // Inject CSS (scope tramite data-attributes)
  (function injectStyles() {
    const style = document.createElement("style");
    style.id = "menu-mobile-apple-styles";
    style.textContent = `
      :root { --nav-height: ${navHeightDefault}px; }

      /* Menu: posizione full-screen sotto la navbar */
      [data-menu="true"] {
        position: fixed !important;
        top: var(--nav-height) !important;
        left: 0 !important;
        right: 0 !important;
        height: calc(100vh - var(--nav-height)) !important;
        width: 100% !important;
        background: rgba(0,0,0,0.95) !important;
        backdrop-filter: blur(8px) !important;
        z-index: 9998 !important;
        overflow: auto !important;
        -webkit-overflow-scrolling: touch !important;
        transform: translateY(-100%) !important;
        opacity: 0 !important;
        transition: transform ${duration}ms ease-out, opacity ${duration}ms ease-out !important;
        will-change: transform, opacity;
        box-sizing: border-box;
      }

      /* Stato aperto (se desideri usare solo CSS) */
      [data-menu="true"].open, [data-menu="true"].w--open {
        transform: translateY(0) !important;
        opacity: 1 !important;
      }

      /* Hamburger SVG base (se presente o iniettato) */
      [data-menu-button="true"] {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        padding: 8px;
        cursor: pointer;
      }

      [data-menu-button="true"] svg {
        display: block;
      }

      [data-menu-button="true"] .bar {
        transition: transform ${duration}ms ease, opacity ${duration}ms ease;
        transform-origin: center;
        stroke-linecap: round;
      }

      /* Trasformazione in X quando il bottone ha classe .open */
      [data-menu-button="true"].open .bar1 {
        transform: translateY(6px) rotate(45deg);
      }
      [data-menu-button="true"].open .bar2 {
        opacity: 0;
      }
      [data-menu-button="true"].open .bar3 {
        transform: translateY(-6px) rotate(-45deg);
      }

      /* Piccoli aggiustamenti responsive (opzionali) */
      @media (max-width: 640px) {
        [data-menu="true"] { height: calc(100vh - var(--nav-height)); }
      }
    `;
    document.head.appendChild(style);
  })();

  // Se l'utente vuole controllare l'altezza della navbar, può definire la variabile CSS:
  // in Webflow: Project Settings → Custom Code → Head
  // :root { --nav-height: 72px; }

  // Se il bottone non ha già un SVG con classi .bar1 .bar2 .bar3, iniettiamone uno semplice (non sovrascrive se già presente)
  (function ensureSVGIcon() {
    const hasBars = menuButton.querySelector(".bar1, .bar2, .bar3");
    if (hasBars) return;

    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    const createLine = (className, y) => {
      const line = document.createElementNS(ns, "line");
      line.setAttribute("class", "bar " + className);
      line.setAttribute("x1", "3");
      line.setAttribute("x2", "21");
      line.setAttribute("y1", String(y));
      line.setAttribute("y2", String(y));
      line.setAttribute("stroke", "currentColor");
      line.setAttribute("stroke-width", "2");
      line.setAttribute("stroke-linecap", "round");
      return line;
    };

    svg.appendChild(createLine("bar1", 6));
    svg.appendChild(createLine("bar2", 12));
    svg.appendChild(createLine("bar3", 18));

    // svuota contenuto testuale per evitare doppioni se bottone ha label
    menuButton.insertBefore(svg, menuButton.firstChild);
  })();

  // Scroll lock helpers (iOS-safe)
  let scrollPos = 0;
  function lockScroll() {
    scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPos}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }
  function unlockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollPos);
    document.documentElement.style.scrollBehavior = '';
  }

  // Apertura/chiusura visiva (gestisce inline style e classi)
  function openMenu() {
    // imposta transizione open (ease-out)
    navMenu.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
    navMenu.classList.add("open"); // per compatibilità CSS
    navMenu.classList.add("w--open"); // se vuoi forzare lo stato visivo (non obbligatorio)
    // set inline (ridondante ma robusto)
    navMenu.style.transform = "translateY(0)";
    navMenu.style.opacity = "1";
    lockScroll();
    menuButton.classList.add("open");
  }

  function closeMenu() {
    // transizione close (ease-in)
    navMenu.style.transition = `transform ${duration}ms ease-in, opacity ${duration}ms ease-in`;
    navMenu.classList.remove("open");
    navMenu.classList.remove("w--open"); // rimuoviamo anche qui per fallback
    navMenu.style.transform = "translateY(-100%)";
    navMenu.style.opacity = "0";
    menuButton.classList.remove("open");
    // unlock dopo la durata dell'animazione
    setTimeout(() => {
      unlockScroll();
    }, duration + 10);
  }

  // MutationObserver: osserva cambi di classe su navMenu (es. Webflow aggiunge/removes 'w--open')
  const observer = new MutationObserver((mutationsList) => {
    // prendi lo stato corrente (w--open)
    const isOpen = navMenu.classList.contains("w--open") || navMenu.classList.contains("open");
    if (isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  observer.observe(navMenu, { attributes: true, attributeFilter: ["class"] });

  // Click sul bottone: fallback toggle (se Webflow non gestisce)
  menuButton.addEventListener("click", (e) => {
    // Se Webflow gestisce già l'apertura via classi, il MutationObserver intercetterà.
    // Per fallback toggliamo la classe w--open sul navMenu.
    const isOpen = navMenu.classList.contains("w--open") || navMenu.classList.contains("open");
    if (!isOpen) {
      navMenu.classList.add("w--open");
      // openMenu() verrà chiamata dall'observer ma la chiamiamo anche come fallback immediato:
      openMenu();
    } else {
      navMenu.classList.remove("w--open");
      closeMenu();
    }
  });

  // Click esterno: chiudi il menu se clicchi fuori
  document.addEventListener("click", (ev) => {
    const isOpen = navMenu.classList.contains("w--open") || navMenu.classList.contains("open");
    if (!isOpen) return;
    const target = ev.target;
    if (!navMenu.contains(target) && !menuButton.contains(target)) {
      // chiudi
      navMenu.classList.remove("w--open");
      closeMenu();
    }
  });

  // Escape key: chiudi
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" || ev.key === "Esc") {
      const isOpen = navMenu.classList.contains("w--open") || navMenu.classList.contains("open");
      if (isOpen) {
        navMenu.classList.remove("w--open");
        closeMenu();
      }
    }
  });

  // Inizializza stato a load (se il menu è già aperto)
  (function initState() {
    const isOpen = navMenu.classList.contains("w--open") || navMenu.classList.contains("open");
    if (isOpen) {
      // assicurati che stato iniziale sia coerente
      navMenu.style.transform = "translateY(0)";
      navMenu.style.opacity = "1";
      menuButton.classList.add("open");
      lockScroll();
    } else {
      navMenu.style.transform = "translateY(-100%)";
      navMenu.style.opacity = "0";
      menuButton.classList.remove("open");
    }
  })();

  // Fornisce una piccola API di debug nel window (facoltativa)
  window.__menuMobileApple = {
    open: () => { navMenu.classList.add("w--open"); openMenu(); },
    close: () => { navMenu.classList.remove("w--open"); closeMenu(); },
    toggle: () => {
      const isOpen = navMenu.classList.contains("w--open");
      if (!isOpen) { navMenu.classList.add("w--open"); openMenu(); }
      else { navMenu.classList.remove("w--open"); closeMenu(); }
    }
  };

});
