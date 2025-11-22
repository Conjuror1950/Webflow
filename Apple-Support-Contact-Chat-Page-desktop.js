(function(){
  const rootId = 'avvia-una-conversazione-con-andrea-container';

  const css = `
  /* BASE: font Apple-like */
  .apple-contact-wrap {
    max-width: 640px;
    font-family: "SF Pro Text", "SF Pro Display", "SF Pro Icons", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
    color: #111;
    -webkit-font-smoothing: antialiased;
    margin: 0;
  }

  .apple-contact-title {
    font-family: "SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #111;
  }

  .apple-contact-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* FIELD: wrapper gives room for the floating label */
  .apple-contact-field {
    position: relative;
    padding-top: 10px; /* spazio per la label */
  }

  /* INPUT: size, padding e shapings molto simili a Apple */
  .apple-contact-field input {
    width: 100%;
    box-sizing: border-box;
    height: 56px; /* altezza tipica */
    padding: 18px 16px 12px 16px; /* top padding abbondante per label */
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,0.12);
    background: rgba(250,250,250,1);
    font-size: 17px;
    line-height: 20px;
    letter-spacing: -0.2px;
    color: #111;
    outline: none;
    transition: box-shadow .14s cubic-bezier(.2,.8,.2,1), border-color .14s cubic-bezier(.2,.8,.2,1), background .14s;
    -webkit-appearance: none;
  }

  /* subtle inner shadow for depth (Apple-like) */
  .apple-contact-field input {
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02);
  }

  /* FOCUS: thin blue ring like Apple */
  .apple-contact-field input:focus {
    border-color: rgba(0,122,255,0.9);
    box-shadow: 0 0 0 4px rgba(0,122,255,0.08);
  }

  /* LABEL: positioned over input like Apple floating labels */
  .apple-contact-label {
    position: absolute;
    left: 16px;
    top: 18px;
    font-size: 17px;
    line-height: 1;
    transform-origin: left top;
    pointer-events: none;
    transition:
      transform .12s cubic-bezier(.2,.9,.2,1),
      font-size .12s cubic-bezier(.2,.9,.2,1),
      color .12s cubic-bezier(.2,.9,.2,1),
      top .12s cubic-bezier(.2,.9,.2,1),
      opacity .08s;
    color: rgba(0,0,0,0.45);
    background: transparent;
    padding: 0 6px;
    font-weight: 400;
  }

  /* ACTIVE: label in alto, leggermente piu' piccola e più sottile (Apple style) */
  .apple-contact-field.active .apple-contact-label {
    transform: translateY(-20px) scale(.78);
    font-size: 13px;
    top: 8px;
    color: rgba(0,0,0,0.65);
    font-weight: 400;
  }

  /* quando input è disabilitato o stato successo */
  .apple-contact-field.disabled input {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Pulsante (stile Apple CTA) */
  .apple-contact-button {
    padding: 14px 28px;
    border-radius: 12px;
    border: none;
    color: white;
    background: linear-gradient(180deg,#007aff 0%, #0060df 100%);
    font-weight: 600;
    font-size: 17px;
    cursor: pointer;
    width: auto;
    align-self: flex-start;
    margin-top: 4px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    transition: transform .08s, box-shadow .12s;
  }

  .apple-contact-button:active { transform: translateY(1px); box-shadow: 0 4px 12px rgba(0,0,0,0.10); }

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

  /* Autofill: reset weird yellow on Chrome */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: #111 !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  /* Responsive */
  @media (max-width: 640px) {
    .apple-contact-wrap { padding: 0 12px; }
    .apple-contact-field { padding-top: 8px; }
    .apple-contact-field input { height: 52px; padding: 16px 12px 10px 12px; font-size: 16px; }
    .apple-contact-label { left: 12px; top: 16px; font-size: 16px; }
    .apple-contact-field.active .apple-contact-label { transform: translateY(-18px) scale(.78); top: 7px; font-size: 12px; }
    .apple-contact-button { padding: 12px 22px; font-size: 16px; }
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
          <input id="acf-nome" name="nome" type="text" placeholder="" aria-required="true" autocomplete="given-name" />
          <label for="acf-nome" class="apple-contact-label">Nome</label>
        </div>

        <div class="apple-contact-field">
          <input id="acf-cognome" name="cognome" type="text" placeholder="" aria-required="true" autocomplete="family-name" />
          <label for="acf-cognome" class="apple-contact-label">Cognome</label>
        </div>

        <div class="apple-contact-field">
          <input id="acf-email" name="email" type="email" placeholder="" aria-required="true" autocomplete="email" />
          <label for="acf-email" class="apple-contact-label">Email</label>
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

    /* ===== FLOATING LABEL: comportamento millimetrico Apple-like ===== */
    function attachFloatingLabelBehavior(input){
      const field = input.closest('.apple-contact-field');

      // stato iniziale: se ha valore (es. ritorno pagina) tieni la label in alto
      if (input.value && input.value.trim() !== '') {
        field.classList.add('active');
      }

      // quando prendi focus: la label sale sempre (anche se vuota)
      input.addEventListener('focus', () => {
        field.classList.add('active');
      });

      // mentre scrivi: se c'è contenuto mantieni active; se cancelli tutto resta active se sei in focus
      input.addEventListener('input', () => {
        if (input.value && input.value.trim() !== '') {
          field.classList.add('active');
        } else {
          if (document.activeElement !== input) {
            field.classList.remove('active');
          }
        }
      });

      // quando perdi il focus: se è vuoto la label torna giù; se ha contenuto la label rimane in alto
      input.addEventListener('blur', () => {
        if (!input.value || input.value.trim() === '') {
          field.classList.remove('active');
        } else {
          field.classList.add('active');
        }
      });

      // se il valore viene impostato programmaticamente, tieni la label sincronizzata
      const observer = new MutationObserver(() => {
        if (input.value && input.value.trim() !== '') field.classList.add('active');
        else if (document.activeElement !== input) field.classList.remove('active');
      });
      observer.observe(input, { attributes: true, attributeFilter: ['value'] });
    }

    [nome, cognome, email].forEach(el => attachFloatingLabelBehavior(el));

    /* ===== VALIDAZIONE E INVIO ===== */
    form.addEventListener('submit', function(e){
      e.preventDefault();
      error.textContent = '';

      if (!nome.value.trim()) { error.textContent = 'Inserisci un nome valido'; nome.focus(); return; }
      if (!cognome.value.trim()) { error.textContent = 'Inserisci un cognome valido'; cognome.focus(); return; }
      if (!email.value.trim()) { error.textContent = "Inserisci l'email."; email.focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { error.textContent = 'Inserisci un indirizzo email valido.'; email.focus(); return; }

      submit.disabled = true;
      submit.textContent = 'Invio...';

      // simulazione invio
      setTimeout(() => {
        wrap.innerHTML = '<div class="apple-contact-success" role="status"><strong>Grazie!</strong><div>Ti contatteremo presto.</div></div>';
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

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => mount());
  } else {
    mount();
  }

  window.AppleContactForm = {
    mountTo(elOrId){
      let el = typeof elOrId === 'string' ? document.getElementById(elOrId) : elOrId;
      if(!el) throw new Error('Target element not found');
      const existing = el.querySelector('.apple-contact-wrap');
      if(existing) existing.remove();
      const wrap = buildForm();
      el.appendChild(wrap);
    }
  };
})();
