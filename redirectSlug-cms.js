// removeSlugVisualHover + data-scroll unified
// Slug e hash SOLO visivi (hover / status bar)
// Supporta hash, nuova scheda, middle click
// Supporta data-scroll anche senza href
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

      a.setAttribute("data-real-href", originalHref);
      a.href = visualHref;

      a.addEventListener("click", e => {
        const realHref = a.getAttribute("data-real-href");

        if (a.getAttribute("data-open-new-tab") === "true") {
          e.preventDefault();
          window.open(realHref, "_blank");
          return;
        }

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

        a.href = realHref;
        setTimeout(() => {
          a.href = visualHref;
        }, 0);
      });

      a.addEventListener("auxclick", e => {
        if (e.button === 1) {
          e.preventDefault();
          window.open(a.getAttribute("data-real-href"), "_blank");
        }
      });
    });

    // ───────────────────────────────────────
    // DATA-SCROLL (anche senza href)
    // ───────────────────────────────────────
    document.querySelectorAll("[data-scroll]").forEach(el => {
      const scrollId = el.getAttribute("data-scroll");
      if (!scrollId) return;

      const visualHash = "#" + scrollId;

      // Se NON è un <a>, lo rendiamo un link visivo
      if (el.tagName.toLowerCase() !== "a") {
        el.setAttribute("role", "link");
        el.style.cursor = "pointer";
        el.setAttribute("data-visual-href", visualHash);
      }

      // Se è <a> ma senza href → iniettiamo hash visivo
      if (el.tagName.toLowerCase() === "a" && !el.getAttribute("href")) {
        el.setAttribute("href", visualHash);
        el.setAttribute("data-visual-only", "true");
      }

      // CLICK → scroll reale
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
      "[removeSlugVisualHover] ✔ Hash letto da data-scroll e mostrato correttamente"
    );

  } catch (err) {
    console.error("[removeSlugVisualHover] Errore:", err);
  }
})();
