// removeSlugMultiple.js
// Rimuove gli slug specificati e, al refresh, reindirizza a /docs/desktop/301085
(function() {
  try {
    let currentPath = window.location.pathname;

    // Lista degli slug da rimuovere
    const slugsToRemove = [
      "/manual",
      "/manual1",
      "/manual2",
      "/manual3"
    ];

    let slugFound = false;

    // Rimuove tutti gli slug dalla fine (uno alla volta)
    slugsToRemove.forEach(slug => {
      if (currentPath.endsWith(slug)) {
        currentPath = currentPath.replace(new RegExp(slug + "$"), "");
        slugFound = true;
        console.log("[removeSlugMultiple.js] Slug rimosso:", slug);
      }
    });

    // Aggiorna la barra degli indirizzi (senza ricaricare)
    if (slugFound) {
      history.replaceState({}, "", currentPath);
      console.log("[removeSlugMultiple.js] URL visivo modificato:", currentPath);
    }

    // === NOVITÀ: al refresh (o caricamento) con uno slug, reindirizza ===
    if (slugFound) {
      // Questo fa il refresh e porta all'URL desiderato
      window.location.href = "/docs/desktop/301085";
    }

  } catch (e) {
    console.error("[removeSlugMultiple.js] Errore:", e);
  }
})();
