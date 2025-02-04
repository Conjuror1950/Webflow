document.addEventListener("DOMContentLoaded", function () {
  // Aggiungi HTML
  const searchContainer = document.createElement("div");
  searchContainer.classList.add("apple-search-container");

  const searchBox = document.createElement("div");
  searchBox.classList.add("apple-search-box");

  const searchIcon = document.createElement("svg");
  searchIcon.classList.add("apple-search-icon");
  searchIcon.setAttribute("viewBox", "0 0 24 24");
  searchIcon.setAttribute("width", "20");
  searchIcon.setAttribute("height", "20");
  searchIcon.setAttribute("aria-hidden", "true");

  searchIcon.innerHTML = `<circle cx="10" cy="10" r="7" stroke="white" stroke-width="1.5" fill="none"></circle>
  <line x1="15" y1="15" x2="20" y2="20" stroke="white" stroke-width="1.5"></line>`;

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.classList.add("apple-search-input");
  searchInput.setAttribute("placeholder", "Cerca su andreaingrassia.webflow.io");

  const clearButton = document.createElement("svg");
  clearButton.classList.add("apple-search-clear");
  clearButton.setAttribute("viewBox", "0 0 24 24");
  clearButton.setAttribute("width", "16");
  clearButton.setAttribute("height", "16");
  clearButton.setAttribute("aria-hidden", "true");

  clearButton.innerHTML = `<line x1="6" y1="6" x2="18" y2="18" stroke="white" stroke-width="2"></line>
  <line x1="6" y1="18" x2="18" y2="6" stroke="white" stroke-width="2"></line>`;

  const searchResults = document.createElement("div");
  searchResults.classList.add("apple-search-results");

  const resultsTitle = document.createElement("p");
  resultsTitle.classList.add("results-title");
  resultsTitle.setAttribute("id", "link-rapidi-title");
  resultsTitle.textContent = "Link rapidi";

  const resultsList = document.createElement("ul");
  resultsList.classList.add("results-list");

  const quickLinks = [
    { name: "FAQ", href: "/#faq" },
    { name: "Modulo Contatti", href: "/contatti#modulo" },
    { name: "Biografia", href: "/#bio" },
    { name: "Galleria", href: "/portfolio#galleria" },
    { name: "Attrezzatura", href: "/servizi#attrezzatura" },
    { name: "Aggiornamenti", href: "/informazioni/aggiornamenti" }
  ];

  quickLinks.forEach(link => {
    const listItem = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = `➜ ${link.name}`;
    listItem.appendChild(anchor);
    resultsList.appendChild(listItem);
  });

  const suggestionsTitle = document.createElement("p");
  suggestionsTitle.classList.add("results-title");
  suggestionsTitle.setAttribute("id", "suggestions-title");
  suggestionsTitle.style.display = "none";
  suggestionsTitle.textContent = "Suggerimenti";

  const suggestionsList = document.createElement("ul");
  suggestionsList.classList.add("suggestions-list");

  const noResultsMessage = document.createElement("p");
  noResultsMessage.classList.add("no-results");
  noResultsMessage.style.display = "none";
  noResultsMessage.textContent = "Nessun risultato trovato.";

  searchResults.appendChild(resultsTitle);
  searchResults.appendChild(resultsList);
  searchResults.appendChild(suggestionsTitle);
  searchResults.appendChild(suggestionsList);
  searchResults.appendChild(noResultsMessage);

  searchBox.appendChild(searchIcon);
  searchBox.appendChild(searchInput);
  searchBox.appendChild(clearButton);

  searchContainer.appendChild(searchBox);
  searchContainer.appendChild(searchResults);

  document.body.appendChild(searchContainer);

  // CSS iniettato come stile
  const style = document.createElement("style");
  style.textContent = `
  /* Font SF Pro */
  @font-face {
    font-family: "SF Pro Display";
    src: url("https://cdn.apple.com/sf-pro/SF-Pro-Display-Regular.woff2") format("woff2");
  }

  body {
    background-color: transparent;
    font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .apple-search-container {
    width: 100%;
    max-width: 480px;
    margin: 20px auto;
    color: #f5f5f7;
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

  .apple-search-icon {
    width: 20px;
    height: 20px;
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
    font-size: 16px;
    outline: none;
  }

  .apple-search-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .apple-search-results {
    display: none;
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    border-radius: 10px;
    margin-top: 8px;
    backdrop-filter: blur(10px);
    animation: fadeIn 0.3s ease-in-out;
  }

  .results-title {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 6px;
  }

  .results-list {
    list-style: none;
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
  `;
  document.head.appendChild(style);

  // Funzionalità JavaScript
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
    void element.offsetWidth;
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
      resultsTitle.style.display = "block";
      resultsList.style.display = "block";
      triggerFadeIn(resultsTitle);
      triggerFadeIn(resultsList);
    } else {
      resultsTitle.style.display = "none";
      resultsList.style.display = "none";
    }

    showSuggestions(query);
    searchResults.style.display = query.length > 0 ? "block" : "none";

    const suggestionsCount = suggestionsList.querySelectorAll("li").length;
    noResultsMessage.style.display = suggestionsCount === 0 ? "block" : "none";
  }

  searchInput.addEventListener("input", function () {
    performSearch();
    clearButton.style.opacity = searchInput.value.length > 0 ? "0.6" : "0";
  });

  clearButton.addEventListener("click", function () {
    searchInput.value = "";
    clearButton.style.opacity = "0";
    searchInput.focus();
    performSearch();
  });

  searchInput.addEventListener("focus", function () {
    resultsTitle.style.display = "block";
    resultsList.style.display = "block";
    triggerFadeIn(resultsTitle);
    triggerFadeIn(resultsList);
  });

  searchInput.focus();
});
