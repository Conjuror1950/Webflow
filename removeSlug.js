// fullSafeSlugHandler.js
(function() {
  try {
    const realSlug = "/manual"; // lo slug reale da rimuovere
    const linkSelector = ".Link-block-108"; // il link da cliccare al refresh

    // Funzione per nascondere lo slug dalla barra dell'indirizzo
    function hideSlug() {
      const path = window.location.pathname;
      if (path.endsWith(realSlug)) {
        const cleanPath = path.replace(new RegExp(realSlug + "$"), "");
        window.history.replaceState({}, "", cleanPath);
      }
    }

    // Simula il click sul link invisibile prima che la pagina si ricarichi
    window.addEventListener("beforeunload", function() {
      const link = document.querySelector(linkSelector);
      if (link) {
        // Simula click immediato
        link.click();
      }
    });

    // Nascondi lo slug al caricamento della pagina
    window.addEventListener("load", hideSlug);

  } catch (e) {
    console.error("Errore fullSafeSlugHandler.js:", e);
  }
})();
