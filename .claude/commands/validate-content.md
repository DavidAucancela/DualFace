# /validate-content — Verificar rigor cultural del contenido (RN-01)

Revisa que el contenido narrativo del sitio cumpla los estándares de rigor cultural definidos en RN-01.

**Uso:** `/validate-content` (audita todo) o `/validate-content dh-ch1` (audita un capítulo)

---

## Criterios de validación

### 🔴 BANDERAS ROJAS (bloquean publicación)

| Criterio | Descripción |
|---|---|
| "demonio" sin contexto | El Diablo Huma descrito como demonio sin explicar el significado kichwa |
| Afirmación sin fuente | Dato histórico específico (año, nombre, cifra) sin referencia |
| Traducción de términos kichwa | Inti Raymi, Pachamama, etc. traducidos al inglés o español |
| Dato factual incorrecto | Cualquier error verificable contra fuentes académicas |
| Romantización | Descripción que oculta el contexto colonial o la violencia histórica |

### 🟡 BANDERAS AMARILLAS (requieren revisión)

| Criterio | Descripción |
|---|---|
| Afirmación vaga | "desde tiempos inmemoriales", "ancestralmente" — falta precisión |
| Lenguaje exotizante | "misterioso", "místico", "colorido" sin matiz |
| Generalización étnica | Atribuir práctica a "todos los indígenas" o "toda la comunidad" |
| Cifra sin fuente | Números específicos (100kg, 1534, 4 días) sin cita |
| Ausencia de agencia | Describir comunidades como receptoras pasivas de tradición |

### ✅ CRITERIOS POSITIVOS (verificar que estén presentes)

- [ ] Se explica el significado kichwa en primera aparición del término
- [ ] Se nombran comunidades específicas (Otavalo, Cayambe...) no genéricas
- [ ] Se reconoce la tensión tradición/turismo en los capítulos "Hoy"
- [ ] El Cucurucho se presenta como práctica de devoción, no folclore
- [ ] Se distingue entre práctica religiosa y espectáculo

---

## Proceso

1. Leer el contenido de `locales/es.json` (y `en.json` si aplica)
2. Para cada capítulo auditado, evaluar cada criterio
3. Emitir reporte con banderas

## Formato de reporte

```
VALIDACIÓN CULTURAL — /validate-content
========================================

CAPÍTULO: dh-ch1 (El Origen)
──────────────────────────────
🔴 BLOQUEANTE:
  body: "El Diablo Huma es un demonio de la cultura andina"
  → Nunca describir como demonio sin contexto kichwa (RN-01)

🟡 A REVISAR:
  quote: "desde tiempos inmemoriales"
  → Falta precisión temporal. Buscar datación aproximada.

✅ OK:
  - Término kichwa explicado en primera aparición
  - Comunidades específicas mencionadas

VEREDICTO: ❌ NO APTO para publicación — 1 bandera roja
```
