(function(){
  const rootId = 'avvia-una-conversazione-con-andrea-container';

  const css = `
  .apple-contact-wrap {
    max-width: 680px;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    color: #111;
  }

  .apple-contact-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 18px;
  }

  .apple-contact-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .apple-contact-field input {
    width: 100%;
    padding: 18px 20px;
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,0.18);
    font-size: 15px;
    outline: none;
    transition: box-shadow .15s, border-color .15s;
  }

  .apple-contact-field input:focus {
    box-shadow: 0 6px 18px rgba(0,0,0,0.06);
    border-color: rgba(0,0,0,0.28);
  }

  .apple-contact-button {
    padding: 12px 26px;
    border-radius: 999px;
    border: none;
    background: linear-gradient(180deg,#9fd0ff,#8ec0f2);
    color: white;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    width: auto;          /* larghezza minima necessaria */
    align-self: flex-start; /* allinea il pulsante a sinistra invece di allargarsi */
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
      <h2 class="apple-contact-title">Avvia una conversazione con Apple</h2>
      <form class="apple-contact-form" novalidate>
        <div class="apple-contact-field">
          <input id="acf-nome" name="nome" type="text" placeholder="Nome" aria-required="true" />
        </div>
        <div class="apple-contact-field">
          <input id="acf-cognome" name="cognome" type="text" placeholder="Cognome" aria-required="true" />
        </div>
        <div class="apple-contact-field">
          <input id="acf-email" name="email" type="email" placeholder="Email" aria-required="true" />
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

      if(!nome.value.trim()){ error.textContent='Inserisci il nome.'; nome.focus(); return; }
      if(!cognome.value.trim()){ error.textContent='Inserisci il cognome.'; cognome.focus(); return; }
      if(!email.value.trim()){ error.textContent='Inserisci l\'email.'; email.focus(); return; }
      if(!/^\S+@\S+\.\S+$/.test(email.value)){ error.textContent='Inserisci un\'email valida.'; email.focus(); return; }

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
