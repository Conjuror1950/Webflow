// FILE: accordion-footer.js
document.addEventListener("DOMContentLoaded", function() {
  // --- 1️⃣ Aggiungi stile CSS dinamicamente ---
  const css = `
    /* Nascondi l'icona di default di Webflow */
    .w-dropdown-toggle .w-icon-dropdown-toggle {
      display: none;
    }

    /* Stile icona custom */
    .accordion-icon {
      display: inline-block;
      width: 18px;
      height: 18px;
      font-size: 18px;
      font-weight: bold;
      line-height: 18px;
      text-align: center;
      transition: transform 0.3s ease;
      cursor: pointer;
      user-select: none;
    }

    /* Posizionamento a destra, come Apple */
    .w-dropdown-toggle {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Rotazione dell'icona quando aperto */
    .w-dropdown.open .accordion-icon {
      transform: rotate(45deg); /* + diventa × */
    }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // --- 2️⃣ Gestione icona e click ---
  const dropdowns = document.querySelectorAll(".w-dropdown");

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".w-dropdown-toggle");

    // Crea l'icona custom
    const icon = document.createElement("span");
    icon.classList.add("accordion-icon");
    icon.textContent = "+";

    // Inserisci l'icona nel toggle
    toggle.appendChild(icon);

    // Click toggle
    toggle.addEventListener("click", function(e) {
      // Chiudi tutti gli altri dropdown (opzionale stile Apple)
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove("open");
      });

      // Alterna stato open
      dropdown.classList.toggle("open");

      // Cambia testo icona
      if (dropdown.classList.contains("open")) {
        icon.textContent = "×";
      } else {
        icon.textContent = "+";
      }
    });
  });
});
