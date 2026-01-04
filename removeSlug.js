// redirectClient.js
// Script lato client per visualizzare URL pulito e fare redirect su CMS reale

(function() {
  const redirects = {
    "/it-it/102555": "/it-it/102555/manual",
    "/it-it/102556": "/it-it/102556/manual",
    "/it-it/103000": "/it-it/103000/manual"
    // aggiungi qui tutti gli altri redirect
  };

  const realSlugToRemove = "/manual";

  window.addEventListener("DOMContentLoaded", function() {
    const path = window.location.pathname;

    // 1️⃣ Redirect "vecchio URL" → reale
    if (redirects[path]) {
      window.location.replace(redirects[path]);
      console.log(`[redirectClient.js] Redirect da ${path} a ${redirects[path]}`);
      return;
    }

    // 2️⃣ Rimuovi /manual dalla barra URL visivamente
    if (path.endsWith(realSlugToRemove)) {
      const visualPath = path.replace(new RegExp(realSlugToRemove + "$"), "");
      history.replaceState({}, "", visualPath);
      console.log(`[redirectClient.js] URL visivo modificato: ${visualPath}`);
    }
  });
})();
