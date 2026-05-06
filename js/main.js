/* ============================================================
   js/main.js — Orquestador principal
   Seres del Ecuador v1.0

   Orden de inicialización:
   1. i18n  → textos en el idioma correcto
   2. theme → universo activo con colores correctos
   3. scroll → GSAP ScrollTrigger
   4. quiz, gallery, audio → features secundarias
   5. cursor → decorativo, último
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {

  /* ── 1. Idioma ── */
  await i18n.init('es');

  /* ── 2. Tema / universo ── */
  theme.init();

  /* ── 3. Scroll narrativo ── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    scroll.init(); /* scroll.js oculta los drivers no activos y sincroniza con theme */
  } else {
    console.warn('[main] GSAP/ScrollTrigger no disponibles — scroll degradado.');
    document.querySelectorAll('.scroll-driver').forEach(d => d.style.display = 'block');
  }

  /* ── 4. Features de interactividad ── */
  quiz.init();
  gallery.init();
  /* audio: el botón se enlaza en audio.js vía DOMContentLoaded, toggle() maneja el primer clic */

  /* ── 5. Cursor personalizado ── */
  initCursor();

  /* ── 6. Progress bar de scroll ── */
  initProgressBar();

  /* ── 7. Selector de idioma ── */
  initLangSelector();

  /* ── Marcar app como lista ── */
  document.documentElement.classList.add('is-ready');
});

/* ── CURSOR ── */
function initCursor() {
  /* En mobile no hay cursor */
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  /* Ring con lag para efecto fluido */
  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  /* Agrandar cursor sobre elementos interactivos */
  document.querySelectorAll('a, button, [role="button"], .clickable').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
  });
}

/* ── PROGRESS BAR ── */
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const s = document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = Math.round((s / h) * 100) + '%';
  }, { passive: true });
}

/* ── SELECTOR DE IDIOMA ── */
function initLangSelector() {
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      i18n.setLang(btn.dataset.langBtn);
      /* Actualizar estado visual */
      document.querySelectorAll('[data-lang-btn]').forEach(b => {
        b.classList.toggle('is-active', b.dataset.langBtn === i18n.getLang());
      });
    });
  });
}

/* audio.js se autoiinicia en el primer clic del botón #audio-btn — no se necesita listener global */
