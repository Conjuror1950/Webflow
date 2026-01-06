// 404-redirect.js
// GitHub Pages / Webflow: redirect instantaneo da URL senza slug
(function () {
  try {
    // Nasconde subito la pagina per evitare il flash della 404
    document.documentElement.style.display = "none";
    document.body.style.display = "none";

    const path = window.location.pathname;
    const hash = window.location.hash || "";

    const validSlugs = [
      "manual",
      "introduction",
      "access",
      "settings",
      "accessibility",
      "support",
      "legal"
    ];

    // Match URL senza slug finale: /it-it/ID
    const match = path.match(/^\/([a-z-]+)\/(\d+)\/?$/);
    if (!match) {
      // NON redirect → mostra la pagina 404
      document.documentElement.style.display = "";
      document.body.style.display = "";
      return;
    }

    const locale = match[1];
    const id = match[2];

    // Fallback: primo slug valido
    const fallbackSlug = "access";

    if (!validSlugs.includes(fallbackSlug)) {
      // Mostra 404 se slug non valido
      document.documentElement.style.display = "";
      document.body.style.display = "";
      return;
    }

    const redirectUrl = `/${locale}/${id}/${fallbackSlug}${hash}`;

    console.log("[404 redirect] Redirect verso:", redirectUrl);

    // Redirect immediato
    window.location.replace(redirectUrl);

  } catch (e) {
    console.error("[404 redirect] Errore:", e);
    // Mostra pagina se c'è errore
    document.documentElement.style.display = "";
    document.body.style.display = "";
  }
})();
