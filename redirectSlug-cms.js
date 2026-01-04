// removeSlugVisualHoverSafe.js
// Mostra l'href senza lo slug finale solo visivamente
// Non interferisce con click, nuova scheda, copia link ecc.

(function() {
  try {
    // Slug da rimuovere visivamente
    const slugsToRemove = ["/manual", "/video", "/album", "/extra"];

    // Seleziona tutti i link
    const links = document.querySelectorAll("a");

    links.forEach(link => {
      const realHref = link.getAttribute("href");
      if (!realHref) return;

      // Genera l'href visivo senza cambiare href reale
      let displayHref = realHref;
      slugsToRemove.forEach(slug => {
        if (displayHref.endsWith(slug)) {
          displayHref = displayHref.replace(new RegExp(slug + "$"), "");
        }
      });

      // Usa CSS per mostrare il link "pulito" in hover (in tooltip o simile)
      // Non toccare mai l'href reale!
      link.dataset.displayHref = displayHref;

      // Evento mouseover per console o debug
      link.addEventListener("mouseover", () => {
        console.log("[Hover] href visivo:", displayHref);
      });
    });

    console.log("[removeSlugVisualHoverSafe.js] Attivo: href visivi senza modificare href reale");
  } catch (e) {
    console.error("[removeSlugVisualHoverSafe.js] Errore:", e);
  }
})();
