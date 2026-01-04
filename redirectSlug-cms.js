// redirect-single-cms-fixed.js
(function() {
  'use strict';

  const TARGET_PATH = "/it-it/102555";
  const REDIRECT_URL = "/it-it/102555/manual";

  function safeRedirect() {
    try {
      if (window.location.pathname === TARGET_PATH) {
        window.location.replace(REDIRECT_URL);
      }
    } catch(e) {
      console.error('Redirect failed', e);
    }
  }

  // redirect subito
  safeRedirect();

  // redirect ripetuto ogni 1 secondo in caso di caricamenti AJAX
  setInterval(safeRedirect, 1000);

})();
