<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FAQ</title>
    <style>
        body {
            font-family: "SF Pro Display", !important;
            margin: 0;
            padding: 20px;
            background-color: white;
            color: #1d1d1f;
        }
        .faq-container {
            max-width: auto;
            margin: auto;
        }
        .faq-item {
            border-bottom: 1px solid #d2d2d7;
            cursor: pointer;
            padding: 8px 0; /* Ridotto il padding per ridurre lo spazio tra il titolo e la linea */
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
            transition: transform 0.3s ease-out; /* Transizione fluida per l'icona */
        }
        .faq-item.active .icon {
            transform: rotate(45deg);
        }
        .faq-item.active p {
            max-height: 200px; /* Impostiamo un valore sufficiente per contenere il testo */
            padding: 8px 0;
        }
        a {
            color: #06c;
            text-decoration: none; /* Rimuove la sottolineatura */
        }
        a:hover {
            text-decoration: underline; /* Aggiunge la sottolineatura al passaggio del mouse */
        }
    </style>
</head>
<body>
    <div class="faq-container">
        <div class="faq-item">
            <h3>Scopri i miei lavori<span class="icon">+</span></h3>
            <p>Visita la pagina 'Portfolio', disponibile all'indirizzo <a href="https://andreaingrassia.webflow.io/portfolio">IT</a> (Italia), troverai una selezione di lavori che rappresentano le mie competenze in fotografia e video editing. Include alcuni progetti realizzati a scopo puramente dimostrativo.</p>
        </div>
        <div class="faq-item">
            <h3>Servizi offerti<span class="icon">+</span></h3>
            <p>Mi occupo di montaggio, color grading, animazioni e post-produzione. Offro anche pacchetti completi che coprono l'intera produzione video, dalla sceneggiatura alla consegna finale.
               Realizzo sessioni fotografiche per ritratti ed eventi, garantendo qualità ed attenzione ai dettagli.
               Per maggiori informazioni visita la pagina Servizi, disponibile all'indirizzo <a href="https://andreaingrassia.webflow.io/servizi">IT</a> (Italia).</p>
        </div>
        <div class="faq-item">
            <h3>Aggiornamenti del sito<span class="icon">+</span></h3>
            <p>Visita la pagina 'Aggiornamenti', disponibile all'indirizzo <a href="https://andreaingrassia.webflow.io/informazioni/aggiornamenti">IT</a> (Italia), per scoprire tutte le nuove versioni rilasciate dal lancio del sito. Troverai dettagli su ogni aggiornamento e le novità introdotte.</p>
        </div>
        <div class="faq-item">
            <h3>Contatti<span class="icon">+</span></h3>
            <p>Per metterti in contatto, accedi alla pagina 'Contatti' e compila il <a href="https://andreaingrassia.webflow.io/contatti#modulo">modulo contatti</a> oppure invia una <a href="mailto:andrea.ingrassia@zohomail.eu">email.</a>
        </div>
    </div>
    <script>
        document.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    </script>
</body>
</html>
