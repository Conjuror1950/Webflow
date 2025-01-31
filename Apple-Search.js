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
    "home": "/it/home",
    "biografia": "/it/home#bio",
    "faq": "/it/home#faq",
    "portfolio": "/it/portfolio",
    "galleria": "/it/portfolio#galleria",
    "servizi": "/it/servizi",
    "attrezzatura": "/it/servizi#attrezzatura",
    "cv": "/it/servizi#cv",
    "curriculum": "/it/servizi#cv",
    "modulo": "/it-it/contatti#modulo",
    "modulo contatti": "/it-it/contatti#modulo",
    "form": "/it-it/contatti#modulo",
    "social": "/it-it/contatti#social",
    "contatti": "/it-it/contatti",
    "informazioni sugli aggiornamenti": "/it/informazioni/aggiornamenti"
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
    if (e.key === "Enter" && urlMap[searchInput.value]) {
      window.location.href = urlMap[searchInput.value];
    }
  });

  // Evento click sull'icona per avviare la ricerca
  searchIcon.addEventListener("click", function() {
    performSearch();
  });
});
