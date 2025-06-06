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
    .wrapper-slider-Collezione1-halloween2024-mobile {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 400px;
      margin: 0 auto;
      width: 100%;
    }

    /* Container interno per il layout dello slider e dei dettagli */
    .container-Collezione1-halloween2024-mobile {
      display: flex;
      width: 91%;
      left: 18px;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;
    }

    /* --- SLIDER --- */
    .slider-Collezione1-halloween2024-mobile {
      position: relative;
      padding: 0px 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #f7f7f7;
      border-radius: 0px;
    }
    .slides-Collezione1-halloween2024-mobile {
      display: flex;
      flex-wrap: nowrap; /* Impedisce il wrapping degli elementi */
      transition: transform 0.3s ease-in-out;
    }
    .slide-Collezione1-halloween2024-mobile {
      flex: 0 0 100%; /* Impedisce la crescita e il restringimento, forza larghezza 100% */
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .product-image-Collezione1-halloween2024-mobile {
    width: 100%;
    height: 100%;
    object-fit: cover; /* oppure "contain" se preferisci vedere l’immagine intera */
    border-radius: 2%;
    cursor: pointer;
    }
    .product-image-Collezione1-halloween2024-mobile:hover {
      transform: scale(1.0);
    }
    /* Pulsanti per lo slider */
    .slider-buttons-Collezione1-halloween2024-mobile {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      pointer-events: none;
    }
    .slider-button-Collezione1-halloween2024-mobile {
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
    .slider-button-Collezione1-halloween2024-mobile.prev {
      left: 10px;
      transform: translateY(-50%);
    }
    .slider-button-Collezione1-halloween2024-mobile.next {
      right: 10px;
      transform: translateY(-50%);
    }
    .slider-button-Collezione1-halloween2024-mobile:hover {
      background: rgba(211, 211, 211, 0.75);
      color: rgba(29, 29, 29, 0.90);
    }
    /* Indicatori delle slide */
    .slider-indicators-Collezione1-halloween2024-mobile {
      position: absolute;
      bottom: 5px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 5px;
      z-index: 2;
    }
    .indicator-Collezione1-halloween2024-mobile {
      width: 5px;
      height: 5px;
      background: #86868b;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.3s;
    }
    .indicator-Collezione1-halloween2024-mobile.active {
      background: #1d1d1d;
    }
    /* Testo sopra gli indicatori */
    .slide-count-Collezione1-halloween2024-mobile {
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
    .details-Collezione1-halloween2024-mobile {
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
    .option-button-Collezione1-halloween2024-mobile {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .option-Collezione1-halloween2024-mobile {
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
    .option-Collezione1-halloween2024-mobile:hover,
    .option-Collezione1-halloween2024-mobile.selected {
      border-color: #0071e3;
    }
    .option-main-Collezione1-halloween2024-mobile {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .option-title-Collezione1-halloween2024-mobile {
      font-size: 16px;
      font-weight: 600;
      color: #1d1d1f;
    }
    .option-side-Collezione1-halloween2024-mobile {
      font-size: 13px;
      color: #86868b;
      margin-left: 10px;
      white-space: nowrap;
    }
    .option-subtext-Collezione1-halloween2024-mobile {
      font-size: 13px;
      color: #86868b;
      margin-top: 6px;
    }
    .info-box-Collezione1-halloween2024-mobile {
      width: 250%;
      background: #f7f7f7;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
      color: black;
      box-sizing: border-box;
    }
    .additional-info-Collezione1-halloween2024-mobile {
      width: 250%;
      background: transparent;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
      color: black;
      box-sizing: border-box;
    }
    .info-bold-Collezione1-halloween2024-mobile {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 4px;
    }
    .info-regular-Collezione1-halloween2024-mobile {
      font-size: 13px;
      line-height: 1.4;
    }
    .title-wrapper-Collezione1-halloween2024-mobile {
      display: flex;
      align-items: baseline;
      gap: 5px;
      flex-wrap: nowrap;
      white-space: nowrap;
    }
    .subtitle-Collezione1-halloween2024-mobile {
      font-family: "SF Pro Display", sans-serif !important;
      font-size: 24px;
      font-weight: 600;
      color: #6e6e73;
    }
    /* Animazione del download: cornice progressiva */
    .spinner-Collezione1-halloween2024-mobile {
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
    .progress-frame-Collezione1-halloween2024-mobile {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: conic-gradient(#0071e3 0deg, #d3d3d3 0deg);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .progress-frame-Collezione1-halloween2024-mobile::after {
      content: "";
      width: 80%;
      height: 80%;
      background: white;
      border-radius: 50%;
    }
    
    /* Titoli sopra e sotto lo slider */
    .slider-title-top-Collezione1-halloween2024-mobile {
      font-family: "SF Pro Display", sans-serif !important;
      text-align: left;     
      color: black;
      margin-top: 10px;
      margin-bottom: 0px;
      margin-left: 18px;
    }
    .slider-title-top-Collezione1-halloween2024-mobile h2 {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 600;
      margin: 0;
      font-size: 24px;
    }
    .slider-title-top-Collezione1-halloween2024-mobile p {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 500;
      font-size: 13px;
      color: #86868b;
    }
    .slider-title-bottom-Collezione1-halloween2024-mobile {
      font-family: "SF Pro Display", sans-serif !important;
      max-width: 970px;
      text-align: left;
      margin-top: -50px;
      margin-bottom: -50px;
      padding: 36px;
      color: black;
    }
    .slider-title-bottom-Collezione1-halloween2024-mobile h2 {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 600;
      font-size: 14px;
      margin-bottom: -2px;
    }
    .slider-title-bottom-Collezione1-halloween2024-mobile p {
      font-family: "SF Pro Display", sans-serif !important;
      font-weight: 400;
      font-size: 13px;
      color: #86868b;
    }

    /* Media query: visualizza solo su mobile (<= 1280px) */
    @media screen and (min-width: 1280px) {
      .wrapper-slider-Collezione1-halloween2024-mobile {
        display: none !important;
      }
    }
  `;
  addStyle(galleryCSS);

  // HTML della gallery 'Halloween'
  var galleryHTML = `
<div class="wrapper-slider-Collezione1-halloween2024-mobile">
  <div class="slider-title-top-Collezione1-halloween2024-mobile">
    <h2>Halloween</h2>
    <p>Collezione 1</p>
  </div>
  
  <!-- Container che contiene solo lo slider -->
  <div class="container-Collezione1-halloween2024-mobile">
    <div class="slider-Collezione1-halloween2024-mobile">
      <div class="slides-Collezione1-halloween2024-mobile"></div>
      <div class="slider-buttons-Collezione1-halloween2024-mobile">
            <button class="slider-button-Collezione1-halloween2024-mobile prev">
              <img
                src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/680a56d179fee9c3b97257aa_chevron.left.svg"
                alt="Indietro"
                style="width:24px; height:24px;"
              />
            </button>
            <button class="slider-button-Collezione1-halloween2024-mobile next">
              <img
                src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/680a52aa54d1922ad06feeeb_be514248c3f97e7343cec2a888aad323_chevron.right.svg"
                alt="Avanti"
                style="width:24px; height:24px;"
              />
            </button>
      </div>
      <div class="slide-count-Collezione1-halloween2024-mobile">
        <span id="slide-counter-Collezione1-halloween2024-mobile">1 di 22</span>
      </div>
    </div>   
  </div>
  
  <!-- Blocco dei dettagli spostato fuori dal container -->
  <div class="slider-indicators-Collezione1-halloween2024-mobile"></div>
  <div class="details-Collezione1-halloween2024-mobile">
    <div class="title-wrapper-Collezione1-halloween2024-mobile">
      <h1>Download.</h1>
      <span class="subtitle-Collezione1-halloween2024-mobile">Quale scegli?</span>
    </div>
    <div class="option-button-Collezione1-halloween2024-mobile">
      <div class="option-Collezione1-halloween2024-mobile" id="download-single-Collezione1-halloween2024-mobile">
        <div class="option-main-Collezione1-halloween2024-mobile">
          <span class="option-title-Collezione1-halloween2024-mobile">Immagine selezionata</span>
          <span class="option-side-Collezione1-halloween2024-mobile">.jpg¹</span>
        </div>
        <div class="option-subtext-Collezione1-halloween2024-mobile">Qualità originale, HD</div>
        <div class="option-subtext-Collezione1-halloween2024-mobile">1 elemento, ~3 MB</div>
      </div>
      <div class="option-Collezione1-halloween2024-mobile" id="download-all-Collezione1-halloween2024-mobile">
        <div class="option-main-Collezione1-halloween2024-mobile">
          <span class="option-title-Collezione1-halloween2024-mobile">Intero volume</span>
          <span class="option-side-Collezione1-halloween2024-mobile">.zip²</span>
        </div>
        <div class="option-subtext-Collezione1-halloween2024-mobile">Qualità originale, HD</div>
        <div class="option-subtext-Collezione1-halloween2024-mobile">33 elementi, ~92 MB</div>
        <div class="spinner-Collezione1-halloween2024-mobile">
          <div class="progress-frame-Collezione1-halloween2024-mobile"></div>
        </div>
      </div>
      <div class="info-box-Collezione1-halloween2024-mobile">
        <div class="info-bold-Collezione1-halloween2024-mobile">Panoramica del contenuto</div>
        <div class="info-regular-Collezione1-halloween2024-mobile">Un album che cattura l'atmosfera di Halloween, con scatti di maschere, decorazioni e momenti tipici di questa festa. Ogni immagine racconta un’interpretazione visiva di questa notte speciale, dall'inquietante al divertente.</div>
      </div>
      <div class="additional-info-Collezione1-halloween2024-mobile">
        <div class="info-bold-Collezione1-halloween2024-mobile">Naviga</div>
        <div class="info-regular-Collezione1-halloween2024-mobile">Scorri a destra o sinistra per esplorare le immagini.</div>
      </div>
    </div>
  </div>
  
  <!-- Blocco Specifiche -->
  <div class="slider-title-bottom-Collezione1-halloween2024-mobile">
    <h2>Specifiche</h2>
    <p>Realizzato con Canon EOS 2000D e obiettivo 18-55mm EF-S. Il formato RAW (.CR2) garantisce una libertà totale in post-produzione, gestita attraverso Adobe Lightroom Classic. La raccolta contiene 33 elementi, immagini in HD (High Definition) scattate in Toscana, Italia, il 31 ottobre 2024.</p>
  </div>
</div>
  `;

  // Modifica: inietta la gallery dentro un contenitore con ID "Collezione1-halloween2024-container-mobile"
  function injectGallery() {
    var container = document.getElementById("Collezione1-halloween2024-container-mobile");
    if (container) {
      container.innerHTML = galleryHTML;
    } else {
      // Se il contenitore non viene trovato, esegue l'append al body come fallback
      var defaultContainer = document.createElement("div");
      defaultContainer.innerHTML = galleryHTML;
      document.body.appendChild(defaultContainer);
      console.warn("Elemento con ID 'Collezione1-halloween2024-container-mobile' non trovato. Iniettato in body come fallback.");
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
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e257d5db8b8ca02e71f8__MG_0097.jpg", name: "MG_0097.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e26eb4b2519231018bc7__MG_0230.jpg", name: "MG_0230.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e255798d0b20b2480f21__MG_0146.jpg", name: "MG_0146.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e259b4b2519231017599__MG_0100.jpg", name: "MG_0100.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e25a154bfc5b148457fb__MG_0155.jpg", name: "MG_0155.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e2657d41252d976fe8de__MG_0213.jpg", name: "MG_0213.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e2647bf5a309e0551728__MG_0210.jpg", name: "MG_0210.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e2550db16082afad9ef0__MG_0148.jpg", name: "MG_0148.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e258172848529c704285__MG_0099.jpg", name: "MG_0099.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e262eef1c83a03f51228__MG_0184.jpg", name: "MG_0184.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e25e51ce30e27d03605a__MG_0161.jpg", name: "MG_0161.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e25bd6306d9079e77e6f__MG_0159.jpg", name: "MG_0159.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e25fe08de9e17b4418d5__MG_0165.jpg", name: "MG_0165.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e261fc7f71813b311a37__MG_0169.jpg", name: "MG_0169.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e25d4c0bdd12d5b8d45d__MG_0158.jpg", name: "MG_0158.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e263f6ff5b3bc217a58f__MG_0186.jpg", name: "MG_0186.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e25676667853ccc51eb9__MG_0192.jpg", name: "MG_0192.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e2653496e563bee6761c__MG_0215.jpg", name: "MG_0215.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e2689d84a21d20bf3fd1__MG_0220.jpg", name: "MG_0220.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e26deef1c83a03f517b1__MG_0224.jpg", name: "MG_0224.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e269217b8393dc8e7387__MG_0226.jpg", name: "MG_0226.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e26e0e6dd15579f55213__MG_0231.jpg", name: "MG_0231.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e26f3496e563bee679e6__MG_0232.jpg", name: "MG_0232.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e26fbd286d304ef16117__MG_0235.jpg", name: "MG_0235.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e26f1058b01e4be606ee__MG_0236.jpg", name: "MG_0236.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e2755d86a266fb6ade5a__MG_0245.jpg", name: "MG_0245.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e27589a1188e68eac673__MG_0246.jpg", name: "MG_0246.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e2751225a66bca24ae4d__MG_0248.jpg", name: "MG_0248.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e27db2b012ea1e9a935f__MG_0256.jpg", name: "MG_0256.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e2843496e563bee68dcd__MG_0259.jpg", name: "MG_0259.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e284f6ff5b3bc217ba04__MG_0264.jpg", name: "MG_0264.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e284052fa0377919c143__MG_0265.jpg", name: "MG_0265.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6766e28425a33401d61ac24b__MG_0266.jpg", name: "MG_0266.jpg" }
    ];
    var slideIndex = 0;
    
    // Crea le slide dinamicamente
    function createSlides() {
      var slidesContainer = document.querySelector(".slides-Collezione1-halloween2024-mobile");
      images.forEach(function(img, index) {
        var slide = document.createElement("div");
        slide.className = "slide-Collezione1-halloween2024-mobile";
        var imageEl = document.createElement("img");
        imageEl.src = img.url;
        imageEl.alt = "Image " + (index + 1);
        imageEl.className = "product-image-Collezione1-halloween2024-mobile";
        slide.appendChild(imageEl);
        slidesContainer.appendChild(slide);
      });
    }
    
    // Crea gli indicatori
    function createIndicators() {
      var indicatorContainer = document.querySelector(".slider-indicators-Collezione1-halloween2024-mobile");
      images.forEach(function(_, idx) {
        var dot = document.createElement("div");
        dot.className = "indicator-Collezione1-halloween2024-mobile" + (idx === 0 ? " active" : "");
        dot.addEventListener("click", function() {
          moveToSlide(idx);
        });
        indicatorContainer.appendChild(dot);
      });
    }
    
    // Aggiorna il contatore della slide
    function updateSlideCounter() {
      document.getElementById("slide-counter-Collezione1-halloween2024-mobile").textContent = (slideIndex + 1) + " di " + images.length;
    }
    
    // Aggiorna la visibilità dei pulsanti
    function updateSliderButtons() {
      document.querySelector(".slider-button-Collezione1-halloween2024-mobile.prev").style.display = slideIndex === 0 ? "none" : "flex";
      document.querySelector(".slider-button-Collezione1-halloween2024-mobile.next").style.display = slideIndex === images.length - 1 ? "none" : "flex";
    }
    
    // Aggiorna gli indicatori attivi
    function updateIndicators() {
      var dots = document.querySelectorAll(".indicator-Collezione1-halloween2024-mobile");
      dots.forEach(function(dot, i) {
        dot.classList.toggle("active", i === slideIndex);
      });
    }
    
    // Funzione per spostarsi verso una slide specifica
    function moveToSlide(index) {
      slideIndex = index;
      document.querySelector(".slides-Collezione1-halloween2024-mobile").style.transform = "translateX(-" + (slideIndex * 100) + "%)";
      updateIndicators();
      updateSliderButtons();
      updateSlideCounter();
    }
    
    createSlides();
    createIndicators();
    updateSlideCounter();
    updateSliderButtons();
    
    // Event listener per i pulsanti next e prev
    document.querySelector(".slider-button-Collezione1-halloween2024-mobile.next").addEventListener("click", function() {
      if (slideIndex < images.length - 1) {
        moveToSlide(slideIndex + 1);
      }
    });
    document.querySelector(".slider-button-Collezione1-halloween2024-mobile.prev").addEventListener("click", function() {
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
      var sliderElement = document.querySelector(".slides-Collezione1-halloween2024-mobile");
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
    document.getElementById("download-single-Collezione1-halloween2024-mobile").addEventListener("click", function() {
      var currentSlide = document.querySelectorAll(".slide-Collezione1-halloween2024-mobile")[slideIndex];
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
    var downloadAllButton = document.getElementById("download-all-Collezione1-halloween2024-mobile");
    var spinner = downloadAllButton.querySelector(".spinner-Collezione1-halloween2024-mobile");
    var progressFrame = spinner.querySelector(".progress-frame-Collezione1-halloween2024-mobile");
    
    downloadAllButton.addEventListener("click", function() {
      spinner.style.display = "flex";
      progressFrame.style.background = "conic-gradient(#0071e3 0deg, #d3d3d3 0deg)";
      
      var zip = new JSZip();
      var folder = zip.folder("Halloween, 31 ottobre 2024");
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
        a.download = "Collezione 1.zip";
        a.click();
        spinner.style.display = "none";
      })
      .catch(function(err) {
        console.error("Errore nel download ZIP:", err);
        spinner.style.display = "none";
      });
    });
    
    // Rendi visibile la gallery (se necessario)
    document.querySelector(".slider-Collezione1-halloween2024-mobile").style.opacity = "1";
    document.querySelector(".details-Collezione1-halloween2024-mobile").style.opacity = "1";
  }

  // Avvia l’inizializzazione quando il DOM è completamente caricato
  document.addEventListener("DOMContentLoaded", function() {
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js", function() {
      initGallery();
    });
  });
})();
