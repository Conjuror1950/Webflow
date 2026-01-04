// cleanSlugWebflow.js
(function() {
  try {
    // Lo slug reale della pagina CMS
    const realSlug = "/manual";

    // URL attuale
    const currentPath = window.location.pathname;

    // Se l'URL termina con lo slug reale
    if (currentPath.endsWith(realSlug)) {
      // Nuovo path da mostrare nella barra
      const cleanPath = currentPath.replace(new RegExp(realSlug + "$"), "");

      // Cambia solo la barra dell'indirizzo, senza ricaricare
      window.history.replaceState({}, "", cleanPath);
    }
  } catch (e) {
    console.error("Errore cleanSlugWebflow.js:", e);
  }
})();
