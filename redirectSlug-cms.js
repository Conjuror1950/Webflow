// pseudoLinkHover.js
// Mostra href pulito al mouse hover, naviga al link reale al click

(function() {
  try {
    const element = document.getElementById("link-108");
    if (!element) return;

    // URL reale dove navigare
    const realUrl = "/it-it/122080/manual";

    // URL visivo da mostrare in basso a sinistra
    const displayUrl = "/it-it/122080";

    // Creiamo un <a> invisibile dentro l'elemento per il visual hover
    const pseudoLink = document.createElement("a");
    pseudoLink.href = displayUrl;   // questo è l'URL visivo
    pseudoLink.style.position = "absolute";
    pseudoLink.style.opacity = 0;
    pseudoLink.style.pointerEvents = "none"; // non blocca il mouse
    element.appendChild(pseudoLink);

    // Quando l'elemento viene cliccato, vai al link reale
    element.addEventListener("click", () => {
      window.location.href = realUrl;
    });

    console.log("[pseudoLinkHover.js] Setup completato:", displayUrl, "->", realUrl);
  } catch (e) {
    console.error("[pseudoLinkHover.js] Errore:", e);
  }
})();
