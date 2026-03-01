(function() {
  function addStyle(cssText) {
    var head = document.head || document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.type = "text/css";
    if (style.styleSheet) style.styleSheet.cssText = cssText;
    else style.appendChild(document.createTextNode(cssText));
    head.appendChild(style);
  }

  // CSS
  var galleryCSS = `
    @font-face {
      font-family: "SF Pro Display";
      src: url("https://cdn.apple.com/sf-pro/SF-Pro-Display-Regular.woff2") format("woff2");
      font-weight: 400;
      font-style: normal;
    }

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
      padding-left: 0; /* il padding dinamico lo gestiamo in JS */
      padding-right: 0;
    }

    .slides-Volume3-interni-e-scenari-mobile {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }

    .slides-Volume3-interni-e-scenari-mobile::-webkit-scrollbar { display: none; }

    .slide-Volume3-interni-e-scenari-mobile {
      flex: 0 0 70%;
      scroll-snap-align: start;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: default;
      transition: transform 0.8s, opacity 0.8s;
    }

    .slide-Volume3-interni-e-scenari-mobile.active { opacity: 1; transform: scale(1); }
    .slide-Volume3-interni-e-scenari-mobile img {
      width: 100%;
      height: auto;
      border-radius: 18px;
      object-fit: contain;
      transition: transform 0.6s;
    }

    .slider-indicators-Volume3-interni-e-scenari-mobile { display: flex; justify-content: center; gap: 8px; padding-top: 4px; }
    .indicator-Volume3-interni-e-scenari-mobile {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #86868b;
      cursor: pointer;
      transition: background 0.3s;
    }
    .indicator-Volume3-interni-e-scenari-mobile.active { background: #1d1d1d; }

    @media screen and (max-width: 768px) {
      .slide-Volume3-interni-e-scenari-mobile { flex: 0 0 85%; }
    }
  `;
  addStyle(galleryCSS);

  // HTML
  var galleryHTML = `
<div class="wrapper-slider-Volume3-interni-e-scenari-mobile">
  <div class="slider-Volume3-interni-e-scenari-mobile">
    <div class="slides-Volume3-interni-e-scenari-mobile"></div>
  </div>
  <div class="slider-indicators-Volume3-interni-e-scenari-mobile"></div>
</div>
`;

  function injectGallery() {
    var container = document.getElementById("Volume3-interni-e-scenari-container-mobile");
    if (container) container.innerHTML = galleryHTML;
    else document.body.appendChild(document.createElement("div")).innerHTML = galleryHTML;
  }
  injectGallery();

  function initGallery() {
    let startTouchX = 0;
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

    const slidesContainer = document.querySelector(".slides-Volume3-interni-e-scenari-mobile");
    const indicatorsContainer = document.querySelector(".slider-indicators-Volume3-interni-e-scenari-mobile");
    let slideIndex = 0;
    let isScrolling = false;

    images.forEach((img, idx) => {
      const slide = document.createElement("div");
      slide.className = "slide-Volume3-interni-e-scenari-mobile";
      const imageEl = document.createElement("img");
      imageEl.src = img.webp;
      imageEl.alt = img.name;
      slide.appendChild(imageEl);
      slidesContainer.appendChild(slide);

      const dot = document.createElement("div");
      dot.className = "indicator-Volume3-interni-e-scenari-mobile" + (idx === 0 ? " active" : "");
      dot.addEventListener("click", () => {
        slideIndex = idx;
        goToSlide(slideIndex);
      });
      indicatorsContainer.appendChild(dot);
    });

    function updateIndicators() {
      const slides = document.querySelectorAll(".slide-Volume3-interni-e-scenari-mobile");
      const dots = document.querySelectorAll(".indicator-Volume3-interni-e-scenari-mobile");
      slides.forEach((slide, idx) => slide.classList.toggle("active", idx === slideIndex));
      dots.forEach((dot, idx) => dot.classList.toggle("active", idx === slideIndex));
    }

    function goToSlide(index) {
      if (isScrolling) return;
      isScrolling = true;

      const slides = slidesContainer.children;
      const slideWidth = slides[0].offsetWidth + 16;
      const containerWidth = slidesContainer.clientWidth;
      let targetScroll = slideWidth * index;

      if (index === slides.length - 1) targetScroll = slidesContainer.scrollWidth - containerWidth;

      slidesContainer.scrollTo({ left: targetScroll, behavior: "smooth" });

      // Padding dinamico
      if (index === 0) {
        slidesContainer.style.paddingLeft = "20px";
        slidesContainer.style.paddingRight = "0";
      } else if (index === slides.length - 1) {
        slidesContainer.style.paddingLeft = "0";
        slidesContainer.style.paddingRight = "20px";
      } else {
        slidesContainer.style.paddingLeft = "20px";
        slidesContainer.style.paddingRight = "0";
      }

      updateIndicators();

      setTimeout(() => { isScrolling = false; }, 400);
    }

    slidesContainer.addEventListener("touchstart", (e) => { startTouchX = e.touches[0].clientX; });
    slidesContainer.addEventListener("touchend", (e) => {
      const diffX = e.changedTouches[0].clientX - startTouchX;
      if (diffX < -10) slideIndex = Math.min(slideIndex + 1, images.length - 1);
      else if (diffX > 10) slideIndex = Math.max(slideIndex - 1, 0);
      goToSlide(slideIndex);
    });

    goToSlide(0);
  }

  document.addEventListener("DOMContentLoaded", initGallery);
})();
