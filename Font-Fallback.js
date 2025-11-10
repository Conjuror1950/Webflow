// File: setFontsFallback.js
(function() {
    // Associa selettori ai font specifici
    const fonts = [
        { selector: '.sf-pro-text', family: `"SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif` },
        { selector: '.sf-pro-display', family: `"SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif` }
    ];

    document.addEventListener("DOMContentLoaded", function() {
        fonts.forEach(font => {
            const elements = document.querySelectorAll(font.selector);
            elements.forEach(el => {
                el.style.fontFamily = font.family;
            });
        });
    });
})();
