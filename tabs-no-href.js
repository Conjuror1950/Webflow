(function () {
  const FIXED_HREF = "#"; // mai URL reale
  let currentIndex = 0;

  const tabs = document.querySelectorAll(".w-tab-link");
  if (!tabs.length) return;

  const tabsMenu = tabs[0].parentElement;

  /* -------------------------------
     FUNZIONE ANTI-HREF (PER TAB)
  -------------------------------- */
  function forceHref(tab) {
    if (tab.dataset.forcing === "true") return;

    tab.dataset.forcing = "true";

    tab.removeAttribute("href");
    tab.setAttribute("href", FIXED_HREF);

    requestAnimationFrame(() => {
      tab.removeAttribute("href");
      tab.setAttribute("href", FIXED_HREF);
      delete tab.dataset.forcing;
    });
  }

  /* -------------------------------
     FUNZIONE BORDI TEXT BLOCK
  -------------------------------- */
  const textBlocks = [
    document.querySelector(".Text-Block-153"), // Tab 1
    document.querySelector(".Text-Block-155"), // Tab 2
    document.querySelector(".Text-Block-156")  // Tab 3
  ];

function updateTextBorders(index) {
  textBlocks.forEach((tb, i) => {
    if (!tb) return;
    if (i === index) {
      tb.style.border = "2px solid #0071e3";
      tb.style.display = "inline-block";   // Assicurati che il bordo si veda
      tb.style.boxSizing = "border-box";   // Include il bordo nella dimensione
    } else {
      tb.style.border = "none";
    }
  });
}

  /* -------------------------------
     UNDERLINE DINAMICO (APPLE STYLE)
  -------------------------------- */
  const underline = document.createElement("div");
  underline.classList.add("tab-underline");
  underline.style.position = "absolute";
  underline.style.bottom = "0";
  underline.style.height = "1px";
  underline.style.backgroundColor = "black";
  underline.style.transition =
    "left 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s cubic-bezier(0.4, 0, 0.2, 1)";

  function initUnderline() {
    const tab = tabs[currentIndex];
    const rect = tab.getBoundingClientRect();
    const parentRect = tabsMenu.getBoundingClientRect();
    underline.style.left = rect.left - parentRect.left + "px";
    underline.style.width = rect.width + "px";
    tabsMenu.appendChild(underline);
  }

  function positionUnderline(index) {
    const tab = tabs[index];
    const rect = tab.getBoundingClientRect();
    const parentRect = tabsMenu.getBoundingClientRect();
    underline.style.left = rect.left - parentRect.left + "px";
    underline.style.width = rect.width + "px";
  }

  /* -------------------------------
     INIT
  -------------------------------- */
  tabs.forEach(tab => forceHref(tab)); // rimuove subito href Webflow

  window.addEventListener("load", function () {
    initUnderline();

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", function (e) {
        e.preventDefault();

        currentIndex = i;
        positionUnderline(currentIndex);

        // Aggiorna classe current
        tabs.forEach(t => t.classList.remove("current"));
        tab.classList.add("current");

        // Aggiorna bordi text block
        updateTextBorders(i);

        forceHref(tab); // forza href subito dopo il click
      });
    });

    // Al caricamento iniziale, imposta i bordi per la prima tab
    updateTextBorders(currentIndex);
  });

  /* -------------------------------
     MUTATION OBSERVER (ANTI-FLASH)
  -------------------------------- */
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "href" &&
        mutation.target.classList.contains("w-tab-link")
      ) {
        forceHref(mutation.target);
      }
    });
  });

  observer.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ["href"]
  });
})();
