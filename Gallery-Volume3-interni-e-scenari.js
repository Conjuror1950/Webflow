(function() {
  // Inserisce il CSS nel <head>
  var galleryCSS = `
    /* Importazione del font */
    @import url("https://cdn.apple.com/sf-pro/SF-Pro-Display-Regular.woff2") format("woff2");

    /* Stili base */
    body {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 450;
      margin: 0;
      padding: 0;
      background: transparent;
      overflow-y: auto;
    }

    /* Wrapper per isolare lo slider e limitare la larghezza */
    .wrapper-slider {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 1360px;
      margin: 0 auto; /* Centro orizzontalmente */
      width: 100%;
    }

    /* Container interno per il layout dello slider e dei dettagli */
    .container-gallery {
      display: flex;
      width: 100%;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;
    }

    /* --- SLIDER --- */
    .slider-gallery {
      position: relative;
      padding: 50px 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #f7f7f7;
      border-radius: 10px;
    }

    .slides-gallery {
      display: flex;
      transition: transform 0.3s ease-in-out;
    }

    .slide-gallery {
      min-width: 100%;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .product-image {
      max-height: 65vh;
      max-width: 100%;
      object-fit: contain;
      border-radius: 2%;
      cursor: pointer;
    }

    .product-image:hover {
      transform: scale(1.0);
    }

    /* Pulsanti per lo slider */
    .slider-buttons {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      pointer-events: none;
    }

    .slider-button {
      position: absolute;
      background: #d3d3d3;
      border: none;
      width: 60px;
      height: 60px;
      color: rgba(29, 29, 29, 0.75);
      font-size: 30px;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.3s, color 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: auto;
    }

    .slider-button.prev {
      left: 20px;
      transform: translateY(-50%);
    }

    .slider-button.next {
      right: 20px;
      transform: translateY(-50%);
    }

    .slider-button:hover {
      background: rgba(211, 211, 211, 0.75);
      color: rgba(29, 29, 29, 0.90);
    }

    /* Indicatori delle slide */
    .slider-indicators {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 2;
    }

    .indicator {
      width: 8px;
      height: 8px;
      background: #86868b;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.3s;
    }

    .indicator.active {
      background: #1d1d1d;
    }

    /* Testo sotto gli indicatori */
    .slide-count {
      position: absolute;
      bottom: 65px;
      left: 50%;
      transform: translateX(-50%);
      color: #f7f7f7;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      z-index: 2;
    }

    /* --- DETTAGLI --- */
    .details-gallery {
      width: 18%;
      text-align: left;
      padding: 50px;
      box-sizing: border-box;
    }

    h1 {
      font-family: "SF Pro Display", sans-serif !important;
      font-size: 24px;
      font-weight: 600;
      color: black;
    }

    .option-button {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .option-gallery {
      background: white;
      border: 0.8px solid #1d1d1d;
      border-radius: 12px;
      padding: 14px 20px;
      cursor: pointer;
      transition: border 0.2s, box-shadow 0.2s;
      text-align: left;
      width: 250%;
      position: relative;
    }

    .option-gallery:hover,
    .option-gallery.selected {
      border-color: #0071e3;
    }

    .option-main {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .option-title {
      font-size: 16px;
      font-weight: 600;
      color: #1d1d1f;
    }

    .option-side {
      font-size: 13px;
      color: #86868b;
      margin-left: 10px;
      white-space: nowrap;
    }

    .option-subtext {
      font-size: 13px;
      color: #86868b;
      margin-top: 6px;
    }

    .info-box {
      width: 250%;
      background: #f7f7f7;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
      color: black;
      box-sizing: border-box;
    }

    .additional-info {
      width: 250%;
      background: transparent;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
      color: black;
      box-sizing: border-box;
    }

    .info-bold {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .info-regular {
      font-size: 13px;
      line-height: 1.4;
    }

    .title-wrapper-gallery {
      display: flex;
      align-items: baseline;
      gap: 5px;
      flex-wrap: nowrap;
      white-space: nowrap;
    }

    .subtitle {
      font-family: "SF Pro Display", sans-serif !important;
      font-size: 24px;
      font-weight: 600;
      color: #6e6e73;
    }

    /* Animazione del download: cornice progressiva */
    .spinner {
      display: none;
      position: absolute;
      bottom: 10px;
      right: 20px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
    }

    .progress-frame {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: conic-gradient(#0071e3 0deg, #d3d3d3 0deg);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .progress-frame::after {
      content: "";
      width: 80%;
      height: 80%;
      background: white;
      border-radius: 50%;
    }

    /* Fullscreen */
    :fullscreen .slider-gallery,
    :-webkit-full-screen .slider-gallery,
    :-moz-full-screen .slider-gallery,
    :-ms-fullscreen .slider-gallery {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
      padding: 0;
    }

    :fullscreen .slides-gallery,
    :-webkit-full-screen .slides-gallery {
      height: 100%;
    }

    :fullscreen .slide-gallery {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    :fullscreen .product-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 2%;
    }

    :fullscreen .slider-buttons,
    :fullscreen .slider-indicators,
    :fullscreen .slide-count {
      z-index: 10;
    }

    /* Titoli sopra e sotto lo slider */
    .slider-title-top {
      font-family: "SF Pro Display", sans-serif !important;
      text-align: left;     
      color: black;
      margin-top: 60px;
      margin-bottom: 20px;
    }

    .slider-title-top h2 {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 600;
      margin: 0;
      font-size: 24px;
    }

    .slider-title-top p {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 500;
      font-size: 13px;
      color: #86868b;
    }

    .slider-title-bottom {
      font-family: "SF Pro Display", sans-serif !important;
      max-width: 970px;
      text-align: left;     
      color: black;
      margin-top: 0px;
      margin-bottom: 15px;
    }

    .slider-title-bottom h2 {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 600;
      font-size: 14px;
      margin-bottom: -2px;
    }

    .slider-title-bottom p {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 400;
      font-size: 13px;
      color: #86868b;
    }
  `;
