(function () {
  function cleanTabs() {
    document.querySelectorAll(".w-tab-link").forEach(function (tab) {
      if (tab.hasAttribute("href")) {
        tab.removeAttribute("href");
      }

      if (!tab.dataset.nohref) {
        tab.dataset.nohref = "true";

        tab.addEventListener("click", function (e) {
          e.preventDefault();

          // Webflow reinietta l'href DOPO il click → lo rimuoviamo di nuovo
          setTimeout(function () {
            tab.removeAttribute("href");
          }, 0);
        });
      }
    });
  }

  // Dopo caricamento completo Webflow
  window.addEventListener("load", cleanTabs);

  // Osserva CAMBI di attributi (classe w--current)
  const observer = new MutationObserver(cleanTabs);

  observer.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ["class"]
  });
})();
