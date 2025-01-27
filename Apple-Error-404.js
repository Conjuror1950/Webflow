// Crea un div che contiene tutto il contenuto HTML
const container = document.createElement('div');
container.style.textAlign = 'center';
container.style.padding = '50px';
container.style.fontFamily = "'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif";
container.style.color = '#000000';

// Aggiungi l'HTML come contenuto del div
container.innerHTML = `
  <h1 style="font-size: 48px; font-weight: 600; line-height: 52px; margin-bottom: 20px; font-family: inherit;">Pagina non trovata</h1>
  <p style="font-size: 18px; line-height: 1.6; margin-bottom: 20px; font-family: inherit;">
  </p>

  <div style="margin-bottom: 40px; position: relative;">
    <form id="searchForm" style="display: flex; justify-content: center; align-items: center; gap: 10px;">
      <div style="position: relative; max-width: 400px; width: 100%;">
        <label 
          for="searchInput" 
          id="searchLabel" 
          style="position: absolute; top: 50%; left: 15px; transform: translateY(-50%); font-size: 16px; color: #86868b; transition: 0.2s ease; font-family: inherit; pointer-events: none;">
          Cerca su andreaingrassia.webflow.io
        </label>
        <input 
          type="text" 
          id="searchInput" 
          style="padding: 15px; font-size: 16px; border: 1px solid #ccc; border-radius: 8px; width: 100%; outline: none; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif; transition: 0.2s ease;"
        >
      </div>
      <button 
        type="submit" 
        style="padding: 10px 20px; font-size: 16px; color: white; background-color: #0070c9; border: none; border-radius: 8px; cursor: pointer; font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        Cerca
      </button>
    </form>
  </div>

  <a href="https://andreaingrassia.webflow.io/it/home" style="font-size: 17px; font-weight: 400; color: #0070c9; text-decoration: none; font-family: inherit; transition: all 0.2s ease;"
     onmouseover="this.style.textDecoration='underline'"
     onmouseout="this.style.textDecoration='none'">
    Oppure vai alla homepage
  </a>
`;

// Aggiungi il contenuto al body o a un altro elemento
document.body.appendChild(container);

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
