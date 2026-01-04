// redirect-cms.js
(function() {
  // Prendi l'URL corrente (solo pathname)
  const currentPath = window.location.pathname;

  // Controlla se il path corrisponde a /it/numero
  const cmsMatch = currentPath.match(/^\/it\/(\d+)$/);

  if (cmsMatch) {
    const id = cmsMatch[1]; // es. 102632
    const newUrl = `/it-it/${id}/manual`;
    
    // Redirect lato client
    window.location.replace(newUrl);
  }
})();
