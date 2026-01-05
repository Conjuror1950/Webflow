// removeSlugVisualHover.js
// Rimuove slug SOLO visivamente (hover/status bar)
// Supporta hash (#), nuova scheda e navigazione reale intatta

(function () {
  try {
    const slugs = [
      "/manual",
      "/introduction",
      "/access",
      "/settings",
      "/accessibility",
      "/support"
    ];

    document.querySelectorAll("a[href]").forEach(a => {
      const originalHref = a.getAttribute("href");
      if (!originalHref) return;

      // Separiamo path e hash
      const hashIndex = originalHref.indexOf("#");
      const hasHash = hashIndex !== -1;

      const path = hasHash
        ? originalHref.slice(0, hashIndex)
        : originalHref;

      const hash = hasHash
        ? originalHref.slice(hashIndex)
        : "";

      let cleanPath = path;
      let modified = false;

      for (const slug of slugs) {
        if (cleanPath.endsWith(slug)) {
          cleanPath = cleanPath.slice(0, -slug.length);
          modified = true;
          break;
        }
      }

      if (!modified) return;

      const visualHref = cleanPath + hash;

      // Salviamo href reale
      a.setAttribute("data-real-href", originalHref);

      // href pulito SOLO visivo
      a.href = visualHref;

      // ───────────────────────────────────────
      // CLICK HANDLER
      // ───────────────────────────────────────
      a.addEventListener("click", function (e) {
        const realHref = a.getAttribute("data-real-href");

        // 🔥 Nuova scheda forzata via attributo
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

        // Tutti gli altri casi → ripristino temporaneo href reale
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

    console.log(
      "[removeSlugVisualHover] ✔ Slug nascosto visivamente (hash supportato)"
    );

  } catch (err) {
    console.error("[removeSlugVisualHover] Errore:", err);
  }
})();
