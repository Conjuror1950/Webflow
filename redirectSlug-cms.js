// simulate-redirect-cms.js
(function() {
  const TARGET_ID = "102555"; // ID della pagina CMS
  const PARAM_NAME = "manual";

  function showManualSection() {
    // Controlla se siamo sulla pagina giusta
    if (window.location.pathname.endsWith("/" + TARGET_ID)) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get(PARAM_NAME) === "true") {
        // Mostra la sezione "manual"
        const manualSection = document.querySelector(".manual-section"); 
        if (manualSection) {
          manualSection.style.display = "block";
        }
        // Nascondi altre sezioni se serve
        const mainContent = document.querySelector(".main-content");
        if (mainContent) mainContent.style.display = "none";
      }
    }
  }

  // Esegui subito
  showManualSection();

  // Controlla ogni 500ms in caso di caricamento AJAX
  setInterval(showManualSection, 500);
})();
