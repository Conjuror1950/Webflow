// redirectVisualUrl.js
// Redirect visivo lato client per rimuovere lo slug "/manual"
// Funziona su qualsiasi pagina con /manual alla fine dell'URL

(function() {
  // Esegui quando la pagina è completamente caricata
  window.addEventListener("DOMContentLoaded", function() {
    try {
      let currentPath = window.location.pathname;

      // Se l'URL termina con "/manual"
      if (currentPath.endsWith("/manual")) {
        // Costruisci il nuovo URL visivo
        let newPath = currentPath.replace(/\/manual$/, "/");

        // Sostituisci l'URL nella barra degli indirizzi senza ricaricare la pagina
        history.replaceState({}, "", newPath);

        console.log("[redirectVisualUrl.js] URL visivo aggiornato a:", newPath);
      }
    } catch (e) {
      console.error("[redirectVisualUrl.js] Errore:", e);
    }
  });
})();
