(function() {
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
 
  // CSS aggiornato
  var galleryCSS = `
    @import url("https://cdn.apple.com/sf-pro/SF-Pro-Display-Regular.woff2") format("woff2");
 
    body {
      font-family: "SF Pro Display", sans-serif !important;
      margin: 0;
      padding: 0;
      background: #fff;
      overflow-y: auto;
    }
 
    .wrapper-slider-Volume3-interni-e-scenari-mobile {
      width: 100%;
      max-width: 1024px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
      position: relative;
    }
 
    .slider-Volume3-interni-e-scenari-mobile {
      position: relative;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      padding-left: 20px; /* solo padding a sinistra */
    }
 
.slides-Volume3-interni-e-scenari-mobile {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding-left: 20px; /* solo padding a sinistra per default */
  padding-right: 0px;
  transition: padding 0.4s ease;
}
 
    .slides-Volume3-interni-e-scenari-mobile::-webkit-scrollbar {
      display: none;
    }
 
.slide-Volume3-interni-e-scenari-mobile {
  flex: 0 0 70%;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: default;
 
  transition: 
    transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1),
    opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
}
 
    .slide-Volume3-interni-e-scenari-mobile.active {
    opacity: 1;
    transform: scale(1);
   }
 
    .slide-Volume3-interni-e-scenari-mobile img {
      width: 100%;
      height: auto;
      border-radius: 18px;
      object-fit: contain;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
 
    /* Indicatori delle slide */
    .slider-indicators-Volume3-interni-e-scenari-mobile {
      display: flex;
      bottom: 0px;
      justify-content: center;
      gap: 8px;
      padding: 4px 0 0 0;
    }
 
    .indicator-Volume3-interni-e-scenari-mobile {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #86868b;
      transition: background 0.3s;
      cursor: pointer;
    }
 
    .indicator-Volume3-interni-e-scenari-mobile.active {
      background: #1d1d1d;
    }
 
    /* Dettagli download */
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
 
    /* Titoli sopra e sotto lo slider */
    .slider-title-top-Volume3-interni-e-scenari-mobile {
      font-family: "SF Pro Display", sans-serif !important;
      text-align: left;     
      color: black;
      margin-top: 52px;
      margin-bottom: -18px;
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
 
    @media screen and (max-width: 768px) {
      .slide-Volume3-interni-e-scenari-mobile {
        flex: 0 0 85%;
      }
    }
  `;
  addStyle(galleryCSS);
 
  // HTML aggiornato (senza pulsanti)
  var galleryHTML = `
<!-- Title -->
<div class="wrapper-slider-Volume3-interni-e-scenari-mobile">
  <div class="slider-title-top-Volume3-interni-e-scenari-mobile">
    <div class="title-wrapper-Volume3-interni-e-scenari-mobile">
      <h1>Download.</h1>
      <span class="subtitle-Volume3-interni-e-scenari-mobile">Quale scegli?</span>
    </div>
  </div>
 
  <!-- Slider -->
  <div class="slider-Volume3-interni-e-scenari-mobile">
    <div class="slides-Volume3-interni-e-scenari-mobile"></div>
  </div>
 
  <!-- Details -->
  <div class="slider-indicators-Volume3-interni-e-scenari-mobile"></div>
  <div class="details-Volume3-interni-e-scenari-mobile">
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
</div>
`;
 
  function injectGallery() {
    var container = document.getElementById("Volume3-interni-e-scenari-container-mobile");
    if (container) {
      container.innerHTML = galleryHTML;
    } else {
      var fallback = document.createElement("div");
      fallback.innerHTML = galleryHTML;
      document.body.appendChild(fallback);
      console.warn("Elemento non trovato, gallery iniettata in body.");
    }
  }
  injectGallery();
 
  function initGallery() {
    var images = [
      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/unit-photos/item-01/photo-030101/Collection_Photo_unselect_030101.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/download-photos/item-01/photo-030101/Collection_Photo_select_030101.jpg",
       name: "Collection_Photo_select_030101.jpg"},
 
      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/unit-photos/item-01/photo-030102/Collection_Photo_unselect_030102.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/download-photos/item-01/photo-030102/Collection_Photo_select_030102.jpg",
       name: "Collection_Photo_select_030102.jpg"},
 
      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/unit-photos/item-01/photo-030103/Collection_Photo_unselect_030103.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/download-photos/item-01/photo-030103/Collection_Photo_select_030103.jpg",
       name: "Collection_Photo_select_030103.jpg"},
 
      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/unit-photos/item-01/photo-030104/Collection_Photo_unselect_030104.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/download-photos/item-01/photo-030104/Collection_Photo_select_030104.jpg",
       name: "Collection_Photo_select_030104.jpg"},
 
      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/unit-photos/item-01/photo-030105/Collection_Photo_unselect_030105.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/download-photos/item-01/photo-030105/Collection_Photo_select_030105.jpg",
       name: "Collection_Photo_select_030105.jpg"},
 
      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/unit-photos/item-01/photo-030106/Collection_Photo_unselect_030106.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/download-photos/item-01/photo-030106/Collection_Photo_select_030106.jpg",
       name: "Collection_Photo_select_030106.jpg"},
 
      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/unit-photos/item-01/photo-030107/Collection_Photo_unselect_030107.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/download-photos/item-01/photo-030107/Collection_Photo_select_030107.jpg",
       name: "Collection_Photo_select_030107.jpg"},
 
      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/unit-photos/item-01/photo-030108/Collection_Photo_unselect_030108.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/download-photos/item-01/photo-030108/Collection_Photo_select_030108.jpg",
       name: "Collection_Photo_select_030108.jpg"},
 
      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/unit-photos/item-01/photo-030109/Collection_Photo_unselect_030109.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/download-photos/item-01/photo-030109/Collection_Photo_select_030109.jpg",
       name: "Collection_Photo_select_030109.jpg"},
 
      {webp: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/unit-photos/item-01/photo-030110/Collection_Photo_unselect_030110.webp",
       jpg: "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/download-photos/item-01/photo-030110/Collection_Photo_select_030110.jpg",
       name: "Collection_Photo_select_030110.jpg"}
    ];
 
    var slidesContainer = document.querySelector(".slides-Volume3-interni-e-scenari-mobile");
    var indicatorsContainer = document.querySelector(".slider-indicators-Volume3-interni-e-scenari-mobile");
    var slideIndex = 0;
    let startTouchX = 0;   // ← dichiarazione corretta
 
    images.forEach((img, idx) => {
      // slide
      var slide = document.createElement("div");
      slide.className = "slide-Volume3-interni-e-scenari-mobile";
      var imageEl = document.createElement("img");
      imageEl.src = img.webp;
      imageEl.alt = img.name;
      slide.appendChild(imageEl);
      slidesContainer.appendChild(slide);
 
      // indicator
      var dot = document.createElement("div");
      dot.className = "indicator-Volume3-interni-e-scenari-mobile" + (idx === 0 ? " active" : "");
dot.addEventListener("click", () => {
  slideIndex = idx;
  goToSlide(slideIndex);
});
      indicatorsContainer.appendChild(dot);
    });

      
    // ==================== FUNZIONI ====================

    function updateIndicators() {
      document.querySelectorAll(".indicator-Volume3-interni-e-scenari-mobile").forEach((dot, idx) => {
        dot.classList.toggle("active", idx === slideIndex);
      });

      document.querySelectorAll(".slide-Volume3-interni-e-scenari-mobile").forEach((slide, idx) => {
        slide.classList.toggle("active", idx === slideIndex);
      });

      // 🔁 padding dinamico
      if (slideIndex === images.length - 1) {
        slidesContainer.style.paddingLeft = "0px";
        slidesContainer.style.paddingRight = "20px";
      } else {
        slidesContainer.style.paddingLeft = "20px";
        slidesContainer.style.paddingRight = "0px";
      }
    }

    function goToSlide(index) {
      isScrolling = true;

      const slideWidth = slidesContainer.children[0].offsetWidth + 16;
      const maxScroll = slidesContainer.scrollWidth - slidesContainer.clientWidth;

      let targetScroll = slideWidth * index;
      if (targetScroll > maxScroll) targetScroll = maxScroll;

      slidesContainer.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });

      updateIndicators();

      setTimeout(() => { isScrolling = false; }, 400);
    }

    // ==================== VARIABILI E LISTENER ====================

    let isScrolling = false;

    slidesContainer.addEventListener("touchstart", (e) => {
      startTouchX = e.touches[0].clientX;
    });

    slidesContainer.addEventListener("touchend", (e) => {
      if (isScrolling) return;

      let diffX = e.changedTouches[0].clientX - startTouchX;

      if (diffX < -10) {
        slideIndex = Math.min(slideIndex + 1, images.length - 1);
      } else if (diffX > 10) {
        slideIndex = Math.max(slideIndex - 1, 0);
      }

      goToSlide(slideIndex);
    });

    slidesContainer.addEventListener("scroll", () => {
      if (isScrolling) return;

      const slideWidth = slidesContainer.children[0].offsetWidth + 16;
      const currentScroll = slidesContainer.scrollLeft;
      const expectedScroll = slideWidth * slideIndex;

      const diff = currentScroll - expectedScroll;

      if (Math.abs(diff) > slideWidth / 2) {
        if (diff > 0 && slideIndex < images.length - 1) {
          slideIndex += 1;
        } else if (diff < 0 && slideIndex > 0) {
          slideIndex -= 1;
        }
        goToSlide(slideIndex);
      }
    });

    // ==================== INIZIALIZZAZIONE FINALE ====================

    slideIndex = 0;

    // Doppio requestAnimationFrame = aspettiamo che il layout sia pronto (dimensioni slide calcolate)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        slidesContainer.style.paddingLeft = "20px";
        slidesContainer.style.paddingRight = "0px";
        updateIndicators();
        goToSlide(0);
      });
    });

    // Download singolo
    document.getElementById("download-single-Volume3-interni-e-scenari-mobile").addEventListener("click", () => {
      var a = document.createElement("a");
      a.href = images[slideIndex].jpg;
      a.download = images[slideIndex].name;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    });

    // Download ZIP
    document.getElementById("download-all-Volume3-interni-e-scenari-mobile").addEventListener("click", () => {
      var a = document.createElement("a");
      a.href = "https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/zip-photos/item-01/Collection_Photos_0301.zip";
      a.download = "Collection_Photos_0301.zip";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    });
  }   // ← fine di initGallery()
 
  document.addEventListener("DOMContentLoaded", initGallery);
})();
