document.addEventListener("click", function (e) {
  var trigger = e.target.closest("[data-scroll]");
  if (!trigger) return;

  var id = trigger.getAttribute("data-scroll");
  if (!id) return;

  var target = document.getElementById(id);
  if (!target) return;

  e.preventDefault();

  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  if (history.replaceState) {
    history.replaceState(null, "", window.location.pathname);
  }
});
