(function() {
  const slugs = ["/manual","/video","/album","/extra"];

  document.querySelectorAll("a[href]").forEach(a => {
    let href = a.getAttribute("href");
    
    let cleanHref = href;
    for (const slug of slugs) {
      if (cleanHref.endsWith(slug)) {
        cleanHref = cleanHref.slice(0, -slug.length);
        break;
      }
    }
    
    if (cleanHref === href) return; // nessun cambiamento necessario

    a.setAttribute("data-real-href", href);
    a.href = cleanHref;
    
    // Impediamo il comportamento di default e reindirizziamo
    a.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = a.getAttribute("data-real-href");
    });
  });

  console.log("[removeSlugVisualHover] Versione leggera - data-real-href");
})();
