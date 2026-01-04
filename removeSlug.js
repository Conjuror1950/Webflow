// removeSlugMultiple.js - Redirect SOLO su refresh (Webflow friendly)
(function () {
  try {
    const currentPath = window.location.pathname;
    const slugsToRemove = ["/manual", "/manual1", "/manual2", "/manual3"];

    // Controlliamo se siamo in uno degli URL "sporchi"
    const hasBadSlug = slugsToRemove.some(slug => currentPath.endsWith(slug));

    if (!hasBadSlug) return; // URL già pulito → esco subito

    // 0 = primo caricamento / navigazione normale
    // 1 = refresh (F5, ricarica, ricarica con Ctrl+R)
    // 2 = navigazione con avanti/indietro (history)
    const navType = window.performance?.navigation?.type ?? -1;

    console.log("[removeSlug] Navigation type:", navType);

    // Puliamo sempre l'URL nella barra (comportamento visivo desiderato)
    let newPath = currentPath;
    for (const slug of slugsToRemove) {
      if (newPath.endsWith(slug)) {
        newPath = newPath.slice(0, -slug.length);
      }
    }

    if (newPath !== currentPath) {
      history.replaceState(null, "", newPath);
      console.log("[removeSlug] URL pulito nella barra:", newPath);
    }

    // REDIRECT solo su refresh
    if (navType === 1) {
      console.log("[removeSlug] Refresh rilevato → redirect a pagina pulita");
      window.location.replace("/docs/desktop/301085");
      // .replace() invece di .href per non aggiungere al back-history
    }
    // Nota: su primo caricamento (type 0) NON facciamo redirect

  } catch (e) {
    console.error("[removeSlugMultiple]", e);
  }
})();
