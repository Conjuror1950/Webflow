(function () {
  const FIXED_HREF = window.location.pathname + "#";
  let currentIndex = 0;
  const tabs = document.querySelectorAll(".w-tab-link");
  const tabsMenu = tabs[0].parentElement;

  // Crea un singolo underline dinamico ma NON aggiungerlo subito
  let underline = document.createElement("div");
  underline.classList.add("tab-underline");

  // Stile base
  underline.style.position = "absolute";
  underline.style.bottom = "0";
  underline.style.height = "1px";
  underline.style.backgroundColor = "black";
  underline.style.transition = "left 0.2s ease-out, width 0.2s ease-out";

  // Posizione iniziale e aggiunta al DOM solo dopo il calcolo
  function initUnderline() {
    const tab = tabs[currentIndex];
    const rect = tab.getBoundingClientRect();
    const parentRect = tabsMenu.getBoundingClientRect();
    underline.style.left = (rect.left - parentRect.left) + "px";
    underline.style.width = rect.width + "px";

    // Appendiamo solo dopo aver settato posizione e larghezza
    tabsMenu.appendChild(underline);
  }

  // Posizione al click
  function positionUnderline(index) {
    const tab = tabs[index];
    const rect = tab.getBoundingClientRect();
    const parentRect = tabsMenu.getBoundingClientRect();
    underline.style.left = (rect.left - parentRect.left) + "px";
    underline.style.width = rect.width + "px";
  }

  // Inizializzazione dopo che il DOM è pronto
  window.addEventListener("load", function () {
    initUnderline();

    tabs.forEach((tab, i) => {
      // Forza href
      tab.setAttribute("href", FIXED_HREF);

      tab.addEventListener("click", function (e) {
        e.preventDefault();

        currentIndex = i;
        positionUnderline(currentIndex);

        // Aggiorna classe current
        tabs.forEach(t => t.classList.remove("current"));
        tab.classList.add("current");

        // Ripristina href in caso Webflow lo reinietti
        setTimeout(() => {
          tab.setAttribute("href", FIXED_HREF);
        }, 0);
      });
    });
  });

})();
