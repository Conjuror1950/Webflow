document.addEventListener("DOMContentLoaded", function () {
    function setupLightbox(id, url) {
        const lightbox = document.getElementById(id);
        if (lightbox) {
            // Crea un link <a> invisibile nel DOM
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.style.display = "none";
            anchor.rel = "noopener noreferrer";
            document.body.appendChild(anchor);

            lightbox.addEventListener("click", function (event) {
                const isNewTab = event.ctrlKey || event.metaKey || event.button === 1;

                if (isNewTab) {
                    anchor.target = "_blank";
                } else {
                    anchor.target = "_self";
                }

                // Simula il click sull'anchor
                anchor.click();

                // Previene comportamento predefinito
                event.preventDefault();
            });

            // Previene apertura doppia su clic centrale in alcuni browser
            lightbox.addEventListener("mousedown", function (event) {
                if (event.button === 1) {
                    event.preventDefault();
                }
            });
        }
    }

    setupLightbox("lightbox-produzioni-cinematografiche", "https://andreaingrassia.webflow.io/show/produzioni-cinematografiche");
    setupLightbox("lightbox-album-fotografici", "https://andreaingrassia.webflow.io/room/album-fotografici");
});
