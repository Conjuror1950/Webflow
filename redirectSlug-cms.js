// removeSlugVisualHover + data-scroll unified
// Rimuove slug SOLO visivamente (hover/status bar)
// Supporta hash (#), nuova scheda, middle click
// Supporta elementi senza href con data-scroll
// Navigazione reale sempre intatta

(function () {
  try {
    // ───────────────────────────────────────
    // CONFIG
    // ───────────────────────────────────────
    const slugs = [
      "/manual",
      "/introduction",
      "/access",
      "/settings",
      "/accessibility",
      "/support"
    ];

    // ───────────────────────────────────────
    // LINK <a href="...">
    // ───────────────────────────────────────
    document.querySelectorAll("a[href]").forEach(a => {
      const originalHref = a.getAttribute("href");
      if (!originalHref) return;

      // separa path e hash
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

      // salva href reale
      a.setAttribute("data-real-href", originalHref);

      // href SOLO visivo
      a.href = visualHref;

      // ───────────────────────────────────────
      // CLICK HANDLER
      // ───────────────────────────────────────
      a.addEventListener("click", function (e) {
        const realHref = a.getAttribute("data-real-href");

        // nuova scheda forzata via attributo
        if (a.getAttribute("data-open-new-tab") === "true") {
          e.preventDefault();
          window.open(realHref, "_blank");
          return;
        }

        // click sinistro normale
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

        // altri casi → ripristino temporaneo
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

    // ───────────────────────────────────────
    // ELEMENTI SENZA HREF (data-scroll)
    // ───────────────────────────────────────
    document.querySelectorAll("[data-scroll]:not(a)").forEach(el => {
      const scrollId = el.getAttribute("data-scroll");
      if (!scrollId) return;

      const visualHash = "#" + scrollId;

      // hover → hash visivo
      el.addEventListener("mouseenter", () => {
        history.replaceState(null, "", visualHash);
      });

      el.addEventListener("mouseleave", () => {
        history.replaceState(null, "", window.location.pathname);
      });

      // click → scroll reale
      el.addEventListener("click", e => {
        e.preventDefault();

        const target = document.getElementById(scrollId);
        if (!target) return;

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });

    console.log(
      "[removeSlugVisualHover] ✔ Slug e hash gestiti (link + data-scroll)"
    );

  } catch (err) {
    console.error("[removeSlugVisualHover] Errore:", err);
  }
})();
