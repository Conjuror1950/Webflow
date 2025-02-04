// Aspetta che la pagina sia completamente caricata
document.addEventListener("DOMContentLoaded", function () {
  
  // Trova il div target in cui inserire la barra di ricerca
  const searchTarget = document.getElementById("apple-search-target");

  // Se il div target esiste, inserisci l'HTML della ricerca al suo interno
  if (searchTarget) {
    searchTarget.innerHTML = `
      <div class="apple-search-container">
        <div class="apple-search-box">
          <!-- Icona Apple Search -->
          <svg class="apple-search-icon" viewBox="0 0 24 24" width="20" height="20">
            <circle cx="10" cy="10" r="7" stroke="white" stroke-width="1.5" fill="none"></circle>
            <line x1="15" y1="15" x2="20" y2="20" stroke="white" stroke-width="1.5"></line>
          </svg>
          <input type="text" class="apple-search-input" placeholder="Cerca su andreaingrassia.webflow.io" />
          <svg class="apple-search-clear" viewBox="0 0 24 24" width="16" height="16">
            <line x1="6" y1="6" x2="18" y2="18" stroke="white" stroke-width="2"></line>
            <line x1="6" y1="18" x2="18" y2="6" stroke="white" stroke-width="2"></line>
          </svg>
        </div>
        <div class="apple-search-results">
          <p class="results-title" id="link-rapidi-title">Link rapidi</p>
          <ul class="results-list">
            <li><a href="/#faq">➜ FAQ</a></li>
            <li><a href="/contatti#modulo">➜ Modulo Contatti</a></li>
            <li><a href="/#bio">➜ Biografia</a></li>
            <li><a href="/portfolio#galleria">➜ Galleria</a></li>
            <li><a href="/servizi#attrezzatura">➜ Attrezzatura</a></li>
            <li><a href="/informazioni/aggiornamenti">➜ Aggiornamenti</a></li>
          </ul>
          <p class="results-title" id="suggestions-title" style="display: none;">Suggerimenti</p>
          <ul class="suggestions-list"></ul>
          <p class="no-results" style="display: none;">Nessun risultato trovato.</p>
        </div>
      </div>
    `;
  } else {
    console.error("❌ ERRORE: Il div #apple-search-target non è stato trovato!");
  }

  // Aggiunta del CSS
  const appleSearchCSS = `
    /* Font SF Pro */
    @font-face {
      font-family: "SF Pro Display";
      src: url("https://cdn.apple.com/sf-pro/SF-Pro-Display-Regular.woff2") format("woff2");
    }

    .apple-search-container {
      width: 100%;
      max-width: 480px;
      margin: 20px auto;
      color: black;
      position: relative;
    }

    .apple-search-box {
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      padding: 20px 0;
      transition: border-color 0.3s ease;
    }

    .apple-search-box:focus-within {
      border-color: white;
    }

    .apple-search-input {
      width: 100%;
      background: transparent;
      border: none;
      color: white;
      font-size: 16px;
      outline: none;
    }

    .apple-search-results {
      display: none;
      background: rgba(255, 255, 255, 0.1);
      padding: 10px;
      border-radius: 10px;
      margin-top: 8px;
      backdrop-filter: blur(10px);
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
  `;

  // Aggiunge lo stile alla pagina
  const style = document.createElement("style");
  style.innerHTML = appleSearchCSS;
  document.head.appendChild(style);

  // JavaScript per la gestione della ricerca
  const searchInput = document.querySelector(".apple-search-input");
  const searchResults = document.querySelector(".apple-search-results");

  searchInput.addEventListener("input", function () {
    searchResults.style.display = searchInput.value ? "block" : "none";
  });

  // Mostrare i link rapidi all'avvio
  searchResults.style.display = "block";

});

showQuickLinks(); // Mostra subito i link rapidi al caricamento della pagina

  const suggestions = [
    "home",
    "biografia",
    "faq",
    "portfolio",
    "galleria",
    "servizi",
    "attrezzatura",
    "cv",
    "curriculum",
    "modulo",
    "social",
    "contatti",
    "informazioni sugli aggiornamenti"
  ];

  const urlMap = {
    "home": "/",
    "biografia": "/#bio",
    "faq": "/#faq",
    "portfolio": "/portfolio",
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
    "informazioni sugli aggiornamenti": "/informazioni/aggiornamenti"
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
