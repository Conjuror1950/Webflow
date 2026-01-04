// removeSlugEarly.js
// Rimuove /manual visivamente ma evita loop infiniti

(function () {
  try {
    const currentPath = window.location.pathname;
    const targetUrl = "/it-it/102555/manual";
    const FLAG = "manual_redirect_done";

    // Se il redirect è già avvenuto, non rifare nulla
    if (sessionStorage.getItem(FLAG)) {
      return;
    }

    if (currentPath.endsWith("/manual")) {
      const newPath = currentPath.replace(/\/manual$/, "");

      // Segna che il redirect è già stato fatto
      sessionStorage.setItem(FLAG, "true");

      // Aggiorna solo l'URL visivo
      history.replaceState({}, "", newPath);

      console.log("[removeSlugEarly.js] URL visivo modificato:", newPath);

      // Navigazione reale UNA SOLA VOLTA
      window.location.replace(targetUrl);
    }
  } catch (e) {
    console.error("[removeSlugEarly.js] Errore:", e);
  }
})();
