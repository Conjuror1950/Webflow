// removeSlugMultiple.js
// Rimuove slug dalla fine dell'URL e fa redirect SOLO al refresh (non al primo caricamento)
(function() {
  try {
    const currentPath = window.location.pathname;
    
    // Lista degli slug da rimuovere
    const slugsToRemove = [
      "/manual",
      "/manual1",
      "/manual2",
      "/manual3"
    ];

    let slugFound = false;
    let cleanedPath = currentPath;

    // Rimuoviamo eventuali slug multipli dalla fine
    slugsToRemove.forEach(slug => {
      if (cleanedPath.endsWith(slug)) {
        cleanedPath = cleanedPath.slice(0, -slug.length);
        slugFound = true;
        console.log("[removeSlugMultiple.js] Slug rimosso:", slug);
      }
    });

    // Se abbiamo rimosso almeno uno slug → aggiorniamo la barra indirizzi
    if (slugFound) {
      // Aggiorna URL visibile senza ricaricare la pagina
      history.replaceState(null, "", cleanedPath);
      console.log("[removeSlugMultiple.js] URL visivo aggiornato:", cleanedPath);

      // Controlliamo se questo è un refresh (performance.navigation.type)
      // type 1 = ricaricamento (refresh)
      if (performance?.navigation?.type === 1) {
        console.log("[removeSlugMultiple.js] Refresh rilevato → redirect");
        window.location.replace("/docs/desktop/301085");
      }
      // Nota: NON facciamo redirect se è type 0 (navigazione normale / primo caricamento)
    }

  } catch (e) {
    console.error("[removeSlugMultiple.js] Errore:", e);
  }
})();
