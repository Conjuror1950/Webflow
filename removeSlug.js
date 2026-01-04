(function() {
  try {
    const slugMap = {
      "/it-it/102555": "/it-it/102555/manual",
      "/it-it/102556": "/it-it/102556/manual1",
      "/it-it/102557": "/it-it/102557/manual2",
      "/it-it/102558": "/it-it/102558/manual3"
    };

    const staticRedirect = {
      "/it-it/102555": "/docs/desktop/301085"
    };

    const currentPath = window.location.pathname;

    // Se siamo su URL senza slug che mappa ad una CMS page, redirect alla pagina CMS reale
    if (slugMap[currentPath]) {
      // Check se è un reload
      const isRefresh = performance.getEntriesByType("navigation")[0]?.type === "reload";
      if (isRefresh) {
        // Redirect alla pagina statica desiderata
        window.location.replace(staticRedirect[currentPath] || slugMap[currentPath]);
      } else {
        // Se non è reload, aggiorna l'URL visivamente aggiungendo lo slug
        history.replaceState({}, "", slugMap[currentPath]);
      }
    }

  } catch(e) {
    console.error("Redirect script error:", e);
  }
})();
