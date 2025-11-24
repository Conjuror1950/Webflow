// chat-redirect-now.js
var ACTIVE_LINK = "https://support-andreaingrassia.webflow.io/get-support/chat";
var INACTIVE_LINK = "https://support-andreaingrassia.webflow.io/get-support";

(function(){
  'use strict';

  function getRomeHourMinute(date){
    return {
      hours: parseInt(new Intl.DateTimeFormat('en-GB', {hour:'numeric', hour12:false, timeZone:'Europe/Rome'}).format(date),10),
      minutes: parseInt(new Intl.DateTimeFormat('en-GB', {minute:'numeric', timeZone:'Europe/Rome'}).format(date),10)
    };
  }

  function isNowAvailable(schedule){
    if(!schedule) return false;
    var now = new Date();
    var dm = getRomeHourMinute(now);
    var nowMinutes = dm.hours*60 + dm.minutes;

    var weekdayNum = now.getDay(); // 0=Dom ... 6=Sab
    var todaySchedule = schedule[weekdayNum];
    if(!todaySchedule) return false;

    var startMinutes = todaySchedule.startHour*60 + todaySchedule.startMinute;
    var endMinutes = todaySchedule.endHour*60 + todaySchedule.endMinute;
    return nowMinutes >= startMinutes && nowMinutes < endMinutes;
  }

  function safeRedirect(url){
    try { window.location.href = url; }
    catch(e){ console.error('Redirect failed:', e); }
  }

  // MAIN
  var schedule = window.APP_CHAT_SCHEDULE;
  if(!schedule || !isNowAvailable(schedule)){
    safeRedirect(INACTIVE_LINK);
  }
  // se disponibile -> non facciamo redirect (rimani sulla pagina)
})();
