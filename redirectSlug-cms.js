// redirect-single-cms-webflow-force.js
(function() {
  const ORIG_PATH = "/it-it/102555";
  const DEST_PATH = "/it-it/102555/manual";

  function redirectIfNeeded() {
    if (window.location.pathname === ORIG_PATH) {
      // forza il redirect completo bypassando AJAX
      window.location.href = DEST_PATH + "?redirect=true";
    }
  }

  // redirect subito
  redirectIfNeeded();

  // ripeti ogni 500ms in caso di caricamenti AJAX
  setInterval(redirectIfNeeded, 500);
})();
