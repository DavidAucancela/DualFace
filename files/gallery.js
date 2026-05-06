/* ============================================================
   js/gallery.js — Galería fotográfica con lightbox
   Seres del Ecuador v1.0
   ============================================================ */

const gallery = (() => {

  /* Datos de la galería — se reemplazarán con fotos reales */
  /* Estructura: { src, thumb, alt, credit, universe: 'dh'|'cu' } */
  const ITEMS = [
    /* Placeholder hasta tener fotos con derechos */
    /* { src: 'assets/images/dh/danza-01.jpg', thumb: 'assets/images/dh/danza-01-thumb.jpg', alt: 'Danzante del Inti Raymi en Otavalo', credit: 'Fotógrafo pendiente', universe: 'dh' }, */
  ];

  let currentIndex = 0;
  let filtered     = [];
  let lightbox, lbImg, lbCaption;

  /* ── Filtrar por universo activo ── */
  function filterByTheme(themeId) {
    filtered = ITEMS.filter(item => item.universe === themeId || !item.universe);
  }

  /* ── Render del grid ── */
  function renderGrid(themeId) {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    filterByTheme(themeId);

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="gallery-placeholder" role="status">
          <span class="text-label color-dim">Fotografías · próximamente</span>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((item, i) => `
      <div class="gallery-item" data-index="${i}" role="button" tabindex="0"
           aria-label="${item.alt}">
        <img src="${item.thumb || item.src}" alt="${item.alt}" loading="lazy">
        <div class="gallery-item-overlay">
          <span class="gallery-item-caption text-label">${item.credit}</span>
        </div>
      </div>
    `).join('');

    /* Listeners */
    grid.querySelectorAll('.gallery-item').forEach(el => {
      el.addEventListener('click', () => openLightbox(parseInt(el.dataset.index)));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(parseInt(el.dataset.index));
        }
      });
    });
  }

  /* ── Lightbox ── */
  function openLightbox(index) {
    if (!filtered[index]) return;
    currentIndex = index;

    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    updateLightboxContent();

    /* Focus trap */
    document.getElementById('lightbox-close')?.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = filtered[currentIndex];
    if (!item || !lbImg) return;
    lbImg.src = item.src;
    lbImg.alt = item.alt;
    if (lbCaption) {
      lbCaption.textContent = `${i18n.t('gallery.credit')} ${item.credit}`;
    }
  }

  function prev() {
    currentIndex = (currentIndex - 1 + filtered.length) % filtered.length;
    updateLightboxContent();
  }

  function next() {
    currentIndex = (currentIndex + 1) % filtered.length;
    updateLightboxContent();
  }

  /* ── Init ── */
  function init() {
    lightbox  = document.getElementById('lightbox');
    lbImg     = document.getElementById('lightbox-img');
    lbCaption = document.getElementById('lightbox-caption');

    if (!lightbox) return;

    /* Botones lightbox */
    document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev')?.addEventListener('click', prev);
    document.getElementById('lightbox-next')?.addEventListener('click', next);

    /* Teclado */
    document.addEventListener('keydown', e => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    });

    /* Clic fuera del contenido */
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });

    /* Render inicial con tema activo */
    renderGrid(theme.current);

    /* Actualizar al cambiar de tema */
    document.addEventListener('themechange', e => renderGrid(e.detail.theme));
  }

  return { init, renderGrid };
})();
