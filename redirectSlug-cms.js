(function() {
  const slugs = ["/manual", "/introduction", "/album", "/extra"];

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

    // Memorizziamo entrambi gli href
    a.setAttribute("data-real-href", originalHref);
    a.href = cleanHref;                     // href visibile (barra di stato + hover)

    // ───────────────────────────────────────────────────────────────
    // Gestione click intelligente
    // ───────────────────────────────────────────────────────────────
    a.addEventListener("click", function(e) {
      // Click sinistro normale (senza modificatori) → intercettiamo
      if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        window.location.href = originalHref;
        return;
      }

      // Tutti gli altri casi (Ctrl+click, Cmd+click, middle-click, shift+click...)
      // lasciamo che il browser faccia il suo lavoro normale usando l'attributo href attuale
      // → aprirà il link "pulito" (= sbagliato!)
      // Quindi dobbiamo temporaneamente ripristinare l'href originale
      const currentHref = a.href;
      a.href = originalHref;

      // Piccolo trick per lasciare che il browser proceda con l'href corretto
      // poi lo ripristiniamo subito dopo (molto veloce, quasi invisibile)
      setTimeout(() => {
        a.href = currentHref;
      }, 0);
    });

    // Bonus: auxclick per gestire meglio middle-click in alcuni browser (soprattutto Firefox)
    a.addEventListener("auxclick", function(e) {
      if (e.button === 1) { // middle click
        e.preventDefault();
        // Ripristiniamo href reale per il middle-click
        const real = a.getAttribute("data-real-href");
        window.open(real, "_blank");
      }
    });
  });

  console.log("[removeSlugVisualHover] Versione corretta - Ctrl/middle-click funzionanti");
})();
