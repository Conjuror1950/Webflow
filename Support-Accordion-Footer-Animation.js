document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     1. CSS Apple-style
  =============================== */
  const css = `
    .w-dropdown-toggle .w-icon-dropdown-toggle {
      display: none;
    }

    .w-dropdown-toggle {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* ICONA + / × */
    .accordion-icon {
      width: 8px;
      height: 8px;
      position: relative;
      flex-shrink: 0;
      transition: transform 0.45s cubic-bezier(.4,0,.2,1);
    }

    .accordion-icon::before,
    .accordion-icon::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 1.2px;
      background: currentColor;
      transform-origin: center;
      transition: transform 0.45s cubic-bezier(.4,0,.2,1);
    }

    .accordion-icon::before {
      transform: translate(-50%, -50%);
    }

    .accordion-icon::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }

    .w-dropdown.open .accordion-icon {
      transform: rotate(45deg);
    }

    /* ===============================
       ANIMAZIONE CONTENUTO (APPLE)
    =============================== */
    .w-dropdown-list {
      overflow: hidden;
      height: 0;
      opacity: 0;
      transform: translateY(-4px);
      transition:
        height 0.35s cubic-bezier(.4,0,.2,1),
        opacity 0.25s ease,
        transform 0.35s cubic-bezier(.4,0,.2,1);
    }

    .w-dropdown.open .w-dropdown-list {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ===============================
     2. JS – Apertura Apple-style
  =============================== */
  const dropdowns = document.querySelectorAll(".w-dropdown");

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".w-dropdown-toggle");
    const list = dropdown.querySelector(".w-dropdown-list");

    if (!toggle || !list) return;

    // Icona (evita duplicati)
    if (!toggle.querySelector(".accordion-icon")) {
      const icon = document.createElement("span");
      icon.className = "accordion-icon";
      toggle.appendChild(icon);
    }

    // Stato iniziale
    list.style.height = "0px";

    toggle.addEventListener("click", () => {

      // Chiude gli altri (Apple behavior)
      dropdowns.forEach(d => {
        if (d !== dropdown) closeDropdown(d);
      });

      // Toggle corrente
      dropdown.classList.contains("open")
        ? closeDropdown(dropdown)
        : openDropdown(dropdown);
    });
  });

  /* ===============================
     FUNZIONI
  =============================== */
  function openDropdown(dropdown) {
    const list = dropdown.querySelector(".w-dropdown-list");
    dropdown.classList.add("open");

    const height = list.scrollHeight;
    list.style.height = height + "px";

    // Dopo animazione → auto (Apple trick)
    list.addEventListener("transitionend", function handler(e) {
      if (e.propertyName === "height") {
        list.style.height = "auto";
        list.removeEventListener("transitionend", handler);
      }
    });
  }

  function closeDropdown(dropdown) {
    const list = dropdown.querySelector(".w-dropdown-list");
    if (!dropdown.classList.contains("open")) return;

    // forza altezza corrente
    list.style.height = list.scrollHeight + "px";

    requestAnimationFrame(() => {
      list.style.height = "0px";
      dropdown.classList.remove("open");
    });
  }
});
