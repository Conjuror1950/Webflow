<div class="apple-search-container">
  <div class="apple-search-box">
    <svg class="apple-search-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="white" stroke-width="1.5" fill="none"></circle>
      <line x1="15" y1="15" x2="20" y2="20" stroke="white" stroke-width="1.5"></line>
    </svg>
    <input type="text" class="apple-search-input" placeholder="Cerca su andreaingrassia.webflow.io" />
  </div>
  <div class="apple-search-results">
    <p class="results-title">Link rapidi</p>
    <ul class="results-list">
      <li><a href="/it/home">➜ Home</a></li>
      <li><a href="/it/portfolio">➜ Portfolio</a></li>
      <li><a href="/it/servizi">➜ Servizi</a></li>
      <li><a href="/it-it/contatti#social">➜ Social</a></li>
      <li><a href="/it-it/contatti">➜ Contatti</a></li>
      <li><a href="/it/informazioni/aggiornamenti">➜ Informazioni</a></li>
    </ul>
    <p class="no-results" style="display: none;">Nessun risultato trovato.</p>
  </div>
</div>

<style>
  @font-face {
    font-family: "SF Pro Display";
    src: url("https://cdn.apple.com/sf-pro/SF-Pro-Display-Regular.woff2") format("woff2");
  }

  body {
    background-color: #121212;
    font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .apple-search-container {
    max-width: 480px;
    margin: 20px auto;
    color: #f5f5f7;
    position: relative;
  }

  .apple-search-box {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    padding: 12px 0;
    transition: border-color 0.3s;
  }

  .apple-search-box:focus-within {
    border-color: white;
  }

  .apple-search-icon {
    margin-right: 10px;
    opacity: 0.8;
    cursor: pointer;
    transition: opacity 0.3s;
  }

  .apple-search-input {
    flex-grow: 1;
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
  }

  .results-list a {
    display: block;
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
</style>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".apple-search-input");
    const searchResults = document.querySelector(".apple-search-results");
    const noResultsMessage = document.querySelector(".no-results");
    const searchIcon = document.querySelector(".apple-search-icon");

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
      "form": "/it-it/contatti#modulo",
      "social": "/it-it/contatti#social",
      "contatti": "/it-it/contatti",
      "informazioni": "/it/informazioni/aggiornamenti",
    };

    function performSearch(event) {
      const query = searchInput.value.toLowerCase().trim();
      searchResults.style.display = query ? "block" : "none";
      noResultsMessage.style.display = urlMap[query] ? "none" : "block";
      
      if (urlMap[query] && event.key === "Enter") {
        window.location.href = urlMap[query];
      }
    }

    searchInput.addEventListener("input", performSearch);
    searchInput.addEventListener("keydown", (e) => e.key === "Enter" && performSearch(e));
    searchInput.addEventListener("blur", () => setTimeout(() => searchResults.style.display = "none", 200));
    searchIcon.addEventListener("click", performSearch);
  });
</script>
