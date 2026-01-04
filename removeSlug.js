// safeSlugWebflow.js
(function() {
  try {
    const realSlug = "/manual"; // lo slug reale da rimuovere
    const path = window.location.pathname;

    // Se l'URL non termina con lo slug reale, redirect immediato
    if (!path.endsWith(realSlug)) {
      // Redirect immediato senza aggiungere alla cronologia (evita loop)
      window.location.replace(path + realSlug);
    } else {
      // Siamo già sulla pagina reale: nascondi lo slug nella barra
      const cleanPath = path.replace(new RegExp(realSlug + "$"), "");
      window.history.replaceState({}, "", cleanPath);
    }
  } catch (e) {
    console.error("Errore safeSlugWebflow.js:", e);
  }
})();
