// Player-Video-Il-silenzio-della-natura-desktop.js

/**
 * Inizializza il player video “Il silenzio della natura” in un contenitore.
 * @param {string} containerSelector - selettore CSS del nodo in cui montare il player
 */
<div id="Player-Video-Il-silenzio-della-natura-container-desktop"></div>
<script type="module">
  import { initVideoPlayer } from './Player-Video-Il-silenzio-della-natura-desktop.js';
  document.addEventListener('DOMContentLoaded', () => {
    initVideoPlayer('#Player-Video-Il-silenzio-della-natura-container-desktop');
  });
</script>
export function initVideoPlayer(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.warn(`Container "${containerSelector}" non trovato.`);
    return;
  }

  container.innerHTML = `
    <!-- HTML -->
    <div class="apple-video-wrapper">
      <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/68286f66a406b7094b5b2407_avviso%20sequenze%20con%20immagini%20e%20luci%20lampeggianti.png"
           alt="Avviso: sequenze con immagini e luci lampeggianti"
           class="warning-icon">
      <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/68288c23d64340a80e1a52e1_avviso%20et%C3%A0.png"
           alt="Avviso: età"
           class="warning-age">
      <video id="apple-video" preload="metadata" crossorigin="anonymous" autoplay playsinline>
        <track kind="subtitles" label="Italiano (automatico)" srclang="it"
               src="https://andreaingrassia.netlify.app/assets/subtitles/captions-il-silenzio-della-natura.vtt">
      </video>
      <div id="custom-subtitles" class="subtitle-container"></div>
      <div class="controls">
        <div class="top-bar">
          <button class="close-btn">
            <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a6e03d818ab9f59079de2_xmark.svg"
                 alt="Close" class="close-btn" style="width:18px; height:18px;">
          </button>
          <div class="volume-control">
            <input type="range" class="volume" min="0" max="1" step="0.01" value="1">
            <img id="volume-icon"
                 src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681d13cccb3122eb07cc40af_custom.speaker.wave.3.fill.2.2.svg"
                 alt="Volume alto">
          </div>
        </div>
        <div class="center-controls">
          <button class="rewind"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a5fb8fe6435455d3d98da_10.arrow.trianglehead.counterclockwise.svg"
                                      alt="Rewind 10"></button>
          <button class="play-pause">
            <img class="play-icon"
                 src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a7228fdd5352747977676_play.fill.svg"
                 alt="Play">
            <img class="pause-icon"
                 src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a722870d098221ad93f47_pause.fill.svg"
                 alt="Pausa" style="display:none;">
          </button>
          <button class="forward"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a5fb8f7a09fb00f328afb_10.arrow.trianglehead.clockwise.svg"
                                       alt="Forward 10"></button>
        </div>
        <div class="bottom-bar">
          <div class="bottom-top-row">
            <div class="ep-title">S1, E1 · Il silenzio della natura</div>
            <div class="serie-title">Produzioni Cinematografiche</div>
            <div class="right-controls">
              <button class="subs-btn">
                <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681c881581975b4efc170207_captions.bubble.svg"
                     alt="Sottotitoli">
              </button>
              <div class="subs-menu" style="display:none;">
                <button class="title-subs-item">Sottotitoli</button>
                <button class="subs-item" data-val="-1">Disattivati</button>
                <button class="subs-item selected" data-val="0">Italiano (automatico)</button>
              </div>
              <button class="lang-btn">
                <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681bb7eb7c5e96fc0889f14c_waveform.circle.svg"
                     alt="Lingua" class="lang-icon">
              </button>
              <div class="lang-menu" style="display:none;">
                <button class="title-lang-item">Audio</button>
                <button class="lang-item selected" data-lang="it">Originale: Italiano<span class="check">✓</span></button>
              </div>
              <button class="share-btn">
                <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681c7cf63258616ead57cdf0_square.and.arrow.up.svg"
                     alt="Condividi" class="share-icon">
              </button>
              <div class="share-menu" style="display:none;">
                <button class="share-item copy-link">
                  <span class="item-text">Copia Link</span>
                  <img class="item-icon"
                       src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681b6628e632be2dca7bfe8e_link.svg"
                       alt="Link Icon">
                </button>
                <button class="share-item email-share">
                  <span class="item-text">Email</span>
                  <img class="item-icon"
                       src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681b6628ed25af24c9b87b32_envelope.fill.svg"
                       alt="Email Icon">
                </button>
              </div>
              <button class="fullscreen-btn">
                <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a6105f7d436f1d44084d0_arrow.up.backward.and.arrow.down.forward.svg"
                     alt="Fullscreen" class="fullscreen-icon">
              </button>
            </div>
          </div>
          <div class="progress-wrapper">
            <input type="range" class="progress" value="0" step="0.1">
            <div class="scrub-thumb"></div>
          </div>
          <div class="preview-container" style="display:none;">
            <video id="preview-video" muted preload="metadata" crossorigin="anonymous"></video>
            <div id="preview-subtitles" class="subtitle-container"></div>
            <div class="preview-time">0:00</div>
          </div>
          <div class="extras">
            <span class="time">0:00</span>
            <span class="remaining-time">-0:00</span>
          </div>
        </div>
      </div>
    </div>

    <!-- CSS -->
    <style>
.apple-video-wrapper {
  position:relative;
  width:100vw;
  height:100vh;
  background:black;
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif !important;
  overflow:hidden;
}
/* 1) STATO NORMALE: video “contenuto” e centrato */
video {
  width: 95vw;       /* o la larghezza desiderata quando NON è fullscreen */
  height: 100vh;      /* mantiene l’aspetto originale */
  object-fit: contain; /* evita crop, show letter‑box se serve */
  display: block;
  margin: 0 auto;    /* centra orizzontalmente */
}

/* GLOBAL: sia standard che WebKit fullscreen */
.apple-video-wrapper:fullscreen video,
.apple-video-wrapper:-webkit-full-screen video {
  width: 100%    !important;
  height: 100%   !important;
  object-fit: contain !important;  /* mantieni l’intero frame con bande nere */
  background: black !important;    /* fallback “letter-box” nero */
}


/* --- override per la preview quando il wrapper è in fullscreen --- */
.apple-video-wrapper:fullscreen .preview-container video,
.apple-video-wrapper:-webkit-full-screen .preview-container video {
  width: 100% !important;       /* piena larghezza del container di preview */
  height: 100% !important;      /* piena altezza del container di preview */
  object-fit: cover !important;/* mantieni l’aspetto, niente crop */
}

.preview-container {
  position: absolute;
  bottom: 70px;               /* sopra la barra dei controlli */
  width: 402px;               /* dimensione anteprima */
  height: 220px;
  overflow: hidden;
  border: 0.1px solid rgba(255,255,255,0.2);
  background: black;
  pointer-events: none;       /* non cattura il mouse */
  border-radius: 10px;
}
#preview-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 1) il pallino bianco che segue il mouse */
.scrub-thumb {
  position: absolute;
  margin-top: -11px;               /* allinea verticalmente al centro della track */
  width: 11px;
  height: 11px;
  background: white;
  border-radius: 50%;
  transform: translateX(-50%);
  display: none;            /* mostrato via JS solo on‐hover */
  z-index: 2;
}

.preview-time {
  position: absolute;
  bottom: 2px;
  width: 100%;
  text-align: center;
  font-size: 11px;
  color: white;
  text-shadow: 0 0 4px rgba(0,0,0,0.8);
  pointer-events: none;
}

.controls {
  position:absolute;
  inset:0;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  padding:2rem;
  color:white;
  pointer-events:none;
  transition:opacity .5s;
}
.controls.hide {
opacity:0;
}
.controls button, .controls input, .controls select {
  pointer-events:all;
  font-family:inherit;
}
/* top e center unchanged */
.top-bar {
display:flex;
justify-content:space-between;
}
/* rendi il volume‐slider simile alla progress‐bar */
/* ---- sostituisci interamente questa regola ---- */
.volume {
  -webkit-appearance: none;
  appearance: none;
  width: 100px;
  height: 5px;                     /* stessa altezza di .progress */
  background: rgba(255,255,255,0.1);/* stesso “track vuoto” di .progress */
  border-radius: 6px;              /* stesso border‑radius di .progress */
  margin-top: -10px;
}

/* track “riempita” e “vuota” nei diversi engine */
.volume::-webkit-slider-runnable-track {
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}
.volume::-moz-range-track {
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}
.volume::-ms-track {
  height: 4px;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
.volume::-ms-fill-lower {
  background: white;   /* parte “riempita” MS */
  border-radius: 2px;
}
.volume::-ms-fill-upper {
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}

/* thumb tondo bianco */
.volume::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: white;
  margin-top: -3px;    /* centra il thumb */
  cursor: pointer;
}
.volume::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

.volume-control {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

#volume-icon {
  width: 22px;
  height: 22px;
  margin-top: -10px;
  cursor: pointer;
  pointer-events: all;
}

.center-controls {
  display:flex;
  justify-content:center;
  gap:2rem;
  position: absolute;    /* lo porta fuori dal flow flex standard */
  top: 50%;              /* metà altezza del wrapper */
  left: 50%;             /* metà larghezza (se ti serve orizzontalmente) */
  transform: translate(-50%, -50%);
  /* se non vuoi centrarlo orizzontalmente puoi omettere left/translateX */
}
.center-controls button {
  background:none;
  border:none;
  color:white;
  font-size:1.5rem;
}
/* aggiungi subito dopo .center-controls button { … } */
.play-pause {
  position: relative;      /* contenitore per le icone */
  width: 50px;             /* fissa la larghezza */
  height: 50px;            /* e l’altezza */
  padding: 0;              /* togli padding extra */
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  margin: 0 0.8rem;   /* ← opzionale: margine orizzontale attorno al play */
}

.play-pause .play-icon,
.play-pause .pause-icon {
  position: absolute;      /* sovrapponi le due img */
  top: 0;
  left: 0;
  width: 100%;             /* occupino l’intero contenitore */
  height: 100%;
}
.skip-value {
font-size:.75rem;
margin:0 .2rem; }

/* ← Mouse hover on center controls */
.center-controls {
  display:flex;
  justify-content:center;
  gap:2rem;
}

/* aggiungi da qui */
.center-controls button img {
  transition: filter 0.3s ease;
}

/* su hover rendi l’icona bianca e con un leggero bagliore */
.center-controls .rewind:hover img,
.center-controls .forward:hover img {
  filter: brightness(1) drop-shadow(0 0 0.8px white);
}

/* bottom-bar: colonna, con riga superiore per titolo + controlli */
.bottom-bar {
  display:flex;
  flex-direction:column;
  gap:.5rem;
  margin-top:50px;
  color:white;
}
/* nuova riga superiore: titolo e right-controls affiancati */
.bottom-top-row {
  position: relative;
  top: 1px;   /* metti qui quanti pixel vuoi spostarlo verso l’alto */
  display: flex;
  flex-wrap: wrap;           /* ← permetti il wrap su più righe */
  justify-content:space-between;
  align-items: flex-start;   /* ← allinea in alto i figli */
}
/* titolo allineato a sinistra */
.serie-title {
  order: 1;           /* ← posa la serie dopo l’episodio */
  flex-basis: auto;   /* ← occupa tutta la riga disponibile */
  margin-right: auto; /* spinge i controlli verso destra */
  margin-top: 10px;
  font-weight:600;
  font-size:24px;
  color: white;
}
.ep-title {
order: 0;           /* prima riga */
flex-basis: 100%;   /* occupa tutta la larghezza: “S1, E1…” su riga a sé */
font-weight:400;
font-size:15px;
margin-bottom: -2px;
color: rgba(211, 211, 211, 0.90);
}
.time, .remaining-time {
font-size:11px;
color: rgba(211, 211, 211, 0.75);
}
/* i controlli restano a destra */
.right-controls {
order: 2;           /* dopo serie-title */
align-self: center; /* centra verticalmente i pulsanti rispetto al testo “Produzioni Cinematografiche” */
display:flex;
gap:.4rem;
justify-content:flex-end;
}
.subs-select, .audio-select {
  background:rgba(255,255,255,.1);
  color:white;
  border:none;
  padding:.2rem;
}
.fullscreen-btn, .share-btn {
  background:none;
  border:none;
  color:white;
  font-size:1.2rem;
}
.progress {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 5px;
  background: rgba(255,255,255,0.1);    /* track vuoto */
  border-radius: 2px;
  cursor: pointer;
  /* ——— due background-layer ——— */
  /* 1° layer = played (white) */
  /* 2° layer = buffered (light gray) */
  background-image:
    linear-gradient(white, white),
    linear-gradient(rgba(134, 134, 139, 0.7), rgba(134, 134, 139, 0.7));
  background-repeat: no-repeat, no-repeat;
  /* inizialmente niente fill */
  background-size: 0% 100%, 0% 100%;
}
/* Firefox: riempimento nativo */
.progress::-moz-range-progress {
  background: white;
  height: 5px;
  border-radius: 2px;
}

/* Track (la linea su cui scorre il thumb) */
.progress::-webkit-slider-runnable-track {
  height: 5px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}
.progress::-moz-range-track {
  height: 5px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}
.progress::-ms-track {
  height: 5px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  border: none;
  color: transparent;
}

/* Thumb (il cerchio che si muove) */
.progress::-webkit-slider-thumb {
  width: 11px;
  height: 11px;
  margin-top: -3px; /* centra il thumb sulla track */
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  -webkit-appearance: none;
}
.progress::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
.progress::-ms-thumb {
  width: 12px;
  height: 12px;
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

/* Rimuovi lo stile di default in IE */
.progress::-ms-fill-lower {
  background: rgba(255,255,255,0.1);
}
.progress::-ms-fill-upper {
  background: rgba(255,255,255,0.1);
}
.extras {
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif !important;
  display:flex;
  justify-content:space-between;
  font-size:.9rem;
}
.close-btn {
  background:none;
  margin-top: -10px;
}
/* quando aggiungiamo .hide-cursor sulla wrapper, il cursore scompare */
.apple-video-wrapper.hide-cursor {
  cursor: none;
}

/* contenitore leggermente grigio */
.share-menu {
  position: absolute;
  right: 42px;
  top: auto !important;
  /* posiziona il menu appena sopra l’icona */
  bottom: 70%;
  background: rgba(211, 211, 211, 0.85);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  overflow: hidden;
  width: 180px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.lang-btn {
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
}
.lang-btn .lang-icon {
  pointer-events: none;
  transition: filter 0.3s ease;
}
.lang-btn:hover .lang-icon {
  filter: brightness(1) drop-shadow(0 0 0.5px white);
}

.fullscreen-btn:hover {
  filter: brightness(1) drop-shadow(0 0 0.5px white);
}

/* menu a comparsa sotto il bottone */
.lang-menu {
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
.lang-item {
  background: transparent;
  border: none;
  padding: 0.4rem 0.4rem;
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

.lang-item .check {
  display: none;
  margin-left: auto;
}
.lang-item.selected .check {
  display: inline;
}

.title-lang-item {
  background: transparent;
  border: none;
  padding-top:    0.4rem;   /* mantieni un po’ di spazio sopra */
  padding-bottom: 0.1rem;   /* dimezza lo spazio sotto */
  font-size: 0.9rem;
  text-align: left;
  cursor: default;
  font-weight: 600;
  color: black;
}
.lang-item:not(:last-child) {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.lang-item:hover {
  background: rgba(0, 122, 255, 0.80);
  color:white;
}

.share-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;        /* stesso font‑size per entrambe */
  font-weight: 300;
  color: black;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;               /* per far coprire l’hover a tutta larghezza */
  padding: 0.4rem 0.4rem;      /* uguale spazio sopra e sotto, e orizzontale */
}

/* separatore sotto ogni voce tranne l’ultima */
.share-item:not(:last-child) {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

/* hover chiaro */
.share-item:hover {
  background: rgba(211, 211, 211, 0.50);
  width: 100%;
}

/* --- sottotitoli dropdown --- */
.subs-btn {
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
}
.subs-btn img {
  pointer-events: none;
  transition: filter 0.3s ease;
}
.subs-btn:hover img {
  filter: brightness(1) drop-shadow(0 0 0.5px white);
}
.subs-menu {
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
.title-subs-item {
  background: transparent;
  border: none;
  padding-top:    0.4rem;   /* mantieni un po’ di spazio sopra */
  padding-bottom: 0.1rem;   /* dimezza lo spazio sotto */
  font-size: 0.9rem;
  text-align: left;
  cursor: default;
  font-weight: 600;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subs-item {
  background: transparent;
  border: none;
  padding: 0.4rem 0.4rem;
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
  font-weight: 400;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.subs-item:not(:last-child) { border-bottom: 1px solid rgba(0,0,0,0.1); }
.subs-item:hover { background: rgba(0,122,255,0.8); color: white; }
.subs-item .check { display: none; margin-left: auto; }
.subs-item.selected .check { display: inline; }

.subtitle-container {
  position: absolute;
  bottom: 13%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 4px;
  font-size: 200%;
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif !important;
  padding: 0.8rem 0.3rem;
  opacity: 0;
  transition: opacity 0.4s ease; /* transizione fluida */
  pointer-events: none;
}
.subtitle-container.show {
  opacity: 1;
}

/* sottotitoli nella preview: scala un po’ più piccolo e in basso */
.preview-container #preview-subtitles {
  position: absolute;
  bottom: 31px;       /* regola se vuoi più spazio dal bordo */
  left: 50%;
  transform: translateX(-50%);
  font-size: 40%;    /* un po’ più piccolo rispetto al main */
  padding: 0.03rem 0.01rem;
  border-radius: 2px;
  pointer-events: none;
  z-index: 5;         /* sopra il video */
}

/* posiziona l’avviso sopra il titolo e fallo animare come su Apple TV */
.warning-icon {
  position: absolute;
  top: 50px;            /* sposta l’avviso in alto rispetto al suo normale flow */
  margin-left: 25px;               /* allineato al bordo sinistro di .bottom-top-row */
  width: 350px;          /* regola a piacere la larghezza */
  opacity: 0;
  animation: warning-fade 8s ease-in-out forwards;
  animation-delay: 8s;   /* ← qui metti “x” secondi di delay */
  pointer-events: none;  /* non intercetta click */
  z-index: 5;
}

@keyframes warning-fade {
  0%   { opacity: 0; transform: translateY(0px); }
  10%  { opacity: 1; transform: translateY(0); }   /* fade-in in 0.8s */
  80%  { opacity: 1; transform: translateY(0); }   /* resta visibile */
}

/* posiziona l’avviso sopra il titolo e fallo animare come su Apple TV */
.warning-age {
  position: absolute;
  top: 60px;            /* sposta l’avviso in alto rispetto al suo normale flow */
  margin-left: 15px;               /* allineato al bordo sinistro di .bottom-top-row */
  width: 100px;          /* regola a piacere la larghezza */
  opacity: 0;
  animation: warning-fade-age 5s ease-in-out forwards;
  animation-delay: 2s;   /* ← qui metti “x” secondi di delay */
  pointer-events: none;  /* non intercetta click */
  z-index: 5;
}

@keyframes warning-fade-age {
  0%   { opacity: 0; transform: translateY(0px); }
  10%  { opacity: 1; transform: translateY(0); }   /* fade-in in 0.5s */
  50%  { opacity: 1; transform: translateY(0); }   /* resta visibile */
}
  
</style>
  `;
  
  // Qui, nella seconda parte, aggiungeremo tutto il JS che controlla play/pause, volume, scrub, menu, ecc.
}
