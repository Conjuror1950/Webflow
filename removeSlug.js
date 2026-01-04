// clickOnRefresh.js
(function() {
  try {
    // Trova il link con la classe specificata
    const targetLink = document.querySelector(".Link-block-108");

    if (targetLink) {
      // Intercetta il refresh/close della pagina
      window.addEventListener("beforeunload", function(e) {
        // Simula il click sul link
        targetLink.click();

        // Non necessario bloccare l'evento, solo simuliamo il click
      });
    } else {
      console.warn("clickOnRefresh.js: link con classe 'Link-block-108' non trovato.");
    }
  } catch (e) {
    console.error("Errore clickOnRefresh.js:", e);
  }
})();
