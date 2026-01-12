// FILE: accordion-footer.js
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

    .accordion-icon {
      width: 14px;
      height: 14px;
      position: relative;
      flex-shrink: 0;
      transition: transform 0.45s cubic-bezier(.4,0,.2,1);
    }

    /* Linee della + */
    .accordion-icon::before,
    .accordion-icon::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 1.5px;
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

    /* Stato aperto → diventa X */
    .w-dropdown.open .accordion-icon {
      transform: rotate(45deg);
    }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ===============================
     2. JS – Stato open sincronizzato
  =============================== */
  const dropdowns = document.querySelectorAll(".w-dropdown");

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".w-dropdown-toggle");

    if (!toggle) return;

    // Evita duplicazioni
    if (toggle.querySelector(".accordion-icon")) return;

    const icon = document.createElement("span");
    icon.className = "accordion-icon";

    toggle.appendChild(icon);

    toggle.addEventListener("click", () => {
      // Chiude gli altri (Apple behavior)
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove("open");
      });

      // Toggle locale
      dropdown.classList.toggle("open");
    });
  });
});
