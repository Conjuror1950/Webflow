// Remove-Click-Background-Link-Touch.js

document.addEventListener("DOMContentLoaded", () => {

  // 1️⃣ Rimuove highlight tap su dispositivi touch
  if (window.matchMedia("(pointer: coarse)").matches) {
    const style = document.createElement('style');
    style.innerHTML = `
      a, button {
        -webkit-tap-highlight-color: transparent !important;
      }
    `;
    document.head.appendChild(style);
  }

  // 2️⃣ Sostituisce src delle immagini usando data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.src = img.dataset.src;
  });

});
