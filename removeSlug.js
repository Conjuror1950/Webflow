// removeSlugVisual.js
// Rimuove uno slug dall'URL senza cambiare la pagina e senza causare 404 al refresh
(function() {
  try {
    // Lo slug che vuoi rimuovere, ad esempio "/manual"
    const slugToRemove = "/manual";

    // Prendi il percorso attuale
    const currentPath = window.location.pathname;

    // Se l'URL finisce con lo slug, rimuovilo visivamente
    if (currentPath.endsWith(slugToRemove)) {
      const newPath = currentPath.replace(new RegExp(slugToRemove + "$"), "");
      
      // Modifica solo la barra degli indirizzi senza ricaricare la pagina
      window.history.replaceState({}, "", newPath);
    }
  } catch (e) {
    console.error("Errore removeSlugVisual.js:", e);
  }
})();
