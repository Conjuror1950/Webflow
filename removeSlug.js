// redirectClient.js
// Script lato client per simulare redirect 301 su tutto il sito
// Funziona su GitHub Pages o qualsiasi sito statico
// Modifiche visive opzionali incluse

(function() {
  // Lista dei redirect "vecchio URL" → "nuovo URL reale"
  const redirects = {
    "/it-it/102555": "/it-it/102555/manual",
    "/it-it/102556": "/it-it/102556/manual",
    "/it-it/103000": "/it-it/103000/manual"
    // aggiungi qui tutti gli altri redirect che vuoi
  };

  const realSlugToRemove = "/manual"; // parte visiva che vogliamo rimuovere

  window.addEventListener("DOMContentLoaded", function() {
    try {
      const path = window.location.pathname;

      // 1️⃣ Controlla se l'utente è su un "vecchio URL" → redirect automatico
      if (redirects[path]) {
        // window.location.replace simula redirect 301
        window.location.replace(redirects[path]);
        console.log(`[redirectClient.js] Redirect da ${path} a ${redirects[path]}`);
        return; // esci per evitare ulteriori modifiche
      }

      // 2️⃣ Se l'utente è già sulla pagina reale (es. /manual) → rimuovo visivamente il /manual
      if (path.endsWith(realSlugToRemove)) {
        const visualPath = path.replace(new RegExp(realSlugToRemove + "$"), "");
        history.replaceState({}, "", visualPath);
        console.log(`[redirectClient.js] URL visivo modificato: ${visualPath}`);
      }

    } catch (e) {
      console.error("[redirectClient.js] Errore:", e);
    }
  });
})();
