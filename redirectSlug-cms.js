// redirect-cms-global.js
(function() {
  // Esegui il redirect solo dopo che la pagina è caricata
  window.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;

    // Match per URL CMS del tipo /it-it/NUMERO (es. /it-it/102555)
    const cmsRegex = /^\/it-it\/(\d+)\/?$/;
    const match = currentPath.match(cmsRegex);

    if (match) {
      const id = match[1]; // estrae il numero ID, es. 102555
      const newUrl = `/it-it/${id}/manual`;

      // Controlla che non stiamo già sulla destinazione
      if (currentPath !== newUrl) {
        // Redirect lato client
        window.location.replace(newUrl);
      }
    }
  });
})();
