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
  `;
  
  // Aggiungi il tag <style> al documento
  document.head.appendChild(style);
});
