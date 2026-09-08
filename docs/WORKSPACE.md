# Mapa de trabajo · FusionStructure Web

Este repositorio es el portal y la marca de FusionStructure. La carpeta raíz
es la única fuente activa para trabajo de landing y marca; los proyectos en
`../../Historial-y-Contratos/` son referencias separadas.

## Superficies

| Superficie | Fuente | Resultado | Validación mínima |
| --- | --- | --- | --- |
| Portal | `src/` | Landing y catálogo Vite/React | `npm run build` para cambios de código, composición o estilos. |
| Brandbook | `brandbook-site/app/`, `brandbook-site/public/` | Sitio de identidad independiente | Ejecutar su build sólo cuando se cambie el brandbook. |
| Motion | `motion/landing-loop/` | Loop visual de la landing | `npm run check` desde `motion/landing-loop/` cuando se modifique una composición. |
| Enlaces de producto | `src/foundation/productLinks.ts` | Navegación a aplicaciones públicas | Pruebas focalizadas y `npm run check:local-foundation` al cambiar URLs. |

## Límites

- El portal no importa Foundation ni código interno de aplicaciones hermanas.
- El brandbook es el origen de assets de marca; los archivos de `public/` son materiales fuente, no builds.
- Motion no introduce copy ni promesas de producto; el HTML accesible del portal contiene el contenido.
- `dist/`, `node_modules/`, `.next/`, `.vinext/` y `.wrangler/` se pueden regenerar a partir de los manifests y lockfiles. No editar ni conservar como fuente.

## Flujo recomendado

1. Decide qué superficie es dueña del cambio.
2. Cambia sólo las fuentes de esa superficie.
3. Ejecuta la validación mínima indicada arriba.
4. Revisa el estado Git antes de pasar un asset o una decisión a otra superficie.

El registro de la reorganización inicial está en
`docs/superpowers/specs/2026-09-07-workspace-organization-design.md`.
