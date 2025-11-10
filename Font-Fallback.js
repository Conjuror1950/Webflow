const style = document.createElement("style");
style.textContent = `
  :root {
    --apple-font-stack: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
  }
  body, button, input, textarea, select {
    font-family: var(--apple-font-stack);
  }
`;
document.head.appendChild(style);
