// Player-Video-Il-silenzio-della-natura-mobile.js
(function() {
  // 1) INIETTA IL CSS
  const css = `
  /* Nascondi tutti i controlli custom */
.controls-player-video-il-silenzio-della-natura-mobile {
  display: none !important;
}
.center-controls-player-video-il-silenzio-della-natura-mobile,
.top-bar-player-video-il-silenzio-della-natura-mobile,
.bottom-bar-player-video-il-silenzio-della-natura-mobile {
  display: none !important;
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

/* classe temporanea per la chiusura: sposta fuori in basso */
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

.center-controls-player-video-il-silenzio-della-natura-mobile {
  position: absolute !important;
  top: 50%           !important;
  left: 50%          !important;
  transform: translate(-50%, -50%) !important;
  display: flex      !important;
  justify-content: center !important;
  align-items: center    !important;
  gap: 60px;
}
.controls-player-video-il-silenzio-della-natura-mobile {
  position:absolute;
  inset:0;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  padding:24px;
  color:white;
  pointer-events:none;
  transition:opacity .5s;
}
.controls-player-video-il-silenzio-della-natura-mobile.hide {
opacity:0;
}
.controls-player-video-il-silenzio-della-natura-mobile button, .controls-player-video-il-silenzio-della-natura-mobile input, .controls-player-video-il-silenzio-della-natura-mobile select {
  pointer-events:all;
  font-family:inherit;
}
/* top e center unchanged */
.top-bar-player-video-il-silenzio-della-natura-mobile {
display:flex;
justify-content:space-between;
}

/* bottom-bar: colonna, con riga superiore per titolo + controlli */
.bottom-bar-player-video-il-silenzio-della-natura-mobile {
  display:flex;
  flex-direction:column;
  gap:.5rem;
  margin-top:50px;
  color:white;
}
/* nuova riga superiore: titolo e right-controls affiancati */
.bottom-top-row-player-video-il-silenzio-della-natura-mobile {
  position: relative;
  top: 10px;   /* metti qui quanti pixel vuoi spostarlo verso l’alto */
  display: flex;
  flex-wrap: wrap;           /* ← permetti il wrap su più righe */
  justify-content:space-between;
  align-items: flex-start;   /* ← allinea in alto i figli */
}
/* titolo allineato a sinistra, in basso */
.serie-title-player-video-il-silenzio-della-natura-mobile {
  order: 1;           /* ← posa la serie dopo l’episodio */
  flex-basis: auto;   /* ← occupa tutta la riga disponibile */
  margin-right: auto; /* spinge i controlli verso destra */
  margin-top: -2px;
  font-weight:500;
  font-size:14px;
  color: white;
  border: 0.8px solid white; /* ← bordo bianco */
  border-radius:6px;
  padding: 4px 10px;         /* padding verticale e orizzontale */
}
.ep-title-player-video-il-silenzio-della-natura-mobile {
order: 0;           /* prima riga */
flex-basis: 100%;   /* occupa tutta la larghezza: “S1, E1…” su riga a sé */
font-weight:600;
font-size:18px;
margin-bottom: -6px;
color: white;
}

.time-player-video-il-silenzio-della-natura-mobile, .remaining-time-player-video-il-silenzio-della-natura-mobile {
font-size:11px;
color: rgba(211, 211, 211, 0.75);
}

.extras-player-video-il-silenzio-della-natura-mobile {
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif !important;
  display:flex;
  justify-content:space-between;
  font-size:.9rem;
  margin-top: -6px;
}
.close-btn-player-video-il-silenzio-della-natura-mobile {
  background:none;
  margin-top: 0px;
}
/* quando aggiungiamo .hide-cursor sulla wrapper, il cursore scompare */
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile.hide-cursor {
  cursor: none;
}

/* menu a comparsa sotto il bottone */
.lang-menu-player-video-il-silenzio-della-natura-mobile {
  position: absolute;
  right: 80px;
  width: 180px;
  bottom: 70%;
  background: rgba(211, 211, 211, 1);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 20;
}
.lang-item-player-video-il-silenzio-della-natura-mobile {
  background: transparent;
  border: none;
  padding: 0.1rem 0.4rem;
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
  font-weight: 400;
  color:black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.lang-item-player-video-il-silenzio-della-natura-mobile .check {
  display: none;
  margin-left: auto;
}
.lang-item-player-video-il-silenzio-della-natura-mobile.selected .check {
  display: inline;
}

.title-lang-item-player-video-il-silenzio-della-natura-mobile {
  background: transparent;
  border: none;
  padding-top: 0.2rem;   /* mantieni un po’ di spazio sopra */
  padding-bottom: 0rem;   /* dimezza lo spazio sotto */
  font-size: 0.9rem;
  text-align: left;
  cursor: default;
  font-weight: 600;
  color: black;
}
.lang-item-player-video-il-silenzio-della-natura-mobile:not(:last-child) {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.lang-item-player-video-il-silenzio-della-natura-mobile:hover {
  background: rgba(0, 122, 255, 0.80);
  color:white;
}

.share-item-player-video-il-silenzio-della-natura-mobile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;        /* stesso font‑size per entrambe */
  font-weight: 400;
  color: black;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;               /* per far coprire l’hover a tutta larghezza */
  padding: 0.2rem 0.4rem;      /* uguale spazio sopra e sotto, e orizzontale */
}

/* separatore sotto ogni voce tranne l’ultima */
.share-item-player-video-il-silenzio-della-natura-mobile:not(:last-child) {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

/* hover chiaro */
.share-item-player-video-il-silenzio-della-natura-mobile:hover {
  background: rgba(211, 211, 211, 0.50);
  width: 100%;
}

/* --- sottotitoli dropdown --- */
.subs-btn-player-video-il-silenzio-della-natura-mobile {
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
}
.subs-btn-player-video-il-silenzio-della-natura-mobile img {
  pointer-events: none;
  transition: filter 0.3s ease;
}
.subs-btn-player-video-il-silenzio-della-natura-mobile:hover img {
  filter: brightness(1) drop-shadow(0 0 0.5px white);
}
.subs-menu-player-video-il-silenzio-della-natura-mobile {
  position: absolute;
  right: 118px;    /* allinea rispetto al bottone; regola se serve */
  bottom: 70%;
  background: rgba(211,211,211,1);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 20;
  width: 180px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
.title-subs-item-player-video-il-silenzio-della-natura-mobile {
  background: transparent;
  border: none;
  padding-top:    0.2rem;   /* mantieni un po’ di spazio sopra */
  padding-bottom: 0rem;   /* dimezza lo spazio sotto */
  font-size: 0.9rem;
  text-align: left;
  cursor: default;
  font-weight: 600;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subs-item-player-video-il-silenzio-della-natura-mobile {
  background: transparent;
  border: none;
  padding: 0.1rem 0.4rem;
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
  font-weight: 400;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.subs-item-player-video-il-silenzio-della-natura-mobile:not(:last-child) { border-bottom: 1px solid rgba(0,0,0,0.1); }
.subs-item-player-video-il-silenzio-della-natura-mobile:hover { background: rgba(0,122,255,0.8); color: white; }
.subs-item-player-video-il-silenzio-della-natura-mobile .check { display: none; margin-left: auto; }
.subs-item-player-video-il-silenzio-della-natura-mobile.selected .check { display: inline; }

.subtitle-container-player-video-il-silenzio-della-natura-mobile {
  position: absolute;
  bottom: 23%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 4px;
  font-size: 85%;
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif !important;
  padding: 0.8rem 0.3rem;
  opacity: 0;
  transition: opacity 0.4s ease; /* transizione fluida */
  pointer-events: none;
}
.subtitle-container-player-video-il-silenzio-della-natura-mobile.show {
  opacity: 1;
}

/* posiziona l’avviso sopra il titolo e fallo animare come su Apple TV */
.warning-icon-player-video-il-silenzio-della-natura-mobile {
  position: absolute;
  top: 50px;            /* sposta l’avviso in alto rispetto al suo normale flow */
  margin-left: 20px;               /* allineato al bordo sinistro di .bottom-top-row */
  width: 250px;          /* regola a piacere la larghezza */
  opacity: 0;
  animation: warning-fade-player-video-il-silenzio-della-natura-mobile 8s ease-in-out forwards;
  animation-delay: 8s;   /* ← qui metti “x” secondi di delay */
  pointer-events: none;  /* non intercetta click */
  z-index: 5;
}

@keyframes warning-fade-player-video-il-silenzio-della-natura-mobile {
  0%   { opacity: 0; transform: translateY(0px); }
  10%  { opacity: 1; transform: translateY(0); }   /* fade-in in 0.8s */
  80%  { opacity: 1; transform: translateY(0); }   /* resta visibile */
}

/* posiziona l’avviso sopra il titolo e fallo animare come su Apple TV */
.warning-age-player-video-il-silenzio-della-natura-mobile {
  position: absolute;
  top: 60px;            /* sposta l’avviso in alto rispetto al suo normale flow */
  margin-left: 10px;               /* allineato al bordo sinistro di .bottom-top-row */
  width: 80px;          /* regola a piacere la larghezza */
  opacity: 0;
  animation: warning-fade-age-player-video-il-silenzio-della-natura-mobile 5s ease-in-out forwards;
  animation-delay: 2s;   /* ← qui metti “x” secondi di delay */
  pointer-events: none;  /* non intercetta click */
  z-index: 5;
}

@keyframes warning-fade-age-player-video-il-silenzio-della-natura-mobile {
  0%   { opacity: 0; transform: translateY(0px); }
  10%  { opacity: 1; transform: translateY(0); }   /* fade-in in 0.5s */
  50%  { opacity: 1; transform: translateY(0); }   /* resta visibile */
}
  /* reset border-radius per le icone tonde */
  .play-pause-player-video-il-silenzio-della-natura-mobile img,
  .fullscreen-btn-player-video-il-silenzio-della-natura-mobile img,
  .share-menu-player-video-il-silenzio-della-natura-mobile img,
  .subs-btn-player-video-il-silenzio-della-natura-mobile img {
    border-radius: 0 !important;
  }
  
/* — Override dimensione pulsanti skip — */
.center-controls-player-video-il-silenzio-della-natura-mobile .rewind-player-video-il-silenzio-della-natura-mobile img,
.center-controls-player-video-il-silenzio-della-natura-mobile .forward-player-video-il-silenzio-della-natura-mobile img {
  width: 35px !important;
  height: 35px !important;
}

/* Impedisce a rewind, play e forward di ridursi quando il gap aumenta */
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile
  .center-controls-player-video-il-silenzio-della-natura-mobile
  button {
  flex-shrink: 0 !important;
}

/* 1) Ripristina il pannello dei controlli nativi WebKit */
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile video::-webkit-media-controls-panel {
  display: flex !important;
  opacity: 1       !important;
  visibility: visible !important;
}

/* 2) Ripristina i singoli bottoni “play” e “share” */
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile
  video::-webkit-media-controls-play-button,
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile
  video::-webkit-media-controls-overlay-play-button,
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile
  video::-webkit-media-controls-share-button {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* Il video riprende i tocchi, il wrapper non lo copre più */
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile video {
  position: relative;
  z-index: 1;
  pointer-events: auto;
}

/* mostra il pulsante overflow nativo (… ) */
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile
  video::-webkit-media-controls-overflow-button {
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}

/* e il pannello overflow-menu */
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile
  video::-webkit-media-controls-overflow-menu-button {
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}

/* mantieni il pannello nativo accessibile */
.apple-video-wrapper-player-video-il-silenzio-della-natura-mobile {
  pointer-events: auto;
}

`;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  
  // 2) INIETTA L’HTML
  const wrapper = document.createElement('div');
  wrapper.className = 'apple-video-wrapper-player-video-il-silenzio-della-natura-mobile';
  wrapper.innerHTML = `
    <!-- avvisi -->
    <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/68286f66a406b7094b5b2407_avviso%20sequenze%20con%20immagini%20e%20luci%20lampeggianti.png" alt="Avviso: sequenze con immagini e luci lampeggianti" class="warning-icon-player-video-il-silenzio-della-natura-mobile">
    <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/68288c23d64340a80e1a52e1_avviso%20et%C3%A0.png" alt="Avviso: età" class="warning-age-player-video-il-silenzio-della-natura-mobile">
    <video id="apple-video-player-video-il-silenzio-della-natura-mobile" controls webkit-playsinline playsinline preload="metadata" crossorigin="anonymous">
      <track kind="subtitles" label="Italiano (automatico)" srclang="it" src="https://andreaingrassia.netlify.app/assets/subtitles/captions-il-silenzio-della-natura.vtt" default>
    </video>
    <div id="custom-subtitles-player-video-il-silenzio-della-natura-mobile" class="subtitle-container-player-video-il-silenzio-della-natura-mobile"></div>
    <div class="controls-player-video-il-silenzio-della-natura-mobile">
      <div class="top-bar-player-video-il-silenzio-della-natura-mobile">
        <button class="close-btn-player-video-il-silenzio-della-natura-mobile"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a6e03d818ab9f59079de2_xmark.svg" alt="Close" style="width:24px;height:24px;"></button>
        <div class="volume-control-player-video-il-silenzio-della-natura-mobile">
          <img id="volume-icon-player-video-il-silenzio-della-natura-mobile" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681d13cccb3122eb07cc40af_custom.speaker.wave.3.fill.2.2.svg" alt="Volume alto">
        </div>
      </div>
      <div class="center-controls-player-video-il-silenzio-della-natura-mobile">
        <button class="rewind-player-video-il-silenzio-della-natura-mobile"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a5fb8fe6435455d3d98da_10.arrow.trianglehead.counterclockwise.svg" alt="Rewind" "></button>
        <button class="play-pause-player-video-il-silenzio-della-natura-mobile">
          <img class="play-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a7228fdd5352747977676_play.fill.svg" alt="Play">
          <img class="pause-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a722870d098221ad93f47_pause.fill.svg" alt="Pausa" style="display:none;">
        </button>
        <button class="forward-player-video-il-silenzio-della-natura-mobile"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a5fb8f7a09fb00f328afb_10.arrow.trianglehead.clockwise.svg" alt="Forward" "></button>
      </div>
      <div class="bottom-bar-player-video-il-silenzio-della-natura-mobile">
        <div class="bottom-top-row-player-video-il-silenzio-della-natura-mobile">
          <div class="ep-title-player-video-il-silenzio-della-natura-mobile">S1, E1 · Il silenzio della natura</div>
          <div class="right-controls-player-video-il-silenzio-della-natura-mobile">
            <button class="subs-btn-player-video-il-silenzio-della-natura-mobile"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681c881581975b4efc170207_captions.bubble.svg" alt="Sottotitoli" style="width:20px;height:20px;"></button>
            <div class="subs-menu-player-video-il-silenzio-della-natura-mobile" style="display:none;">
              <button class="title-subs-item-player-video-il-silenzio-della-natura-mobile">Sottotitoli</button>
              <button class="subs-item-player-video-il-silenzio-della-natura-mobile" data-val="-1">Disattivati</button>
              <button class="subs-item-player-video-il-silenzio-della-natura-mobile selected" data-val="0">Italiano (automatico)</button>
            </div>
            <button class="lang-btn-player-video-il-silenzio-della-natura-mobile"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681bb7eb7c5e96fc0889f14c_waveform.circle.svg" alt="Lingua" style="width:20px;height:20px;"></button>
            <div class="lang-menu-player-video-il-silenzio-della-natura-mobile" style="display:none;">
              <button class="title-lang-item-player-video-il-silenzio-della-natura-mobile">Audio</button>
              <button class="lang-item-player-video-il-silenzio-della-natura-mobile selected" data-lang="it">Originale: Italiano<span class="check">✓</span></button>
            </div>
            <button class="share-btn-player-video-il-silenzio-della-natura-mobile"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681c7cf63258616ead57cdf0_square.and.arrow.up.svg" alt="Condividi" style="width:18px;height:30px;"></button>
            <div class="share-menu-player-video-il-silenzio-della-natura-mobile" style="display:none;">
              <button class="share-item-player-video-il-silenzio-della-natura-mobile copy-link"><span class="item-text">Copia Link</span><img class="item-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681b6628e632be2dca7bfe8e_link.svg" width="18" height="18" alt="Link"></button>
              <button class="share-item-player-video-il-silenzio-della-natura-mobile email-share"><span class="item-text">Email</span><img class="item-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681b6628ed25af24c9b87b32_envelope.fill.svg" width="18" height="18" alt="Email"></button>
            </div>
          </div>
        </div>
        <div class="progress-wrapper-player-video-il-silenzio-della-natura-mobile">
          <input type="range" class="progress-player-video-il-silenzio-della-natura-mobile" value="0" step="0.1">
          <div class="scrub-thumb-player-video-il-silenzio-della-natura-mobile"></div>
        </div>
        <div class="preview-container-player-video-il-silenzio-della-natura-mobile" hidden>
          <video id="preview-video-player-video-il-silenzio-della-natura-mobile" muted preload="metadata" crossorigin="anonymous"></video>
          <div id="preview-subtitles-player-video-il-silenzio-della-natura-mobile" class="subtitle-container-player-video-il-silenzio-della-natura-mobile"></div>
          <div class="preview-time-player-video-il-silenzio-della-natura-mobile">0:00</div>
        </div>
        <div class="extras-player-video-il-silenzio-della-natura-mobile"><span class="time-player-video-il-silenzio-della-natura-mobile">0:00</span><span class="remaining-time-player-video-il-silenzio-della-natura-mobile">-0:00</span></div>
        <div class="serie-title-player-video-il-silenzio-della-natura-mobile">Produzioni Cinematografiche</div>
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
// 1. Click su Lightbox per mostrare il player
lightbox.addEventListener('click', () => {
  wrapper.style.display = 'block';

  const vid = wrapper.querySelector('video');

  // Vai fullscreen subito dopo il click
  if (vid.requestFullscreen) vid.requestFullscreen();
  else if (vid.webkitRequestFullscreen) vid.webkitRequestFullscreen();
  else if (vid.msRequestFullscreen) vid.msRequestFullscreen();

  // Play il video
  vid.play().catch(err => {
    console.warn("Autoplay bloccato dal browser:", err);
  });
});

// 2. Quando esci dal fullscreen (ESC, swipe, chiusura manuale)
function exitFullscreenHandler() {
  const isFullscreen = !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );

  if (!isFullscreen) {
    wrapper.style.display = 'none';
  }
}

// 3. Eventi per tutti i browser
document.addEventListener('fullscreenchange', exitFullscreenHandler);
document.addEventListener('webkitfullscreenchange', exitFullscreenHandler);
document.addEventListener('msfullscreenchange', exitFullscreenHandler);

  // 1) mostra immediatamente il wrapper
  wrapper.style.display = 'block';

  // 2) prendi il video
  const vid = wrapper.querySelector('video');

  // su iOS Safari: usa solo webkitEnterFullscreen
  if (vid.webkitEnterFullscreen) {
    vid.webkitEnterFullscreen();
  }
  // altrove (desktop) puoi ricadere sul fallback standard
  else if (vid.requestFullscreen) {
    vid.requestFullscreen();
  }

  // 4) parti col video da inzio
  vid.pause();
  vid.currentTime = 0;
  vid.play();
});

  // 2) IMPOSTO IMMEDIATAMENTE IL MENU LINGUA
const shareMenu = document.querySelector('.share-menu-player-video-il-silenzio-della-natura-mobile');
const subsMenu  = document.querySelector('.subs-menu-player-video-il-silenzio-della-natura-mobile');
const langBtn   = document.querySelector('.lang-btn-player-video-il-silenzio-della-natura-mobile');
const langMenu  = document.querySelector('.lang-menu-player-video-il-silenzio-della-natura-mobile');

// crea le spunte e seleziona Italiano di default
langMenu
  .querySelectorAll('.lang-item-player-video-il-silenzio-della-natura-mobile')
  .forEach(item => {
    if (!item.querySelector('.check')) {
      const chk = document.createElement('span');
      chk.classList.add('check');
      chk.textContent = '✓';
      item.appendChild(chk);
    }
    if (item.dataset.lang === 'it') {
      item.classList.add('selected');
      document.documentElement.lang = 'it';
    }
  });

// apri/chiudi menu lingua
langBtn.addEventListener('click', e => {
  e.stopPropagation();
  shareMenu.style.display = 'none';
  subsMenu.style.display  = 'none';
  langMenu.style.display  = langMenu.style.display === 'flex' ? 'none' : 'flex';
});

// chiudi tutti i menu al click fuori
document.addEventListener('click', () => {
  shareMenu.style.display = 'none';
  subsMenu.style.display  = 'none';
  langMenu.style.display  = 'none';
});

// seleziona la lingua e chiudi
langMenu
  .querySelectorAll('.lang-item-player-video-il-silenzio-della-natura-mobile')
  .forEach(item => {
    item.addEventListener('click', () => {
      const newLang = item.dataset.lang;
      document.documentElement.lang = newLang;
      langBtn.title = newLang === 'it' ? 'Italiano' : 'English';
      langMenu.style.display = 'none';
    });
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

    player.setTextTrack(0); // <--- FORZA i sottotitoli Italiani attivi

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
    

 // copia link negli appunti
 copyLinkBtn.addEventListener('click', async () => {
   try {
     await navigator.clipboard.writeText(location.href);
     copyLinkBtn.textContent = 'Link copiato ✓';
   } catch {
     alert('Impossibile copiare il link');
   }
   // chiudi dopo un attimo
   setTimeout(() => shareMenu.style.display = 'none', 1000);
 });
    
// email share
emailBtn.addEventListener('click', () => {
  const subject = encodeURIComponent(document.title);
  const body    = encodeURIComponent(`Guarda qui: ${location.href}`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
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
