/* ============================================================
   js/theme.js — Lógica del toggle de universo DH / CU
   Seres del Ecuador v1.0
   ============================================================ */

const theme = (() => {
  const ROOT        = document.documentElement;
  const STORAGE_KEY = 'seres-theme';
  const DEFAULT     = 'dh';

  let current = DEFAULT;
  let isTransitioning = false;

  /* ── Leer tema guardado o detectar por idioma del navegador ── */
  function getInitialTheme() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT;
  }

  /* ── Aplicar tema al DOM ── */
  function apply(themeId, animate = true) {
    if (themeId === current && ROOT.dataset.theme) return;
    if (isTransitioning && animate) return;

    isTransitioning = animate;

    /* 1. Cambiar atributo en <html> — CSS hace el resto */
    ROOT.dataset.theme = themeId;
    current = themeId;

    /* 2. Guardar preferencia */
    localStorage.setItem(STORAGE_KEY, themeId);

    /* 3. Actualizar estado del toggle en la nav */
    updateToggleUI(themeId);

    /* 4. Notificar a otros módulos */
    document.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: themeId }
    }));

    /* 5. Resetear scroll al inicio del universo activo */
    if (animate) {
      scrollToUniverse(themeId);
    }

    /* Fin de transición */
    setTimeout(() => { isTransitioning = false; }, 900);
  }

  /* ── Actualizar visual del toggle pill ── */
  function updateToggleUI(themeId) {
    const btnDH = document.getElementById('toggle-dh');
    const btnCU = document.getElementById('toggle-cu');
    if (!btnDH || !btnCU) return;

    btnDH.classList.toggle('is-active', themeId === 'dh');
    btnCU.classList.toggle('is-active', themeId === 'cu');

    btnDH.setAttribute('aria-pressed', themeId === 'dh');
    btnCU.setAttribute('aria-pressed', themeId === 'cu');
  }

  /* ── Scroll suave al inicio del universo seleccionado ── */
  function scrollToUniverse(themeId) {
    const target = document.querySelector(`.scroll-driver[data-universe="${themeId}"]`);
    if (!target) return;
    const navHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
    ) || 64;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  /* ── Toggle: si está en DH cambia a CU y viceversa ── */
  function toggle() {
    apply(current === 'dh' ? 'cu' : 'dh');
  }

  /* ── Init: configurar listeners del DOM ── */
  function init() {
    /* Aplicar tema inicial sin animación */
    apply(getInitialTheme(), false);

    /* Botones del toggle pill */
    document.getElementById('toggle-dh')?.addEventListener('click', () => apply('dh'));
    document.getElementById('toggle-cu')?.addEventListener('click', () => apply('cu'));

    /* Teclado: T para toggle */
    document.addEventListener('keydown', e => {
      if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) toggle();
    });
  }

  /* API pública */
  return { init, apply, toggle, get current() { return current; } };
})();
