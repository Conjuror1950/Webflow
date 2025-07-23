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
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20.1171 24.3272">
 <g>
  <rect height="24.3272" opacity="0" width="20.1171" x="0" y="0"/>
  <path d="M19.7558 2.88174L19.7558 16.6884C19.7558 18.5962 18.7855 19.5701 16.901 19.5701L15.0225 19.5701L15.0225 7.61553C15.0225 5.70772 14.062 4.73379 12.1677 4.73379L4.7333 4.73379L4.7333 2.88174C4.7333 0.973926 5.69375 0 7.58809 0L16.901 0C18.7855 0 19.7558 0.980664 19.7558 2.88174ZM9.96768 1.92256C9.58037 1.92256 9.40322 2.16875 9.40322 2.43818L9.40322 2.62207C9.40322 2.88477 9.58037 3.14072 9.96768 3.14072L14.5184 3.14072C14.8989 3.14072 15.0858 2.88477 15.0858 2.62207L15.0858 2.43818C15.0858 2.16875 14.8989 1.92256 14.5184 1.92256Z" fill="black" fill-opacity="0.85"/>
  <path d="M0 21.4222C0 23.33 0.96045 24.3039 2.85479 24.3039L12.1677 24.3039C14.062 24.3039 15.0225 23.3232 15.0225 21.4222L15.0225 7.61553C15.0225 5.70772 14.062 4.73379 12.1677 4.73379L2.85479 4.73379C0.96045 4.73379 0 5.70098 0 7.61553ZM1.20899 21.3959L1.20899 7.63506C1.20899 6.54112 1.78711 5.94278 2.90801 5.94278L12.1077 5.94278C13.2286 5.94278 13.8135 6.54112 13.8135 7.63506L13.8135 21.3959C13.8135 22.4966 13.2286 23.0949 12.1077 23.0949L2.90801 23.0949C1.78711 23.0949 1.20899 22.4966 1.20899 21.3959Z" fill="black" fill-opacity="0.85"/>
  <path d="M2.26797 15.1394L4.9667 15.1394C5.25772 15.1394 5.32979 14.8709 5.16475 14.6466L3.97364 12.912C3.77158 12.6258 3.46006 12.6153 3.25733 12.912L2.07598 14.6466C1.9207 14.8648 1.99278 15.1394 2.26797 15.1394ZM7.52236 18.8761C8.62578 18.8761 9.63896 18.4505 10.3508 17.8105C10.6341 17.5878 10.6348 17.2819 10.4855 17.099C10.3468 16.9266 10.0746 16.8629 9.78154 17.0849C9.19131 17.6131 8.40381 17.9494 7.52236 17.9494C5.61592 17.9494 4.0711 16.4046 4.0711 14.4981L3.15117 14.4981C3.15117 16.9196 5.10762 18.8761 7.52236 18.8761ZM12.7737 13.8667L10.0713 13.8667C9.78398 13.8667 9.71191 14.1352 9.87021 14.3595L11.0644 16.094C11.2634 16.3803 11.5816 16.3907 11.7844 16.094L12.962 14.3595C13.121 14.1382 13.0422 13.8667 12.7737 13.8667ZM7.52236 10.127C6.41592 10.127 5.40274 10.5525 4.68418 11.1926C4.40088 11.4183 4.40322 11.7241 4.55244 11.904C4.69492 12.0765 4.96035 12.1432 5.25342 11.9212C5.84668 11.3899 6.63115 11.0566 7.52236 11.0566C9.41904 11.0566 10.9639 12.6015 10.9639 14.4981L11.8936 14.4981C11.8936 12.0834 9.93711 10.127 7.52236 10.127Z" fill="black" fill-opacity="0.85"/>
 </g>
</svg>
      <p>Ruota in verticale</p>
    </div>
  `;
  document.body.appendChild(overlay);
})();
