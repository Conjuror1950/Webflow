// redirectSlug.js
// Script per rimuovere il secondo slug "/manual" e redirect automatico se si visita l'URL originale

(function() {
  window.addEventListener("DOMContentLoaded", function() {
    try {
      const currentPath = window.location.pathname;
      const originalSlug = "/manual"; // lo slug CMS da rimuovere
      const basePath = currentPath.replace(/\/manual$/, ""); // nuovo URL senza manual

      // Se l'URL contiene ancora "/manual", facciamo redirect
      if (currentPath.endsWith(originalSlug)) {
        // Usa replaceState per cambiare URL visivo senza ricaricare
        history.replaceState({}, "", basePath);
        console.log("[redirectSlug.js] URL visivo aggiornato:", basePath);
      } 
      // Se l'utente visita direttamente /it-it/102555 (senza /manual)
      // facciamo redirect verso l'URL CMS reale
      else {
        // Controlliamo se esiste il CMS slug da aggiungere
        const cmsSlug = "/manual";
        const cmsPath = currentPath + cmsSlug;

        // Redirect lato client verso la pagina CMS reale
        window.location.replace(cmsPath);
      }
    } catch (e) {
      console.error("[redirectSlug.js] Errore:", e);
    }
  });
})();
