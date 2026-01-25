// Remove-Click-Background-Link-Touch.js
document.addEventListener("DOMContentLoaded", () => {

  // Rimuove tap highlight
  if (window.matchMedia("(pointer: coarse)").matches) {
    const style = document.createElement('style');
    style.textContent = `
      a, button {
        -webkit-tap-highlight-color: transparent !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Forza il caricamento reale delle immagini
  document.querySelectorAll('img[data-src]').forEach(img => {
    const realSrc = img.getAttribute('data-src');

    if (realSrc) {
      img.removeAttribute('srcset');
      img.removeAttribute('sizes');
      img.src = realSrc;

      // forza repaint
      img.style.display = 'none';
      img.offsetHeight;
      img.style.display = '';
    }
  });

});
