document.addEventListener("DOMContentLoaded", function () {
    function setupLightbox(id, url) {
        var lightbox = document.getElementById(id);
        if (lightbox) {
            lightbox.addEventListener("click", function (event) {
                // Se l'utente tiene premuto ctrl/cmd o clicca col tasto centrale
                if (event.ctrlKey || event.metaKey || event.button === 1) {
                    const link = document.createElement("a");
                    link.href = url;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    // Comportamento normale: stessa scheda
                    window.location.href = url;
                }
                event.preventDefault();
            });
        }
    }

    setupLightbox("lightbox-produzioni-cinematografiche", "https://andreaingrassia.webflow.io/show/produzioni-cinematografiche");
    setupLightbox("lightbox-album-fotografici", "https://andreaingrassia.webflow.io/room/album-fotografici");
});
