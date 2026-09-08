# Referencias de sistemas de marca y diseño

Fecha de revisión: 2026-09-08

Esta nota registra las referencias públicas usadas para estructurar
`FusionStructure · Brandbook 2026 — Clay Minimal`. No se copian activos,
logotipos ni estilos propietarios; se estudian patrones de documentación,
gobernanza y handoff.

## Qué se tomó de cada referencia

| Referencia | Observación | Decisión para FusionStructure |
| --- | --- | --- |
| [IBM Design Language](https://www.ibm.com/design/language/) | Separa filosofía de marca, fundamentos, recursos, diagramas, datos y movimiento; la retícula 2x usa unidades repetibles. | Mantener un Atlas continuo con foundations explícitas, retícula de 8u, diagramas técnicos y una página de recursos/handoff. |
| [Atlassian Design Foundations](https://atlassian.design/foundations) | Organiza foundations, tokens, accesibilidad, contenido, spacing, grid, color, tipografía, iconografía, logos y elevation. | Agrupar las 12 anclas en cinco capítulos y hacer que tokens, copy, estados y accesibilidad sean parte del mismo contrato. |
| [GitLab Pajamas tokens](https://design.gitlab.com/product-foundations/design-tokens/) | Distingue tokens constant, semantic y contextual, y publica puentes Figma/CSS/SCSS. | Mantener variables `--fs-*`, modos Día/Noche, matriz Figma ↔ CSS ↔ TypeScript y estilos locales reutilizables. |
| [GOV.UK lifecycle](https://design-system.service.gov.uk/community/component-lifecycle-statuses/) | Hace explícita la madurez de componentes y acompaña patrones con contexto de uso y evidencia. | Separar estado de producto (`Disponible`, `Experimental`, `Planeado`, `No comprometido`) de madurez del sistema (`Draft`, `Preview`, `Stable`, `Deprecated`). |
| [Spotify Design Guidelines](https://developer.spotify.com/documentation/design) | Documenta clear space, tamaños mínimos, variantes de logo, restricciones y ejemplos de “sí/no”. | Incluir manual editable del logo, espacio libre, tamaños mínimos, lockups y seis usos prohibidos. |
| [Starbucks Creative Expression](https://creative.starbucks.com/) | Abre con filosofía y organiza logo, color, tipografía, voz, fotografía, ilustración y casos; regula una escala funcional ↔ expresiva. | Hacer que cada capítulo pase de regla a demostración y aplicación, manteniendo la interfaz técnica funcional y reservando el gesto Clay para momentos expresivos. |
| [McDonald’s Feel-Good Design](https://irp.cdn-website.com/5b2218e9/files/uploaded/McDonalds-2019.pdf) | Trata los Arches como un activo que puede recortarse, repetirse y moverse sin perder reconocimiento; fija proporción de color, aire y usos incorrectos. | Usar la ménsula como gesto material —recorte, relieve y marco— sin alterar su geometría canónica, y documentar explícitamente cuándo no aplicar volumen. |
| [Coca-Cola One Brand](https://www.coca-colacompany.com/about-us/history/coca-cola-red-our-second-secret-formula) | Un código cromático propietario y pocos activos constantes unen múltiples variantes y soportes. | Conservar papel, tinta y seis señales como códigos estables; los mockups cambian de contexto sin inventar una paleta nueva por pantalla. |
| [Coca-Cola Real Magic / Hug](https://investors.coca-colacompany.com/news-events/press-releases/detail/1036/the-coca-cola-company-unveils-new-global-brand-platform-for-coca-cola-trademark) | Un gesto propietario funciona como marco flexible para contenido diverso y mantiene el reconocimiento global. | Repetir una sola forma Clay estructural como contenedor de marca, color, iconos y producto, en vez de añadir decoraciones independientes. |
| [Airbnb Design Language](https://medium.com/airbnb-design/building-a-visual-language-behind-the-scenes-of-our-airbnb-design-system-224748775e4e) | Audita flujos reales, define principios antes de escalar componentes y trata la librería como un ecosistema vivo. | Mantener un equipo pequeño, probar superficies reales y documentar propósito, anatomía, uso, accesibilidad, tokens y evolución. |
| [Material Design 3](https://m3.material.io/foundations/) | Sistema abierto que conecta foundations, roles de color, tokens, componentes adaptables y temas. | Mantener roles semánticos, modos Día/Noche y superficies que se adapten sin perder jerarquía. |
| [Fluent 2 Design System](https://fluent2.microsoft.design/) | Lenguaje multiplataforma con kits Figma, componentes, profundidad, movimiento y accesibilidad como contrato. | Hacer explícitos estados responsivos, comportamiento de controles y defaults accesibles. |
| [NASA Graphics Standards Manual](https://www.nasa.gov/image-article/nasa-graphics-standards-manual/) | Un manual de estándares convierte una marca en reglas reproducibles de retícula, clear space, proporción y producción. | Reforzar la gramática del logo, tamaños mínimos, lockups y guardas de producción. |
| [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) | Guía de plataforma que articula jerarquía, claridad, materiales, accesibilidad, focus y adaptación entre contextos. | Mantener safe areas, contraste, focus visible y una jerarquía funcional en desktop y mobile. |
| [Material Design 3](https://m3.material.io/) | Publica roles de color, estados de componente, theming y una base abierta para escalar interfaces. | Separar neutros, señales y estados; documentar bindings Día/Noche y estados sin depender sólo del color. |
| [Microsoft Fluent 2](https://fluent2.microsoft.design/layout) | Usa proximidad, rangos responsivos y una retícula flexible para conservar jerarquía entre pantallas. | Mantener la retícula 8u con subdivisiones explícitas y validar 390/768/1280/1440 antes de cerrar un layout. |
| [NASA Graphics Standards](https://www.nasa.gov/nasa-brand-center/brand-guidelines/) | Expone un manual histórico completo con reproducción, restricciones y usos de identificadores. | Tratar el logo como geometría protegida por el sistema: fuente editable única, clear space, mínimos y misuse visibles. |
| [Apple HIG · Typography](https://developer.apple.com/design/human-interface-guidelines/typography) | Vincula jerarquía tipográfica, legibilidad, tamaños mínimos y ajustes de accesibilidad con el contexto de uso. | Conservar Space Grotesk/Inter/IBM Plex Mono, declarar roles y probar escalas pequeñas sin perder unidades técnicas. |

## Decisiones aplicadas

- **Estructura:** cinco capítulos, índice persistente y doce anclas estables.
- **Identidad:** marca vectorial editable, lockups, clear space, tamaños y usos prohibidos.
- **Foundations:** color semántico, dos modos, escala tipográfica, 8u, radios,
  material y movimiento.
- **Producto:** 25 herramientas, siete familias y cuatro estados explícitos.
- **Ejemplos:** referencias Clay en tres niveles: canónica, anotada y estrés.
- **Benchmarks extendidos:** Material 3, Fluent 2, NASA Graphics Standards y Apple HIG se registran como lentes de evaluación; sólo se conservan nombres y enlaces oficiales, sin importar assets de terceros.
- **Gobernanza:** propietario, versión, madurez, matriz de tokens y guardas de handoff.

## Límites

Estas referencias son criterios de estructura y calidad, no una autorización
para reutilizar marcas, imágenes o recursos protegidos. Las imágenes Clay del
Atlas son assets locales seleccionados para esta propuesta y están separadas
de los componentes editables.
