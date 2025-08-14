// Player-Video-Il-silenzio-della-natura-mobile.js
(function() {
  // 1) INIETTA IL CSS
  const css = `

/* Quando il wrapper è in fullscreen (standard, WebKit, MS) */
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

/* In più, per sicurezza su Android/Chrome, definisci regole anche per il <video> in fullscreen diretto */
video:fullscreen,
video:-webkit-full-screen,
video:-ms-fullscreen {
  width:  100% !important;
  height: 100% !important;
  object-fit: contain !important;
  background: black !important;
  z-index: 9999 !important;        /* FORZA il video sopra tutto */
}

/* costringi Chrome/Android a mostrare i suoi controlli */
video::-webkit-media-controls,
video::-webkit-media-controls-enclosure {
  display: block !important;
  opacity: 1       !important;
}

.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile {
  visibility: hidden;          /* non cattura click quando nascosto */
  position: fixed;       /* fissa il wrapper al viewport */
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
}

/* classe temporanea per la chiusura: sposta fuori a destra */
.closing-player-video-il-silenzio-della-natura-mobile {
  visibility: visible !important;
  transform: translateY(100%) !important;
  opacity: 0 !important;
  z-index: 9999; /* se serve “sovrapporre” tutti gli altri elementi */
}

/* Elementi da nascondere: fade-out (disattivato)*/
/*
body > *:not(.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile) {
  transition: opacity 0.35s ease-in-out;
}
*/

/* classe che applicheremo in JS per far sparire gli altri (disattivato) */
/*
.fade-out {
  opacity: 0 !important;
}
*/

/* 1) STATO NORMALE: video “contenuto” e centrato */
video {
  width: 95vw;       /* o la larghezza desiderata quando NON è fullscreen */
  height: 100vh;      /* mantiene l’aspetto originale */
  object-fit: contain; /* evita crop, show letter‑box se serve */
  display: block;
  margin: 0 auto;    /* centra orizzontalmente */
}

/* GLOBAL: sia standard che WebKit fullscreen */
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile:fullscreen video,
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile:-webkit-full-screen video {
  width: 100%    !important;
  height: 100%   !important;
  object-fit: contain !important;  /* mantieni l’intero frame con bande nere */
  background: black !important;    /* fallback “letter-box” nero */
}

/* --- override per la preview quando il wrapper è in fullscreen --- */
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile:fullscreen .preview-container-player-video-il-silenzio-della-natura-mobile video,
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile:-webkit-full-screen .preview-container-player-video-il-silenzio-della-natura-mobile video {
  width: 100% !important;       /* piena larghezza del container di preview */
  height: 100% !important;      /* piena altezza del container di preview */
  object-fit: cover !important;/* mantieni l’aspetto, niente crop */
}

.close-btn-player-video-il-silenzio-della-natura-mobile {
  background:none;
  margin-top: 0px;
}

`;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  
  // 2) INIETTA L’HTML
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
    // appendo dentro il tuo Div di Webflow
   document.body.appendChild(wrapper);

// Javascript (JS) 
// ——— Lightbox → apri player in fullscreen e play ———
lightbox.addEventListener('click', async e => {
  e.preventDefault();

  // 1) mostra il wrapper visivamente
  wrapper.style.display = 'block';
  wrapper.classList.add('visible-player-video-il-silenzio-della-natura-mobile');

  // 2) prendi il video e assicurati degli attributi di base
  const vid = wrapper.querySelector('video');
  vid.controls = true;

  // keep playsinline for normal inline playback, but remove it temporarily
  // when attempting native fullscreen on Android so browser can use native fullscreen.
  const hadPlaysInline = vid.hasAttribute('playsinline') || vid.hasAttribute('webkit-playsinline');
  if (hadPlaysInline) {
    vid.removeAttribute('playsinline');
    vid.removeAttribute('webkit-playsinline');
  }

  // 3) Carica il video dall’inizio
  try {
    vid.pause();
    vid.currentTime = 0;
  } catch (err) {
    console.warn('Non ho potuto resettare il video', err);
  }

  // helper: prova a mettere in fullscreen il video (nativo) e ritorna l'elemento fullscreen
  async function tryVideoFullscreen() {
    // preferisci la chiamata con opzioni se supportata (navigationUI possibile su Chrome)
    const req = vid.requestFullscreen?.bind(vid) ||
                vid.webkitRequestFullscreen?.bind(vid) ||
                vid.msRequestFullscreen?.bind(vid);

    if (!req) throw new Error('No requestFullscreen sul video');

    // alcune implementazioni accettano options: { navigationUI: 'hide' }
    try {
      const maybePromise = req({ navigationUI: 'hide' });
      if (maybePromise && typeof maybePromise.then === 'function') {
        await maybePromise;
      }
      return;
    } catch (err) {
      // se il browser non accetta options, prova senza
      try {
        const req2 = vid.requestFullscreen?.bind(vid) ||
                     vid.webkitRequestFullscreen?.bind(vid) ||
                     vid.msRequestFullscreen?.bind(vid);
        const mp = req2();
        if (mp && typeof mp.then === 'function') await mp;
        return;
      } catch (err2) {
        throw err2 || err;
      }
    }
  }

  // prova il fullscreen nativo del video, ma se dopo breve timeout non si vede
  // fallback al wrapper fullscreen.
  let usedWrapperFallback = false;
  try {
    // prova video.requestFullscreen
    await Promise.race([
      (async () => { await tryVideoFullscreen(); })(),
      new Promise((_, rej) => setTimeout(() => rej(new Error('video fullscreen timeout')), 600) )
    ]);
    // ora aspetta un piccolo istante per verificare che il video stia effettivamente rendendo (non solo audio)
    await new Promise(res => setTimeout(res, 140));
    // check: se il video non ha dimensioni visibili, considera fallback
    const vb = vid.videoWidth, vh = vid.videoHeight;
    const rect = vid.getBoundingClientRect();
    const visible = vb > 0 && vh > 0 && rect.width > 10 && rect.height > 10;
    if (!visible) throw new Error('video non visibile dopo video.requestFullscreen');
  } catch (err) {
    // fallback: entra in fullscreen sul wrapper (approccio stabile)
    usedWrapperFallback = true;
    try {
      const reqW = wrapper.requestFullscreen?.bind(wrapper) ||
                   wrapper.webkitRequestFullscreen?.bind(wrapper) ||
                   wrapper.msRequestFullscreen?.bind(wrapper);
      if (reqW) {
        const mp = reqW();
        if (mp && typeof mp.then === 'function') await mp;
      } else {
        // se nemmeno wrapper ha request, forziamo visualmente
        console.warn('Nessun requestFullscreen disponibile, forzando visuale CSS');
      }
      // assicurati che il wrapper prenda le dimensioni giuste
      wrapper.style.display = 'block';
      wrapper.style.width = '100vw';
      wrapper.style.height = '100vh';
      wrapper.style.visibility = 'visible';
      wrapper.style.opacity = '1';
      wrapper.style.transform = 'translateY(0)';

      vid.style.display = 'block';
      vid.style.width = '100%';
      vid.style.height = '100%';
      vid.style.background = 'black';
    } catch (err2) {
      console.warn('Fallback wrapper fullscreen fallito', err2);
    }
  }

  // 5) Avvia la riproduzione (autoplay può fallire)
  vid.play().catch(err => console.warn("Autoplay bloccato:", err));

  // se siamo su Android e la lock è supportata, la gestiamo nel listener fullscreenchange
  // (vedi listener sotto)
});

// --- AGGIORNA IL listener fullscreenchange per gestire orientation lock e playsinline restore ---
document.addEventListener('fullscreenchange', async () => {
  const wrapperEl = document.querySelector('.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile');
  const vid = wrapperEl.querySelector('video');

  if (document.fullscreenElement) {
    wrapperEl.classList.add('fullscreen');

    // Prova a lockare l'orientamento (solo se supportato)
    if (screen.orientation && screen.orientation.lock) {
      try {
        // molte volte i player preferiscono landscape for video a schermo intero
        await screen.orientation.lock('landscape');
      } catch (err) {
        console.warn('Orientation lock non riuscito:', err);
      }
    }

    // Rimuovi eventuale attribute playsinline se ci troviamo in fullscreen nativo (già fatto prima),
    // ma se siamo entrati in fullscreen sul wrapper vogliamo mantenere playsinline per il ritorno
    // (non facciamo nulla qui).
  } else {
    // uscita dal fullscreen
    wrapperEl.classList.remove('fullscreen');

    // ripristina playsinline per il comportamento inline
    try {
      if (!vid.hasAttribute('playsinline')) {
        vid.setAttribute('playsinline', '');
      }
      if (!vid.hasAttribute('webkit-playsinline')) {
        vid.setAttribute('webkit-playsinline', '');
      }
    } catch (err) {
      // noop
    }

    // sblocca l'orientamento se possibile
    try {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      } else if (screen.unlockOrientation) {
        // vecchie API
        screen.unlockOrientation();
      }
    } catch (err) {
      console.warn('Orientation unlock non riuscito:', err);
    }
  }
});

// --- opzionale: ascolta errori di fullscreen e forza fallback se succede qualcosa ---
document.addEventListener('fullscreenerror', () => {
  console.warn('fullscreenerror fired — forzo il wrapper come fallback');
  if (!document.fullscreenElement) {
    try {
      const reqW = wrapper.requestFullscreen?.bind(wrapper) ||
                   wrapper.webkitRequestFullscreen?.bind(wrapper) ||
                   wrapper.msRequestFullscreen?.bind(wrapper);
      if (reqW) reqW();
    } catch (err) { /* noop */ }
  }
});
  
  // 3) CARICA DASH.JS E INIZIALIZZA IL PLAYER
  const dashScript = document.createElement('script');
  dashScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/dashjs/5.0.0/legacy/umd/dash.all.min.js';
  dashScript.onload = () => {
    /* Video .mp4 in formato dash */
    // ora il manifest contiene più Representation (4K,1080p,720p,...)
    const manifest = 'https://il-silenzio-della-natura-video.netlify.app/manifest.mpd';
    const video = document.getElementById('apple-video-player-video-il-silenzio-della-natura-mobile');
    const player = dashjs.MediaPlayer().create();
    // inizializza e carica il manifest
    player.initialize(video, manifest, false);
    player.enableText(true);

  // player.attachSource(manifest);
  window.addEventListener('unhandledrejection', ev => {
  console.warn('Promise non gestita:', ev.reason);
});

  player.on(dashjs.MediaPlayer.events.ERROR, e => {
    console.error('DASH error', e);
  });
  
 // ↓↓↓ personalizzo il buffer e le impostazioni HTTP di dash.js
player.updateSettings({
  streaming: {
    // ★ BUFFERING ★
    buffer: {
      // Carica più “cuscinetto” prima di partire
      initialBufferLevel: 20,        // da 15 → 20 s
      // Mantieni un lungo buffer in qualità top
      bufferTimeAtTopQuality: 90,    // da 60 → 90 s
      // Mantieni un buffer generale consistente
      bufferTimeDefault: 45,         // da 30 → 45 s
      // Non scendere mai sotto
      bufferToKeep: 30,              // da 20 → 30 s
      // Quando il video è lungo, mantieni la logica “long form”
      longFormContentDurationThreshold: 120
    },

    // ★ ADAPTIVE BITRATE (ABR) ★
    abr: {
      autoSwitchBitrate: { video: true, audio: true },
      // usa la strategia basata sul buffer
      useBufferOccupancyABRStrategy: true,
      // più “comfort” tra i cambi di qualità
      abrBola: { bitrateSafetyFactor: 0.90 },  // usa il 90% della banda stimata
      // intervallo min. tra due switch
      switchInterval: 10                    // da 8 → 10 s
    },

    // ★ HTTP / RETRY ★
    http: {
      timeout: 60000,
      enableProgressive: true,
      withCredentials: false,
      retry: { maxAttempts: 4, baseDelay: 500, multiplier: 2 }  // un tentativo in più
    }
  },
  debug: { logLevel: dashjs.Debug.LOG_LEVEL_NONE }
});
 
  //-----   
  function formatTime(s) {
    const m=Math.floor(s/60), sec=Math.floor(s%60).toString().padStart(2,'0');
    return `${m}:${sec}`;
  }

document.addEventListener('fullscreenchange', () => {
  const wrapper = document.querySelector('.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile');
  if (document.fullscreenElement) {
    wrapper.classList.add('fullscreen');
  } else {
    wrapper.classList.remove('fullscreen');
  }
});
  };  
  document.body.appendChild(dashScript);
})();
