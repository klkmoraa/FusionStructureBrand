# FusionStructure · Canon de marca

La referencia única de la marca FusionStructure: el sistema de diseño, los tokens y los SVG.

**Sitio:** https://klkmoraa.github.io/FusionStructureBrand/

| Ruta | Qué es |
| --- | --- |
| `index.html` | Sistema de diseño: 13 fichas (sistema, arquitectura, logos, familias, color, Día y Noche, forma, movimiento, componentes, iconos, herramientas, voz, estado). |
| `tokens/tokens.json` | Fuente de todos los valores: color Día/Noche, familias, señales, estados, tipo, espacio, radio, materia y movimiento. |
| `tokens/tokens.css` | Variables `--fs-*` generadas desde `tokens.json`. Se copia tal cual a cada producto. |
| `svg/` | Paquete SVG v2: marca, familias, productos, 25 glifos y tiles. |
| `media/` | Film de marca (10.8 s) y su póster. |

## Familias

Cada producto hereda el canon y cambia sólo su acento. Su brandbook vive en su repo:

- **FStructure** (Análisis, `#ED4B46`): [app](https://klkmoraa.github.io/fstructure/) · [`docs/brandbook`](https://github.com/klkmoraa/fstructure/tree/main/docs/brandbook)
- **FModel** (Modelo, `#7657D5`): [app](https://klkmoraa.github.io/FModel/) · [`docs/brandbook`](https://github.com/klkmoraa/FModel/tree/main/docs/brandbook)

La landing pública vive en [FusionStructure](https://github.com/klkmoraa/FusionStructure).

## Trabajo

```bash
npm run tokens   # regenera tokens/tokens.css desde tokens.json
npm run check    # tokens al día y sitio completo
npm run serve    # http://localhost:4173
```

Sin dependencias: sólo Node 24. Al hacer push a `main`, CI publica el sitio en la rama `gh-pages`.

Lienzo editable (Claude Design): https://claude.ai/artifact/23YkfDwdyvGTLTwQ1LFznA
