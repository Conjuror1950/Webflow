// removeSlugVisualHoverSafe.js
// Mostra l'href senza lo slug finale solo in hover (in basso a sinistra)
// L'href reale rimane sempre intatto per qualsiasi evento

(function() {
  try {
    const slugsToRemove = [
      "/manual",
      "/video",
      "/album",
      "/extra"
    ];

    const links = document.querySelectorAll("a");

    links.forEach(link => {
      const realHref = link.getAttribute("href");
      if (!realHref) return;

      // Calcola l'URL "pulito" da mostrare
      let displayHref = realHref;
      slugsToRemove.forEach(slug => {
        if (displayHref.endsWith(slug)) {
          displayHref = displayHref.replace(new RegExp(slug + "$"), "");
        }
      });

      // Salva l'URL pulito su data attribute
      link.setAttribute("data-href-clean", displayHref);

      // Solo per visualizzazione hover: crea un listener che mostra il clean href
      link.addEventListener("mouseenter", () => {
        // Hack: modifica temporaneamente l'href visibile solo in tooltip del browser
        // Usiamo Object.defineProperty per creare un href "virtuale"
        Object.defineProperty(link, 'href', {
          get: () => displayHref,
          configurable: true
        });
      });

      link.addEventListener("mouseleave", () => {
        // Ripristina l'href reale
        Object.defineProperty(link, 'href', {
          get: () => realHref,
          configurable: true
        });
      });
    });

    console.log("[removeSlugVisualHoverSafe.js] Attivo: href visivi modificati solo in hover");
  } catch (e) {
    console.error("[removeSlugVisualHoverSafe.js] Errore:", e);
  }
})();
