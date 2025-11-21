(function(){
  const rootId = 'avvia-una-conversazione-con-andrea-container';

  const css = `
  .apple-contact-wrap {
    max-width: auto;
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
    padding: 18px 18px;
    border-radius: 14px;
    border: 1px solid rgba(0,0,0,0.4);
    font-size: 17px;
    letter-spacing: -0.2px;
    outline: none;
    transition: box-shadow .15s, border-color .15s;
  }

  .apple-contact-field input:focus {
    border: 1.9px solid rgba(0,122,255,0.9);
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
    width: auto;          /* larghezza minima necessaria */
    align-self: flex-start; /* allinea il pulsante a sinistra invece di allargarsi */
    margin-top: 35px; /* ← aumenta la distanza dagli input */
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

  @media (max-width: 550px) {
  .apple-contact-field input {
    width: 100% !important;
  }

  /* Floating label styles */
.apple-contact-field {
  position: relative; /* necessario per posizionare la label assoluta */
}

/* La label che appare "dentro" l'input */
.apple-contact-label-floating {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 17px;
  color: rgba(0,0,0,0.45);
  transition: transform .18s ease, font-size .18s ease, color .12s ease;
  background: transparent;
  padding: 0 4px;
}

/* Stato "flottante" — label piccola e spostata in alto */
.apple-contact-field.floated .apple-contact-label-floating {
  transform: translateY(-150%);
  font-size: 12px;
  color: rgba(0,0,0,0.6);
}

/* Se il campo è in focus, rendi la label più evidenziata */
.apple-contact-field.focused .apple-contact-label-floating {
  color: #007aff;
}

/* Piccola regolazione se vuoi che l'input sembri avere meno spazio superiore quando la label è flottante */
.apple-contact-field.floated input {
  /* opzionale: se vuoi ridurre padding-top quando la label è su */
  /* padding-top: 12px; */
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

  function buildForm(){
    const wrap = document.createElement('section');
    wrap.className = 'apple-contact-wrap';

    wrap.innerHTML = `
<h2 class="apple-contact-title">Avvia una conversazione con Andrea</h2>
<form class="apple-contact-form" novalidate>
<div class="apple-contact-field">
  <label class="apple-contact-label-floating" for="acf-nome">Nome</label>
  <input id="acf-nome" name="nome" type="text" placeholder="" aria-required="true" />
</div>

<div class="apple-contact-field">
  <label class="apple-contact-label-floating" for="acf-cognome">Cognome</label>
  <input id="acf-cognome" name="cognome" type="text" placeholder="" aria-required="true" />
</div>

<div class="apple-contact-field">
  <label class="apple-contact-label-floating" for="acf-email">Email</label>
  <input id="acf-email" name="email" type="email" placeholder="" aria-required="true" />
</div>

<button type="submit" class="apple-contact-button" id="acf-submit">Continua</button>

 <div class="apple-contact-error" id="acf-error" aria-live="polite" role="alert"></div>
</form>
    `;

    const form = wrap.querySelector('form');
    const nome = wrap.querySelector('#acf-nome');
    const cognome = wrap.querySelector('#acf-cognome');
    const email = wrap.querySelector('#acf-email');
    const submit = wrap.querySelector('#acf-submit');
    const error = wrap.querySelector('#acf-error');

    // utility per inizializzare il comportamento floating per ogni input
function initFloating(input){
  const field = input.closest('.apple-contact-field');

  // se l'input ha valore iniziale, mantienilo flottante
  if(input.value && input.value.trim() !== '') {
    field.classList.add('floated');
  }

  // quando ottieni focus -> mostra flottante (indipendentemente dal valore)
  input.addEventListener('focus', function(){
    field.classList.add('focused');
    field.classList.add('floated');
  });

  // quando digiti -> aggiungi/rimuovi stato "filled" (opzionale) e mantieni floated se c'è contenuto
  input.addEventListener('input', function(){
    if(input.value && input.value.trim() !== '') {
      field.classList.add('filled');
      field.classList.add('floated');
    } else {
      field.classList.remove('filled');
      // se siamo ancora in focus, mantieni floated; altrimenti lo rimuoviamo su blur handler
      // qui non togliamo floated: vogliamo che rimanga finché l'utente è nel campo
    }
  });

  // quando perdi focus -> se vuoto rimuovi floated, altrimenti mantieni floated
  input.addEventListener('blur', function(){
    field.classList.remove('focused');
    if(!input.value || input.value.trim() === '') {
      field.classList.remove('floated');
      field.classList.remove('filled');
    } else {
      // mantiene floated se ha valore
      field.classList.add('floated');
      field.classList.add('filled');
    }
  });
}

// inizializza sui tre input
initFloating(nome);
initFloating(cognome);
initFloating(email);

    form.addEventListener('submit', function(e){
      e.preventDefault();
      error.textContent = '';

      if(!nome.value.trim()){ error.textContent='Inserisci un nome valido'; nome.focus(); return; }
      if(!cognome.value.trim()){ error.textContent='Inserisci un cognome valido'; cognome.focus(); return; }
      if(!email.value.trim()){ error.textContent='Inserisci l\'email.'; email.focus(); return; }
      if(!/^\S+@\S+\.\S+$/.test(email.value)){ error.textContent='Inserisci un indirizzo email valido.'; email.focus(); return; }

      submit.disabled = true;
      submit.textContent = 'Invio...';

      setTimeout(()=>{
        wrap.innerHTML = `<div class="apple-contact-success" role="status"><strong>Grazie!</strong><div>Ti contatteremo presto.</div></div>`;
      }, 700);
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
      let el = typeof elOrId==='string' ? document.getElementById(elOrId) : elOrId;
      if(!el) throw new Error('Target element not found');
      const existing = el.querySelector('.apple-contact-wrap');
      if(existing) existing.remove();
      const wrap = buildForm();
      el.appendChild(wrap);
    }
  };
})();
