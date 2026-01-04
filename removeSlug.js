// redirectVisual.js
// Script per visualizzare URL pulito senza cambiare la pagina reale
// Funziona lato client per Webflow CMS

(function() {
  window.addEventListener("DOMContentLoaded", function() {
    try {
      const realSlug = "/manual"; // parte reale dello slug da mantenere
      let path = window.location.pathname; // es. /it-it/102555/manual

      // Caso 1: siamo sulla pagina reale /manual → rimuovo visualmente
      if (path.endsWith(realSlug)) {
        let visualPath = path.replace(new RegExp(realSlug + "$"), "");
        history.replaceState({}, "", visualPath);
        console.log("[redirectVisual.js] URL visivo:", visualPath);
      }

      // Caso 2: utente digita o refresh su /it-it/102555 → rimando alla pagina reale
      else if (!path.endsWith(realSlug)) {
        // ricostruisco il percorso reale
        let targetPath = path + realSlug;
        // ricarico la pagina reale senza cambiare contenuto se possibile
        window.location.replace(targetPath);
      }
    } catch (e) {
      console.error("[redirectVisual.js] Errore:", e);
    }
  });
})();
