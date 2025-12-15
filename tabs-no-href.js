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

        tab.addEventListener("click", function (e) {
          e.preventDefault();

          // Dopo il click Webflow reinietta w-tabs → lo sovrascriviamo
          setTimeout(function () {
            tab.setAttribute("href", FIXED_HREF);
          }, 0);
        });
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
