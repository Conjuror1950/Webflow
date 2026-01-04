// removeSlugVisualHoverAdvanced.js
// Mostra visivamente l'URL senza lo slug finale senza mai modificare href
// Funziona per click, nuova scheda, copia link ecc.

(function() {
  try {
    // Lista degli slug da "nascondere"
    const slugsToRemove = ["/manual", "/video", "/album", "/extra"];

    // Seleziona tutti i link della pagina
    const links = document.querySelectorAll("a");

    links.forEach(link => {
      const realHref = link.getAttribute("href");
      if (!realHref) return;

      // Genera l'href pulito per visuale interna
      let displayHref = realHref;
      slugsToRemove.forEach(slug => {
        if (displayHref.endsWith(slug)) {
          displayHref = displayHref.replace(new RegExp(slug + "$"), "");
        }
      });

      // Aggiungi un tooltip interno per mostrare l'href "pulito"
      const tooltip = document.createElement("span");
      tooltip.textContent = displayHref;
      tooltip.style.position = "absolute";
      tooltip.style.background = "rgba(0,0,0,0.8)";
      tooltip.style.color = "#fff";
      tooltip.style.padding = "2px 6px";
      tooltip.style.borderRadius = "4px";
      tooltip.style.fontSize = "12px";
      tooltip.style.fontFamily = "sans-serif";
      tooltip.style.pointerEvents = "none";
      tooltip.style.zIndex = "9999";
      tooltip.style.display = "none";

      document.body.appendChild(tooltip);

      // Mouseover: mostra tooltip vicino al cursore
      link.addEventListener("mousemove", (e) => {
        tooltip.style.left = e.pageX + 10 + "px";
        tooltip.style.top = e.pageY + 15 + "px";
      });

      link.addEventListener("mouseenter", () => {
        tooltip.style.display = "block";
      });

      link.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });
    });

    console.log("[removeSlugVisualHoverAdvanced.js] Tooltip href pulito attivo senza cambiare href reale");
  } catch (e) {
    console.error("[removeSlugVisualHoverAdvanced.js] Errore:", e);
  }
})();
