// redirect.js
(function() {
  // ----------------------------
  // 1️⃣ Redirect manuali (pagine singole)
  // ----------------------------
  const manualRedirects = {
    "/vecchia-pagina": "/nuova-pagina",
    "/pagina-vecchia-2": "/pagina-nuova-2"
    // aggiungi qui altre pagine manuali
  };

  const currentPath = window.location.pathname;

  // Se è un redirect manuale, esegui subito
  if (manualRedirects[currentPath]) {
    window.location.replace(manualRedirects[currentPath]);
    return;
  }

  // ----------------------------
  // 2️⃣ Redirect dinamici CMS
  // Formato: /it/numero → /it-it/numero/manual
  // ----------------------------
  const cmsMatch = currentPath.match(/^\/it\/(\d+)$/);

  if (cmsMatch) {
    const id = cmsMatch[1]; // es. 102632
    const newUrl = `/it-it/${id}/manual`;
    window.location.replace(newUrl);
  }

})();
