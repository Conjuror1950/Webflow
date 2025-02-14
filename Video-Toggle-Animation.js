(function () {

  // Inserisci il CSS nel <head> per evitare flash dell'elemento
  const style = document.createElement("style");
  style.textContent = `
    /* Nasconde l'icona fin dal caricamento della pagina */
    #video-toggle {
      opacity: 0;
      visibility: hidden;
      transition: opacity 1s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed; /* Posizionamento fisso, ad esempio in basso a destra */
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }
  `;
  document.head.appendChild(style);

  // Crea l'elemento per l'icona Play/Pause con stile inline per un nascondimento immediato
  const videoToggle = document.createElement("div");
  videoToggle.id = "video-toggle";
  videoToggle.setAttribute("style", "opacity: 0; visibility: hidden;");

  // Inserisci il contenuto dell'icona
  const img = document.createElement("img");
  // Imposta inizialmente l'icona di play (assumendo che il video sia in pausa al caricamento)
  img.src = "play-icon.svg"; // Assicurati che il percorso sia corretto
  img.alt = "Play Icon";
  videoToggle.appendChild(img);
  document.body.appendChild(videoToggle);

  // Funzione per assicurarsi che jQuery sia caricato; se non lo è, lo carica dinamicamente
  function onJQueryReady(callback) {
    if (window.jQuery) {
      callback();
    } else {
      const script = document.createElement("script");
      script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
      script.onload = callback;
      document.head.appendChild(script);
    }
  }

  onJQueryReady(function () {
    // Quando il DOM è pronto esegue il codice
    $(document).ready(function () {

      // Funzione per aggiornare l'icona in base allo stato del video
      function updateIcon() {
        // Prendi il primo video trovato; se hai più video, potresti dover adattare il codice
        const video = $("video").get(0);
        if (video) {
          if (video.paused) {
            img.src = "play-icon.svg";
            img.alt = "Play Icon";
          } else {
            img.src = "pause-icon.svg";
            img.alt = "Pause Icon";
          }
        }
      }

      // Aggiunge event listener per gli eventi 'play' e 'pause' su tutti gli elementi video
      $("video").on("play pause", updateIcon);

      // Funzione per alternare play/pause del video
      function togglePlayPause() {
        $("video").each(function () {
          if (this.paused) {
            this.play();
          } else {
            this.pause();
          }
        });
      }

      // Associa l'evento click all'icona per gestire play/pause
      $("#video-toggle").click(function() {
        togglePlayPause();
      });

      // Dopo 10 secondi mostra l'icona con un effetto di dissolvenza
      setTimeout(function () {
        $("#video-toggle").css({
          visibility: "visible",
          opacity: "1",
        });
      }, 10000); // 10 secondi

      // (Opzionale) Aggiorna subito l'icona in base allo stato iniziale del video
      updateIcon();
    });
  });
})();
