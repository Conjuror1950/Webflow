(function () {
  var FIXED_HREF = window.location.pathname + "#";
  var currentIndex = 0;
  const tabs = document.querySelectorAll(".w-tab-link");

  function createUnderline(tab) {
    let ul = tab.querySelector(".tab-underline");
    if (!ul) {
      ul = document.createElement("div");
      ul.classList.add("tab-underline");
      tab.appendChild(ul);

      // Stile CSS dinamico
      ul.style.position = "absolute";
      ul.style.bottom = "0px";
      ul.style.left = "0px";
      ul.style.height = "2px";
      ul.style.width = "100%";
      ul.style.backgroundColor = "black";
      ul.style.transform = tab.classList.contains("current") ? "scaleX(1)" : "scaleX(0)";
      ul.style.transformOrigin = "left center";
      ul.style.transition = "transform 0.2s ease-out";
      ul.style.pointerEvents = "none"; // per non interferire col click
    }
    return ul;
  }

  function forceTabHref() {
    tabs.forEach((tab, i) => {
      // Crea underline se non esiste
      const underline = createUnderline(tab);

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
            if (!ul) return;

            if (j === i) {
              // direzione dinamica
              ul.style.transformOrigin = i > currentIndex ? "left center" : "right center";
              ul.style.transform = "scaleX(1)";
            } else {
              ul.style.transformOrigin = j > i ? "left center" : "right center";
              ul.style.transform = "scaleX(0)";
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
    });
  }

  window.addEventListener("load", forceTabHref);

  const observer = new MutationObserver(forceTabHref);
  observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["href", "class"] });
})();
