// 404-smart-redirect.js
// Redirect intelligente basato sullo slug reale salvato
// Compatibile GitHub Pages / Webflow

(function () {
  try {
    const path = window.location.pathname;
    const hash = window.location.hash || "";

    // Match SOLO URL senza slug finale
    // es: /it-it/122132
    const match = path.match(/^\/([a-z-]+)\/(\d+)\/?$/);
    if (!match) return;

    const locale = match[1];
    const id = match[2];

    // Recupera ultimo slug valido salvato
    const storedSlug = sessionStorage.getItem("lastValidSlug");
    const storedId = sessionStorage.getItem("lastValidId");
    const storedLocale = sessionStorage.getItem("lastValidLocale");

    // Se manca qualcosa → NON redirect
    if (!storedSlug || !storedId || !storedLocale) return;

    // Protezione: redirect SOLO se la pagina combacia
    if (storedId !== id || storedLocale !== locale) return;

    const redirectUrl = `/${locale}/${id}/${storedSlug}${hash}`;

    console.log("[404 smart redirect] →", redirectUrl);

    // Redirect reale (niente back loop)
    window.location.replace(redirectUrl);

  } catch (e) {
    console.error("[404 smart redirect] Errore:", e);
  }
})();
