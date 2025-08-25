(function () {
  // === Logica per animazioni del form ===
  
  // Esempio: animazione di fade-in dei campi del form al caricamento
  document.addEventListener('DOMContentLoaded', () => {
    const formElements = document.querySelectorAll('.form-element'); // seleziona i campi del form
    formElements.forEach((el, i) => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      }, i * 100); // animazione sfalsata
    });
  });

})();
