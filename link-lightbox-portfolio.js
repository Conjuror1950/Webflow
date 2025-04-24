document.addEventListener("DOMContentLoaded", () => {
  function setupLightbox(id, url) {
    const lightbox = document.getElementById(id);
    if (!lightbox) return;

    // Mostriamo il cursore a mano per far capire che è cliccabile
    lightbox.style.cursor = "pointer";

    // Click sinistro, Ctrl/Cmd+click, Shift+click
    lightbox.addEventListener("click", (event) => {
      // Se è un click con tasto sinistro puro
      if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        // stessa scheda
        window.location.href = url;
        event.preventDefault();
      }
      // Se è Ctrl/Cmd+click o Shift+click, lasciamo gestire tutto a window.open
      else if (event.button === 0 && (event.ctrlKey || event.metaKey || event.shiftKey)) {
        window.open(url, "_blank", "noopener,noreferrer");
        event.preventDefault();
      }
      // altrimenti (menu contestuale, tasto destro, ecc.) non tocchiamo nulla
    });

    // Click centrale (rotellina): auxclick è il modo più affidabile per intercettarlo
    lightbox.addEventListener("auxclick", (event) => {
      if (event.button === 1) {
        window.open(url, "_blank", "noopener,noreferrer");
        event.preventDefault();
      }
    });
  }

  setupLightbox(
    "lightbox-produzioni-cinematografiche",
    "https://andreaingrassia.webflow.io/show/produzioni-cinematografiche"
  );
  setupLightbox(
    "lightbox-album-fotografici",
    "https://andreaingrassia.webflow.io/room/album-fotografici"
  );
});
