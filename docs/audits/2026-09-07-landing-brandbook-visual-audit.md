# Auditoría visual de landing y brandbook

Fecha: 2026-09-07
Superficies: `Landing-y-Brandbook` (landing y `brandbook-site`)
Captura: navegador local, viewport 1280 × 720, ejecución real de los builds disponibles.

## Veredicto

La dirección visual está lista para una pasada de consolidación: la landing
comunica el producto en el primer viewport y el brandbook ya funciona como
fuente de criterio visual, verbal y de estados. Antes de pulir detalles,
conviene cerrar dos riesgos de consistencia: tipografías faltantes en la
landing y la migración explícita entre los tokens propuestos por el brandbook
y los tokens que todavía consume la aplicación.

## Recorrido comprobado

1. Landing inicial: hero, navegación, jerarquía, contraste aparente y CTA.
2. Landing → “Explorar herramientas”: catálogo visible, estados y controles
   futuros deshabilitados.
3. Landing → “Abrir Solver 2D”: el CTA abre el módulo externo de FStructure.
4. Brandbook inicial: índice de 12 secciones, primer viewport y contador de
   estados.
5. Brandbook → tema claro/oscuro: el cambio es reversible y conserva la
   jerarquía, el gráfico y los estados.
6. Brandbook → “Ver las 25 superficies”: el ancla lleva al catálogo y muestra
   las familias, glifos y tarjetas.

## Hallazgos

### P0 — La landing pide dos fuentes que no están desplegadas

El servidor registró `404` para `/fonts/instrument-sans-variable.woff2` y
`/fonts/geist-mono-variable.woff2`. Esas rutas están declaradas en
`src/design-system/fonts.css`, pero no existen en `public/fonts/` ni en el
build inspeccionado. El navegador cae a una fuente de sistema, por lo que la
landing no garantiza la tipografía que define el sistema.

Acción recomendada: decidir si se versionan las fuentes con licencia dentro
del portal o si se cambian las declaraciones a una pila disponible. Verificar
de nuevo con una captura y con el panel de red antes de cerrar el siguiente
pulido.

### P1 — La migración de tokens debe tener una única fuente de verdad

La sección 12 del brandbook declara correctamente que sus tokens son una
propuesta y que la aplicación todavía consume `src/design-system/tokens.css`.
Eso evita una promesa falsa, pero deja abierta una deriva visible entre el
brandbook y la landing.

Acción recomendada: comparar tokens en una tarea acotada, aprobar el mapa de
migración y luego mover la aplicación a una fuente única con capturas día/noche
y revisión de contraste.

### P1 — La densidad del brandbook es intencional, pero necesita navegación

El documento concentra 12 secciones, 25 superficies, tokens, voz, patrones y
referencias en una sola experiencia. El índice lateral y los anclajes hacen
que el recorrido sea viable; sin ellos, el documento sería demasiado largo
para descubrirlo de forma lineal.

Acción recomendada: conservar el índice persistente y añadir una señal de
sección activa/posición cuando se implemente el siguiente pase. No dividirlo
todavía: la continuidad es parte del valor del brandbook.

## Fortalezas observadas

- La landing tiene una promesa única, CTA primario claro y una imagen de
  estructura que explica el dominio sin texto adicional.
- Los estados `Disponible`, `Experimental` y `Planeado` son explícitos en la
  landing y en el catálogo del brandbook; los botones futuros aparecen
  deshabilitados.
- El brandbook ofrece tema claro/oscuro y control de reducción de movimiento,
  además de reglas de voz que evitan prometer certificación o resultados de
  obra.
- La nomenclatura de superficies, familias, glifos y estados está alineada y
  se puede recorrer desde el índice.

## Límites de esta auditoría

No se hizo una medición exhaustiva de contraste por píxel, navegación completa
con teclado, lector de pantalla, viewport móvil ni consola del navegador. La
evidencia visual es de 1280 × 720; la auditoría responsive y de accesibilidad
profunda queda para la siguiente pasada.

## Verificación técnica

- Typecheck: pasa.
- Tests: 3 archivos, 59 tests pasan.
- Boundary de Foundation local: pasa.
- Lint: bloqueado por la regla `react-compiler` declarada en la configuración
  existente pero no disponible en el plugin instalado; no se modificó esa
  configuración durante esta auditoría.

## Addendum · 2026-09-08

La consolidación Atlas Clay–Minimal corrigió la barra superior móvil, añadió el
catálogo bilingüe del brandbook y dejó el eslogan fijo `Make complexity
legible.` en ambos idiomas. La verificación actual del sitio independiente
queda registrada en `brandbook-site/output/playwright/final-audit.json`:
390/768/1280/1440 px, 12 anclas, 16 imágenes locales cargadas al recorrer la
página, cero 4xx locales, cero errores de página, tema noche, modo calma,
menú móvil, filtros, señal y copy-to-clipboard comprobados. Los tabs de
identidad, color y voz ahora exponen `aria-controls`/`aria-labelledby` completos.
La página de referencias de Figma también incorpora Material 3, Fluent 2, NASA
y Apple como benchmarks oficiales sin importar assets de terceros. En esta
pasada `oxlint`, `tsc --noEmit` y `vinext build` pasan.
