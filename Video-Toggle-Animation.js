(function () {
  // Inserisci il CSS nel <head>
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

  // Crea l'elemento dell'icona
  const videoToggle = document.createElement("div");
  videoToggle.id = "video-toggle";
  videoToggle.setAttribute("style", "opacity: 0; visibility: hidden;");
  const img = document.createElement("img");
  videoToggle.appendChild(img);
  document.body.appendChild(videoToggle);

  // Funzione per caricare jQuery se necessario
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

  // ✅ Funzione per aspettare l'esistenza dell'elemento nel DOM
  function waitForElement(selector, callback) {
    const el = document.querySelector(selector);
    if (el) {
      callback(el);
    } else {
      const observer = new MutationObserver(() => {
        const el = document.querySelector(selector);
        if (el) {
          observer.disconnect();
          callback(el);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  onJQueryReady(function () {
    $(document).ready(function () {
      // ✅ Aspetta che il video con id "video-bg" sia nel DOM
      waitForElement("#video-bg", function (video) {
        // Funzione play/pause
        function togglePlayPause() {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }

        // Assegna l'evento click solo dopo che il video esiste
        $("#video-toggle").click(togglePlayPause);

        // Icona mute (non fa nulla, evita propagazione)
        $("#mute").click(function (e) {
          e.stopPropagation();
        });

        // Dopo 10 secondi, mostra le icone
        setTimeout(function () {
          $("#video-toggle, #mute, #full-screen").css({
            visibility: "visible",
            opacity: "1",
          });
        }, 10000); // 10 secondi
      });
    });
  });
})();
