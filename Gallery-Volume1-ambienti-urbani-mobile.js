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
      bottom: 5px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 1.8px;
      z-index: 2;
    }
    .indicator-Volume1-ambienti-urbani-mobile {
      display: none; /* Nascondere gli slider indicator. Per visualizzare eliminare la proprietà */
      width: 2.8px;
      height: 2.8px;
      background: #86868b;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.3s;
    }
    .indicator-Volume1-ambienti-urbani-mobile.active {
      background: #1d1d1d;
    }
    /* Testo sopra gli indicatori */
    .slide-count-Volume1-ambienti-urbani-mobile {
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
      margin-top: 10px;
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
    <h2>‎ </h2>
    <p>‎ </p>
  </div>
  
  <!-- Container che contiene solo lo slider -->
  <div class="container-Volume1-ambienti-urbani-mobile">
    <div class="slider-Volume1-ambienti-urbani-mobile">
      <div class="slides-Volume1-ambienti-urbani-mobile"></div>
      <div class="slider-buttons-Volume1-ambienti-urbani-mobile">
            <button class="slider-button-Volume1-ambienti-urbani-mobile prev">
              <img
                src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/680a56d179fee9c3b97257aa_chevron.left.svg"
                alt="Indietro"
                style="width:24px; height:24px;"
              />
            </button>
            <button class="slider-button-Volume1-ambienti-urbani-mobile next">
              <img
                src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/680a52aa54d1922ad06feeeb_be514248c3f97e7343cec2a888aad323_chevron.right.svg"
                alt="Avanti"
                style="width:24px; height:24px;"
              />
            </button>
      </div>
      <div class="slide-count-Volume1-ambienti-urbani-mobile">
        <span id="slide-counter-Volume1-ambienti-urbani-mobile">1 di 80</span>
      </div>
    </div>   
  </div>
  
  <!-- Blocco dei dettagli spostato fuori dal container -->
  <div class="slider-indicators-Volume1-ambienti-urbani-mobile"></div>
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
    <p>· Scatti 1-8: Palermo, Sicilia, Italia · 01–03 gen 2025</p>
    <p>· Scatti 9-11: Viareggio, Toscana, Italia · 2024</p>
    <p>· Scatti 12-66: Parigi, Francia, Europa · 27 lug – 1 ago 2023</p>
    <p>· Scatti 67-73: Roma, Lazio, Italia · 25 set 2022</p>
    <p>· Scatto 74: Firenze, Toscana, Italia · 2020</p>
    <p>· Scatto 75-76: Palermo, Sicilia, Italia · 18–29 ago 2019</p>
    <p>· Scatti 77-85: Varese, Lombardia, Italia · 02–04 ago 2019</p>
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
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9c7cb4a47becebd5f8__MG_0337.jpg", name: "MG_0337.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9b0d656804cb8c85bf__MG_0349.jpg", name: "MG_0349.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9ce48ddcd5917c203d__MG_0360.jpg", name: "MG_0360.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9ce48ddcd5917c2067__MG_0367.jpg", name: "MG_0367.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9abd9ccd45f5aba505__MG_0370.jpg", name: "MG_0370.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9bfd771fed48ac1804__MG_0408.jpg", name: "MG_0408.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/677e4f9cb1b768124be7a94d__MG_0427.jpg", name: "MG_0427.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66d9e54384f548f1fb478b0d__MG_9537.jpg", name: "MG_9537.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66d9e61b84f548f1fb48389e_IMG_1498.jpg", name: "MG_1498.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66d9e542007f4ca3f9d8a438_IMG_1517.jpg", name: "MG_1517.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665c76d9846673993f74__MG_7442.jpg", name: "MG_7442.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/6807f27918342111b789e227_MG_7488.jpg", name: "MG_7488.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665219b924db4dbbac69__MG_7382.jpg", name: "MG_7382.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc664e39706fc65eb40b29__MG_7398.jpg", name: "MG_7398.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665529e15a21ed88c269__MG_7404.jpg", name: "MG_7404.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665118ffc46b3d1bec06__MG_7406.jpg", name: "MG_7406.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc6657c2f99b295b94801c__MG_7417.jpg", name: "MG_7417.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665cd8e5c09607102bf3__MG_7531.jpg", name: "MG_7531.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665e15daa3fe6ce7e51f__MG_7695.jpg", name: "MG_7695.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665efc927bc34f06aa89__MG_7717.jpg", name: "MG_7717.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc664e02429c73b84b6043__MG_7767.jpg", name: "MG_7767.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665fcfc48ed5e3d68857__MG_7784.jpg", name: "MG_7784.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665f8e6e09e9b2876ae4__MG_7935.jpg", name: "MG_7935.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc666019b924db4dbbc151__MG_7937.jpg", name: "MG_7937.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc6653e1e99fbb3924a4f9__MG_7994.jpg", name: "MG_7994.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc66608f8fd5ebe19a5bce__MG_8035.jpg", name: "MG_8035.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc66583361c83dddf77268__MG_8183.jpg", name: "MG_8183.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc664f81bf97e670ad30dc__MG_8208.jpg", name: "MG_8208.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc66558b7957d39346f928__MG_8221.jpg", name: "MG_8221.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665118ffc46b3d1beb95__MG_8311.jpg", name: "MG_8311.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc6653dd607b08df066a97__MG_8365.jpg", name: "MG_8365.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc664f40390f84ccef7fa3__MG_8430.jpg", name: "MG_8430.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc664fe38da854fef608ea__MG_8478.jpg", name: "MG_8478.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc6660e38da854fef61520__MG_8552.jpg", name: "MG_8552.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc6656c5e6c9bbd146dc85__MG_8659.jpg", name: "MG_8659.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc665be1e46bad9e70259f__MG_8713.jpg", name: "MG_8713.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc66634915fa802e67344e__MG_8736.jpg", name: "MG_8736.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc66698e6e09e9b28777b1__MG_8939.jpg", name: "MG_8939.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc6669e1e46bad9e703697__MG_8945.jpg", name: "MG_8945.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc3a7ca92a956620fa9e70_Canon%20EOS%202000D%206000x4000_006172.jpg", name: "MG_6172.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc3a7d306c6fce7c74a95f_Canon%20EOS%202000D%206000x4000_006173.jpg", name: "MG_6173.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc3a7cd30ca26fb5e1418b_Canon%20EOS%202000D%206000x4000_006062.jpg", name: "MG_6062.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc3a7ba8ce8aec557e8fc1_Canon%20EOS%202000D%206000x4000_006040.jpg", name: "MG_6040.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc3a7add607b08dfdd9a6f_Canon%20EOS%202000D%206000x4000_006034.jpg", name: "MG_6034.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc3a7aa92a956620fa9d5c_Canon%20EOS%202000D%206000x4000_006045.jpg", name: "MG_6045.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc3a7cb777df17eebe44ab_Canon%20EOS%202000D%206000x4000_006138.jpg", name: "MG_6138.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dc3a493361c83dddcf4a4b_IMG-20220227-WA0042.jpg", name: "MG_0042.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66d9f31d74fa30e5e0a55eaf__MG_9304.jpg", name: "MG_9304.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66d9f31e46f76da1efe46790__MG_9224.jpg", name: "MG_9224.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dee639b54573be9f91cce5__MG_1973.jpg", name: "MG_1973.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dee638ce8ad747e194d8fc__MG_2325.jpg", name: "MG_2325.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dee636ca4eaee4ac23fdd4_IMG_2405.jpg", name: "MG_2405.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dee6380ac77a83f1cc701c__MG_2147.jpg", name: "MG_2147.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dee63a4a1834856623494e_IMG_1823.jpg", name: "MG_1823.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dee637f333d94fc1e65ab6__MG_2364.jpg", name: "MG_2364.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dee63a81278ffc7a074312__MG_2366.jpg", name: "MG_2366.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dee63789eade848ec425c7__MG_2213.jpg", name: "MG_2213.jpg" },
      { url: "https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/66dee638dfde9ab4282fda28__MG_2372.jpg", name: "MG_2372.jpg" }
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
