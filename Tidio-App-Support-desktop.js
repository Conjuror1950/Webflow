// tidio-reset.js
// Versione: 1.2
// Scopo: resettare Tidio, caricare il widget, forzare l'apertura e inviare messaggi automatici quando si clicca "Partecipa"

(function(window, document) {
  'use strict';

  const DEFAULT_OPTIONS = {
    tidioId: 'qu1nij9medehvkac7kwdfi4cszfd5quu',
    autoShow: true,
    welcomeMessage: null,
    autoMessages: ["Ciao! Sono qui per aiutarti.", "Come posso assisterti oggi?"],
    resetLocalStorageKeys: ['tidio', 'Tidio'],
    resetCookieNameTokens: ['tidio', 'tidio_ignore', 'tidio_chat'],
    hoursActive: null,
    maxWaitMs: 8000
  };

  function isInActiveHours(range) {
    if (!range || !Array.isArray(range) || range.length !== 2) return true;
    const h = (new Date()).getHours();
    const [start, end] = range;
    if (start <= end) return h >= start && h < end;
    return h >= start || h < end;
  }

  function deleteCookieByName(name) {
    const host = document.location.hostname;
    const domainParts = host.split('.');
    const paths = ['/', ''];

    const domains = [];
    for (let i = 0; i < domainParts.length; i++) {
      domains.push(domainParts.slice(i).join('.'));
      domains.push('.' + domainParts.slice(i).join('.'));
    }
    const uniqDomains = Array.from(new Set(domains));

    paths.forEach(path => {
      uniqDomains.forEach(domain => {
        try {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};domain=${domain};SameSite=None;Secure`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};domain=${domain}`;
        } catch (e) {}
      });
      try { document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`; } catch(e) {}
    });
  }

  function clearTidioCookies(tokens) {
    if (!document.cookie) return;
    const cookies = document.cookie.split(';');
    cookies.forEach(c => {
      const cookiePair = c.split('=');
      const cookieName = cookiePair[0].trim();
      tokens.forEach(token => {
        if (cookieName.toLowerCase().includes(token.toLowerCase())) {
          deleteCookieByName(cookieName);
        }
      });
    });
  }

  function clearTidioLocalStorage(tokens) {
    try {
      Object.keys(localStorage).forEach(key => {
        tokens.forEach(token => {
          if (key.toLowerCase().includes(token.toLowerCase())) {
            localStorage.removeItem(key);
          }
        });
      });
    } catch (e) {}
  }

  function injectTidioScript(tidioId) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-tidio-id="${tidioId}"]`) ||
                       document.querySelector(`script[src*="${tidioId}"]`);
      if (existing) { resolve(existing); return; }

      const s = document.createElement('script');
      s.src = `//code.tidio.co/${tidioId}.js`;
      s.async = true;
      s.setAttribute('data-tidio-id', tidioId);
      s.onload = () => resolve(s);
      s.onerror = (err) => reject(err);
      (document.head || document.body || document.documentElement).appendChild(s);
    });
  }

  function waitForTidioApi(maxWaitMs) {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      function check() {
        if (window.tidioChatApi && typeof window.tidioChatApi.push === 'function') {
          resolve(window.tidioChatApi);
          return;
        }
        if (Date.now() - start > maxWaitMs) {
          reject(new Error('tidioChatApi non disponibile entro il timeout'));
          return;
        }
        setTimeout(check, 100);
      }
      check();
    });
  }

  function sendAutoMessages(messages) {
    if (!window.tidioChatApi || !Array.isArray(messages)) return;
    window.tidioChatApi.push(function() {
      messages.forEach((msg, i) => {
        setTimeout(() => {
          try { window.tidioChatApi.sendMessage(msg); } catch(e) {}
        }, i * 300);
      });
    });
  }

  // Osserva il pulsante "Partecipa alla conversazione" o "Partecipa"
  function watchAssignButton(messages) {
    const observer = new MutationObserver(() => {
      const btn = Array.from(document.querySelectorAll('button, span')).find(b => 
        (b.textContent.includes("Partecipa alla conversazione") || b.textContent.includes("Partecipa")) 
        && !b.dataset.autosent
      );
      if (btn) {
        btn.dataset.autosent = "true";
        btn.addEventListener('click', () => {
          sendAutoMessages(messages);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function resetAndLoad(options) {
    const cfg = Object.assign({}, DEFAULT_OPTIONS, options || {});

    if (!isInActiveHours(cfg.hoursActive)) return Promise.resolve({status: 'skipped_off_hours'});

    try {
      clearTidioCookies(cfg.resetCookieNameTokens);
      clearTidioLocalStorage(cfg.resetLocalStorageKeys);
    } catch (e) {}

    return injectTidioScript(cfg.tidioId)
      .then(() => waitForTidioApi(cfg.maxWaitMs))
      .then((api) => {
        return new Promise((resolve) => {
          api.push(function() {
            try {
              if (cfg.autoShow && typeof tidioChatApi.show === 'function') tidioChatApi.show();
              if (cfg.welcomeMessage) setTimeout(() => { tidioChatApi.sendMessage(cfg.welcomeMessage); }, 250);

              if (cfg.autoMessages && cfg.autoMessages.length) {
                watchAssignButton(cfg.autoMessages);
              }
            } catch(e) {}
            resolve({status:'ok'});
          });
        });
      })
      .catch(err => ({ status: 'error', error: err && err.message ? err.message : err }));
  }

  window.TidioReset = {
    resetAndLoad,
    DEFAULT_OPTIONS: Object.assign({}, DEFAULT_OPTIONS)
  };

  setTimeout(() => { resetAndLoad(); }, 50);

})(window, document);
