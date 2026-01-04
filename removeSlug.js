// removeSlugAndRedirect.js
// Script per CMS Collection Pages Webflow
// - Rimuove il secondo slug dall'URL visivo
// - Gestisce refresh reindirizzando al vero slug CMS
(function() {
  // Mappa slug reali delle pagine CMS: chiave = URL "pulito", valore = URL reale
  const pageMap = {
    "/it-it/102555": "/it-it/102555/manual",
    "/it-it/102556": "/it-it/102556/manual",
    "/it-it/102557": "/it-it/102557/manual"
    // aggiungi qui tutte le altre pagine
  };

  const currentPath = window.location.pathname;

  // Se siamo su un URL "pulito", ma la pagina CMS reale è diversa → redirect
  if (pageMap[currentPath] && currentPath !== pageMap[currentPath]) {
    // Ricarica verso l'URL reale solo se la pagina non è già quella CMS
    if (!currentPath.endsWith("/manual")) {
      window.location.replace(pageMap[currentPath]);
      return; // fermiamo il resto del codice
    }
  }

  // Se siamo sulla pagina CMS reale, rimuoviamo /manual visivamente
  Object.values(pageMap).forEach(realPath => {
    if (currentPath === realPath && currentPath.endsWith("/manual")) {
      const cleanPath = currentPath.replace(/\/manual$/, "");
      history.replaceState({}, "", cleanPath);
      console.log("[removeSlugAndRedirect] URL visivo modificato:", cleanPath);
    }
  });
})();
