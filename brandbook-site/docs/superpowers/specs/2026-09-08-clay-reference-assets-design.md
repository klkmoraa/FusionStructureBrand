# Clay Reference Assets Design

## Goal

Raise the editorial polish of the FusionStructure brandbook with three purposeful
clay-minimal images while preserving every live engineering diagram, brand mark,
tool filter, lab, and technical value. The result must feel like a physical
extension of the system in both Día and Noche, never a decorative overlay.

## Scope

This change is confined to `brandbook-site/` in the `fusionstructure-web`
repository. Its Pages build remains the source for
`https://klkmoraa.github.io/fusionstructure-web/`.

Three generated stills will appear only in `Referencias → Atlas Clay–Minimal`:

| Asset | Theme | Role | Master / delivery ratio |
| --- | --- | --- | --- |
| `mark-relief-day` | Día | Material interpretation of the structural F | 4:3 / 4:3 |
| `field-editorial-day` | Día | Editorial field of grid, joints, and family-color samples | 4:3 / 4:3 |
| `results-console-night` | Noche | Graphite physical console showing abstract structural-result traces | 4:3 / 4:3 |

The first two make the daylight identity and editorial system tangible. The
third gives Noche an intentional, native physical reference rather than a
filtered daylight scene.

## Art direction

Each source capture is a **composition reference**, not an edit target. The
generated output must have no readable text, UI labels, logos, fabricated
brand marks, watermark, depth-of-field, bloom, haze, glass, or broad diffuse
shadow. HTML continues to carry every title, detail, token, and accessible
description.

The material language has one consistent light direction: upper-left contact
edge and a short, defined lower-right contact shadow. Surfaces are matte,
slightly imperfect molded paper/clay; all emphasis is through bevel, nesting,
and contact—not glow. The active color language is restricted to the existing
canonical system:

- Day paper: `#F7F6F1`; raised surface: `#FFFFFF`; graphite: `#14171A`;
  FusionStructure mint: `#1AA57A`.
- Night paper: `#14171A`; raised surface: `#1B1F22`; ambient edge: muted
  graphite; FusionStructure mint: `#53E0B2`.
- Signal accents retain their semantic roles: axial blue, moment coral, and
  shear green. They appear as small physical inlays, never as gradients.

The static images are intentionally subordinate to live content. They never
replace the Hero analysis board, mark construction, color/signal system,
material lab, motion lab, Patterns workbench, or iconography diagrams.

## Asset and integration design

Generated masters are inspected before use and committed only as optimized
delivery files in `public/brandbook/clay/`, with stable semantic filenames:

```text
public/brandbook/clay/mark-relief-day.avif
public/brandbook/clay/field-editorial-day.avif
public/brandbook/clay/results-console-night.avif
```

Each asset has explicit intrinsic dimensions and is kept below 500 KB where
the encoder permits. The generated source capture and discarded variants stay
outside `public/`; `public/proposals/clay/` remains untouched because its
existing raster text and soft photography do not meet this direction.

`app/sections/References.tsx` will extend `CLAY_REFERENCES` with the image
metadata and render the still through `publicAsset()` inside a semantic
`<picture>/<img>`. `app/brand/copy.ts` will own Spanish and English alt text;
the alt describes the physical scene, while the visible caption continues to
explain the brand-system rule. `app/globals.css` and `app/atlas.css` will give
the image frame a fixed 4:3 crop, opaque surface, short tactile edge, and no
background image, filter, or transparency.

## Interaction and motion

No animation library is required: the project has no Framer Motion dependency,
and CSS already supplies the tokenized, reduced-motion-aware motion system.
The implementation will improve that existing system instead of adding a
second choreography engine:

1. Clay controls share an explicit geometry contract: equal desktop top
   controls, equal paired hero CTAs, and equal mobile controls.
2. Press/release states move only one physical pixel and swap between raised
   and inset contact shadows; they do not scale, glow, blur, or float.
3. The new stills may use one short transform-only arrival as their card
   enters the viewport. Calm mode and `prefers-reduced-motion` render the
   final state immediately.
4. Theme change remains a color/material transition rather than a filter.
   The Noche image is an independently generated scene, not a darkened copy.

## Responsive and accessibility behavior

- At 1440, 1280, 768, and 390 px, images retain the 4:3 ratio and cannot
  create horizontal overflow.
- Images are lazy-loaded with `decoding="async"`, intrinsic dimensions, and
  a `sizes` value appropriate to the three-column/one-column Atlas grid.
- Focus indicators, keyboard behavior, chapter navigation, theme and language
  state, technical units, filters, labs, and clipboard interactions remain
  unchanged.
- Assets use `publicAsset()` so `/fusionstructure-web/` is honored on GH
  Pages. There may be no 404 response in a production-path render.

## Verification

The implementation is accepted only when all of the following pass:

1. Canonical brand tests, TypeScript, lint, formatting, and Pages build.
2. Automated static-browser checks at 390, 768, 1280, and 1440 px in Día and
   Noche, with no horizontal overflow, page errors, or failed image requests.
3. Visual screenshot review of the Atlas cards in both modes confirms opaque
   clay material, compact directional contact shadow, no CSS `blur`,
   `backdrop-filter`, or visual `filter`, and readable captions.
4. The production URL returns the newly published asset hashes after CI and
   Deploy Brandbook Pages finish successfully.
