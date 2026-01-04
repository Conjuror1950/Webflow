// redirect-single-cms.js
(function() {
  window.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;

    // Redirect solo per la pagina con ID 102555
    if (currentPath === "https://support-andreaingrassia.webflow.io//it-it/102555") {
      window.location.replace("https://support-andreaingrassia.webflow.io//it-it/102555/manual");
    }
  });
})();
