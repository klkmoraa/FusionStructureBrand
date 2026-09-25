# FusionStructure · SVG v2

- `marca/` — isotipo (señal, mono, inversa), icono, favicon y lockups horizontal, apilado y compacto (día e `-inverse`).
- `familias/` — logo de cada familia: contenedor 64u con trazo de familia al 40 % y su glifo. Núcleo = ménsula.
- `productos/` — FStructure (Análisis) y FModel (Modelo): la ménsula con la franja de su familia; Día, Noche (`-inverse`) e icono de app.
- `tiles/` — un tile por herramienta (25), día e `-inverse`.
- `glifos/` — 25 glifos v2 sueltos. Estructura = `currentColor`; dato = `var(--fs-glyph-accent, #14171A)`. `_sprite.svg` trae todos como `<symbol id="fs-…">`.

Reglas: retícula 48u, trazo 2.6, extremos y uniones redondos, coordenadas enteras, énfasis por relleno.
Los lockups usan Space Grotesk e IBM Plex Mono como texto; para impresión, convertir a trazos.
