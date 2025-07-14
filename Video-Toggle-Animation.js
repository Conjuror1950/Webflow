(function () {
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

  const videoToggle = document.createElement("div");
  videoToggle.id = "video-toggle";
  videoToggle.setAttribute("style", "opacity: 0; visibility: hidden;");
  const img = document.createElement("img");
  videoToggle.appendChild(img);
  document.body.appendChild(videoToggle);

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

      // ✅ DEFINIZIONE CORRETTA
      function togglePlayPause() {
        const vid = document.getElementById("video-bg");
        if (!vid) return;
        if (vid.paused) vid.play();
        else            vid.pause();
      }

      // ✅ GESTIONE CLICK
      $("#video-toggle").on("click", function (e) {
        e.stopPropagation();
        togglePlayPause();
      });

      $("#mute").on("click", function (e) {
        e.stopPropagation();
        const vid = document.getElementById("video-bg");
        if (!vid) return;
        vid.muted = !vid.muted;
      });

      // ✅ MOSTRA ICONA DOPO 10 SECONDI
      setTimeout(function () {
        $("#video-toggle, #mute, #full-screen").css({
          visibility: "visible",
          opacity: "1",
        });
      }, 10000);
    });
  });
})();
