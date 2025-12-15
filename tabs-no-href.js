(function () {
  // Imposta QUI l'href che vuoi
  var FIXED_HREF = window.location.pathname + "#";

  function forceTabHref() {
    document.querySelectorAll(".w-tab-link").forEach(function (tab) {
      // Forza sempre lo stesso href
      if (tab.getAttribute("href") !== FIXED_HREF) {
        tab.setAttribute("href", FIXED_HREF);
      }

      // Evita di aggiungere più listener
      if (!tab.dataset.fixedHref) {
        tab.dataset.fixedHref = "true";

        // ======= CLICK HANDLER =======
        tab.addEventListener("click", function (e) {
          e.preventDefault();

          // Reset underline su tutte le tab
          document.querySelectorAll(".w-tab-link").forEach(function (t) {
            const ul = t.querySelector(".tab-underline");
            if (ul) ul.style.transform = "scaleX(0)";
            t.classList.remove("current");
          });

          // Attiva tab cliccata
          tab.classList.add("current");
          const underline = tab.querySelector(".tab-underline");
          if (underline) underline.style.transform = "scaleX(1)";

          // Dopo il click Webflow reinietta w-tabs → lo sovrascriviamo
          setTimeout(function () {
            tab.setAttribute("href", FIXED_HREF);
          }, 0);
        });
      }

      // ======= INIT UNDERLINE =======
      const underline = tab.querySelector(".tab-underline");
      if (underline) {
        // Stato iniziale
        if (tab.classList.contains("current")) {
          underline.style.transform = "scaleX(1)";
        } else {
          underline.style.transform = "scaleX(0)";
        }
        underline.style.transformOrigin = "left center";
        underline.style.transition = "transform 0.18s ease-out";
      }
    });
  }

  // Dopo inizializzazione Webflow
  window.addEventListener("load", forceTabHref);

  // Osserva QUALSIASI modifica agli attributi
  const observer = new MutationObserver(forceTabHref);

  observer.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ["href", "class"]
  });
})();
