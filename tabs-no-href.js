(function () {
  const FIXED_HREF = window.location.pathname + "#";
  let currentIndex = 0;

  const tabs = document.querySelectorAll(".w-tab-link");
  if (!tabs.length) return;

  const tabsMenu = tabs[0].parentElement;

  /* -------------------------------
     FUNZIONE ANTI-HREF WEBFLOW
  -------------------------------- */
  function forceHref(tab) {
    tab.removeAttribute("href");
    tab.setAttribute("href", FIXED_HREF);

    // Webflow reinietta più volte → forzatura multipla
    requestAnimationFrame(() => {
      tab.removeAttribute("href");
      tab.setAttribute("href", FIXED_HREF);
    });

    setTimeout(() => {
      tab.removeAttribute("href");
      tab.setAttribute("href", FIXED_HREF);
    }, 0);
  }

  /* -------------------------------
     UNDERLINE DINAMICO
  -------------------------------- */
  const underline = document.createElement("div");
  underline.classList.add("tab-underline");

  underline.style.position = "absolute";
  underline.style.bottom = "0";
  underline.style.height = "1px";
  underline.style.backgroundColor = "black";
  underline.style.transition = "left 0.2s ease-out, width 0.2s ease-out";

  function initUnderline() {
    const tab = tabs[currentIndex];
    const rect = tab.getBoundingClientRect();
    const parentRect = tabsMenu.getBoundingClientRect();

    underline.style.left = (rect.left - parentRect.left) + "px";
    underline.style.width = rect.width + "px";

    tabsMenu.appendChild(underline);
  }

  function positionUnderline(index) {
    const tab = tabs[index];
    const rect = tab.getBoundingClientRect();
    const parentRect = tabsMenu.getBoundingClientRect();

    underline.style.left = (rect.left - parentRect.left) + "px";
    underline.style.width = rect.width + "px";
  }

  /* -------------------------------
     INIT
  -------------------------------- */
  window.addEventListener("load", function () {
    initUnderline();

    tabs.forEach((tab, i) => {

      // Rimozione href iniziale (anti Webflow)
      forceHref(tab);

      tab.addEventListener("click", function (e) {
        e.preventDefault();

        currentIndex = i;
        positionUnderline(currentIndex);

        // Classe current
        tabs.forEach(t => t.classList.remove("current"));
        tab.classList.add("current");

        // Rimozione href anche al click
        forceHref(tab);
      });
    });
  });

})();
