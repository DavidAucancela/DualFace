# /new-chapter — Scaffolding de un nuevo capítulo

Genera el scaffolding completo de un nuevo capítulo para el universo indicado.

**Uso:** `/new-chapter dh 5` o `/new-chapter cu 3`

---

Cuando se invoque este comando, pide al usuario:
1. **Universo:** `dh` (Diablo Huma) o `cu` (Cucurucho)
2. **Número de capítulo:** entero (ej. `5`)
3. **Título provisional** del capítulo
4. **Temática central** (1-2 frases)

Luego genera:

### 1. Bloque HTML para `index.html`

```html
<!-- ── [UNIVERSO] Capítulo [N]: [TÍTULO] ── -->
<section class="chapter" id="[universo]-ch[N]" aria-label="[Nombre universo] — Capítulo [N]">
  <div class="chapter-inner">
    <div class="chapter-text">
      <p class="text-eyebrow chapter-eyebrow" data-i18n="[universo].ch[N].eyebrow">0[N] — [Temática]</p>
      <h2 class="text-title-lg chapter-title"  data-i18n="[universo].ch[N].title">[Título]</h2>
      <p class="text-body chapter-body"         data-i18n="[universo].ch[N].body">[Placeholder]</p>
      <blockquote class="text-quote chapter-quote" data-i18n="[universo].ch[N].quote">[Placeholder]</blockquote>
    </div>
  </div>
  <div class="chapter-number" aria-hidden="true">0[N]</div>
</section>
```

### 2. Claves i18n para `locales/es.json`

```json
"ch[N]": {
  "eyebrow": "0[N] — [Temática]",
  "title":   "[Título en español]",
  "body":    "[Texto narrativo — PENDIENTE DE REDACCIÓN CULTURAL]",
  "quote":   "[Cita — PENDIENTE]"
}
```

### 3. Claves i18n para `locales/en.json`

```json
"ch[N]": {
  "eyebrow": "0[N] — [Temática EN]",
  "title":   "[Title in English]",
  "body":    "[Narrative text — PENDING CULTURAL REVIEW]",
  "quote":   "[Quote — PENDING]"
}
```

### 4. Nav dot adicional

Recuerda añadir un `<button class="nav-dot">` más en el bloque `.nav-dots`.

---

**Reglas que aplican:**
- RN-01: El placeholder de body debe tener la nota `PENDIENTE DE REVISIÓN CULTURAL`
- RN-03: No hardcodear colores
- RN-05: Todas las cadenas de texto van en los JSON, no en el HTML
- Los términos kichwa se mantienen sin traducir en inglés
