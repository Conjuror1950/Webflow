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
    .wrapper-slider-Volume2-paesaggi-naturali-mobile {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 1360px;
      margin: 0 auto;
      width: 100%;
    }

    /* Container interno per il layout dello slider e dei dettagli */
    .container-Volume2-paesaggi-naturali-mobile {
      display: flex;
      width: 91%;
      left: 18px;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;
    }

    /* --- SLIDER --- */
    .slider-Volume2-paesaggi-naturali-mobile {
      position: relative;
      padding: 0px 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #f7f7f7;
      border-radius: 0px;
    }
    .slides-Volume2-paesaggi-naturali-mobile {
      display: flex;
      flex-wrap: nowrap; /* Impedisce il wrapping degli elementi */
      transition: transform 0.3s ease-in-out;
    }
    .slide-Volume2-paesaggi-naturali-mobile {
      flex: 0 0 100%; /* Impedisce la crescita e il restringimento, forza larghezza 100% */
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .product-image-Volume2-paesaggi-naturali-mobile {
    width: 100%;
    height: 100%;
    object-fit: cover; /* oppure "contain" se preferisci vedere l’immagine intera */
    border-radius: 2%;
    cursor: pointer;
    }
    .product-image-Volume2-paesaggi-naturali-mobile:hover {
      transform: scale(1.0);
    }
    /* Pulsanti per lo slider */
    .slider-buttons-Volume2-paesaggi-naturali-mobile {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      pointer-events: none;
    }
    .slider-button-Volume2-paesaggi-naturali-mobile {
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
    .slider-button-Volume2-paesaggi-naturali-mobile.prev {
      left: 10px;
      transform: translateY(-50%);
    }
    .slider-button-Volume2-paesaggi-naturali-mobile.next {
      right: 10px;
      transform: translateY(-50%);
    }
    .slider-button-Volume2-paesaggi-naturali-mobile:hover {
      background: rgba(211, 211, 211, 0.75);
      color: rgba(29, 29, 29, 0.90);
    }
    /* Indicatori delle slide */
    .slider-indicators-Volume2-paesaggi-naturali-mobile {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      z-index: 2;
    }
    .indicator-Volume2-paesaggi-naturali-mobile {
      width: 6px;
      height: 6px;
      background: #86868b;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.3s;
    }
    .indicator-Volume2-paesaggi-naturali-mobile.active {
      background: white;
    }
    /* Testo sopra gli indicatori */
    .slide-count-Volume2-paesaggi-naturali-mobile {
      position: absolute;
      bottom: 48px;
      left: 50%;
      transform: translateX(-50%);
      color: #f7f7f7;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      z-index: 2;
    }
    /* --- DETTAGLI --- */
    .details-Volume2-paesaggi-naturali-mobile {
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
    .option-button-Volume2-paesaggi-naturali-mobile {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .option-Volume2-paesaggi-naturali-mobile {
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
    .option-Volume2-paesaggi-naturali-mobile:hover,
    .option-Volume2-paesaggi-naturali-mobile.selected {
      border-color: #0071e3;
    }
    .option-main-Volume2-paesaggi-naturali-mobile {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .option-title-Volume2-paesaggi-naturali-mobile {
      font-size: 16px;
      font-weight: 600;
      color: #1d1d1f;
    }
    .option-side-Volume2-paesaggi-naturali-mobile {
      font-size: 13px;
      color: #86868b;
      margin-left: 10px;
      white-space: nowrap;
    }
    .option-subtext-Volume2-paesaggi-naturali-mobile {
      font-size: 13px;
      color: #86868b;
      margin-top: 6px;
    }
    .info-box-Volume2-paesaggi-naturali-mobile {
      width: 250%;
      background: #f7f7f7;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
      color: black;
      box-sizing: border-box;
    }
    .additional-info-Volume2-paesaggi-naturali-mobile {
      width: 250%;
      background: transparent;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
      color: black;
      box-sizing: border-box;
    }
    .info-bold-Volume2-paesaggi-naturali-mobile {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 4px;
    }
    .info-regular-Volume2-paesaggi-naturali-mobile {
      font-size: 13px;
      line-height: 1.4;
    }
    .title-wrapper-Volume2-paesaggi-naturali-mobile {
      display: flex;
      align-items: baseline;
      gap: 5px;
      flex-wrap: nowrap;
      white-space: nowrap;
    }
    .subtitle-Volume2-paesaggi-naturali-mobile {
      font-family: "SF Pro Display", sans-serif !important;
      font-size: 24px;
      font-weight: 600;
      color: #6e6e73;
    }
    /* Animazione del download: cornice progressiva */
    .spinner-Volume2-paesaggi-naturali-mobile {
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
    .progress-frame-Volume2-paesaggi-naturali-mobile {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: conic-gradient(#0071e3 0deg, #d3d3d3 0deg);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .progress-frame-Volume2-paesaggi-naturali-mobile::after {
      content: "";
      width: 80%;
      height: 80%;
      background: white;
      border-radius: 50%;
    }
    
    /* Titoli sopra e sotto lo slider */
    .slider-title-top-Volume2-paesaggi-naturali-mobile {
      font-family: "SF Pro Display", sans-serif !important;
      text-align: left;     
      color: black;
      margin-top: 20px;
      margin-bottom: 10px;
      margin-left: 18px;
    }
    .slider-title-top-Volume2-paesaggi-naturali-mobile h2 {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 600;
      margin: 0;
      font-size: 24px;
    }
    .slider-title-top-Volume2-paesaggi-naturali-mobile p {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 500;
      font-size: 13px;
      color: #86868b;
    }
    .slider-title-bottom-Volume2-paesaggi-naturali-mobile {
      font-family: "SF Pro Display", sans-serif !important;
      max-width: 970px;
      text-align: left;
      margin-top: -50px;
      margin-bottom: -50px;
      padding: 36px;
      color: black;
    }
    .slider-title-bottom-Volume2-paesaggi-naturali-mobile h2 {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 600;
      font-size: 14px;
      margin-bottom: -2px;
    }
    .slider-title-bottom-Volume2-paesaggi-naturali-mobile p {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 400;
      font-size: 13px;
      color: #86868b;
    }

    /* Media query: visualizza solo su mobile (<= 1280px) */
    @media screen and (min-width: 1280px) {
      .wrapper-slider-Volume2-paesaggi-naturali-mobile {
        display: none !important;
      }
    }
  `;
  addStyle(galleryCSS);

  // HTML della gallery 'Paesaggi Naturali'
  var galleryHTML = `
<div class="wrapper-slider-Volume2-paesaggi-naturali-mobile">
  <div class="slider-title-top-Volume2-paesaggi-naturali-mobile">
    <h2>Paesaggi Naturali</h2>
    <p>Volume 2</p>
  </div>
  
  <!-- Container che contiene solo lo slider -->
  <div class="container-Volume2-paesaggi-naturali-mobile">
    <div class="slider-Volume2-paesaggi-naturali-mobile">
      <div class="slides-Volume2-paesaggi-naturali-mobile"></div>
      <div class="slider-buttons-Volume2-paesaggi-naturali-mobile">
        <button class="slider-button-Volume2-paesaggi-naturali-mobile prev">❮</button>
        <button class="slider-button-Volume2-paesaggi-naturali-mobile next">❯</button>
      </div>
      <div class="slider-indicators-Volume2-paesaggi-naturali-mobile"></div>
      <div class="slide-count-Volume2-paesaggi-naturali-mobile">
        <span id="slide-counter-Volume2-paesaggi-naturali-mobile">1 di 23</span>
      </div>
    </div>   
  </div>
  
  <!-- Blocco dei dettagli spostato fuori dal container -->
  <div class="details-Volume2-paesaggi-naturali-mobile">
    <div class="title-wrapper-Volume2-paesaggi-naturali-mobile">
      <h1>Download.</h1>
      <span class="subtitle-Volume2-paesaggi-naturali-mobile">Quale scegli?</span>
    </div>
    <div class="option-button-Volume2-paesaggi-naturali-mobile">
      <div class="option-Volume2-paesaggi-naturali-mobile" id="download-single-Volume2-paesaggi-naturali-mobile">
        <div class="option-main-Volume2-paesaggi-naturali-mobile">
          <span class="option-title-Volume2-paesaggi-naturali-mobile">Immagine selezionata</span>
          <span class="option-side-Volume2-paesaggi-naturali-mobile">.jpg¹</span>
        </div>
        <div class="option-subtext-Volume2-paesaggi-naturali-mobile">Qualità originale, HD</div>
        <div class="option-subtext-Volume2-paesaggi-naturali-mobile">1 elemento, ~3 MB</div>
      </div>
      <div class="option-Volume2-paesaggi-naturali-mobile" id="download-all-Volume2-paesaggi-naturali-mobile">
        <div class="option-main-Volume2-paesaggi-naturali-mobile">
          <span class="option-title-Volume2-paesaggi-naturali-mobile">Intero volume</span>
          <span class="option-side-Volume2-paesaggi-naturali-mobile">.zip²</span>
        </div>
        <div class="option-subtext-Volume2-paesaggi-naturali-mobile">Qualità originale, HD</div>
        <div class="option-subtext-Volume2-paesaggi-naturali-mobile">23 elementi, ~50 MB</div>
        <div class="spinner-Volume2-paesaggi-naturali-mobile">
          <div class="progress-frame-Volume2-paesaggi-naturali-mobile"></div>
        </div>
      </div>
      <div class="info-box-Volume2-paesaggi-naturali-mobile">
        <div class="info-bold-Volume2-paesaggi-naturali-mobile">Panoramica del contenuto</div>
        <div class="info-regular-Volume2-paesaggi-naturali-mobile">Una raccolta di fotografie che cattura la bellezza della natura, dai panorami montani alle foreste. Immagini che raccontano la serenità e la forza degli spazi naturali, invitando a fermarsi e ad apprezzare il mondo che ci circonda.</div>
      </div>
      <div class="additional-info-Volume2-paesaggi-naturali-mobile">
        <div class="info-bold-Volume2-paesaggi-naturali-mobile">Naviga</div>
        <div class="info-regular-Volume2-paesaggi-naturali-mobile">Scorri a destra o sinistra per esplorare le immagini.</div>
      </div>
    </div>
  </div>
  
  <!-- Blocco Specifiche -->
  <div class="slider-title-bottom-Volume2-paesaggi-naturali-mobile">
    <h2>Specifiche</h2>
    <p>Realizzato con Canon EOS 2000D e obiettivo 18-55mm EF-S. Il formato RAW (.CR2) garantisce una libertà totale in post-produzione, gestita attraverso Adobe Lightroom Classic. La raccolta contiene 23 elementi, immagini in HD (High Definition) scattate Italia, negli anni 2024-2019.</p>
    <h2>Dettagli</h2>
    <p>· Scatti 3-7: Viareggio, Toscana, Italia · 2024</p>
    <p>· Scatti 8-16: Lucca, Toscana, Italia · 2024</p>
    <p>· Scatti 17-23: Palermo, Sicilia, Italia · 2019</p>
  </div>
</div>
  `;

  // Modifica: inietta la gallery dentro un contenitore con ID "Volume2-paesaggi-naturali-container-mobile"
  function injectGallery() {
    var container = document.getElementById("Volume2-paesaggi-naturali-container-mobile");
    if (container) {
      container.innerHTML = galleryHTML;
    } else {
      // Se il contenitore non viene trovato, esegue l'append al body come fallback
      var defaultContainer = document.createElement("div");
      defaultContainer.innerHTML = galleryHTML;
      document.body.appendChild(defaultContainer);
      console.warn("Elemento con ID 'Volume2-paesaggi-naturali-container-mobile' non trovato. Iniettato in body come fallback.");
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
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6762fe8c0f3530039c376f7d__MG_0070.jpg", name: "MG_0070.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6762fe8d37578bf940c9e392__MG_0060.jpg", name: "MG_0060.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66d9e54384f548f1fb478b0d__MG_9537.jpg", name: "MG_9537.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66d9e61b84f548f1fb48389e_IMG_1498.jpg", name: "MG_1498.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66d9e61c46bd44365fcd26be_IMG_1500.jpg", name: "MG_1500.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66d9e542007f4ca3f9d8a438_IMG_1517.jpg", name: "MG_1517.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66d9e543eef98414ac48e1fd_IMG_1518.jpg", name: "MG_1518.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66d98e732be5e82ba896555c__MG_9430%20firm.jpg", name: "MG_9430.jpg" }
    ];
    var slideIndex = 0;
    
    // Crea le slide dinamicamente
    function createSlides() {
      var slidesContainer = document.querySelector(".slides-Volume2-paesaggi-naturali-mobile");
      images.forEach(function(img, index) {
        var slide = document.createElement("div");
        slide.className = "slide-Volume2-paesaggi-naturali-mobile";
        var imageEl = document.createElement("img");
        imageEl.src = img.url;
        imageEl.alt = "Image " + (index + 1);
        imageEl.className = "product-image-Volume2-paesaggi-naturali-mobile";
        slide.appendChild(imageEl);
        slidesContainer.appendChild(slide);
      });
    }
    
    // Crea gli indicatori
    function createIndicators() {
      var indicatorContainer = document.querySelector(".slider-indicators-Volume2-paesaggi-naturali-mobile");
      images.forEach(function(_, idx) {
        var dot = document.createElement("div");
        dot.className = "indicator-Volume2-paesaggi-naturali-mobile" + (idx === 0 ? " active" : "");
        dot.addEventListener("click", function() {
          moveToSlide(idx);
        });
        indicatorContainer.appendChild(dot);
      });
    }
    
    // Aggiorna il contatore della slide
    function updateSlideCounter() {
      document.getElementById("slide-counter-Volume2-paesaggi-naturali-mobile").textContent = (slideIndex + 1) + " di " + images.length;
    }
    
    // Aggiorna la visibilità dei pulsanti
    function updateSliderButtons() {
      document.querySelector(".slider-button-Volume2-paesaggi-naturali-mobile.prev").style.display = slideIndex === 0 ? "none" : "flex";
      document.querySelector(".slider-button-Volume2-paesaggi-naturali-mobile.next").style.display = slideIndex === images.length - 1 ? "none" : "flex";
    }
    
    // Aggiorna gli indicatori attivi
    function updateIndicators() {
      var dots = document.querySelectorAll(".indicator-Volume2-paesaggi-naturali-mobile");
      dots.forEach(function(dot, i) {
        dot.classList.toggle("active", i === slideIndex);
      });
    }
    
    // Funzione per spostarsi verso una slide specifica
    function moveToSlide(index) {
      slideIndex = index;
      document.querySelector(".slides-Volume2-paesaggi-naturali-mobile").style.transform = "translateX(-" + (slideIndex * 100) + "%)";
      updateIndicators();
      updateSliderButtons();
      updateSlideCounter();
    }
    
    createSlides();
    createIndicators();
    updateSlideCounter();
    updateSliderButtons();
    
    // Event listener per i pulsanti next e prev
    document.querySelector(".slider-button-Volume2-paesaggi-naturali-mobile.next").addEventListener("click", function() {
      if (slideIndex < images.length - 1) {
        moveToSlide(slideIndex + 1);
      }
    });
    document.querySelector(".slider-button-Volume2-paesaggi-naturali-mobile.prev").addEventListener("click", function() {
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
      var sliderElement = document.querySelector(".slides-Volume2-paesaggi-naturali-mobile");
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
    document.getElementById("download-single-Volume2-paesaggi-naturali-mobile").addEventListener("click", function() {
      var currentSlide = document.querySelectorAll(".slide-Volume2-paesaggi-naturali-mobile")[slideIndex];
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
    var downloadAllButton = document.getElementById("download-all-Volume2-paesaggi-naturali-mobile");
    var spinner = downloadAllButton.querySelector(".spinner-Volume2-paesaggi-naturali-mobile");
    var progressFrame = spinner.querySelector(".progress-frame-Volume2-paesaggi-naturali-mobile");
    
    downloadAllButton.addEventListener("click", function() {
      spinner.style.display = "flex";
      progressFrame.style.background = "conic-gradient(#0071e3 0deg, #d3d3d3 0deg)";
      
      var zip = new JSZip();
      var folder = zip.folder("Paesaggi Naturali");
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
        a.download = "Volume 2.zip";
        a.click();
        spinner.style.display = "none";
      })
      .catch(function(err) {
        console.error("Errore nel download ZIP:", err);
        spinner.style.display = "none";
      });
    });
    
    // Rendi visibile la gallery (se necessario)
    document.querySelector(".slider-Volume2-paesaggi-naturali-mobile").style.opacity = "1";
    document.querySelector(".details-Volume2-paesaggi-naturali-mobile").style.opacity = "1";
  }

  // Avvia l’inizializzazione quando il DOM è completamente caricato
  document.addEventListener("DOMContentLoaded", function() {
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js", function() {
      initGallery();
    });
  });
})();
