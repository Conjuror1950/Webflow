/*
  Single-file JS that renders an HTML page with a simple <video>,
  W3Schools-style, plus a button to go Fullscreen + lock Landscape on Android.
  Works when served directly by Netlify/GitHub Pages as a .js file referenced by an HTML loader,
  OR when injected into a page (e.g., Webflow embed).
*/
(() => {
  const init = () => {
    // --- <head> essentials ---
    const metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    document.head.appendChild(metaViewport);

    const metaTheme = document.createElement('meta');
    metaTheme.name = 'theme-color';
    metaTheme.content = '#0b0b0c';
    document.head.appendChild(metaTheme);

    // --- base styles ---
    const style = document.createElement('style');
    style.textContent = `
      :root { --bg: #0b0b0c; --fg: #e8e8ea; --muted: #a6a6ad; --card: #141416; --accent: #4da3ff; }
      html, body { height: 100%; }
      body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; background: var(--bg); color: var(--fg); }
      .page { min-height: 100dvh; display: grid; place-items: start center; padding: 28px 16px 48px; }
      .container { width: min(960px, 100%); }
      header h1 { margin: 0 0 8px; font-size: clamp(22px, 3.5vw, 32px); font-weight: 700; letter-spacing: -0.02em; }
      header p { margin: 0 0 20px; color: var(--muted); line-height: 1.45; }
      .card { background: var(--card); border-radius: 18px; padding: 16px; box-shadow: 0 6px 24px rgba(0,0,0,.3); border: 1px solid rgba(255,255,255,.06); }
      .video-wrap { position: relative; border-radius: 12px; overflow: hidden; background: #000; }
      video { display: block; width: 100%; height: auto; background: #000; outline: none; }
      .controls { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
      .controls button { appearance: none; border: 0; border-radius: 999px; padding: 10px 14px; font-weight: 600; background: #1a1b1e; color: var(--fg); cursor: pointer; transition: transform .08s ease, background .2s ease; border: 1px solid rgba(255,255,255,.08); }
      .controls button:hover { transform: translateY(-1px); }
      .controls button:active { transform: translateY(0); }
      .controls button.primary { background: var(--accent); color: #0b0b0c; border-color: transparent; }
      .note { margin-top: 10px; font-size: 13px; color: var(--muted); }
      .hint { font-size: 12px; color: var(--muted); margin-top: 14px; }
      .footer { margin-top: 22px; font-size: 12px; color: var(--muted); }
      .kbd { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; background: #1a1b1e; border: 1px solid rgba(255,255,255,.12); padding: 2px 6px; border-radius: 6px; }
    `;
    document.head.appendChild(style);

    // --- DOM ---
    const root = document.createElement('div');
    root.className = 'page';
    root.innerHTML = `
      <div class="container">
        <header>
          <h1>Video HTML5 semplicissimo</h1>
          <p>Ispirato all'esempio di W3Schools: un <code>&lt;video&gt;</code> con controlli, sorgente MP4 di esempio, e un tasto per entrare in fullscreen e bloccare il landscape su Android.</p>
        </header>

        <section class="card">
          <div class="video-wrap" id="videoWrap">
            <video id="demoVideo" controls playsinline preload="metadata" poster="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.jpg">
              <!-- Sostituisci l'SRC con il tuo file su GitHub/Netlify se vuoi -->
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Il tuo browser non supporta il tag video. Puoi <a href="https://www.w3schools.com/html/mov_bbb.mp4">scaricare il file</a>.
            </video>
          </div>

          <div class="controls">
            <button id="playPauseBtn" class="primary">Play</button>
            <button id="muteBtn">Mute</button>
            <button id="fsBtn">Fullscreen + Landscape</button>
          </div>

          <div class="note">Suggerimento: su Android Chrome, il blocco dell'orientamento funziona al meglio quando il video è in fullscreen.</div>
          <div class="hint">Sostituisci l'URL MP4 con il tuo file hostato su Netlify per test reali.</div>
        </section>

        <div class="footer">© Demo minimal — pronto per essere usato come file singolo .js</div>
      </div>
    `;

    document.body.appendChild(root);

    // --- JS behavior ---
    const video = document.getElementById('demoVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const fsBtn = document.getElementById('fsBtn');
    const videoWrap = document.getElementById('videoWrap');

    const isFullscreen = () => document.fullscreenElement != null || document.webkitFullscreenElement != null;

    const requestFS = async (el) => {
      if (el.requestFullscreen) return el.requestFullscreen();
      if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
      if (el.msRequestFullscreen) return el.msRequestFullscreen();
    };

    const exitFS = async () => {
      if (document.exitFullscreen) return document.exitFullscreen();
      if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
      if (document.msExitFullscreen) return document.msExitFullscreen();
    };

    async function lockLandscape() {
      if (!('orientation' in screen) || !screen.orientation.lock) return;
      try {
        await screen.orientation.lock('landscape');
      } catch (err) {
        // Molti browser richiedono l'FS prima del lock o possono rifiutare.
        console.warn('Orientation lock non riuscito:', err?.message || err);
      }
    }

    async function goFullscreenLandscape() {
      try {
        await requestFS(videoWrap);
        await lockLandscape();
      } catch (e) {
        console.warn('Impossibile entrare in fullscreen:', e?.message || e);
      }
    }

    // Re-prova il lock quando cambia lo stato del fullscreen
    ['fullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'].forEach(ev => {
      document.addEventListener(ev, () => {
        if (isFullscreen()) {
          lockLandscape();
        }
      });
    });

    // UI handlers
    const syncPlayState = () => {
      playPauseBtn.textContent = video.paused ? 'Play' : 'Pause';
    };
    const syncMuteState = () => {
      muteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
    };

    playPauseBtn.addEventListener('click', () => {
      if (video.paused) video.play(); else video.pause();
    });
    muteBtn.addEventListener('click', () => { video.muted = !video.muted; syncMuteState(); });
    fsBtn.addEventListener('click', goFullscreenLandscape);

    video.addEventListener('play', syncPlayState);
    video.addEventListener('pause', syncPlayState);
    video.addEventListener('volumechange', syncMuteState);

    // Initial labels
    syncPlayState();
    syncMuteState();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
