document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var id = link.getAttribute("href").substring(1);
    if (!id) return;

    var target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    if (window.history && history.replaceState) {
      history.replaceState(null, "", window.location.pathname);
    }
  });
});
