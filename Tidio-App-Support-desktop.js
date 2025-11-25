in base al seguente codice:

// tidio-reset.js
// Versione: 1.0
// Scopo: resettare Tidio ad ogni caricamento, poi caricare il widget e forzare l'apertura.
// CONFIG: modifica TIDIO_ID e le opzioni in `DEFAULT_OPTIONS` se necessario.

(function(window, document) {
  'use strict';

  const DEFAULT_OPTIONS = {
    tidioId: 'qu1nij9medehvkac7kwdfi4cszfd5quu', // <--- sostituisci con il tuo ID se diverso
    autoShow: true,             // mostra il widget appena pronto
    welcomeMessage: null,       // stringa o null (es. "Ciao! Come posso aiutarti?")
    resetLocalStorageKeys: ['tidio', 'Tidio'], // rimuove chiavi che contengono questi token
    resetCookieNameTokens: ['tidio', 'tidio_ignore', 'tidio_chat'], // cerca cookie che contengono questi token
    hoursActive: null,          // [startHour, endHour] in 24h (es. [9,18]) o null = always
    maxWaitMs: 8000             // massimo tempo d'attesa per tidioChatApi (ms)
  };

  // Utility: verifica se siamo nell'orario consentito (se configurato)
  function isInActiveHours(range) {
    if (!range || !Array.isArray(range) || range.length !== 2) return true;
    const h = (new Date()).getHours();
    const [start, end] = range;
    if (start <= end) return h >= start && h < end;
    // intervallo che passa la mezzanotte (es. [22, 6])
    return h >= start || h < end;
  }

  // Rimuove cookie robustamente: prova combinazioni di domain/path
  function deleteCookieByName(name) {
    const host = document.location.hostname;
    const domainParts = host.split('.');
    const paths = ['/', '']; // prova slash / e stringa vuota

    // genera possibili domain varianti: example.com, .example.com, sub.example.com
    const domains = [];
    for (let i = 0; i < domainParts.length; i++) {
      domains.push(domainParts.slice(i).join('.'));
      domains.push('.' + domainParts.slice(i).join('.'));
    }
    // dedup
    const uniqDomains = Array.from(new Set(domains));

    paths.forEach(path => {
      uniqDomains.forEach(domain => {
        try {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};domain=${domain};SameSite=None;Secure`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};domain=${domain}`;
        } catch (e) {
          // ignore
        }
      });
      // anche senza domain
      try {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
      } catch (e) {}
    });
  }

  // Cancella i cookie che contengono i token specificati
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

  // Cancella localStorage keys che contengono token
  function clearTidioLocalStorage(tokens) {
    try {
      Object.keys(localStorage).forEach(key => {
        tokens.forEach(token => {
          if (key.toLowerCase().includes(token.toLowerCase())) {
            localStorage.removeItem(key);
          }
        });
      });
    } catch (e) {
      // localStorage può non essere disponibile (es. privacy mode)
    }
  }

  // Inietta script Tidio dinamicamente, ritorna Promise che risolve quando lo script è stato aggiunto
  function injectTidioScript(tidioId) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-tidio-id="${tidioId}"]`) ||
                       document.querySelector(`script[src*="${tidioId}"]`);
      if (existing) {
        // già in pagina
        resolve(existing);
        return;
      }

      const s = document.createElement('script');
      s.src = `//code.tidio.co/${tidioId}.js`;
      s.async = true;
      s.setAttribute('data-tidio-id', tidioId);
      s.onload = () => resolve(s);
      s.onerror = (err) => reject(err);
      (document.head || document.body || document.documentElement).appendChild(s);
    });
  }

  // Attende tidioChatApi per un tempo massimo
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

  // Funzione principale: reset + load + launch
  function resetAndLoad(options) {
    const cfg = Object.assign({}, DEFAULT_OPTIONS, options || {});

    // Controllo orario
    if (!isInActiveHours(cfg.hoursActive)) {
      // non fare nulla fuori orario
      return Promise.resolve({status: 'skipped_off_hours'});
    }

    try {
      // 1) Rimuovi cookie e localStorage
      clearTidioCookies(cfg.resetCookieNameTokens);
      clearTidioLocalStorage(cfg.resetLocalStorageKeys);
    } catch (e) {
      // ignore
    }

    // 2) Inietta script Tidio e attende l'API
    return injectTidioScript(cfg.tidioId)
      .then(() => waitForTidioApi(cfg.maxWaitMs))
      .then((api) => {
        return new Promise((resolve) => {
          // usa la push per assicurarti che l'API sia pronta
          api.push(function() {
            try {
              if (cfg.autoShow && typeof tidioChatApi.show === 'function') {
                tidioChatApi.show();
              }
              if (cfg.welcomeMessage && typeof tidioChatApi.sendMessage === 'function') {
                // invia con piccolo delay per essere sicuri che il flow sia pronto
                setTimeout(() => {
                  try { tidioChatApi.sendMessage(cfg.welcomeMessage); } catch(e){}
                }, 250);
              }
            } catch (e) { /* ignore */ }
            resolve({status: 'ok'});
          });
        });
      })
      .catch(err => ({ status: 'error', error: err && err.message ? err.message : err }));
  }

  // Espone una API globale per uso manuale o override
  window.TidioReset = {
    resetAndLoad,
    DEFAULT_OPTIONS: Object.assign({}, DEFAULT_OPTIONS)
  };

  // Auto-run: se lo script viene incluso senza chiamata esplicita, esegue con default options
  // (puoi disabilitare autostart chiamando TidioReset.resetAndLoad manualmente)
  setTimeout(() => {
    // evita esecuzione troppo precoce in head; lascia 50 ms per DOM
    resetAndLoad();
  }, 50);

})(window, document);


voglio che quando clicco su assegna a me (o simile) su Tidio sulla chat selezionata, invii due messaggi automatici da parte mia. Come devo impostare e cosa devo mettere nel codice? Dimmi precisamente
