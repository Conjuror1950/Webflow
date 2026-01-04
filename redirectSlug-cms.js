// redirect-single-cms-webflow-fixed.js
(function() {
  const ORIG_PATH = "/it-it/102555";
  const DEST_PATH = "/it-it/102555/manual";

  function redirectIfNeeded() {
    if (window.location.pathname === ORIG_PATH) {
      // Usa replace per non mantenere nella cronologia
      window.location.replace(DEST_PATH);
    }
  }

  // redirect subito
  redirectIfNeeded();

  // controllo ogni 500ms per catturare caricamenti dinamici AJAX
  setInterval(redirectIfNeeded, 500);
})();
