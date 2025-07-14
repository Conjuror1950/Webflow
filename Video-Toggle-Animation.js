(function () {

  // Inserisci il CSS nel <head> per evitare flash dell'elemento
  const style = document.createElement("style");
  style.textContent = `
    #video-toggle, #mute, #full-screen {
      opacity: 0;
      visibility: hidden;
      transition: opacity 1s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
  document.head.appendChild(style);

  // Crea l'elemento per l'icona Play/Pause
  const videoToggle = document.createElement("div");
  videoToggle.id = "video-toggle";
  videoToggle.setAttribute("style", "opacity: 0; visibility: hidden;");

  const img = document.createElement("img");
  img.src = "path/to/playpause.svg"; // <-- aggiungi il tuo path immagine
  img.alt = "Play/Pause";
  videoToggle.appendChild(img);
  document.body.appendChild(videoToggle);

  // Carica jQuery se non esiste
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
    $(document).ready(function () {
      // Funzione aggiornata per controllare solo #video-bg
      function togglePlayPause() {
        const video = document.getElementById("video-bg");
        if (!video) return;

        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }

      // Click sull'icona: play/pause solo per #video-bg
      $("#video-toggle").click(togglePlayPause);

      // Previeni conflitti sul mute
      $("#mute").click(function (e) {
        e.stopPropagation();
      });

      // Mostra le icone dopo 10 secondi
      setTimeout(function () {
        $("#video-toggle, #mute, #full-screen").css({
          visibility: "visible",
          opacity: "1",
        });
      }, 10000);
    });
  });
})();
