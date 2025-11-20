/*!apple-live-chat-card.js*/
(function () {
  'use strict';

  // CONFIG: edit if needed
  var config = {
    containerId: 'chat-dal-vivo-container-desktop', // id del tuo div su Webflow
    title: 'Chat dal vivo',
    subtitle: 'Avvia una conversazione con Andrea',
    onButtonClick: function (e) {
      window.location.href = 'https://support-andreaingrassia.webflow.io/contact/chat'; // link desiderato
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
    wrapper.className = 'alc-card-wrapper';
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', config.title + ' — ' + config.subtitle);

    // CSS
    var style = document.createElement('style');
    var idSelector = '#' + config.containerId;
    style.textContent = `
${idSelector} .alc-card-wrapper,
.alc-card-wrapper {
font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
}

.alc-card {
display:flex;
align-items:center;
gap:16px;
padding:18px;
border-radius:14px;
border: 1px solid rgba(0,0,0,0.4);
max-width:auto;
cursor:pointer;
}

.alc-icon {
width:40px;
height:40px;
display:inline-block;
}

.alc-content {
flex:1 1 auto;
min-width:0;
}

.alc-title {
font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
font-size:17px;
line-height:25px;
font-weight:600;
letter-spacing: -0.5px;
color: rgb(29,29,31);
margin:0;
}

.alc-subtitle {
font-size:14px;
line-height:18px;
font-weight: 400;
letter-spacing: -0.4px;
color: rgb(29,29,31);
}

.alc-status {
  font-size: 14px;
  line-height:18px;
  font-weight: 400;
  letter-spacing: -0.5px;
  color: rgb(0,128,9);  /* Verde per Disponibile */
}
.alc-status.offline {
  color: #c00;    /* Rosso per Offline */
}

@media (max-width:720px){
.alc-card{
padding:12px;
gap:12px;
border-radius:12px;
}

.alc-avatar{
width:52px;
height:52px;
} 

.alc-title{
font-size:15px;
} 
}

.alc-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  letter-spacing: -0.5px;
  color: rgb(0,128,9);  /* Verde per Disponibile (testo) */
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  background-color: rgb(86,168,94); /* verde dot */
}

/* stato offline */
.alc-status.offline {
  color: #c00;
}
.alc-status.offline .status-dot {
  background-color: #c00;
}

`;
    root.appendChild(style);

    // HTML
    wrapper.innerHTML = `
<div class="alc-card" tabindex="0">
<div class="alc-avatar" aria-hidden="true">
  <img class="alc-icon" src="https://cdn.prod.website-files.com/6900acd1c3e34a5adaf492fd/691f25bddb8a25199c4b2a7b_chat.svg" alt="Icona chat">
</div>
  <div class="alc-content">
    <h3 class="alc-title">${escapeHtml(config.title)}</h3>
    <div class="alc-subtitle">${escapeHtml(config.subtitle)}</div>
    <div class="alc-status" id="alc-status" role="status" aria-live="polite">
  <span class="status-dot" aria-hidden="true"></span>
  <span class="status-text">...</span>
</div>
  </div>
</div>
`;
    root.appendChild(wrapper);

    var card = root.querySelector('.alc-card');
    var statusEl = root.querySelector('#alc-status');

    // 📅 Orari per giorno della settimana
    var schedule = {
      1: { startHour: 9, startMinute: 0, endHour: 20, endMinute: 0 }, // Lun
      2: { startHour: 9, startMinute: 0, endHour: 20, endMinute: 0 }, // Mar
      3: { startHour: 9, startMinute: 0, endHour: 20, endMinute: 0 }, // Mer
      4: { startHour: 13, startMinute: 46, endHour: 20, endMinute: 25 }, // Gio
      5: { startHour: 9, startMinute: 0, endHour: 20, endMinute: 0 }, // Ven
      6: { startHour: 9, startMinute: 0, endHour: 18, endMinute: 0 }, // Sabato
      0: null // Domenica chiuso
    };

    function updateStatus() {
      var now = new Date();
      var day = now.getDay(); // 0=Dom, 1=Lun, ... 6=Sab
      var hours = parseInt(new Intl.DateTimeFormat('en-GB', {hour:'numeric', hour12:false, timeZone:'Europe/Rome'}).format(now),10);
      var minutes = parseInt(new Intl.DateTimeFormat('en-GB', {minute:'numeric', timeZone:'Europe/Rome'}).format(now),10);

      var todaySchedule = schedule[day];
      if(todaySchedule) {
        var nowMinutes = hours*60 + minutes;
        var startMinutes = todaySchedule.startHour*60 + todaySchedule.startMinute;
        var endMinutes = todaySchedule.endHour*60 + todaySchedule.endMinute;

var textEl = statusEl.querySelector('.status-text');
if (!textEl) textEl = statusEl; // fallback

if(nowMinutes >= startMinutes && nowMinutes < endMinutes){
  textEl.textContent = "Disponibile";
  statusEl.classList.remove("offline");
  // assicurati che il dot esista — facoltativo: aggiungi titolo per accessibilità
  statusEl.setAttribute('aria-label', 'Disponibile');
} else {
  textEl.textContent = "Offline";
  statusEl.classList.add("offline");
  statusEl.setAttribute('aria-label', 'Offline');
}
      } else {
        statusEl.textContent = "Offline";
        statusEl.classList.add("offline");
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
