// redirectOnRefresh.js
(function() {
  try {
    // URL visivo attuale
    const currentPath = window.location.pathname;

    // Se l'URL non contiene "/manual" ma dovrebbe
    if (!currentPath.endsWith("/manual")) {
      // Costruisci il path reale
      const realPath = currentPath + "/manual";

      // Reindirizza subito alla pagina reale
      window.location.replace(realPath);
    }
  } catch (e) {
    console.error("[redirectOnRefresh.js] Errore:", e);
  }
})();
