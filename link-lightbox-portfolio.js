document.addEventListener("DOMContentLoaded", function () {
    function setupLightbox(id, url) {
        var lightbox = document.getElementById(id);
        if (lightbox) {
            lightbox.addEventListener("click", function (event) {
                // Rileva Ctrl/Cmd click o tasto centrale (rotellina)
                const isNewTab = event.ctrlKey || event.metaKey || event.button === 1;

                if (isNewTab) {
                    const link = document.createElement("a");
                    link.href = url;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    // Append temporaneamente al DOM per simulare un click
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    // Apertura nella stessa scheda
                    window.location.href = url;
                }

                // Previeni comportamento predefinito in entrambi i casi
                event.preventDefault();
            });

            // Aggiunta anche per compatibilità con clic centrale puro (es. Firefox)
            lightbox.addEventListener("mousedown", function (event) {
                if (event.button === 1) {
                    event.preventDefault(); // Previene l'apertura doppia
                }
            });
        }
    }

    setupLightbox("lightbox-produzioni-cinematografiche", "https://andreaingrassia.webflow.io/show/produzioni-cinematografiche");
    setupLightbox("lightbox-album-fotografici", "https://andreaingrassia.webflow.io/room/album-fotografici");
});
