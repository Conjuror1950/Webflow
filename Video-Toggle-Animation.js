(function () {

  // Inserisci il CSS nel <head> per evitare flash dell'elemento
  const style = document.createElement("style");
  style.textContent = `
    /* Nasconde l'icona fin dal caricamento della pagina */
    #video-toggle-bg, #mute-bg, #full-screen-bg {
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
  videoToggle.id = "video-toggle-bg";
  videoToggle.setAttribute("style", "opacity: 0; visibility: hidden;");

  // Inserisci il contenuto dell'icona (ad es. un'immagine o SVG)
  const img = document.createElement("img");
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
      // Funzione per alternare play/pause del video
function togglePlayPause() {
  // prende tutti i <video> tranne quelli con data-no-toggle
  $("video").not("[data-no-toggle]").each(function () {
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
  });
}

      // Associa l'evento click all'icona per gestire play/pause
      $("#video-toggle-bg").click(togglePlayPause); // Solo questa icona gestisce play/pause
$("#mute-bg").click(function (e) {
  e.stopPropagation(); // Evita qualsiasi azione per questa icona
});


      // Dopo 10 secondi mostra l'icona con un effetto di dissolvenza
      setTimeout(function () {
        $("#video-toggle-bg, #mute-bg, #full-screen-bg").css({
          visibility: "visible",
          opacity: "1",
        });
      }, 10000); // 10 secondi
    });
  });
})();
