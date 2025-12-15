(function () {
  var FIXED_HREF = window.location.pathname + "#";
  var currentIndex = 0;
  const tabs = document.querySelectorAll(".w-tab-link");

  function forceTabHref() {
    tabs.forEach((tab, i) => {
      // Forza href
      if (tab.getAttribute("href") !== FIXED_HREF) {
        tab.setAttribute("href", FIXED_HREF);
      }

      if (!tab.dataset.fixedHref) {
        tab.dataset.fixedHref = "true";

        tab.addEventListener("click", function (e) {
          e.preventDefault();

          tabs.forEach((t, j) => {
            const ul = t.querySelector(".tab-underline");
            if (ul) {
              if (j === i) {
                // Determina direzione
                ul.style.transformOrigin = i > currentIndex ? "left center" : "right center";
                ul.style.transform = "scaleX(1)";
              } else {
                ul.style.transformOrigin = j > i ? "left center" : "right center";
                ul.style.transform = "scaleX(0)";
              }
            }
            t.classList.remove("current");
          });

          tab.classList.add("current");
          currentIndex = i;

          // Forza href dopo click (Webflow reinietta)
          setTimeout(() => {
            tab.setAttribute("href", FIXED_HREF);
          }, 0);
        });
      }

      // Stato iniziale underline
      const ul = tab.querySelector(".tab-underline");
      if (ul) {
        ul.style.transform = tab.classList.contains("current") ? "scaleX(1)" : "scaleX(0)";
        ul.style.transformOrigin = "left center";
        ul.style.transition = "transform 0.2s ease-out";
      }
    });
  }

  window.addEventListener("load", forceTabHref);

  const observer = new MutationObserver(forceTabHref);
  observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["href", "class"] });
})();
