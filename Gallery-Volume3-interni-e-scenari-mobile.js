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
    .wrapper-slider {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 1360px;
      margin: 0 auto;
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

    /* Media query: visualizza solo su desktop (>= 1280px) */
    @media screen and (min-width: 1280px) {
      .wrapper-slider {
        display: none !important;
      }
    }
  `;
  addStyle(galleryCSS);

  // HTML della gallery
  var galleryHTML = `
    <div class="wrapper-slider">
      <div class="slider-title-top">
        <h2>Interni e Scenari</h2>
        <p>Volume 3</p>
      </div>
      <div class="container-gallery">
        <div class="slider-gallery">
          <div class="slides-gallery"></div>
          <div class="slider-buttons">
            <button class="slider-button prev">❮</button>
            <button class="slider-button next">❯</button>
          </div>
          <div class="slider-indicators"></div>
          <div class="slide-count">
            <span id="slide-counter">1 di 10</span>
          </div>
        </div>
        <div class="details-gallery">
          <div class="title-wrapper-gallery">
            <h1>Download.</h1>
            <span class="subtitle">Quale scegli?</span>
          </div>
          <div class="option-button">
            <div class="option-gallery" id="download-single">
              <div class="option-main">
                <span class="option-title">Immagine selezionata</span>
                <span class="option-side">.jpg¹</span>
              </div>
              <div class="option-subtext">Qualità originale, HD</div>
              <div class="option-subtext">1 elemento, ~3 MB</div>
            </div>
            <div class="option-gallery" id="download-all">
              <div class="option-main">
                <span class="option-title">Intero volume</span>
                <span class="option-side">.zip²</span>
              </div>
              <div class="option-subtext">Qualità originale, HD</div>
              <div class="option-subtext">10 elementi, ~20 MB</div>
              <div class="spinner">
                <div class="progress-frame"></div>
              </div>
            </div>
            <div class="info-box">
              <div class="info-bold">Panoramica del contenuto</div>
              <div class="info-regular">Un album che esplora ambienti affascinanti e suggestivi, catturando l’essenza degli spazi interni e della ristorazione. Ogni immagine racconta un viaggio visivo attraverso ambienti che parlano di stile, comfort e accoglienza.</div>
            </div>
            <div class="additional-info">
              <div class="info-bold">Espandi</div>
              <div class="info-regular">Tocca un'immagine per vederla a tutto schermo.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="slider-title-bottom">
        <h2>Specifiche</h2>
        <p>Realizzato con Canon EOS 2000D e obiettivo 18-55mm EF-S. Il formato RAW (.CR2) garantisce una libertà totale in post-produzione, gestita attraverso Adobe Lightroom Classic. La raccolta contiene 10 elementi, immagini in HD (High Definition) scattate nel cuore della Toscana, Italia, nell'anno 2024.</p>
      </div>
    </div>
  `;

  // Modifica: inietta la gallery dentro un contenitore con ID "gallery-container"
  function injectGallery() {
    var container = document.getElementById("gallery-container");
    if (container) {
      container.innerHTML = galleryHTML;
    } else {
      // Se il contenitore non viene trovato, esegue l'append al body come fallback
      var defaultContainer = document.createElement("div");
      defaultContainer.innerHTML = galleryHTML;
      document.body.appendChild(defaultContainer);
      console.warn("Elemento con ID 'gallery-container' non trovato. Iniettato in body come fallback.");
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

  // Funzione di inizializzazione della gallery
  function initGallery() {
    var images = [
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b5114eea291062dc7fc__MG_0083.jpg", name: "MG_0083.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b50d434e864aa0f68a4__MG_0077.jpg", name: "MG_0077.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b51346b80708698f4a0__MG_0138.jpg", name: "MG_0138.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b4f8772cf23748bcae8__MG_0079.jpg", name: "MG_0079.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbd530c4cc44e364214__MG_0103.jpg", name: "MG_0103.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbd1d871307145be02a__MG_0133.jpg", name: "MG_0133.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659b505b12770d47abc384__MG_0085.jpg", name: "MG_0085.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbe77fba2ff0235a00d__MG_0082.jpg", name: "MG_0082.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbfbfd2c0f0a9b8625a__MG_0104.jpg", name: "MG_0104.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/67659fbec633b961cc001ef9__MG_0087.jpg", name: "MG_0087.jpg" }
    ];
    var slideIndex = 0;
    
    // Crea le slide dinamicamente
    function createSlides() {
      var slidesContainer = document.querySelector(".slides-gallery");
      images.forEach(function(img, index) {
        var slide = document.createElement("div");
        slide.className = "slide-gallery";
        var imageEl = document.createElement("img");
        imageEl.src = img.url;
        imageEl.alt = "Image " + (index + 1);
        imageEl.className = "product-image";
        slide.appendChild(imageEl);
        slidesContainer.appendChild(slide);
      });
    }
    
    // Crea gli indicatori
    function createIndicators() {
      var indicatorContainer = document.querySelector(".slider-indicators");
      images.forEach(function(_, idx) {
        var dot = document.createElement("div");
        dot.className = "indicator" + (idx === 0 ? " active" : "");
        dot.addEventListener("click", function() {
          moveToSlide(idx);
        });
        indicatorContainer.appendChild(dot);
      });
    }
    
    // Aggiorna il contatore della slide
    function updateSlideCounter() {
      document.getElementById("slide-counter").textContent = (slideIndex + 1) + " di " + images.length;
    }
    
    // Aggiorna la visibilità dei pulsanti
    function updateSliderButtons() {
      document.querySelector(".slider-button.prev").style.display = slideIndex === 0 ? "none" : "flex";
      document.querySelector(".slider-button.next").style.display = slideIndex === images.length - 1 ? "none" : "flex";
    }
    
    // Aggiorna gli indicatori attivi
    function updateIndicators() {
      var dots = document.querySelectorAll(".indicator");
      dots.forEach(function(dot, i) {
        dot.classList.toggle("active", i === slideIndex);
      });
    }
    
    // Funzione per spostarsi verso una slide specifica
    function moveToSlide(index) {
      slideIndex = index;
      document.querySelector(".slides-gallery").style.transform = "translateX(-" + (slideIndex * 100) + "%)";
      updateIndicators();
      updateSliderButtons();
      updateSlideCounter();
    }
    
    createSlides();
    createIndicators();
    updateSlideCounter();
    updateSliderButtons();
    
    // Event listener per i pulsanti next e prev
    document.querySelector(".slider-button.next").addEventListener("click", function() {
      if (slideIndex < images.length - 1) {
        moveToSlide(slideIndex + 1);
      }
    });
    document.querySelector(".slider-button.prev").addEventListener("click", function() {
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
    document.querySelectorAll(".product-image").forEach(function(image) {
      image.addEventListener("click", function() {
        var slider = document.querySelector(".slider-gallery");
        if (!document.fullscreenElement) {
          (slider.requestFullscreen || slider.webkitRequestFullscreen || slider.msRequestFullscreen).call(slider);
        } else {
          (document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen).call(document);
        }
      });
    });
    
    // Download dell'immagine singola
    document.getElementById("download-single").addEventListener("click", function() {
      var currentSlide = document.querySelectorAll(".slide-gallery")[slideIndex];
      var imgEl = currentSlide.querySelector("img");
      fetch(imgEl.src)
        .then(function(response) {
          return response.blob();
        })
        .then(function(blob) {
          var blobUrl = URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = blobUrl;
          // Imposta il filename prendendolo dall'URL
          var parts = imgEl.src.split("/");
          var fileName = parts[parts.length - 1].split("__").pop();
          a.download = fileName;
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(blobUrl);
        })
        .catch(function(error) {
          console.error("Errore durante il download:", error);
        });
    });
    
    // Download dell'intero volume in ZIP
    var downloadAllButton = document.getElementById("download-all");
    var spinner = downloadAllButton.querySelector(".spinner");
    var progressFrame = spinner.querySelector(".progress-frame");
    
    downloadAllButton.addEventListener("click", function() {
      spinner.style.display = "flex";
      progressFrame.style.background = "conic-gradient(#0071e3 0deg, #d3d3d3 0deg)";
      
      var zip = new JSZip();
      var folder = zip.folder("Interni e Scenari");
      images.forEach(function(img) {
        folder.file(img.name, fetch(img.url).then(function(r) { return r.blob(); }));
      });
      
      zip.generateAsync({ type: "blob" }, function updateProgress(metadata) {
        var progress = metadata.percent;
        var degree = progress * 3.6;
        progressFrame.style.background = "conic-gradient(#0071e3 " + degree + "deg, #d3d3d3 " + degree + "deg)";
      })
      .then(function(content) {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(content);
        a.download = "Volume 3.zip";
        a.click();
        spinner.style.display = "none";
      })
      .catch(function(err) {
        console.error("Errore nel download ZIP:", err);
        spinner.style.display = "none";
      });
    });
    
    // Rendi visibile la gallery (se necessario)
    document.querySelector(".slider-gallery").style.opacity = "1";
    document.querySelector(".details-gallery").style.opacity = "1";
  }

  // Avvia l’inizializzazione quando il DOM è completamente caricato
  document.addEventListener("DOMContentLoaded", function() {
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js", function() {
      initGallery();
    });
  });
})();
