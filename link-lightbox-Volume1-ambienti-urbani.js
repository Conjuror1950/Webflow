document.addEventListener("DOMContentLoaded", () => {
  function setupLightbox(id, url) {
    const lightbox = document.getElementById(id);
    if (!lightbox) return;

    lightbox.style.cursor = "pointer";

    // Click sinistro, Ctrl/Cmd+click, Shift+click
    lightbox.addEventListener("click", (event) => {
      // Click sinistro semplice → stessa scheda
      if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        event.preventDefault(); // blocca solo se gestiamo noi
        window.location.href = url;
      }

      // Ctrl/Cmd/Shift + click → nuova scheda
      else if (event.button === 0 && (event.ctrlKey || event.metaKey || event.shiftKey)) {
        event.preventDefault();
        window.open(url, "_blank", "noopener,noreferrer");
      }
      // Altro? Non facciamo nulla → mobile e menu contestuale funzionano
    });

    // Click centrale (rotellina mouse)
    lightbox.addEventListener("auxclick", (event) => {
      if (event.button === 1) {
        event.preventDefault();
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });

    // Non blocchiamo il tasto destro / pressione prolungata su mobile
    lightbox.addEventListener("contextmenu", () => {
      // Lascia passare il menu nativo (apri in nuova scheda, ecc.)
    });
  }

  // Lightbox per desktop e mobile
  setupLightbox("lightbox-Volume1-ambienti-urbani-desktop", "https://andreaingrassia.webflow.io/room/album-fotografici/volume-1/ambienti-urbani");
  setupLightbox("lightbox-Volume1-ambienti-urbani-mobile", "https://andreaingrassia.webflow.io/room/album-fotografici/volume-1/ambienti-urbani");
});
