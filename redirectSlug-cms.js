// redirect-single-cms-webflow.js
(function() {
  const TARGET_PATH = "/it-it/102555";
  const REDIRECT_URL = "/it-it/102555/manual";

  function safeRedirect() {
    if (window.location.pathname === TARGET_PATH) {
      window.location.replace(REDIRECT_URL);
    }
  }

  // redirect subito
  safeRedirect();

  // ripeti ogni 500ms in caso di caricamenti dinamici
  setInterval(safeRedirect, 500);
})();
