(function () {
  // === CSS ===
  const style = document.createElement('style');
  style.innerHTML = `
    /* overlay di base, sempre nascosto */
    #mobile-landscape-lock {
      position: fixed;
      inset: 0;
      background: white;        /* sfondo bianco per Apple‑style */
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      /* gestisci notch/barre con safe‑area */
      padding-top: env(safe-area-inset-top);
      padding-bottom: env(safe-area-inset-bottom);
    }

    #mobile-landscape-lock .lock-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    #mobile-landscape-lock .lock-message svg {
      width: 3rem;
      height: 3rem;
      color: black;             /* su sfondo chiaro */
      opacity: 0.8;
    }

    #mobile-landscape-lock .lock-message p {
      font-family: "SF Pro Display", -apple-system, sans-serif !important;
      font-size: 1rem;
      font-weight: 500;
      color: black;
      margin: 0;
      letter-spacing: 0.02em;
    }

    /* media‑query che scatta **istantaneamente** */
    @media (orientation: landscape) and (max-width: 767px) {
      /* nascondi ogni contenuto tranne l’overlay */
      body > *:not(#mobile-landscape-lock) {
        display: none !important;
      }
      /* mostra subito overlay senza transizioni */
      #mobile-landscape-lock {
        display: flex !important;
      }
    }

    /* label (form animation) */
    .form-input:focus + .form-label,
    .form-input:not(:placeholder-shown) + .form-label {
      top: 0;
      font-size: 0.8rem;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // === HTML ===
  const overlay = document.createElement('div');
  overlay.id = 'mobile-landscape-lock';
  overlay.innerHTML = `
    <div class="lock-message">
      <!-- SF Symbol "rotate.right.fill" -->
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 20 20">
        <path d="M4 4v5h.582A6.002 6.002 0 0110 4a6 6 0 015.657 8.004.75.75 0 11-1.414-.38A4.5 4.5 0 0010 5.5a4.5 4.5 0 00-4.5 4.5h2.25l-3 3-3-3H4A6 6 0 014 4z"/>
      </svg>
      <p>Ruota in verticale</p>
    </div>
  `;
  document.body.appendChild(overlay);
})();
