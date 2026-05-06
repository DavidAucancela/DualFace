# .claude/memory.md
> Decisiones tomadas, contexto acumulado, historial de sesiones.
> Actualizar después de cada sesión de trabajo significativa.

---

## Decisiones de arquitectura

### [Mayo 2026] — Decisiones fundacionales

**Stack:** HTML/CSS/JS vanilla + GSAP + Tone.js. Sin framework, sin bundler. Motivo: sitio de contenido, no app. Menos dependencias = más control sobre performance y animaciones.

**Sistema dual de temas:** Atributo `data-theme` en `<html>` + variables CSS. Alternativa descartada: clases en body. Motivo: el atributo es más semántico y permite selectores más limpios.

**i18n:** JSON propio + JS vanilla. Alternativa descartada: i18next (overkill para 2 idiomas sin routing). Estructura de claves: `seccion.componente.elemento`.

**Scroll:** GSAP ScrollTrigger sobre `position: sticky`. Alternativa descartada: IntersectionObserver puro (menos control sobre el progreso exacto del scroll).

**Audio:** Tone.js. Alternativa descartada: HTML5 Audio API puro (Tone.js da mejor control de fade y loop).

**Sin backend en v1:** Contenido estático en JSON + HTML. CMS headless queda para v2 cuando el cliente confirme que necesita actualizar contenido sin dev.

---

## Contenido narrativo — estado

| Capítulo | Texto ES | Texto EN | Revisado culturalmente |
|---|---|---|---|
| dh-ch1 El Origen | ⏳ pendiente | ⏳ pendiente | ⏳ pendiente |
| dh-ch2 El Inti Raymi | ⏳ pendiente | ⏳ pendiente | ⏳ pendiente |
| dh-ch3 La Máscara | ⏳ pendiente | ⏳ pendiente | ⏳ pendiente |
| dh-ch4 Hoy | ⏳ pendiente | ⏳ pendiente | ⏳ pendiente |
| cu-ch1 El Origen | ⏳ pendiente | ⏳ pendiente | ⏳ pendiente |
| cu-ch2 Semana Santa | ⏳ pendiente | ⏳ pendiente | ⏳ pendiente |
| cu-ch3 El Anonimato | ⏳ pendiente | ⏳ pendiente | ⏳ pendiente |
| cu-ch4 Hoy | ⏳ pendiente | ⏳ pendiente | ⏳ pendiente |

---

## Assets — estado

| Asset | Estado | Notas |
|---|---|---|
| Fotos Diablo Huma (≥8) | ⏳ pendiente | Buscar en Flickr CC o contactar fotógrafos de Imbabura |
| Fotos Cucurucho (≥8) | ⏳ pendiente | Buscar procesión Viernes Santo Quito |
| Audio DH — percusión andina | ⏳ pendiente | Freesound.org como fuente temporal |
| Audio CU — campanas/silencio | ⏳ pendiente | Freesound.org como fuente temporal |
| Ilustraciones SVG DH | ✅ prototipo listo | Ver prototipos anteriores en conversación con Claude |
| Ilustraciones SVG CU | ✅ prototipo listo | Ver prototipos anteriores en conversación con Claude |

---

## Preguntas abiertas

- [ ] ¿El cliente quiere su logo en el sitio o es un sitio autónomo?
- [ ] ¿Hay fuentes académicas específicas que el cliente quiere citar?
- [ ] ¿El dominio ya está comprado? ¿Cuál es?
- [ ] ¿Quién valida el contenido cultural — hay un asesor o historiador?
- [ ] ¿Las fotos son del cliente o hay que conseguirlas?
- [ ] ¿El sitio necesita analytics (GA4, Plausible)?
- [ ] ¿Hay fecha de presentación al cliente?

---

## Sesiones de trabajo

### Sesión 1 — Mayo 2026
- Definido PRD completo (ver `seres-ecuador-PRD.md`)
- Creada estructura de archivos del proyecto
- Creado CLAUDE.md con arquitectura completa
- Pendiente: comenzar con `css/base.css` + `css/themes.css`

---

## Glosario de términos del proyecto

| Término | Definición |
|---|---|
| **universo** | El conjunto visual y narrativo completo de un personaje (DH o CU) |
| **toggle** | El componente pill en la nav que cambia de universo |
| **scroll-driver** | El div de altura extendida que captura el scroll para el parallax |
| **stage** | El div sticky que fija el viewport durante el scroll narrativo |
| **chapter** | Una sección narrativa dentro de un universo (hay 4 por universo) |
| **theme** | El valor del atributo `data-theme` en `<html>`: `"dh"` o `"cu"` |
| **DH** | Abreviatura interna de Diablo Huma |
| **CU** | Abreviatura interna de Cucurucho |
