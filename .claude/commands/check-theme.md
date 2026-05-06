# /check-theme — Detectar colores hardcodeados fuera de themes.css

Audita todos los archivos CSS y JS del proyecto buscando colores hardcodeados que violen RN-03.

**Uso:** `/check-theme`

---

## Qué buscar

Ejecuta una búsqueda en todos los archivos `css/` y `js/` buscando:

### Patrones prohibidos (fuera de `css/themes.css`):
```
#[0-9a-fA-F]{3,6}          → colores hex
rgb(                         → colores rgb()
rgba(                        → colores rgba() sin var()
hsl(                         → colores hsl()
hsla(                        → colores hsla()
color:\s*[a-z]+              → colores por nombre (red, blue, green...)
background:\s*[a-z]+         → backgrounds por nombre
```

### Excepción permitida:
- `css/themes.css` — es la fuente de verdad, puede tener valores hardcodeados
- SVGs en `assets/images/` — colores físicos ilustrativos

### Falsos positivos a ignorar:
- `transparent`
- `currentColor`
- `inherit`
- `initial`
- `unset`

---

## Proceso

1. Leer todos los archivos en `css/` excepto `themes.css`
2. Leer todos los archivos en `js/`
3. Para cada match encontrado, reportar:
   - Archivo y línea
   - El color hardcodeado encontrado
   - La variable CSS de `themes.css` que debería usarse en su lugar

## Formato de reporte

```
AUDIT DE COLORES — /check-theme
================================

🔴 VIOLACIONES (colores hardcodeados):
  css/components.css:47  →  color: #ff0000
     Sugerencia: usar var(--accent) o var(--accent-warm)

🟡 REVISAR (posibles falsos positivos):
  js/scroll.js:23  →  rgba(0,0,0,0.5)
     Contexto: ¿hay una variable --bg-overlay equivalente?

✅ ARCHIVOS LIMPIOS:
  css/base.css — sin colores hardcodeados
  css/scroll.css — sin colores hardcodeados

RESUMEN: X violaciones, Y a revisar, Z archivos limpios
```
