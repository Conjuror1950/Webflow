// Crea un div che contiene tutto il contenuto HTML
const container = document.createElement('div');
container.style.textAlign = 'center';
container.style.padding = '50px';
container.style.fontFamily = "'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif";
container.style.color = '#000000';

// Aggiungi l'HTML come contenuto del div
container.innerHTML = `
  <h1 style="font-size: 48px; font-weight: 600; line-height: 52px; margin-bottom: 20px; font-family: inherit;">Pagina non trovata.</h1>
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

  <a href="https://andreaingrassia.webflow.io/" style="font-size: 17px; font-weight: 400; color: #0070c9; text-decoration: none; font-family: inherit; transition: all 0.2s ease;"
     onmouseover="this.style.textDecoration='underline'"
     onmouseout="this.style.textDecoration='none'">
    Oppure vai alla homepage
  </a>
`;

// Aggiungi il contenuto al body o a un altro elemento
document.body.appendChild(container);

// Mappa delle parole chiave ai relativi URL
const urlMap = {
  "home": "/",
  "biografia": "/person/andrea-ingrassia",
  "bio": "/person/andrea-ingrassia",
  "su di me": "/person/andrea-ingrassia",
  "chi sono": "/person/andrea-ingrassia",
  "show": "/show/produzioni-cinematografiche",
  "produzioni": "/show/produzioni-cinematografiche",
  "produzioni cinematografiche": "/show/produzioni-cinematografiche",
  "cinema": "/show/produzioni-cinematografiche",
  "video": "/show/produzioni-cinematografiche",
  "room": "/room/album-fotografici",
  "album": "/room/album-fotografici",
  "album fotografici": "/room/album-fotografici",
  "album foto": "/room/album-fotografici",
  "foto": "/room/album-fotografici",
  "fotografia": "/room/album-fotografici",
  "fotografie": "/room/album-fotografici",
  "raccolte": "/room/album-fotografici",
  "eventi": "/room/album-fotografici",
  "faq": "/#faq",
  "portfolio": "/portfolio",
  "galleria": "/room/album-fotografici",
  "collezione 1": "/room/album-fotografici/collezione-1/halloween",
  "halloween": "/room/album-fotografici/collezione-1/halloween",
  "volume 2": "/room/album-fotografici/volume-2/paesaggi-naturali",
  "paesaggi naturali": "/room/album-fotografici/volume-2/paesaggi-naturali",
  "paesaggi": "/room/album-fotografici/volume-2/paesaggi-naturali",
  "natura": "/room/album-fotografici/volume-2/paesaggi-naturali",
  "foto natura": "/room/album-fotografici/volume-2/paesaggi-naturali",
  "volume 1": "/room/album-fotografici/volume-1/ambienti-urbani",
  "ambienti urbani": "/room/album-fotografici/volume-1/ambienti-urbani",
  "foto città": "/room/album-fotografici/volume-1/ambienti-urbani",
  "città": "/room/album-fotografici/volume-1/ambienti-urbani",
  "volume 3": "/room/album-fotografici/volume-3/interni-e-scenari",
  "interni e scenari": "/room/album-fotografici/volume-3/interni-e-scenari",
  "interni": "/room/album-fotografici/volume-3/interni-e-scenari",
  "foto interne": "/room/album-fotografici/volume-3/interni-e-scenari",
  "ristorante": "/room/album-fotografici/volume-3/interni-e-scenari",
  "foto ristorante": "/room/album-fotografici/volume-3/interni-e-scenari",
  "servizi": "/servizi",
  "attrezzatura": "/servizi#attrezzatura",
  "cv": "/servizi#cv",
  "curriculum": "/servizi#cv",
  "social": "/contatti#social",
  "modulo": "/contatti#modulo",
  "modulo contatti": "/contatti#modulo",
  "form": "/contatti#modulo",
  "contatti": "/contatti",
  "informazioni": "/informazioni/aggiornamenti",
  "informazioni sugli aggiornamenti": "/informazioni/aggiornamenti",
  "aggiornamenti": "/informazioni/aggiornamenti",
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
