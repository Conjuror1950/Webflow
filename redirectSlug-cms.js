// redirect-cms.js
(function() {
  // Assicurati che la pagina sia completamente caricata
  window.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;

    // Match per slug numerico (es. /it/102632 o /102632)
    const cmsRegex = /^\/(?:it\/)?(\d+)\/?$/;
    const match = currentPath.match(cmsRegex);

    if (match) {
      const id = match[1]; // es. 102632
      const newUrl = `/it-it/${id}/manual`; // destinazione
      if (newUrl !== currentPath) {
        // Redirect lato client
        window.location.replace(newUrl);
      }
    }
  });
})();
