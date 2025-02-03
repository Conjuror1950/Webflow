document.addEventListener('DOMContentLoaded', function () {
    // Aggiungiamo il CSS in modo dinamico
    const style = document.createElement('style');
    style.innerHTML = `
        body {
            font-family: "SF Pro Display", !important;
            margin: 0;
            padding: 20px;
            background-color: white;
            color: #1d1d1f;
        }
        .faq-container {
            max-width: 700px;
            margin: auto;
        }
        .faq-item {
            border-bottom: 1px solid #d2d2d7;
            cursor: pointer;
            padding: 8px 0;
            margin: 8px
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
        .icon {
            transition: transform 0.3s ease-out;
        }
        .faq-item.active .icon {
            transform: rotate(45deg);
        }
        .faq-item.active p {
            max-height: 200px;
            padding: 8px 0;
        }
        a {
            color: #06c;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);

    // Aggiungiamo il contenuto HTML della pagina FAQ
    const faqContainer = document.createElement('div');
    faqContainer.classList.add('faq-container');

    const faqItems = [
        {
            title: "Scopri i miei lavori",
            content: `Visita la pagina 'Portfolio', disponibile all'indirizzo <a href="https://andreaingrassia.webflow.io/portfolio">IT</a> (Italia), troverai una selezione di lavori che rappresentano le mie competenze in fotografia e video editing. Include alcuni progetti realizzati a scopo puramente dimostrativo.`
        },
        {
            title: "Servizi offerti",
            content: `Mi occupo di montaggio, color grading, animazioni e post-produzione. Offro anche pacchetti completi che coprono l'intera produzione video, dalla sceneggiatura alla consegna finale. Realizzo sessioni fotografiche per ritratti ed eventi, garantendo qualità ed attenzione ai dettagli. Per maggiori informazioni visita la pagina Servizi, disponibile all'indirizzo <a href="https://andreaingrassia.webflow.io/servizi">IT</a> (Italia).`
        },
        {
            title: "Aggiornamenti del sito",
            content: `Visita la pagina 'Aggiornamenti', disponibile all'indirizzo <a href="https://andreaingrassia.webflow.io/informazioni/aggiornamenti">IT</a> (Italia), per scoprire tutte le nuove versioni rilasciate dal lancio del sito. Troverai dettagli su ogni aggiornamento e le novità introdotte.`
        },
        {
            title: "Contatti",
            content: `Per metterti in contatto, accedi alla pagina 'Contatti' e compila il <a href="https://andreaingrassia.webflow.io/contatti#modulo">modulo contatti</a> oppure invia una <a href="mailto:andrea.ingrassia@zohomail.eu">email.</a>`
        }
    ];

    // Creiamo gli elementi FAQ
    faqItems.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq-item');
        faqItem.innerHTML = `
            <h3><span class="icon">${index + 1}</span> ${item.title}</h3>
            <p>${item.content}</p>
        `;
        faqContainer.appendChild(faqItem);
    });

    document.body.appendChild(faqContainer);

    // Funzionalità JavaScript per l'apertura e chiusura delle FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});
