(function () {
  const FIXED_HREF = window.location.pathname + "#";
  let currentIndex = 0;
  const tabs = document.querySelectorAll(".w-tab-link");
  const tabsMenu = tabs[0].parentElement;

  // Crea un singolo underline dinamico
  let underline = document.createElement("div");
  underline.classList.add("tab-underline");
  tabsMenu.appendChild(underline);

  // Stile base
  underline.style.position = "absolute";
  underline.style.bottom = "0";
  underline.style.height = "1px";
  underline.style.backgroundColor = "black";
  underline.style.transition = "left 0.2s ease-out, width 0.2s ease-out";

  // <<<<<<<<<<<<<< Aggiungi qui
  underline.style.opacity = "0"; // nasconde fino a calcolo posizione

  function positionUnderline(index) {
    const tab = tabs[index];
    const rect = tab.getBoundingClientRect();
    const parentRect = tabsMenu.getBoundingClientRect();
    const left = rect.left - parentRect.left;
    const width = rect.width;

    underline.style.left = left + "px";
    underline.style.width = width + "px";

    // <<<<<<<<<<<<<< Aggiungi qui
    underline.style.opacity = "1"; // mostra solo dopo aver settato posizione e larghezza
  }

  // Posizione iniziale
  window.addEventListener("load", function () {
    positionUnderline(currentIndex);

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
