/* ============================================================
   js/gallery.js — Galería fotográfica con lightbox
   Seres del Ecuador v1.0
   ============================================================ */

const gallery = (() => {

  const ITEMS = [
    /* ── Diablo Huma ── */
    { src: 'assets/images/dh/dh-cuerpo-completo.png',  alt: 'Diablo Huma, traje completo con los doce cuernos',         credit: 'Archivo Cultural',        universe: 'dh' },
    { src: 'assets/images/dh/dh-mascara-01.jpg',       alt: 'Máscara del Diablo Huma — detalle frontal',                credit: 'Archivo Cultural',        universe: 'dh' },
    { src: 'assets/images/dh/dh-mascara-02.png',       alt: 'Máscara del Diablo Huma — dos rostros, chakana andina',    credit: 'Archivo Cultural',        universe: 'dh' },
    { src: 'assets/images/dh/dh-bailando-01.jpg',      alt: 'Diablo Huma danzando en el Inti Raymi',                    credit: 'Archivo Cultural',        universe: 'dh' },
    { src: 'assets/images/dh/dh-bailando-02.jpg',      alt: 'Danza del Diablo Huma durante el solsticio de junio',      credit: 'Archivo Cultural',        universe: 'dh' },
    { src: 'assets/images/dh/dh-desfile-01.jpeg',      alt: 'Diablo Huma en procesión del Inti Raymi',                  credit: 'Archivo Cultural',        universe: 'dh' },
    { src: 'assets/images/dh/dh-grupo-mascara.jpeg',   alt: 'Grupo de danzantes con máscara del Diablo Huma',           credit: 'Archivo Cultural',        universe: 'dh' },
    { src: 'assets/images/dh/dh-animado-01.jpg',       alt: 'Ilustración del Diablo Huma — representación artística',   credit: 'Archivo Cultural',        universe: 'dh' },
    { src: 'assets/images/dh/dh-animado-02.jpg',       alt: 'Ilustración del Diablo Huma — versión contemporánea',      credit: 'Archivo Cultural',        universe: 'dh' },
    { src: 'assets/images/dh/dh-mascara-moderna.jpeg', alt: 'La máscara del Diablo Huma trasciende culturas y épocas',  credit: 'Archivo Cultural',        universe: 'dh' },

    /* ── Cucurucho ── */
    { src: 'assets/images/cu/cu-cuerpo-completo.png',  alt: 'Cucurucho de cuerpo completo — hábito blanco y capuchón',  credit: 'Archivo Cultural',        universe: 'cu' },
    { src: 'assets/images/cu/cu-principal.jpeg',       alt: 'Cucurucho en primer plano — identidad oculta bajo la fe',  credit: 'Archivo Cultural',        universe: 'cu' },
    { src: 'assets/images/cu/cu-retrato-01.jpeg',      alt: 'Retrato del Cucurucho en Semana Santa',                    credit: 'Archivo Cultural',        universe: 'cu' },
    { src: 'assets/images/cu/cu-retrato-02.jpg',       alt: 'El Cucurucho — anonimato como acto de fe',                 credit: 'Archivo Cultural',        universe: 'cu' },
    { src: 'assets/images/cu/cu-desfile-01.jpeg',      alt: 'Procesión del Viernes Santo en el Centro Histórico',       credit: 'Archivo Cultural',        universe: 'cu' },
    { src: 'assets/images/cu/cu-desfile-quito.jpg',    alt: 'Cucuruchos en desfile por las calles de Quito',            credit: 'Archivo Cultural',        universe: 'cu' },
    { src: 'assets/images/cu/cu-desfile-02.webp',      alt: 'Multitud de cucuruchos en la procesión anual',             credit: 'Archivo Cultural',        universe: 'cu' },
    { src: 'assets/images/cu/cu-desfile-03.webp',      alt: 'Cucuruchos cargando la cruz en Semana Santa',              credit: 'Archivo Cultural',        universe: 'cu' },
    { src: 'assets/images/cu/cu-grupo.jpg',            alt: 'Grupo de cucuruchos reunidos en el Centro Histórico',      credit: 'Archivo Cultural',        universe: 'cu' },
    { src: 'assets/images/cu/cu-pase.jpg',             alt: 'El pase procesional del Cucurucho',                        credit: 'Archivo Cultural',        universe: 'cu' },
    { src: 'assets/images/cu/cu-antiguo.webp',         alt: 'Cucuruchos en fotografía histórica de Quito',              credit: 'Archivo Histórico',       universe: 'cu' },
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
