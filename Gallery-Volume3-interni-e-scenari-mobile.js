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

    .wrapper-slider-apple-style {
      width: 100%;
      max-width: 1024px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
      position: relative;
    }

    .slider-apple-style {
      position: relative;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      padding-left: 20px; /* solo padding a sinistra */
    }

.slides-apple-style {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding-left: 20px; /* solo padding a sinistra per default */
}

.slides-apple-style .slide-apple-style:last-child {
  margin-right: 20px; /* padding a destra solo per l’ultima slide */
}

    .slides-apple-style::-webkit-scrollbar {
      display: none;
    }

    .slide-apple-style {
      flex: 0 0 70%;
      scroll-snap-align: start;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: default; /* nessun effetto click */
      transition: none;
    }

    .slide-apple-style img {
      width: 100%;
      height: auto;
      border-radius: 12px;
      object-fit: contain;
      transition: none;
    }

    /* Indicatori puntini */
    .slider-indicators-apple-style {
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 12px 0;
    }

    .indicator-apple-style {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ccc;
      transition: background 0.3s;
      cursor: pointer;
    }

    .indicator-apple-style.active {
      background: #000;
    }

    /* Dettagli download */
    .details-apple-style {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 0 40px;
    }

    .option-apple-style {
      background: #f7f7f7;
      border-radius: 12px;
      padding: 14px 20px;
      cursor: pointer;
      transition: background 0.2s, box-shadow 0.2s;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .option-apple-style:hover {
      background: #e0e0e0;
    }

    @media screen and (max-width: 768px) {
      .slide-apple-style {
        flex: 0 0 85%;
      }
    }
  `;
  addStyle(galleryCSS);

  // HTML aggiornato (senza pulsanti)
  var galleryHTML = `
<div class="wrapper-slider-apple-style">
  <div class="slider-apple-style">
    <div class="slides-apple-style"></div>
  </div>
  <div class="slider-indicators-apple-style"></div>
  <div class="details-apple-style">
    <div class="option-apple-style" id="download-single-apple">
      <span>Scarica immagine</span>
      <span>.jpg</span>
    </div>
    <div class="option-apple-style" id="download-all-apple">
      <span>Scarica tutto</span>
      <span>.zip</span>
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

    var slidesContainer = document.querySelector(".slides-apple-style");
    var indicatorsContainer = document.querySelector(".slider-indicators-apple-style");
    var slideIndex = 0;

    images.forEach((img, idx) => {
      // slide
      var slide = document.createElement("div");
      slide.className = "slide-apple-style";
      var imageEl = document.createElement("img");
      imageEl.src = img.webp;
      imageEl.alt = img.name;
      slide.appendChild(imageEl);
      slidesContainer.appendChild(slide);

      // indicator
      var dot = document.createElement("div");
      dot.className = "indicator-apple-style" + (idx === 0 ? " active" : "");
dot.addEventListener("click", () => {
  slideIndex = idx;
  goToSlide(slideIndex);
});
      indicatorsContainer.appendChild(dot);
    });

    function updateIndicators() {
      document.querySelectorAll(".indicator-apple-style").forEach((dot, idx) => {
        dot.classList.toggle("active", idx === slideIndex);
      });
    }

let isScrolling = false;
let startScrollLeft = 0;

let startTouchX = 0;

slidesContainer.addEventListener("touchstart", (e) => {
  startTouchX = e.touches[0].clientX;
});

slidesContainer.addEventListener("touchend", (e) => {
  if (isScrolling) return;

  const endTouchX = e.changedTouches[0].clientX;
  const diff = endTouchX - startTouchX;

  // se lo swipe supera 20px consideralo valido
  if (diff < -20) {
    // swipe verso sinistra → slide successiva
    slideIndex = Math.min(slideIndex + 1, images.length - 1);
    goToSlide(slideIndex);
  } else if (diff > 20) {
    // swipe verso destra → slide precedente
    slideIndex = Math.max(slideIndex - 1, 0);
    goToSlide(slideIndex);
  }
});

function goToSlide(index) {
  isScrolling = true;

  const slideWidth = slidesContainer.children[0].offsetWidth + 16; // 16 = gap
  const targetScroll = slideWidth * index;

  slidesContainer.scrollTo({
    left: targetScroll,
    behavior: "smooth"
  });

  updateIndicators();

  setTimeout(() => {
    isScrolling = false;
  }, 400);
}

    slidesContainer.addEventListener("scroll", () => {
  if (isScrolling) return;

  const slideWidth = slidesContainer.children[0].offsetWidth + 16;
  const newIndex = Math.round(slidesContainer.scrollLeft / slideWidth);

  if (newIndex !== slideIndex) {
    slideIndex = newIndex;
    updateIndicators();
  }
});

    // Download singolo
    document.getElementById("download-single-apple").addEventListener("click", ()=>{
      var a=document.createElement("a");
      a.href=images[slideIndex].jpg;
      a.download=images[slideIndex].name;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    });

    // Download ZIP
    document.getElementById("download-all-apple").addEventListener("click", ()=>{
      var a=document.createElement("a");
      a.href="https://andrea-ingrassia.netlify.app/ph-rm/collections-and-events/c/collections/images/set-03/zip-photos/item-01/Collection_Photos_0301.zip";
      a.download="Collection_Photos_0301.zip";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    });
  }

  document.addEventListener("DOMContentLoaded", initGallery);
})();
