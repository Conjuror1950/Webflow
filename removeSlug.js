(function() {
  const realSlug = "/manual";
  const path = window.location.pathname;

  // Se manca lo slug, vai alla pagina reale
  if (!path.endsWith(realSlug)) {
    window.location.replace(path + realSlug);
  } else {
    // Rimuovi lo slug dalla barra senza ricaricare
    history.replaceState({}, "", path.replace(new RegExp(realSlug + "$"), ""));
  }
})();
