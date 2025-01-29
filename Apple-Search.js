  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".apple-search-input");
    const searchResults = document.querySelector(".apple-search-results");
    const resultsList = document.querySelectorAll(".results-list li");
    const noResultsMessage = document.querySelector(".no-results");
    const searchIcon = document.querySelector(".apple-search-icon");
    
        // Mappatura delle ricerche -> URL di destinazione
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
      "informazioni": "/it/informazioni/aggiornamenti",
      "aggiornamenti": "/it/informazioni/aggiornamenti",
    };
    
    // Funzione per eseguire la ricerca
    function performSearch() {
      const query = searchInput.value.toLowerCase().trim();
      let found = false;

      resultsList.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = "block";
          found = true;
        } else {
          item.style.display = "none";
        }
      });

      noResultsMessage.style.display = found ? "none" : "block";
      searchResults.style.display = query.length > 0 ? "block" : "none";

      // Reindirizzamento alla corrispondenza esatta
      if (urlMap[query] && (event.key === "Enter" || event.type === "click")) {
        window.location.href = urlMap[query];
      }
    }

    // Eventi per mostrare e filtrare i risultati in tempo reale
    searchInput.addEventListener("input", performSearch);

    // Eventi per nascondere i risultati
    searchInput.addEventListener("blur", () => {
      setTimeout(() => {
        searchResults.style.display = "none";
      }, 200);
    });

    // Eventi per mostrare i risultati
    searchInput.addEventListener("focus", () => {
      searchResults.style.display = "block";
    });

    searchInput.addEventListener("blur", () => {
      setTimeout(() => {
        searchResults.style.display = "none";
      }, 200);
    });

    // Attiva la ricerca premendo INVIO
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault(); // Evita il comportamento predefinito
        performSearch();
      }
    });

    // Attiva la ricerca cliccando sull'icona della lente
    searchIcon.addEventListener("click", performSearch);
  });
