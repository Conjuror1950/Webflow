// forceManualOnRefresh.js
(function () {
  try {
    const path = window.location.pathname;

    // Se l'URL NON termina con /manual
    if (!path.endsWith("/manual")) {
      const target = path + "/manual";

      // Evita loop
      if (window.location.pathname !== target) {
        window.location.replace(target);
      }
    }
  } catch (e) {
    console.error("[forceManualOnRefresh] Errore:", e);
  }
})();
