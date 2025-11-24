// chat-redirect-now.js
var ACTIVE_LINK = "https://support-andreaingrassia.webflow.io/get-support/chat";    // redirect quando disponibile
var INACTIVE_LINK = "https://support-andreaingrassia.webflow.io/get-support";       // redirect quando offline
var REMOTE_JS_URL = "https://andreaingrassia.netlify.app/apple-support-contact-chat-desktop.js";

// Aumentato il timeout per evitare falsi fallimenti su reti normali
var FETCH_TIMEOUT = 2000;

(function () {
  'use strict';

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

  function extractScheduleObjectText(jsText) {
    var re = /var\s+schedule\s*=\s*({[\s\S]*?});/m;
    var m = re.exec(jsText);
    if (!m) return null;
    return m[1];
  }

  function evaluateScheduleLiteral(objText) {
    try {
      var fn = new Function('return (' + objText + ');');
      return fn();
    } catch (err) {
      console.error('Errore valutando schedule literal:', err);
      return null;
    }
  }

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

  function getRomeHourMinute(date) {
    var hours = parseInt(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Europe/Rome' }).format(date), 10);
    var minutes = parseInt(new Intl.DateTimeFormat('en-GB', { minute: 'numeric', timeZone: 'Europe/Rome' }).format(date), 10);
    return { hours: hours, minutes: minutes };
  }

  function isNowAvailable(schedule) {
    if (!schedule) return false;
    var now = new Date();
    var dm = getRomeHourMinute(now);
    var nowMinutes = dm.hours * 60 + dm.minutes;

    var weekdayNum = parseInt(new Intl.DateTimeFormat('en-GB', { weekday: 'numeric', timeZone: 'Europe/Rome' }).format(now), 10);
    var todayIndex = (weekdayNum % 7); // 1=Mon..7=Sun -> map 0=Sun..6=Sat

    var todaySchedule = schedule[todayIndex];
    if (!todaySchedule) return false;
    var startMinutes = (Number(todaySchedule.startHour) || 0) * 60 + (Number(todaySchedule.startMinute) || 0);
    var endMinutes = (Number(todaySchedule.endHour) || 0) * 60 + (Number(todaySchedule.endMinute) || 0);
    return nowMinutes >= startMinutes && nowMinutes < endMinutes;
  }

  function getScheduleFromWindowFallback() {
    if (typeof window.APP_CHAT_SCHEDULE !== 'undefined') {
      return normalizeSchedule(window.APP_CHAT_SCHEDULE);
    }
    return null;
  }

  function safeRedirect(url) {
    try {
      window.location.href = url;
    } catch (e) {
      console.error('Redirect failed:', e);
    }
  }

  (function main() {
    fetchWithTimeout(REMOTE_JS_URL, { method: 'GET', mode: 'cors' }, FETCH_TIMEOUT)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (text) {
        // Debug: log del testo ricevuto (rimuovi in produzione)
        console.log('[chat-redirect] remote js length:', text && text.length);

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

        console.log('[chat-redirect] schedule:', schedule);
        // Redirect SOLO quando NON è disponibile
        if (!isNowAvailable(schedule)) {
          console.log('[chat-redirect] Non disponibile -> redirect a INACTIVE_LINK');
          safeRedirect(INACTIVE_LINK);
        } else {
          console.log('[chat-redirect] Disponibile -> nessun redirect (resta sulla pagina)');
        }
      })
      .catch(function (err) {
        console.warn('Fetch/parse schedule fallito:', err && err.message ? err.message : err);
        var fallback = getScheduleFromWindowFallback();

        if (fallback) {
          console.log('[chat-redirect] usando fallback window.APP_CHAT_SCHEDULE:', fallback);
          if (!isNowAvailable(fallback)) {
            safeRedirect(INACTIVE_LINK);
          } else {
            // disponibile -> non fare nulla
          }
          return;
        }

        // fallback finale: non siamo riusciti a determinare lo schedule -> redirect su INACTIVE per non lasciare l'utente bloccato
        console.log('[chat-redirect] nessun fallback disponibile -> redirect INACTIVE_LINK');
        safeRedirect(INACTIVE_LINK);
      });
  })();

})();
