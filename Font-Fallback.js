<!-- Inserisci questo come primo elemento nella pagina (o come primo script inline) -->
(function(){
  var css = ':root{--apple-font-stack:-apple-system,BlinkMacSystemFont,"SF Pro Text","SF Pro Display","Helvetica Neue",Helvetica,Arial,sans-serif;}html,body,button,input,textarea,select{font-family:var(--apple-font-stack)!important;}';

  if (document.head) {
    // se siamo durante il parsing, document.head esiste quasi sempre: inseriamo lo style
    var s = document.createElement('style');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  } else {
    // fallback: scriviamo direttamente nello stream HTML (ATTENZIONE: usare solo durante parsing)
    // evitiamo problemi di "<" chiudendo la stringa in modo sicuro
    document.write('<style>' + css.replace(/</g, '\\u003C') + '</style>');
  }
})();
