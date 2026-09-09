# Hard-Edge Clay System Design

## Goal

Rebuild the published brandbook's material language as **hard-edge structural
clay**: tactile, rounded, and physically legible without glow, blur, raster
imagery, or a generic soft-UI treatment. Every interactive control must read
as either raised, pressed, selected, or recessed; technical data remains flat.

## Evidence and reference direction

The public screenshots and a live computed-style inspection at 1008 px show
that the perceived blur is not `filter`, `backdrop-filter`, or `blur()`. It
is produced by 6–14 px `box-shadow` blur radii in the Atlas material tokens
and by the coloured 6 px shadow on primary actions. The same inspection found
that Hero actions have 283 px of content in a 268.8 px two-column grid: the
secondary Spanish CTA cannot fit while `white-space: nowrap` is enforced.

Reference research used the component grammar in the Setproduct claymorphism
guide and Clay's neumorphism examples only as a study of raised/recessed
surfaces. FusionStructure deliberately rejects their ambient soft shadows:
the engineering brand needs a single directional light and crisp contact
edges, not puffy glow. No reference image becomes a site asset.

## Material system

The light source is fixed at upper-left. The whole Atlas receives four
semantic materials, expressed through CSS-only zero-blur shadows:

| Material | Meaning | Surface treatment |
| --- | --- | --- |
| Flat data | tables, labels, technical diagrams | fill, border, no outer elevation |
| Recessed | inputs, segmented tracks, tool wells | hard inset 1–2 px dark lower-right plus 1 px upper-left highlight |
| Raised control | ordinary actions, top controls, compact filters | 1 px inner highlight and short 2–3 px lower-right contact edge, all blur radii `0` |
| Selected / primary | decisive action or current state | solid semantic signal, pale 1 px bevel, dark/tinted 2–3 px contact edge, never a coloured glow |

Pressed states retain the existing one-pixel downward travel and switch to the
recessed material. Hover may raise only one pixel on a fine pointer. Calm and
`prefers-reduced-motion` remove transform and animation while retaining the
static material contrast and keyboard focus outline.

## Scope boundaries

Apply the shared physical grammar to:

- `.top-control`, `.action`, `.ui-button`, `.icon-button`, `.copy-chip`, and
  `.workbench__tool`;
- selected `.segmented button` states, with `.segmented` itself remaining a
  recessed track;
- compact filter `.chip` controls with a deliberately shallower edge so dense
  filters do not become heavy cards;
- working panels, state cards, mockup frames, and the three live Clay Atlas
  reference scenes using a distinct one-step surface elevation.

Do not apply an outer elevation to table rows, data labels, text, navigation
tabs, fields, or every generic element. Inputs/selects remain recessed
controls, not raised buttons. Markup may be simplified by the companion
`2026-09-09-concise-visual-brandbook-design.md`; no media asset is added.

## Hero simplification

The companion information-architecture design removes the two Hero calls to
action and the `6 / 3 / 1` ledger because they duplicate the persistent index
and Sistema inventory. The structural board becomes the Hero's only
interactive surface. No replacement CTA is added. The Hero copy and board
must remain free of horizontal overflow in both languages through 1080 px.

## Theme and accessibility requirements

- Day and Night use the same geometry and light direction; only paper, ink,
  border, and contact-edge colours adapt.
- Every `box-shadow` introduced or replaced by this system has a zero blur
  radius. No `filter`, `backdrop-filter`, `blur()`, text glow, or neon-style
  colour halo is permitted.
- Primary signal text keeps the existing contrast-safe ink colour. Focus
  remains visible independently of hover and selected state.
- No existing bilingual, keyboard, navigation, tool, or Calm behavior changes
  beyond the visual material state it already exposes.

## Verification

- A red/green source contract rejects nonzero-blur shadow recipes in the
  shared Atlas material controls and asserts removal of the overflowing Hero
  action group.
- Run asset generation, canonical tests, TypeScript, lint, and the Pages
  static build.
- Browser-test ES/EN and Day/Night at 390, 560, 768, 1008, 1080, 1280, and
  1440 px;
  verify no Hero overflow, visible labels, correct control geometry, keyboard
  focus, and no failed requests or console errors.
- Inspect computed styles for the user-reported primary, material, workbench,
  and segmented targets: `filter` and `backdropFilter` must be `none`, and
  their shared outer material shadows must have zero blur radius.
