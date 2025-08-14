/* Player di prova*/
(() => {
  const init = () => {
    // --- <head> essentials ---
    const metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    document.head.appendChild(metaViewport);

    // --- base styles ---
    const style = document.createElement('style');
    style.textContent = `
      .container {
      width: min(960px, 100%);
      }
      
      .card {
      padding: 16px;
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
      
    `;
    document.head.appendChild(style);

    // --- DOM ---
    const root = document.createElement('div');
    root.className = 'page';
    root.innerHTML = `
      <div class="container">
        <section class="card">
          <div class="video-wrap" id="videoWrap">
            <video id="demoVideo" controls playsinline preload="metadata" poster="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.jpg">
              <!-- Sostituisci l'SRC con il tuo file su GitHub/Netlify se vuoi -->
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Il tuo browser non supporta il tag video. Puoi <a href="https://www.w3schools.com/html/mov_bbb.mp4">scaricare il file</a>.
            </video>
          </div>
      </div>
    `;

    document.body.appendChild(root);

    // --- JS behavior ---
    const video = document.getElementById('demoVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const fsBtn = document.getElementById('fsBtn');
    const videoWrap = document.getElementById('videoWrap');

    const isFullscreen = () => document.fullscreenElement != null || document.webkitFullscreenElement != null;

    const requestFS = async (el) => {
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
        // Molti browser richiedono l'FS prima del lock o possono rifiutare.
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

    // Re-prova il lock quando cambia lo stato del fullscreen
    ['fullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'].forEach(ev => {
      document.addEventListener(ev, () => {
        if (isFullscreen()) {
          lockLandscape();
        }
      });
    });

    // UI handlers
    const syncPlayState = () => {
      playPauseBtn.textContent = video.paused ? 'Play' : 'Pause';
    };
    const syncMuteState = () => {
      muteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
    };

    playPauseBtn.addEventListener('click', () => {
      if (video.paused) video.play(); else video.pause();
    });
    muteBtn.addEventListener('click', () => { video.muted = !video.muted; syncMuteState(); });
    fsBtn.addEventListener('click', goFullscreenLandscape);

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
})();
