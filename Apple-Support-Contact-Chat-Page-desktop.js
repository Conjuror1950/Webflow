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
}

.apple-contact-field {
  position: relative;
}

.apple-contact-field label {
  position: absolute;
  left: 18px;
  top: 18px;
  font-size: 17px;
  font-weight: 400;
  letter-spacing: -0.2px;
  color: rgba(0,0,0,0.5);
  pointer-events: none;
  transition: 0.2s ease all;
}

.apple-contact-field input:focus + label,
.apple-contact-field input:not(:placeholder-shown) + label {
  top: 5px;
  font-size: 13px;
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
        </div>
        <div class="apple-contact-field">
          <input id="acf-cognome" name="cognome" type="text" placeholder=" " aria-required="true" />
          <label for="acf-cognome">Cognome</label>
        </div>
        <div class="apple-contact-field">
          <input id="acf-email" name="email" type="email" placeholder=" " aria-required="true" />
          <label for="acf-email">Email</label>
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
