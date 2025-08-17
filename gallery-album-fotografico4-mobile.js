/* Player DASH minimal */
(() => {
  const init = () => {
    // --- base styles ---
    const style = document.createElement('style');
    style.textContent = `
      .container { width: min(960px, 100%); }
      .card { padding: 16px; }
      .video-wrap { position: relative; overflow: hidden; }
      video { display: block; width: 100%; height: auto; outline: none; }
    `;
    document.head.appendChild(style);

    // --- DOM ---
    const root = document.createElement('div');
    root.className = 'page';
    root.innerHTML = `
      <div class="container">
        <section class="card">
          <div class="video-wrap" id="videoWrap">
            <video id="demoVideo" controls controlsList="nodownload" allow="picture-in-picture" x-webkit-airplay="allow" preload="metadata" crossorigin="anonymous" playsinline webkit-playsinline poster="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.jpg">
            </video>
          </div>
        </section>
      </div>
    `;
    document.body.appendChild(root);
  };

  // Inizializza DOM quando pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ---------------------------
  // CARICA DASH.JS E INIZIALIZZA
  // ---------------------------
  const manifest = 'https://il-silenzio-della-natura-video.netlify.app/manifest.mpd'; // <--- cambia con il tuo
  const dashScript = document.createElement('script');
  dashScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/dashjs/5.0.0/legacy/umd/dash.all.min.js';

  const initDashPlayer = () => {
    const videoEl = document.getElementById('demoVideo');
    if (!videoEl || !window.dashjs) return;

    try {
      const player = dashjs.MediaPlayer().create();
      player.initialize(videoEl, manifest, false); // false = non autoplay
      try { player.enableText(true); } catch (e) { /* ignore se non disponibile */ }

      player.on(dashjs.MediaPlayer.events.ERROR, e => {
        console.error('DASH error', e);
      });

      window.addEventListener('unhandledrejection', ev => {
        console.warn('Promise non gestita:', ev.reason);
      });
    } catch (err) {
      console.error('Errore inizializzazione dashjs:', err);
    }
  };

  dashScript.onload = initDashPlayer;
  dashScript.onerror = () => console.error('Errore caricamento dash.all.min.js');
  document.head.appendChild(dashScript);

})();
