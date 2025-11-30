// 1) Mappe e funzione Search (globali)
const urlMap = {
  "home": "/",
  "supporto": "/",
  "supporto andrea": "/",
  "supporto andrea ufficiale": "/",
  "support": "/",
  "contatti": "/contact",
  "contattami": "/contact",
  "contact": "/contact",
  "ottieni supporto": "/getsupport",
  "ottieni": "/getsupport",
  "contatta il supporto": "/getsupport",
  "contatta": "/getsupport",
  "get": "/getsupport",
  "getsupport": "/getsupport",
  "get support": "/getsupport",
  "chat": "/getsupport/solutions/chat",
  "chatta": "/getsupport/solutions/chat",
  "chatta con il supporto": "/getsupport/solutions/chat",
  "chat con il supporto": "/getsupport/solutions/chat",
  "chat supporto": "/getsupport/solutions/chat",
  "email": "/getsupport/solutions/email",
  "mail": "/getsupport/solutions/email",
  "scrivi": "/getsupport/solutions/email",
  "scrivi al supporto": "/getsupport/solutions/email",
  "invia mail al supporto": "/getsupport/solutions/email",
  "scrivi email": "/getsupport/solutions/email",
  "scrivi email al supporto": "/getsupport/solutions/email",
  "invia email": "/getsupport/solutions/email",
  "invia mail": "/getsupport/solutions/email",
  "invia email al supporto": "/getsupport/solutions/email",
  "invia": "/getsupport/solutions/email",
  "scelta del prodotto": "/getsupport/products/all",
  "scelta": "/getsupport/products/all",
  "prodotto": "/getsupport/products/all",
  "tutti i prodotti": "/getsupport/products/all",
  "products": "/getsupport/products/all",
  "all": "/getsupport/products/all",
  "topics supporto": "/getsupport/topics/supporto-andrea-ufficiale/overview",
  "topics supporto andrea": "/getsupport/topics/supporto-andrea-ufficiale/overview",
  "topics supporto andrea ufficiale": "/topics/solutions/supporto-andrea-ufficiale/overview",
  "argomenti supporto andrea": "/getsupport/topics/supporto-andrea-ufficiale/overview",
  "topics supporto andrea ufficiale": "/getsupport/topics/supporto-andrea-ufficiale/overview",
  "argomenti andrea": "/getsupport/topics/andrea-ingrassia/overview",
  "soluzioni ingrassia andrea": "/getsupport/topics/andrea-ingrassia/overview",
  "soluzioni andrea ingrassia": "/getsupport/topics/andrea-ingrassia/overview",
  "correzioni e modifiche": "/getsupport/solutions/help/andrea-ingrassia/requests/corrections",
  "correzioni e modifiche andrea ingrassia": "/getsupport/solutions/help/andrea-ingrassia/requests/corrections",
  "correzioni": "/getsupport/solutions/help/andrea-ingrassia/requests/corrections",
  "modifiche": "/getsupport/solutions/help/andrea-ingrassia/requests/corrections",
  "correzioni andrea": "/getsupport/solutions/help/andrea-ingrassia/requests/corrections",
  "modifiche andrea": "/getsupport/solutions/help/andrea-ingrassia/requests/corrections",
  "requests andrea": "/getsupport/solutions/help/andrea-ingrassia/requests/corrections",
  "corrections andrea": "/getsupport/solutions/help/andrea-ingrassia/requests/corrections",
  "requests": "/getsupport/solutions/help/andrea-ingrassia/requests/corrections",
  "corrections": "/getsupport/solutions/help/andrea-ingrassia/requests/corrections",
  "assistance andrea": "/getsupport/solutions/help/andrea-ingrassia/assistance/media",
  "assistance": "/getsupport/solutions/help/andrea-ingrassia/assistance/media",
  "media andrea": "/getsupport/solutions/help/andrea-ingrassia/assistance/media",
  "media": "/getsupport/solutions/help/andrea-ingrassia/assistance/media",
  "assistenza andrea": "/getsupport/solutions/help/andrea-ingrassia/assistance/media",
  "social": "/contact/social",
  "seguimi sui social": "/contact/social",
  "seguimi": "/contact/social",
  "instagram": "/contact/social",
  "youtube": "/contact/social",
  "linkedin": "/contact/social",
  "insta": "/contact/social",
  "spotify": "/contact/social",
  "spoty": "/contact/social",
  "linktree": "/contact/social",
  "tiktok": "/contact/social",
  "flickr": "/contact/social",
  "docs": "/docs",
  "documentazione": "/docs",
  "documenti": "/docs",
  "pdf": "/docs",
  "manuali": "/docs",
  "specifiche": "/docs",
  "download": "/docs",
  "mappa": "/sitemap",
  "sitemap": "/sitemap",
  "mappa del sito": "/sitemap",
  "mappa del supporto": "/sitemap",
  "mappa del sito del supporto": "/sitemap",
  "mappa supporto": "/sitemap",
  "supporto mappa": "/sitemap",
  // aggiungi altre parole chiave se serve
};

function handleSearch(event) {
  event.preventDefault();
  const input = document.getElementById('searchInput');
  if (!input) return; // sicurezza se il form non esiste
  const query = input.value.trim().toLowerCase();

  if (urlMap[query]) {
    window.location.href = `https://support-andreaingrassia.webflow.io${urlMap[query]}`;
  } else {
    alert("Purtroppo non abbiamo trovato risultati. Fai una nuova ricerca.");
  }
}

// -------------------------
// 2) Creazione del container (solo se non esiste già)
// -------------------------
if (!document.getElementById('customSearchContainer')) {
  const container = document.createElement('div');
  container.id = 'customSearchContainer';
  container.style.textAlign = 'center';
  container.style.padding = '50px 50px';
  container.style.fontFamily = "'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif";
  container.style.color = '#000000';

  container.innerHTML = `
    <h1 id="customSearchTitle" style="font-size:48px;font-weight:600;color:rgba(29,29,29,0.92);line-height:1.1;margin:0 auto 50px auto;font-family:'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif;text-align:center;max-width:650px;word-wrap:break-word;">
      Impossibile trovare la pagina che stai cercando.
    </h1>

    <div style="margin-bottom:40px;position:relative;display:flex;flex-direction:column;align-items:center;">
      <form id="searchForm" style="display:flex;justify-content:center;align-items:center;gap:10px;width:100%;max-width:500px;">
        <div style="position:relative;width:100%;">
          <label for="searchInput" id="searchLabel" style="position:absolute;top:50%;left:15px;transform:translateY(-50%);font-size:17px;font-weight:400;color:#86868b;transition:0.2s ease;font-family:inherit;pointer-events:none;">
            Cerca nel supporto
          </label>
          <input type="text" id="searchInput" style="padding:15px;font-size:16px;border:1px solid #ccc;border-radius:12px;width:100%;outline:none;font-family:inherit;transition:0.2s ease;">
        </div>
        <button type="submit" style="padding:10px 20px;font-size:16px;color:white;background-color:#0267cc;border:none;border-radius:8px;cursor:pointer;font-family:inherit;">
          Cerca
        </button>
      </form>

      <a href="https://support-andreaingrassia.webflow.io/sitemap" style="font-size:17px;font-weight:400;color:#0267cc;text-decoration:none;margin-top:25px;font-family:inherit;transition:all 0.2s ease;text-align:center;"
         onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
        Oppure consulta la mappa del sito >
      </a>
    </div>
  `;

  document.body.appendChild(container);

  // gestione label / focus
  function handleFocus(isFocused) {
    const searchInput = document.getElementById('searchInput');
    const searchLabel = document.getElementById('searchLabel');
    if (!searchInput || !searchLabel) return;
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
    if (!searchInput) return;
    const isFocused = document.activeElement === searchInput;
    handleFocus(isFocused);
  }

  // assegna listener (usa la handleSearch globale definita sopra)
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  if (searchForm) searchForm.addEventListener('submit', handleSearch);
  if (searchInput) {
    searchInput.addEventListener('focus', () => handleFocus(true));
    searchInput.addEventListener('blur', () => handleFocus(false));
    searchInput.addEventListener('input', checkInput);

    // ---->> QUI: sincronizza subito e gestisci il ritorno con "back"
    checkInput(); // sincronizza subito se il campo è già popolato
    window.addEventListener('pageshow', function (e) {
      setTimeout(checkInput, 0);
    });
  }

  // responsive title (opzionale)
  function applyResponsiveStyles() {
    const title = document.getElementById('customSearchTitle');
    const width = window.innerWidth;
    if (!title) return;
    if (width < 480) {
      // Mobile
      title.style.fontSize = '32px';
      title.style.marginBottom = '70px';
    } else if (width < 768) {
      // Mobile landscape / tablet piccolo
      title.style.fontSize = '40px';
      title.style.marginBottom = '50px';
    } else {
      // Desktop
      title.style.fontSize = '48px';
      title.style.marginBottom = '80px';
    }
  }
  applyResponsiveStyles();
  window.addEventListener('resize', applyResponsiveStyles);
}
