(() => {
  const init = () => {
    // --- base styles ---
    const style = document.createElement('style');
    style.textContent = `
      .container {
        width: min(960px, 100%);
        display: none; /* NASCONDI IL PLAYER INIZIALMENTE */
      }
      
      .video-wrap {
        position: relative;
        overflow: hidden;
      }
      video {
        display: block;
        width: 100%;
        height: auto;
        outline: none;
      }
      .controls {
        margin-top: 8px;
        display:flex;
        gap:8px;
        align-items:center;
      }
    `;
    document.head.appendChild(style);

    // --- DOM ---
    const root = document.createElement('div');
    root.className = 'page';
    root.innerHTML = `
      <div class="container" id="videoContainer">
          <div class="video-wrap" id="videoWrap">
            <video id="demoVideo" controls controlsList="share" allow="picture-in-picture" x-webkit-airplay="allow" data-no-toggle preload="metadata" crossorigin="anonymous" playsinline webkit-playsinline>
            </video>
          </div>
      </div>
    `;
    document.body.appendChild(root);

    // --- FUNZIONE PER MOSTRARE IL PLAYER ---
const showPlayer = () => {
  const container = document.getElementById('videoContainer');
  container.style.display = 'block';

  const video = document.getElementById('demoVideo'); // prendi il video
  if (video) {
    video.play().catch(err => console.warn('Autoplay fallito:', err));
  }
};

    // --- COLLEGA IL CLICK DELLA LIGHTBOX ---
    const lightbox = document.getElementById('android');
    if (lightbox) {
      lightbox.addEventListener('click', showPlayer);
    }

    // --- JS behavior (fullscreen, play/pause, mute, ecc.) ---
    const video = document.getElementById('demoVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const fsBtn = document.getElementById('fsBtn');
    const videoWrap = document.getElementById('videoWrap');

    const isFullscreen = () => document.fullscreenElement != null || document.webkitFullscreenElement != null;

    const requestFS = async (el) => {
      if (!el) return;
      if (el.requestFullscreen) return el.requestFullscreen();
      if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
      if (el.msRequestFullscreen) return el.msRequestFullscreen();
    };

    const exitFS = async () => {
      if (document.exitFullscreen) return document.exitFullscreen();
      if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
      if (document.msExitFullscreen) return document.msExitFullscreen();
    };

    async function lockLandscape() {
      if (!('orientation' in screen) || !screen.orientation.lock) return;
      try {
        await screen.orientation.lock('landscape');
      } catch (err) {
        console.warn('Orientation lock non riuscito:', err?.message || err);
      }
    }

    async function goFullscreenLandscape() {
      try {
        await requestFS(videoWrap);
        await lockLandscape();
      } catch (e) {
        console.warn('Impossibile entrare in fullscreen:', e?.message || e);
      }
    }

    ['fullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'].forEach(ev => {
      document.addEventListener(ev, () => {
        if (isFullscreen()) lockLandscape();
      });
    });

    // UI handlers
    const syncPlayState = () => {
      if (playPauseBtn) playPauseBtn.textContent = video.paused ? 'Play' : 'Pause';
    };
    const syncMuteState = () => {
      if (muteBtn) muteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
    };

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        if (video.paused) video.play(); else video.pause();
      });
    }
    if (muteBtn) {
      muteBtn.addEventListener('click', () => { video.muted = !video.muted; syncMuteState(); });
    }
    if (fsBtn) {
      fsBtn.addEventListener('click', goFullscreenLandscape);
    }

    video.addEventListener('play', syncPlayState);
    video.addEventListener('pause', syncPlayState);
    video.addEventListener('volumechange', syncMuteState);

    // Initial labels
    syncPlayState();
    syncMuteState();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // CARICA DASH.JS
  const manifest = 'https://il-silenzio-della-natura-video.netlify.app/manifest.mpd';
  const dashScript = document.createElement('script');
  dashScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/dashjs/5.0.0/legacy/umd/dash.all.min.js';

  const initDashPlayer = () => {
    const videoEl = document.getElementById('demoVideo');
    if (!videoEl) {
      document.addEventListener('DOMContentLoaded', () => initDashPlayer(), { once: true });
      return;
    }
    if (!window.dashjs) {
      console.error('dashjs non trovato dopo il caricamento dello script.');
      return;
    }

    try {
      const player = dashjs.MediaPlayer().create();
      player.initialize(videoEl, manifest, false);
      try { player.enableText(true); } catch (e) { }
      player.on(dashjs.MediaPlayer.events.ERROR, e => console.error('DASH error', e));
      window.addEventListener('unhandledrejection', ev => console.warn('Promise non gestita:', ev.reason));
    } catch (err) {
      console.error('Errore inizializzazione dashjs:', err);
    }
  };

  dashScript.onload = initDashPlayer;
  dashScript.onerror = () => console.error('Errore caricamento dash.all.min.js');
  document.head.appendChild(dashScript);

})();
