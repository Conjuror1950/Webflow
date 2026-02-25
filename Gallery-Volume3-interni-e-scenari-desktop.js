(function() {
  // Funzione per aggiungere il CSS alla pagina
  function addStyle(cssText) {
    var head = document.head || document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.type = "text/css";
    if (style.styleSheet) {
      style.styleSheet.cssText = cssText;
    } else {
      style.appendChild(document.createTextNode(cssText));
    }
    head.appendChild(style);
  }

  // CSS della gallery (stile completo), con media query per desktop (>= 1280px)
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
    .wrapper-slider-Volume3-interni-e-scenari-desktop {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 1360px;
      margin: 0 auto;
      width: 100%;
    }

    /* Container interno per il layout dello slider e dei dettagli */
    .container-Volume3-interni-e-scenari-desktop {
      display: flex;
      width: 100%;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;
    }

    /* --- SLIDER --- */
    .slider-Volume3-interni-e-scenari-desktop {
      position: relative;
      padding: 50px 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #f7f7f7;
      border-radius: 10px;
    }
    .slides-Volume3-interni-e-scenari-desktop {
      display: flex;
      transition: transform 0.3s ease-in-out;
    }
    .slide-Volume3-interni-e-scenari-desktop {
      min-width: 100%;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .product-image-Volume3-interni-e-scenari-desktop {
      max-height: 65vh;
      max-width: 100%;
      object-fit: contain;
      border-radius: 2%;
      cursor: pointer;
    }
    .product-image-Volume3-interni-e-scenari-desktop:hover {
      transform: scale(1.0);
    }
    /* Pulsanti per lo slider */
    .slider-buttons-Volume3-interni-e-scenari-desktop {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      pointer-events: none;
    }
    .slider-button-Volume3-interni-e-scenari-desktop {
      position: absolute;
      background: #d3d3d3;
      border: none;
      width: 55px;
      height: 55px;
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
    .slider-button-Volume3-interni-e-scenari-desktop.prev {
      left: 20px;
      transform: translateY(-50%);
    }
    .slider-button-Volume3-interni-e-scenari-desktop.next {
      right: 20px;
      transform: translateY(-50%);
    }
    .slider-button-Volume3-interni-e-scenari-desktop:hover {
      background: rgba(211, 211, 211, 0.75);
      color: rgba(29, 29, 29, 0.90);
    }
    /* Indicatori delle slide */
    .slider-indicators-Volume3-interni-e-scenari-desktop {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 6px;
      z-index: 2;
    }
    .indicator-Volume3-interni-e-scenari-desktop {
      width: 6px;
      height: 6px;
      background: #86868b;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.3s;
    }
    .indicator-Volume3-interni-e-scenari-desktop.active {
      background: #1d1d1d;
    }
    /* Testo sotto gli indicatori */
    .slide-count-Volume3-interni-e-scenari-desktop {
      position: absolute;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%);
      color: #f7f7f7;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      z-index: 2;
    }
    /* --- DETTAGLI --- */
    .details-Volume3-interni-e-scenari-desktop {
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
    .option-button-Volume3-interni-e-scenari-desktop {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .option-Volume3-interni-e-scenari-desktop {
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
    .option-Volume3-interni-e-scenari-desktop:hover,
    .option-Volume3-interni-e-scenari-desktop.selected {
      border-color: #0071e3;
    }
    .option-main-Volume3-interni-e-scenari-desktop {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .option-title-Volume3-interni-e-scenari-desktop {
      font-size: 16px;
      font-weight: 600;
      color: #1d1d1f;
    }
    .option-side-Volume3-interni-e-scenari-desktop {
      font-size: 13px;
      color: #86868b;
      margin-left: 10px;
      white-space: nowrap;
    }
    .option-subtext-Volume3-interni-e-scenari-desktop {
      font-size: 13px;
      color: #86868b;
      margin-top: 6px;
    }
    .info-box-Volume3-interni-e-scenari-desktop {
      width: 250%;
      background: #f7f7f7;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
      color: black;
      box-sizing: border-box;
    }
    .additional-info-Volume3-interni-e-scenari-desktop {
      width: 250%;
      background: transparent;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
      color: black;
      box-sizing: border-box;
    }
    .info-bold-Volume3-interni-e-scenari-desktop {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 4px;
    }
    .info-regular-Volume3-interni-e-scenari-desktop {
      font-size: 13px;
      line-height: 1.4;
    }
    .title-wrapper-Volume3-interni-e-scenari-desktop {
      display: flex;
      align-items: baseline;
      gap: 5px;
      flex-wrap: nowrap;
      white-space: nowrap;
    }
    .subtitle-Volume3-interni-e-scenari-desktop {
      font-family: "SF Pro Display", sans-serif !important;
      font-size: 24px;
      font-weight: 600;
      color: #6e6e73;
    }
    /* Animazione del download: cornice progressiva */
    .spinner-Volume3-interni-e-scenari-desktop {
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
    .progress-frame-Volume3-interni-e-scenari-desktop {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: conic-gradient(#0071e3 0deg, #d3d3d3 0deg);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .progress-frame-Volume3-interni-e-scenari-desktop::after {
      content: "";
      width: 80%;
      height: 80%;
      background: white;
      border-radius: 50%;
    }
    /* Fullscreen */
    :fullscreen .slider-Volume3-interni-e-scenari-desktop,
    :-webkit-full-screen .slider-Volume3-interni-e-scenari-desktop,
    :-moz-full-screen .slider-Volume3-interni-e-scenari-desktop,
    :-ms-fullscreen .slider-Volume3-interni-e-scenari-desktop {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
      padding: 0;
    }
    :fullscreen .slides-Volume3-interni-e-scenari-desktop,
    :-webkit-full-screen .slides-Volume3-interni-e-scenari-desktop {
      height: 100%;
    }
    :fullscreen .slide-Volume3-interni-e-scenari-desktop {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    :fullscreen .product-image-Volume3-interni-e-scenari-desktop {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 2%;
    }
    :fullscreen .slider-buttons-Volume3-interni-e-scenari-desktop,
    :fullscreen .slider-indicators-Volume3-interni-e-scenari-desktop,
    :fullscreen .slide-count-Volume3-interni-e-scenari-desktop {
      z-index: 10;
    }
    /* Titoli sopra e sotto lo slider */
    .slider-title-top-Volume3-interni-e-scenari-desktop {
      font-family: "SF Pro Display", sans-serif !important;
      text-align: left;     
      color: black;
      margin-top: 60px;
      margin-bottom: 65px;
    }
    .slider-title-top-Volume3-interni-e-scenari-desktop h2 {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 600;
      margin: 0;
      font-size: 24px;
    }
    .slider-title-top-Volume3-interni-e-scenari-desktop p {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 500;
      font-size: 13px;
      color: #86868b;
    }

    /* Media query: visualizza solo su desktop (>= 1280px) */
    @media screen and (max-width: 1279px) {
      .wrapper-slider-Volume3-interni-e-scenari-desktop {
        display: none !important;
      }
    }
  `;
  addStyle(galleryCSS);

  // HTML della gallery
  var galleryHTML = `
    <div class="wrapper-slider-Volume3-interni-e-scenari-desktop">
      <div class="slider-title-top-Volume3-interni-e-scenari-desktop">
        <h2>‎ </h2>
        <p>‎ </p>
      </div>
      <div class="container-Volume3-interni-e-scenari-desktop">
        <div class="slider-Volume3-interni-e-scenari-desktop">
          <div class="slides-Volume3-interni-e-scenari-desktop"></div>
          <div class="slider-buttons-Volume3-interni-e-scenari-desktop">
            <button class="slider-button-Volume3-interni-e-scenari-desktop prev">
              <img
                src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/680a56d179fee9c3b97257aa_chevron.left.svg"
                alt="Indietro"
                style="width:24px; height:24px;"
              />
            </button>
            <button class="slider-button-Volume3-interni-e-scenari-desktop next">
              <img
                src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/680a52aa54d1922ad06feeeb_be514248c3f97e7343cec2a888aad323_chevron.right.svg"
                alt="Avanti"
                style="width:24px; height:24px;"
              />
            </button>
          </div>
          <div class="slider-indicators-Volume3-interni-e-scenari-desktop"></div>
          <div class="slide-count-Volume3-interni-e-scenari-desktop">
            <span id="slide-counter-Volume3-interni-e-scenari-desktop">1 di 10</span>
          </div>
        </div>
        <div class="details-Volume3-interni-e-scenari-desktop">
          <div class="title-wrapper-Volume3-interni-e-scenari-desktop">
            <h1>Download.</h1>
            <span class="subtitle-Volume3-interni-e-scenari-desktop">Quale scegli?</span>
          </div>
          <div class="option-button-Volume3-interni-e-scenari-desktop">
            <div class="option-Volume3-interni-e-scenari-desktop" id="download-single-Volume3-interni-e-scenari-desktop">
              <div class="option-main-Volume3-interni-e-scenari-desktop">
                <span class="option-title-Volume3-interni-e-scenari-desktop">Immagine selezionata</span>
                <span class="option-side-Volume3-interni-e-scenari-desktop">.jpg¹</span>
              </div>
              <div class="option-subtext-Volume3-interni-e-scenari-desktop">Qualità originale, HD</div>
              <div class="option-subtext-Volume3-interni-e-scenari-desktop">1 elemento, ~3 MB</div>
            </div>
            <div class="option-Volume3-interni-e-scenari-desktop" id="download-all-Volume3-interni-e-scenari-desktop">
              <div class="option-main-Volume3-interni-e-scenari-desktop">
                <span class="option-title-Volume3-interni-e-scenari-desktop">Intero volume</span>
                <span class="option-side-Volume3-interni-e-scenari-desktop">.zip²</span>
              </div>
              <div class="option-subtext-Volume3-interni-e-scenari-desktop">Qualità originale, HD</div>
              <div class="option-subtext-Volume3-interni-e-scenari-desktop">10 elementi, ~20 MB</div>
              <div class="spinner-Volume3-interni-e-scenari-desktop">
                <div class="progress-frame-Volume3-interni-e-scenari-desktop"></div>
              </div>
            </div>
            <div class="info-box-Volume3-interni-e-scenari-desktop">
              <div class="info-bold-Volume3-interni-e-scenari-desktop">Panoramica del contenuto</div>
              <div class="info-regular-Volume3-interni-e-scenari-desktop">Un album che esplora ambienti affascinanti e suggestivi, catturando l’essenza degli spazi interni e della ristorazione. Ogni immagine racconta un viaggio visivo attraverso ambienti che parlano di stile, comfort e accoglienza.</div>
            </div>
            <div class="additional-info-Volume3-interni-e-scenari-desktop">
              <div class="info-bold-Volume3-interni-e-scenari-desktop">Espandi</div>
              <div class="info-regular-Volume3-interni-e-scenari-desktop">Tocca un'immagine per vederla a tutto schermo.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Modifica: inietta la gallery dentro un contenitore con ID "gallery-container"
  function injectGallery() {
    var container = document.getElementById("Volume3-interni-e-scenari-container-desktop");
    if (container) {
      container.innerHTML = galleryHTML;
    } else {
      // Se il contenitore non viene trovato, esegue l'append al body come fallback
      var defaultContainer = document.createElement("div");
      defaultContainer.innerHTML = galleryHTML;
      document.body.appendChild(defaultContainer);
      console.warn("Elemento con ID 'Volume3-interni-e-scenari-container-desktop' non trovato. Iniettato in body come fallback.");
    }
  }
  injectGallery();

  // Funzione per caricare uno script esterno (usata per JSZip)
  function loadScript(src, callback) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = src;
    s.onload = callback;
    s.onerror = function() {
      console.error("Impossibile caricare lo script:", src);
    };
    document.head.appendChild(s);
  }

  // Funzione di inizializzazione della Gallery (Immagini)
  function initGallery() {
    var images = [
      {webp: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b5114eea291062dc7fc__MG_0083.jpg",
       jpg: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b5114eea291062dc7fc__MG_0083.jpg",
       name: "MG_0083.jpg"},

      {webp: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b50d434e864aa0f68a4__MG_0077.jpg",
       jpg: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b50d434e864aa0f68a4__MG_0077.jpg",
       name: "MG_0077.jpg"},

      {webp: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b51346b80708698f4a0__MG_0138.jpg",
       jpg: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b51346b80708698f4a0__MG_0138.jpg",
       name: "MG_0138.jpg"},

      {webp: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b4f8772cf23748bcae8__MG_0079.jpg",
       jpg: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b4f8772cf23748bcae8__MG_0079.jpg",
       name: "MG_0079.jpg"},

      {webp: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbd530c4cc44e364214__MG_0103.jpg",
       jpg: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbd530c4cc44e364214__MG_0103.jpg",
       name: "MG_0103.jpg"},

      {webp: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbd1d871307145be02a__MG_0133.jpg",
       jpg: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbd1d871307145be02a__MG_0133.jpg",
       name: "MG_0133.jpg"},

      {webp: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b505b12770d47abc384__MG_0085.jpg",
       jpg: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b505b12770d47abc384__MG_0085.jpg",
       name: "MG_0085.jpg"},

      {webp: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbe77fba2ff0235a00d__MG_0082.jpg",
       jpg: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbe77fba2ff0235a00d__MG_0082.jpg",
       name: "MG_0082.jpg"},

      {webp: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbfbfd2c0f0a9b8625a__MG_0104.jpg",
       jpg: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbfbfd2c0f0a9b8625a__MG_0104.jpg",
       name: "MG_0104.jpg"},

      {webp: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbec633b961cc001ef9__MG_0087.jpg",
       jpg: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbec633b961cc001ef9__MG_0087.jpg",
       name: "MG_0087.jpg"}
    ];
    var slideIndex = 0;
    
    // Crea le slide dinamicamente
    function createSlides() {
      var slidesContainer = document.querySelector(".slides-Volume3-interni-e-scenari-desktop");
      images.forEach(function(img, index) {
        var slide = document.createElement("div");
        slide.className = "slide-Volume3-interni-e-scenari-desktop";
        var imageEl = document.createElement("img");
        imageEl.src = img.webp;
        imageEl.alt = "Image " + (index + 1);
        imageEl.className = "product-image-Volume3-interni-e-scenari-desktop";
        slide.appendChild(imageEl);
        slidesContainer.appendChild(slide);
      });
    }
    
    // Crea gli indicatori
    function createIndicators() {
      var indicatorContainer = document.querySelector(".slider-indicators-Volume3-interni-e-scenari-desktop");
      images.forEach(function(_, idx) {
        var dot = document.createElement("div");
        dot.className = "indicator-Volume3-interni-e-scenari-desktop" + (idx === 0 ? " active" : "");
        dot.addEventListener("click", function() {
          moveToSlide(idx);
        });
        indicatorContainer.appendChild(dot);
      });
    }
    
    // Aggiorna il contatore della slide
    function updateSlideCounter() {
      document.getElementById("slide-counter-Volume3-interni-e-scenari-desktop").textContent = (slideIndex + 1) + " di " + images.length;
    }
    
    // Aggiorna la visibilità dei pulsanti
    function updateSliderButtons() {
      document.querySelector(".slider-button-Volume3-interni-e-scenari-desktop.prev").style.display = slideIndex === 0 ? "none" : "flex";
      document.querySelector(".slider-button-Volume3-interni-e-scenari-desktop.next").style.display = slideIndex === images.length - 1 ? "none" : "flex";
    }
    
    // Aggiorna gli indicatori attivi
    function updateIndicators() {
      var dots = document.querySelectorAll(".indicator-Volume3-interni-e-scenari-desktop");
      dots.forEach(function(dot, i) {
        dot.classList.toggle("active", i === slideIndex);
      });
    }
    
    // Funzione per spostarsi verso una slide specifica
    function moveToSlide(index) {
      slideIndex = index;
      document.querySelector(".slides-Volume3-interni-e-scenari-desktop").style.transform = "translateX(-" + (slideIndex * 100) + "%)";
      updateIndicators();
      updateSliderButtons();
      updateSlideCounter();
    }
    
    createSlides();
    createIndicators();
    updateSlideCounter();
    updateSliderButtons();
    
    // Event listener per i pulsanti next e prev
    document.querySelector(".slider-button-Volume3-interni-e-scenari-desktop.next").addEventListener("click", function() {
      if (slideIndex < images.length - 1) {
        moveToSlide(slideIndex + 1);
      }
    });
    document.querySelector(".slider-button-Volume3-interni-e-scenari-desktop.prev").addEventListener("click", function() {
      if (slideIndex > 0) {
        moveToSlide(slideIndex - 1);
      }
    });
    
    // Navigazione con le frecce della tastiera
    document.addEventListener("keydown", function(e) {
      if (e.key === "ArrowRight" && slideIndex < images.length - 1) {
        moveToSlide(slideIndex + 1);
      } else if (e.key === "ArrowLeft" && slideIndex > 0) {
        moveToSlide(slideIndex - 1);
      }
    });
    
    // Abilita il fullscreen cliccando su un'immagine
    document.querySelectorAll(".product-image-Volume3-interni-e-scenari-desktop").forEach(function(image) {
      image.addEventListener("click", function() {
        var slider = document.querySelector(".slider-Volume3-interni-e-scenari-desktop");
        if (!document.fullscreenElement) {
          (slider.requestFullscreen || slider.webkitRequestFullscreen || slider.msRequestFullscreen).call(slider);
        } else {
          (document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen).call(document);
        }
      });
    });
    
// Download dell'immagine singola
document.getElementById("download-single-Volume3-interni-e-scenari-desktop")
.addEventListener("click", function() {

  var fileUrl = images[slideIndex].jpg;
  var fileName = images[slideIndex].name;

fetch(fileUrl)
  .then(response => response.blob())
  .then(blob => {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  })
  .catch(err => console.error("Errore download singolo:", err));
});
    
// Download dell'intero volume in ZIP
var downloadAllButton = document.getElementById("download-all-Volume3-interni-e-scenari-desktop");
var spinner = downloadAllButton.querySelector(".spinner-Volume3-interni-e-scenari-desktop");
var progressFrame = spinner.querySelector(".progress-frame-Volume3-interni-e-scenari-desktop");

downloadAllButton.addEventListener("click", function() {
  spinner.style.display = "flex"; // mostra lo spinner
  progressFrame.style.background = "conic-gradient(#0071e3 0deg, #d3d3d3 0deg)";

  var zipUrl = "https://is1-ssl-mzstatic.netlify.app/image/thumb/PurpleSource221/Placeholder.mill/Osculati_Salone_Nautico_Shared_Asset_Package_2025.zip";
  var fileName = "Volume-3.zip";

  fetch(zipUrl)
    .then(response => {
      if (!response.ok) throw new Error("Errore nel download");
      const contentLength = response.headers.get("content-length");
      if (!contentLength) throw new Error("Content-Length non disponibile");

      const total = parseInt(contentLength, 10);
      let loaded = 0;
      const reader = response.body.getReader();
      const chunks = [];

      function read() {
        return reader.read().then(({ done, value }) => {
          if (done) return;
          chunks.push(value);
          loaded += value.length;

          // Aggiorna il cerchietto conico
          const progress = (loaded / total) * 360;
          progressFrame.style.background = `conic-gradient(#0071e3 ${progress}deg, #d3d3d3 ${progress}deg)`;

          return read();
        });
      }

      return read().then(() => {
        const blob = new Blob(chunks);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        spinner.style.display = "none"; // nasconde lo spinner
      });
    })
    .catch(err => {
      console.error("Errore download .zip:", err);
      spinner.style.display = "none";
    });
});
    
    
    // Rendi visibile la gallery (se necessario)
    document.querySelector(".slider-Volume3-interni-e-scenari-desktop").style.opacity = "1";
    document.querySelector(".details-Volume3-interni-e-scenari-desktop").style.opacity = "1";
  }

  // Avvia l’inizializzazione quando il DOM è completamente caricato
document.addEventListener("DOMContentLoaded", function() {
  initGallery();
  });
})();
