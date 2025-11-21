(function(){
  // contact-form-apple-style.js
  // Drop this file in your GitHub Pages repository and include it with:
  // <script src="/path/to/contact-form-apple-style.js"></script>
  // The script will append the form to an element with id="apple-contact-form-root" if present,
  // otherwise it will append it to document.body.
  // Screenshot reference (local path provided by user): /mnt/data/Screenshot 2025-11-21 175022.png

  const rootId = 'avvia-una-conversazione-con-andrea-container';

  const css = `
  /* Apple-style contact form (inline styles via injected stylesheet) */
  .apple-contact-wrap{max-width:680px;margin:48px auto;padding:0 20px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;color:#111}
  .apple-contact-title{font-size:20px;font-weight:600;margin-bottom:18px}
  .apple-contact-form{display:flex;flex-direction:column;gap:16px}
  .apple-contact-row{display:flex;gap:16px}
  @media (max-width:640px){.apple-contact-row{flex-direction:column}}
  .apple-contact-field{flex:1;display:flex;flex-direction:column;gap:8px}
  .apple-contact-label{font-size:13px;color:#444}
  .apple-contact-input{width:100%;box-sizing:border-box;padding:18px 20px;border-radius:12px;border:1px solid rgba(0,0,0,0.18);background:#fff;font-size:15px;outline:none;transition:box-shadow .15s, border-color .15s}
  .apple-contact-input::placeholder{color:#9aa0a6}
  .apple-contact-input:focus{box-shadow:0 6px 18px rgba(0,0,0,0.06);border-color:rgba(0,0,0,0.28)}
  .apple-contact-button{display:inline-flex;align-items:center;justify-content:center;padding:12px 26px;border-radius:999px;border:none;background:linear-gradient(180deg,#9fd0ff,#8ec0f2);color:white;font-weight:600;font-size:15px;cursor:pointer;box-shadow:0 6px 18px rgba(30,120,220,0.14);transition:transform .12s,box-shadow .12s}
  .apple-contact-button:active{transform:translateY(1px)}
  .apple-contact-note{margin-top:18px;color:#6b7176;font-size:13px}
  .apple-contact-error{color:#b00020;font-size:13px;margin-top:6px;min-height:18px}
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
    // Create wrapper section and then set innerHTML with a clear semantic markup
    const wrap = document.createElement('section');
    wrap.className = 'apple-contact-wrap';

    const title = document.createElement('h2');
    title.className = 'apple-contact-title';
    title.textContent = 'Avvia una conversazione con Apple';
    wrap.appendChild(title);

    // Build the form markup as a single template string for clarity
    const form = document.createElement('form');
    form.className = 'apple-contact-form';
    form.setAttribute('novalidate', 'true');
    form.innerHTML = `
      <div class="apple-contact-row" role="group" aria-label="Nome e Cognome">
        <div class="apple-contact-field">
          <label class="apple-contact-label" for="acf-nome">Nome</label>
          <input id="acf-nome" class="apple-contact-input" name="nome" type="text" placeholder="Nome" aria-required="true" />
        </div>
        <div class="apple-contact-field">
          <label class="apple-contact-label" for="acf-cognome">Cognome</label>
          <input id="acf-cognome" class="apple-contact-input" name="cognome" type="text" placeholder="Cognome" aria-required="true" />
        </div>
      </div>

      <div class="apple-contact-field">
        <label class="apple-contact-label" for="acf-email">Email</label>
        <input id="acf-email" class="apple-contact-input" name="email" type="email" placeholder="Email" aria-required="true" />
      </div>

      <div style="margin-top:8px;">
        <button type="submit" class="apple-contact-button" id="acf-submit">Continua</button>
      </div>

      <div class="apple-contact-error" id="acf-error" aria-live="polite" role="alert"></div>
      <div class="apple-contact-note" id="acf-note"></div>
    `;

    // Grab elements for logic
    const nome = form.querySelector('#acf-nome');
    const cognome = form.querySelector('#acf-cognome');
    const email = form.querySelector('#acf-email');
    const submit = form.querySelector('#acf-submit');
    const error = form.querySelector('#acf-error');
    const note = form.querySelector('#acf-note');

    // Submit handler with simple validation
    form.addEventListener('submit', function(e){
      e.preventDefault();
      error.textContent = '';
      note.textContent = '';

      if(!nome.value.trim()){
        error.textContent = 'Inserisci il nome.';
        nome.focus();
        return;
      }
      if(!cognome.value.trim()){
        error.textContent = 'Inserisci il cognome.';
        cognome.focus();
        return;
      }
      if(!email.value.trim()){
        error.textContent = 'Inserisci l\\'email.';
        email.focus();
        return;
      }
      if(!/^\S+@\S+\.\S+$/.test(email.value)){
        error.textContent = 'Inserisci un\\'email valida.';
        email.focus();
        return;
      }

      // Visual feedback: disable button and show sending state
      submit.disabled = true;
      submit.textContent = 'Invio...';

      // Simulated async submission: replace with real endpoint (Netlify, Formspree, API) if needed
      setTimeout(() => {
        // Build success message markup clearly
        const successHtml = `
          <div class="apple-contact-success" role="status">
            <strong>Grazie!</strong>
            <div>Ti contatteremo presto.</div>
          </div>
        `;
        wrap.innerHTML = successHtml;
      }, 700);
    });

    return {wrap, form};
  }

  function mount(){
    createStyles();
    const target = document.getElementById(rootId) || document.body;
    const {wrap, form} = buildForm();

    // Append form element to wrapper (form already contains inputs)
    wrap.appendChild(form);

    // If target is body, wrap in a centered container to keep layout neat
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

  // Expose API for manual mounting and future customization
  window.AppleContactForm = {
    /**
     * mountTo(elementOrId)
     * elementOrId: DOM element or string id of target container
     */
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
