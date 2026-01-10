// removeSlugMultiple.js
// Rimuove gli slug dalla fine dell'URL mantenendo hash e navigazione interna
(function () {
  try {
    let path = window.location.pathname;
    const hash = window.location.hash || "";

    const slugsToRemove = [
      "/manual",
      "/introduction",
      "/access",
      "/settings",
      "/accessibility",
      "/support",
      "/legal",
    ];

    slugsToRemove.forEach(slug => {
      if (path.endsWith(slug)) {
        path = path.replace(new RegExp(slug + "$"), "");
      }
    });

    const newUrl = path + hash;

    if (newUrl !== window.location.pathname + window.location.hash) {
      history.replaceState({}, "", newUrl);
      console.log("[removeSlugMultiple.js] URL visivo modificato:", newUrl);
    }

  } catch (e) {
    console.error("[removeSlugMultiple.js] Errore:", e);
  }
})();
