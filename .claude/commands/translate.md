# /translate — Traducción ES → EN respetando términos kichwa

Traduce un bloque de texto del español al inglés, manteniendo los términos kichwa sin traducir y el tono narrativo del proyecto.

**Uso:** `/translate` (pega el texto a traducir cuando se te pida)

---

## Instrucciones de traducción

Al recibir el texto en español:

1. **Traducir** al inglés con tono narrativo-literario (no académico seco, no turístico)
2. **Mantener SIN traducir** los siguientes términos (lista no exhaustiva):
   - `Inti Raymi`
   - `Pachamama`
   - `Hanan Pacha`
   - `Kay Pacha`
   - `Taita Inti`
   - `chakana`
   - `chicote` (explicar entre guiones si es primera aparición)
   - `Diablo Huma`
   - `Cucurucho`
   - `Jesús del Gran Poder`
   - Nombres de comunidades: Otavalo, Cayambe, Latacunga, Cotacachi
   - Nombres de iglesias: La Compañía, San Francisco, La Merced
3. **Primera aparición** de término kichwa: añadir breve glosa entre guiones
   - Ejemplo: `Inti Raymi — Festival of the Sun —`
4. **Tono:** evitar "exotic", "colorful", "mystical" — son términos orientalizantes
5. **Verificar** que ninguna afirmación histórica se suavice o exagere en la traducción
6. **Formato de salida:** entregar el JSON listo para pegar en `locales/en.json`

## Ejemplo

**Entrada ES:**
```
"body": "El Diablo Huma lidera la danza portando un chicote —látigo ceremonial— con el que limpia el camino de malas energías."
```

**Salida EN:**
```
"body": "The Diablo Huma leads the dance carrying a chicote — a ceremonial whip — with which it cleanses the path of harmful energies."
```

---

**Señales de alerta en la traducción:**
- 🔴 Usar "devil" sin contexto → añadir siempre glosa
- 🔴 Traducir nombres propios kichwa
- 🔴 Usar adjetivos orientalizantes (mystical, exotic, colorful, vibrant)
- 🟡 Cambiar el sujeto de activo a pasivo sin razón
- 🟡 Suavizar afirmaciones sobre colonialismo
