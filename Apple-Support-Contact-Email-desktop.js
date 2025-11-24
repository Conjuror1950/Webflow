/*!apple-live-email-card.js*/
(function () {
  'use strict';

  // CONFIG: edit if needed
  var config = {
    containerId: 'scrivi-al-supporto-container-desktop', // id del tuo div su Webflow
    title: 'Scrivi al supporto',
    subtitle: 'Invia la richiesta quando preferisci',
    onButtonClick: function (e) {
      window.location.href = 'https://support-andreaingrassia.webflow.io/get-support/email'; // link desiderato
    },
    maxRetries: 30,
    retryIntervalMs: 200
  };

  // helper
  function $id(id) { return document.getElementById(id); }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, function (s) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[s]);
    });
  }

  // create card inside root
  function createCardAt(root) {
    if (!root) return;
    if (root.dataset.appleLiveChatInit === '1') return;
    root.dataset.appleLiveChatInit = '1';

    var wrapper = document.createElement('div');
    wrapper.className = 'email-card-wrapper';
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', config.title + ' — ' + config.subtitle);

    // CSS
    var style = document.createElement('style');
    var idSelector = '#' + config.containerId;
    style.textContent = `
${idSelector} .email-card-wrapper,
.email-card-wrapper {
font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
}

.email-card {
display:flex;
align-items:center;
gap:16px;
padding:18px;
border-radius:14px;
border: 1px solid rgba(0,0,0,0.4);
width:325px;
cursor:pointer;
}

.email-icon {
width:40px;
height:auto;
display:inline-block;
}

.email-content {
flex:1 1 auto;
min-width:0;
}

.email-title {
font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
font-size:17px;
line-height:25px;
font-weight:600;
letter-spacing: -0.5px;
color: rgb(29,29,31);
margin:0;
}

.email-subtitle {
font-size:14px;
line-height:18px;
font-weight: 400;
letter-spacing: -0.4px;
color: rgb(29,29,31);
}

.email-status {
  font-size: 14px;
  line-height:18px;
  font-weight: 400;
  letter-spacing: -0.5px;
  color: rgb(0,128,9);  /* Verde per Disponibile */
}
.email-status.offline {
  color: rgb(181,181,181);    /* Grigio per Offline */
}

@media (max-width:720px){
.email-card{
padding:12px;
gap:12px;
border-radius:12px;
}

.email-avatar{
width:52px;
height:auto;
} 

.email-title{
font-size:15px;
} 
}

.email-status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  letter-spacing: -0.5px;
  color: rgb(0,128,9);  /* Verde per Disponibile (testo) */
}

.email-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  background-color: rgb(86,168,94); /* verde dot */
}

/* stato offline */ /* Grigio per Offline (testo) */
.email-status.offline {
  color: rgb(181,181,181);
}
.email-status.offline .email-status-dot {
  background-color: rgb(181,181,181); /* grigio dot */
}

.email-card.offline {
  pointer-events: none; /* disabilita click */
  cursor: auto;
}

.email-title.offline {
  color: rgb(181,181,181); /* grigio like Apple */
}

.email-subtitle.offline {
  color: rgb(181,181,181); /* grigio */
}
`;
    root.appendChild(style);

    // HTML
    wrapper.innerHTML = `
<div class="email-card" tabindex="0">
<div class="email-avatar" aria-hidden="true">
  <img class="email-icon" src="https://cdn.prod.website-files.com/6900acd1c3e34a5adaf492fd/69248e4f5fe6cfdc1070e66e_a88337c99df6367a4e9fa0dd35298f2a_email-online.png" alt="Icona chat">
</div>
  <div class="email-content">
    <h3 class="email-title">${escapeHtml(config.title)}</h3>
    <div class="email-subtitle" id="email-subtitle">${escapeHtml(config.subtitle)}</div>
    <div class="email-status" id="email-status" role="status" aria-live="polite">
  <span class="email-status-dot" aria-hidden="true"></span>
  <span class="email-status-text">...</span>
</div>
  </div>
</div>
`;
    root.appendChild(wrapper);

    var card = root.querySelector('.email-card');
    var statusEl = root.querySelector('#email-status');

    var iconEl = root.querySelector('.email-icon');

    // icona disponibile
    var iconOnline = "https://cdn.prod.website-files.com/6900acd1c3e34a5adaf492fd/69248e4f5fe6cfdc1070e66e_a88337c99df6367a4e9fa0dd35298f2a_email-online.png";

    // icona offline (devi mettere il tuo link)
    var iconOffline = "https://cdn.prod.website-files.com/6900acd1c3e34a5adaf492fd/692497fb0b349b0fe14a6d83_email-offline.png";

    var titleEl = root.querySelector('.email-title');
    var subtitleEl = root.querySelector('.email-subtitle');

    // 📅 Orari per giorno della settimana
    var schedule = {
      1: { startHour: 7, startMinute: 0, endHour: 21, endMinute: 0 }, // Lunedì
      2: { startHour: 7, startMinute: 0, endHour: 21, endMinute: 0 }, // Martedì
      3: { startHour: 7, startMinute: 0, endHour: 21, endMinute: 0 }, // Mercoledì
      4: { startHour: 7, startMinute: 0, endHour: 21, endMinute: 0 }, // Giovedì
      5: { startHour: 7, startMinute: 0, endHour: 21, endMinute: 0 }, // Venerdì
      6: { startHour: 8, startMinute: 0, endHour: 16, endMinute: 0 }, // Sabato
      0: null // Domenica chiuso
    };

// All’interno della IIFE, subito dopo var schedule:
window.APP_CHAT_SCHEDULE = schedule;

function updateStatus() {
  var now = new Date();
  // giorno corrente (0=Dom,1=Lun,...6=Sab)
  var today = now.getDay();

  // ora e minuti in Europe/Rome
  var hours = parseInt(new Intl.DateTimeFormat('en-GB', {hour:'numeric', hour12:false, timeZone:'Europe/Rome'}).format(now),10);
  var minutes = parseInt(new Intl.DateTimeFormat('en-GB', {minute:'numeric', timeZone:'Europe/Rome'}).format(now),10);

  var nowMinutes = hours*60 + minutes;

  var todaySchedule = schedule[today];

  var isAvailableToday = false;
  if (todaySchedule) {
    var startMinutesToday = todaySchedule.startHour*60 + todaySchedule.startMinute;
    var endMinutesToday = todaySchedule.endHour*60 + todaySchedule.endMinute;
    if (nowMinutes >= startMinutesToday && nowMinutes < endMinutesToday) {
      isAvailableToday = true;
    }
  }

  var subtitleEl = root.querySelector('#email-subtitle');

if (isAvailableToday) {
    var textEl = statusEl.querySelector('.email-status-text') || statusEl;
    textEl.textContent = "Disponibile";
    statusEl.classList.remove("offline");

    // rimuovi grigio dalla card
    card.classList.remove("offline");

    if (iconEl) iconEl.src = iconOnline;
    if (titleEl) titleEl.classList.remove("offline");
    if (subtitleEl) subtitleEl.classList.remove("offline");


    statusEl.setAttribute('aria-label', 'Disponibile');
    if (subtitleEl) subtitleEl.textContent = config.subtitle || '';
    return;
}

  // Non disponibile ora -> cerca la prossima finestra di disponibilità (incluso oggi, ma solo se start > now)
  var found = null;
  for (var i = 0; i < 7; i++) {
    var dayIndex = (today + i) % 7;
    var sch = schedule[dayIndex];
    if (!sch) continue; // giorno chiuso
    var startM = sch.startHour*60 + sch.startMinute;

    if (i === 0) {
      // oggi: consideralo solo se start è dopo adesso
      if (startM > nowMinutes) {
        found = { dayIndex: dayIndex, startHour: sch.startHour, startMinute: sch.startMinute, offsetDays: 0 };
        break;
      }
    } else {
      // giorno futuro: primo disponibile
      found = { dayIndex: dayIndex, startHour: sch.startHour, startMinute: sch.startMinute, offsetDays: i };
      break;
    }
  }

  // Aggiorna stato e sottotitolo
  var textEl = statusEl.querySelector('.email-status-text') || statusEl;
  if (found) {
    // formattazione giorno in italiano
    var giorniIt = ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'];
    var giornoNome = giorniIt[found.dayIndex] || '';

    // format HH:MM con zeri
    function two(n){ return (n<10? '0':'') + n; }
    var timeStr = two(found.startHour) + ':' + two(found.startMinute);

textEl.textContent = "Offline";
statusEl.classList.add("offline");

// aggiungi grigio alla card
card.classList.add("offline");

if (iconEl) iconEl.src = iconOffline;

if (titleEl) titleEl.classList.add("offline");
if (subtitleEl) subtitleEl.classList.add("offline");

statusEl.setAttribute('aria-label', 'Offline');

if (subtitleEl) {
  subtitleEl.textContent = "Disponibile " + giornoNome + ", alle " + timeStr;
}

  } else {
    // nessuna disponibilità trovata nella settimana (tutti null)
textEl.textContent = "Offline";
statusEl.classList.add("offline");

// aggiungi grigio alla card
card.classList.add("offline");

if (iconEl) iconEl.src = iconOffline;

if (titleEl) titleEl.classList.add("offline");
if (subtitleEl) subtitleEl.classList.add("offline");
    
statusEl.setAttribute('aria-label', 'Offline');
if (subtitleEl) subtitleEl.textContent = "Non ci sono orari di disponibilità programmati";
  }
}

    // aggiorna subito e poi ogni minuto
    updateStatus();
    setInterval(updateStatus, 60*1000);

    if (card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(e) {
        try { config.onButtonClick(e); } catch(err) { console.error(err); }
      });
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          try { config.onButtonClick(e); } catch(err) { console.error(err); }
        }
      });
    }
  }

  // init con retries per Webflow
  function initWithRetries() {
    var attempts = 0;
    var tryFind = function () {
      var root = $id(config.containerId);
      if (root) { createCardAt(root); return true; }
      attempts++;
      if (attempts >= config.maxRetries) return false;
      setTimeout(tryFind, config.retryIntervalMs);
    };
    tryFind();

    var observer = new MutationObserver(function(mutations, obs){
      var root = $id(config.containerId);
      if(root){ createCardAt(root); obs.disconnect(); }
    });
    observer.observe(document.documentElement || document.body, { childList:true, subtree:true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWithRetries);
  } else {
    initWithRetries();
  }

  // Public API
  window.appleLiveChatCard = window.appleLiveChatCard || {};
  window.appleLiveChatCard.setConfig = function(newCfg){
    Object.assign(config, newCfg || {});
    var root = $id(config.containerId);
    if(root){
      delete root.dataset.appleLiveChatInit;
      while(root.firstChild) root.removeChild(root.firstChild);
      createCardAt(root);
    }
  };

})();
