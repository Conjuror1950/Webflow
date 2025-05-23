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
            <div class="subs-menu-player-video-il-silenzio-della-natura-desktop">
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
  // 3) Doppio‐click sul video → toggle fullscreen
const videoEl = wrapper.querySelector('video');
videoEl.addEventListener('dblclick', () => {
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    // esci dal fullscreen (standard + WebKit)
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  } else {
    // entra nel fullscreen sul wrapper (standard + WebKit)
    if (wrapper.requestFullscreen) {
      wrapper.requestFullscreen();
    } else if (wrapper.webkitRequestFullscreen) {
      wrapper.webkitRequestFullscreen();
    }
  }
});

// 2) Keyboard shortcuts: ←/→ skip 10s, Space toggle play/pause
document.addEventListener('keydown', function(event) {
  const video = document.querySelector('video');
  switch (event.code) {
    case 'Space':
      event.preventDefault();
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
      break;
    case 'ArrowRight':
      video.currentTime += 10;
      break;
    case 'ArrowLeft':
      video.currentTime -= 10;
      break;
  }
  // **ri‑attiva** l’auto‑hide dopo la pressione di Space/←/→
  resetHideControls();
});
  
  // 3) CARICA DASH.JS E INIZIALIZZA IL PLAYER
  const dashScript = document.createElement('script');
  dashScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/dashjs/5.0.0/legacy/umd/dash.all.min.js';
  dashScript.onload = () => {
    /* Video .mp4 in formato dash */
    // ora il manifest contiene più Representation (4K,1080p,720p,...)
    const manifest = 'https://il-silenzio-della-natura-video.netlify.app/manifest.mpd';
    const video = document.getElementById('apple-video-player-video-il-silenzio-della-natura-desktop');
    const player = dashjs.MediaPlayer().create();
    // inizializza e carica il manifest
    player.initialize(video, manifest, false);
    player.enableText(true);
  // ─── fade‐in/fade‐out dei sottotitoli ───
  const track = video.textTracks[0];
  // disabilitiamo il rendering nativo
  track.mode = 'hidden';

  track.addEventListener('cuechange', () => {
    const active = track.activeCues;
    const subEl  = document.getElementById('custom-subtitles-player-video-il-silenzio-della-natura-desktop');
    if (active.length) {
      subEl.textContent = active[0].text;
      subEl.classList.add('show');
    } else {
      subEl.classList.remove('show');
    }
  });
  // ─────────────────────────────────────────

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

  // Controls
  const playBtn = document.querySelector('.play-pause-player-video-il-silenzio-della-natura-desktop');
  const rewindBtn = document.querySelector('.rewind-player-video-il-silenzio-della-natura-desktop');
  const forwardBtn = document.querySelector('.forward-player-video-il-silenzio-della-natura-desktop');
  const progress = document.querySelector('.progress-player-video-il-silenzio-della-natura-desktop');
  // tieni memoria dell’ultimo time calcolato
  let lastPreviewTime = 0;
  // 1) crea in JS la preview‑video con UN NUOVO player
  const previewContainer = document.querySelector('.preview-container-player-video-il-silenzio-della-natura-desktop');
  const previewVideo     = document.getElementById('preview-video-player-video-il-silenzio-della-natura-desktop');
 
// 1) Copia il markup del video principale (inclusi i <track>)
previewVideo.innerHTML = document.getElementById('apple-video-player-video-il-silenzio-della-natura-desktop').innerHTML;

// 2) inizializza dash.js sul preview
const previewPlayer = dashjs.MediaPlayer().create();
previewPlayer.initialize(previewVideo, manifest, false);

// 3) abilita i “subtitles” e, non appena il browser conosce i track,
//    forziamo la modalità di rendering HTML5
previewPlayer.enableText(true);
// giusto: usa l'evento dei text-track appena aggiunti
previewPlayer.on(dashjs.MediaPlayer.events.TEXT_TRACKS_ADDED, () => {
  // 1) forziamo il track in modalità hidden (rendering JS-only)
  const previewTrack = previewVideo.textTracks[0];
  previewTrack.mode = 'hidden';
  
  // 2) selezioniamo la traccia italiana (index 0)
  previewPlayer.setTextTrack(0);

  // 3) ascoltiamo cuechange e aggiorniamo lo stesso #custom-subtitles
  previewTrack.addEventListener('cuechange', () => {
    const cues  = previewTrack.activeCues;
    const subEl = document.getElementById('preview-subtitles-player-video-il-silenzio-della-natura-desktop');
    if (cues.length) {
      subEl.textContent = cues[0].text;
      subEl.classList.add('show');
    } else {
      subEl.classList.remove('show');
    }
  });
});
  
// impostazioni “ultra-light” per il preview
previewPlayer.updateSettings({
  streaming: {
    // continua a scaricare anche quando il video sta in pausa
    scheduleWhilePaused: true,
    buffer: {
      // da 10 s → 20 s di buffer per caricamento anticipato
      bufferTimeDefault: 30,
      // da 5 s → 10 s per la qualità massima
      bufferTimeAtTopQuality: 15,
      // tieni almeno 5 s di buffer già pronto
      bufferToKeep: 10
    },
    // abilita il low-latency mode di dash.js
    lowLatencyEnabled: true,
       abr: {
     autoSwitchBitrate: { video: false },
     defaultRepresentation: { video: 0 }
   },
    http: {
      timeout: 20000,          // timeout più breve se vuoi
      enableProgressive: true
    }
  },
  debug: {
    logLevel: dashjs.Debug.LOG_LEVEL_NONE
  }
});

// 2) quando muovi il mouse sulla barra, calcola il time, muovi il thumb, mostra preview & timecode
progress.addEventListener('mousemove', e => {
  const rect = progress.getBoundingClientRect();
  const pct  = (e.clientX - rect.left) / rect.width;
  const time = Math.max(0, Math.min(1, pct)) * video.duration;
  
 // salva l’ultimo time per il click
 lastPreviewTime = time;

  // — SCRUB THUMB —
  const thumb = document.querySelector('.scrub-thumb-player-video-il-silenzio-della-natura-desktop');
  const thumbWidth = thumb.offsetWidth;              // 11px
  // calcola x partendo dalla % e riducendo la “corsia” di thumbWidth
  const x = pct * (rect.width - thumbWidth) + thumbWidth / 2;
  thumb.style.left = x + 'px';
  thumb.style.display = 'block';

  // — PREVIEW TIMECODE —
  const previewTime = document.querySelector('.preview-time-player-video-il-silenzio-della-natura-desktop');
  previewTime.textContent = formatTime(time);

// — PREVIEW VIDEO — (posizione clamped entro il wrapper)
const halfW = previewContainer.offsetWidth / 2;
const wrapper = document.querySelector('.apple-video-wrapper-player-video-il-silenzio-della-natura-desktop');
const wrapRect = wrapper.getBoundingClientRect();
const sideMargin = 24;  // <— qui decidi quanti px vuoi di spazio

  // posizione “desiderata” centrata sul mouse RELATIVA al wrapper
  const localX = e.clientX - wrapRect.left;      // X dentro il wrapper
  const desiredX = localX - halfW;
  // clamp fra [sideMargin .. wrapperWidth-previewWidth-sideMargin]
  const minX = sideMargin;
  const maxX = wrapRect.width - previewContainer.offsetWidth - sideMargin;
  const clampedX = Math.min(Math.max(desiredX, minX), maxX);
  previewContainer.style.left = clampedX + 'px';

previewVideo.currentTime = time;
previewContainer.style.display = 'block';
});

// 3) nascondi thumb e preview al mouseout
progress.addEventListener('mouseout', () => {
  document.querySelector('.scrub-thumb-player-video-il-silenzio-della-natura-desktop').style.display = 'none';
  previewContainer.style.display = 'none';
});

  const timeLabel = document.querySelector('.time-player-video-il-silenzio-della-natura-desktop');
  const remLabel = document.querySelector('.remaining-time-player-video-il-silenzio-della-natura-desktop');
  const volume = document.querySelector('.volume-player-video-il-silenzio-della-natura-desktop');
  // salvo l’ultimo valore di volume non-zero
  let lastVolume = parseFloat(volume.value) || 1;
  // indica se lo stato muto è stato attivato cliccando l’icona
  let mutedByClick = false;
  const fsBtn = document.querySelector('.fullscreen-btn-player-video-il-silenzio-della-natura-desktop');
  const shareBtn = document.querySelector('.share-btn-player-video-il-silenzio-della-natura-desktop');
  // Share: apri menu con opzione “Copia link”
  const shareMenu = document.querySelector('.share-menu-player-video-il-silenzio-della-natura-desktop');
  // Language switcher
  const langBtn  = document.querySelector('.lang-btn-player-video-il-silenzio-della-natura-desktop');
  const langMenu = document.querySelector('.lang-menu-player-video-il-silenzio-della-natura-desktop');
  // crea gli span .check e seleziona Italiano
langMenu.querySelectorAll('.lang-item').forEach(item => {
  // (se non li hai già messi in HTML) crea lo span
  if (!item.querySelector('.check')) {
    const chk = document.createElement('span');
    chk.classList.add('check');
    chk.textContent = '✓';
    item.appendChild(chk);
  }
  // se è Italiano, aggiungi la classe selected
  if (item.dataset.lang === 'it') {
    item.classList.add('selected');
    // imposta l’audio in italiano
    document.documentElement.lang = 'it';
  }
});
const subsBtn  = document.querySelector('.subs-btn-player-video-il-silenzio-della-natura-desktop');
const subsMenu = document.querySelector('.subs-menu-player-video-il-silenzio-della-natura-desktop');
const subsItems = subsMenu.querySelectorAll('.subs-item-player-video-il-silenzio-della-natura-desktop');

// apri/chiudi menu sottotitoli
subsBtn.addEventListener('click', e => {
  e.stopPropagation();
  shareMenu.style.display = 'none';
  langMenu.style.display = 'none';
  subsMenu.style.display = subsMenu.style.display === 'flex' ? 'none' : 'flex';
});

// clic su voce sottotitoli
subsItems.forEach(item => {
// <<< aggiunto: appena caricate le tracce, attiva Italiano CC
player.on(dashjs.MediaPlayer.events.TEXT_TRACKS_ADDED, () => {
  // forza il track 0 (Italiano) e la UI
  player.setTextTrack(0);                  
  const italianItem = subsMenu.querySelector('.subs-item[data-val="0"]');
  if (italianItem) italianItem.classList.add('selected');
  });
  
  previewPlayer.on(dashjs.MediaPlayer.events.TEXT_TRACKS_ADDED, () => {
  // forza il track 0 (Italiano) anche nel preview
  previewPlayer.setTextTrack(0);
});

  // aggiungi un elemento span per la spunta
  const chk = document.createElement('span');
  chk.classList.add('check');
  chk.textContent = '✓';
  item.appendChild(chk);

item.addEventListener('click', () => {
  // Salta se è già selezionato
  if (item.classList.contains('selected')) {
    return;
  }
  const val = parseInt(item.dataset.val, 10);

  // 1) abilita/disabilita sul video principale
  const htmlTracks = video.textTracks;
  for (let i = 0; i < htmlTracks.length; i++) {
    htmlTracks[i].mode = (i === val) ? 'hidden' : 'disabled';
  }

  // 2) **identica logica per la preview**
  const previewTracks = previewVideo.textTracks;
  for (let i = 0; i < previewTracks.length; i++) {
    previewTracks[i].mode = (i === val) ? 'hidden' : 'disabled';
  }

    // 2) Abilita/Disabilita i rendering custom
    const customSub  = document.getElementById('custom-subtitles-player-video-il-silenzio-della-natura-desktop');
    const previewSub = document.getElementById('preview-subtitles-player-video-il-silenzio-della-natura-desktop');
    if (val < 0) {
      // “Disattivati”: nascondi entrambe le <div>
      customSub.classList.remove('show');
      previewSub.classList.remove('show');
    } else {
      // “Italiano (automatico)”: le tue cuechange listener mostreranno il testo,
      // qui non serve aggiungere 'show' subito perché lo fai via cuechange
      // ma puoi opzionalmente pulire il testo precedente
      customSub.textContent  = '';
      previewSub.textContent = '';
    }

    // 3) Aggiorna UI del menu
    subsItems.forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
    subsMenu.style.display = 'none';
  });
});

// chiudi cliccando fuori
document.addEventListener('click', () => {
  subsMenu.style.display = 'none';
});

  const copyLinkBtn = document.querySelector('.copy-link-player-video-il-silenzio-della-natura-desktop');
  const emailBtn    = document.querySelector('.email-share-player-video-il-silenzio-della-natura-desktop');
  const controls = document.querySelector('.controls-player-video-il-silenzio-della-natura-desktop');
  const playPauseBtn = document.getElementById("play-pause-player-video-il-silenzio-della-natura-desktop");
  let hideTimeout;
  // Play/Pause
  const playIcon = playBtn.querySelector('.play-icon');
  const pauseIcon = playBtn.querySelector('.pause-icon');

playBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline';
  } else {
    video.pause();
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
  }
});
video.addEventListener('ended', () => {
  playIcon.style.display = 'inline';
  pauseIcon.style.display = 'none';
});

video.addEventListener('pause', () => {
  // icona
  playIcon.style.display = 'inline';
  pauseIcon.style.display = 'none';
  // controlli
  clearTimeout(hideTimeout);
  controls.classList.remove('hide');
  wrapper.classList.remove('hide-cursor');
});

video.addEventListener('play', () => {
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'inline';
});
  // Skip
  rewindBtn.addEventListener('click', () => video.currentTime = Math.max(0, video.currentTime - 10));
  forwardBtn.addEventListener('click', () => video.currentTime = Math.min(video.duration, video.currentTime + 10));
  
  function updateProgressBar() {
  // ← aggiorna il valore dell’input, così il thumb si muove
  progress.value = video.currentTime;
  const playedPct = (video.currentTime / video.duration) * 100;
  // buffered: prendi l’ultimo segmento caricato
  let bufEnd = 0;
  if (video.buffered.length) {
    bufEnd = video.buffered.end(video.buffered.length - 1);
  }
  const bufferedPct = (bufEnd / video.duration) * 100;
  // 1° valore = played, 2° = buffered
  progress.style.backgroundSize = `${playedPct}% 100%, ${bufferedPct}% 100%`;
  // ←— qui aggiorno i testi del tempo
  timeLabel.textContent = formatTime(video.currentTime);
  remLabel.textContent  = '-' + formatTime(video.duration - video.currentTime);
}

  // Time update
 video.addEventListener('timeupdate', () => {
   updateProgressBar();
 });

 // quando il browser scarica nuovi dati
 video.addEventListener('progress', () => {
   updateProgressBar();
 });

  video.addEventListener('loadedmetadata', () => {
    progress.max = video.duration;
    remLabel.textContent = '-' + formatTime(video.duration);
  });
  
// al click sulla progress, salta al frame esatto visto in preview
progress.addEventListener('click', () => {
  video.currentTime = lastPreviewTime;
  updateProgressBar();
});

// Volume
  // nuova funzione: imposta anche video.volume e colora il track
volume.addEventListener('input', () => {
  mutedByClick = false;      // reset del flag
  const v = parseFloat(volume.value);
  if (v > 0) lastVolume = v;  // salva sempre l’ultimo valore non-zero
  // 1) applica il volume al video nativo (per sicurezza)
  video.volume = v;
  // 2) applica il volume al dash.js player
  player.setVolume(v);
  // 3) ricrea il gradient: parte sinistra bianca, resto grigio
  const pct = v * 100;
  volume.style.background =
    `linear-gradient(to right,
       white 0%, white ${pct}%,
       rgba(255,255,255,0.1) ${pct}%, rgba(255,255,255,0.1) 100%)`;
});

// 4) subito dopo aver definito il listener, forza l'evento input
//    così il gradient è già corretto al caricamento (value=1)
volume.dispatchEvent(new Event('input'));

const volumeIcon = document.getElementById('volume-icon-player-video-il-silenzio-della-natura-desktop');

volumeIcon.addEventListener('click', () => {
  const current = parseFloat(volume.value);

  if (current > 0) {
    // sto mutando: salvo il valore prima di azzerare
    lastVolume = current;
    volume.value = 0;
  } else {
    // volume==0: ripristino sempre l’ultimo valore non-zero
    volume.value = lastVolume;
  }

  // rilancio l’input per aggiornare video.volume, gradient e icona
  volume.dispatchEvent(new Event('input'));
});

volume.addEventListener('input', () => {
  // se l’utente tocca lo slider, non siamo in “mute by click”
  mutedByClick = false;

  const v = parseFloat(volume.value);
  video.volume = v;
  player.setVolume(v);
  const pct = v * 100;
  volume.style.background =
    `linear-gradient(to right, white 0%, white ${pct}%, rgba(255,255,255,0.1) ${pct}%, rgba(255,255,255,0.1) 100%)`;

  if (v > 0) lastVolume = v;

  let iconURL, altText;
  if (v === 0) {
    iconURL = 'https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681d13cbee3881a72b73cb87_speaker.slash.fill.svg';
    altText = 'Volume disattivato';
  } else if (v <= 0.33) {
    iconURL = 'https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681d13cb25e28096121c087f_custom.speaker.wave.3.fill.svg';
    altText = 'Volume basso';
  } else if (v <= 0.66) {
    iconURL = 'https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681d13cb4d4abbc10de8ed5d_custom.speaker.wave.3.fill.2.svg';
    altText = 'Volume medio';
  } else {
    iconURL = 'https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681d13cccb3122eb07cc40af_custom.speaker.wave.3.fill.2.2.svg';
    altText = 'Volume alto';
  }
  volumeIcon.src = iconURL;
  volumeIcon.alt = altText;
});

  // Fullscreen
fsBtn.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    video.parentElement.requestFullscreen();
  }
});

// Cambia icona al cambio di stato fullscreen
document.addEventListener('fullscreenchange', () => {
  // prendo direttamente l'<img> dentro il bottone
  const fsIcon = document.querySelector('.fullscreen-btn-player-video-il-silenzio-della-natura-desktop img');
  if (!fsIcon) return;

  if (document.fullscreenElement) {
    fsIcon.src = 'https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a610667977d7e81c3aa5c_arrow.down.forward.and.arrow.up.backward.svg';
  } else {
    fsIcon.src = 'https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a6105f7d436f1d44084d0_arrow.up.backward.and.arrow.down.forward.svg';
  }
});

// 1) Clic sul video da qualsiasi punto → play/pause
video.addEventListener('click', () => {
  playBtn.click();
});

 shareBtn.addEventListener('click', (e) => {
   e.stopPropagation();
   langMenu.style.display = 'none';       // ← chiudo il menu lingua
   subsMenu.style.display = 'none';      // ← nascondi anche qui il menu subs
   // toggle visibilità menu
   shareMenu.style.display = shareMenu.style.display === 'flex' ? 'none' : 'flex';
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

 // clic fuori per chiudere
 document.addEventListener('click', () => {
   shareMenu.style.display = 'none';
   langMenu.style.display = 'none';
 });

  // Auto-hide controls
  const wrapper = document.querySelector('.apple-video-wrapper-player-video-il-silenzio-della-natura-desktop');
  const resetHideControls = () => {
  // mostra subito i controlli
  controls.classList.remove('hide');
  wrapper.classList.remove('hide-cursor');
  // resetta il timeout precedente
  clearTimeout(hideTimeout);
  // se il video è in play, ri‑programma l’auto‑hide dopo 3s
  if (!video.paused) {
    hideTimeout = setTimeout(() => {
      controls.classList.add('hide');
      wrapper.classList.add('hide-cursor');
    }, 3000);
  }
};
    
  function formatTime(s) {
    const m=Math.floor(s/60), sec=Math.floor(s%60).toString().padStart(2,'0');
    return `${m}:${sec}`;
  }

// apri/chiudi menu lingua
langBtn.addEventListener('click', e => {
  e.stopPropagation();
  shareMenu.style.display = 'none';      // ← chiudo il menu share
  subsMenu.style.display   = 'none';    // ← CHIUDI SEMPRE IL MENU SOTTOTITOLI
  langMenu.style.display = langMenu.style.display === 'flex' ? 'none' : 'flex';
});

// clic su voce di lingua
langMenu.querySelectorAll('.lang-item-player-video-il-silenzio-della-natura-desktop').forEach(item => {
  item.addEventListener('click', () => {
    const newLang = item.dataset.lang;            // "it" oppure "en"
    document.documentElement.lang = newLang;      // imposta lang sull’<html>
    // (qui potresti aggiungere logica di i18n o ricaricare la pagina)
    langMenu.style.display = 'none';
    // opzionale: cambiare tooltip o titolo del button
    langBtn.title = newLang === 'it' ? 'Italiano' : 'English';
  });
});

// Auto‑hide controls e cursore
wrapper.addEventListener('mousemove', resetHideControls);
  controls.classList.remove('hide');
  wrapper.classList.remove('hide-cursor');

  clearTimeout(hideTimeout);
  // se il video è in play, allora nascondi dopo 3s
  if (!video.paused) {
    hideTimeout = setTimeout(() => {
      controls.classList.add('hide');
      wrapper.classList.add('hide-cursor');
    }, 3000);
  }

  // Ri-avvia l’auto-hide su **qualsiasi** interazione
['click', 'mousemove', 'keydown', 'wheel', 'touchstart', 'pointermove'].forEach(evt => {
  // sul wrapper per mouse/touch/ruota…
  wrapper.addEventListener(evt, resetHideControls, { passive: true });
});
// e sul documento per garantire di catturare i keydown anche se il focus NON è sul wrapper
document.addEventListener('keydown', resetHideControls);

document.addEventListener('fullscreenchange', () => {
  const wrapper = document.querySelector('.apple-video-wrapper-player-video-il-silenzio-della-natura-desktop');
  if (document.fullscreenElement) {
    wrapper.classList.add('fullscreen');
  } else {
    wrapper.classList.remove('fullscreen');
  }
});
  };  
  document.body.appendChild(dashScript);
})();
