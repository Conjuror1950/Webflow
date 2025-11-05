// Remove-Click-Background-Link-Touch.js

// Controlla se il dispositivo ha input touch
if (window.matchMedia("(pointer: coarse)").matches) {
  const style = document.createElement('style');
  style.innerHTML = `
    div[data-search="true"] a,
    div[data-search="true"] button,
    div[data-shop="true"] a,
    div[data-shop="true"] button {
      -webkit-tap-highlight-color: transparent !important;
      -webkit-touch-callout: none !important;
    }
  `;
  document.head.appendChild(style);
}
