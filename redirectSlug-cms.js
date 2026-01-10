// removeSlugVisualHover + data-scroll (FINAL)
// Slug e hash SOLO visivi (hover / status bar)
// data-scroll SEMPRE visibile tramite <a href="#id">
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
      "/support",
      "/legal"
    ];

    // ───────────────────────────────────────
    // 1️⃣ LINK REALI <a href="...">
    // ───────────────────────────────────────
    document.querySelectorAll("a[href]").forEach(a => {
      const originalHref = a.getAttribute("href");
      if (!originalHref) return;

      // separa path + hash
      const hashIndex = originalHref.indexOf("#");
      const path = hashIndex !== -1
        ? originalHref.slice(0, hashIndex)
        : originalHref;

      const hash = hashIndex !== -1
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
      a.setAttribute("href", visualHref);

      // CLICK HANDLER
      a.addEventListener("click", e => {
        const realHref = a.getAttribute("data-real-href");

        // nuova scheda forzata
        if (a.getAttribute("data-open-new-tab") === "true") {
          e.preventDefault();
          window.open(realHref, "_blank");
          return;
        }

        // click normale
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

        // altri casi
        a.href = realHref;
        setTimeout(() => {
          a.href = visualHref;
        }, 0);
      });

      // middle click
      a.addEventListener("auxclick", e => {
        if (e.button === 1) {
          e.preventDefault();
          window.open(a.getAttribute("data-real-href"), "_blank");
        }
      });
    });

    // ───────────────────────────────────────
    // 2️⃣ DATA-SCROLL → SEMPRE <a href="#id">
    // ───────────────────────────────────────
    document.querySelectorAll("[data-scroll]").forEach(el => {
      const scrollId = el.getAttribute("data-scroll");
      if (!scrollId) return;

      const visualHash = "#" + scrollId;
      let link = el;

      // Se NON è un <a>, lo trasformiamo in <a>
      if (el.tagName.toLowerCase() !== "a") {
        link = document.createElement("a");
        link.innerHTML = el.innerHTML;

        // copia attributi
        [...el.attributes].forEach(attr => {
          if (attr.name !== "data-scroll") {
            link.setAttribute(attr.name, attr.value);
          }
        });

        el.replaceWith(link);
      }

      // href visivo (OBBLIGATORIO per hover)
      link.setAttribute("href", visualHash);
      link.setAttribute("data-visual-only", "true");

      // CLICK → scroll reale
      link.addEventListener("click", e => {
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
      "[removeSlugVisualHover] ✔ Slug nascosti e data-scroll visibile in hover"
    );

  } catch (err) {
    console.error("[removeSlugVisualHover] Errore:", err);
  }
})();
