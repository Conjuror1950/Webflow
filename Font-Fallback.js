// File: setFontsFallback.js

// Funzione per applicare la famiglia di font globale
(function() {
    // Famiglia di font con fall-back
    const fontFamily = `"SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif`;

    // Applica il font a tutto il body
    document.addEventListener("DOMContentLoaded", function() {
        document.body.style.fontFamily = fontFamily;

        // In alternativa, puoi applicarlo a tutti gli elementi
        const elements = document.querySelectorAll("*");
        elements.forEach(el => {
            el.style.fontFamily = fontFamily;
        });
    });
})();
