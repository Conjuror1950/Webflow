// Player-Video-Il-silenzio-della-natura-desktop.js
(function() {
  // 1) INIETTA IL CSS
  const css = `
.apple-video-wrapper-player-video-il-silenzio-della-natura-desktop {
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
.apple-video-wrapper-player-video-il-silenzio-della-natura-desktop:fullscreen video,
.apple-video-wrapper-player-video-il-silenzio-della-natura-desktop:-webkit-full-screen video {
  width: 100%    !important;
  height: 100%   !important;
  object-fit: contain !important;  /* mantieni l’intero frame con bande nere */
  background: black !important;    /* fallback “letter-box” nero */
}

/* --- override per la preview quando il wrapper è in fullscreen --- */
.apple-video-wrapper-player-video-il-silenzio-della-natura-desktop:fullscreen .preview-container-player-video-il-silenzio-della-natura-desktop video,
.apple-video-wrapper-player-video-il-silenzio-della-natura-desktop:-webkit-full-screen .preview-container-player-video-il-silenzio-della-natura-desktop video {
  width: 100% !important;       /* piena larghezza del container di preview */
  height: 100% !important;      /* piena altezza del container di preview */
  object-fit: cover !important;/* mantieni l’aspetto, niente crop */
}

.preview-container-player-video-il-silenzio-della-natura-desktop {
  position: absolute;
  bottom: 65px;               /* sopra la barra dei controlli */
  width: 402px;               /* dimensione anteprima */
  height: 220px;
  overflow: hidden;
  border: 0.1px solid rgba(255,255,255,0.2);
  background: black;
  pointer-events: none;       /* non cattura il mouse */
  border-radius: 10px;
}
#preview-video-player-video-il-silenzio-della-natura-desktop {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 1) il pallino bianco che segue il mouse */
.scrub-thumb-player-video-il-silenzio-della-natura-desktop {
  position: absolute;
  margin-top: -13px;               /* allinea verticalmente al centro della track */
  width: 11px;
  height: 11px;
  background: white;
  border-radius: 50%;
  transform: translateX(-50%);
  display: none;            /* mostrato via JS solo on‐hover */
  z-index: 2;
}

.preview-time-player-video-il-silenzio-della-natura-desktop {
  position: absolute;
  bottom: -1px;
  width: 100%;
  text-align: center;
  font-family:inherit;
  font-size: 11px;
  color: white;
  text-shadow: 0 0 4px rgba(0,0,0,0.8);
  pointer-events: none;
}

.center-controls-player-video-il-silenzio-della-natura-desktop {
  position: absolute !important;
  top: 50%           !important;
  left: 50%          !important;
  transform: translate(-50%, -50%) !important;
  display: flex      !important;
  justify-content: center !important;
  align-items: center    !important;
  gap: 2rem          !important;
}
.controls-player-video-il-silenzio-della-natura-desktop {
  position:absolute;
  inset:0;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  padding:1.5rem;
  color:white;
  pointer-events:none;
  transition:opacity .5s;
}
.controls-player-video-il-silenzio-della-natura-desktop.hide {
opacity:0;
}
.controls-player-video-il-silenzio-della-natura-desktop button, .controls-player-video-il-silenzio-della-natura-desktop input, .controls-player-video-il-silenzio-della-natura-desktop select {
  pointer-events:all;
  font-family:inherit;
}
/* top e center unchanged */
.top-bar-player-video-il-silenzio-della-natura-desktop {
display:flex;
justify-content:space-between;
}
/* rendi il volume‐slider simile alla progress‐bar */
/* ---- sostituisci interamente questa regola ---- */
.volume-player-video-il-silenzio-della-natura-desktop {
  -webkit-appearance: none;
  appearance: none;
  width: 100px;
  height: 5px;                     /* stessa altezza di .progress */
  background: rgba(255,255,255,0.1);/* stesso “track vuoto” di .progress */
  border-radius: 6px;              /* stesso border‑radius di .progress */
  margin-top: -10px;
}

/* track “riempita” e “vuota” nei diversi engine */
.volume-player-video-il-silenzio-della-natura-desktop::-webkit-slider-runnable-track {
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}
.volume-player-video-il-silenzio-della-natura-desktop::-moz-range-track {
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}
.volume-player-video-il-silenzio-della-natura-desktop::-ms-track {
  height: 4px;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
.volume-player-video-il-silenzio-della-natura-desktop::-ms-fill-lower {
  background: white;   /* parte “riempita” MS */
  border-radius: 2px;
}
.volume-player-video-il-silenzio-della-natura-desktop::-ms-fill-upper {
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}

/* thumb tondo bianco */
.volume-player-video-il-silenzio-della-natura-desktop::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: white;
  margin-top: -3px;    /* centra il thumb */
  cursor: pointer;
}
.volume-player-video-il-silenzio-della-natura-desktop::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

.volume-control-player-video-il-silenzio-della-natura-desktop {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

#volume-icon-player-video-il-silenzio-della-natura-desktop {
  width: 22px;
  height: 22px;
  margin-top: -10px;
  cursor: pointer;
  pointer-events: all;
}
.center-controls-player-video-il-silenzio-della-natura-desktop button {
  background:none;
  border:none;
  color:white;
  font-size:1.5rem;
}
/* aggiungi subito dopo .center-controls button { … } */
.play-pause-player-video-il-silenzio-della-natura-desktop {
  position: relative;      /* contenitore per le icone */
  width: 50px;             /* fissa la larghezza */
  height: 50px;            /* e l’altezza */
  padding: 0;              /* togli padding extra */ 
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  margin: 0 0.8rem;;   /* ← opzionale: margine orizzontale attorno al play */
}

.play-pause-player-video-il-silenzio-della-natura-desktop .play-icon,
.play-pause-player-video-il-silenzio-della-natura-desktop .pause-icon {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.skip-value-player-video-il-silenzio-della-natura-desktop {
font-size:.75rem;
margin:0 .2rem; }

/* ← Mouse hover on center controls */
/* aggiungi da qui */
.center-controls-player-video-il-silenzio-della-natura-desktop button img {
  transition: filter 0.3s ease;
}

/* su hover rendi l’icona bianca e con un leggero bagliore */
.center-controls-player-video-il-silenzio-della-natura-desktop .rewind-player-video-il-silenzio-della-natura-desktop:hover img,
.center-controls-player-video-il-silenzio-della-natura-desktop .forward-player-video-il-silenzio-della-natura-desktop:hover img {
  filter: brightness(1) drop-shadow(0 0 0.8px white);
}

/* bottom-bar: colonna, con riga superiore per titolo + controlli */
.bottom-bar-player-video-il-silenzio-della-natura-desktop {
  display:flex;
  flex-direction:column;
  gap:.5rem;
  margin-top:50px;
  color:white;
}
/* nuova riga superiore: titolo e right-controls affiancati */
.bottom-top-row-player-video-il-silenzio-della-natura-desktop {
  position: relative;
  top: 10px;   /* metti qui quanti pixel vuoi spostarlo verso l’alto */
  display: flex;
  flex-wrap: wrap;           /* ← permetti il wrap su più righe */
  justify-content:space-between;
  align-items: flex-start;   /* ← allinea in alto i figli */
}
/* titolo allineato a sinistra */
.serie-title-player-video-il-silenzio-della-natura-desktop {
  order: 1;           /* ← posa la serie dopo l’episodio */
  flex-basis: auto;   /* ← occupa tutta la riga disponibile */
  margin-right: auto; /* spinge i controlli verso destra */
  margin-top: 8px;
  font-weight:600;
  font-size:24px;
  color: white;
}
.ep-title-player-video-il-silenzio-della-natura-desktop {
order: 0;           /* prima riga */
flex-basis: 100%;   /* occupa tutta la larghezza: “S1, E1…” su riga a sé */
font-weight:400;
font-size:15px;
margin-bottom: -6px;
color: rgba(211, 211, 211, 0.90);
}
.time-player-video-il-silenzio-della-natura-desktop, .remaining-time-player-video-il-silenzio-della-natura-desktop {
font-size:11px;
color: rgba(211, 211, 211, 0.75);
}
/* i controlli restano a destra */
.right-controls-player-video-il-silenzio-della-natura-desktop {
order: 2;           /* dopo serie-title */
align-self: center; /* centra verticalmente i pulsanti rispetto al testo “Produzioni Cinematografiche” */
display:flex;
gap:.4rem;
justify-content:flex-end;
}
.subs-select-player-video-il-silenzio-della-natura-desktop, .audio-select-player-video-il-silenzio-della-natura-desktop {
  background:rgba(255,255,255,.1);
  color:white;
  border:none;
  padding:.2rem;
}
.fullscreen-btn-player-video-il-silenzio-della-natura-desktop, .share-btn-player-video-il-silenzio-della-natura-desktop {
  background:none;
  border:none;
  color:white;
  font-size:1.2rem;
}
.progress-player-video-il-silenzio-della-natura-desktop {
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
.progress-player-video-il-silenzio-della-natura-desktop::-moz-range-progress {
  background: white;
  height: 5px;
  border-radius: 2px;
}

/* Track (la linea su cui scorre il thumb) */
.progress-player-video-il-silenzio-della-natura-desktop::-webkit-slider-runnable-track {
  height: 5px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}
.progress-player-video-il-silenzio-della-natura-desktop::-moz-range-track {
  height: 5px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}
.progress-player-video-il-silenzio-della-natura-desktop::-ms-track {
  height: 5px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  border: none;
  color: transparent;
}

/* Thumb (il cerchio che si muove) */
.progress-player-video-il-silenzio-della-natura-desktop::-webkit-slider-thumb {
  width: 11px;
  height: 11px;
  margin-top: -3px; /* centra il thumb sulla track */
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  -webkit-appearance: none;
}
 /* creare contesto di posizionamento per lo scrub-thumb */
 .progress-wrapper-player-video-il-silenzio-della-natura-desktop {
   position: relative;
 }
.progress-player-video-il-silenzio-della-natura-desktop::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
.progress-player-video-il-silenzio-della-natura-desktop::-ms-thumb {
  width: 12px;
  height: 12px;
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

/* Rimuovi lo stile di default in IE */
.progress-player-video-il-silenzio-della-natura-desktop::-ms-fill-lower {
  background: rgba(255,255,255,0.1);
}
.progress-player-video-il-silenzio-della-natura-desktop::-ms-fill-upper {
  background: rgba(255,255,255,0.1);
}
.extras-player-video-il-silenzio-della-natura-desktop {
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif !important;
  display:flex;
  justify-content:space-between;
  font-size:.9rem;
  margin-top: -6px;
}
.close-btn-player-video-il-silenzio-della-natura-desktop {
  background:none;
  margin-top: 0px;
}
/* quando aggiungiamo .hide-cursor sulla wrapper, il cursore scompare */
.apple-video-wrapper-player-video-il-silenzio-della-natura-desktop.hide-cursor {
  cursor: none;
}

/* contenitore leggermente grigio */
.share-menu-player-video-il-silenzio-della-natura-desktop {
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

.lang-btn-player-video-il-silenzio-della-natura-desktop {
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
}
.lang-btn-player-video-il-silenzio-della-natura-desktop .lang-icon {
  pointer-events: none;
  transition: filter 0.3s ease;
}
.lang-btn-player-video-il-silenzio-della-natura-desktop:hover .lang-icon {
  filter: brightness(1) drop-shadow(0 0 0.5px white);
}

.fullscreen-btn-player-video-il-silenzio-della-natura-desktop:hover {
  filter: brightness(1) drop-shadow(0 0 0.5px white);
}

/* menu a comparsa sotto il bottone */
.lang-menu-player-video-il-silenzio-della-natura-desktop {
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
.lang-item-player-video-il-silenzio-della-natura-desktop {
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

.lang-item-player-video-il-silenzio-della-natura-desktop .check {
  display: none;
  margin-left: auto;
}
.lang-item-player-video-il-silenzio-della-natura-desktop.selected .check {
  display: inline;
}

.title-lang-item-player-video-il-silenzio-della-natura-desktop {
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
.lang-item-player-video-il-silenzio-della-natura-desktop:not(:last-child) {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.lang-item-player-video-il-silenzio-della-natura-desktop:hover {
  background: rgba(0, 122, 255, 0.80);
  color:white;
}

.share-item-player-video-il-silenzio-della-natura-desktop {
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
.share-item-player-video-il-silenzio-della-natura-desktop:not(:last-child) {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

/* hover chiaro */
.share-item-player-video-il-silenzio-della-natura-desktop:hover {
  background: rgba(211, 211, 211, 0.50);
  width: 100%;
}

/* --- sottotitoli dropdown --- */
.subs-btn-player-video-il-silenzio-della-natura-desktop {
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
}
.subs-btn-player-video-il-silenzio-della-natura-desktop img {
  pointer-events: none;
  transition: filter 0.3s ease;
}
.subs-btn-player-video-il-silenzio-della-natura-desktop:hover img {
  filter: brightness(1) drop-shadow(0 0 0.5px white);
}
.subs-menu-player-video-il-silenzio-della-natura-desktop {
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
.title-subs-item-player-video-il-silenzio-della-natura-desktop {
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

.subs-item-player-video-il-silenzio-della-natura-desktop {
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
.subs-item-player-video-il-silenzio-della-natura-desktop:not(:last-child) { border-bottom: 1px solid rgba(0,0,0,0.1); }
.subs-item-player-video-il-silenzio-della-natura-desktop:hover { background: rgba(0,122,255,0.8); color: white; }
.subs-item-player-video-il-silenzio-della-natura-desktop .check { display: none; margin-left: auto; }
.subs-item-player-video-il-silenzio-della-natura-desktop.selected .check { display: inline; }

.subtitle-container-player-video-il-silenzio-della-natura-desktop {
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
.subtitle-container-player-video-il-silenzio-della-natura-desktop.show {
  opacity: 1;
}

/* sottotitoli nella preview: scala un po’ più piccolo e in basso */
.preview-container-player-video-il-silenzio-della-natura-desktop #preview-subtitles-player-video-il-silenzio-della-natura-desktop {
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
.warning-icon-player-video-il-silenzio-della-natura-desktop {
  position: absolute;
  top: 50px;            /* sposta l’avviso in alto rispetto al suo normale flow */
  margin-left: 20px;               /* allineato al bordo sinistro di .bottom-top-row */
  width: 350px;          /* regola a piacere la larghezza */
  opacity: 0;
  animation: warning-fade-player-video-il-silenzio-della-natura-desktop 8s ease-in-out forwards;
  animation-delay: 8s;   /* ← qui metti “x” secondi di delay */
  pointer-events: none;  /* non intercetta click */
  z-index: 5;
}

@keyframes warning-fade-player-video-il-silenzio-della-natura-desktop {
  0%   { opacity: 0; transform: translateY(0px); }
  10%  { opacity: 1; transform: translateY(0); }   /* fade-in in 0.8s */
  80%  { opacity: 1; transform: translateY(0); }   /* resta visibile */
}

/* posiziona l’avviso sopra il titolo e fallo animare come su Apple TV */
.warning-age-player-video-il-silenzio-della-natura-desktop {
  position: absolute;
  top: 60px;            /* sposta l’avviso in alto rispetto al suo normale flow */
  margin-left: 10px;               /* allineato al bordo sinistro di .bottom-top-row */
  width: 100px;          /* regola a piacere la larghezza */
  opacity: 0;
  animation: warning-fade-age-player-video-il-silenzio-della-natura-desktop 5s ease-in-out forwards;
  animation-delay: 2s;   /* ← qui metti “x” secondi di delay */
  pointer-events: none;  /* non intercetta click */
  z-index: 5;
}

@keyframes warning-fade-age-player-video-il-silenzio-della-natura-desktop {
  0%   { opacity: 0; transform: translateY(0px); }
  10%  { opacity: 1; transform: translateY(0); }   /* fade-in in 0.5s */
  50%  { opacity: 1; transform: translateY(0); }   /* resta visibile */
}
  /* reset border-radius per le icone tonde */
  .play-pause-player-video-il-silenzio-della-natura-desktop img,
  .fullscreen-btn-player-video-il-silenzio-della-natura-desktop img,
  .share-menu-player-video-il-silenzio-della-natura-desktop img,
  .subs-btn-player-video-il-silenzio-della-natura-desktop img {
    border-radius: 0 !important;
  }
`;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // 2) INIETTA L’HTML
  const wrapper = document.createElement('div');
  wrapper.className = 'apple-video-wrapper-player-video-il-silenzio-della-natura-desktop';
  wrapper.innerHTML = `
    <!-- avvisi -->
    <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/68286f66a406b7094b5b2407_avviso%20sequenze%20con%20immagini%20e%20luci%20lampeggianti.png" alt="Avviso: sequenze con immagini e luci lampeggianti" class="warning-icon-player-video-il-silenzio-della-natura-desktop">
    <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/68288c23d64340a80e1a52e1_avviso%20et%C3%A0.png" alt="Avviso: età" class="warning-age-player-video-il-silenzio-della-natura-desktop">
    <video id="apple-video-player-video-il-silenzio-della-natura-desktop" preload="metadata" crossorigin="anonymous" autoplay playsinline>
      <track kind="subtitles" label="Italiano (automatico)" srclang="it" src="https://andreaingrassia.netlify.app/assets/subtitles/captions-il-silenzio-della-natura.vtt">
    </video>
    <div id="custom-subtitles-player-video-il-silenzio-della-natura-desktop" class="subtitle-container-player-video-il-silenzio-della-natura-desktop"></div>
    <div class="controls-player-video-il-silenzio-della-natura-desktop">
      <div class="top-bar-player-video-il-silenzio-della-natura-desktop">
        <button class="close-btn-player-video-il-silenzio-della-natura-desktop"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a6e03d818ab9f59079de2_xmark.svg" alt="Close" style="width:24px;height:24px;"></button>
        <div class="volume-control-player-video-il-silenzio-della-natura-desktop">
          <input type="range" class="volume-player-video-il-silenzio-della-natura-desktop" min="0" max="1" step="0.01" value="1">
          <img id="volume-icon-player-video-il-silenzio-della-natura-desktop" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681d13cccb3122eb07cc40af_custom.speaker.wave.3.fill.2.2.svg" alt="Volume alto">
        </div>
      </div>
      <div class="center-controls-player-video-il-silenzio-della-natura-desktop">
        <button class="rewind-player-video-il-silenzio-della-natura-desktop"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a5fb8fe6435455d3d98da_10.arrow.trianglehead.counterclockwise.svg" alt="Rewind" style="height:35px;"></button>
        <button class="play-pause-player-video-il-silenzio-della-natura-desktop">
          <img class="play-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a7228fdd5352747977676_play.fill.svg" alt="Play">
          <img class="pause-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a722870d098221ad93f47_pause.fill.svg" alt="Pausa">
        </button>
        <button class="forward-player-video-il-silenzio-della-natura-desktop"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a5fb8f7a09fb00f328afb_10.arrow.trianglehead.clockwise.svg" alt="Forward" style="height:35px;"></button>
      </div>
      <div class="bottom-bar-player-video-il-silenzio-della-natura-desktop">
        <div class="bottom-top-row-player-video-il-silenzio-della-natura-desktop">
          <div class="ep-title-player-video-il-silenzio-della-natura-desktop">S1, E1 · Il silenzio della natura</div>
          <div class="serie-title-player-video-il-silenzio-della-natura-desktop">Produzioni Cinematografiche</div>
          <div class="right-controls-player-video-il-silenzio-della-natura-desktop">
            <button class="subs-btn-player-video-il-silenzio-della-natura-desktop"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681c881581975b4efc170207_captions.bubble.svg" alt="Sottotitoli" style="width:20px;height:20px;"></button>
            <div class="subs-menu-player-video-il-silenzio-della-natura-desktop" style="display:none;">
              <button class="title-subs-item-player-video-il-silenzio-della-natura-desktop">Sottotitoli</button>
              <button class="subs-item-player-video-il-silenzio-della-natura-desktop" data-val="-1">Disattivati</button>
              <button class="subs-item-player-video-il-silenzio-della-natura-desktop selected" data-val="0">Italiano (automatico)</button>
            </div>
            <button class="lang-btn-player-video-il-silenzio-della-natura-desktop"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681bb7eb7c5e96fc0889f14c_waveform.circle.svg" alt="Lingua" style="width:20px;height:20px;"></button>
            <div class="lang-menu-player-video-il-silenzio-della-natura-desktop" style="display:none;">
              <button class="title-lang-item-player-video-il-silenzio-della-natura-desktop">Audio</button>
              <button class="lang-item-player-video-il-silenzio-della-natura-desktop selected" data-lang="it">Originale: Italiano<span class="check">✓</span></button>
            </div>
            <button class="share-btn-player-video-il-silenzio-della-natura-desktop"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681c7cf63258616ead57cdf0_square.and.arrow.up.svg" alt="Condividi" style="width:18px;height:30px;"></button>
            <div class="share-menu-player-video-il-silenzio-della-natura-desktop" style="display:none;">
              <button class="share-item-player-video-il-silenzio-della-natura-desktop copy-link"><span class="item-text">Copia Link</span><img class="item-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681b6628e632be2dca7bfe8e_link.svg" width="18" height="18" alt="Link"></button>
              <button class="share-item-player-video-il-silenzio-della-natura-desktop email-share"><span class="item-text">Email</span><img class="item-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681b6628ed25af24c9b87b32_envelope.fill.svg" width="18" height="18" alt="Email"></button>
            </div>
            <button class="fullscreen-btn-player-video-il-silenzio-della-natura-desktop"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a6105f7d436f1d44084d0_arrow.up.backward.and.arrow.down.forward.svg" alt="Fullscreen" style="width:18px;height:18px;"></button>
          </div>
        </div>
        <div class="progress-wrapper-player-video-il-silenzio-della-natura-desktop">
          <input type="range" class="progress-player-video-il-silenzio-della-natura-desktop" value="0" step="0.1">
          <div class="scrub-thumb-player-video-il-silenzio-della-natura-desktop"></div>
        </div>
        <div class="preview-container-player-video-il-silenzio-della-natura-desktop" hidden>
          <video id="preview-video-player-video-il-silenzio-della-natura-desktop" muted preload="metadata" crossorigin="anonymous"></video>
          <div id="preview-subtitles-player-video-il-silenzio-della-natura-desktop" class="subtitle-container-player-video-il-silenzio-della-natura-desktop"></div>
          <div class="preview-time-player-video-il-silenzio-della-natura-desktop">0:00</div>
        </div>
        <div class="extras-player-video-il-silenzio-della-natura-desktop"><span class="time-player-video-il-silenzio-della-natura-desktop">0:00</span><span class="remaining-time-player-video-il-silenzio-della-natura-desktop">-0:00</span></div>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

   // Javascript (JS)
    const wrapper = document.querySelector('.apple-video-wrapper-player-video-il-silenzio-della-natura-desktop');
    const video = document.getElementById('apple-video-player-video-il-silenzio-della-natura-desktop');
    const controls = wrapper.querySelector('.controls-player-video-il-silenzio-della-natura-desktop');
    const progress = wrapper.querySelector('.progress-player-video-il-silenzio-della-natura-desktop');
    const timeLabel = wrapper.querySelector('.time-player-video-il-silenzio-della-natura-desktop');
    const remLabel  = wrapper.querySelector('.remaining-time-player-video-il-silenzio-della-natura-desktop');
    const playBtn   = wrapper.querySelector('.play-pause-player-video-il-silenzio-della-natura-desktop');
    const rewindBtn = wrapper.querySelector('.rewind-player-video-il-silenzio-della-natura-desktop');
    const forwardBtn= wrapper.querySelector('.forward-player-video-il-silenzio-della-natura-desktop');
    const volume    = wrapper.querySelector('.volume-player-video-il-silenzio-della-natura-desktop');
    const volumeIcon= wrapper.querySelector('#volume-icon-player-video-il-silenzio-della-natura-desktop');
    const fsBtn     = wrapper.querySelector('.fullscreen-btn-player-video-il-silenzio-della-natura-desktop');
    const shareBtn  = wrapper.querySelector('.share-btn-player-video-il-silenzio-della-natura-desktop');
    const shareMenu = wrapper.querySelector('.share-menu-player-video-il-silenzio-della-natura-desktop');
    const copyLinkBtn = wrapper.querySelector('.copy-link-player-video-il-silenzio-della-natura-desktop');
    const emailBtn    = wrapper.querySelector('.email-share-player-video-il-silenzio-della-natura-desktop');
    const langBtn   = wrapper.querySelector('.lang-btn-player-video-il-silenzio-della-natura-desktop');
    const langMenu  = wrapper.querySelector('.lang-menu-player-video-il-silenzio-della-natura-desktop');
    const subsBtn   = wrapper.querySelector('.subs-btn-player-video-il-silenzio-della-natura-desktop');
    const subsMenu  = wrapper.querySelector('.subs-menu-player-video-il-silenzio-della-natura-desktop');
    const subsItems = wrapper.querySelectorAll('.subs-item-player-video-il-silenzio-della-natura-desktop');
    const previewContainer = wrapper.querySelector('.preview-container-player-video-il-silenzio-della-natura-desktop');
    const previewVideo     = wrapper.querySelector('#preview-video-player-video-il-silenzio-della-natura-desktop');
    const subEl   = wrapper.querySelector('#custom-subtitles-player-video-il-silenzio-della-natura-desktop');
    let hideTimeout, lastPreviewTime = 0, lastVolume = 1, mutedByClick = false;

    function formatTime(s) {
      const m = Math.floor(s/60);
      const sec = String(Math.floor(s%60)).padStart(2,'0');
      return `${m}:${sec}`;
    }

    function updateProgressBar() {
      progress.value = video.currentTime;
      const playedPct = (video.currentTime/video.duration)*100;
      let bufEnd = video.buffered.length ? video.buffered.end(video.buffered.length-1) : 0;
      const bufferedPct = (bufEnd/video.duration)*100;
      progress.style.backgroundSize = `${playedPct}% 100%, ${bufferedPct}% 100%`;
      timeLabel.textContent = formatTime(video.currentTime);
      remLabel.textContent  = '-' + formatTime(video.duration - video.currentTime);
    }

    function resetHideControls() {
      controls.classList.remove('hide');
      wrapper.classList.remove('hide-cursor');
      clearTimeout(hideTimeout);
      if (!video.paused) {
        hideTimeout = setTimeout(() => {
          controls.classList.add('hide');
          wrapper.classList.add('hide-cursor');
        }, 3000);
      }
    }

    // Shortcuts
    document.addEventListener('keydown', e => {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          video.paused ? video.play() : video.pause();
          break;
        case 'ArrowRight':
          video.currentTime += 10; break;
        case 'ArrowLeft':
          video.currentTime -= 10; break;
      }
      resetHideControls();
    });

    // Double-click fullscreen
    wrapper.querySelector('video').addEventListener('dblclick', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        wrapper.requestFullscreen();
      }
    });

    // Auto-hide controls
    ['mousemove','click','keydown','wheel','touchstart','pointermove'].forEach(evt => {
      wrapper.addEventListener(evt, resetHideControls, { passive: true });
    });
    document.addEventListener('keydown', resetHideControls);

    // Control buttons
    playBtn.addEventListener('click', () => {
      if (video.paused) { video.play(); playBtn.querySelector('.play-icon').style.display='none'; playBtn.querySelector('.pause-icon').style.display='inline'; }
      else { video.pause(); playBtn.querySelector('.pause-icon').style.display='none'; playBtn.querySelector('.play-icon').style.display='inline'; }
    });
    video.addEventListener('play',  () => playBtn.querySelector('.pause-icon').style.display='inline');
    video.addEventListener('pause', () => playBtn.querySelector('.play-icon').style.display='inline');
    rewindBtn.addEventListener('click', () => video.currentTime = Math.max(0, video.currentTime - 10));
    forwardBtn.addEventListener('click', () => video.currentTime = Math.min(video.duration, video.currentTime + 10));

    // Progress bar
    video.addEventListener('timeupdate', updateProgressBar);
    video.addEventListener('progress',   updateProgressBar);
    video.addEventListener('loadedmetadata', () => {
      progress.max = video.duration;
      remLabel.textContent = '-' + formatTime(video.duration);
    });
    progress.addEventListener('click', () => {
      video.currentTime = lastPreviewTime;
      updateProgressBar();
    });

    // Volume
    volume.addEventListener('input', () => {
      mutedByClick = false;
      const v = parseFloat(volume.value);
      if (v > 0) lastVolume = v;
      video.volume = v;
      const pct = v * 100;
      volume.style.background = `linear-gradient(to right, white 0%, white ${pct}%, rgba(255,255,255,0.1) ${pct}%, rgba(255,255,255,0.1) 100%)`;
      let iconURL = v === 0
        ? 'https://cdn.../speaker.slash.fill.svg'
        : v <= 0.33
          ? 'https://cdn.../speaker.wave.1.fill.svg'
          : v <= 0.66
            ? 'https://cdn.../speaker.wave.2.fill.svg'
            : 'https://cdn.../speaker.wave.3.fill.svg';
      volumeIcon.src = iconURL;
    });
    volume.dispatchEvent(new Event('input'));
    volumeIcon.addEventListener('click', () => {
      const curr = parseFloat(volume.value);
      volume.value = curr > 0 ? 0 : lastVolume;
      volume.dispatchEvent(new Event('input'));
    });

    // Fullscreen button
    fsBtn.addEventListener('click', () => {
      document.fullscreenElement ? document.exitFullscreen() : wrapper.requestFullscreen();
    });

    // Share menu
    shareBtn.addEventListener('click', e => {
      e.stopPropagation();
      langMenu.style.display = subsMenu.style.display = 'none';
      shareMenu.style.display = shareMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    copyLinkBtn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(location.href); copyLinkBtn.textContent = 'Link copiato ✓'; }
      catch { alert('Impossibile copiare il link'); }
      setTimeout(() => shareMenu.style.display = 'none', 1000);
    });
    emailBtn.addEventListener('click', () => {
      const subject = encodeURIComponent(document.title);
      const body = encodeURIComponent(`Guarda qui: ${location.href}`);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });

    // Language menu
    langBtn.addEventListener('click', e => {
      e.stopPropagation();
      shareMenu.style.display = subsMenu.style.display = 'none';
      langMenu.style.display = langMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    langMenu.querySelectorAll('.lang-item-player-video-il-silenzio-della-natura-desktop').forEach(item => {
      item.addEventListener('click', () => {
        document.documentElement.lang = item.dataset.lang;
        langBtn.title = item.dataset.lang === 'it' ? 'Italiano' : 'English';
        langMenu.style.display = 'none';
      });
    });

    // Subtitles menu
    subsBtn.addEventListener('click', e => {
      e.stopPropagation();
      shareMenu.style.display = langMenu.style.display = 'none';
      subsMenu.style.display = subsMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    subsItems.forEach(item => {
      item.addEventListener('click', () => {
        subsItems.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        const val = parseInt(item.dataset.val,10);
        Array.from(video.textTracks).forEach((t,i) => t.mode = (i===val)?'hidden':'disabled');
        subEl.textContent = '';
        subsMenu.style.display = 'none';
      });
    });

    // Preview scrub
    const thumb = wrapper.querySelector('.scrub-thumb-player-video-il-silenzio-della-natura-desktop');
    const previewTime = wrapper.querySelector('.preview-time-player-video-il-silenzio-della-natura-desktop');
    progress.addEventListener('mousemove', e => {
      const rect = progress.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left)/rect.width));
      const t = pct * video.duration;
      lastPreviewTime = t;
      thumb.style.left = (pct*(rect.width-thumb.offsetWidth)+thumb.offsetWidth/2) + 'px';
      thumb.style.display = 'block';
      previewTime.textContent = formatTime(t);
      // position preview container
      const halfW = previewContainer.offsetWidth/2;
      const localX = e.clientX - wrapper.getBoundingClientRect().left;
      const clampedX = Math.min(Math.max(localX-halfW,24), wrapper.clientWidth - previewContainer.offsetWidth - 24);
      previewContainer.style.left = clampedX+'px';
      previewVideo.currentTime = t;
      previewContainer.style.display = 'block';
    });
    progress.addEventListener('mouseout', () => {
      thumb.style.display = 'none';
      previewContainer.style.display = 'none';
    });

    // Carica Dash.js
    const dashScript = document.createElement('script');
    dashScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/dashjs/5.0.0/legacy/umd/dash.all.min.js';
    dashScript.onload = () => {
      const manifest = 'https://il-silenzio-della-natura-video.netlify.app/manifest.mpd';
      const player = dashjs.MediaPlayer().create();
      player.initialize(video, manifest, false);
      player.enableText(true);
      player.updateSettings({
        streaming: {
          buffer: { initialBufferLevel:20, bufferTimeAtTopQuality:90, bufferTimeDefault:45, bufferToKeep:30, longFormContentDurationThreshold:120 },
          abr: { autoSwitchBitrate:{video:true,audio:true}, useBufferOccupancyABRStrategy:true, abrBola:{bitrateSafetyFactor:0.9}, switchInterval:10 },
          http: { timeout:60000, enableProgressive:true, retry:{maxAttempts:4, baseDelay:500, multiplier:2} }
        },
        debug: { logLevel: dashjs.Debug.LOG_LEVEL_NONE }
      });
      player.on(dashjs.MediaPlayer.events.ERROR, e => console.error('DASH error', e));
      // custom subtitles fade
      const track = video.textTracks[0];
      track.mode = 'hidden';
      track.addEventListener('cuechange', () => {
        const cues = track.activeCues;
        if (cues.length) { subEl.textContent = cues[0].text; subEl.classList.add('show'); }
        else subEl.classList.remove('show');
      });

      // preview player
      previewVideo.innerHTML = video.innerHTML;
      const previewPlayer = dashjs.MediaPlayer().create();
      previewPlayer.initialize(previewVideo, manifest, false);
      previewPlayer.enableText(true);
      previewPlayer.on(dashjs.MediaPlayer.events.TEXT_TRACKS_ADDED, () => {
        const pTrack = previewVideo.textTracks[0];
        pTrack.mode = 'hidden';
        previewPlayer.setTextTrack(0);
        pTrack.addEventListener('cuechange', () => {
          const c = Array.from(pTrack.activeCues);
          const psub = wrapper.querySelector('#preview-subtitles-player-video-il-silenzio-della-natura-desktop');
          if (c.length) { psub.textContent = c[0].text; psub.classList.add('show'); }
          else psub.classList.remove('show');
        });
      });
      previewPlayer.updateSettings({
        streaming: {
          scheduleWhilePaused:true,
          buffer:{ bufferTimeDefault:30, bufferTimeAtTopQuality:15, bufferToKeep:10 },
          lowLatencyEnabled:true,
          abr:{ autoSwitchBitrate:{video:false}, defaultRepresentation:{video:0} },
          http:{ timeout:20000, enableProgressive:true }
        },
        debug:{ logLevel: dashjs.Debug.LOG_LEVEL_NONE }
      });
    };
    document.body.appendChild(dashScript);

    // click outside menus
    document.addEventListener('click', () => {
      shareMenu.style.display = langMenu.style.display = subsMenu.style.display = 'none';
    });
  })();
