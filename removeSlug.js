// removeSlugEarly.js
// Rimuove il secondo slug "/manual" il prima possibile
// L'URL visivo viene aggiornato prima del rendering della pagina

(function() {
  try {
    let currentPath = window.location.pathname;

    if (currentPath.endsWith("/manual")) {
      // Rimuovi "/manual"
      let newPath = currentPath.replace(/\/manual$/, "");

      // Aggiorna subito la barra degli indirizzi
      history.replaceState({}, "", newPath);

      console.log("[removeSlugEarly.js] URL visivo modificato:", newPath);
    }
  } catch (e) {
    console.error("[removeSlugEarly.js] Errore:", e);
  }
})();
