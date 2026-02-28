(function() {
  // Funzione per iniettare CSS
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

  // CSS stile Apple /buy/ slider
  var galleryCSS = `
    @import url('https://cdn.apple.com/sf-pro/SF-Pro-Display-Regular.woff2') format('woff2');
    
    body {
      font-family: "SF Pro Display", sans-serif !important;
      margin: 0;
      padding: 0;
      background: #fff;
      overflow-x: hidden;
    }

    .wrapper-slider-Volume3 {
      max-width: 600px;
      margin: 0 auto;
      position: relative;
      padding: 20px 0;
      overflow: hidden;
    }

    .slider-Volume3 {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .slides-Volume3 {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      padding-left: 16px;
      padding-right: 16px;
      user-select: none;
    }

    .slides-Volume3::-webkit-scrollbar {
      display: none;
    }

    .slide-Volume3 {
      flex: 0 0 85%;
      scroll-snap-align: start;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.5s ease, opacity 0.5s ease;
      cursor: pointer;
    }

    .slide-Volume3 img {
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 12px;
      transition: transform 0.6s cubic-bezier(0.25,1,0.5,1);
    }

    .slide-Volume3:hover img {
      transform: scale(1.02);
    }

    .slider-button-Volume3 {
      position: absolute;
      top: 50%;
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,0.05);
      border-radius: 50%;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 10;
      transition: background 0.3s;
    }

    .slider-button-Volume3:hover {
      background: rgba(0,0,0,0.1);
    }

    .slider-button-Volume3.prev { left: 10px; transform: translateY(-50%); }
    .slider-button-Volume3.next { right: 10px; transform: translateY(-50%); }

    .slider-button-Volume3 img { width: 20px; height: 20px; }

    .slider-indicators-Volume3 {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 12px;
    }

    .indicator-Volume3 {
      width: 8px;
      height: 8px;
      background: #d2d2d7;
      border-radius: 50%;
      transition: background 0.3s;
      cursor: pointer;
    }

    .indicator-Volume3.active {
      background: #1d1d1f;
    }

    @media screen and (min-width: 1280px) {
      .wrapper-slider-Volume3 { max-width: 800px; }
    }
  `;
  addStyle(galleryCSS);

  // HTML slider
  var galleryHTML = `
    <div class="wrapper-slider-Volume3" id="Volume3-interni-e-scenari-container-mobile">
      <div class="slider-Volume3">
        <div class="slides-Volume3"></div>
        <button class="slider-button-Volume3 prev">
          <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/680a56d179fee9c3b97257aa_chevron.left.svg" alt="Prev"/>
        </button>
        <button class="slider-button-Volume3 next">
          <img src="https://cdn.prod.website-files.com/6612d92ea994c2c00b892543/680a52aa54d1922ad06feeeb_be514248c3f97e7343cec2a888aad323_chevron.right.svg" alt="Next"/>
        </button>
      </div>
      <div class="slider-indicators-Volume3"></div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", galleryHTML);

  // IMMAGINI (esempio)
  var images = [
    {webp: "https://andrea-ingrassia.netlify.app/ph-rm/.../photo-030101.webp"},
    {webp: "https://andrea-ingrassia.netlify.app/ph-rm/.../photo-030102.webp"},
    {webp: "https://andrea-ingrassia.netlify.app/ph-rm/.../photo-030103.webp"},
    {webp: "https://andrea-ingrassia.netlify.app/ph-rm/.../photo-030104.webp"}
  ];

  var slideIndex = 0;

  function createSlides() {
    var slidesContainer = document.querySelector(".slides-Volume3");
    images.forEach((img, idx) => {
      var slide = document.createElement("div");
      slide.className = "slide-Volume3";
      var imageEl = document.createElement("img");
      imageEl.src = img.webp;
      imageEl.alt = "Image " + (idx + 1);
      slide.appendChild(imageEl);
      slidesContainer.appendChild(slide);
    });
  }

  function createIndicators() {
    var indicators = document.querySelector(".slider-indicators-Volume3");
    images.forEach((_, idx) => {
      var dot = document.createElement("div");
      dot.className = "indicator-Volume3" + (idx === 0 ? " active" : "");
      dot.addEventListener("click", () => moveToSlide(idx));
      indicators.appendChild(dot);
    });
  }

  function updateIndicators() {
    document.querySelectorAll(".indicator-Volume3").forEach((dot,i) => {
      dot.classList.toggle("active", i === slideIndex);
    });
  }

  function moveToSlide(idx) {
    slideIndex = idx;
    var slides = document.querySelector(".slides-Volume3");
    slides.children[idx].scrollIntoView({behavior: "smooth", inline: "start"});
    updateIndicators();
  }

  function setupButtons() {
    document.querySelector(".slider-button-Volume3.next").addEventListener("click", () => {
      if (slideIndex < images.length -1) moveToSlide(slideIndex + 1);
    });
    document.querySelector(".slider-button-Volume3.prev").addEventListener("click", () => {
      if (slideIndex > 0) moveToSlide(slideIndex - 1);
    });
  }

  function setupSwipe() {
    var slider = document.querySelector(".slides-Volume3");
    var startX = 0, startY = 0, isDragging = false, threshold=50;

    slider.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX; startY = e.touches[0].clientY; isDragging=true;
    }, {passive:true});

    slider.addEventListener("touchmove", e => {
      if (!isDragging) return;
      var deltaX = e.touches[0].clientX - startX;
      var deltaY = e.touches[0].clientY - startY;
      if (Math.abs(deltaX) > Math.abs(deltaY)) e.preventDefault();
    }, {passive:false});

    slider.addEventListener("touchend", e => {
      if (!isDragging) return;
      var deltaX = e.changedTouches[0].clientX - startX;
      if (deltaX < -threshold && slideIndex < images.length-1) moveToSlide(slideIndex+1);
      if (deltaX > threshold && slideIndex > 0) moveToSlide(slideIndex-1);
      isDragging=false;
    });
  }

  function setupKeyboard() {
    document.addEventListener("keydown", e => {
      if (e.key==="ArrowRight" && slideIndex<images.length-1) moveToSlide(slideIndex+1);
      if (e.key==="ArrowLeft" && slideIndex>0) moveToSlide(slideIndex-1);
    });
  }

  function initGallery() {
    createSlides();
    createIndicators();
    setupButtons();
    setupSwipe();
    setupKeyboard();
  }

  document.addEventListener("DOMContentLoaded", initGallery);
})();
