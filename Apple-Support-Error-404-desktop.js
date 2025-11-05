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
    <h1 id="customSearchTitle" style="
      font-size: 48px; 
      font-weight: 600; 
      color: rgba(29, 29, 29, 0.92); 
      line-height: 1.1; 
      margin: 0 auto 50px auto; 
      font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      text-align: center;
      max-width: 650px;
      word-wrap: break-word;
    ">
      Impossibile trovare la pagina che stai cercando.
    </h1>

    <div style="margin-bottom: 40px; position: relative; display: flex; flex-direction: column; align-items: center;">
      <form id="searchForm" style="display: flex; justify-content: center; align-items: center; gap: 10px; width: 100%; max-width: 500px;">
        <div style="position: relative; width: 100%;">
          <label 
            for="searchInput" 
            id="searchLabel" 
            style="position: absolute; top: 50%; left: 15px; transform: translateY(-50%); font-size: 17px; font-weight: 400; color: #86868b; transition: 0.2s ease; font-family: inherit; pointer-events: none;">
            Cerca nel supporto
          </label>
          <input 
            type="text" 
            id="searchInput" 
            style="padding: 15px; font-size: 16px; border: 1px solid #ccc; border-radius: 12px; width: 100%; outline: none; font-family: inherit; transition: 0.2s ease;"
          >
        </div>
        <button 
          type="submit" 
          style="padding: 10px 20px; font-size: 16px; color: white; background-color: #0267cc; border: none; border-radius: 8px; cursor: pointer; font-family: inherit;">
          Cerca
        </button>
      </form>

      <a href="https://support-andreaingrassia.webflow.io/sitemap" 
        style="font-size: 17px; font-weight: 400; color: #0267cc; text-decoration: none; margin-top: 25px; font-family: inherit; transition: all 0.2s ease; text-align: center;"
        onmouseover="this.style.textDecoration='underline'"
        onmouseout="this.style.textDecoration='none'">
        Oppure consulta la mappa del sito >
      </a>
    </div>
  `;

  document.body.appendChild(container);

  // Funzione per applicare stili responsive
  function applyResponsiveStyles() {
    const title = document.getElementById('customSearchTitle');
    const width = window.innerWidth;

    if (width < 480) {
      // Mobile piccolo
      title.style.fontSize = '32px';
      title.style.marginBottom = '30px';
    } else if (width < 768) {
      // Mobile landscape / tablet piccolo
      title.style.fontSize = '40px';
      title.style.marginBottom = '40px';
    } else {
      // Desktop
      title.style.fontSize = '48px';
      title.style.marginBottom = '50px';
    }
  }

  // Funzioni input e label
  function handleFocus(isFocused) {
    const searchInput = document.getElementById('searchInput');
    const searchLabel = document.getElementById('searchLabel');

    if (isFocused || searchInput.value.trim() !== '') {
      searchLabel.style.top = '10px';
      searchLabel.style.fontSize = '12px';
      searchInput.style.borderColor = '#0267cc';
    } else {
      searchLabel.style.top = '50%';
      searchLabel.style.fontSize = '16px';
      searchInput.style.borderColor = '#ccc';
    }
  }

  function checkInput() {
    const searchInput = document.getElementById('searchInput');
    const isFocused = document.activeElement === searchInput;
    handleFocus(isFocused);
  }

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
