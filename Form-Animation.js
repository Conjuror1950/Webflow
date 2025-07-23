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
@media only screen 
  and (max-width: 767px) 
  and (orientation: landscape) {

  body {
    /* ruota -90° per riportare l’orientamento portrait */
    transform: rotate(-90deg);
    transform-origin: top left;
    /* scambio width/height per adattare viewport */
    width: 100vh;
    height: 100vw;
    overflow: hidden;
  }
}

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
 window.addEventListener('resize', checkLandscapeLock);
 window.addEventListener('orientationchange', checkLandscapeLock);
 checkLandscapeLock();
});
