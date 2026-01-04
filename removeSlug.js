// removeSlug.js
// Script per rimuovere il secondo slug "/manual" dall'URL visivo
// Funziona solo lato client (non cambia l'URL reale su server)

(function() {
  // Assicurati che la pagina sia completamente caricata
  window.addEventListener("DOMContentLoaded", function() {
    try {
      // Prendi il percorso attuale, es. /it-it/102555/manual
      let currentPath = window.location.pathname;

      // Controlla se contiene "/manual" alla fine
      if (currentPath.endsWith("/manual")) {
        // Rimuovi la parte "/manual"
        let newPath = currentPath.replace(/\/manual$/, "");

        // Sostituisci l'URL visivo senza ricaricare la pagina
        history.replaceState({}, "", newPath);

        console.log("[removeSlug.js] URL visivo modificato:", newPath);
      }
    } catch (e) {
      console.error("[removeSlug.js] Errore:", e);
    }
  });
})();
