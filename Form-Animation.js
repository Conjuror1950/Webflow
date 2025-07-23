(function () {
  const style = document.createElement('style');
  style.innerHTML = `
    /* label flottanti (rimane invariato) */
    .form-input:focus + .form-label,
    .form-input:not(:placeholder-shown) + .form-label {
      top: 0;
      font-size: 0.8rem;
      transform: translateY(0);
    }

    /* overlay di base, sempre nascosto */
    #mobile-landscape-lock {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      touch-action: none;
      will-change: opacity;
      /* rimuovi ogni transition qui */
    }

    #mobile-landscape-lock .lock-message p {
      color: black;
      font-size: 1.2rem;
      font-weight: 400;
      text-align: center;
      margin: 0;
      font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif !important;
      letter-spacing: .04em;
      opacity: .9;
    }

    /* qui la magia: sul landscape mobile attivi subito l'overlay
       e nascondi tutto il resto */
    @media (orientation: landscape) and (max-width: 767px) {
      #mobile-landscape-lock {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: all !important;
        transition: none !important;
      }
      /* tutti gli altri elementi diventano invisibili */
      body > :not(#mobile-landscape-lock) {
        visibility: hidden !important;
      }
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'mobile-landscape-lock';
  overlay.innerHTML = `
    <div class="lock-message">
      <p>Ruota il dispositivo in verticale per continuare</p>
    </div>`;
  document.body.appendChild(overlay);
})();
