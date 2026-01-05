document.addEventListener("click", function (e) {
  const trigger = e.target.closest("[data-scroll]");
  if (!trigger) return;

  const id = trigger.getAttribute("data-scroll");
  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;

  e.preventDefault();

  // 1. Scroll istantaneo (nessuna animazione)
  target.scrollIntoView({
    behavior: "auto",
    block: "start"
  });

  // 2. Mostra l'hash nell'URL (come Apple)
  if (history.pushState) {
    history.pushState(null, "", `#${id}`);
  } else {
    window.location.hash = id;
  }
});
