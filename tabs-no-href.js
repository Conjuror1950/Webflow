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
  tabs.forEach(tab => forceHref(tab));

  window.addEventListener("load", function () {
    initUnderline();

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", function (e) {
        e.preventDefault();

        currentIndex = i;
        positionUnderline(currentIndex);

        tabs.forEach(t => t.classList.remove("current"));
        tab.classList.add("current");

        forceHref(tab);
      });
    });
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

  /* -------------------------------
     CLICK FUORI TAB → AGGIUNGI BORDER
  -------------------------------- */
  document.addEventListener("click", function (e) {
    // Se il click NON è su una tab
    if (!e.target.classList.contains("w-tab-link")) {
      const classesToBorder = [
        "Text-Block-153",
        "Text-Block-155",
        "Text-Block-156"
      ];

      classesToBorder.forEach(cls => {
        document.querySelectorAll(`.${cls}`).forEach(el => {
          el.style.border = "2px solid transparent"; // imposta il bordo a tutti i lati
        });
      });
    }
  });
})();
