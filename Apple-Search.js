// Definizione del contenuto HTML
const appleSearchHTML = `
<div class="apple-search-container">
  <div class="apple-search-box">
    <!-- Icona Apple Search cliccabile -->
    <svg class="apple-search-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="white" stroke-width="1.5" fill="none"></circle>
      <line x1="15" y1="15" x2="20" y2="20" stroke="white" stroke-width="1.5"></line>
    </svg>
    <input type="text" class="apple-search-input" placeholder="Cerca su andreaingrassia.webflow.io" />
    <svg class="apple-search-clear" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" stroke="white" stroke-width="2"></line>
      <line x1="6" y1="18" x2="18" y2="6" stroke="white" stroke-width="2"></line>
    </svg>
  </div>
  <div class="apple-search-results">
    <p class="results-title" id="link-rapidi-title">Link rapidi</p>
    <ul class="results-list">
      <li><a href="/#faq">➜ FAQ</a></li>
      <li><a href="/contatti#modulo">➜ Modulo Contatti</a></li>
      <li><a href="/person/andrea-ingrassia">➜ Su Di Me</a></li>
      <li><a href="/portfolio#galleria">➜ Esplora</a></li>
      <li><a href="/servizi#attrezzatura">➜ Attrezzatura</a></li>
      <li><a href="/informazioni/aggiornamenti">➜ Novità</a></li>
    </ul>
    <p class="results-title" id="suggestions-title" style="display: none;">Ricerche suggerite</p>
    <ul class="suggestions-list">
      <!-- I suggerimenti verranno popolati dinamicamente tramite JS -->
    </ul>
    <p class="no-results" style="display: none;">Nessun risultato trovato.</p>
  </div>
</div>
`;

// Aggiunta dell'HTML al body
document.body.insertAdjacentHTML('beforeend', appleSearchHTML);

// Definizione del CSS
const appleSearchCSS = `
  /* Font SF Pro */
  @font-face {
    font-family: "SF Pro Display";  !important;
    src: url("https://cdn.apple.com/sf-pro/SF-Pro-Display-Regular.woff2") format("woff2");
  }

  body {
    width: auto;
    color: black;
    font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif; !important;
  }

.apple-search-container {
    width: 100%;
    max-width: auto;
    margin: 10px auto;
    color: black;
    position: relative;
    background-color: black; /* Imposta lo sfondo nero */
    padding: 10px;
}

.apple-search-box {
    max-width: 1162px;
    margin-left: 412px;
    display: flex;
    align-items: center;
    padding: 20px 0;
    transition: border-color 0.3s ease;
    background: transparent; /* Rendi il contenitore trasparente */
}

  .apple-search-box:focus-within {
    border-color: white;
  }

  .apple-search-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    opacity: 0.8;
    transition: opacity 0.3s ease;
    cursor: pointer;
  }

  .apple-search-input {
    width: 100%;
    background: transparent;
    border: none;
    color: white;
    font-size: 24px;
    color: #e8e8ed;
    outline: none;
  }

  .apple-search-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .apple-search-results {
    max-width: 1160px;
    display: none;
    background: transparent;
    padding: 10px;
    margin-left: 402px;
    border-radius: 10px;
    margin-top: 8px;
    backdrop-filter: blur(10px);
    animation: fadeIn 0.3s ease-in-out;
  }

  .results-title {
    font-size: 12px;
    color: #86868b;
    margin-bottom: 6px;
  }

  .results-list {
    list-style: none;
    color: #fff;
    padding: 0;
    margin: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .results-list li {
    margin: 5px 0;
  }

  .results-list a {
    text-decoration: none;
    color: white;
    font-size: 14px;
    opacity: 0.8;
    transition: opacity 0.3s;
  }

  .results-list a:hover {
    opacity: 1;
  }

  .no-results {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    margin-top: 8px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .suggestions-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .suggestions-list li {
    margin: 5px 0;
  }

  .suggestions-list a {
    text-decoration: none;
    color: white;
    font-size: 14px;
    opacity: 0.8;
    transition: opacity 0.3s;
  }

  .suggestions-list a:hover {
    opacity: 1;
  }

  .fade-in {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  .fade-out {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  
  .apple-search-clear {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease, opacity 0.3s ease;
  }

  .apple-search-clear svg {
    width: 10px;
    height: 10px;
    fill: white;
  }

  .apple-search-clear:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }

  .apple-search-box:focus-within .apple-search-clear {
    opacity: 1;
  }

  .apple-search-clear:active {
    opacity: 0.6;
  }
  
  .apple-search-results, 
.results-list a, 
.suggestions-list a, 
.no-results, 
.results-title {
    font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif !important;
}
`;

// Aggiunta del CSS al documento
const style = document.createElement('style');
style.innerHTML = appleSearchCSS;
document.head.appendChild(style);

// JavaScript per la gestione della ricerca
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".apple-search-input");
  const searchResults = document.querySelector(".apple-search-results");
  const suggestionsList = document.querySelector(".suggestions-list");
  const suggestionsTitle = document.querySelector("#suggestions-title");
  const noResultsMessage = document.querySelector(".no-results");
  const searchIcon = document.querySelector(".apple-search-icon");
  const resultsList = document.querySelector(".results-list");
  const linkRapidiTitle = document.querySelector("#link-rapidi-title");
  const clearButton = document.querySelector(".apple-search-clear");

// Mostrare i Link rapidi all'avvio
function showQuickLinks() {
  linkRapidiTitle.style.display = "block";
  resultsList.style.display = "block";
  searchResults.style.display = "block";
  triggerFadeIn(linkRapidiTitle);
  triggerFadeIn(resultsList);
}

showQuickLinks(); // Mostra subito i link rapidi al caricamento della pagina

  const suggestions = [
    "home",
    "su di me",
    "andrea ingrassia",
    "faq",
    "domande frequenti",
    "portfolio",
    "esplora",
    "servizi",
    "attrezzatura",
    "cv",
    "curriculum",
    "modulo contatti",
    "form",
    "social",
    "contatti",
    "novità",
    "aggiornamenti",
    "produzioni cinematografiche",
    "album fotografici",
    "collezione halloween",
    "volume ambienti urbani",
    "volume paesaggi naturali",
    "volume interni e scenari"
  ];

  const urlMap = {
    "home": "/",
    "su di me": "/person/andrea-ingrassia",
    "me": "/person/andrea-ingrassia",
    "andrea ingrassia": "/person/andrea-ingrassia",
    "andrea": "/person/andrea-ingrassia",
    "chi sono": "/person/andrea-ingrassia",
    "biografia": "/person/andrea-ingrassia",
    "bio": "/person/andrea-ingrassia",
    "faq": "/#faq",
    "domande frequenti": "/#faq",
    "domande": "/#faq",
    "portfolio": "/portfolio",
    "esplora": "/portfolio#galleria",
    "galleria": "/portfolio#galleria",
    "servizi": "/servizi",
    "attrezzatura": "/servizi#attrezzatura",
    "cv": "/servizi#cv",
    "curriculum": "/servizi#cv",
    "modulo": "/contatti#modulo",
    "modulo contatti": "/contatti#modulo",
    "form": "/contatti#modulo",
    "social": "/contatti#social",
    "contatti": "/contatti",
    "novità": "/informazioni/aggiornamenti",
    "aggiornamenti": "/informazioni/aggiornamenti",
    "novità sugli aggiornamenti": "/informazioni/aggiornamenti",
    "informazioni sugli aggiornamenti": "/informazioni/aggiornamenti",
    "produzioni cinematografiche": "/show/produzioni-cinematografiche",
    "produzioni": "/show/produzioni-cinematografiche",
    "cinema": "/show/produzioni-cinematografiche",
    "video": "/show/produzioni-cinematografiche",
    "video cinematografici": "/show/produzioni-cinematografiche",
    "album fotografici": "/room/album-fotografici",
    "album": "/room/album-fotografici",
    "fotografie": "/room/album-fotografici",
    "foto": "/room/album-fotografici",
    "eventi": "/room/album-fotografici",
    "raccolte": "/room/album-fotografici",
    "halloween": "/room/album-fotografici/collezione-1/halloween",
    "foto halloween": "/room/album-fotografici/collezione-1/halloween",
    "collezione halloween": "/room/album-fotografici/collezione-1/halloween",
    "fotografie di halloween": "/room/album-fotografici/collezione-1/halloween",
    "foto di halloween": "/room/album-fotografici/collezione-1/halloween",
    "foto di città": "/room/album-fotografici/volume-1/ambienti-urbani",
    "città": "/room/album-fotografici/volume-1/ambienti-urbani",
    "fotografie di città": "/room/album-fotografici/volume-1/ambienti-urbani",
    "ambienti urbani": "/room/album-fotografici/volume-1/ambienti-urbani",
    "volume ambienti urbani": "/room/album-fotografici/volume-1/ambienti-urbani",
    "foto di paesaggi": "/room/album-fotografici/volume-2/paesaggi-naturali",
    "foto di natura": "/room/album-fotografici/volume-2/paesaggi-naturali",
    "fotografie di natura": "/room/album-fotografici/volume-2/paesaggi-naturali",
    "natura": "/room/album-fotografici/volume-2/paesaggi-naturali",
    "foto paesaggi": "/room/album-fotografici/volume-2/paesaggi-naturali",
    "fotografie di paesaggi": "/room/album-fotografici/volume-2/paesaggi-naturali",
    "fotografie paesaggi": "/room/album-fotografici/volume-2/paesaggi-naturali",
    "volume paesaggi": "/room/album-fotografici/volume-2/paesaggi-naturali",
    "paesaggi naturali": "/room/album-fotografici/volume-2/paesaggi-naturali",
    "foto interni": "/room/album-fotografici/volume-3/interni-e-scenari",
    "foto interni e scenari": "/room/album-fotografici/volume-3/interni-e-scenari",
    "foto di interni": "/room/album-fotografici/volume-3/interni-e-scenari",
    "interni": "/room/album-fotografici/volume-3/interni-e-scenari",
    "fotografie di interni": "/room/album-fotografici/volume-3/interni-e-scenari",
    "volume interni": "/room/album-fotografici/volume-3/interni-e-scenari",
    "volume interni e scenari": "/room/album-fotografici/volume-3/interni-e-scenari"
  };

  function triggerFadeIn(element) {
    element.classList.remove("fade-in");
    void element.offsetWidth; // Forza il reflow
    element.classList.add("fade-in");
  }

  function showSuggestions(query) {
    suggestionsList.innerHTML = ""; 
    if (query) {
      const filteredSuggestions = suggestions.filter(suggestion => 
        suggestion.includes(query.toLowerCase())
      );
      if (filteredSuggestions.length > 0) {
        suggestionsTitle.style.display = "block";
        filteredSuggestions.forEach(suggestion => {
          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.href = urlMap[suggestion];
          link.textContent = `➜ ${suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}`;
          listItem.appendChild(link);
          suggestionsList.appendChild(listItem);
        });
      } else {
        suggestionsTitle.style.display = "none"; 
      }
    }
  }

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();

    if (query === "") {
      linkRapidiTitle.style.display = "block";
      resultsList.style.display = "block";
      triggerFadeIn(linkRapidiTitle);
      triggerFadeIn(resultsList);
    } else {
      linkRapidiTitle.style.display = "none";
      resultsList.style.display = "none";
    }

    showSuggestions(query);
    searchResults.style.display = query.length > 0 ? "block" : "none";

    const suggestionsCount = suggestionsList.querySelectorAll("li").length;
    noResultsMessage.style.display = suggestionsCount === 0 ? "block" : "none";
  }

  // Evento input per aggiornare risultati e animazioni
  searchInput.addEventListener("input", function() {
  performSearch();
  clearButton.style.opacity = searchInput.value.length > 0 ? "0.6" : "0";

  if (searchInput.value.trim() === "") {
    showQuickLinks(); // Mostra i link rapidi se il campo è vuoto
  }
});

  // Evento focus per ripristinare link rapidi se l'input è vuoto
  searchInput.addEventListener("focus", function() {
  showQuickLinks(); // Mostra i link rapidi anche quando si clicca sul campo di ricerca
});
  
   // Funzione Focus
   searchInput.focus();

  // Evento click sulla X per cancellare l'input e ripristinare link rapidi
  clearButton.addEventListener("click", function() {
  searchInput.value = "";
  clearButton.style.opacity = "0";
  searchInput.focus();
  performSearch();
  showQuickLinks(); // Mostra i link rapidi dopo aver cancellato il testo
});

// Evento pressione tasto Invio per navigare
searchInput.addEventListener("keydown", function (e) {
    const query = searchInput.value.toLowerCase().trim(); // Converti in minuscolo
    if (e.key === "Enter" && urlMap[query]) {
        window.location.href = urlMap[query];
    }
});

// Evento click sull'icona per avviare la ricerca e navigare
searchIcon.addEventListener("click", function() {
    const query = searchInput.value.toLowerCase().trim(); // Converti in minuscolo
    if (urlMap[query]) {
        window.location.href = urlMap[query];
    }
});
});
