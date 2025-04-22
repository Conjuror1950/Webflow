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
    .wrapper-slider-Volume3-interni-e-scenari-mobile {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 1360px;
      margin: 0 auto;
      width: 100%;
    }

    /* Container interno per il layout dello slider e dei dettagli */
    .container-Volume3-interni-e-scenari-mobile {
      display: flex;
      width: 91%;
      left: 18px;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;
    }

    /* --- SLIDER --- */
    .slider-Volume3-interni-e-scenari-mobile {
      position: relative;
      padding: 0px 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #f7f7f7;
      border-radius: 0px;
    }
    .slides-Volume3-interni-e-scenari-mobile {
      display: flex;
      flex-wrap: nowrap; /* Impedisce il wrapping degli elementi */
      transition: transform 0.3s ease-in-out;
    }
    .slide-Volume3-interni-e-scenari-mobile {
      flex: 0 0 100%; /* Impedisce la crescita e il restringimento, forza larghezza 100% */
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .product-image-Volume3-interni-e-scenari-mobile {
    width: 100%;
    height: 100%;
    object-fit: cover; /* oppure "contain" se preferisci vedere l’immagine intera */
    border-radius: 2%;
    cursor: pointer;
    }
    .product-image-Volume3-interni-e-scenari-mobile:hover {
      transform: scale(1.0);
    }
    /* Pulsanti per lo slider */
    .slider-buttons-Volume3-interni-e-scenari-mobile {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      pointer-events: none;
    }
    .slider-button-Volume3-interni-e-scenari-mobile {
      position: absolute;
      background: #d3d3d3;
      border: none;
      width: 55px;
      height: 55px;
      color: rgba(29, 29, 29, 0.75);
      font-size: 35px;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.3s, color 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: auto;
    }
    .slider-button-Volume3-interni-e-scenari-mobile.prev {
      left: 10px;
      transform: translateY(-50%);
    }
    .slider-button-Volume3-interni-e-scenari-mobile.next {
      right: 10px;
      transform: translateY(-50%);
    }
    .slider-button-Volume3-interni-e-scenari-mobile:hover {
      background: rgba(211, 211, 211, 0.75);
      color: rgba(29, 29, 29, 0.90);
    }
    /* Indicatori delle slide */
    .slider-indicators-Volume3-interni-e-scenari-mobile {
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 6px;
      z-index: 2;
    }
    .indicator-Volume3-interni-e-scenari-mobile {
      width: 5px;
      height: 5px;
      background: #86868b;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.3s;
    }
    .indicator-Volume3-interni-e-scenari-mobile.active {
      background: #1d1d1d;
    }
    /* Testo sotto gli indicatori */
    .slide-count-Volume3-interni-e-scenari-mobile {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      color: #f7f7f7;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      z-index: 2;
    }
    /* --- DETTAGLI --- */
    .details-Volume3-interni-e-scenari-mobile {
      width: 45.5%;
      text-align: left;
      padding: 18px;
      box-sizing: border-box;
    }
    h1 {
      font-family: "SF Pro Display", sans-serif !important;
      font-size: 24px;
      font-weight: 600;
      color: black;
    }
    .option-button-Volume3-interni-e-scenari-mobile {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .option-Volume3-interni-e-scenari-mobile {
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
    .option-Volume3-interni-e-scenari-mobile:hover,
    .option-Volume3-interni-e-scenari-mobile.selected {
      border-color: #0071e3;
    }
    .option-main-Volume3-interni-e-scenari-mobile {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .option-title-Volume3-interni-e-scenari-mobile {
      font-size: 16px;
      font-weight: 600;
      color: #1d1d1f;
    }
    .option-side-Volume3-interni-e-scenari-mobile {
      font-size: 13px;
      color: #86868b;
      margin-left: 10px;
      white-space: nowrap;
    }
    .option-subtext-Volume3-interni-e-scenari-mobile {
      font-size: 13px;
      color: #86868b;
      margin-top: 6px;
    }
    .info-box-Volume3-interni-e-scenari-mobile {
      width: 250%;
      background: #f7f7f7;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
      color: black;
      box-sizing: border-box;
    }
    .additional-info-Volume3-interni-e-scenari-mobile {
      width: 250%;
      background: transparent;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
      color: black;
      box-sizing: border-box;
    }
    .info-bold-Volume3-interni-e-scenari-mobile {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 4px;
    }
    .info-regular-Volume3-interni-e-scenari-mobile {
      font-size: 13px;
      line-height: 1.4;
    }
    .title-wrapper-Volume3-interni-e-scenari-mobile {
      display: flex;
      align-items: baseline;
      gap: 5px;
      flex-wrap: nowrap;
      white-space: nowrap;
    }
    .subtitle-Volume3-interni-e-scenari-mobile {
      font-family: "SF Pro Display", sans-serif !important;
      font-size: 24px;
      font-weight: 600;
      color: #6e6e73;
    }
    /* Animazione del download: cornice progressiva */
    .spinner-Volume3-interni-e-scenari-mobile {
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
    .progress-frame-Volume3-interni-e-scenari-mobile {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: conic-gradient(#0071e3 0deg, #d3d3d3 0deg);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .progress-frame-Volume3-interni-e-scenari-mobile::after {
      content: "";
      width: 80%;
      height: 80%;
      background: white;
      border-radius: 50%;
    }
    
    /* Titoli sopra e sotto lo slider */
    .slider-title-top-Volume3-interni-e-scenari-mobile {
      font-family: "SF Pro Display", sans-serif !important;
      text-align: left;     
      color: black;
      margin-top: 15px;
      margin-bottom: 0px;
      margin-left: 18px;
    }
    .slider-title-top-Volume3-interni-e-scenari-mobile h2 {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 600;
      margin: 0;
      font-size: 24px;
    }
    .slider-title-top-Volume3-interni-e-scenari-mobile p {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 500;
      font-size: 13px;
      color: #86868b;
    }
    .slider-title-bottom-Volume3-interni-e-scenari-mobile {
      font-family: "SF Pro Display", sans-serif !important;
      max-width: 970px;
      text-align: left;
      margin-top: -50px;
      margin-bottom: -50px;
      padding: 36px;
      color: black;
    }
    .slider-title-bottom-Volume3-interni-e-scenari-mobile h2 {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 600;
      font-size: 14px;
      margin-bottom: -2px;
    }
    .slider-title-bottom-Volume3-interni-e-scenari-mobile p {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 400;
      font-size: 13px;
      color: #86868b;
    }

    /* Media query: visualizza solo su mobile (<= 1280px) */
    @media screen and (min-width: 1280px) {
      .wrapper-slider-Volume3-interni-e-scenari-mobile {
        display: none !important;
      }
    }
  `;
  addStyle(galleryCSS);

  // HTML della gallery 'Interni e Scenari'
  var galleryHTML = `
<div class="wrapper-slider-Volume3-interni-e-scenari-mobile">
  <div class="slider-title-top-Volume3-interni-e-scenari-mobile">
    <h2>Interni e Scenari</h2>
    <p>Volume 3</p>
  </div>
  
  <!-- Container che contiene solo lo slider -->
  <div class="container-Volume3-interni-e-scenari-mobile">
    <div class="slider-Volume3-interni-e-scenari-mobile">
      <div class="slides-Volume3-interni-e-scenari-mobile"></div>
      <div class="slider-buttons-Volume3-interni-e-scenari-mobile">
        <button class="slider-button-Volume3-interni-e-scenari-mobile prev">❮</button>
        <button class="slider-button-Volume3-interni-e-scenari-mobile next">❯</button>
      </div>
      <div class="slide-count-Volume3-interni-e-scenari-mobile">
        <span id="slide-counter-Volume3-interni-e-scenari-mobile">1 di 10</span>
      </div>
    </div>   
  </div>
  
  <!-- Blocco dei dettagli spostato fuori dal container -->
  <div class="slider-indicators-Volume3-interni-e-scenari-mobile"></div>
  <div class="details-Volume3-interni-e-scenari-mobile">
    <div class="title-wrapper-Volume3-interni-e-scenari-mobile">
      <h1>Download.</h1>
      <span class="subtitle-Volume3-interni-e-scenari-mobile">Quale scegli?</span>
    </div>
    <div class="option-button-Volume3-interni-e-scenari-mobile">
      <div class="option-Volume3-interni-e-scenari-mobile" id="download-single-Volume3-interni-e-scenari-mobile">
        <div class="option-main-Volume3-interni-e-scenari-mobile">
          <span class="option-title-Volume3-interni-e-scenari-mobile">Immagine selezionata</span>
          <span class="option-side-Volume3-interni-e-scenari-mobile">.jpg¹</span>
        </div>
        <div class="option-subtext-Volume3-interni-e-scenari-mobile">Qualità originale, HD</div>
        <div class="option-subtext-Volume3-interni-e-scenari-mobile">1 elemento, ~3 MB</div>
      </div>
      <div class="option-Volume3-interni-e-scenari-mobile" id="download-all-Volume3-interni-e-scenari-mobile">
        <div class="option-main-Volume3-interni-e-scenari-mobile">
          <span class="option-title-Volume3-interni-e-scenari-mobile">Intero volume</span>
          <span class="option-side-Volume3-interni-e-scenari-mobile">.zip²</span>
        </div>
        <div class="option-subtext-Volume3-interni-e-scenari-mobile">Qualità originale, HD</div>
        <div class="option-subtext-Volume3-interni-e-scenari-mobile">10 elementi, ~20 MB</div>
        <div class="spinner-Volume3-interni-e-scenari-mobile">
          <div class="progress-frame-Volume3-interni-e-scenari-mobile"></div>
        </div>
      </div>
      <div class="info-box-Volume3-interni-e-scenari-mobile">
        <div class="info-bold-Volume3-interni-e-scenari-mobile">Panoramica del contenuto</div>
        <div class="info-regular-Volume3-interni-e-scenari-mobile">Un album che esplora ambienti affascinanti e suggestivi, catturando l’essenza degli spazi interni e della ristorazione. Ogni immagine racconta un viaggio visivo attraverso ambienti che parlano di stile, comfort e accoglienza.</div>
      </div>
      <div class="additional-info-Volume3-interni-e-scenari-mobile">
        <div class="info-bold-Volume3-interni-e-scenari-mobile">Naviga</div>
        <div class="info-regular-Volume3-interni-e-scenari-mobile">Scorri a destra o sinistra per esplorare le immagini.</div>
      </div>
    </div>
  </div>
  
  <!-- Blocco Specifiche -->
  <div class="slider-title-bottom-Volume3-interni-e-scenari-mobile">
    <h2>Specifiche</h2>
    <p>Realizzato con Canon EOS 2000D e obiettivo 18-55mm EF-S. Il formato RAW (.CR2) garantisce una libertà totale in post-produzione, gestita attraverso Adobe Lightroom Classic. La raccolta contiene 10 elementi, immagini in HD (High Definition) scattate nel cuore della Toscana, Italia, nell'anno 2024.</p>
  </div>
</div>
  `;

  // Modifica: inietta la gallery dentro un contenitore con ID "Volume3-interni-e-scenari-container-mobile"
  function injectGallery() {
    var container = document.getElementById("Volume3-interni-e-scenari-container-mobile");
    if (container) {
      container.innerHTML = galleryHTML;
    } else {
      // Se il contenitore non viene trovato, esegue l'append al body come fallback
      var defaultContainer = document.createElement("div");
      defaultContainer.innerHTML = galleryHTML;
      document.body.appendChild(defaultContainer);
      console.warn("Elemento con ID 'Volume3-interni-e-scenari-container-mobile' non trovato. Iniettato in body come fallback.");
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
      var slidesContainer = document.querySelector(".slides-Volume3-interni-e-scenari-mobile");
      images.forEach(function(img, index) {
        var slide = document.createElement("div");
        slide.className = "slide-Volume3-interni-e-scenari-mobile";
        var imageEl = document.createElement("img");
        imageEl.src = img.url;
        imageEl.alt = "Image " + (index + 1);
        imageEl.className = "product-image-Volume3-interni-e-scenari-mobile";
        slide.appendChild(imageEl);
        slidesContainer.appendChild(slide);
      });
    }
    
    // Crea gli indicatori
    function createIndicators() {
      var indicatorContainer = document.querySelector(".slider-indicators-Volume3-interni-e-scenari-mobile");
      images.forEach(function(_, idx) {
        var dot = document.createElement("div");
        dot.className = "indicator-Volume3-interni-e-scenari-mobile" + (idx === 0 ? " active" : "");
        dot.addEventListener("click", function() {
          moveToSlide(idx);
        });
        indicatorContainer.appendChild(dot);
      });
    }
    
    // Aggiorna il contatore della slide
    function updateSlideCounter() {
      document.getElementById("slide-counter-Volume3-interni-e-scenari-mobile").textContent = (slideIndex + 1) + " di " + images.length;
    }
    
    // Aggiorna la visibilità dei pulsanti
    function updateSliderButtons() {
      document.querySelector(".slider-button-Volume3-interni-e-scenari-mobile.prev").style.display = slideIndex === 0 ? "none" : "flex";
      document.querySelector(".slider-button-Volume3-interni-e-scenari-mobile.next").style.display = slideIndex === images.length - 1 ? "none" : "flex";
    }
    
    // Aggiorna gli indicatori attivi
    function updateIndicators() {
      var dots = document.querySelectorAll(".indicator-Volume3-interni-e-scenari-mobile");
      dots.forEach(function(dot, i) {
        dot.classList.toggle("active", i === slideIndex);
      });
    }
    
    // Funzione per spostarsi verso una slide specifica
    function moveToSlide(index) {
      slideIndex = index;
      document.querySelector(".slides-Volume3-interni-e-scenari-mobile").style.transform = "translateX(-" + (slideIndex * 100) + "%)";
      updateIndicators();
      updateSliderButtons();
      updateSlideCounter();
    }
    
    createSlides();
    createIndicators();
    updateSlideCounter();
    updateSliderButtons();
    
    // Event listener per i pulsanti next e prev
    document.querySelector(".slider-button-Volume3-interni-e-scenari-mobile.next").addEventListener("click", function() {
      if (slideIndex < images.length - 1) {
        moveToSlide(slideIndex + 1);
      }
    });
    document.querySelector(".slider-button-Volume3-interni-e-scenari-mobile.prev").addEventListener("click", function() {
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
    
    // --------------------------
    // Swipe touch per mobile (con aggiornamento contatore)
    // --------------------------
    (function() {
      var sliderElement = document.querySelector(".slides-Volume3-interni-e-scenari-mobile");
      var startX = 0;
      
      sliderElement.addEventListener("touchstart", function(e) {
        startX = e.touches[0].clientX;
      });
      
      sliderElement.addEventListener("touchend", function(e) {
        var endX = e.changedTouches[0].clientX;
        var deltaX = endX - startX;
        
        // Imposta la soglia di swipe a 50px
        if (deltaX > 50 && slideIndex > 0) {
          moveToSlide(slideIndex - 1);
        } else if (deltaX < -50 && slideIndex < images.length - 1) {
          moveToSlide(slideIndex + 1);
        }
      });
    })();
    
    // Download dell'immagine singola
    document.getElementById("download-single-Volume3-interni-e-scenari-mobile").addEventListener("click", function() {
      var currentSlide = document.querySelectorAll(".slide-Volume3-interni-e-scenari-mobile")[slideIndex];
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
    var downloadAllButton = document.getElementById("download-all-Volume3-interni-e-scenari-mobile");
    var spinner = downloadAllButton.querySelector(".spinner-Volume3-interni-e-scenari-mobile");
    var progressFrame = spinner.querySelector(".progress-frame-Volume3-interni-e-scenari-mobile");
    
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
    document.querySelector(".slider-Volume3-interni-e-scenari-mobile").style.opacity = "1";
    document.querySelector(".details-Volume3-interni-e-scenari-mobile").style.opacity = "1";
  }

  // Avvia l’inizializzazione quando il DOM è completamente caricato
  document.addEventListener("DOMContentLoaded", function() {
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js", function() {
      initGallery();
    });
  });
})();
