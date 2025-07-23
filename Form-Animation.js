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
  /* reset base */
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /* il wrapper di tutta la pagina */
  #page-wrapper {
    position: relative;  /* da default */
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /* solo mobile small + landscape */
  @media only screen 
    and (max-width: 767px) 
    and (orientation: landscape) {

    #page-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vh;   /* scambia le dimensioni */
      height: 100vw;
      transform: rotate(-90deg);
      transform-origin: 0 0;  
      backface-visibility: hidden;  /* migliora la resa */
      will-change: transform;       /* hint di performance */
    }
  }
  `;
  
  // Aggiungi il tag <style> al documento
  document.head.appendChild(style);

    // Forza un reflow minimo alla rotazione per evitare zoom/glitch
  window.addEventListener('orientationchange', () => {
    // piccolo timeout per lasciare finire l’animazione di rotazione di sistema
    setTimeout(() => {
      // forziamo un “reflow” css
      document.body.style.zoom = '1';
      void document.body.offsetHeight;
      document.body.style.zoom = '';
    }, 200);
  });
});
