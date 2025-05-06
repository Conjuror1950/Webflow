document.addEventListener('DOMContentLoaded', function () {
  const tabSelect = document.getElementById('tabSelect-2'); // Il tuo <select> con ID 'tabSelect-2'

  // Quando cambia il valore selezionato
  tabSelect.addEventListener('change', function () {
    const selectedValue = tabSelect.value; // ad es. 'https://tuosito.com/pagina' o '#versione-2-4-0'
    
    if (selectedValue) {
      // Se il valore inizia con #, scrolla alla sezione. Altrimenti apri il link.
      if (selectedValue.startsWith('#')) {
        const targetSection = document.querySelector(selectedValue);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = selectedValue; // Vai alla URL selezionata
      }
    }
  });
});
