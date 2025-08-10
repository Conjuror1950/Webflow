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
}

/* In più, per sicurezza su Android/Chrome, definisci regole anche per il <video> in fullscreen diretto */
video:fullscreen,
video:-webkit-full-screen,
video:-ms-fullscreen {
  width:  100vw !important;
  height: 100vh !important;
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
const lightbox = document.getElementById('Open-Player-Video-Il-silenzio-della-natura-container-mobile');
lightbox.addEventListener('click', e => {
  e.preventDefault();

  // 1) mostra il wrapper
  wrapper.style.display = 'block';
  wrapper.classList.add('visible-player-video-il-silenzio-della-natura-mobile');

  // 2) prendi il video e assicurati degli attributi
  const vid = wrapper.querySelector('video');
  vid.controls = true;
  vid.setAttribute('playsinline', '');
  vid.setAttribute('webkit-playsinline', '');

  // 3) Carica il video dall’inizio
  vid.pause();
  vid.currentTime = 0;

// 4) Entra in fullscreen
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
  // ---- iOS Safari ----
  if (vid.webkitEnterFullscreen) {
    vid.webkitEnterFullscreen();
  }
} else {
  // ---- Android & altri ----
  const wrap = wrapper; // fullscreen sul contenitore, NON sul video
  if (wrap.requestFullscreen) {
    wrap.requestFullscreen();
  } else if (wrap.webkitRequestFullscreen) {
    wrap.webkitRequestFullscreen();
  } else if (wrap.msRequestFullscreen) {
    wrap.msRequestFullscreen();
  }
  
  // forza visibilità e dimensioni del video
  vid.style.display = 'block';
  vid.style.width = '100%';
  vid.style.height = '100%';
  vid.style.background = 'black';
}

  // 5) Avvia la riproduzione
  vid.play().catch(err => console.warn("Autoplay bloccato:", err));
});

  // ——— Chiudi il player tornando allo stato iniziale ———
const closeBtn = wrapper.querySelector('.close-btn-player-video-il-silenzio-della-natura-mobile');
closeBtn.addEventListener('click', () => {
  
  // 1) Se sei in fullscreen, esci prima
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  
  // 1b) Ferma il video e resetta la posizione
  const video = wrapper.querySelector('video');
  video.pause();
  video.currentTime = 0;
  
  // 2) Inizia lo slide‐out da sinistra-destra
  wrapper.classList.remove('visible-player-video-il-silenzio-della-natura-mobile');
 // 2.b) Forza il wrapper a rimanere "visible" e al punto di partenza
 wrapper.style.visibility = 'visible';
 wrapper.style.transform  = 'translateX(0)';
 wrapper.style.opacity    = '1';
 wrapper.offsetHeight; // forzo reflow

 // 2.c) Ora aggiungi la classe che anima lo slide‐out verso destra
 wrapper.classList.add('closing-player-video-il-silenzio-della-natura-mobile');

  // 3) Dopo la transizione, ripristina la pagina
  setTimeout(() => {
    // 0) Rimuovi landscape-forzato
     wrapper.classList.remove('force-landscape');
    // 1) ripristina lightbox e tutti gli altri
     [lightbox, ...Array.from(document.body.children)
       .filter(el => el !== wrapper)
     ].forEach(el => {
      el.style.display = '';
      el.classList.remove('fade-out');
    });

// 3b) Rimuovi ogni inline‐style e resetta la trasformazione
wrapper.style.visibility = '';
wrapper.style.display    = '';
wrapper.style.transform  = '';
wrapper.style.opacity    = '';

// 3c) Rimuovi tutte le classi di show/hide
wrapper.classList.remove('visible-player-video-il-silenzio-della-natura-mobile', 'closing-player-video-il-silenzio-della-natura-mobile');
  }, 350);
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
