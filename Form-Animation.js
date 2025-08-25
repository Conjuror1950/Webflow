(function () {
  // === CSS ===
  const style = document.createElement('style');
  style.innerHTML = `

    .form-input:focus + .form-label,
    .form-input:not(:placeholder-shown) + .form-label {
      top: 0;
      font-size: 0.8rem;
      transform: translateY(0%);
    }
    
    #mobile-landscape-lock {
      position: fixed;
      inset: 0;
      background: white;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 9999;
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
      width: 2.5rem;
      height: 2.5rem;
      color: black;
      opacity: 0.95;
    }

    #mobile-landscape-lock .lock-message p {
      font-family: "SF Pro Display", -apple-system, sans-serif !important;
      font-size: 1rem;
      font-weight: 500;
      color: black;
      margin: 0;
      letter-spacing: 0.02em;
    }
  `;
  document.head.appendChild(style);

  // === HTML ===
  const overlay = document.createElement('div');
  overlay.id = 'mobile-landscape-lock';
  overlay.innerHTML = `
    <div class="lock-message">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.9668 19.5986">
        <g>
          <rect height="19.5986" opacity="0" width="23.9668" x="0" y="0"/>
          <path d="M11.8028 0C8.9215 0 6.27736 1.25742 4.47541 3.29844C4.17492 3.63193 4.26925 4.0628 4.55256 4.25918C4.79845 4.44815 5.12756 4.44951 5.43176 4.11905C7.00969 2.34483 9.29474 1.26358 11.8028 1.26358C16.1054 1.26358 19.6457 4.44649 20.2056 8.579L18.6621 8.579C18.0989 8.579 17.9383 8.96601 18.2579 9.42139L20.3879 12.4609C20.652 12.8436 21.039 12.8473 21.3098 12.4609L23.4398 9.42812C23.7631 8.96601 23.5987 8.579 23.0356 8.579L21.4961 8.579C20.9191 3.74648 16.7986 0 11.8028 0ZM11.8028 19.5889C14.687 19.5889 17.3281 18.3314 19.1331 16.2904C19.4306 15.9502 19.3362 15.5261 19.0529 15.3229C18.807 15.1407 18.481 15.1394 18.1768 15.4601C16.5988 17.2373 14.3138 18.3223 11.8028 18.3223C7.50012 18.3223 3.95979 15.1394 3.39992 11.0099L4.94338 11.0099C5.50959 11.0099 5.66721 10.6161 5.3506 10.1675L3.22062 7.12119C2.95353 6.74531 2.56652 6.73858 2.29572 7.12119L0.165739 10.1607C-0.157602 10.6161 1.55975e-05 11.0099 0.569939 11.0099L2.10939 11.0099C2.68947 15.8394 6.80988 19.5889 11.8028 19.5889Z" fill="black" fill-opacity="0.9"/>
        </g>
      </svg>
      <p>Ruotare il dispositivo</p>
    </div>
  `;
  document.body.appendChild(overlay);

  // === Funzioni utili ===
  function isLandscapeMobile() {
    return window.innerWidth <= 767 && window.innerWidth > window.innerHeight;
  }

  function isFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
  }

  function updateOverlay() {
    if (isLandscapeMobile() && !isFullscreen()) {
      overlay.style.display = 'flex';
      document.body.querySelectorAll(':scope > *:not(#mobile-landscape-lock)').forEach(el => el.style.display = 'none');
    } else {
      overlay.style.display = 'none';
      document.body.querySelectorAll(':scope > *:not(#mobile-landscape-lock)').forEach(el => el.style.display = '');
    }
  }

  // === Event listeners ===
  window.addEventListener('resize', updateOverlay);
  document.addEventListener('fullscreenchange', updateOverlay);
  document.addEventListener('webkitfullscreenchange', updateOverlay);
  document.addEventListener('mozfullscreenchange', updateOverlay);
  document.addEventListener('msfullscreenchange', updateOverlay);

  // === Initial check ===
  updateOverlay();
})();
