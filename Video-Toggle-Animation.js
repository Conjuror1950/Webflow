(function () {
  // ID univoci
  const VIDEO_ID   = "video-bg";
  const TOGGLE_ID  = "video-toggle";
  const MUTE_ID    = "mute";
  const FS_ID      = "full-screen";

  // 1) CSS per posizionare e nascondere i controlli
  const style = document.createElement("style");
  style.textContent = `
    #${TOGGLE_ID}, #${MUTE_ID}, #${FS_ID} {
      opacity: 0;
      visibility: hidden;
      transition: opacity 1s ease-in-out;
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 48px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 999;
    }
  `;
  document.head.appendChild(style);

  // 2) (Re)posiziona i tuoi pulsanti ESISTENTI nel body,
  //    o creali dinamicamente qui se preferisci.
  //    In questo esempio assumiamo che ci siano già in HTML.

  // 3) Carica jQuery se serve
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
      // Play/Pause nativo su #video-bg
      function togglePlayPause() {
        const vid = document.getElementById(VIDEO_ID);
        if (!vid) return;
        if (vid.paused) vid.play();
        else           vid.pause();
      }

      // 5) Bind dei click
      $(`#${TOGGLE_ID}`).on("click", function(e) {
        e.stopPropagation();
        togglePlayPause();
      });

      $(`#${MUTE_ID}`).on("click", function(e) {
        e.stopPropagation();
        const vid = document.getElementById(VIDEO_ID);
        if (!vid) return;
        vid.muted = !vid.muted;
      });

      $(`#${FS_ID}`).on("click", function(e) {
        e.stopPropagation();
        const vid = document.getElementById(VIDEO_ID);
        if (!vid) return;
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else if (vid.requestFullscreen) {
          vid.requestFullscreen();
        }
      });

      // 6) Mostra i controlli dopo 10 secondi
      setTimeout(function () {
        $(`#${TOGGLE_ID}, #${MUTE_ID}, #${FS_ID}`).css({
          visibility: "visible",
          opacity: 1
        });
      }, 10000);
    });
  });
})();
