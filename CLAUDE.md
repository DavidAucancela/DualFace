# Seres del Ecuador — CLAUDE.md
> Contexto completo del proyecto para Claude Code. Leer antes de cualquier tarea.

---

## ¿Qué es este proyecto?

Plataforma web inmersiva de preservación cultural que narra la historia del **Diablo Huma** y el **Cucurucho** — dos íconos del patrimonio ecuatoriano. Inspirado en _Persepolis Reimagined_ del Getty Museum.

**Producto entregable para cliente institucional.** No es un experimento — tiene estándares de producto profesional.

---

## Stack técnico

```
HTML5 + CSS3 + JavaScript vanilla
GSAP + ScrollTrigger   → animaciones de scroll narrativo
Tone.js                → audio ambiental por universo
Google Fonts           → Cinzel + Cormorant Garamond
Vercel                 → deploy (sin backend en v1)
```

**Sin frameworks. Sin bundler. Sin npm en v1.** Todo se carga por CDN o localmente.

---

## Estructura de archivos

```
seres-ecuador/
├── CLAUDE.md               ← estás aquí
├── index.html              ← entrada única, todo vive aquí
├── assets/
│   ├── images/
│   │   ├── dh/             ← fotos e ilustraciones Diablo Huma
│   │   └── cu/             ← fotos e ilustraciones Cucurucho
│   ├── audio/
│   │   ├── dh-ambient.mp3  ← percusión andina, bombo, naturaleza
│   │   └── cu-ambient.mp3  ← campanas, silencio, canto gregoriano
│   └── fonts/              ← solo si se descarga localmente
├── css/
│   ├── base.css            ← reset, variables globales, tipografía
│   ├── themes.css          ← variables de tema DH y CU (el corazón del sistema dual)
│   ├── components.css      ← nav, toggle, quiz, galería, lightbox
│   └── scroll.css          ← parallax, sticky stage, capítulos
├── js/
│   ├── main.js             ← init, eventos globales, orquestador
│   ├── theme.js            ← lógica del toggle de universo
│   ├── scroll.js           ← GSAP ScrollTrigger setup
│   ├── quiz.js             ← lógica del quiz de identidad
│   ├── gallery.js          ← lightbox de galería
│   ├── audio.js            ← Tone.js audio ambiental
│   └── i18n.js             ← sistema de traducciones ES/EN
├── locales/
│   ├── es.json             ← todos los textos en español
│   └── en.json             ← todos los textos en inglés
└── .claude/
    ├── commands/           ← comandos slash personalizados
    └── memory.md           ← decisiones tomadas y contexto acumulado
```

---

## Arquitectura del sistema dual (LO MÁS IMPORTANTE)

El sitio tiene **dos universos** que comparten el mismo HTML. El cambio entre ellos se hace con un atributo en `<html>`:

```html
<!-- Diablo Huma activo -->
<html data-theme="dh" lang="es">

<!-- Cucurucho activo -->
<html data-theme="cu" lang="es">
```

**Todo el diseño reacciona a ese atributo via CSS:**

```css
/* themes.css */
[data-theme="dh"] {
  --bg-primary:   #0b1a0b;
  --bg-secondary: #071207;
  --accent:       #c44d00;
  --accent-warm:  #f03a00;
  --gold:         #e8a020;
  --text:         #f5f0e8;
  --text-dim:     rgba(245, 240, 232, 0.6);
  --glow:         rgba(196, 77, 0, 0.3);
  --border:       rgba(196, 77, 0, 0.2);
}

[data-theme="cu"] {
  --bg-primary:   #120820;
  --bg-secondary: #0a0518;
  --accent:       #7a0020;
  --accent-warm:  #a01030;
  --gold:         #c89a40;
  --text:         #f5f0e8;
  --text-dim:     rgba(245, 240, 232, 0.6);
  --glow:         rgba(200, 154, 64, 0.25);
  --border:       rgba(122, 0, 32, 0.25);
}
```

**Regla absoluta:** Ningún color puede estar hardcodeado fuera de `themes.css`. Todo usa `var(--variable)`.

---

## Mecánica de scroll (Persepolis)

```html
<!-- Estructura base de cada universo -->
<div class="scroll-driver" data-universe="dh">   <!-- height: 600vh mínimo -->
  <div class="stage">                             <!-- position: sticky; height: 100vh -->
    <section class="chapter" id="dh-ch1">...</section>
    <section class="chapter" id="dh-ch2">...</section>
    <section class="chapter" id="dh-ch3">...</section>
    <section class="chapter" id="dh-ch4">...</section>
  </div>
</div>
```

- El `scroll-driver` captura el scroll
- El `stage` es sticky — el viewport no se mueve, cambian las escenas
- GSAP ScrollTrigger activa cada `.chapter` en su rango de scroll
- Parallax: mínimo 3 capas por capítulo (`.layer-bg`, `.layer-mid`, `.layer-fg`)

---

## Contenido narrativo — estructura de capítulos

### Diablo Huma (4 capítulos)
| ID | Título | Core temático |
|---|---|---|
| `dh-ch1` | El Origen | Significado kichwa, cosmovisión andina, Taita Inti |
| `dh-ch2` | El Inti Raymi | Danza de 4 días, chicote, ofrenda, junio-solsticio |
| `dh-ch3` | La Máscara | 12 cuernos = 12 meses, 2 caras = dualidad, colores |
| `dh-ch4` | Hoy | Imbabura, Pichincha, Cotopaxi. Revitalización cultural |

### Cucurucho (4 capítulos)
| ID | Título | Core temático |
|---|---|---|
| `cu-ch1` | El Origen | 1534, franciscanos, hábito, tradición de penitencia |
| `cu-ch2` | Semana Santa | Jesús del Gran Poder, Viernes Santo, Centro Histórico |
| `cu-ch3` | El Anonimato | Voto personal, igualdad ante la fe, silencio |
| `cu-ch4` | Hoy | Quito Patrimonio UNESCO, tradición viva vs turismo |

---

## Reglas de negocio críticas

### RN-01 — Rigor cultural (NO NEGOCIABLE)
- El Diablo Huma **nunca** se describe como "demonio" sin contexto. Siempre con su significado kichwa correcto.
- Toda afirmación histórica tiene fuente. Si no hay fuente, no va.
- Los nombres en kichwa se mantienen sin traducir en inglés: Inti Raymi, Pachamama, Hanan Pacha, Taita Inti.

### RN-02 — Audio siempre opt-in
- El audio **jamás** inicia automáticamente.
- El sitio funciona al 100% sin audio.

### RN-03 — Sin colores hardcodeados
- Todo color usa variables CSS de `themes.css`.
- Excepción permitida: colores físicos en SVGs ilustrativos (no invertibles en dark mode).

### RN-04 — Escalabilidad del toggle
- El sistema de temas debe soportar un tercer ser cultural en el futuro.
- No usar `if theme === 'dh' / else` — usar atributos y CSS selectores.

### RN-05 — i18n desde el inicio
- Ningún texto visible va hardcodeado en HTML. Todo a través de `i18n.js` + `locales/`.
- Estructura de clave: `seccion.componente.elemento` — ej: `nav.toggle.dh`, `quiz.result.cu`.

---

## Paleta de tipografía

| Uso | Fuente | Peso | Tamaño |
|---|---|---|---|
| Títulos principales | Cinzel | 900 | clamp(3rem, 8vw, 8rem) |
| Títulos de sección | Cinzel | 600 | clamp(2rem, 5vw, 4rem) |
| Citas / pull quotes | Cormorant Garamond | 400 italic | clamp(1.2rem, 2.5vw, 2rem) |
| Cuerpo narrativo | Cormorant Garamond | 400 | 1.1–1.2rem |
| Labels / eyebrows | Cinzel | 400 | 0.6–0.65rem, letter-spacing: 0.4em |
| UI (nav, botones) | System sans | 400–500 | 0.75–0.85rem |

---

## Criterios de aceptación del MVP

- [ ] Toggle cambia universo completo en < 800ms
- [ ] Scroll narrativo funciona en Chrome, Firefox, Safari mobile
- [ ] Quiz entrega resultado en todas las combinaciones
- [ ] Galería abre lightbox y navega con teclado (← →)
- [ ] Audio nunca inicia sin interacción del usuario
- [ ] Cambio de idioma afecta todo el texto visible
- [ ] Lighthouse Performance ≥ 85 en desktop
- [ ] Sin errores en consola en producción
- [ ] `prefers-reduced-motion` desactiva parallax y fades

---

## CDN permitidos

```html
<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

<!-- Tone.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js"></script>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap" rel="stylesheet">
```

---

## Comandos disponibles

Ver `.claude/commands/` para slash commands personalizados:
- `/new-chapter` → scaffolding de un nuevo capítulo
- `/translate` → genera traducción EN de un bloque ES
- `/check-theme` → verifica que no haya colores hardcodeados
- `/validate-content` → revisa que el contenido cumpla RN-01

---

## Lo que NO hacer

- ❌ No usar `getElementById` para cambiar colores — usar clases y atributos CSS
- ❌ No poner textos en el HTML — todo pasa por i18n
- ❌ No autoplay de audio
- ❌ No hardcodear colores fuera de `themes.css`
- ❌ No usar `!important` — si se necesita, la arquitectura CSS está mal
- ❌ No jQuery — JS vanilla o GSAP
- ❌ No instalar npm packages en v1
