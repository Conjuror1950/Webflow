(function(){
  const rootId = 'avvia-una-conversazione-con-andrea-container';

const css = `
  .apple-contact-wrap {
    max-width: 600px;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    color: #111;
  }

  .apple-contact-title {
    font-family: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    font-size: 19px;
    font-weight: 600;
  }

  .apple-contact-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .apple-contact-field input {
    width: 490px;
    padding: 25px 18px 10px 18px;
    border-radius: 14px;
    border: 2px solid transparent;
    font-size: 17px;
    letter-spacing: -0.2px;
    outline: none;
    box-sizing: border-box;
    height: 60px;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.4);
    /* transizioni per bordi, ombra e colore testo */
    transition: border 0.18s ease, box-shadow 0.18s ease, color 0.18s ease;
    background: transparent;
    color: inherit;
    caret-color: #111; /* <-- aggiungi qui */
  }

  .apple-contact-field input:focus {
    border: 2px solid rgba(0,122,255,0.9);
    box-shadow: none;
  }

  /* stato di errore (campo rosso) */
  .apple-contact-field.has-error input {
    border: 1px solid rgb(227,0,0);   /* bordo rosso*/
    box-shadow: none;
    color: rgb(227,0,0);              /* testo dentro l'input diventa rosso */
    background: rgba(227,0,0,0.06);
    caret-color: #111; /* <-- aggiungi qui */
    transition: border 0.18s ease, box-shadow 0.18s ease, color 0.18s ease; background 0.18s ease;
  }

 /* quando il campo è in errore ma riceve focus, mostra il bordo focus azzurro */
 .apple-contact-field.has-error input:focus {
  border: 2px solid rgba(0,122,255,0.9) !important;
  box-shadow: none;
  background: transparent; /* opzionale: rimuove background rosato durante il focus */
  transition: border 0.18s ease, background 0.18s ease;
}

  /* label — spostamento tramite transform per transizioni GPU-accelerate e fluide */
  .apple-contact-field label {
    position: absolute;
    left: 18px;
    top: 18px;
    font-size: 17px;
    font-weight: 400;
    letter-spacing: -0.2px;
    color: rgba(0,0,0,0.5);
    pointer-events: none;

    /* usare transform per lo spostamento: più fluido */
    transform: translateY(0);
    transform-origin: left top;
    transition: transform 0.18s ease, font-size 0.18s ease, color 0.18s ease;
    will-change: transform, font-size, color;
  }

  /* stato "label ridotta" (focus o campo non vuoto) — spostiamo con transform */
  .apple-contact-field input:focus + label,
  .apple-contact-field input:not(:placeholder-shown) + label {
    transform: translateY(-10px); /* regola il valore se vuoi più/meno spostamento */
    font-size: 13px;
  }

  /* label diventa rossa quando il campo è in stato di errore (solo colore) */
  .apple-contact-field.has-error label {
    color: rgb(227,0,0);
    /* la transition su color è già dichiarata nella label */
  }

  /* placeholder (se visibile) diventa rosso nell'errore */
  .apple-contact-field.has-error input::placeholder {
    color: rgb(255, 242, 244) !important;
  }

  .apple-contact-button {
    padding: 18px 32px;
    border-radius: 999px;
    border: none;
    color: white;
    background: #007aff;
    font-weight: 400;
    font-size: 17px;
    cursor: pointer;
    width: auto;
    align-self: flex-start;
    margin-top: 35px;
  }

  .apple-contact-button:disabled {
    background: #94c4f4;
    color: rgba(244,249,254);
    cursor: default;
    box-shadow: none;
  }

  .apple-contact-error {
    color: #b00020;
    font-size: 13px;
    min-height: 18px;
  }

  .apple-contact-success {
    background: #f3fff6;
    padding: 12px 14px;
    color: #064b23;
  }

  .field-error {
    display: flex;
    align-items: center;
    gap: 3px;
    margin-top: 6px;
    font-size: 12px;
    color: rgb(227,0,0);
    line-height: 1;
    min-height: 18px;
  }

  .field-error svg {
    width: 13px;
    height: 13px;
    flex: 0 0 16px;
  }

  @media (max-width: 550px) {
    .apple-contact-field input {
      width: 100% !important;
    }
  }

.apple-contact-field {
  position: relative;
  margin-bottom: -25px; /* ⬅️ distanza tra gli input */
}

/* quando c'è un errore → aumenta lo spazio per non comprimere */
.apple-contact-field.has-error {
  margin-bottom: 12px; /* ⬅️ puoi aumentarlo se vuoi più aria */
}

/* ---------- NASCONDI LANCIALE TIDIO ALL'INIZIO ---------- */
/* regole multiple per aumentare la compatibilità con diverse versioni/markup */
#tidio-chat-iframe,
iframe[src*="tidio"],
.tidio-floating-button,
.tidio-chat-launcher,
.tidio-widget,
.tidio-wrapper {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

/* quando il widget viene mostrato via API rimuoveremo queste regole impostando direttamente lo style su elemento iframe/div */

/* ===== Success message: centrato, leggibile e con controlli ===== */
.apple-contact-success {
  display: flex;
  flex-direction: column;
  align-items: center;      /* centro orizzontale */
  justify-content: center;  /* centro verticale del contenuto */
  text-align: center;       /* testo centrato */
  gap: 10px;
  background: #f3fff6;
  padding: 20px 18px;
  color: #064b23;
  min-height: 100px;
  box-sizing: border-box;
}

/* titolo grande e centrato */
.apple-contact-success .success-title {
  font-size: 17px;
  font-weight: 700;
  margin: 0;
  line-height: 1.1;
}

/* testo descrittivo */
.apple-contact-success .success-desc {
  font-size: 14px;
  color: rgba(6,75,35,0.9);
  margin: 0;
}

/* stile per l'ID pratica */
.apple-contact-success .ticket {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 15px;
  color: #064b23;
  border: 1px solid rgba(6,75,35,0.06);
}

/* row pulsanti (copy / open chat / close) */
.apple-contact-success .success-controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 8px;
}

/* pulsanti */
.apple-contact-success .success-btn {
  padding: 10px 14px;
  border-radius: 999px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  background: #007aff;
  color: #fff;
  min-width: 36px;
}

/* pulsante secondario */
.apple-contact-success .success-btn.secondary {
  background: transparent;
}

/* pulsante "chiudi" più neutro */
.apple-contact-success .success-btn.tertiary {
  background: transparent;
  color: rgba(6,75,35,0.7);
  border: none;
}

/* stato disabilitato */
.apple-contact-success .success-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

/* icona (semplice cerchio check) */
.apple-contact-success .success-icon {
  width: 44px;
  height: 44px;
  display: inline-grid;
  place-items: center;
  background: linear-gradient(180deg, #e9fff0, #d6fce3);
}

/* responsive: togli padding se spazio stretto */
@media (max-width: 420px) {
  .apple-contact-success {
    padding: 14px;
    gap: 8px;
  }
  .apple-contact-success .ticket {
    font-size: 14px;
    padding: 6px 10px;
  }
  .apple-contact-success .success-btn {
    padding: 9px 12px;
    font-size: 13px;
  }
}
`;

  function createStyles(){
    if(document.getElementById('apple-contact-styles')) return;
    const s = document.createElement('style');
    s.id = 'apple-contact-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

// ------------------ Nascondi Tidio fino all'attivazione ------------------
// Chiamiamo questa funzione subito dopo il mount: prova ad usare l'API tidio per nascondere il launcher.
// Se l'API non è pronta, facciamo polling per pochi millisecondi; se non esiste l'API, applichiamo fallback css sull'iframe.
function hideTidioUntilActivated() {
  let tries = 0;
  function attemptHide() {
    tries++;
    if (window.tidioChatApi) {
      try {
        // preferiamo usare l'API ufficiale
        if (typeof window.tidioChatApi.display === 'function') {
          window.tidioChatApi.display(false);
        } else if (typeof window.tidioChatApi.hide === 'function') {
          window.tidioChatApi.hide();
        }
        // fine: non continuiamo il polling
        return;
      } catch (e) {
        console.warn('tidio API hide failed', e);
      }
    }

    // fallback: se esiste iframe di tidio, nascondilo via style
    const iframe = document.getElementById('tidio-chat-iframe') || document.querySelector('iframe[src*="tidio"]');
    if (iframe) {
      iframe.style.display = 'none';
      iframe.style.visibility = 'hidden';
      iframe.style.opacity = '0';
      iframe.style.pointerEvents = 'none';
      return;
    }

    // retry per un breve periodo (max ~3s)
    if (tries < 10) {
      setTimeout(attemptHide, 300);
    }
  }
  attemptHide();
}
  
function buildForm(){
  const wrap = document.createElement('section');
  wrap.className = 'apple-contact-wrap';

  wrap.innerHTML = `
    <h2 class="apple-contact-title">Avvia una conversazione con Andrea</h2>
    <form class="apple-contact-form" novalidate>
      <div class="apple-contact-field">
        <input id="acf-nome" name="nome" type="text" placeholder=" " aria-required="true" />
        <label for="acf-nome">Nome</label>
        <div class="field-error" aria-live="polite"></div>
      </div>
      <div class="apple-contact-field">
        <input id="acf-cognome" name="cognome" type="text" placeholder=" " aria-required="true" />
        <label for="acf-cognome">Cognome</label>
        <div class="field-error" aria-live="polite"></div>
      </div>
      <div class="apple-contact-field">
        <input id="acf-email" name="email" type="email" placeholder=" " aria-required="true" />
        <label for="acf-email">Email</label>
        <div class="field-error" aria-live="polite"></div>
      </div>

      <button type="submit" class="apple-contact-button" id="acf-submit" disabled>Continua</button>
      <div class="apple-contact-error" id="acf-error" aria-live="polite" role="alert"></div>
    </form>
  `;

  const form = wrap.querySelector('form');
  const nome = wrap.querySelector('#acf-nome');
  const cognome = wrap.querySelector('#acf-cognome');
  const email = wrap.querySelector('#acf-email');
  const submit = wrap.querySelector('#acf-submit');
  const error = wrap.querySelector('#acf-error');

  const nomeErrorDiv = nome.parentElement.querySelector('.field-error');
  const cognomeErrorDiv = cognome.parentElement.querySelector('.field-error');
  const emailErrorDiv = email.parentElement.querySelector('.field-error');

  const inputs = [nome, cognome, email];

  const isValidEmail = (v) => /^\S+@\S+\.\S+$/.test(v);

  function showFieldError(input, container, msg) {
    if(!container) return;
    input.parentElement.classList.add('has-error');
    container.innerHTML = `
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="16" height="16">
  <!-- cerchio rosso con interno trasparente -->
  <circle cx="12" cy="12" r="10" fill="transparent" stroke="rgb(227,0,0)" stroke-width="2"/>
  
  <!-- esclamativo rosso -->
  <line x1="12" y1="7" x2="12" y2="13" stroke="rgb(227,0,0)" stroke-width="2"/>
  <circle cx="12" cy="17" r="1.5" fill="rgb(227,0,0)"/>
</svg>
      <span>${msg}</span>
    `;
  }

  function hideFieldError(input, container) {
    if(!container) return;
    input.parentElement.classList.remove('has-error');
    container.innerHTML = '';
  }

  function updateButtonState() {
    const allValid = nome.value.trim() && cognome.value.trim() && isValidEmail(email.value.trim());
    submit.disabled = !allValid;
    submit.setAttribute('aria-disabled', (!allValid).toString());
  }

  inputs.forEach(input => {
    const container = input.parentElement.querySelector('.field-error');

    // mostra tooltip su hover se il campo è vuoto
input.addEventListener('mouseenter', () => {
  if (!input.value.trim()) {
    input.title = 'Compila questo campo.';
  } else {
    input.removeAttribute('title');
  }
});
input.addEventListener('mouseleave', () => {
  input.removeAttribute('title');
});

    input.addEventListener('input', () => {
      if(input.value.trim()) input.removeAttribute('title');
      hideFieldError(input, container);
      error.textContent = '';
      updateButtonState();
    });

    input.addEventListener('blur', () => {
      const val = input.value.trim();
      if(input === nome || input === cognome){
        if(!val) showFieldError(input, container, input===nome?'Inserisci un nome valido.':'Inserisci un cognome valido.');
        else hideFieldError(input, container);
      } else if(input === email){
        if(!val) showFieldError(input, container, `Inserisci un indirizzo email valido.`);
        else if(!isValidEmail(val)) showFieldError(input, container, 'Inserisci un indirizzo email valido.');
        else hideFieldError(input, container);
      }
      updateButtonState();
    });
  });

  updateButtonState();

  form.addEventListener('submit', function(e){
    e.preventDefault();
    error.textContent = '';

    if(!nome.value.trim()){ showFieldError(nome, nomeErrorDiv, 'Inserisci un nome valido.'); nome.focus(); return; }
    if(!cognome.value.trim()){ showFieldError(cognome, cognomeErrorDiv, 'Inserisci un cognome valido.'); cognome.focus(); return; }
    if(!email.value.trim()){ showFieldError(email, emailErrorDiv, `Inserisci un indirizzo email valido.`); email.focus(); return; }
    if(!isValidEmail(email.value.trim())){ showFieldError(email, emailErrorDiv, 'Inserisci un indirizzo email valido.'); email.focus(); return; }

    submit.disabled = true;
    submit.textContent = 'Invio...';

// ------------------ INIZIO LOGICA TIDIO ------------------

// funzione per generare UUIDv4
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

// crea ID pratica codice univoco
const ticketId = "10" + Math.floor(Math.random() * 1e10).toString().padStart(10, "0"); // ID pratica numerico di 12 cifre

// dati visitatore per Tidio
const visitorData = {
  email: email.value.trim(),
  name: `${nome.value.trim()} ${cognome.value.trim()}`,
  ticket_id: ticketId // proprietà custom
};

// messaggio iniziale che comparirà agli operatori Tidio
// ottieni data e ora locale in formato MM/DD/YYYY HH:MM AM/PM
const now = new Date();
const hours12 = now.getHours() % 12 || 12;
const minutes = now.getMinutes().toString().padStart(2, '0');
const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
const formattedDate = `${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()} ${hours12}:${minutes} ${ampm}`;

// Messaggi inviati separatamente
const message1 = `${formattedDate}`;
const message2 = `Stai chattando con Andrea. Il tuo numero di pratica è ${ticketId}.`;

// Invio alla chat di Tidio con delay
function sendToTidio() {
  if (window.tidioChatApi && typeof window.tidioChatApi.setVisitorData === 'function') {
    try {
      // Aggiorna i dati del visitatore
      window.tidioChatApi.setVisitorData(visitorData);
    } catch (e) {
      console.warn('setVisitorData failed', e);
    }

    try {
// Rendi visibile il launcher Tidio (se è stato nascosto) e apri il widget
try {
  if (window.tidioChatApi) {
    if (typeof window.tidioChatApi.display === 'function') {
      window.tidioChatApi.display(true); // mostra il launcher
    } else if (typeof window.tidioChatApi.show === 'function') {
      window.tidioChatApi.show(); // fallback API
    }
  }
} catch (e) {
  console.warn('tidio display/show failed', e);
}

// rimuovi anche eventuale style inline sull'iframe (fallback CSS che abbiamo applicato)
const tidioIframe = document.getElementById('tidio-chat-iframe') || document.querySelector('iframe[src*="tidio"]');
if (tidioIframe) {
  tidioIframe.style.display = '';
  tidioIframe.style.visibility = '';
  tidioIframe.style.opacity = '';
  tidioIframe.style.pointerEvents = '';
}

// ora apri la chat come già facevi
if (window.tidioChatApi && typeof window.tidioChatApi.open === 'function') {
  window.tidioChatApi.open();
} else if (window.tidioChatApi && typeof window.tidioChatApi.show === 'function') {
  window.tidioChatApi.show();
}

// Invia il primo messaggio (data/ora)
window.tidioChatApi.messageFromVisitor(message1);

      // Calcola delay casuale tra 1000ms e 1800ms
      const delay = 1000 + Math.random() * 800;

      // Invia il secondo messaggio (numero di pratica)
      setTimeout(() => {
        window.tidioChatApi.messageFromVisitor(message2);
      }, delay);

    } catch (e) {
      console.warn('messageFromVisitor / open failed', e);
    }

  } else {
    // Se Tidio non è pronto, riprova dopo 3600ms
    setTimeout(sendToTidio, 3600);
  }
}

// Avvia l'invio dei messaggi
// sendToTidio(); // Aggiungi '//' prima di 'sendToTidio();' per disattivare temporaneamente l'invio.

// ================= mostra feedback all'utente con ID pratica - markup migliorato =================
wrap.innerHTML = `
  <div class="apple-contact-success" role="status" aria-live="polite" tabindex="-1">
    <div class="success-icon" aria-hidden="true">
      <!-- semplice icona check -->
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11" stroke-width="1.2" fill="transparent"/>
        <path d="M7.5 12.5l2.5 2.5L16.5 9.5" stroke="#064b23" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <div>
      <p class="success-title">Apertura chat</p>
      <p class="success-desc">La finestra della chat dovrebbe aprirsi automaticamente.</p>
    </div>

    <div class="ticket" aria-label="ID pratica">
      <span>ID pratica: </span><strong id="acf-ticket-id">${ticketId}</strong>
    </div>
  </div>
`;

// ------------------ FINE LOGICA TIDIO ------------------
  });

  return wrap;
}

function mount(target){
  createStyles();
  // nascondi il widget Tidio finché non viene attivato dal form
  hideTidioUntilActivated();

  const wrap = buildForm();
  if(!target) target = document.getElementById(rootId) || document.body;
  target.appendChild(wrap);
}

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', ()=>mount());
  } else {
    mount();
  }

  window.AppleContactForm = {
    mountTo(elOrId){
      let el = typeof elOrId==='string'?document.getElementById(elOrId):elOrId;
      if(!el) throw new Error('Target element not found');
      const existing = el.querySelector('.apple-contact-wrap');
      if(existing) existing.remove();
      const wrap = buildForm();
      el.appendChild(wrap);
    }
  };
})();
