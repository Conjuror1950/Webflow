(function () {
  // === STYLE dinamico ===
  const style = document.createElement('style');
  style.innerHTML = `
    .form-input:focus + .form-label,
    .form-input:not(:placeholder-shown) + .form-label {
      top: 0px;
      font-size: 0.8rem;
      transform: translateY(0%);
    }

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
      transition: opacity 200ms ease-in-out, visibility 0s linear 200ms;
      pointer-events: none;
      touch-action: none;
      will-change: opacity;
    }

    #mobile-landscape-lock.active {
      opacity: 1;
      visibility: visible;
      transition: opacity 150ms ease-in-out;
      pointer-events: all;
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
  `;
  document.head.appendChild(style);

  // === OVERLAY ===
  const overlay = document.createElement('div');
  overlay.id = 'mobile-landscape-lock';
  overlay.innerHTML = `
    <div class="lock-message">
      <p>Ruota il dispositivo in verticale per continuare</p>
    </div>`;
  document.body.appendChild(overlay);

  // === MediaQueryListener ===
  const mql = window.matchMedia('(orientation: landscape) and (max-width: 767px)');
  const updateOverlay = () => {
    overlay.classList.toggle('active', mql.matches);
  };

  // ✅ Mostra subito l'overlay se necessario
  if (mql.matches) overlay.classList.add('active');

  mql.addEventListener('change', updateOverlay);
})();
