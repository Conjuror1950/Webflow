(function() {
    var style = document.createElement("style");
    style.innerHTML = `
        .w-webflow-badge {
            display: none !important;
            visibility: hidden !important;
        }
    `;
    document.head.appendChild(style);
    console.log("Badge Webflow rimosso!");
})();
