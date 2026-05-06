/* ============================================================
   js/scroll.js — GSAP ScrollTrigger — capítulos por universo
   Seres del Ecuador v1.0
   ============================================================ */

const scroll = (() => {

  const CHAPTER_COUNT = 4;
  let triggers = [];

  /* ── Activar capítulo dentro de un stage ── */
  function activateChapter(stageId, chapterNum) {
    const stage = document.getElementById(stageId);
    if (!stage) return;

    /* Desactivar todos los capítulos del stage */
    stage.querySelectorAll('.chapter').forEach(ch => {
      ch.classList.remove('is-active');
    });

    /* Activar el capítulo correcto */
    const target = stage.querySelector(`[data-chapter="${chapterNum}"]`);
    if (target) target.classList.add('is-active');

    /* Actualizar dots de la nav */
    updateNavDots(chapterNum);

    /* Actualizar label lateral */
    updateChapterLabel(stageId, chapterNum);
  }

  /* ── Actualizar nav dots ── */
  function updateNavDots(chapterNum) {
    document.querySelectorAll('.nav-dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === chapterNum);
    });
  }

  /* ── Actualizar label lateral ── */
  function updateChapterLabel(stageId, chapterNum) {
    const label = document.getElementById('chapter-label');
    if (!label) return;

    const universe = stageId === 'stage-dh' ? 'dh' : 'cu';
    const names = {
      0: i18n.t('nav.chapters.portal'),
      1: i18n.t('nav.chapters.ch1'),
      2: i18n.t('nav.chapters.ch2'),
      3: i18n.t('nav.chapters.ch3'),
      4: i18n.t('nav.chapters.ch4'),
    };

    label.textContent = `${i18n.t(`${universe}.name`)} · ${names[chapterNum] || ''}`;
  }

  /* ── Setup de parallax en un capítulo ── */
  function setupParallax(chapter) {
    const layers = chapter.querySelectorAll('.layer[data-speed]');

    layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.speed) || 0.5;

      gsap.to(layer, {
        y: () => -(window.innerHeight * speed * 0.5),
        ease: 'none',
        scrollTrigger: {
          trigger: chapter.closest('.scroll-driver'),
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      });
    });
  }

  /* ── Crear triggers para un scroll-driver ── */
  function setupDriver(driver) {
    const stageId = driver.dataset.universe === 'dh' ? 'stage-dh' : 'stage-cu';
    const totalScroll = driver.scrollHeight - window.innerHeight;
    const chapterHeight = totalScroll / CHAPTER_COUNT;

    /* Activar capítulos según progreso de scroll */
    ScrollTrigger.create({
      trigger: driver,
      start: 'top top',
      end: 'bottom bottom',
      scrub: false,
      onUpdate: self => {
        const progress = self.progress;
        const chapterIndex = Math.min(
          CHAPTER_COUNT - 1,
          Math.floor(progress * CHAPTER_COUNT)
        ) + 1;

        activateChapter(stageId, chapterIndex);
      },
      onEnter: () => {
        /* Activar primer capítulo al entrar */
        activateChapter(stageId, 1);
      },
      onLeaveBack: () => {
        /* Al salir hacia arriba, desactivar todos */
        const stage = document.getElementById(stageId);
        stage?.querySelectorAll('.chapter').forEach(ch => {
          ch.classList.remove('is-active');
        });
      }
    });

    /* Parallax en todos los capítulos del stage */
    const stage = document.getElementById(stageId);
    stage?.querySelectorAll('.chapter').forEach(chapter => {
      setupParallax(chapter);
    });
  }

  /* ── Init principal ── */
  function init() {
    /* Registrar ScrollTrigger */
    gsap.registerPlugin(ScrollTrigger);

    /* Activar capítulo 1 de DH por defecto */
    activateChapter('stage-dh', 1);

    /* Configurar cada scroll-driver */
    document.querySelectorAll('.scroll-driver').forEach(driver => {
      setupDriver(driver);
    });

    /* Mostrar/ocultar drivers según tema activo */
    syncWithTheme(theme.current);

    document.addEventListener('themechange', e => {
      syncWithTheme(e.detail.theme);
      ScrollTrigger.refresh();
    });
  }

  /* ── Sincronizar visibilidad de drivers con el tema ── */
  function syncWithTheme(themeId) {
    document.querySelectorAll('.scroll-driver').forEach(driver => {
      const isActive = driver.dataset.universe === themeId;
      driver.style.display = isActive ? 'block' : 'none';
    });

    /* Activar primer capítulo del universo seleccionado */
    const stageId = `stage-${themeId}`;
    activateChapter(stageId, 1);

    ScrollTrigger.refresh();
  }

  /* ── Kill triggers al destruir (útil en dev) ── */
  function destroy() {
    triggers.forEach(t => t.kill());
    triggers = [];
  }

  return { init, destroy };
})();
