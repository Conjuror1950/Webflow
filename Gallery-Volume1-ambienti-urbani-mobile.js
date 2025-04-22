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
    .wrapper-slider-Volume1-ambienti-urbani-mobile {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 400px;
      margin: 0 auto;
      width: 100%;
    }

    /* Container interno per il layout dello slider e dei dettagli */
    .container-Volume1-ambienti-urbani-mobile {
      display: flex;
      width: 91%;
      left: 18px;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;
    }

    /* --- SLIDER --- */
    .slider-Volume1-ambienti-urbani-mobile {
      position: relative;
      padding: 0px 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #f7f7f7;
      border-radius: 0px;
    }
    .slides-Volume1-ambienti-urbani-mobile {
      display: flex;
      flex-wrap: nowrap; /* Impedisce il wrapping degli elementi */
      transition: transform 0.3s ease-in-out;
    }
    .slide-Volume1-ambienti-urbani-mobile {
      flex: 0 0 100%; /* Impedisce la crescita e il restringimento, forza larghezza 100% */
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .product-image-Volume1-ambienti-urbani-mobile {
    width: 100%;
    height: 100%;
    object-fit: cover; /* oppure "contain" se preferisci vedere l’immagine intera */
    border-radius: 2%;
    cursor: pointer;
    }
    .product-image-Volume1-ambienti-urbani-mobile:hover {
      transform: scale(1.0);
    }
    /* Pulsanti per lo slider */
    .slider-buttons-Volume1-ambienti-urbani-mobile {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      pointer-events: none;
    }
    .slider-button-Volume1-ambienti-urbani-mobile {
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
    .slider-button-Volume1-ambienti-urbani-mobile.prev {
      left: 10px;
      transform: translateY(-50%);
    }
    .slider-button-Volume1-ambienti-urbani-mobile.next {
      right: 10px;
      transform: translateY(-50%);
    }
    .slider-button-Volume1-ambienti-urbani-mobile:hover {
      background: rgba(211, 211, 211, 0.75);
      color: rgba(29, 29, 29, 0.90);
    }
    /* Indicatori delle slide */
    .slider-indicators-Volume1-ambienti-urbani-mobile {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 2px;
      z-index: 2;
    }
    .indicator-Volume1-ambienti-urbani-mobile {
      width: 2px;
      height: 2px;
      background: #86868b;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.3s;
    }
    .indicator-Volume1-ambienti-urbani-mobile.active {
      background: white;
    }
    /* Testo sopra gli indicatori */
    .slide-count-Volume1-ambienti-urbani-mobile {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      color: #f7f7f7;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      z-index: 2;
    }
    /* --- DETTAGLI --- */
    .details-Volume1-ambienti-urbani-mobile {
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
    .option-button-Volume1-ambienti-urbani-mobile {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .option-Volume1-ambienti-urbani-mobile {
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
    .option-Volume1-ambienti-urbani-mobile:hover,
    .option-Volume1-ambienti-urbani-mobile.selected {
      border-color: #0071e3;
    }
    .option-main-Volume1-ambienti-urbani-mobile {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .option-title-Volume1-ambienti-urbani-mobile {
      font-size: 16px;
      font-weight: 600;
      color: #1d1d1f;
    }
    .option-side-Volume1-ambienti-urbani-mobile {
      font-size: 13px;
      color: #86868b;
      margin-left: 10px;
      white-space: nowrap;
    }
    .option-subtext-Volume1-ambienti-urbani-mobile {
      font-size: 13px;
      color: #86868b;
      margin-top: 6px;
    }
    .info-box-Volume1-ambienti-urbani-mobile {
      width: 250%;
      background: #f7f7f7;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
      color: black;
      box-sizing: border-box;
    }
    .additional-info-Volume1-ambienti-urbani-mobile {
      width: 250%;
      background: transparent;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
      color: black;
      box-sizing: border-box;
    }
    .info-bold-Volume1-ambienti-urbani-mobile {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 4px;
    }
    .info-regular-Volume1-ambienti-urbani-mobile {
      font-size: 13px;
      line-height: 1.4;
    }
    .title-wrapper-Volume1-ambienti-urbani-mobile {
      display: flex;
      align-items: baseline;
      gap: 5px;
      flex-wrap: nowrap;
      white-space: nowrap;
    }
    .subtitle-Volume1-ambienti-urbani-mobile {
      font-family: "SF Pro Display", sans-serif !important;
      font-size: 24px;
      font-weight: 600;
      color: #6e6e73;
    }
    /* Animazione del download: cornice progressiva */
    .spinner-Volume1-ambienti-urbani-mobile {
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
    .progress-frame-Volume1-ambienti-urbani-mobile {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: conic-gradient(#0071e3 0deg, #d3d3d3 0deg);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .progress-frame-Volume1-ambienti-urbani-mobile::after {
      content: "";
      width: 80%;
      height: 80%;
      background: white;
      border-radius: 50%;
    }
    
    /* Titoli sopra e sotto lo slider */
    .slider-title-top-Volume1-ambienti-urbani-mobile {
      font-family: "SF Pro Display", sans-serif !important;
      text-align: left;     
      color: black;
      margin-top: 15px;
      margin-bottom: 0px;
      margin-left: 18px;
    }
    .slider-title-top-Volume1-ambienti-urbani-mobile h2 {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 600;
      margin: 0;
      font-size: 24px;
    }
    .slider-title-top-Volume1-ambienti-urbani-mobile p {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 500;
      font-size: 13px;
      color: #86868b;
    }
    .slider-title-bottom-Volume1-ambienti-urbani-mobile {
      font-family: "SF Pro Display", sans-serif !important;
      max-width: 970px;
      text-align: left;
      margin-top: -50px;
      margin-bottom: -50px;
      padding: 36px;
      color: black;
    }
    .slider-title-bottom-Volume1-ambienti-urbani-mobile h2 {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 600;
      font-size: 14px;
      margin-bottom: -2px;
    }
    .slider-title-bottom-Volume1-ambienti-urbani-mobile p {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 400;
      font-size: 13px;
      color: #86868b;
    }

    /* Media query: visualizza solo su mobile (<= 1280px) */
    @media screen and (min-width: 1280px) {
      .wrapper-slider-Volume1-ambienti-urbani-mobile {
        display: none !important;
      }
    }
  `;
  addStyle(galleryCSS);

  // HTML della gallery 'Ambienti Urbani'
  var galleryHTML = `
<div class="wrapper-slider-Volume1-ambienti-urbani-mobile">
  <div class="slider-title-top-Volume1-ambienti-urbani-mobile">
    <h2>Ambienti Urbani</h2>
    <p>Volume 1</p>
  </div>
  
  <!-- Container che contiene solo lo slider -->
  <div class="container-Volume1-ambienti-urbani-mobile">
    <div class="slider-Volume1-ambienti-urbani-mobile">
      <div class="slides-Volume1-ambienti-urbani-mobile"></div>
      <div class="slider-buttons-Volume1-ambienti-urbani-mobile">
        <button class="slider-button-Volume1-ambienti-urbani-mobile prev">❮</button>
        <button class="slider-button-Volume1-ambienti-urbani-mobile next">❯</button>
      </div>
      <div class="slider-indicators-Volume1-ambienti-urbani-mobile"></div>
      <div class="slide-count-Volume1-ambienti-urbani-mobile">
        <span id="slide-counter-Volume1-ambienti-urbani-mobile">1 di 80</span>
      </div>
    </div>   
  </div>
  
  <!-- Blocco dei dettagli spostato fuori dal container -->
  <div class="details-Volume1-ambienti-urbani-mobile">
    <div class="title-wrapper-Volume1-ambienti-urbani-mobile">
      <h1>Download.</h1>
      <span class="subtitle-Volume1-ambienti-urbani-mobile">Quale scegli?</span>
    </div>
    <div class="option-button-Volume1-ambienti-urbani-mobile">
      <div class="option-Volume1-ambienti-urbani-mobile" id="download-single-Volume1-ambienti-urbani-mobile">
        <div class="option-main-Volume1-ambienti-urbani-mobile">
          <span class="option-title-Volume1-ambienti-urbani-mobile">Immagine selezionata</span>
          <span class="option-side-Volume1-ambienti-urbani-mobile">.jpg¹</span>
        </div>
        <div class="option-subtext-Volume1-ambienti-urbani-mobile">Qualità originale, HD</div>
        <div class="option-subtext-Volume1-ambienti-urbani-mobile">1 elemento, ~3 MB</div>
      </div>
      <div class="option-Volume1-ambienti-urbani-mobile" id="download-all-Volume1-ambienti-urbani-mobile">
        <div class="option-main-Volume1-ambienti-urbani-mobile">
          <span class="option-title-Volume1-ambienti-urbani-mobile">Intero volume</span>
          <span class="option-side-Volume1-ambienti-urbani-mobile">.zip²</span>
        </div>
        <div class="option-subtext-Volume1-ambienti-urbani-mobile">Qualità originale, HD</div>
        <div class="option-subtext-Volume1-ambienti-urbani-mobile">80 elementi, ~180 MB</div>
        <div class="spinner-Volume1-ambienti-urbani-mobile">
          <div class="progress-frame-Volume1-ambienti-urbani-mobile"></div>
        </div>
      </div>
      <div class="info-box-Volume1-ambienti-urbani-mobile">
        <div class="info-bold-Volume1-ambienti-urbani-mobile">Panoramica del contenuto</div>
        <div class="info-regular-Volume1-ambienti-urbani-mobile">Una raccolta di fotografie che cattura la vita e i panorami delle città. Dalle strade affollate agli scorci unici, ogni immagine racconta l’energia e la dinamicità dell’ambiente urbano.</div>
      </div>
      <div class="additional-info-Volume1-ambienti-urbani-mobile">
        <div class="info-bold-Volume1-ambienti-urbani-mobile">Naviga</div>
        <div class="info-regular-Volume1-ambienti-urbani-mobile">Scorri a destra o sinistra per esplorare le immagini.</div>
      </div>
    </div>
  </div>
  
  <!-- Blocco Specifiche -->
  <div class="slider-title-bottom-Volume1-ambienti-urbani-mobile">
    <h2>Specifiche</h2>
    <p>Realizzato con Canon EOS 2000D e obiettivo 18-55mm EF-S. Il formato RAW (.CR2) garantisce una libertà totale in post-produzione, gestita attraverso Adobe Lightroom Classic. La raccolta contiene 80 elementi, immagini in HD (High Definition) scattate in Europa, negli anni 2025-2019.</p>
    <h2>Dettagli</h2>
    <p>· Scatti 1-17: Palermo, Sicilia, Italia · 2025</p>
    <p>· Scatti 18-63: Parigi, Francia, Europa · 2023</p>
    <p>· Scatti 64-70: Roma, Lazio, Italia · 2022</p>
    <p>· Scatto 71: Firenze, Toscana, Italia · 2020</p>
    <p>· Scatti 72-80: Varese, Lombardia, Italia · 2019</p>
  </div>
</div>
  `;

  // Modifica: inietta la gallery dentro un contenitore con ID "Volume1-ambienti-urbani-container-mobile"
  function injectGallery() {
    var container = document.getElementById("Volume1-ambienti-urbani-container-mobile");
    if (container) {
      container.innerHTML = galleryHTML;
    } else {
      // Se il contenitore non viene trovato, esegue l'append al body come fallback
      var defaultContainer = document.createElement("div");
      defaultContainer.innerHTML = galleryHTML;
      document.body.appendChild(defaultContainer);
      console.warn("Elemento con ID 'Volume1-ambienti-urbani-container-mobile' non trovato. Iniettato in body come fallback.");
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
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9c1938a95af999a355__MG_0323.jpg", name: "MG_0323.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9b918b7c26dc4de161__MG_0306.jpg", name: "MG_0306.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6807dbbabbc8d639bf6d793d_MG_9010.jpg", name: "MG_9010.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9c7cb4a47becebd5f8__MG_0337.jpg", name: "MG_0337.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9b0d656804cb8c85bf__MG_0349.jpg", name: "MG_0349.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9ce48ddcd5917c203d__MG_0360.jpg", name: "MG_0360.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9a9e430f954d9f0a64__MG_0365.jpg", name: "MG_0365.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9ce48ddcd5917c2067__MG_0367.jpg", name: "MG_0367.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9abd9ccd45f5aba505__MG_0370.jpg", name: "MG_0370.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f982de5250f560756c9__MG_0383.jpg", name: "MG_0383.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9990f421583d5dd6d9__MG_0393.jpg", name: "MG_0393.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f992ca2a06fb249ca11__MG_0394.jpg", name: "MG_0394.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9bfd771fed48ac1804__MG_0408.jpg", name: "MG_0408.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9cb1b768124be7a94d__MG_0427.jpg", name: "MG_0427.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9df87101e8c1a71d3b__MG_0431.jpg", name: "MG_0431.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9e542a5dc0baed803f__MG_0447.jpg", name: "MG_0447.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9da3d3f3d5b1f44d17__MG_0450.jpg", name: "MG_0450.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc664db777df17eee61c7a__MG_7376.jpg", name: "MG_7376.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665219b924db4dbbac69__MG_7382.jpg", name: "MG_7382.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc664da0bd34b5416725ef__MG_7339.jpg", name: "MG_7339.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc664db777df17eee61cce__MG_7392.jpg", name: "MG_7392.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc664e39706fc65eb40b29__MG_7398.jpg", name: "MG_7398.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665989b1d60204655481__MG_7401.jpg", name: "MG_7401.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665529e15a21ed88c269__MG_7404.jpg", name: "MG_7404.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665118ffc46b3d1bec06__MG_7406.jpg", name: "MG_7406.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc664dfc927bc34f0698be__MG_7407.jpg", name: "MG_7407.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc6657c2f99b295b94801c__MG_7417.jpg", name: "MG_7417.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665118ffc46b3d1bebba__MG_7421.jpg", name: "MG_7421.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665c76d9846673993f74__MG_7442.jpg", name: "MG_7442.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc66539333fe99e9d83c72__MG_7497.jpg", name: "MG_7497.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665cd8e5c09607102bf3__MG_7531.jpg", name: "MG_7531.jpg" }
    ];
    var slideIndex = 0;
    
    // Crea le slide dinamicamente
    function createSlides() {
      var slidesContainer = document.querySelector(".slides-Volume1-ambienti-urbani-mobile");
      images.forEach(function(img, index) {
        var slide = document.createElement("div");
        slide.className = "slide-Volume1-ambienti-urbani-mobile";
        var imageEl = document.createElement("img");
        imageEl.src = img.url;
        imageEl.alt = "Image " + (index + 1);
        imageEl.className = "product-image-Volume1-ambienti-urbani-mobile";
        slide.appendChild(imageEl);
        slidesContainer.appendChild(slide);
      });
    }
    
    // Crea gli indicatori
    function createIndicators() {
      var indicatorContainer = document.querySelector(".slider-indicators-Volume1-ambienti-urbani-mobile");
      images.forEach(function(_, idx) {
        var dot = document.createElement("div");
        dot.className = "indicator-Volume1-ambienti-urbani-mobile" + (idx === 0 ? " active" : "");
        dot.addEventListener("click", function() {
          moveToSlide(idx);
        });
        indicatorContainer.appendChild(dot);
      });
    }
    
    // Aggiorna il contatore della slide
    function updateSlideCounter() {
      document.getElementById("slide-counter-Volume1-ambienti-urbani-mobile").textContent = (slideIndex + 1) + " di " + images.length;
    }
    
    // Aggiorna la visibilità dei pulsanti
    function updateSliderButtons() {
      document.querySelector(".slider-button-Volume1-ambienti-urbani-mobile.prev").style.display = slideIndex === 0 ? "none" : "flex";
      document.querySelector(".slider-button-Volume1-ambienti-urbani-mobile.next").style.display = slideIndex === images.length - 1 ? "none" : "flex";
    }
    
    // Aggiorna gli indicatori attivi
    function updateIndicators() {
      var dots = document.querySelectorAll(".indicator-Volume1-ambienti-urbani-mobile");
      dots.forEach(function(dot, i) {
        dot.classList.toggle("active", i === slideIndex);
      });
    }
    
    // Funzione per spostarsi verso una slide specifica
    function moveToSlide(index) {
      slideIndex = index;
      document.querySelector(".slides-Volume1-ambienti-urbani-mobile").style.transform = "translateX(-" + (slideIndex * 100) + "%)";
      updateIndicators();
      updateSliderButtons();
      updateSlideCounter();
    }
    
    createSlides();
    createIndicators();
    updateSlideCounter();
    updateSliderButtons();
    
    // Event listener per i pulsanti next e prev
    document.querySelector(".slider-button-Volume1-ambienti-urbani-mobile.next").addEventListener("click", function() {
      if (slideIndex < images.length - 1) {
        moveToSlide(slideIndex + 1);
      }
    });
    document.querySelector(".slider-button-Volume1-ambienti-urbani-mobile.prev").addEventListener("click", function() {
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
      var sliderElement = document.querySelector(".slides-Volume1-ambienti-urbani-mobile");
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
    document.getElementById("download-single-Volume1-ambienti-urbani-mobile").addEventListener("click", function() {
      var currentSlide = document.querySelectorAll(".slide-Volume1-ambienti-urbani-mobile")[slideIndex];
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
    var downloadAllButton = document.getElementById("download-all-Volume1-ambienti-urbani-mobile");
    var spinner = downloadAllButton.querySelector(".spinner-Volume1-ambienti-urbani-mobile");
    var progressFrame = spinner.querySelector(".progress-frame-Volume1-ambienti-urbani-mobile");
    
    downloadAllButton.addEventListener("click", function() {
      spinner.style.display = "flex";
      progressFrame.style.background = "conic-gradient(#0071e3 0deg, #d3d3d3 0deg)";
      
      var zip = new JSZip();
      var folder = zip.folder("Ambienti Urbani");
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
        a.download = "Volume 1.zip";
        a.click();
        spinner.style.display = "none";
      })
      .catch(function(err) {
        console.error("Errore nel download ZIP:", err);
        spinner.style.display = "none";
      });
    });
    
    // Rendi visibile la gallery (se necessario)
    document.querySelector(".slider-Volume1-ambienti-urbani-mobile").style.opacity = "1";
    document.querySelector(".details-Volume1-ambienti-urbani-mobile").style.opacity = "1";
  }

  // Avvia l’inizializzazione quando il DOM è completamente caricato
  document.addEventListener("DOMContentLoaded", function() {
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js", function() {
      initGallery();
    });
  });
})();
