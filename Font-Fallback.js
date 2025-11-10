(function() {
  const sfText = `"SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif`;
  const sfDisplay = `"SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif`;

  // CSS inline con !important per forzare il font
  const css = `
    .sf-pro-text { font-family: ${sfText} !important; visibility: visible !important; }
    .sf-pro-display { font-family: ${sfDisplay} !important; visibility: visible !important; }
  `;

  // Inserisce subito lo style
  const style = document.createElement('style');
  style.id = 'wf-font-fallback-style';
  style.appendChild(document.createTextNode(css));
  (document.head || document.documentElement).appendChild(style);

  // Nasconde temporaneamente il body fino a che lo style è applicato
  document.documentElement.style.visibility = 'hidden';

  function applyFonts() {
    document.querySelectorAll('.sf-pro-text').forEach(el => el.style.fontFamily = sfText);
    document.querySelectorAll('.sf-pro-display').forEach(el => el.style.fontFamily = sfDisplay);
    document.documentElement.style.visibility = 'visible'; // mostra la pagina
  }

  // Applica subito e ascolta mutazioni
  applyFonts();

  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(applyFonts);
    observer.observe(document.documentElement || document, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    setTimeout(() => observer.disconnect(), 10000);
  }
})();
