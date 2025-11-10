// File: setFontsFallback.js
(function() {
  // Famiglie con fallback (esattamente come richiesto)
  const sfText = `"SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif`;
  const sfDisplay = `"SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif`;

  // CSS da inserire inline (uso !important per sovrascrivere regole precedenti)
  const css = `
    .sf-pro-text { font-family: ${sfText} !important; }
    .sf-pro-display { font-family: ${sfDisplay} !important; }
  `;

  // Prova ad inserire lo <style> immediatamente
  function injectStyle() {
    if (document.getElementById('wf-font-fallback-style')) return;
    const style = document.createElement('style');
    style.id = 'wf-font-fallback-style';
    style.appendChild(document.createTextNode(css));
    // Se head non esiste ancora, appendo a documentElement per essere più robusti
    (document.head || document.documentElement).appendChild(style);
  }

  // Applica inline style agli elementi già presenti (copre elementi già renderizzati)
  function applyInlineToExisting() {
    try {
      document.querySelectorAll('.sf-pro-text').forEach(el => {
        el.style.fontFamily = sfText;
      });
      document.querySelectorAll('.sf-pro-display').forEach(el => {
        el.style.fontFamily = sfDisplay;
      });
    } catch (e) {
      // in casi estremi (es. ambiente molto restrittivo) ignoriamo l'errore
      console.warn('applyInlineToExisting error', e);
    }
  }

  // Osserva mutazioni per applicare lo stile ai nuovi elementi il prima possibile
  function observeMutations() {
    // nessun observer se MutationObserver non disponibile
    if (typeof MutationObserver === 'undefined') return;
    const observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        // nodi aggiunti
        if (m.addedNodes && m.addedNodes.length) {
          m.addedNodes.forEach(node => {
            if (node.nodeType !== 1) return;
            if (node.matches && node.matches('.sf-pro-text')) node.style.fontFamily = sfText;
            if (node.matches && node.matches('.sf-pro-display')) node.style.fontFamily = sfDisplay;
            // cerca all'interno del nodo
            node.querySelectorAll && node.querySelectorAll('.sf-pro-text').forEach(el => el.style.fontFamily = sfText);
            node.querySelectorAll && node.querySelectorAll('.sf-pro-display').forEach(el => el.style.fontFamily = sfDisplay);
          });
        }
        // cambi di attributi (es. class aggiunta dinamicamente)
        if (m.type === 'attributes' && m.attributeName === 'class' && m.target) {
          const t = m.target;
          if (t.classList.contains('sf-pro-text')) t.style.fontFamily = sfText;
          if (t.classList.contains('sf-pro-display')) t.style.fontFamily = sfDisplay;
        }
      }
    });

    observer.observe(document.documentElement || document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });

    // Stoppa l'observer dopo un po' per non consumare CPU indefinitamente (es. 10s)
    setTimeout(() => observer.disconnect(), 10000);
  }

  // Esegui subito (non aspettiamo DOMContentLoaded)
  try {
    injectStyle();
    applyInlineToExisting();
    observeMutations();
  } catch (err) {
    // come fallback, proviamo di nuovo dopo DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
      injectStyle();
      applyInlineToExisting();
      observeMutations();
    }, { once: true });
  }
})();
