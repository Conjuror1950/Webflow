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
      position: relative;
      bottom: -20px;
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
      margin-top: 25px;
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
        <div class="option-subtext-Volume1-ambienti-urbani-mobile">62 elementi, ~145 MB</div>
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
      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010101/Collection_Photo_unselect_010101.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010101/Collection_Photo_select_010101.jpg",
       name: "Collection_Photo_select_010101.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010102/Collection_Photo_unselect_010102.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010102/Collection_Photo_select_010102.jpg",
       name: "Collection_Photo_select_010102.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010103/Collection_Photo_unselect_010103.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010103/Collection_Photo_select_010103.jpg",
       name: "Collection_Photo_select_010103.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010104/Collection_Photo_unselect_010104.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010104/Collection_Photo_select_010104.jpg",
       name: "Collection_Photo_select_010104.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010105/Collection_Photo_unselect_010105.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010105/Collection_Photo_select_010105.jpg",
       name: "Collection_Photo_select_010105.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010106/Collection_Photo_unselect_010106.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010106/Collection_Photo_select_010106.jpg",
       name: "Collection_Photo_select_010106.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010107/Collection_Photo_unselect_010107.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010107/Collection_Photo_select_010107.jpg",
       name: "Collection_Photo_select_010107.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010108/Collection_Photo_unselect_010108.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010108/Collection_Photo_select_010108.jpg",
       name: "Collection_Photo_select_010108.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010109/Collection_Photo_unselect_010109.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010109/Collection_Photo_select_010109.jpg",
       name: "Collection_Photo_select_010109.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010110/Collection_Photo_unselect_010110.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010110/Collection_Photo_select_010110.jpg",
       name: "Collection_Photo_select_010110.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010111/Collection_Photo_unselect_010111.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010111/Collection_Photo_select_010111.jpg",
       name: "Collection_Photo_select_010111.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010112/Collection_Photo_unselect_010112.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010112/Collection_Photo_select_010112.jpg",
       name: "Collection_Photo_select_010112.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010113/Collection_Photo_unselect_010113.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010113/Collection_Photo_select_010113.jpg",
       name: "Collection_Photo_select_010113.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010114/Collection_Photo_unselect_010114.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010114/Collection_Photo_select_010114.jpg",
       name: "Collection_Photo_select_010114.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010115/Collection_Photo_unselect_010115.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010115/Collection_Photo_select_010115.jpg",
       name: "Collection_Photo_select_010115.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010116/Collection_Photo_unselect_010116.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010116/Collection_Photo_select_010116.jpg",
       name: "Collection_Photo_select_010116.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010117/Collection_Photo_unselect_010117.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010117/Collection_Photo_select_010117.jpg",
       name: "Collection_Photo_select_010117.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010118/Collection_Photo_unselect_010118.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010118/Collection_Photo_select_010118.jpg",
       name: "Collection_Photo_select_010118.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010119/Collection_Photo_unselect_010119.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010119/Collection_Photo_select_010119.jpg",
       name: "Collection_Photo_select_010119.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010120/Collection_Photo_unselect_010120.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010120/Collection_Photo_select_010120.jpg",
       name: "Collection_Photo_select_010120.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010121/Collection_Photo_unselect_010121.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010121/Collection_Photo_select_010121.jpg",
       name: "Collection_Photo_select_010121.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010122/Collection_Photo_unselect_010122.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010122/Collection_Photo_select_010122.jpg",
       name: "Collection_Photo_select_010122.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010123/Collection_Photo_unselect_010123.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010123/Collection_Photo_select_010123.jpg",
       name: "Collection_Photo_select_010123.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010124/Collection_Photo_unselect_010124.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010124/Collection_Photo_select_010124.jpg",
       name: "Collection_Photo_select_010124.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010125/Collection_Photo_unselect_010125.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010125/Collection_Photo_select_010125.jpg",
       name: "Collection_Photo_select_010125.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010126/Collection_Photo_unselect_010126.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010126/Collection_Photo_select_010126.jpg",
       name: "Collection_Photo_select_010126.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010127/Collection_Photo_unselect_010127.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010127/Collection_Photo_select_010127.jpg",
       name: "Collection_Photo_select_010127.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010128/Collection_Photo_unselect_010128.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010128/Collection_Photo_select_010128.jpg",
       name: "Collection_Photo_select_010128.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010129/Collection_Photo_unselect_010129.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010129/Collection_Photo_select_010129.jpg",
       name: "Collection_Photo_select_010129.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010130/Collection_Photo_unselect_010130.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010130/Collection_Photo_select_010130.jpg",
       name: "Collection_Photo_select_010130.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010131/Collection_Photo_unselect_010131.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010131/Collection_Photo_select_010131.jpg",
       name: "Collection_Photo_select_010131.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010132/Collection_Photo_unselect_010132.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010132/Collection_Photo_select_010132.jpg",
       name: "Collection_Photo_select_010132.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010133/Collection_Photo_unselect_010133.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010133/Collection_Photo_select_010133.jpg",
       name: "Collection_Photo_select_010133.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010134/Collection_Photo_unselect_010134.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010134/Collection_Photo_select_010134.jpg",
       name: "Collection_Photo_select_010134.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010135/Collection_Photo_unselect_010135.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010135/Collection_Photo_select_010135.jpg",
       name: "Collection_Photo_select_010135.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010136/Collection_Photo_unselect_010136.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010136/Collection_Photo_select_010136.jpg",
       name: "Collection_Photo_select_010136.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010137/Collection_Photo_unselect_010137.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010137/Collection_Photo_select_010137.jpg",
       name: "Collection_Photo_select_010137.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010138/Collection_Photo_unselect_010138.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010138/Collection_Photo_select_010138.jpg",
       name: "Collection_Photo_select_010138.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010139/Collection_Photo_unselect_010139.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010139/Collection_Photo_select_010139.jpg",
       name: "Collection_Photo_select_010139.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010140/Collection_Photo_unselect_010140.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010140/Collection_Photo_select_010140.jpg",
       name: "Collection_Photo_select_010140.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010141/Collection_Photo_unselect_010141.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010141/Collection_Photo_select_010141.jpg",
       name: "Collection_Photo_select_010141.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010142/Collection_Photo_unselect_010142.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010142/Collection_Photo_select_010142.jpg",
       name: "Collection_Photo_select_010142.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010143/Collection_Photo_unselect_010143.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010143/Collection_Photo_select_010143.jpg",
       name: "Collection_Photo_select_010143.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010144/Collection_Photo_unselect_010144.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010144/Collection_Photo_select_010144.jpg",
       name: "Collection_Photo_select_010144.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010145/Collection_Photo_unselect_010145.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010145/Collection_Photo_select_010145.jpg",
       name: "Collection_Photo_select_010145.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010146/Collection_Photo_unselect_010146.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010146/Collection_Photo_select_010146.jpg",
       name: "Collection_Photo_select_010146.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010147/Collection_Photo_unselect_010147.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010147/Collection_Photo_select_010147.jpg",
       name: "Collection_Photo_select_010147.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010148/Collection_Photo_unselect_010148.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010148/Collection_Photo_select_010148.jpg",
       name: "Collection_Photo_select_010148.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010149/Collection_Photo_unselect_010149.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010149/Collection_Photo_select_010149.jpg",
       name: "Collection_Photo_select_010149.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010150/Collection_Photo_unselect_010150.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010150/Collection_Photo_select_010150.jpg",
       name: "Collection_Photo_select_010150.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010151/Collection_Photo_unselect_010151.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010151/Collection_Photo_select_010151.jpg",
       name: "Collection_Photo_select_010151.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010152/Collection_Photo_unselect_010152.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010152/Collection_Photo_select_010152.jpg",
       name: "Collection_Photo_select_010152.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010153/Collection_Photo_unselect_010153.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010153/Collection_Photo_select_010153.jpg",
       name: "Collection_Photo_select_010153.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010154/Collection_Photo_unselect_010154.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010154/Collection_Photo_select_010154.jpg",
       name: "Collection_Photo_select_010154.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010155/Collection_Photo_unselect_010155.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010155/Collection_Photo_select_010155.jpg",
       name: "Collection_Photo_select_010155.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010156/Collection_Photo_unselect_010156.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010156/Collection_Photo_select_010156.jpg",
       name: "Collection_Photo_select_010156.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010157/Collection_Photo_unselect_010157.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010157/Collection_Photo_select_010157.jpg",
       name: "Collection_Photo_select_010157.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010158/Collection_Photo_unselect_010158.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010158/Collection_Photo_select_010158.jpg",
       name: "Collection_Photo_select_010158.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010159/Collection_Photo_unselect_010159.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010159/Collection_Photo_select_010159.jpg",
       name: "Collection_Photo_select_010159.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010160/Collection_Photo_unselect_010160.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010160/Collection_Photo_select_010160.jpg",
       name: "Collection_Photo_select_010160.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010161/Collection_Photo_unselect_010161.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010161/Collection_Photo_select_010161.jpg",
       name: "Collection_Photo_select_010161.jpg"},

      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/unit-photos/item-01/photo-010162/Collection_Photo_unselect_010162.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/download-photos/item-01/photo-010162/Collection_Photo_select_010162.jpg",
       name: "Collection_Photo_select_010162.jpg"}
    ];
    var slideIndex = 0;
    
    // Crea le slide dinamicamente
    function createSlides() {
      var slidesContainer = document.querySelector(".slides-Volume1-ambienti-urbani-mobile");
      images.forEach(function(img, index) {
        var slide = document.createElement("div");
        slide.className = "slide-Volume1-ambienti-urbani-mobile";
        var imageEl = document.createElement("img");
        imageEl.src = img.webp;
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
document.getElementById("download-single-Volume1-ambienti-urbani-mobile")
.addEventListener("click", function() {

  var fileUrl = images[slideIndex].jpg;
  var fileName = images[slideIndex].name;

  var a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

});
    
// Download dell'intero volume in ZIP
var downloadAllButton = document.getElementById("download-all-Volume1-ambienti-urbani-mobile");

downloadAllButton.addEventListener("click", function() {
  var zipUrl = "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-01/zip-photos/item-01/Collection_Photos_0101.zip";
  var fileName = "Collection_Photos_0101.zip";

  // Crea link temporaneo e avvia download immediato
  var a = document.createElement("a");
  a.href = zipUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
    
    // Rendi visibile la gallery (se necessario)
    document.querySelector(".slider-Volume1-ambienti-urbani-mobile").style.opacity = "1";
    document.querySelector(".details-Volume1-ambienti-urbani-mobile").style.opacity = "1";
  }

// Avvia l’inizializzazione quando il DOM è completamente caricato
document.addEventListener("DOMContentLoaded", function() {
  initGallery();
  });
})();
