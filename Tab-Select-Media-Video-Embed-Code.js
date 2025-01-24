document.addEventListener('DOMContentLoaded', function () {
    console.log("✅ DOM caricato, avvio script...");

    // Attendi che il dropdown e i tab siano presenti
    function waitForElements() {
        const tabSelect = document.getElementById('tabSelect');
        const tabs = document.querySelectorAll('.w-tab-link');

        if (tabSelect && tabs.length > 0) {
            console.log("✅ Dropdown e tab trovati!");

            // Nascondi i Tab Links (opzionale)
            tabs.forEach(tab => tab.style.display = 'none');

            // Aggiungi l'evento di cambio al dropdown
            tabSelect.addEventListener('change', function () {
                const selectedValue = tabSelect.value; // Ottieni il valore selezionato
                console.log("🔄 Selezionato:", selectedValue);

                // Trova il Tab Link corrispondente
                const targetTab = Array.from(tabs).find(tab => tab.id === selectedValue);

                if (targetTab) {
                    console.log("✅ Cliccando su:", targetTab.id);
                    targetTab.click(); // Simula il click sul tab
                } else {
                    console.log("⚠️ Nessun tab corrispondente trovato!");
                }
            });

        } else {
            console.log("⏳ Elementi non ancora disponibili, riprovo...");
            setTimeout(waitForElements, 500); // Riprova dopo 500ms
        }
    }

    waitForElements();
});

