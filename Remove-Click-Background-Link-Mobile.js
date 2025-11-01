// Remove-Click-Background-Link-Mobile.js
const style = document.createElement('style');
style.innerHTML = `
  a, button {
    -webkit-tap-highlight-color: transparent !important;
    -webkit-touch-callout: none !important;
  }
`;
document.head.appendChild(style);
