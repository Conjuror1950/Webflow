// 404-redirect.js
// Ripristina lo slug corretto su refresh (GitHub Pages / Webflow)
// Sicuro, no loop, multi-slug

(function () {
  try {
    const path = window.location.pathname;
    const hash = window.location.hash || "";
    const referrer = document.referrer || "";

    const validSlugs = [
      "manual",
      "introduction",
      "access",
      "settings",
      "accessibility",
      "support",
      "legal"
    ];

    // Match SOLO URL senza slug finale
    // es: /it-it/122132
    const match = path.match(/^\/([a-z-]+)\/(\d+)\/?$/);
    if (!match) return;

    const locale = match[1];
    const id = match[2];

    /* ─────────────────────────────
       1️⃣ Tentativo: referrer
    ───────────────────────────── */
    if (referrer) {
      try {
        const refUrl = new URL(referrer);
        const refMatch = refUrl.pathname.match(
          new RegExp(`^/${locale}/${id}/([^/]+)$`)
        );

        if (refMatch) {
          const refSlug = refMatch[1];

          if (validSlugs.includes(refSlug)) {
            const redirectUrl = `/${locale}/${id}/${refSlug}${hash}`;
            console.log("[404 redirect] Da referrer:", redirectUrl);
            window.location.replace(redirectUrl);
            return;
          }
        }
      } catch (_) {}
    }

    /* ─────────────────────────────
       2️⃣ Fallback: tentativi ordinati
       (prima access, poi gli altri)
    ───────────────────────────── */
    const fallbackOrder = [
      "access",
      "manual",
      "introduction",
      "settings",
      "accessibility",
      "support",
      "legal"
    ];

    const slug = fallbackOrder.find(s =>
      validSlugs.includes(s)
    );

    if (!slug) return;

    const fallbackUrl = `/${locale}/${id}/${slug}${hash}`;
    console.log("[404 redirect] Fallback:", fallbackUrl);
    window.location.replace(fallbackUrl);

  } catch (e) {
    console.error("[404 redirect] Errore:", e);
  }
})();
