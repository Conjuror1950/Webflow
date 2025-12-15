document.addEventListener("DOMContentLoaded", function () {
  const tabLinks = document.querySelectorAll(".w-tab-link");

  tabLinks.forEach(function (tab) {
    // Rimuove l'attributo href
    tab.removeAttribute("href");

    // Blocca qualsiasi navigazione
    tab.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });
});
