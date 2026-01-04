// cleanURL.js
// Script per rimuovere visivamente "/manual" dall'URL
// Funziona solo lato client dopo che la pagina è stata caricata

(function() {
  window.addEventListener("DOMContentLoaded", function() {
    try {
      const realSlug = "/manual"; // parte reale dello slug
      const path = window.location.pathname;

      // Se l'URL contiene /manual, lo rimuovo visivamente
      if (path.endsWith(realSlug)) {
        const visualPath = path.replace(new RegExp(realSlug + "$"), "");
        history.replaceState({}, "", visualPath);
        console.log("[cleanURL.js] URL visivo modificato:", visualPath);
      }
    } catch (e) {
      console.error("[cleanURL.js] Errore:", e);
    }
  });
})();
