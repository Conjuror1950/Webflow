// showLinkOnRefresh.js
(function() {
  try {
    const realSlug = "/manual";
    const targetUrl = "/it-it/102555" + realSlug;
    const path = window.location.pathname;

    // Controlla se l'utente non è già sulla pagina reale
    if (!path.endsWith(realSlug)) {
      // Crea un link visibile
      const link = document.createElement("a");
      link.href = targetUrl;
      link.textContent = "Vai alla versione completa della pagina";
      link.style.display = "block";      // visibile
      link.style.margin = "20px 0";      // un po' di spazio
      link.style.fontSize = "16px";      // dimensione leggibile
      link.style.color = "#007aff";      // colore simile Apple/blue link
      link.style.textDecoration = "underline";
      document.body.insertBefore(link, document.body.firstChild);

      // Non simuliamo il click: l'utente può cliccare manualmente
    } else {
      // Siamo già sulla pagina reale, possiamo nascondere lo slug
      const cleanPath = path.replace(new RegExp(realSlug + "$"), "");
      window.history.replaceState({}, "", cleanPath);
    }
  } catch (e) {
    console.error("Errore showLinkOnRefresh.js:", e);
  }
})();
