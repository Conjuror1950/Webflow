/*!apple-live-chat-card.js*/
(function () {
  'use strict';

  // CONFIG: edit if needed
  var config = {
    containerId: 'chat-dal-vivo-container-desktop', // id del tuo div su Webflow
    title: 'Chat dal vivo',
    subtitle: 'Avvia una conversazione con Apple',
    description: '', // opzionale
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
backdrop-filter: blur(6px) saturate(120%);
-webkit-backdrop-filter: blur(6px) saturate(120%);
background: linear-gradient(180deg, rgba(245,245,246,0.6), rgba(240,240,241,0.45));
box-shadow: 0 6px 20px rgba(0,0,0,0.08);
border: 1px solid rgba(0,0,0,0.06);
max-width:720px;
cursor:pointer;
}

.alc-avatar {
flex:0 0 64px;
width:64px;
height:64px;
border-radius:14px;
display:grid;
place-items:center;
background: linear-gradient(180deg,#ffffff,#f2f2f4);
box-shadow: inset 0 -1px 0 rgba(0,0,0,0.03);
}

.alc-icon {
width:36px;
height:36px;
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
color:#0b0b0b;
margin:0;
}

.alc-subtitle {
font-size:14px;
line-height:18px;
font-weight: 400;
margin:2px 0 8px 0;
color:#3b3b3b;
}

.alc-status {
  font-size: 14px;
  line-height:18px;
  font-weight: 400;
  color: #56a85e;  /* Verde per Disponibile */
  margin-bottom: 8px;
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
`;
    root.appendChild(style);

    // HTML
    wrapper.innerHTML = `
<div class="alc-card" tabindex="0">
  <div class="alc-avatar" aria-hidden="true">
    <svg class="alc-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 4h16v10H7.5L4 17V4z" stroke="#0B0B0B" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" fill="white"/>
      <circle cx="8.5" cy="8.8" r="1.2" fill="#0071E3"/>
    </svg>
  </div>
  <div class="alc-content">
    <h3 class="alc-title">${escapeHtml(config.title)}</h3>
    <div class="alc-subtitle">${escapeHtml(config.subtitle)}</div>
    <div class="alc-status" id="alc-status">...</div>
  </div>
</div>
`;
    root.appendChild(wrapper);

    var card = root.querySelector('.alc-card');
    var statusEl = root.querySelector('#alc-status');

    // 📅 Orari per giorno della settimana
    var schedule = {
      1: { startHour: 9, startMinute: 0, endHour: 20, endMinute: 0 }, // Lun-Ven
      2: { startHour: 9, startMinute: 0, endHour: 20, endMinute: 0 },
      3: { startHour: 9, startMinute: 0, endHour: 20, endMinute: 0 },
      4: { startHour: 13, startMinute: 46, endHour: 13, endMinute: 48 },
      5: { startHour: 9, startMinute: 0, endHour: 20, endMinute: 0 },
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

        if(nowMinutes >= startMinutes && nowMinutes < endMinutes){
          statusEl.textContent = "● Disponibile";
          statusEl.classList.remove("offline");
        } else {
          statusEl.textContent = "● Offline";
          statusEl.classList.add("offline");
        }
      } else {
        statusEl.textContent = "● Offline";
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
