(function () {
  const FIXED_HREF = window.location.pathname + "#";
  let currentIndex = 0;
  let isForcingHref = false;

  const tabs = document.querySelectorAll(".w-tab-link");
  if (!tabs.length) return;

  const tabsMenu = tabs[0].parentElement;

  /* -------------------------------
     FUNZIONE ANTI-HREF WEBFLOW
  -------------------------------- */
  function forceHref(tab) {
    if (isForcingHref) return;

    isForcingHref = true;

    tab.removeAttribute("href");
    tab.setAttribute("href", FIXED_HREF);

    requestAnimationFrame(() => {
      tab.removeAttribute("href");
      tab.setAttribute("href", FIXED_HREF);
      isForcingHref = false;
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
  window.addEventListener("load", function () {
    initUnderline();

    tabs.forEach((tab, i) => {
      forceHref(tab);

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

  /* --------------------------------
     MUTATION OBSERVER (ANTI-REINIEZIONE)
  ---------------------------------- */
  const observer = new MutationObserver((mutations) => {
    if (isForcingHref) return;

    mutations.forEach((mutation) => {
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
