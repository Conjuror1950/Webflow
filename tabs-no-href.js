(function () {
  function removeTabHrefs() {
    document.querySelectorAll(".w-tab-link").forEach(function (tab) {
      tab.removeAttribute("href");
      tab.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });
  }

  // Prima esecuzione (dopo load completo)
  window.addEventListener("load", removeTabHrefs);

  // Osserva modifiche DOM (Webflow reinietta gli href)
  const observer = new MutationObserver(removeTabHrefs);

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
