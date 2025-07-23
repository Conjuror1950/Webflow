(function () {
  // 1. inietta meta viewport-fit=cover
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
  document.head.insertBefore(meta, document.head.firstChild);

  // 2. CSS e overlay
  const style = document.createElement('style');
  style.innerHTML = `
    /* overlay nascosto di default */
    #mobile-landscape-lock {
      position: fixed;
      top: 0; left: 0;
      width: 100dvw;    /* copre l’intera larghezza reale */
      height: 100dvh;   /* copre l’intera altezza reale */
      background: #000; /* Apple‑black */
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 9999;
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
      color: #fff;
      opacity: 0.8;
    }
    #mobile-landscape-lock .lock-message p {
      font-family: "SF Pro Display", -apple-system, sans-serif !important;
      font-size: 1rem;
      font-weight: 500;
      color: #fff;
      margin: 0;
      letter-spacing: 0.02em;
    }
    @media (orientation: landscape) and (max-width: 767px) {
      body > *:not(#mobile-landscape-lock) {
        display: none !important;
      }
      #mobile-landscape-lock {
        display: flex !important;
      }
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'mobile-landscape-lock';
  overlay.innerHTML = `
    <div class="lock-message">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4 4v5h.582A6.002 6.002 0 0110 4a6 6 0 015.657 8.004.75.75 0 11-1.414-.38A4.5 4.5 0 0010 5.5a4.5 4.5 0 00-4.5 4.5h2.25l-3 3-3-3H4A6 6 0 014 4z"/>
      </svg>
      <p>Ruota in verticale</p>
    </div>
  `;
  document.body.insertBefore(overlay, document.body.firstChild);
})();
