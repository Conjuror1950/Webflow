document.addEventListener("click", function (e) {
  var link = e.target.closest("a");
  if (!link) return;

  var href = link.getAttribute("href");
  if (!href) return;

  // intercetta SOLO link a sezione stessa pagina
  if (href.charAt(0) !== "#" && href.indexOf(window.location.pathname + "#") === -1) {
    return;
  }

  var id = href.split("#")[1];
  if (!id) return;

  var target = document.getElementById(id);
  if (!target) return;

  e.preventDefault();

  target.scrollIntoView({ behavior: "smooth" });

  history.replaceState(null, "", window.location.pathname);
});
