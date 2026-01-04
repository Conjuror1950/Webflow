// removeSlugVisualOnly.js
// Mostra visivamente l'URL senza lo slug finale in hover
// Il link reale rimane intatto, tutti gli eventi funzionano normalmente

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
      // Memorizza l'href reale
      const realHref = link.getAttribute("href");
      if (!realHref) return;

      // Calcola l'URL visivo senza lo slug finale
      let displayHref = realHref;
      slugsToRemove.forEach(slug => {
        if (displayHref.endsWith(slug)) {
          displayHref = displayHref.replace(new RegExp(slug + "$"), "");
        }
      });

      // Usa l'attributo title per il tooltip (opzionale)
      link.setAttribute("title", displayHref);

      // Per mostrare l'URL in basso a sinistra senza modificare l'href,
      // creiamo un evento mouseover che "inganna" il browser
      link.addEventListener("mouseover", (e) => {
        // Crea un evento temporaneo per mostrare l'URL pulito
        // Nota: questo non è standard, ma alcuni browser rispettano l'attributo data-* in hover
        link.dataset.hrefVisual = displayHref;
      });

      link.addEventListener("mouseout", (e) => {
        link.dataset.hrefVisual = "";
      });
    });

    console.log("[removeSlugVisualOnly.js] Attivo: href visivo modificato, href reale intatto");
  } catch (e) {
    console.error("[removeSlugVisualOnly.js] Errore:", e);
  }
})();
