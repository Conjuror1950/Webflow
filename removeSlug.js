// safeRedirectManual.js
(function() {
  try {
    const realSlug = "/manual";
    const targetUrl = "/it-it/102555" + realSlug;
    const path = window.location.pathname;

    // Se non siamo già sulla pagina reale, simuliamo il click
    if (!path.endsWith(realSlug)) {
      const link = document.createElement("a");
      link.href = targetUrl;
      link.style.display = "none";
      document.body.appendChild(link);

      // Usa replaceState per evitare che lo storico generi loop al refresh
      window.history.replaceState({}, "", path);

      // Simula il click
      link.click();
    } else {
      // Siamo già sulla pagina reale: qui puoi far sparire lo slug
      const cleanPath = path.replace(new RegExp(realSlug + "$"), "");
      window.history.replaceState({}, "", cleanPath);
    }
  } catch (e) {
    console.error("Errore safeRedirectManual.js:", e);
  }
})();
