// -------------------------
// 1) Mappe e funzione Search (globali)
// -------------------------
const urlMap = {
  "home": "/",
  "biografia": "/person/andrea-ingrassia",
  "bio": "/person/andrea-ingrassia",
  "su di me": "/person/andrea-ingrassia",
  "chi sono": "/person/andrea-ingrassia",
  "show": "/show/produzioni-cinematografiche",
  "produzioni": "/show/produzioni-cinematografiche",
  "produzioni cinematografiche": "/show/produzioni-cinematografiche",
  "cinema": "/show/produzioni-cinematografiche",
  "video": "/show/produzioni-cinematografiche",
  "room": "/room/album-fotografici",
  "album": "/room/album-fotografici",
  "album fotografici": "/room/album-fotografici",
  "album foto": "/room/album-fotografici",
  "foto": "/room/album-fotografici",
  "fotografia": "/room/album-fotografici",
  "fotografie": "/room/album-fotografici",
  "raccolte": "/room/album-fotografici",
  "eventi": "/room/album-fotografici",
  "supporto": "/#support",
  "faq": "/#support",
  "ask": "/#support",
  "question": "/#support",
  "ask question": "/#support",
  "asked questions": "/#support",
  "domande": "/#support",
  "portfolio": "/portfolio",
  "galleria": "/room/album-fotografici",
  "collezione 1": "/room/album-fotografici/collezione-1/halloween",
  "halloween": "/room/album-fotografici/collezione-1/halloween",
  "volume 2": "/room/album-fotografici/volume-2/paesaggi-naturali",
  "paesaggi naturali": "/room/album-fotografici/volume-2/paesaggi-naturali",
  "paesaggi": "/room/album-fotografici/volume-2/paesaggi-naturali",
  "natura": "/room/album-fotografici/volume-2/paesaggi-naturali",
  "foto natura": "/room/album-fotografici/volume-2/paesaggi-naturali",
  "volume 1": "/room/album-fotografici/volume-1/ambienti-urbani",
  "ambienti urbani": "/room/album-fotografici/volume-1/ambienti-urbani",
  "foto città": "/room/album-fotografici/volume-1/ambienti-urbani",
  "città": "/room/album-fotografici/volume-1/ambienti-urbani",
  "volume 3": "/room/album-fotografici/volume-3/interni-e-scenari",
  "interni e scenari": "/room/album-fotografici/volume-3/interni-e-scenari",
  "interni": "/room/album-fotografici/volume-3/interni-e-scenari",
  "foto interne": "/room/album-fotografici/volume-3/interni-e-scenari",
  "ristorante": "/room/album-fotografici/volume-3/interni-e-scenari",
  "foto ristorante": "/room/album-fotografici/volume-3/interni-e-scenari",
  "servizi": "/servizi",
  "attrezzatura": "/servizi#attrezzatura",
  "cv": "/servizi#cv",
  "curriculum": "/servizi#cv",
  "social": "/contatti#social",
  "modulo": "/contatti#modulo",
  "modulo contatti": "/contatti#modulo",
  "form": "/contatti#modulo",
  "contatti": "/contatti",
  "informazioni": "/informazioni/aggiornamenti",
  "informazioni sugli aggiornamenti": "/informazioni/aggiornamenti",
  "aggiornamenti": "/informazioni/aggiornamenti",
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
  }

  // responsive title (opzionale)
  function applyResponsiveStyles() {
    const title = document.getElementById('customSearchTitle');
    const width = window.innerWidth;
    if (!title) return;
    if (width < 480) {
      title.style.fontSize = '32px';
      title.style.marginBottom = '30px';
    } else if (width < 768) {
      title.style.fontSize = '40px';
      title.style.marginBottom = '40px';
    } else {
      title.style.fontSize = '48px';
      title.style.marginBottom = '50px';
    }
  }
  applyResponsiveStyles();
  window.addEventListener('resize', applyResponsiveStyles);
}
