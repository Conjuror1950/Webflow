document.addEventListener("DOMContentLoaded", function () {
    const faqContainer = document.createElement("div");
    faqContainer.className = "faq-container";
    faqContainer.innerHTML = `
        <div class="faq-item">
            <h3>Scopri i miei lavori<span class="icon"></span></h3>
            <p>Visita la pagina 'Portfolio', disponibile all'indirizzo <a href="https://andreaingrassia.webflow.io/portfolio">IT</a> (Italia), troverai una selezione di lavori che rappresentano le mie competenze in fotografia e video editing. Include alcuni progetti realizzati a scopo puramente dimostrativo.</p>
        </div>
        <div class="faq-item">
            <h3>Servizi offerti<span class="icon"></span></h3>
            <p>Mi occupo di montaggio, color grading, animazioni e post-produzione. Offro anche pacchetti completi che coprono l'intera produzione video, dalla sceneggiatura alla consegna finale.
               Realizzo sessioni fotografiche per ritratti ed eventi, garantendo qualità ed attenzione ai dettagli.
               Per maggiori informazioni visita la pagina Servizi, disponibile all'indirizzo <a href="https://andreaingrassia.webflow.io/servizi">IT</a> (Italia).</p>
        </div>
        <div class="faq-item">
            <h3>Aggiornamenti del sito<span class="icon"></span></h3>
            <p>Visita la pagina 'Aggiornamenti', disponibile all'indirizzo <a href="https://andreaingrassia.webflow.io/informazioni/aggiornamenti">IT</a> (Italia), per scoprire tutte le nuove versioni rilasciate dal lancio del sito. Troverai dettagli su ogni aggiornamento e le novità introdotte.</p>
        </div>
        <div class="faq-item">
            <h3>Contatti<span class="icon"></span></h3>
            <p>Per metterti in contatto, accedi alla pagina 'Contatti' e compila il <a href="https://andreaingrassia.webflow.io/contatti#modulo">modulo contatti</a> oppure invia una <a href="mailto:andrea.ingrassia@zohomail.eu">email.</a></p>
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
    
/* solo su schermi “stretti” (mobile) in landscape, ruota indietro tutto il body */
@media only screen 
  and (max-width: 767px) 
  and (orientation: landscape) {
  
  body {
    transform: rotate(-90deg);
    transform-origin: top left;
    width: 100vh;   /* forza l’altezza come se fosse la larghezza */
    height: 100vw;  /* forza la larghezza come se fosse l’altezza */
    overflow: hidden;
  }
}
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
