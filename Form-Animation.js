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
      <svg xmlns="http://www.w3.org/2000/svg" 
     viewBox="0 0 24 24" fill="none" stroke="currentColor" 
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
     style="width: 3rem; height: 3rem; color: #fff; opacity: 0.8;">
  <path d="M3 2v6h6" />
  <path d="M3.05 13a9 9 0 1 0 .5-4.5" />
</svg>
      <p>Ruota in verticale</p>
    </div>
  `;
  document.body.appendChild(overlay);
})();
