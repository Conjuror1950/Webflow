// redirect301Visual.js
// Simula un redirect 301 lato client per Webflow CMS
// Mostra URL pulito /it-it/102555 senza cambiare la pagina reale /manual

(function() {
  window.addEventListener("DOMContentLoaded", function() {
    try {
      const realSlug = "/manual"; // slug reale CMS
      const path = window.location.pathname;

      // Caso 1: siamo sulla pagina reale /manual → rimuovo visivamente
      if (path.endsWith(realSlug)) {
        const visualPath = path.replace(new RegExp(realSlug + "$"), "");
        history.replaceState({}, "", visualPath);
        console.log("[redirect301Visual.js] URL visivo:", visualPath);
      }

      // Caso 2: utente digita o fa refresh su /it-it/102555 → reindirizzo alla pagina reale
      else if (!path.endsWith(realSlug)) {
        const targetPath = path + realSlug;

        // Simula redirect 301 lato client
        // 'replace' non aggiunge voce in cronologia → come un vero 301
        window.location.replace(targetPath);
      }

    } catch (e) {
      console.error("[redirect301Visual.js] Errore:", e);
    }
  });
})();
