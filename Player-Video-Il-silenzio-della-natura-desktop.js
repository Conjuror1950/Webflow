<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Il Silenzio della Natura</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div id="Player-Video-Il-silenzio-della-natura-container-desktop">
    <div class="apple-video-wrapper">
      <!-- Immagini di avviso -->
      <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/68286f66a406b7094b5b2407_avviso%20sequenze%20con%20immagini%20e%20luci%20lampeggianti.png" alt="Avviso: sequenze con immagini e luci lampeggianti" class="warning-icon" />
      <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/68288c23d64340a80e1a52e1_avviso%20et%C3%A0.png" alt="Avviso: età" class="warning-age" />

      <!-- Video -->
      <video id="apple-video" preload="metadata" crossorigin="anonymous" autoplay playsinline>
        <track kind="subtitles" label="Italiano (automatico)" srclang="it" src="https://andreaingrassia.netlify.app/assets/subtitles/captions-il-silenzio-della-natura.vtt">
      </video>
      <div id="custom-subtitles" class="subtitle-container"></div>

      <!-- Controlli -->
      <div class="controls">
        <!-- Top bar -->
        <div class="top-bar">
          <button class="close-btn">
            <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a6e03d818ab9f59079de2_xmark.svg" alt="Close" style="width:18px; height:18px;">
          </button>
          <div class="volume-control">
            <input type="range" class="volume" min="0" max="1" step="0.01" value="1">
            <img id="volume-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681d13cccb3122eb07cc40af_custom.speaker.wave.3.fill.2.2.svg" alt="Volume alto">
          </div>
        </div>

        <!-- Center Controls -->
        <div class="center-controls">
          <button class="rewind">
            <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a5fb8fe6435455d3d98da_10.arrow.trianglehead.counterclockwise.svg" alt="Rewind 10" style="height:35px;">
          </button>
          <button class="play-pause">
            <img class="play-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a7228fdd5352747977676_play.fill.svg" alt="Play" style="height:50px;">
            <img class="pause-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a722870d098221ad93f47_pause.fill.svg" alt="Pausa" style="height:50px; display:none;">
          </button>
          <button class="forward">
            <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a5fb8f7a09fb00f328afb_10.arrow.trianglehead.clockwise.svg" alt="Forward 10" style="height:35px;">
          </button>
        </div>

        <!-- Bottom Bar -->
        <div class="bottom-bar">
          <div class="bottom-top-row">
            <div class="ep-title">S1, E1 · Il silenzio della natura</div>
            <div class="serie-title">Produzioni Cinematografiche</div>
            <div class="right-controls">
              <!-- Sottotitoli -->
              <button class="subs-btn">
                <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681c881581975b4efc170207_captions.bubble.svg" alt="Sottotitoli" style="width:20px;height:20px;">
              </button>
              <div class="subs-menu" style="display:none;">
                <button class="title-subs-item">Sottotitoli</button>
                <button class="subs-item" data-val="-1">Disattivati</button>
                <button class="subs-item selected" data-val="0">Italiano (automatico)</button>
              </div>

              <!-- Lingua -->
              <button class="lang-btn">
                <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681bb7eb7c5e96fc0889f14c_waveform.circle.svg" alt="Lingua" style="width:20px; height:20px;">
              </button>
              <div class="lang-menu" style="display:none;">
                <button class="title-lang-item">Audio</button>
                <button class="lang-item" data-lang="it">Originale: Italiano<span class="check">✓</span></button>
              </div>

              <!-- Condividi -->
              <button class="share-btn">
                <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681c7cf63258616ead57cdf0_square.and.arrow.up.svg" alt="Condividi" class="share-icon" style="width:18px; height:30px;">
              </button>
              <div class="share-menu" style="display:none;">
                <button class="share-item copy-link">
                  <span class="item-text">Copia Link</span>
                  <img class="item-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681b6628e632be2dca7bfe8e_link.svg" width="18" height="18" alt="Link Icon">
                </button>
                <button class="share-item email-share">
                  <span class="item-text">Email</span>
                  <img class="item-icon" src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681b6628ed25af24c9b87b32_envelope.fill.svg" width="18" height="18" alt="Email Icon">
                </button>
              </div>

              <!-- Schermo intero -->
              <button class="fullscreen-btn">
                <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/681a6105f7d436f1d44084d0_arrow.up.backward.and.arrow.down.forward.svg" alt="Fullscreen" style="width:18px; height:18px;">
              </button>
            </div>
          </div>

          <!-- Barra di avanzamento -->
          <div class="progress-wrapper" style="position:relative;">
            <input type="range" class="progress" value="0" step="0.1">
            <div class="scrub-thumb"></div>
          </div>

          <!-- Anteprima video -->
          <div class="preview-container" style="display:none;">
            <video id="preview-video" muted preload="metadata" crossorigin="anonymous"></video>
            <div id="preview-subtitles" class="subtitle-container"></div>
            <div class="preview-time">0:00</div>
          </div>

          <!-- Timer -->
          <div class="extras">
            <span class="time">0:00</span>
            <span class="remaining-time">-0:00</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
