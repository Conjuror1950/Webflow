// Player-Video-Il-silenzio-della-natura-mobile.js (modificato)
(function() {
  // 1) INIETTA IL CSS (modificato: niente visibility:hidden di default)
  const css = `
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile:fullscreen,
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile:-webkit-full-screen,
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile:-ms-fullscreen {
  visibility: visible !important;
  opacity:    1         !important;
  transform:  translateY(0) !important;
  background: black    !important;
  z-index:    9999     !important;
  width: 100% !important;
  height: 100% !important;
}

/* video fullscreen */
video:fullscreen,
video:-webkit-full-screen,
video:-ms-fullscreen {
  width:  100% !important;
  height: 100% !important;
  object-fit: contain !important;
  background: black !important;
  z-index: 9999 !important;
}

/* costringi Chrome/Android a mostrare i suoi controlli */
video::-webkit-media-controls,
video::-webkit-media-controls-enclosure {
  display: block !important;
  opacity: 1       !important;
}

/* wrapper: NON usare visibility:hidden qui, usiamo opacity + pointer-events */
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile {
  /* visibility: hidden;  <-- RIMOSSO */
  position: fixed;
  top: 0;
  left: 0;
  width:100vw;
  height:100vh;
  background:black;
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif !important;
  overflow:hidden;
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
  pointer-events: none; /* non cliccabile fino a che non è visibile */
}

/* classe che rendiamo visibile quando apriamo il player */
.visible-player-video-il-silenzio-della-natura-mobile {
  visibility: visible !important;
  opacity: 1 !important;
  transform: translateY(0) !important;
  pointer-events: auto !important;
  z-index: 9999 !important;
}

/* classe temporanea per la chiusura: slide out */
.closing-player-video-il-silenzio-della-natura-mobile {
  visibility: visible !important;
  transform: translateY(100%) !important;
  opacity: 0 !important;
  z-index: 9999;
}

/* stato normale video (non fullscreen) */
video {
  width: 95vw;
  height: 100vh;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

/* fullscreen wrapper > video */
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile:fullscreen video,
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile:-webkit-full-screen video {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  background: black !important;
}

/* preview override (se usata) */
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile:fullscreen .preview-container-player-video-il-silenzio-della-natura-mobile video,
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile:-webkit-full-screen .preview-container-player-video-il-silenzio-della-natura-mobile video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

.close-btn-player-video-il-silenzio-della-natura-mobile {
  background:none;
  margin-top: 0px;
}
`;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  
  // 2) INIETTA L’HTML (uguale)
  const wrapper = document.createElement('div');
  wrapper.className = 'apple-video-wrapper-player-video-il-silenzio-della-natura-mobile';
  wrapper.innerHTML = `
    <video id="apple-video-player-video-il-silenzio-della-natura-mobile" controls controlsList="share" allow="picture-in-picture" x-webkit-airplay="allow" data-no-toggle preload="metadata" crossorigin="anonymous" playsinline webkit-playsinline>
    </video>
    <div id="custom-subtitles-player-video-il-silenzio-della-natura-mobile" class="subtitle-container-player-video-il-silenzio-della-natura-mobile"></div>
    <div class="controls-player-video-il-silenzio-della-natura-mobile">
      <div class="top-bar-player-video-il-silenzio-della-natura-mobile">
        <button class="close-btn-player-video-il-silenzio-della-natura-mobile"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a6e03d818ab9f59079de2_xmark.svg" alt="Close" style="width:24px;height:24px;"></button>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  // ref
  const vid = wrapper.querySelector('video');
  const lightbox = document.getElementById('Open-Player-Video-Il-silenzio-della-natura-container-mobile');

  // OPEN handler: proviamo preferibilmente video.requestFullscreen(), con fallback su wrapper
  lightbox.addEventListener('click', async (e) => {
    e.preventDefault();

    // mostra il wrapper (ma tramite classe, non visibility:hidden)
    wrapper.classList.add('visible-player-video-il-silenzio-della-natura-mobile');

    // prepare video
    vid.controls = true;
    vid.setAttribute('playsinline', '');
    vid.setAttribute('webkit-playsinline', '');
    vid.pause();
    vid.currentTime = 0;

    // applica stile di fallback fino a che non entriamo in fullscreen
    wrapper.style.display = 'block';
    wrapper.style.width = '100vw';
    wrapper.style.height = '100vh';
    wrapper.style.background = 'black';

    vid.style.display = 'block';
    vid.style.width = '100%';
    vid.style.height = '100%';
    vid.style.background = 'black';

    // Prova ad entrare in fullscreen sul video PRIMA (così browser nativi video player possono apparire)
    let entered = false;
    try {
      if (vid.requestFullscreen) {
        await vid.requestFullscreen();
        entered = true;
      } else if (vid.webkitRequestFullscreen) {
        await vid.webkitRequestFullscreen();
        entered = true;
      } else if (vid.msRequestFullscreen) {
        await vid.msRequestFullscreen();
        entered = true;
      }
    } catch (err) {
      console.warn('video.requestFullscreen() failed, fallback al wrapper:', err);
      entered = false;
    }

    // fallback: se non siamo entrati in fullscreen con il video, prova il wrapper
    if (!entered) {
      try {
        if (wrapper.requestFullscreen) {
          await wrapper.requestFullscreen();
        } else if (wrapper.webkitRequestFullscreen) {
          await wrapper.webkitRequestFullscreen();
        } else if (wrapper.msRequestFullscreen) {
          await wrapper.msRequestFullscreen();
        }
      } catch (err) {
        console.warn('wrapper.requestFullscreen() failed:', err);
      }
    }

    // Avvia la riproduzione (autoplay può essere bloccato)
    vid.play().catch(err => console.warn("Autoplay bloccato:", err));
  });

  // CLOSE handler (uguale ma con cleanup orientation)
  const closeBtn = wrapper.querySelector('.close-btn-player-video-il-silenzio-della-natura-mobile');
  closeBtn.addEventListener('click', async () => {
    const video = wrapper.querySelector('video');
    // esci fullscreen se necessario
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('exitFullscreen failed:', err);
    }

    video.pause();
    video.currentTime = 0;

    // animazione slide out
    wrapper.classList.remove('visible-player-video-il-silenzio-della-natura-mobile');
    wrapper.style.visibility = 'visible';
    wrapper.style.transform  = 'translateX(0)';
    wrapper.style.opacity    = '1';
    wrapper.offsetHeight;

    wrapper.classList.add('closing-player-video-il-silenzio-della-natura-mobile');

    // Dopo la transizione, reset
    setTimeout(() => {
      // rimuovo eventuale classe per orientation
      wrapper.classList.remove('force-landscape');

      [lightbox, ...Array.from(document.body.children)
        .filter(el => el !== wrapper)
      ].forEach(el => {
        el.style.display = '';
        el.classList.remove('fade-out');
      });

      wrapper.style.visibility = '';
      wrapper.style.display    = '';
      wrapper.style.transform  = '';
      wrapper.style.opacity    = '';
      wrapper.classList.remove('visible-player-video-il-silenzio-della-natura-mobile', 'closing-player-video-il-silenzio-della-natura-mobile');
    }, 350);
  });

  // 3) CARICA DASH.JS E INIZIALIZZA IL PLAYER (come prima)
  const dashScript = document.createElement('script');
  dashScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/dashjs/5.0.0/legacy/umd/dash.all.min.js';
  dashScript.onload = () => {
    const manifest = 'https://il-silenzio-della-natura-video.netlify.app/manifest.mpd';
    const player = dashjs.MediaPlayer().create();
    player.initialize(vid, manifest, false);
    player.enableText(true);

    window.addEventListener('unhandledrejection', ev => {
      console.warn('Promise non gestita:', ev.reason);
    });

    player.on(dashjs.MediaPlayer.events.ERROR, e => {
      console.error('DASH error', e);
    });

    player.updateSettings({
      streaming: {
        buffer: {
          initialBufferLevel: 20,
          bufferTimeAtTopQuality: 90,
          bufferTimeDefault: 45,
          bufferToKeep: 30,
          longFormContentDurationThreshold: 120
        },
        abr: {
          autoSwitchBitrate: { video: true, audio: true },
          useBufferOccupancyABRStrategy: true,
          abrBola: { bitrateSafetyFactor: 0.90 },
          switchInterval: 10
        },
        http: {
          timeout: 60000,
          enableProgressive: true,
          withCredentials: false,
          retry: { maxAttempts: 4, baseDelay: 500, multiplier: 2 }
        }
      },
      debug: { logLevel: dashjs.Debug.LOG_LEVEL_NONE }
    });
  };
  document.body.appendChild(dashScript);

  // Gestione fullscreenchange: aggiungo classe e provo a lockare orientation
  document.addEventListener('fullscreenchange', async () => {
    const wrapperEl = document.querySelector('.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile');
    if (document.fullscreenElement) {
      wrapperEl.classList.add('fullscreen');

      // Prova a lockare landscape (solo se supportato)
      try {
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('landscape');
          // opzionale: aggiungi una classe per segnare che abbiamo forzato landscape
          wrapperEl.classList.add('force-landscape');
        }
      } catch (err) {
        // non critico: il lock può fallire per permessi o policy del browser
        console.warn('orientation.lock failed:', err);
      }
    } else {
      wrapperEl.classList.remove('fullscreen');

      // sblocca l'orientamento se possibile
      try {
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
      } catch (err) {
        console.warn('orientation.unlock failed:', err);
      }
    }
  });
})();
