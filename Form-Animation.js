;(function () {
  // 1) crea subito overlay con inset:0
  const overlay = document.createElement('div')
  overlay.id = 'mobile-landscape-lock'
  Object.assign(overlay.style, {
    position: 'fixed',
    top: '0', left: '0', right: '0', bottom: '0',
    background: '#000',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '2147483647'  // massimo z-index
  })
  overlay.innerHTML = `
    <div class="lock-message" style="
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:.5rem;
    ">
      <svg xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 20 20"
           fill="currentColor"
           style="width:3rem; height:3rem; color:#fff; opacity:.8">
        <path d="M4 4v5h.582A6.002 6.002 0 0110 4a6 6 0 015.657 8.004.75.75 0 11-1.414-.38A4.5 4.5 0 0010 5.5a4.5 4.5 0 00-4.5 4.5h2.25l-3 3-3-3H4A6 6 0 014 4z"/>
      </svg>
      <p style="
        font-family:'SF Pro Display',-apple-system,sans-serif;
        font-size:1rem; font-weight:500;
        color:#fff; margin:0; letter-spacing:.02em
      ">Ruota in verticale</p>
    </div>
  `
  document.body.insertBefore(overlay, document.body.firstChild)

  // 2) media‑query listener
  const mql = window.matchMedia('(orientation: landscape) and (max-width: 767px)')
  function sync(e) {
    if (e.matches) {
      // mostra overlay
      overlay.style.display = 'flex'
      // chiedi fullscreen (cancella la UI del browser)
      if (overlay.requestFullscreen) {
        overlay.requestFullscreen().catch(()=>{/* l'utente ha bloccato */})
      }
    } else {
      // nascondi e esci da fullscreen
      overlay.style.display = 'none'
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(()=>{})
      }
    }
  }
  mql.addListener(sync)
  sync(mql)
})()
