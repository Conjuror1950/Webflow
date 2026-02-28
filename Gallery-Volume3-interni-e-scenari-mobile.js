(function() {
  // Funzione per aggiungere CSS alla pagina
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

  // CSS Apple-style per slider
  var galleryCSS = `
    /* Font Apple */
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

    /* Slider container */
    .slider-apple-style {
      position: relative;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
    }

    /* Slides wrapper */
    .slides-apple-style {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      padding: 0 40px;
    }

    .slides-apple-style::-webkit-scrollbar {
      display: none;
    }

    /* Slide individuale */
    .slide-apple-style {
      flex: 0 0 70%;
      scroll-snap-align: start;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      transition: transform 0.5s cubic-bezier(0.25,1,0.5,1);
      cursor: pointer;
    }

    .slide-apple-style img {
      width: 100%;
      height: auto;
      border-radius: 12px;
      object-fit: contain;
      transition: transform 0.5s ease, box-shadow 0.5s ease;
    }

    .slide-apple-style:hover img {
      transform: scale(1.02);
      box-shadow: 0 10px 20px rgba(0,0,0,0.12);
    }

    /* Pulsanti prev/next */
    .slider-button-apple-style {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: none;
      background: rgba(0,0,0,0.05);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 10;
      transition: background 0.3s;
    }

    .slider-button-apple-style:hover {
      background: rgba(0,0,0,0.1);
    }

    .slider-button-apple-style.prev {
      left: 10px;
    }

    .slider-button-apple-style.next {
      right: 10px;
    }

    .slider-button-apple-style img {
      width: 20px;
      height: 20px;
    }

    /* Indicatori puntini */
    .slider-indicators-apple-style {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 12px;
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

    /* Contatore */
    .slide-counter-apple-style {
      position: absolute;
      bottom: 10px;
      right: 40px;
      font-size: 14px;
      color: #333;
      font-weight: 600;
      z-index: 5;
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

    /* Responsive */
    @media screen and (max-width: 768px) {
      .slide-apple-style {
        flex: 0 0 85%;
      }
      .slides-apple-style {
        padding: 0 20px;
      }
    }
  `;
  addStyle(galleryCSS);

  // HTML slider
  var galleryHTML = `
<div class="wrapper-slider-apple-style">
  <div class="slider-apple-style">
    <button class="slider-button-apple-style prev">
      <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/680a56d179fee9c3b97257aa_chevron.left.svg" alt="Prev"/>
    </button>
    <div class="slides-apple-style"></div>
    <button class="slider-button-apple-style next">
      <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/680a52aa54d1922ad06feeeb_be514248c3f97e7343cec2a888aad323_chevron.right.svg" alt="Next"/>
    </button>
    <div class="slide-counter-apple-style"></div>
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
    var slideIndex = 0;

    var slidesContainer = document.querySelector(".slides-apple-style");
    var indicatorsContainer = document.querySelector(".slider-indicators-apple-style");
    var counterEl = document.querySelector(".slide-counter-apple-style");

    // Crea slide e indicatori
    images.forEach((img, idx) => {
      var slide = document.createElement("div");
      slide.className = "slide-apple-style";
      var imageEl = document.createElement("img");
      imageEl.src = img.webp;
      imageEl.alt = img.name;
      slide.appendChild(imageEl);
      slidesContainer.appendChild(slide);

      var dot = document.createElement("div");
      dot.className = "indicator-apple-style" + (idx === 0 ? " active" : "");
      dot.addEventListener("click", () => moveToSlide(idx));
      indicatorsContainer.appendChild(dot);
    });

    function updateCounter() {
      counterEl.textContent = (slideIndex + 1) + " / " + images.length;
    }

    function updateIndicators() {
      document.querySelectorAll(".indicator-apple-style").forEach((dot, idx) => {
        dot.classList.toggle("active", idx === slideIndex);
      });
    }

    function moveToSlide(idx) {
      slideIndex = idx;
      slidesContainer.children[idx].scrollIntoView({behavior:"smooth", inline:"start"});
      updateIndicators();
      updateCounter();
    }

    // Pulsanti prev/next
    document.querySelector(".slider-button-apple-style.prev").addEventListener("click", () => {
      if (slideIndex > 0) moveToSlide(slideIndex - 1);
    });
    document.querySelector(".slider-button-apple-style.next").addEventListener("click", () => {
      if (slideIndex < images.length - 1) moveToSlide(slideIndex + 1);
    });

    // Swipe mobile
    (function() {
      var startX = 0, startY = 0, isDragging = false, threshold = 50;
      slidesContainer.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
      }, {passive:true});

      slidesContainer.addEventListener("touchmove", e => {
        if(!isDragging) return;
        var deltaX = e.touches[0].clientX - startX;
        var deltaY = e.touches[0].clientY - startY;
        if(Math.abs(deltaX) > Math.abs(deltaY)) e.preventDefault();
      }, {passive:false});

      slidesContainer.addEventListener("touchend", e => {
        if(!isDragging) return;
        var deltaX = e.changedTouches[0].clientX - startX;
        if(deltaX < -threshold && slideIndex < images.length-1) moveToSlide(slideIndex+1);
        else if(deltaX > threshold && slideIndex > 0) moveToSlide(slideIndex-1);
        isDragging=false;
      });
    })();

    // Tastiera
    document.addEventListener("keydown", e => {
      if(e.key==="ArrowRight" && slideIndex<images.length-1) moveToSlide(slideIndex+1);
      else if(e.key==="ArrowLeft" && slideIndex>0) moveToSlide(slideIndex-1);
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
      a.href="https://andrea-ingrassia.netlify.app/ph-rm/.../Collection_Photos_0301.zip";
      a.download="Collection_Photos_0301.zip";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    });

    updateCounter();
  }

  document.addEventListener("DOMContentLoaded", initGallery);
})();
