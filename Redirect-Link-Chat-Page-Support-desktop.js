// chat-redirect-from-remote-schedule.js
// Scarica il file JS remoto, estrae `var schedule = { ... }` e fa redirect
// CONFIG: modifica questi link come preferisci
var ACTIVE_LINK = "https://support-andreaingrassia.webflow.io/contact/chat";      // redirect quando disponibile
var INACTIVE_LINK = "https://support-andreaingrassia.webflow.io/contact"; // redirect quando non disponibile

// URL del file che contiene lo schedule (quello che hai indicato)
var REMOTE_JS_URL = "https://andreaingrassia.netlify.app/apple-support-contact-chat-desktop.js";

// Timeout per il fetch (ms)
var FETCH_TIMEOUT = 5000;

(function () {
  'use strict';

  // helper: fetch con timeout
  function fetchWithTimeout(url, options, timeout) {
    return new Promise(function (resolve, reject) {
      var timer = setTimeout(function () {
        reject(new Error('Fetch timeout'));
      }, timeout || FETCH_TIMEOUT);
      fetch(url, options).then(function (res) {
        clearTimeout(timer);
        resolve(res);
      }).catch(function (err) {
        clearTimeout(timer);
        reject(err);
      });
    });
  }

  // Estrae la stringa dell'oggetto schedule dal testo JS remoto
  function extractScheduleObjectText(jsText) {
    // cerca "var schedule = { ... };"   (non greedy)
    var re = /var\s+schedule\s*=\s*({[\s\S]*?});/m;
    var m = re.exec(jsText);
    if (!m) return null;
    return m[1]; // la parte { ... }
  }

  // Valuta in modo mirato il literal dell'oggetto schedule
  function evaluateScheduleLiteral(objText) {
    // Per sicurezza: limitiamo l'esecuzione a solo una "return (<objText>)"
    // Questo eviterà l'esecuzione di altre parti del file remoto.
    try {
      // Trasformiamo la stringa in una funzione e la eseguiamo
      // (nota: stiamo ancora eseguendo codice dinamico, ma solo della porzione estratta)
      var fn = new Function('return (' + objText + ');');
      var evaluated = fn();
      return evaluated;
    } catch (err) {
      console.error('Errore valutando schedule literal:', err);
      return null;
    }
  }

  // Normalizza schedule (chiavi numeriche -> int, valori null o oggetti con startHour,...)
  function normalizeSchedule(raw) {
    if (!raw || typeof raw !== 'object') return null;
    var out = {};
    Object.keys(raw).forEach(function (k) {
      var keyInt = parseInt(k, 10);
      if (isNaN(keyInt)) return;
      var v = raw[k];
      if (v === null) {
        out[keyInt] = null;
      } else if (typeof v === 'object') {
        // assicurati di avere tutte le proprietà numeriche
        out[keyInt] = {
          startHour: Number(v.startHour || v.startHour === 0 ? v.startHour : v.startHour),
          startMinute: Number(v.startMinute || v.startMinute === 0 ? v.startMinute : v.startMinute) || 0,
          endHour: Number(v.endHour || v.endHour === 0 ? v.endHour : v.endHour),
          endMinute: Number(v.endMinute || v.endMinute === 0 ? v.endMinute : v.endMinute) || 0
        };
      } else {
        out[keyInt] = null;
      }
    });
    return out;
  }

  // Ottieni ore/minuti in Europe/Rome come numeri (integer)
  function getRomeHourMinute(date) {
    // Usa Intl per ottenere ora/minuti nel fuso Europe/Rome
    var hours = parseInt(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Europe/Rome' }).format(date), 10);
    var minutes = parseInt(new Intl.DateTimeFormat('en-GB', { minute: 'numeric', timeZone: 'Europe/Rome' }).format(date), 10);
    return { hours: hours, minutes: minutes };
  }

  // Dato schedule normalizzato, determina se ora corrente è in una finestra attiva
  function isNowAvailable(schedule) {
    if (!schedule) return false;
    var now = new Date();
    var dm = getRomeHourMinute(now);
    var hours = dm.hours, minutes = dm.minutes;
    var nowMinutes = hours * 60 + minutes;
    var today = parseInt(new Intl.DateTimeFormat('en-GB', { weekday: 'numeric', timeZone: 'Europe/Rome' }).format(now), 10);
    // NOTE: Intl weekday numeric with en-GB gives 1=Mon..7=Sun — but original schedule uses 0=Sun..6=Sat
    // Convert to 0=Sun..6=Sat:
    // If Intl gives 1..7 (Mon..Sun), map: (weekday % 7)
    var todayIndex = (today % 7); // 1->1 ... 6->6, 7->0

    var todaySchedule = schedule[todayIndex];
    if (todaySchedule) {
      var startMinutes = todaySchedule.startHour * 60 + (todaySchedule.startMinute || 0);
      var endMinutes = todaySchedule.endHour * 60 + (todaySchedule.endMinute || 0);
      if (nowMinutes >= startMinutes && nowMinutes < endMinutes) return true;
    }
    return false;
  }

  // fallback: se non riusciamo a fetchare o parsare, cerca un object schedule definito globalmente
  function getScheduleFromWindowFallback() {
    // consenti al dev di popolare window.APP_CHAT_SCHEDULE = { ... } nel caso CORS fallisca
    if (typeof window.APP_CHAT_SCHEDULE !== 'undefined') {
      return normalizeSchedule(window.APP_CHAT_SCHEDULE);
    }
    return null;
  }

  // ESECUZIONE PRINCIPALE
  (function main() {
    // 1) fetch del file remoto con timeout
    fetchWithTimeout(REMOTE_JS_URL, { method: 'GET', mode: 'cors' }, FETCH_TIMEOUT)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (text) {
        var objText = extractScheduleObjectText(text);
        if (!objText) {
          console.warn('Impossibile trovare "var schedule = { ... }" nel file remoto.');
          return Promise.reject(new Error('schedule.not.found'));
        }
        var raw = evaluateScheduleLiteral(objText);
        if (!raw) {
          console.warn('Errore valutando lo schedule estratto.');
          return Promise.reject(new Error('schedule.eval.error'));
        }
        var schedule = normalizeSchedule(raw);
        if (!schedule) {
          console.warn('Schedule normalizzato non valido.');
          return Promise.reject(new Error('schedule.normalize.error'));
        }
        return Promise.resolve(schedule);
      })
      .catch(function (err) {
        console.warn('Fetch/parse schedule fallito:', err.message || err);
        // prova fallback globale
        var fallback = getScheduleFromWindowFallback();
        if (fallback) {
          return Promise.resolve(fallback);
        }
        return Promise.reject(err);
      })
      .then(function (schedule) {
        // se siamo qui, schedule è valido (normalizzato). Decidi redirect:
        var available = isNowAvailable(schedule);
        if (available) {
          // redirect immediato su link attivo
          window.location.href = ACTIVE_LINK;
        } else {
          window.location.href = INACTIVE_LINK;
        }
      })
      .catch(function (finalErr) {
        // Errore definitivo: log e fallback al link INACTIVE_LINK (per evitare che utente rimanga fermo)
        console.error('Errore nel processo di redirect basato su schedule:', finalErr);
        // fallback: prova redirect su INACTIVE_LINK (o elimina per non reindirizzare)
        try { window.location.href = INACTIVE_LINK; } catch (e) { /* ignore */ }
      });
  })();

})();
