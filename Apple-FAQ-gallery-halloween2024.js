document.addEventListener("DOMContentLoaded", function () {
    const faqContainer = document.createElement("div");
    faqContainer.className = "faq-container";
    faqContainer.innerHTML = `
        <div class="faq-item">
            <h3>Posso utilizzare le immagini per i miei progetti creativi?<span class="icon"></span></h3>
            <p>Ogni immagine presente in 'Collezione 1, Halloween' è protetta da copyright, con il fotografo Andrea Ingrassia come titolare dei diritti. Le immagini contengono metadati EXIF completi, inclusi ISO, tempi di scatto, diaframma e tutte le informazioni tecniche relative alla foto. Si garantisce che ogni contenuto è gestito con la massima professionalità, nel pieno rispetto del diritto d'autore e della qualità.</p>
        </div>
        <div class="faq-item">
            <h3>Come vengono gestiti i file e le cartelle?<span class="icon"></span></h3>
            <p>I file e le cartelle sono compressi in un unico pacchetto (.zip) per una facile gestione, con una selezione attenta a combinare efficienza e sicurezza, garantendo la massima fruibilità dei tuoi ricordi.</p>
        </div>
        <div class="faq-item">
            <h3>In che modo il post-processing contribuisce alla resa delle immagini?<span class="icon"></span></h3>
            <p>Le immagini sono state processate con Adobe Lightroom Classic, che permette di esaltare luce, colore e contrasto. Il risultato è una resa visiva impeccabile, dove ogni dettaglio è pensato per esprimere un’estetica senza compromessi.</p>
        </div>
        <div class="faq-item">
            <h3>Quali sono i requisiti per visualizzare correttamente il pacchetto?<span class="icon"></span></h3>
            <p>Il pacchetto è ottimizzato per essere compatibile con la maggior parte dei dispositivi moderni. Grazie al formato compresso e alle immagini in HD, potrai visualizzare il contenuto senza compromessi sulla qualità.</p>
        </div>
    `;

    const targetContainer = document.getElementById("faq-section");
    if (targetContainer) {
        targetContainer.appendChild(faqContainer);
    } else {
        console.warn("Elemento con ID 'faq-section' non trovato, la FAQ verrà aggiunta in fondo alla pagina.");
        document.body.appendChild(faqContainer);
    }

    const style = document.createElement("style");
    style.textContent = `
        /* Impostazione del font globale per l'intera pagina */
        * {
            font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif !important;
            margin: 0;
            padding: 0;
        }

        /* Contenitore FAQ */
        .faq-container {
            margin: 0;
            padding: 20px;
            background-color: white;
            color: #1d1d1f;
            max-width: 700px;
            margin: auto;
        }

        .faq-item {
            border-bottom: 1px solid #d2d2d7;
            cursor: pointer;
            padding: 8px 0;
            margin: 8px;
            position: relative; /* Necessario per posizionare le icone */
        }

        .faq-item h3 {
            font-size: 16px;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0;
        }

        .faq-item p {
            font-size: 15px;
            color: #6e6e73;
            margin-top: 0px;
            max-height: 0;
            overflow: hidden;
            padding: 0;
            transition: max-height 0.5s ease-in-out, padding 0.5s ease-in-out;
        }

        /* Icona + e X */
        .faq-item .icon {
            font-size: 24px; /* Grandezza dell'icona */
            transition: transform 0.3s ease-out, color 0.3s ease-out;
            display: inline-block;
            width: 30px; /* Larghezza dell'icona */
            text-align: center;
            line-height: 24px; /* Centra l'icona verticalmente */
            color: #1d1d1f; /* Colore iniziale dell'icona */
            font-weight: semi-bold; /* Enfatizza il simbolo */
        }

        /* Icona + quando non attiva */
        .faq-item .icon:before {
            content: "+"; /* Il simbolo più */
        }

        /* Icona X quando attiva */
        .faq-item.active .icon:before {
            content: "×"; /* Il simbolo di X */
            transform: rotate(45deg); /* Ruota per la X */
        }

        .faq-item.active p {
            max-height: 200px;
            padding: 8px 0;
        }

        /* Link dentro FAQ */
        .faq-container a {
            color: #06c;
            text-decoration: none; /* Rimuove la sottolineatura */
        }

        /* Hover sui link dentro FAQ */
        .faq-container a:hover {
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);

    document.querySelectorAll(".faq-item").forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });
});
