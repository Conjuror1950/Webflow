(function () {
  // Imposta il titolo della pagina
  document.title = "Video Toggle con Ritardo";

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
    }
  `;
  document.head.appendChild(style);

  // Crea l'elemento per l'icona Play/Pause con stile inline per un nascondimento immediato
  const videoToggle = document.createElement("div");
  videoToggle.id = "video-toggle";
  videoToggle.setAttribute("style", "opacity: 0; visibility: hidden;");

  // Inserisci il contenuto dell'icona (ad es. un'immagine o SVG)
  const img = document.createElement("img");
  img.src = "play-pause-icon.svg"; // Assicurati che il percorso sia corretto
  img.alt = "Play/Pause Icon";
  videoToggle.appendChild(img);
  document.body.appendChild(videoToggle);

  // Crea l'elemento video con il relativo source
  const video = document.createElement("video");
  video.width = 320;
  video.height = 240;
  video.controls = true;
  const source = document.createElement("source");
  source.src = "movie.mp4"; // Assicurati che il percorso sia corretto
  source.type = "video/mp4";
  video.appendChild(source);
  // Messaggio nel caso il browser non supporti il tag <video>
  video.appendChild(document.createTextNode("Il tuo browser non supporta il tag video."));
  document.body.appendChild(video);

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
      $("#video-toggle").click(togglePlayPause);

      // Dopo 10 secondi mostra l'icona con un effetto di dissolvenza
      setTimeout(function () {
        $("#video-toggle").css({
          visibility: "visible",
          opacity: "1",
        });
      }, 10000); // 10 secondi
    });
  });
})();

