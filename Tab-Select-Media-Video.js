document.addEventListener('DOMContentLoaded', function () {
    // Prendi il dropdown e i Tab Links
    const tabSelect = document.getElementById('tabSelect'); // Dropdown con ID 'tabSelect'
    const tabs = document.querySelectorAll('.w-tab-link'); // Tutti i Tab Links con classe 'w-tab-link'

    // Nascondi i Tab Links (opzionale)
    tabs.forEach(tab => tab.style.display = 'none');

    // Aggiungi il listener per il cambiamento del dropdown
    tabSelect.addEventListener('change', function () {
      const selectedValue = tabSelect.value; // Ottieni il valore selezionato dal dropdown (tab1, tab3)
      
      // Trova il Tab Link corrispondente
      const targetTab = Array.from(tabs).find(tab => tab.id === selectedValue);

      if (targetTab) {
        targetTab.click(); // Simula il click sul Tab Link corrispondente
      }
    });
});
