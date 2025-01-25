document.addEventListener('DOMContentLoaded', function () {
    // Prendi il dropdown e i Tab Links
    const tabSelect3 = document.getElementById('tabSelect3'); // Dropdown con ID 'tabSelect3'
    const tabs = document.querySelectorAll('.w-tab-link'); // Tutti i Tab Links con classe 'w-tab-link'

    // Nascondi i Tab Links (opzionale)
    tabs.forEach(tab => tab.style.display = 'none');

    // Aggiungi il listener per il cambiamento del dropdown
    tabSelect3.addEventListener('change', function () {
      const selectedValue = tabSelect3.value; // Ottieni il valore selezionato dal dropdown (tab4, tab5)
      
      // Trova il Tab Link corrispondente
      const targetTab = Array.from(tabs).find(tab => tab.id === selectedValue);

      if (targetTab) {
        targetTab.click(); // Simula il click sul Tab Link corrispondente
      }
    });
  });
