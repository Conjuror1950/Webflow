(function () {
  try {
    const path = window.location.pathname;
    const hash = window.location.hash || "";

    // Slug reali esistenti
    const validSlugs = [
      "manual",
      "introduction",
      "access",
      "settings",
      "accessibility",
      "support",
      "legal"
    ];

    // Match: /it-it/122132  (senza slug finale)
    const match = path.match(/^\/([a-z-]+)\/(\d+)\/?$/);

    if (!match) return;

    const locale = match[1];
    const id = match[2];

    // Prova a ricostruire l'URL reale
    // Priorità: access (o puoi cambiarla)
    const fallbackSlug = "access";

    if (!validSlugs.includes(fallbackSlug)) return;

    const redirectUrl = `/${locale}/${id}/${fallbackSlug}${hash}`;

    console.log("[404 redirect] Redirect verso:", redirectUrl);

    // Redirect reale (sostituisce la history)
    window.location.replace(redirectUrl);

  } catch (e) {
    console.error("[404 redirect] Errore:", e);
  }
})();
