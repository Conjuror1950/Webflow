(function(){
  // contact-form-apple-style.js
  // Drop this file in your GitHub Pages repository and include it with:
  // <script src="/path/to/contact-form-apple-style.js"></script>
  // The script will append the form to an element with id="apple-contact-form-root" if present,
  // otherwise it will append it to document.body.
  // Screenshot reference (local path provided by user): /mnt/data/Screenshot 2025-11-21 175022.png

  const rootId = 'apple-contact-form-root';

  const css = `
  /* Apple-style contact form (inline styles via injected stylesheet) */
  .apple-contact-wrap{max-width:680px;margin:48px auto;padding:0 20px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;color:#111}
  .apple-contact-title{font-size:20px;font-weight:600;margin-bottom:18px}
  .apple-contact-form{display:flex;flex-direction:column;gap:16px}
  .apple-contact-input{width:100%;box-sizing:border-box;padding:18px 20px;border-radius:12px;border:1px solid rgba(0,0,0,0.18);background:#fff;font-size:15px;outline:none;transition:box-shadow .15s, border-color .15s}
  .apple-contact-input::placeholder{color:#9aa0a6}
  .apple-contact-input:focus{box-shadow:0 6px 18px rgba(0,0,0,0.06);border-color:rgba(0,0,0,0.28)}
  .apple-contact-row{display:flex;gap:16px}
  @media (max-width:640px){.apple-contact-row{flex-direction:column}}
  .apple-contact-button{display:inline-flex;align-items:center;justify-content:center;padding:12px 26px;border-radius:999px;border:none;background:linear-gradient(180deg,#9fd0ff,#8ec0f2);color:white;font-weight:600;font-size:15px;cursor:pointer;box-shadow:0 6px 18px rgba(30,120,220,0.14);transition:transform .12s,box-shadow .12s}
  .apple-contact-button:active{transform:translateY(1px)}
  .apple-contact-note{margin-top:18px;color:#6b7176;font-size:13px}
  .apple-contact-error{color:#b00020;font-size:13px;margin-top:6px}
  .apple-contact-success{background:#f3fff6;border:1px solid #c7f0d1;padding:12px 14px;border-radius:10px;color:#064b23}
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

    const title = document.createElement('h2');
    title.className = 'apple-contact-title';
    title.textContent = 'Avvia una conversazione con Apple';
    wrap.appendChild(title);

    const form = document.createElement('form');
    form.className = 'apple-contact-form';
    form.setAttribute('novalidate','true');

    // Row: Nome + Cognome
    const row = document.createElement('div');
    row.className = 'apple-contact-row';

    const nome = document.createElement('input');
    nome.type = 'text'; nome.name = 'nome'; nome.placeholder = 'Nome'; nome.className = 'apple-contact-input'; nome.setAttribute('aria-label','Nome');
    const cognome = document.createElement('input');
    cognome.type = 'text'; cognome.name = 'cognome'; cognome.placeholder = 'Cognome'; cognome.className = 'apple-contact-input'; cognome.setAttribute('aria-label','Cognome');

    row.appendChild(nome);
    row.appendChild(cognome);

    const email = document.createElement('input');
    email.type = 'email'; email.name = 'email'; email.placeholder = 'Email'; email.className = 'apple-contact-input'; email.setAttribute('aria-label','Email');

    const btnWrap = document.createElement('div');
    btnWrap.style.marginTop = '8px';

    const submit = document.createElement('button');
    submit.type = 'submit'; submit.className = 'apple-contact-button'; submit.textContent = 'Continua';

    btnWrap.appendChild(submit);

    const note = document.createElement('div');
    note.className = 'apple-contact-note';
    note.textContent = '';

    const error = document.createElement('div');
    error.className = 'apple-contact-error';
    error.setAttribute('aria-live','polite');

    form.appendChild(row);
    form.appendChild(email);
    form.appendChild(btnWrap);
    form.appendChild(error);
    form.appendChild(note);

    form.addEventListener('submit', function(e){
      e.preventDefault();
      error.textContent = '';
      // simple validation
      if(!nome.value.trim()) { error.textContent = 'Inserisci il nome.'; nome.focus(); return; }
      if(!cognome.value.trim()) { error.textContent = 'Inserisci il cognome.'; cognome.focus(); return; }
      if(!email.value.trim()) { error.textContent = 'Inserisci l\'email.'; email.focus(); return; }
      if(!/^\S+@\S+\.\S+$/.test(email.value)){ error.textContent = 'Inserisci un\'email valida.'; email.focus(); return; }

      // simulate submission (on GitHub Pages you can connect this to a Form endpoint or Netlify Forms)
      submit.disabled = true; submit.textContent = 'Invio...';

      setTimeout(()=>{
        const success = document.createElement('div');
        success.className = 'apple-contact-success';
        success.textContent = 'Grazie! Ti contatteremo presto.';
        wrap.innerHTML = ''; // replace form with success message
        wrap.appendChild(success);
      }, 700);
    });

    return {wrap, form};
  }

  function mount(){
    createStyles();
    const target = document.getElementById(rootId) || document.body;
    const {wrap, form} = buildForm();
    wrap.appendChild(form);
    // If target is body, insert a centered container for nicer layout
    if(target === document.body){
      const container = document.createElement('div');
      container.style.maxWidth = '980px';
      container.style.margin = '0 auto';
      container.appendChild(wrap);
      document.body.appendChild(container);
    } else {
      target.appendChild(wrap);
    }
  }

  // Auto-mount when DOM is ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  // Expose a small API in case user wants to mount manually
  window.AppleContactForm = {
    mountTo: function(elementOrId){
      let el = elementOrId;
      if(typeof elementOrId === 'string') el = document.getElementById(elementOrId);
      if(!el) throw new Error('Target element not found');
      // remove default mount if present
      const existing = document.querySelector('.apple-contact-wrap');
      if(existing) existing.remove();
      const {wrap, form} = buildForm();
      wrap.appendChild(form);
      el.appendChild(wrap);
    }
  };

})();
