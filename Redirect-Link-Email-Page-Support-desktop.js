// chat-redirect-schedule.js
var ACTIVE_LINK = "https://support-andreaingrassia.webflow.io/getsupport/solutions/email";
var INACTIVE_LINK = "https://support-andreaingrassia.webflow.io/getsupport";

// 📅 Orari chat per giorno (0=Dom, 1=Lun, ... 6=Sab)
var SCHEDULE = {
  1: { startHour: 7, startMinute: 0, endHour: 21, endMinute: 0 }, // Lunedì
  2: { startHour: 7, startMinute: 0, endHour: 21, endMinute: 0 }, // Martedì
  3: { startHour: 7, startMinute: 0, endHour: 21, endMinute: 0 }, // Mercoledì
  4: { startHour: 7, startMinute: 0, endHour: 21, endMinute: 0 }, // Giovedì
  5: { startHour: 7, startMinute: 0, endHour: 21, endMinute: 0 }, // Venerdì
  6: { startHour: 8, startMinute: 0, endHour: 16, endMinute: 0 }, // Sabato
  0: null // Domenica chiuso
};

(function() {
  'use strict';

  function nowInMinutes() {
    var now = new Date();
    var hours = parseInt(new Intl.DateTimeFormat('en-GB', {hour:'numeric', hour12:false, timeZone:'Europe/Rome'}).format(now),10);
    var minutes = parseInt(new Intl.DateTimeFormat('en-GB', {minute:'numeric', timeZone:'Europe/Rome'}).format(now),10);
    return hours*60 + minutes;
  }

  function getTodayIndex() {
    var now = new Date();
    return now.getDay(); // 0=Dom, 1=Lun, ..., 6=Sab
  }

  function isNowAvailable(schedule) {
    var today = getTodayIndex();
    var todaySchedule = schedule[today];
    if (!todaySchedule) return false;

    var nowM = nowInMinutes();
    var startM = todaySchedule.startHour*60 + todaySchedule.startMinute;
    var endM = todaySchedule.endHour*60 + todaySchedule.endMinute;
    return nowM >= startM && nowM < endM;
  }

  function safeRedirect(url) {
    try { window.location.href = url; } catch(e) { console.error('Redirect failed', e); }
  }

  // Funzione per controllare continuamente lo stato
  function checkChat() {
    if (!isNowAvailable(SCHEDULE)) {
      safeRedirect(INACTIVE_LINK);
    }
  }

  // controllo iniziale
  checkChat();

  // controllo ogni 10 secondi (10000 ms)
  setInterval(checkChat, 10000);

})();

