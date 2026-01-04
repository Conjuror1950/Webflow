// removeSlugVisualHoverFinal.js
// Mostra l'href senza lo slug finale solo in hover (in basso a sinistra)
// Il click rimane puntato al link reale

(function() {
  try {
    const slugsToRemove = ["/manual", "/video", "/album", "/extra"];
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

      // Solo hover: mostra href pulito
      link.addEventListener("mouseenter", () => {
        link.setAttribute("data-original-href", realHref);
        link.setAttribute("href", displayHref);
      });

      // Quando il mouse lascia il link, ripristina href reale
      link.addEventListener("mouseleave", () => {
        link.setAttribute("href", link.getAttribute("data-original-href"));
      });

      // Click: assicurati che il link reale venga sempre usato
      link.addEventListener("click", () => {
        link.setAttribute("href", realHref);
      });
    });

    console.log("[removeSlugVisualHoverFinal.js] Attivo: href visivi modificati solo in hover");
  } catch (e) {
    console.error("[removeSlugVisualHoverFinal.js] Errore:", e);
  }
})();
