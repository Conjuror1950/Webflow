// chat-redirect-now.js
var ACTIVE_LINK = "https://support-andreaingrassia.webflow.io/get-support/chat";
var INACTIVE_LINK = "https://support-andreaingrassia.webflow.io/get-support";
var SCHEDULE_JSON_URL = "https://andreaingrassia.netlify.app/schedule.json";
var FETCH_TIMEOUT = 2000;

(function() {
  'use strict';

  function fetchWithTimeout(url, options, timeout) {
    return new Promise(function(resolve, reject) {
      var didTimeOut = false;
      var timer = setTimeout(function() {
        didTimeOut = true;
        reject(new Error('Fetch timeout'));
      }, timeout);

      fetch(url, options).then(function(res) {
        if (didTimeOut) return;
        clearTimeout(timer);
        resolve(res);
      }).catch(function(err) {
        if (didTimeOut) return;
        clearTimeout(timer);
        reject(err);
      });
    });
  }

  function isNowAvailable(schedule) {
    if (!schedule) return false;

    var now = new Date();
    // Giorno della settimana 0=Dom..6=Sab
    var today = parseInt(new Intl.DateTimeFormat('en-GB', { weekday: 'numeric', timeZone: 'Europe/Rome' }).format(now), 10) % 7;

    var todaySchedule = schedule[today];
    if (!todaySchedule) return false;

    var hours = parseInt(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Europe/Rome' }).format(now), 10);
    var minutes = parseInt(new Intl.DateTimeFormat('en-GB', { minute: 'numeric', timeZone: 'Europe/Rome' }).format(now), 10);
    var nowMinutes = hours * 60 + minutes;

    var startMinutes = todaySchedule.startHour * 60 + todaySchedule.startMinute;
    var endMinutes = todaySchedule.endHour * 60 + todaySchedule.endMinute;

    return nowMinutes >= startMinutes && nowMinutes < endMinutes;
  }

  function safeRedirect(url) {
    try {
      window.location.href = url;
    } catch (e) {
      console.error('Redirect failed:', e);
    }
  }

  // MAIN
  fetchWithTimeout(SCHEDULE_JSON_URL, { method: 'GET', mode: 'cors' }, FETCH_TIMEOUT)
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(schedule => {
      if (!isNowAvailable(schedule)) {
        safeRedirect(INACTIVE_LINK);
      }
      // se disponibile -> rimani sulla pagina
    })
    .catch(err => {
      console.warn('Errore fetch/parse schedule:', err);
      // fallback: redirect su INACTIVE se non si riesce a leggere schedule
      safeRedirect(INACTIVE_LINK);
    });
})();
