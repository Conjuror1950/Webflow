document.addEventListener("DOMContentLoaded", function () {
    function setupLightbox(id, url) {
        var lightbox = document.getElementById(id);
        if (lightbox) {
            lightbox.addEventListener("click", function (event) {
                event.preventDefault();
                window.location.href = url; // Apertura nella stessa scheda
            });
        }
    }

    setupLightbox("lightbox1", "https://andreaingrassia.webflow.io/show/produzioni-cinematografiche");
    setupLightbox("lightbox2", "https://andreaingrassia.webflow.io/room/album-fotografici");
    setupLightbox("lightbox3", "https://andreaingrassia.webflow.io/show/produzioni-cinematografiche");
    setupLightbox("lightbox4", "https://andreaingrassia.webflow.io/room/album-fotografici");
});
