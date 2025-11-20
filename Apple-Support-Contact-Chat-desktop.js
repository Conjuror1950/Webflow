/*!
  apple-live-chat-card.js
  Versione ottimizzata per Webflow + Netlify/GitHub
*/
(function () {
  'use strict';

// CONFIG: edit if needed
var config = {
  containerId: 'chat-dal-vivo-container-desktop', // id del tuo div su Webflow
  title: 'Chat dal vivo',
  subtitle: 'Avvia una conversazione con Apple',

  // Azioni: sostituisci gli URL con quelli che vuoi usare
  // Opzione A: apri nella stessa finestra
  onButtonClick: function (e) {
    window.location.href = 'https://support-andreaingrassia.webflow.io/contact/chat'; // metti qui il link che vuoi
  },

  // retry / observer config (lascia così)
  maxRetries: 30,
  retryIntervalMs: 200
};


  // helper
  function $id(id) { return document.getElementById(id); }

  // escape HTML
  function escapeHtml (str) {
    return String(str || '').replace(/[&<>"']/g, function (s) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[s]);
    });
  }

  // create card inside root
  function createCardAt(root) {
    if (!root) return;
    if (root.dataset.appleLiveChatInit === '1') return; // già inizializzato
    root.dataset.appleLiveChatInit = '1';

    // wrapper
    var wrapper = document.createElement('div');
    wrapper.className = 'alc-card-wrapper';
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', config.title + ' — ' + config.subtitle);

    // styles (scope by ID if possible, fallback to direct class)
    var style = document.createElement('style');
    // preferiamo lo scope con ID per evitare dipendere da class
    var idSelector = '#' + config.containerId;
    style.textContent = "\n/* Scoped styles for Apple Live Chat card */\n" + idSelector + " .alc-card-wrapper, .alc-card-wrapper { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }\n.alc-card { display:flex; align-items:center; gap:16px; padding:18px; border-radius:14px; backdrop-filter: blur(6px) saturate(120%); -webkit-backdrop-filter: blur(6px) saturate(120%); background: linear-gradient(180deg, rgba(245,245,246,0.6), rgba(240,240,241,0.45)); box-shadow: 0 6px 20px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.06); max-width:720px; }\n.alc-avatar { flex:0 0 64px; width:64px; height:64px; border-radius:14px; display:grid; place-items:center; background: linear-gradient(180deg,#ffffff,#f2f2f4); box-shadow: inset 0 -1px 0 rgba(0,0,0,0.03); }\n.alc-icon { width:36px; height:36px; display:inline-block; }\n.alc-content { flex:1 1 auto; min-width:0; }\n.alc-title { font-size:16px; line-height:1.1; font-weight:600; color:#0b0b0b; margin:0; }\n.alc-subtitle { font-size:13px; margin:2px 0 8px 0; color:#3b3b3b; }\n.alc-description { font-size:13px; color:#545454; margin:0 0 8px 0; opacity:0.95; }\n.alc-actions { display:flex; gap:10px; align-items:center; }\n.alc-btn { appearance:none; border:0; padding:10px 14px; font-size:14px; border-radius:9px; cursor:pointer; background:linear-gradient(180deg,#0071e3,#0060c4); color:white; font-weight:600; box-shadow: 0 6px 16px rgba(0,113,227,0.18); transition: transform .18s ease, box-shadow .18s ease; }\n.alc-btn:active { transform: translateY(1px); }\n.alc-link { font-size:13px; color:#0071e3; background:transparent; border:0; cursor:pointer; padding:6px 8px; text-decoration:underline; }\n.alc-chevron { width:12px; height:12px; display:inline-block; transform:translateY(1px); }\n@media (max-width:720px){ .alc-card{ padding:12px; gap:12px; border-radius:12px;} .alc-avatar{width:52px;height:52px;} .alc-title{font-size:15px;} .alc-btn{padding:9px 12px;} }\n.alc-btn:focus, .alc-link:focus { outline:3px solid rgba(0,113,227,0.15); outline-offset:2px; }\n@media (prefers-reduced-motion: reduce){ .alc-btn, .alc-card { transition: none; } }\n";

    // append style and wrapper to root (no head editing)
    root.appendChild(style);

    // inner html
    wrapper.innerHTML =
      '<div class="alc-card" tabindex="0">' +
        '<div class="alc-avatar" aria-hidden="true">' +
          '<svg class="alc-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<path d="M4 4h16v10H7.5L4 17V4z" stroke="#0B0B0B" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" fill="white"/>' +
            '<circle cx="8.5" cy="8.8" r="1.2" fill="#0071E3"/>' +
          '</svg>' +
        '</div>' +
        '<div class="alc-content">' +
          '<h3 class="alc-title">' + escapeHtml(config.title) + '</h3>' +
          '<div class="alc-subtitle">' + escapeHtml(config.subtitle) + '</div>' +
          '<p class="alc-description">' + escapeHtml(config.description) + '</p>' +
          '<div class="alc-actions">' +
            '<button class="alc-btn" type="button" aria-haspopup="dialog" id="alc-start-btn">' + escapeHtml(config.buttonText) + '</button>' +
            '<button class="alc-link" type="button" id="alc-info-link">' + escapeHtml(config.linkText) + ' <span class="alc-chevron">›</span></button>' +
          '</div>' +
        '</div>' +
      '</div>';

    root.appendChild(wrapper);

    // events
    var btn = root.querySelector('#alc-start-btn');
    var link = root.querySelector('#alc-info-link');
    var card = root.querySelector('.alc-card');

    if (btn) {
      btn.addEventListener('click', function (e) {
        try { config.onButtonClick(e); } catch (err) { console.error(err); }
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); config.onButtonClick(e); }
      });
    }
    if (link) {
      link.addEventListener('click', function (e) { try { config.onLinkClick(e); } catch (err) { console.error(err); } });
      link.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); config.onLinkClick(e); } });
    }
    if (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('#alc-info-link')) return;
        if (e.target.closest('#alc-start-btn')) return;
        try { config.onButtonClick(e); } catch (err) { console.error(err); }
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          try { config.onButtonClick(e); } catch (err) { console.error(err); }
        }
      });
    }
  }

  // Try to find container with polling (utile per Webflow che carica DOM in modo dinamico)
  function initWithRetries() {
    var attempts = 0;
    var tryFind = function () {
      var root = $id(config.containerId);
      if (root) {
        createCardAt(root);
        return true;
      }
      attempts++;
      if (attempts >= config.maxRetries) {
        return false;
      }
      setTimeout(tryFind, config.retryIntervalMs);
    };
    tryFind();

    // Additionally, use a MutationObserver as fallback if element is inserted later
    var observer = new MutationObserver(function (mutations, obs) {
      var root = $id(config.containerId);
      if (root) {
        createCardAt(root);
        obs.disconnect();
      }
    });
    observer.observe(document.documentElement || document.body, { childList: true, subtree: true });
  }

  // init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWithRetries);
  } else {
    initWithRetries();
  }

  // Public API
  window.appleLiveChatCard = window.appleLiveChatCard || {};
  window.appleLiveChatCard.setConfig = function (newCfg) {
    Object.assign(config, newCfg || {});
    var root = $id(config.containerId);
    if (root) {
      // reset (rimuove il markup e la marca di init per ricreare)
      delete root.dataset.appleLiveChatInit;
      // rimuove i figli (compresi gli stili iniettati)
      while (root.firstChild) root.removeChild(root.firstChild);
      createCardAt(root);
    }
  };

})();
