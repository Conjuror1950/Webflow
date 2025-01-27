// Mappa delle parole chiave ai relativi URL
const urlMap = {
  "home": "/it/home",
  "portfolio": "/it/portfolio",
  "servizi": "/it/servizi",
  "social": "/it-it/contatti#social",
  "contatti": "/it-it/contatti",
  "informazioni": "/it/informazioni/aggiornamenti",
  "aggiornamenti": "/it/informazioni/aggiornamenti",
  // Aggiungi altre parole chiave e URL qui
};

// Funzione per gestire la ricerca
function handleSearch(event) {
  event.preventDefault(); // Impedisce il comportamento predefinito del form
  const query = document.getElementById('searchInput').value.trim().toLowerCase(); // Ottieni e normalizza l'input

  if (urlMap[query]) {
    // Reindirizza all'URL corrispondente
    window.location.href = `https://andreaingrassia.webflow.io${urlMap[query]}`;
  } else {
    // Se la parola chiave non è trovata, mostra un avviso
    alert("Purtroppo non abbiamo trovato risultati. Fai una nuova ricerca.");
  }
}

// Gestione del focus e della label animata
function handleFocus(isFocused) {
  const searchInput = document.getElementById('searchInput');
  const searchLabel = document.getElementById('searchLabel');

  if (isFocused || searchInput.value.trim() !== '') {
    searchLabel.style.top = '10px';
    searchLabel.style.fontSize = '12px';
  } else {
    searchLabel.style.top = '50%';
    searchLabel.style.fontSize = '16px';
  }
  searchInput.style.borderColor = isFocused ? '#0070c9' : '#ccc';
}

function checkInput() {
  const searchInput = document.getElementById('searchInput');
  const searchLabel = document.getElementById('searchLabel');

  if (searchInput.value.trim() !== '') {
    searchLabel.style.top = '10px';
    searchLabel.style.fontSize = '12px';
  } else {
    searchLabel.style.top = '50%';
    searchLabel.style.fontSize = '16px';
  }
}

// Aggiunge gli event listener quando la pagina viene caricata
document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  // Aggiungi listener per il clic del pulsante e il tasto Invio
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }

  // Aggiungi listener per la gestione del focus e degli input
  if (searchInput) {
    searchInput.addEventListener('focus', () => handleFocus(true));
    searchInput.addEventListener('blur', () => handleFocus(false));
    searchInput.addEventListener('input', checkInput);
  }
});
