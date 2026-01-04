// removeSlugVisualHoverFixed.js
// Mostra URL pulito solo al click e lascia href reale per tutti gli altri eventi

(function() {
  try {
    const slugsToRemove = ["/manual", "/video", "/album", "/extra"];
    const links = document.querySelectorAll("a");

    links.forEach(link => {
      const realHref = link.getAttribute("href");
      if (!realHref) return;

      // Funzione per rimuovere slug finale
      const cleanHref = () => {
        let displayHref = realHref;
        slugsToRemove.forEach(slug => {
          if (displayHref.endsWith(slug)) {
            displayHref = displayHref.replace(new RegExp(slug + "$"), "");
          }
        });
        return displayHref;
      };

      // Sovrascrivi click per usare l'URL “pulito”
      link.addEventListener("click", (e) => {
        e.preventDefault(); // previene l'href temporaneo
        const url = cleanHref();
        window.location.href = url; // naviga all'URL pulito
      });

      // Eventi hover non cambiano l'href reale
      link.addEventListener("mouseover", () => {
        console.log("[Hover] URL visivo pulito:", cleanHref());
      });
    });

    console.log("[removeSlugVisualHoverFixed.js] Click pulito attivo, hover visivo log");
  } catch (e) {
    console.error("[removeSlugVisualHoverFixed.js] Errore:", e);
  }
})();
