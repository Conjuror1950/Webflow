document.addEventListener('DOMContentLoaded', function () {
  // Crea un tag <style> dinamicamente
  const style = document.createElement('style');
  
  // Aggiungi il tuo CSS al tag <style>
  style.innerHTML = `
    .form-input:focus + .form-label,
    .form-input:not(:placeholder-shown) + .form-label {
      top: 0px;
      font-size: 0.8rem;
      transform: translateY(0%);
    }

  /* Lock-orientation (mobile landscape) */
  /* solo su schermi “stretti” (mobile) in landscape, ruota indietro tutto il body */
   #mobile-landscape-lock {
     position: fixed;
     top: 0; left: 0;
     width: 100vw; height: 100vh;
     background: rgba(0,0,0,0.85);
     display: none;
     align-items: center;
     justify-content: center;
     z-index: 9999;
     transition: opacity 150ms ease-in-out;
     pointer-events: all;      /* cattura ogni tocco */
     touch-action: none;       /* disabilita touchmove sotto */
     will-change: opacity;     /* ottimizza il fade-in/out */
   }
   
   #mobile-landscape-lock.active {
     display: flex;
     opacity: 1;
   }
   
   #mobile-landscape-lock .lock-message p {
     color: #fff;
     font-size: 1.2rem;
     font-weight: 300;
     text-align: center;
     margin: 0;
     font-family: -apple-system, sans-serif;
     letter-spacing: .05em;
     opacity: .9;
   }

  `;
  
  // Aggiungi il tag <style> al documento
  document.head.appendChild(style);

   // === CREAZIONE DELL'OVERLAY ===
 const overlay = document.createElement('div');
 overlay.id = 'mobile-landscape-lock';
 overlay.innerHTML = `
   <div class="lock-message">
     <p>Ruota il dispositivo in verticale per continuare</p>
   </div>`;
 document.body.appendChild(overlay);

 // === LOGICA DI CONTROLLO ORIENTAMENTO ===
 function checkLandscapeLock() {
   const isMobile    = window.matchMedia('(max-width: 767px)').matches;
   const isLandscape = window.matchMedia('(orientation: landscape)').matches;
   if (isMobile && isLandscape) {
     overlay.classList.add('active');
   } else {
     overlay.classList.remove('active');
   }
 }
 const mql = window.matchMedia('(orientation: landscape) and (max-width: 767px)');
mql.addEventListener('change', e => {
  if (e.matches) overlay.classList.add('active');
  else overlay.classList.remove('active');
});
// chiamata iniziale
if (mql.matches) overlay.classList.add('active');
 checkLandscapeLock();
});
