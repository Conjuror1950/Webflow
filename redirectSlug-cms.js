// redirect-single-cms.js
(function() {
  window.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;

    // Redirect solo per la pagina con ID 102555
    if (currentPath === "/it-it/102555") {
      window.location.replace("/it-it/102555/manual");
    }
  });
})();
