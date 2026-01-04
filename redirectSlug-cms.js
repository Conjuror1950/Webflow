(function() {
  const slugsToRemove = [
    "/manual",
    "/video",
    "/album",
    "/extra"
  ];

  document.querySelectorAll("a").forEach(link => {
    const originalHref = link.getAttribute("href");
    if (!originalHref) return;

    // Verifichiamo se dobbiamo effettivamente modificare qualcosa
    let displayHref = originalHref;
    let shouldModify = false;

    for (const slug of slugsToRemove) {
      if (displayHref.endsWith(slug)) {
        displayHref = displayHref.slice(0, -slug.length);
        shouldModify = true;
        break;
      }
    }

    if (!shouldModify) return;

    // ───────────────────────────────────────────────────────────────
    // Soluzione 1 - Span interno + pointer-events (più stabile)
    // ───────────────────────────────────────────────────────────────

    // Creiamo lo span solo se necessario
    const text = link.innerHTML;
    link.innerHTML = '';
    
    const span = document.createElement("span");
    span.innerHTML = text;
    span.style.pointerEvents = "none";           // importante!
    link.appendChild(span);

    // Teniamo l'href reale sempre
    link.setAttribute("data-real-href", originalHref);
    link.href = displayHref; // href "visivo"

    // Impediamo che il browser mostri l'href sbagliato
    link.addEventListener("mouseenter", () => {
      link.href = displayHref;
    });

    link.addEventListener("mouseleave", () => {
      link.href = displayHref; // lasciamo comunque quello corto
    });

    // Click va sempre all'indirizzo vero
    link.addEventListener("click", e => {
      e.preventDefault();
      const real = link.getAttribute("data-real-href") || originalHref;
      window.location.href = real;
    });

    // Bonus: accessibilità + tastiera
    link.setAttribute("data-accessible-href", displayHref);
  });

  console.log("[removeSlugVisualHover] Attivo - versione span + data-real-href");
})();
