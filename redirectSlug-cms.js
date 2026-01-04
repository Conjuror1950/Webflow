// removeSlugHref.js
// Modifica l'href visivo dei link rimuovendo lo slug finale
// Non cambia la navigazione reale

(function() {
  try {
    // Lista degli slug da rimuovere
    const slugsToRemove = [
      "/manual",
      "/video",
      "/album",
      "/extra"
    ];

    // Seleziona tutti i link della pagina
    const links = document.querySelectorAll("a");

    links.forEach(link => {
      let href = link.getAttribute("href");
      if (!href) return;

      // Controlla se termina con uno degli slug e lo rimuove per l'href visivo
      slugsToRemove.forEach(slug => {
        if (href.endsWith(slug)) {
          const newHref = href.replace(new RegExp(slug + "$"), "");
          link.setAttribute("href", newHref);
          console.log("[removeSlugHref.js] href visivo modificato:", newHref);
        }
      });
    });
  } catch (e) {
    console.error("[removeSlugHref.js] Errore:", e);
  }
})();

