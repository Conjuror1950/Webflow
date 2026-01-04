// redirect.js
(function() {
  // Mappa dei redirect: chiave = URL corrente (relativo al dominio), valore = URL di destinazione
  const redirects = {
    "/vecchia-pagina": "/nuova-pagina",
    "/it/102555": "/it-it/102555/manual",
    "/pagina-vecchia-2": "/pagina-nuova-2"
    // aggiungi qui tutte le altre pagine da redirectare
  };

  // Ottiene l'URL relativo della pagina corrente
  const currentPath = window.location.pathname;

  // Controlla se è presente un redirect
  if (redirects[currentPath]) {
    // Redirect permanente 301 via JS
    window.location.replace(redirects[currentPath]);
  }
})();
