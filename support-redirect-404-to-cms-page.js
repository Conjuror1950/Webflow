// 404-redirect-map.js
// GitHub Pages / Webflow: redirect instantaneo da URL senza slug con mappa
(function () {
  try {
    // Nasconde subito la pagina per evitare il flash della 404
    document.documentElement.style.display = "none";
    document.body.style.display = "none";

    const path = window.location.pathname;
    const hash = window.location.hash || "";

    // Mappa ID → slug corretto
    // Chiave = ID numerico, Valore = slug da aggiungere
    const slugMap = {
      "102555": "manual",
      "100351": "introduction",
      "122003": "manual",
      "122080": "manual",
      "121720": "manual",
      "111892": "manual",
      "122125": "access",
      "122132": "access",
      "122141": "access",
      "121907": "settings",
      "121918": "settings",
      "121933": "settings",
      "100306": "accessibility",
      "100318": "accessibility",
      "100330": "accessibility",
      "102970": "support",
      "102967": "support",
      "102971": "support",
      "103838": "legal"
      // aggiungi qui altri ID e slug
    };

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

    // Controlla se l'ID esiste nella mappa
    const slug = slugMap[id];
    if (!slug) {
      // Nessuna corrispondenza → mostra 404
      document.documentElement.style.display = "";
      document.body.style.display = "";
      return;
    }

    const redirectUrl = `/${locale}/${id}/${slug}${hash}`;

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
