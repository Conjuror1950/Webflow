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
    border: 1px solid #c7f0d1;
    padding: 12px 14px;
    border-radius: 10px;
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
`;

  function createStyles(){
    if(document.getElementById('apple-contact-styles')) return;
    const s = document.createElement('style');
    s.id = 'apple-contact-styles';
    s.textContent = css;
    document.head.appendChild(s);
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
const ticketId = (Date.now() % 1e12).toString(); // ID pratica numerico di 12 cifre

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

// funzione che prova a inviare a Tidio quando è pronto
function sendToTidio() {
  if (window.tidioChatApi && typeof window.tidioChatApi.setVisitorData === 'function') {
    try {
      // aggiorna i dati visitatore
      window.tidioChatApi.setVisitorData(visitorData);
    } catch (e) {
      console.warn('setVisitorData failed', e);
    }
    try {
      // apri il widget e invia i messaggi
      window.tidioChatApi.open();
      window.tidioChatApi.messageFromVisitor(message1);
      setTimeout(() => {
        window.tidioChatApi.messageFromVisitor(message2);
      }, 500); // piccolo delay per far comparire i messaggi separati
    } catch (e) {
      console.warn('messageFromVisitor / open failed', e);
    }
  } else {
    setTimeout(sendToTidio, 300);
  }
}

sendToTidio();

// mostra feedback all'utente con ID pratica
wrap.innerHTML = `
  <div class="apple-contact-success" role="status">
    <strong>Apertura chat</strong>
    <div>La finestra della chat dovrebbe aprirsi automaticamente.</div>
    <div>ID pratica: <strong>${ticketId}</strong></div>
  </div>
`;

// ------------------ FINE LOGICA TIDIO ------------------
  });

  return wrap;
}

  function mount(target){
    createStyles();
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
