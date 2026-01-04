// removeSlugVisualHover.js
// Rimuove slug solo visivamente, ma mantiene la navigazione reale
// Supporta nuova scheda via custom attribute

(function () {
  try {
    const slugs = [
      "/manual",
      "/introduction",
      "/album",
      "/extra"
    ];

    document.querySelectorAll("a[href]").forEach(a => {
      const originalHref = a.getAttribute("href");
      if (!originalHref) return;

      let cleanHref = originalHref;
      let modified = false;

      for (const slug of slugs) {
        if (cleanHref.endsWith(slug)) {
          cleanHref = cleanHref.slice(0, -slug.length);
          modified = true;
          break;
        }
      }

      if (!modified) return;

      // Salviamo href reale
      a.setAttribute("data-real-href", originalHref);

      // href pulito SOLO visivo (hover, status bar)
      a.href = cleanHref;

      // ───────────────────────────────────────
      // CLICK HANDLER
      // ───────────────────────────────────────
      a.addEventListener("click", function (e) {
        const realHref = a.getAttribute("data-real-href");

        // 🔥 Custom attribute → nuova scheda forzata
        if (a.getAttribute("data-open-new-tab") === "true") {
          e.preventDefault();
          window.open(realHref, "_blank");
          return;
        }

        // Click sinistro normale → stessa scheda
        if (
          e.button === 0 &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.shiftKey &&
          !e.altKey
        ) {
          e.preventDefault();
          window.location.href = realHref;
          return;
        }

        // Tutti gli altri casi → ripristiniamo href reale temporaneamente
        const visualHref = a.href;
        a.href = realHref;

        setTimeout(() => {
          a.href = visualHref;
        }, 0);
      });

      // ───────────────────────────────────────
      // MIDDLE CLICK (Firefox-safe)
      // ───────────────────────────────────────
      a.addEventListener("auxclick", function (e) {
        if (e.button === 1) {
          e.preventDefault();
          const realHref = a.getAttribute("data-real-href");
          window.open(realHref, "_blank");
        }
      });
    });

    console.log("[removeSlugVisualHover] ✔ Versione finale con nuova scheda custom");

  } catch (err) {
    console.error("[removeSlugVisualHover] Errore:", err);
  }
})();
