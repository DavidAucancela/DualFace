/* ============================================================
   js/audio.js — Audio ambiental con Tone.js
   Seres del Ecuador v1.0

   RN-02: El audio NUNCA inicia automáticamente.
          Se activa solo tras la primera interacción del usuario.
          El sitio funciona al 100% sin audio.
   ============================================================ */

const audio = (() => {

  let hasStarted  = false;
  let isPlaying   = false;
  let currentLoop = null;
  let player      = null;
  let gainNode    = null;
  const FADE_TIME = 2; /* segundos de fade in/out */

  const TRACKS = {
    dh: 'assets/audio/dh-ambient.mp3', /* bombo, pingullo, naturaleza andina */
    cu: 'assets/audio/cu-ambient.mp3', /* campanas, silencio, canto gregoriano */
  };

  /* ── Verificar que Tone.js está disponible ── */
  function toneAvailable() {
    return typeof Tone !== 'undefined';
  }

  /* ── Init — llamado solo tras primer clic del usuario ── */
  async function init() {
    if (hasStarted) return;
    if (!toneAvailable()) {
      console.warn('[audio] Tone.js no disponible. Sin audio ambiental.');
      return;
    }

    hasStarted = true;

    /* Iniciar contexto de audio (requiere gesto del usuario) */
    await Tone.start();

    /* Nodo de ganancia para fade in/out */
    gainNode = new Tone.Gain(0).toDestination();

    /* Cargar track del universo activo */
    await loadTrack(theme.current);

    /* Escuchar cambios de tema para crossfade */
    document.addEventListener('themechange', async e => {
      await crossfadeTo(e.detail.theme);
    });

    /* Actualizar botón de audio */
    updateAudioBtn(false);
  }

  /* ── Cargar y reproducir un track ── */
  async function loadTrack(themeId) {
    const src = TRACKS[themeId];

    /* Detener el player anterior si existe */
    if (player) {
      player.stop();
      player.dispose();
      player = null;
    }

    /* Verificar que el archivo existe antes de cargar */
    try {
      player = new Tone.Player({
        url: src,
        loop: true,
        autostart: false,
        fadeIn: FADE_TIME,
        fadeOut: FADE_TIME,
        onload: () => {
          if (isPlaying) {
            player.connect(gainNode);
            player.start();
            gainNode.gain.rampTo(1, FADE_TIME);
          }
        },
        onerror: () => {
          console.warn(`[audio] No se pudo cargar: ${src}`);
        }
      });
    } catch (err) {
      console.warn('[audio] Error al crear player:', err);
    }
  }

  /* ── Crossfade entre universos ── */
  async function crossfadeTo(themeId) {
    if (!hasStarted || !toneAvailable()) return;

    /* Fade out del audio actual */
    if (gainNode && isPlaying) {
      gainNode.gain.rampTo(0, FADE_TIME);
      await new Promise(r => setTimeout(r, FADE_TIME * 1000));
    }

    /* Cargar nuevo track */
    await loadTrack(themeId);

    /* Fade in si estaba reproduciendo */
    if (isPlaying && player) {
      gainNode.gain.rampTo(1, FADE_TIME);
    }
  }

  /* ── Play / Pause ── */
  function toggle() {
    if (!hasStarted) {
      /* Primera interacción — iniciar todo */
      init().then(() => {
        play();
      });
      return;
    }

    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function play() {
    if (!player || !gainNode) return;
    isPlaying = true;
    player.start();
    gainNode.gain.rampTo(1, FADE_TIME);
    updateAudioBtn(true);
  }

  function pause() {
    if (!player || !gainNode) return;
    isPlaying = false;
    gainNode.gain.rampTo(0, FADE_TIME);
    setTimeout(() => player?.stop(), FADE_TIME * 1000);
    updateAudioBtn(false);
  }

  /* ── Actualizar UI del botón ── */
  function updateAudioBtn(playing) {
    const btn = document.getElementById('audio-btn');
    if (!btn) return;

    btn.classList.toggle('is-active', playing);
    btn.setAttribute(
      'aria-label',
      playing ? i18n.t('nav.audio.on') : i18n.t('nav.audio.off')
    );
    btn.title = btn.getAttribute('aria-label');
  }

  /* ── Listeners del botón en el DOM ── */
  function bindBtn() {
    document.getElementById('audio-btn')?.addEventListener('click', toggle);
  }

  return {
    init,
    toggle,
    play,
    pause,
    bindBtn,
    get hasStarted() { return hasStarted; }
  };
})();

/* Bind del botón cuando el DOM está listo */
document.addEventListener('DOMContentLoaded', () => audio.bindBtn());
