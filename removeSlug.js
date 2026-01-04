// autoClickManual.js
(function() {
  try {
    const realUrl = "/it-it/102555/manual"; // la pagina reale CMS

    // Crea un link invisibile verso la pagina reale
    const link = document.createElement("a");
    link.href = realUrl;
    link.style.display = "none";
    document.body.appendChild(link);

    // Simula un click su quel link ogni volta che la pagina viene caricata
    window.addEventListener("load", function() {
      link.click();
    });
  } catch (e) {
    console.error("Errore autoClickManual.js:", e);
  }
})();
