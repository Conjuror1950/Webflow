// chat-redirect-now.js
var ACTIVE_LINK = "https://support-andreaingrassia.webflow.io/get-support/chat";    // link attivo
var INACTIVE_LINK = "https://support-andreaingrassia.webflow.io/get-support";       // link offline
var REMOTE_JS_URL = "https://andreaingrassia.netlify.app/apple-support-contact-chat-desktop.js";
var FETCH_TIMEOUT = 2000;

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

  // Estrai schedule da JS remoto, compatibile var/let/const
  function extractScheduleObjectText(jsText) {
    var re = /\b(schedule)\s*=\s*({[\s\S]*?});/m;
    var m = re.exec(jsText);
    if (!m) return null;
    return m[2]; // restituisce solo il literal {...}
  }

  function evaluateScheduleLiteral(objText) {
    try {
      return (new Function('return (' + objText + ');'))();
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
    return {
      hours: parseInt(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Europe/Rome' }).format(date), 10),
      minutes: parseInt(new Intl.DateTimeFormat('en-GB', { minute: 'numeric', timeZone: 'Europe/Rome' }).format(date), 10)
    };
  }

  function isNowAvailable(schedule) {
    if (!schedule) return false;
    var now = new Date();
    var dm = getRomeHourMinute(now);
    var nowMinutes = dm.hours * 60 + dm.minutes;

    var weekdayNum = parseInt(new Intl.DateTimeFormat('en-GB', { weekday: 'numeric', timeZone: 'Europe/Rome' }).format(now), 10);
    var todayIndex = weekdayNum % 7; // 1=Mon..7=Sun -> 0=Sun..6=Sat

    var todaySchedule = schedule[todayIndex];
    if (!todaySchedule) return false;

    var startMinutes = (Number(todaySchedule.startHour) || 0) * 60 + (Number(todaySchedule.startMinute) || 0);
    var endMinutes = (Number(todaySchedule.endHour) || 0) * 60 + (Number(todaySchedule.endMinute) || 0);

    console.log('[chat-redirect] ora Roma:', dm.hours, dm.minutes, 'nowMinutes:', nowMinutes);
    console.log('[chat-redirect] todayIndex:', todayIndex, 'todaySchedule:', todaySchedule);
    console.log('[chat-redirect] startMinutes:', startMinutes, 'endMinutes:', endMinutes);

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
        console.log('[chat-redirect] remote JS length:', text && text.length);

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

        // Redirect SOLO se NON disponibile
        if (!isNowAvailable(schedule)) {
          console.log('[chat-redirect] Non disponibile -> redirect a INACTIVE_LINK');
          safeRedirect(INACTIVE_LINK);
        } else {
          console.log('[chat-redirect] Disponibile -> nessun redirect');
        }
      })
      .catch(function (err) {
        console.warn('Fetch/parse schedule fallito:', err && err.message ? err.message : err);
        var fallback = getScheduleFromWindowFallback();

        if (fallback) {
          console.log('[chat-redirect] usando fallback window.APP_CHAT_SCHEDULE:', fallback);
          if (!isNowAvailable(fallback)) {
            console.log('[chat-redirect] fallback non disponibile -> redirect a INACTIVE_LINK');
            safeRedirect(INACTIVE_LINK);
          }
          return;
        }

        console.log('[chat-redirect] nessun fallback -> redirect a INACTIVE_LINK');
        safeRedirect(INACTIVE_LINK);
      });
  })();
})();
