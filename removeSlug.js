// removeSlugEarly.js
// Rimuove /manual e forza la navigazione verso un URL deciso

(function () {
  try {
    const currentPath = window.location.pathname;
    const targetUrl = "/it-it/102555/manual"; // 👈 URL X che decidi tu

    if (currentPath.endsWith("/manual")) {
      const newPath = currentPath.replace(/\/manual$/, "");

      // Aggiorna subito l'URL visivo
      history.replaceState({}, "", newPath);

      console.log("[removeSlugEarly.js] URL visivo modificato:", newPath);

      // Forza navigazione reale (equivalente a un click)
      window.location.replace(targetUrl);
    }
  } catch (e) {
    console.error("[removeSlugEarly.js] Errore:", e);
  }
})();
