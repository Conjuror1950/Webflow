document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (e) {
    var link = e.target.closest("a");
    if (!link) return;

    var href = link.getAttribute("href");
    if (!href || href.indexOf("#") === -1) return;

    var id = href.split("#")[1];
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
