// removeSlugMultiple.js
(function() {
  try {
    let currentPath = window.location.pathname;
    const slugsToRemove = [
      "/manual",
      "/manual1",
      "/manual2",
      "/manual3"
    ];
    let slugFound = false;

    // Rimuove gli slug dalla fine
    slugsToRemove.forEach(slug => {
      if (currentPath.endsWith(slug)) {
        currentPath = currentPath.replace(new RegExp(slug + "$"), "");
        slugFound = true;
        console.log("[removeSlugMultiple.js] Slug rimosso:", slug);
      }
    });

    // Aggiorna la barra degli indirizzi senza ricaricare
    if (slugFound) {
      history.replaceState({}, "", currentPath);
      console.log("[removeSlugMultiple.js] URL visivo modificato:", currentPath);
    }

    // Solo se la pagina è stata ricaricata, fai il redirect
    if (slugFound) {
      const navEntries = performance.getEntriesByType("navigation");
      const navType = navEntries[0]?.type || "navigate";

      // navType può essere "navigate" (primo caricamento), "reload" (refresh), "back_forward"
      if (navType === "reload") {
        console.log("[removeSlugMultiple.js] Redirect per refresh");
        window.location.href = "/docs/desktop/301085";
      } else {
        console.log("[removeSlugMultiple.js] Primo caricamento, nessun redirect");
      }
    }

  } catch (e) {
    console.error("[removeSlugMultiple.js] Errore:", e);
  }
})();
