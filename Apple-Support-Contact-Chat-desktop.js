(function () {
  'use strict';

  // CONFIG: edit if needed
  var config = {
    containerId: 'chat-dal-vivo-container-desktop',
    title: 'Chat dal vivo',
    subtitle: 'Parla con un esperto in diretta',
    description: 'Ottieni aiuto immediato per prodotti, assistenza tecnica e molto altro. Disponibile ora.',
    buttonText: 'Avvia chat',
    linkText: 'Ulteriori informazioni',
    // Action handlers (replace with your actual URL or functions)
    onButtonClick: function (e) {
      // default: open a chat modal (placeholder)
      alert('Apertura della chat — sostituisci questa funzione con il tuo handler.');
    },
    onLinkClick: function (e) {
      // default: follow informational link
      window.location.href = '/info-chat';
    }
  };

  // Utility: safely find container
  function $id (id) { return document.getElementById(id); }

  function createCard () {
    var root = $id(config.containerId);
    if (!root) {
      console.error('apple-live-chat-card: container not found: #' + config.containerId);
      return;
    }

    // Prevent double-initialize
    if (root.dataset.appleLiveChatInit === '1') return;
    root.dataset.appleLiveChatInit = '1';

    // Create wrapper
    var wrapper = document.createElement('div');
    wrapper.className = 'alc-card-wrapper';
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', config.title + ' — ' + config.subtitle);

    // Inject styles scoped to this component
    var style = document.createElement('style');
    style.textContent = "\n/* Scoped styles for Apple Live Chat card */\n." + config.containerId + " .alc-card-wrapper { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }\n.alc-card { display:flex; align-items:center; gap:16px; padding:18px; border-radius:14px; backdrop-filter: blur(6px) saturate(120%); -webkit-backdrop-filter: blur(6px) saturate(120%); background: linear-gradient(180deg, rgba(245,245,246,0.6), rgba(240,240,241,0.45)); box-shadow: 0 6px 20px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.06); max-width:720px; }\n.alc-avatar { flex:0 0 64px; width:64px; height:64px; border-radius:14px; display:grid; place-items:center; background: linear-gradient(180deg,#ffffff,#f2f2f4); box-shadow: inset 0 -1px 0 rgba(0,0,0,0.03); }\n.alc-icon { width:36px; height:36px; display:inline-block; }\n.alc-content { flex:1 1 auto; min-width:0; }\n.alc-title { font-size:16px; line-height:1.1; font-weight:600; color:#0b0b0b; margin:0; }\n.alc-subtitle { font-size:13px; margin:2px 0 8px 0; color:#3b3b3b; }\n.alc-description { font-size:13px; color:#545454; margin:0 0 8px 0; opacity:0.95; }\n.alc-actions { display:flex; gap:10px; align-items:center; }\n.alc-btn { appearance:none; border:0; padding:10px 14px; font-size:14px; border-radius:9px; cursor:pointer; background:linear-gradient(180deg,#0071e3,#0060c4); color:white; font-weight:600; box-shadow: 0 6px 16px rgba(0,113,227,0.18); transition: transform .18s ease, box-shadow .18s ease; }\n.alc-btn:active { transform: translateY(1px); }\n.alc-link { font-size:13px; color:#0071e3; background:transparent; border:0; cursor:pointer; padding:6px 8px; text-decoration:underline; }\n.alc-chevron { width:12px; height:12px; display:inline-block; transform:translateY(1px); }
/* Responsive */\n@media (max-width:720px){ .alc-card{ padding:12px; gap:12px; border-radius:12px;} .alc-avatar{width:52px;height:52px;} .alc-title{font-size:15px;} .alc-btn{padding:9px 12px;} }\n/* Focus states */\n.alc-btn:focus, .alc-link:focus { outline:3px solid rgba(0,113,227,0.15); outline-offset:2px; }
/* Reduced motion */\n@media (prefers-reduced-motion: reduce){ .alc-btn, .alc-card { transition: none; } }\n";

    // Because user can't edit <head>, scope styles by injecting style into root
    root.appendChild(style);

    // Build inner HTML
    wrapper.innerHTML = '\n      <div class="alc-card" tabindex="0">\n        <div class="alc-avatar" aria-hidden="true">\n          <!-- simple chat bubble icon (SVG) -->\n          <svg class="alc-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n            <path d="M4 4h16v10H7.5L4 17V4z" stroke="#0B0B0B" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" fill="white"/>\n            <circle cx="8.5" cy="8.8" r="1.2" fill="#0071E3"/>\n          </svg>\n        </div>\n        <div class="alc-content">\n          <h3 class="alc-title">' + escapeHtml(config.title) + '</h3>\n          <div class="alc-subtitle">' + escapeHtml(config.subtitle) + '</div>\n          <p class="alc-description">' + escapeHtml(config.description) + '</p>\n          <div class="alc-actions">\n            <button class="alc-btn" type="button" aria-haspopup="dialog" id="alc-start-btn">' + escapeHtml(config.buttonText) + '</button>\n            <button class="alc-link" type="button" id="alc-info-link">' + escapeHtml(config.linkText) + ' <span class="alc-chevron">›</span></button>\n          </div>\n        </div>\n      </div>\n    ';

    root.appendChild(wrapper);

    // Hook events
    var btn = root.querySelector('#alc-start-btn');
    var link = root.querySelector('#alc-info-link');
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

    // Optional: make whole card clickable to start chat (but keep focusability)
    var card = root.querySelector('.alc-card');
    card.addEventListener('click', function (e) {
      // ignore clicks on the info link
      if (e.target.closest('#alc-info-link')) return;
      if (e.target.closest('#alc-start-btn')) return;
      try { config.onButtonClick(e); } catch (err) { console.error(err); }
    });

    // Accessibility: keyboard focusing the card will expose action buttons via aria
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        try { config.onButtonClick(e); } catch (err) { console.error(err); }
      }
    });

  }

  // Small helper to escape HTML (avoid injection)
  function escapeHtml (str) {
    return String(str).replace(/[&<>\"]/g, function (s) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]);
    });
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createCard);
  } else {
    createCard();
  }

  // Expose a small API for runtime customization
  window.appleLiveChatCard = window.appleLiveChatCard || {};
  window.appleLiveChatCard.setConfig = function (newCfg) {
    Object.assign(config, newCfg || {});
    // re-render quickly
    var root = $id(config.containerId);
    if (root) {
      // remove current content (but keep dataset init so we don't double-init)
      root.innerHTML = '';
      // remove dataset marker so createCard can run
      delete root.dataset.appleLiveChatInit;
      createCard();
    }
  };

})();
