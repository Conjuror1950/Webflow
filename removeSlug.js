// clickOnRefresh.js
(function() {
  try {
    // Funzione per simulare il click sul link con classe "Link-block-108"
    function clickLinkBlock108() {
      const link = document.querySelector(".Link-block-108");
      if (link) {
        link.click();
        console.log("Click simulato sul link .Link-block-108");
      } else {
        console.warn("Link con classe .Link-block-108 non trovato");
      }
    }

    // Intercetta il refresh della pagina (prima che venga ricaricata)
    // Usando "beforeunload" possiamo agire prima del reload
    window.addEventListener("beforeunload", function(event) {
      // Simula il click sul link
      clickLinkBlock108();

      // Nota: non possiamo fermare davvero il reload, ma il click avviene prima
    });

    // Inoltre, se vuoi che il click avvenga anche quando la pagina viene aperta normalmente
    window.addEventListener("load", function() {
      const path = window.location.pathname;
      // Puoi mettere condizioni qui se vuoi cliccare solo su certe pagine
      // Altrimenti clicca sempre
      // clickLinkBlock108();
    });

  } catch (e) {
    console.error("Errore clickOnRefresh.js:", e);
  }
})();
