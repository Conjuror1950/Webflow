// removeSlugMultiple.js
// Rimuove gli slug specificati dalla fine dell'URL il prima possibile
// Aggiorna la barra degli indirizzi prima del rendering

(function() {
  try {
    let currentPath = window.location.pathname;

    // Lista degli slug da rimuovere
    const slugsToRemove = [
      "/manual",       // Manuale
      "/manual1",        // collezione 2
      "/manual2",        // collezione 3
      "/manual3"         // collezione 4
    ];

    // Controlla se l'URL termina con uno degli slug
    slugsToRemove.forEach(slug => {
      if (currentPath.endsWith(slug)) {
        const newPath = currentPath.replace(new RegExp(slug + "$"), "");
        history.replaceState({}, "", newPath);
        console.log("[removeSlugMultiple.js] URL visivo modificato:", newPath);

        // Aggiorna currentPath per eventuali ulteriori slug
        currentPath = newPath;
      }
    });
  } catch (e) {
    console.error("[removeSlugMultiple.js] Errore:", e);
  }
})();
