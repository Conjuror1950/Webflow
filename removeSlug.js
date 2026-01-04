(function () {
  try {
    const path = window.location.pathname;
    const slugs = ["/manual", "/manual1", "/manual2", "/manual3"];

    // Cerchiamo se finisce con uno qualsiasi degli slug
    const matchedSlug = slugs.find(slug => path.endsWith(slug));
    if (!matchedSlug) return;

    const cleanPath = path.slice(0, -matchedSlug.length);

    // Cambiamo url visibile
    history.replaceState(null, "", cleanPath);

    // È refresh?
    if (sessionStorage.getItem("justRefreshed") === "1") {
      sessionStorage.removeItem("justRefreshed");
      window.location.replace("/docs/desktop/301085");
      return;
    }

    // Primo caricamento → segniamo per il prossimo refresh
    sessionStorage.setItem("justRefreshed", "1");

  } catch (err) {
    console.error("[removeSlugMultiple]", err);
  }
})();
