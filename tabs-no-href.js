(function () {

  const FIXED_HREF = window.location.pathname + "#";
  let currentIndex = 0;

  const tabs = document.querySelectorAll(".w-tab-link");
  if (!tabs.length) return;

  const tabsMenu = tabs[0].parentElement;

  /* ----------------------------------------------------
     FUNZIONE ANTI-WEBFLOW HREF
  ---------------------------------------------------- */
  function forceHref(tab) {
    tab.removeAttribute("href");
    tab.setAttribute("href", FIXED_HREF);

    // Webflow reinietta in più fasi → tripla forzatura
    requestAnimationFrame(() => {
      tab.removeAttribute("href");
      tab.setAttribute("href", FIXED_HREF);
    });

    setTimeout(() => {
      tab.removeAttribute("href");
      tab.setAttribute("href", FIXED_HREF);
    }, 0);
  }

  /* ----------------------------------------------------
     UNDERLINE DINAMICO (CREATO VIA JS)
  ---------------------------------------------------- */
  const underline = document.createElement("div");
  underline.classList.add("tab-underline");

  underline.style.position = "absolute";
  underline.style.bottom = "0";
  underline.style.height = "1px";
  underline.style.backgroundColor = "black";
  underline.style.pointerEvents = "none";
  underline.style.transition = "left 0.2s ease-out, width 0.2s ease-out";

  /* ----------------------------------------------------
     CALCOLO POSIZIONE UNDERLINE
  ---------------------------------------------------- */
  function setUnderline(index) {
    const tab = tabs[index];
    const rect = tab.getBoundingClientRect();
    const parentRect = tabsMenu.getBoundingClientRect();

    underline.style.left = (rect.left - parentRect.left) + "px";
    underline.style.width = rect.width + "px";
  }

  /* ----------------------------------------------------
     INIZIALIZZAZIONE (NO FLASH)
  ---------------------------------------------------- */
  function initUnderline() {
    setUnderline(currentIndex);
    tabsMenu.appendChild(underline);
  }

  /* ----------------------------------------------------
     LOAD
  ---------------------------------------------------- */
  window.addEventListener("load", () => {

    // Tab iniziale (current Webflow o fallback 0)
    tabs.forEach((tab, i) => {
      if (tab.classList.contains("w--current")) {
        currentIndex = i;
      }
    });

    initUnderline();

    tabs.forEach((tab, i) => {

      // Neutralizza href appena possibile
      forceHref(tab);

      tab.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        currentIndex = i;

        // Animazione underline
        setUnderline(currentIndex);

        // Neutralizza di nuovo l'href (Webflow click reinjection)
        forceHref(tab);
      });
    });
  });

})();
