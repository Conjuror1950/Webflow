// removeSlugVisualHover.js
// Mostra l'href senza lo slug finale solo in hover (in basso a sinistra)
// Il click rimane puntato al link reale

(function() {
  try {
    // Lista degli slug da rimuovere
    const slugsToRemove = [
      "/manual",
      "/video",
      "/album",
      "/extra"
    ];

    // Seleziona tutti i link della pagina
    const links = document.querySelectorAll("a");

    links.forEach(link => {
      // Memorizza l'href reale
      const realHref = link.getAttribute("href");
      if (!realHref) return;

      // Aggiungi evento mouseover per cambiare l'href visivo
      link.addEventListener("mouseover", () => {
        let displayHref = realHref;

        slugsToRemove.forEach(slug => {
          if (displayHref.endsWith(slug)) {
            displayHref = displayHref.replace(new RegExp(slug + "$"), "");
          }
        });

        // Aggiorna temporaneamente l'href visuale
        link.setAttribute("data-temp-href", displayHref);
        link.setAttribute("href", displayHref);
      });

      // Al mouseout ripristina l'href reale
      link.addEventListener("mouseout", () => {
        link.setAttribute("href", realHref);
      });

      // Garantisce che al click venga sempre usato l'href reale
      link.addEventListener("click", (e) => {
        if (link.getAttribute("href") !== realHref) {
          link.setAttribute("href", realHref);
        }
      });
    });

    console.log("[removeSlugVisualHover.js] Attivo: href visivi modificati solo in hover");
  } catch (e) {
    console.error("[removeSlugVisualHover.js] Errore:", e);
  }
})();
