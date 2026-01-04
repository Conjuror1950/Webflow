// removeSlugMultiple.js - versione per Webflow con distinzione refresh
(function() {
  try {
    const COOKIE_NAME = 'slug_removed_301085';
    const COOKIE_VALUE = '1';
    const DAYS = 1; // durata cookie - può essere molto breve (es: 0.01 = ~15 minuti)

    function setCookie(name, value, days) {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }

    let currentPath = window.location.pathname;
    const slugsToRemove = [
      "/manual",
      "/manual1",
      "/manual2",
      "/manual3"
    ];

    let slugFound = false;

    slugsToRemove.forEach(slug => {
      if (currentPath.endsWith(slug)) {
        currentPath = currentPath.replace(new RegExp(slug + "$"), "");
        slugFound = true;
        console.log("[removeSlug] Slug rimosso:", slug);
      }
    });

    // Pulizia URL visibile (sempre, sia primo load che refresh)
    if (slugFound) {
      history.replaceState({}, "", currentPath);
      console.log("[removeSlug] URL pulito:", currentPath);
    }

    // REDIRECT SOLO su refresh → controlliamo se il cookie esiste già
    if (slugFound && getCookie(COOKIE_NAME) === COOKIE_VALUE) {
      console.log("[removeSlug] Rilevato refresh → redirect");
      window.location.href = "/docs/desktop/301085";
      return; // importante: evitiamo di settare di nuovo il cookie dopo redirect
    }

    // Se abbiamo trovato slug e NON c'era ancora il cookie → primo caricamento
    if (slugFound) {
      setCookie(COOKIE_NAME, COOKIE_VALUE, DAYS);
      console.log("[removeSlug] Primo caricamento con slug → cookie settato");
    }

  } catch (e) {
    console.error("[removeSlugMultiple.js] Errore:", e);
  }
})();
