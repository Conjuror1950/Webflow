// Aggiunge il contenuto solo se non esiste già
if (!document.getElementById('customSearchContainer')) {

  // Crea un div contenitore unico
  const container = document.createElement('div');
  container.id = 'customSearchContainer';
  container.style.textAlign = 'center';
  container.style.padding = '50px 50px';
  container.style.fontFamily = "'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif";
  container.style.color = '#000000';

  // Aggiungi l'HTML
  container.innerHTML = `
    <h1 id="customSearchTitle" style="...">Impossibile trovare la pagina che stai cercando.</h1>
    <div style="margin-bottom: 40px; position: relative; display: flex; flex-direction: column; align-items: center;">
      <form id="searchForm" style="...">
        <div style="position: relative; width: 100%;">
          <label for="searchInput" id="searchLabel" style="...">Cerca nel supporto</label>
          <input type="text" id="searchInput" style="...">
        </div>
        <button type="submit" style="...">Cerca</button>
      </form>
      <a href="https://support-andreaingrassia.webflow.io/sitemap" style="...">Oppure consulta la mappa del sito ></a>
    </div>
  `;

  document.body.appendChild(container);

  // --- INIZIO: mappa URL ---
  const urlMap = {
    "home": "/",
    "biografia": "/person/andrea-ingrassia",
    "bio": "/person/andrea-ingrassia",
    "su di me": "/person/andrea-ingrassia",
    "chi sono": "/person/andrea-ingrassia",
    "show": "/show/produzioni-cinematografiche",
    "produzioni": "/show/produzioni-cinematografiche",
    // ... tutto il resto delle parole chiave
  };
  // --- FINE: mappa URL ---

  // Funzioni input e label
  function handleFocus(isFocused) { ... }

  function checkInput() { ... }

  // Funzione per gestire la ricerca
  function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.trim().toLowerCase();

    if (urlMap[query]) {
      window.location.href = `https://support-andreaingrassia.webflow.io${urlMap[query]}`;
    } else {
      alert("Purtroppo non abbiamo trovato risultati. Fai una nuova ricerca.");
    }
  }

  // Event listener
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  searchForm.addEventListener('submit', handleSearch);
  searchInput.addEventListener('focus', () => handleFocus(true));
  searchInput.addEventListener('blur', () => handleFocus(false));
  searchInput.addEventListener('input', checkInput);

  // Applica stili responsive all'avvio e al resize
  applyResponsiveStyles();
  window.addEventListener('resize', applyResponsiveStyles);
}
