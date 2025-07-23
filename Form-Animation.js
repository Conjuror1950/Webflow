(function () {
  const style = document.createElement('style');
  style.innerHTML = `
    /* overlay di base, sempre nascosto */
    #mobile-landscape-lock {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: white;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      touch-action: none;
    }

  #mobile-landscape-lock .lock-message p {
    color: black;
    font-size: 1.2rem;
    font-weight: 400;
    text-align: center;
    margin: 0;
    font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
    letter-spacing: .04em;
    opacity: .9;
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

    /* label flottanti (rimane invariato) */
    .form-input:focus + .form-label,
    .form-input:not(:placeholder-shown) + .form-label {
      top: 0;
      font-size: 0.8rem;
      transform: translateY(0);
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
