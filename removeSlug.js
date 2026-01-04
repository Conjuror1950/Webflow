// redirectFakeClick.js
(function() {
  try {
    // Lo slug reale della pagina CMS
    const realSlug = "/manual";

    // URL pulito da mostrare all'utente
    const cleanPath = window.location.pathname;

    // Controlla se l'URL non contiene lo slug reale
    if (!cleanPath.endsWith(realSlug)) {
      // Crea un link invisibile verso l'URL corretto
      const a = document.createElement("a");
      a.href = cleanPath + realSlug; // costruisci l'URL reale
      a.style.display = "none";
      document.body.appendChild(a);

      // Simula il click sul link
      a.click();
    }
  } catch (e) {
    console.error("Errore redirectFakeClick.js:", e);
  }
})();
