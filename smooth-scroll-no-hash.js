// data-scroll unified
// Scroll istantaneo SEMPRE (desktop + mobile)
// Fix speciale per id="top" su iOS Safari
// Hash aggiornato manualmente (Apple-style)

(function () {
  document.addEventListener("click", function (e) {
    const trigger = e.target.closest("[data-scroll]");
    if (!trigger) return;

    const id = trigger.getAttribute("data-scroll");
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    // blocca SEMPRE il comportamento nativo
    e.preventDefault();
    e.stopPropagation();

    // ───────────────────────────────────────
    // FIX MOBILE PER #top
    // Safari tratta "top" come scroll nativo animato
    // quindi forziamo window.scrollTo PRIMA
    if (id === "top") {
      // doppio frame per battere Safari iOS
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    } else {
      // scroll normale per tutti gli altri target
      target.scrollIntoView({
        behavior: "auto",
        block: "start"
      });
    }

    // ───────────────────────────────────────
    // aggiorna hash URL SENZA triggerare scroll
    if (history.pushState) {
      history.pushState(null, "", `#${id}`);
    } else {
      // fallback legacy
      window.location.hash = id;
    }
  }, true); // <-- capture phase (fondamentale su mobile)
})();
