/* ============================================================
   js/i18n.js — Sistema de internacionalización ES / EN
   Seres del Ecuador v1.0

   Uso:
     i18n.init('es')              → inicializa con idioma
     i18n.t('nav.toggle.dh')     → devuelve string traducido
     i18n.setLang('en')          → cambia idioma y actualiza DOM
   ============================================================ */

const i18n = (() => {
  let currentLang = 'es';
  let translations = {};

  /* Carga el archivo JSON del idioma */
  async function loadLocale(lang) {
    try {
      const res = await fetch(`./locales/${lang}.json`);
      if (!res.ok) throw new Error(`No se pudo cargar locales/${lang}.json`);
      return await res.json();
    } catch (err) {
      console.error('[i18n]', err);
      return {};
    }
  }

  /* Navega un objeto anidado con una clave de puntos */
  function resolve(obj, key) {
    return key.split('.').reduce((acc, k) => acc?.[k], obj) ?? `[${key}]`;
  }

  /* Actualiza todos los elementos con data-i18n en el DOM */
  function updateDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const value = resolve(translations, key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    });

    /* Atributos como aria-label, title, alt */
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const pairs = el.dataset.i18nAttr.split(','); /* ej: "aria-label:nav.close,title:nav.close" */
      pairs.forEach(pair => {
        const [attr, key] = pair.trim().split(':');
        el.setAttribute(attr, resolve(translations, key));
      });
    });

    /* Actualizar lang en <html> */
    document.documentElement.lang = currentLang;
  }

  /* API pública */
  return {
    async init(lang = 'es') {
      /* Leer preferencia guardada */
      const saved = localStorage.getItem('seres-lang');
      currentLang = saved || lang;
      translations = await loadLocale(currentLang);
      updateDOM();
    },

    t(key) {
      return resolve(translations, key);
    },

    async setLang(lang) {
      if (lang === currentLang) return;
      currentLang = lang;
      localStorage.setItem('seres-lang', lang);
      translations = await loadLocale(lang);
      updateDOM();

      /* Disparar evento para que otros módulos reaccionen */
      document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    },

    getLang() {
      return currentLang;
    }
  };
})();
