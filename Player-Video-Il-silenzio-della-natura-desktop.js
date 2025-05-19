// Player-Video-Il-silenzio-della-natura-desktop.js
(function() {
  // 1) INIETTA IL CSS
  const css = `
.apple-video-wrapper {
  position:relative;
  width:100vw;
  height:100vh;
  background:black;
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif !important;
  overflow:hidden;
}
video {
  width: 95vw;
  height:100vh;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}
.apple-video-wrapper:fullscreen video,
.apple-video-wrapper:-webkit-full-screen video {
  width:100% !important;
  height:100% !important;
  object-fit: contain !important;
  background:black !important;
}
.apple-video-wrapper:fullscreen .preview-container video,
.apple-video-wrapper:-webkit-full-screen .preview-container video {
  width:100% !important;
  height:100% !important;
  object-fit: cover !important;
}
.preview-container {
  position: absolute;
  bottom: 70px;
  width: 402px;
  height: 220px;
  overflow: hidden;
  border: 0.1px solid rgba(255,255,255,0.2);
  background: black;
  pointer-events: none;
  border-radius: 10px;
}
#preview-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.scrub-thumb {
  position: absolute;
  margin-top: -11px;
  width: 11px;
  height: 11px;
  background: white;
  border-radius: 50%;
  transform: translateX(-50%);
  display: none;
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
.top-bar {
  display:flex;
  justify-content:space-between;
}
.volume {
  -webkit-appearance: none;
  appearance: none;
  width: 100px;
  height: 5px;
  background: rgba(255,255,255,0.1);
  border-radius: 6px;
  margin-top: -10px;
}
.volume::-webkit-slider-runnable-track,
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
  background: white;
  border-radius: 2px;
}
.volume::-ms-fill-upper {
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}
.volume::-webkit-slider-thumb,
.volume::-moz-range-thumb,
.progress::-webkit-slider-thumb,
.progress::-moz-range-thumb,
.progress::-ms-thumb {
  width: 11px;
  height: 11px;
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  -webkit-appearance: none;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.center-controls button {
  background:none;
  border:none;
  color:white;
  font-size:1.5rem;
}
.play-pause {
  position: relative;
  width: 50px;
  height: 50px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.8rem;
}
.play-pause .play-icon,
.play-pause .pause-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.center-controls button img {
  transition: filter 0.3s ease;
}
.center-controls .rewind:hover img,
.center-controls .forward:hover img {
  filter: brightness(1) drop-shadow(0 0 0.8px white);
}
.bottom-bar {
  display:flex;
  flex-direction:column;
  gap:.5rem;
  margin-top:50px;
  color:white;
}
.bottom-top-row {
  position: relative;
  top: 1px;
  display: flex;
  flex-wrap: wrap;
  justify-content:space-between;
  align-items: flex-start;
}
.serie-title {
  order: 1;
  flex-basis: auto;
  margin-right: auto;
  margin-top: 10px;
  font-weight:600;
  font-size:24px;
  color: white;
}
.ep-title {
  order: 0;
  flex-basis: 100%;
  font-weight:400;
  font-size:15px;
  margin-bottom: -2px;
  color: rgba(211, 211, 211, 0.90);
}
.time, .remaining-time {
  font-size:11px;
  color: rgba(211, 211, 211, 0.75);
}
.progress-wrapper {
  position:relative;
}
.progress {
  width:100%;
  background: rgba(255,255,255,0.1);
}
.progress::-moz-range-track,
.progress::-ms-track {
  height: 5px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  border: none;
  color: transparent;
}
@keyframes warning-fade {
  0% { opacity: 0; transform: translateY(0px); }
  10% { opacity: 1; }
  80% { opacity: 1; }
}
.warning-icon, .warning-age {
  position: absolute;
  top: 60px;
  margin-left: 15px;
  opacity: 0;
  animation: warning-fade 5s ease-in-out forwards;
  animation-delay: 2s;
  pointer-events: none;
  z-index: 5;
}
.warning-age {
  animation-name: warning-fade-age;
}
@keyframes warning-fade-age {
  0% { opacity: 0; }
  10% { opacity: 1; }
  50% { opacity: 1; }
}
.subs-menu,
.lang-menu,
.share-menu {
  display: none;
  position: absolute;
  background: rgba(0,0,0,0.8);
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 4px;
  gap: 0.25rem;
}
.subs-menu button,
.lang-menu button,
.share-menu button {
  background: none;
  border: none;
  color: white;
  text-align: left;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
.subs-menu button.selected,
.lang-menu button.selected {
  font-weight: bold;
}
.check {
  float: right;
}
`;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // 2) INIETTA L’HTML
  const wrapper = document.createElement('div');
  wrapper.className = 'apple-video-wrapper';
  wrapper.innerHTML = `
    <!-- avvisi -->
    <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/68286f66a406b7094b5b2407_avviso%20sequenze%20con%20immagini%20e%20luci%20lampeggianti.png" alt="Avviso: sequenze con immagini e luci lampeggianti" class="warning-icon">
    <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/68288c23d64340a80e1a52e1_avviso%20et%C3%A0.png" alt="Avviso: età" class="warning-age">
    <video id="apple-video" preload="metadata" crossorigin="anonymous" autoplay playsinline>
      <track kind="subtitles" label="Italiano (automatico)" srclang="it" src="https://andreaingrassia.netlify.app/assets/subtitles/captions-il-silenzio-della-natura.vtt">
    </video>
    <div id="custom-subtitles" class="subtitle-container"></div>
    <div class="controls">
      <div class="top-bar">
        <button class="close-btn"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a6e03d818ab9f59079de2_xmark.svg" alt="Close" style="width:18px;height:18px;"></button>
        <div class="volume-control">
          <input type="range" class="volume" min="0" max="1" step="0.01" value="1">
          <img id="volume-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681d13cccb3122eb07cc40af_custom.speaker.wave.3.fill.2.2.svg" alt="Volume alto">
        </div>
      </div>
      <div class="center-controls">
        <button class="rewind"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a5fb8fe6435455d3d98da_10.arrow.trianglehead.counterclockwise.svg" alt="Rewind" style="height:35px;"></button>
        <button class="play-pause">
          <img class="play-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a7228fdd5352747977676_play.fill.svg" alt="Play">
          <img class="pause-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a722870d098221ad93f47_pause.fill.svg" alt="Pausa" style="display:none;">
        </button>
        <button class="forward"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a5fb8f7a09fb00f328afb_10.arrow.trianglehead.clockwise.svg" alt="Forward" style="height:35px;"></button>
      </div>
      <div class="bottom-bar">
        <div class="bottom-top-row">
          <div class="ep-title">S1, E1 · Il silenzio della natura</div>
          <div class="serie-title">Produzioni Cinematografiche</div>
          <div class="right-controls">
            <button class="subs-btn"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681c881581975b4efc170207_captions.bubble.svg" alt="Sottotitoli" style="width:20px;height:20px;"></button>
            <div class="subs-menu">
              <button class="title-subs-item">Sottotitoli</button>
              <button class="subs-item" data-val="-1">Disattivati</button>
              <button class="subs-item selected" data-val="0">Italiano (automatico)</button>
            </div>
            <button class="lang-btn"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681bb7eb7c5e96fc0889f14c_waveform.circle.svg" alt="Lingua" style="width:20px;height:20px;"></button>
            <div class="lang-menu">
              <button class="title-lang-item">Audio</button>
              <button class="lang-item selected" data-lang="it">Originale: Italiano<span class="check">✓</span></button>
            </div>
            <button class="share-btn"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681c7cf63258616ead57cdf0_square.and.arrow.up.svg" alt="Condividi" style="width:18px;height:30px;"></button>
            <div class="share-menu">
              <button class="share-item copy-link"><span class="item-text">Copia Link</span><img class="item-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681b6628e632be2dca7bfe8e_link.svg" width="18" height="18" alt="Link"></button>
              <button class="share-item email-share"><span class="item-text">Email</span><img class="item-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681b6628ed25af24c9b87b32_envelope.fill.svg" width="18" height="18" alt="Email"></button>
            </div>
            <button class="fullscreen-btn"><img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a6105f7d436f1d44084d0_arrow.up.backward.and.arrow.down.forward.svg" alt="Fullscreen" style="width:18px;height:18px;"></button>
          </div>
        </div>
        <div class="progress-wrapper">
          <input type="range" class="progress" value="0" step="0.1">
          <div class="scrub-thumb"></div>
        </div>
        <div class="preview-container">
          <video id="preview-video" muted preload="metadata" crossorigin="anonymous"></video>
          <div id="preview-subtitles" class="subtitle-container"></div>
          <div class="preview-time">0:00</div>
        </div>
        <div class="extras"><span class="time">0:00</span><span class="remaining-time">-0:00</span></div>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  // 3) CARICA DASH.JS E INIZIALIZZA IL PLAYER
  const dashScript = document.createElement('script');
  dashScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/dashjs/5.0.0/legacy/umd/dash.all.min.js';
  dashScript.onload = () => {
    const manifest = 'https://il-silenzio-della-natura-video.netlify.app/manifest.mpd';
    const video = document.getElementById('apple-video');
    const player = dashjs.MediaPlayer().create();
    player.initialize(video, manifest, false);
    player.enableText(true);
    // … TUTTO IL RESTO DEL JS ORIGINALE (event listeners, preview, controls, ecc.)
    // Puoi copiare qui fedelmente la logica completa che avevi nel tuo <script> Webflow.
  };
  document.body.appendChild(dashScript);
})();
