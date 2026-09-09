# Live Clay Interaction Design

## Goal

Increase the physical, clay-minimal quality of the published FusionStructure
brandbook without adding generated or raster imagery. The existing live
HTML/SVG Atlas studies remain the visual material; controls and cards gain a
single, clear tactile grammar.

## Scope change

The user explicitly replaced the prior image-asset request with **“sin
imágenes”**. No new file may be created in `public/`, and
`public/proposals/clay/` remains untouched. The temporary screenshot captures
from the superseded asset experiment are not product assets and must not be
committed.

## Live clay direction

`Referencias → Atlas Clay–Minimal` keeps its three existing, semantic live
studies: `ClayRelief`, `EditorialScene`, and `ProductMockup`. They explain
identity, editorial hierarchy, and product state with real HTML/SVG rather
than a decorative bitmap.

The reference cards use one material response across Día and Noche:

- Fine-pointer hover rises exactly one pixel and changes from elevated to
  floating contact depth.
- Active state settles exactly one pixel downward with the inset contact
  shadow.
- A short transform-only arrival moves the cards from `translateY(8px)` to
  their final position. It never changes opacity, scale, blur, or filter.
- Calm mode and `prefers-reduced-motion` render the final static position
  immediately, including hover/active states.

The existing top-control and action geometry remains unchanged: 86 px desktop,
38 px tablet, and 34 px mobile. Press feedback is always
`translateY(1px)`—never scale.

## Hard constraints

- Work only in `brandbook-site/` within `fusionstructure-web`; GitHub Pages
  keeps the `/fusionstructure-web/` base path.
- Preserve every live analysis board, SVG mark, tool filter, lab, technical
  value, keyboard path, and bilingual interaction.
- Never introduce CSS `blur`, `backdrop-filter`, or visual `filter`.
- Do not add a motion dependency. Existing CSS tokens remain the only motion
  system.
- Verify 390, 768, 1280, and 1440 px in Día and Noche, with no overflow,
  failed requests, or broken Calm mode.
