// chat-redirect-now.js
// Scarica il file JS remoto, estrae `var schedule = { ... }` e fa redirect IMMEDIATO
// CONFIG: modifica questi link come preferisci
var ACTIVE_LINK = "https://support-andreaingrassia.webflow.io/contact/chat";      // redirect quando disponibile
var INACTIVE_LINK = "https://support-andreaingrassia.webflow.io/contact"; // redirect quando non disponibile

// URL del file che contiene lo schedule (quello che hai indicato)
var REMOTE_JS_URL = "https://andreaingrassia.netlify.app/apple-support-contact-chat-desktop.js";

// Timeout per il fetch (ms) — breve per fallire velocemente in caso di CORS e usare fallback
var FETCH_TIMEOUT = 100;

(function () {
  'use strict';

  // fetch con timeout
  function fetchWithTimeout(url, options, timeout) {
    timeout = typeof timeout === 'number' ? timeout : FETCH_TIMEOUT;
    return new Promise(function (resolve, reject) {
      var didTimeOut = false;
      var timer = setTimeout(function () {
        didTimeOut = true;
        reject(new Error('Fetch timeout'));
      }, timeout);

      fetch(url, options).then(function (res) {
        if (didTimeOut) return;
        clearTimeout(timer);
        resolve(res);
      }).catch(function (err) {
        if (didTimeOut) return;
        clearTimeout(timer);
        reject(err);
      });
    });
  }

  // Estrae la stringa dell'oggetto schedule dal testo JS remoto
  function extractScheduleObjectText(jsText) {
    var re = /var\s+schedule\s*=\s*({[\s\S]*?});/m;
    var m = re.exec(jsText);
    if (!m) return null;
    return m[1];
  }

  // Valuta il literal dell'oggetto schedule in modo mirato
  function evaluateScheduleLiteral(objText) {
    try {
      var fn = new Function('return (' + objText + ');');
      return fn();
    } catch (err) {
      console.error('Errore valutando schedule literal:', err);
      return null;
    }
  }

  // Normalizza schedule (chiavi numeriche -> int)
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
        out[keyInt] = {
          startHour: Number(v.startHour || 0),
          startMinute: Number(v.startMinute || 0),
          endHour: Number(v.endHour || 0),
          endMinute: Number(v.endMinute || 0)
        };
      } else {
        out[keyInt] = null;
      }
    });
    return out;
  }

  // Ottieni ora/minuti in Europe/Rome
  function getRomeHourMinute(date) {
    var hours = parseInt(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Europe/Rome' }).format(date), 10);
    var minutes = parseInt(new Intl.DateTimeFormat('en-GB', { minute: 'numeric', timeZone: 'Europe/Rome' }).format(date), 10);
    return { hours: hours, minutes: minutes };
  }

  // Verifica se "ora" è in orario disponibile
  function isNowAvailable(schedule) {
    if (!schedule) return false;
    var now = new Date();
    var dm = getRomeHourMinute(now);
    var nowMinutes = dm.hours * 60 + dm.minutes;

    // Intl weekday numeric (en-GB) => 1=Mon .. 7=Sun; mappiamo a 0=Sun..6=Sat
    var weekdayNum = parseInt(new Intl.DateTimeFormat('en-GB', { weekday: 'numeric', timeZone: 'Europe/Rome' }).format(now), 10);
    var todayIndex = (weekdayNum % 7);

    var todaySchedule = schedule[todayIndex];
    if (!todaySchedule) return false;
    var startMinutes = (Number(todaySchedule.startHour) || 0) * 60 + (Number(todaySchedule.startMinute) || 0);
    var endMinutes = (Number(todaySchedule.endHour) || 0) * 60 + (Number(todaySchedule.endMinute) || 0);
    return nowMinutes >= startMinutes && nowMinutes < endMinutes;
  }

  // fallback globale (se fetch fallisce per CORS, il dev può definire window.APP_CHAT_SCHEDULE)
  function getScheduleFromWindowFallback() {
    if (typeof window.APP_CHAT_SCHEDULE !== 'undefined') {
      return normalizeSchedule(window.APP_CHAT_SCHEDULE);
    }
    return null;
  }

  // Esegui redirect in modo sicuro (try/catch)
  function safeRedirect(url) {
    try {
      window.location.href = url;
    } catch (e) {
      console.error('Redirect failed:', e);
    }
  }

  // MAIN: esegui tutto subito al caricamento
  (function main() {
    // Prova fetch rapido del file remoto
    fetchWithTimeout(REMOTE_JS_URL, { method: 'GET', mode: 'cors' }, FETCH_TIMEOUT)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (text) {
        var objText = extractScheduleObjectText(text);
        if (!objText) {
          console.warn('Var schedule non trovata nel file remoto.');
          return Promise.reject(new Error('schedule.not.found'));
        }
        var raw = evaluateScheduleLiteral(objText);
        if (!raw) {
          console.warn('Errore valutando schedule estratto.');
          return Promise.reject(new Error('schedule.eval.error'));
        }
        var schedule = normalizeSchedule(raw);
        if (!schedule) {
          console.warn('Schedule normalizzato non valido.');
          return Promise.reject(new Error('schedule.normalize.error'));
        }
        // Redirect immediato basato sullo schedule estratto
        if (isNowAvailable(schedule)) safeRedirect(ACTIVE_LINK);
        else safeRedirect(INACTIVE_LINK);
        return Promise.resolve();
      })
      .catch(function (err) {
        console.warn('Fetch/parse schedule fallito:', err && err.message ? err.message : err);
        // fallback immediato a window.APP_CHAT_SCHEDULE
        var fallback = getScheduleFromWindowFallback();
        if (fallback) {
          if (isNowAvailable(fallback)) safeRedirect(ACTIVE_LINK);
          else safeRedirect(INACTIVE_LINK);
          return;
        }
        // fallback finale: redirect su INACTIVE_LINK per evitare che l'utente resti bloccato
        safeRedirect(INACTIVE_LINK);
      });
  })();

})();
