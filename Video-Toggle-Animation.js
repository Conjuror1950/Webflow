(function () {
  // IDENTIFICATIVI UNIVOCI
  const VIDEO_ID      = "bg-video";
  const TOGGLE_ID     = "video-toggle-background";
  const MUTE_ID       = "mute-background";
  const FULLSCR_ID    = "full-screen-background";

  // 1) CSS per nascondere/mostrare i controlli e posizionarli
  const style = document.createElement("style");
  style.textContent = `
    /* controlli background */
    #${TOGGLE_ID}, #${MUTE_ID}, #${FULLSCR_ID} {
      opacity: 0;
      visibility: hidden;
      transition: opacity 1s ease-in-out;
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 64px;  /* adatta a tuo gusto */
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 999;
    }
  `;
  document.head.appendChild(style);

  // 2) Creazione del div toggle
  const videoToggle = document.createElement("div");
  videoToggle.id = TOGGLE_ID;
  // qui puoi mettere la tua icona SVG o <img src=...>
  videoToggle.innerHTML = `<img src="URL_TUA_ICONA_PLAY.png" alt="Play/Pause" style="width:100%;height:100%;">`;
  document.body.appendChild(videoToggle);

  // (eventuali altri controlli: mute, fullscreen...)
  // ...

  // 3) Attendi jQuery se serve (puoi anche rimuovere jQuery del tutto)
  function onJQueryReady(cb) {
    if (window.jQuery) return cb();
    const s = document.createElement("script");
    s.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    s.onload = cb;
    document.head.appendChild(s);
  }

  onJQueryReady(function () {
    // 4) DOM pronto
    $(function () {
      // PLAY/PAUSE nativo
      function togglePlayPause() {
        const vid = document.getElementById(VIDEO_ID);
        if (!vid) return;
        if (vid.paused) vid.play();
        else          vid.pause();
      }

      // click sul toggle bg-video
      $(`#${TOGGLE_ID}`).on("click", function(e) {
        e.stopPropagation();   // per sicurezza
        togglePlayPause();
      });

      // MUTE (se serve)
      $(`#${MUTE_ID}`).on("click", function(e) {
        e.stopPropagation();
        const vid = document.getElementById(VIDEO_ID);
        if (!vid) return;
        vid.muted = !vid.muted;
      });

      // FULLSCREEN (se serve)
      $(`#${FULLSCR_ID}`).on("click", function(e) {
        e.stopPropagation();
        const vid = document.getElementById(VIDEO_ID);
        if (!vid) return;
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          vid.requestFullscreen?.();
        }
      });

      // Mostra i controlli dopo 10s
      setTimeout(() => {
        $(`#${TOGGLE_ID}, #${MUTE_ID}, #${FULLSCR_ID}`)
          .css({ visibility: "visible", opacity: 1 });
      }, 10000);
    });
  });
})();
