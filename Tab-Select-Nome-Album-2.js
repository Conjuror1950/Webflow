document.addEventListener('DOMContentLoaded', function () {
    // Prendi il dropdown e i Tab Links
    const tabSelect4 = document.getElementById('tabSelect4'); // Dropdown con ID 'tabSelect4'
    const tabs = document.querySelectorAll('.w-tab-link'); // Tutti i Tab Links con classe 'w-tab-link'

    // Nascondi i Tab Links (opzionale)
    tabs.forEach(tab => tab.style.display = 'none');

    // Aggiungi il listener per il cambiamento del dropdown
    tabSelect4.addEventListener('change', function () {
      const selectedValue = tabSelect4.value; // Ottieni il valore selezionato dal dropdown (tab6, tab7)
      
      // Trova il Tab Link corrispondente
      const targetTab = Array.from(tabs).find(tab => tab.id === selectedValue);

      if (targetTab) {
        targetTab.click(); // Simula il click sul Tab Link corrispondente
      }
    });
  });
