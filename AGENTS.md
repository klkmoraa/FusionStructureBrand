# FusionStructure · Canon de marca

## Alcance
Este repo es la única fuente de la marca: `index.html` (13 fichas), `tokens/`, `svg/` y `media/`.
Nada de apps, frameworks, solvers, CAD ni BIM. Es un sitio estático sin dependencias.

## Reglas
- Un valor se cambia en `tokens/tokens.json` y luego `npm run tokens`. `tokens.css` nunca se edita a mano.
- Los productos copian `tokens.css` y los SVG; ningún repo importa código de otro.
- Verde estructural `#1AA57A` es la marca madre. Cada producto cambia sólo su acento de familia (FStructure `#ED4B46`, FModel `#7657D5`).
- Las señales son del dato (línea, punto, símbolo), nunca texto largo ni fondo. Los estados van antes que la promesa.
- Día y Noche, WCAG 2.1 AA: texto ≥4.5:1; gráfico y foco ≥3:1.
- Voz directa: pocas palabras, el objeto y la salida. Sin «garantizado», «exacto» ni «certificado».
- Si cambias una ficha, cámbiala también en el lienzo de Claude Design y vuelve a exportar `index.html`.
- Antes de fusionar: `npm run check`.
