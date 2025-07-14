(function () {

  // Inserisci il CSS nel <head> per evitare flash dell'elemento
  const style = document.createElement("style");
  style.textContent = `
    /* Nasconde l'icona fin dal caricamento della pagina */
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

  // Crea l'elemento per l'icona Play/Pause con stile inline per un nascondimento immediato
  const videoToggle = document.createElement("div");
  videoToggle.id = "video-toggle";
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

// 1) Definisci UNA SOLA volta la funzione togglePlayPause:
function togglePlayPause() {
  const vid = document.getElementById("video-bg");
  if (!vid) return;
  if (vid.paused) vid.play();
  else            vid.pause();
}

// 2) Associala al click sul tuo toggle:
$("#video-toggle").on("click", function(e) {
  e.stopPropagation();   // per sicurezza
  togglePlayPause();
});

// 3) (facoltativo) se hai un mute:
$("#mute").on("click", function(e) {
  e.stopPropagation();
  const vid = document.getElementById("video-bg");
  if (!vid) return;
  vid.muted = !vid.muted;
});

      // Dopo 10 secondi mostra l'icona con un effetto di dissolvenza
      setTimeout(function () {
        $("#video-toggle, #mute, #full-screen").css({
          visibility: "visible",
          opacity: "1",
        });
      }, 10000); // 10 secondi
    });
  });
})();
