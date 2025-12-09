// -------------------------
// 1) Mappe per due siti e funzione di risoluzione
// -------------------------

// Imposta qui i domini effettivi dei due siti (senza https://)
const siteXDomain = "support-andreaingrassia.webflow.io"; // sito support
const siteYDomain = "getsupport-andreaingrassia.webflow.io"; // sito getsupport

// URL Map site support
const urlMapX = {
  "home": "/",
  "supporto": "/",
  "supporto andrea": "/",
  "supporto andrea ufficiale": "/",
  "support": "/",
  "contatti": "/contact",
  "contattami": "/contact",
  "contact": "/contact",
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
};

// URL Map site getsupport
const urlMapY = {
  "ottieni supporto": "/",
  "ottieni": "/",
  "contatta il supporto": "/",
  "contatta": "/",
  "get": "/",
  "getsupport": "/",
  "get support": "/",
  "chat": "/solutions/chat",
  "chatta": "/solutions/chat",
  "chatta con il supporto": "/solutions/chat",
  "chat con il supporto": "/solutions/chat",
  "chat supporto": "/solutions/chat",
  "email": "/solutions/email",
  "mail": "/solutions/email",
  "scrivi": "/solutions/email",
  "scrivi al supporto": "/solutions/email",
  "invia mail al supporto": "/solutions/email",
  "scrivi email": "/solutions/email",
  "scrivi email al supporto": "/solutions/email",
  "invia email": "/solutions/email",
  "invia mail": "/solutions/email",
  "invia email al supporto": "/solutions/email",
  "invia": "/solutions/email",
  "scelta del prodotto": "/products",
  "scelta": "/products",
  "prodotto": "/products",
  "tutti i prodotti": "/products",
  "products": "/products",
  "all": "/products",
  "topics supporto": "/topics/102140",
  "topics supporto andrea": "/topics/102140",
  "topics supporto andrea ufficiale": "/topics/102140",
  "argomenti supporto andrea": "/topics/102140",
  "topics supporto andrea ufficiale": "/topics/102140",
  "argomenti andrea": "/topics/102400",
  "argomenti ingrassia andrea": "/topics/102400",
  "argomenti andrea ingrassia": "/topics/102400",
};

// Utility per normalizzare la query
function normalize(q) {
  return String(q || "").trim().toLowerCase();
}

// Risolve dove redirectare dato il testo di ricerca
function resolveRedirect(query) {
  const q = normalize(query);
  if (!q) return null;

  const currentHost = window.location.hostname || "";

  // preferisci la mappa del sito corrente se il dominio corrisponde
  const isOnSiteX = currentHost.includes(siteXDomain);
  const isOnSiteY = currentHost.includes(siteYDomain);

  if (isOnSiteX && urlMapX[q]) {
    return `https://${siteXDomain}${urlMapX[q]}`;
  }
  if (isOnSiteY && urlMapY[q]) {
    return `https://${siteYDomain}${urlMapY[q]}`;
  }

  // altrimenti prova a trovare la query in entrambe le mappe (preferisci X prima ma puoi invertire)
  if (urlMapX[q]) {
    return `https://${siteXDomain}${urlMapX[q]}`;
  }
  if (urlMapY[q]) {
    return `https://${siteYDomain}${urlMapY[q]}`;
  }

  // niente trovato
  return null;
}

// Funzione handleSearch aggiornata (usa resolveRedirect)
function handleSearch(event) {
  event.preventDefault();
  const input = document.getElementById('searchInput');
  if (!input) return;
  const query = input.value;

  const target = resolveRedirect(query);

  if (target) {
    window.location.href = target;
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
