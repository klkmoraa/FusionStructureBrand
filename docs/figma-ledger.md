# FusionStructure · Brandbook 2026 — Figma ledger

Updated: 2026-09-08

Canonical handoff for the editable, continuous brandbook. The legacy web
capture and detached component-kit frames were removed after their useful
coverage was rebuilt inside the single master.

## File

- File key: `fItlN7p0jk8AtvPSRaIcAq`
- URL: <https://www.figma.com/design/fItlN7p0jk8AtvPSRaIcAq>
- Page: `116:56` — `FusionStructure · Brandbook 2026 / Single Page`
- Canonical master: `131:62` — `FusionStructure Brandbook 2026 · Single Page / Canonical`
- Master size: 1440 × 20450 px

## Continuous sections

1. `135:62` — Norte / Clay Hero
2. `139:73` — Identidad / Structural Mark
3. `153:71` — Familias / Six Product Brands
4. `148:156` — Color / Semantic Signal Lab
5. `150:156` — Typography / Technical Voice
6. `151:156` — Motion / Structural Choreography
7. `154:71` — Material / Clay Component Lab
8. `155:71` — Iconography / Family Glyphs
9. `156:71` — Patterns / Product Shells
10. `157:71` — References / Editable Mockups
11. `158:71` — Voice / Engineering Copy
12. `159:71` — Handoff / Source of Truth

## Identity

- Canonical geometry: `M8 5h9v38H8z M17 5h24v5.5L17 14z` plus
  `M17 21h17v5L17 30z`.
- The structural F body remains graphite `#14171A` in every day/family
  variant. Only the lower arm changes color. Inverse uses a white body.
- `172:105` — `BrandMark / Mother + Families`, 9 variants:
  mother, analysis, model, civil, project, connections, learning, mono and
  inverse.
- Mother accent: mint `#1AA57A`; night mint: `#53E0B2`.

## Six-family architecture

| Family | Product reference | Accent |
| --- | --- | --- |
| Mother | FusionStructure | `#1AA57A` |
| Analysis | FStructure | `#ED4B46` |
| Model | Space 3D | `#7657D5` |
| Civil | Civil | `#468C09` |
| Project | Project | `#D9720A` |
| Connections | Connections | `#3A72E3` |
| Learning | Learning | `#C94A8F` |

The former 25-surface architecture is retired and appears only in governance
copy documenting the migration.

## Clay System v2

- Directional light is fixed at 315°.
- Twelve local effect styles cover day/night variants of Inset, Raised,
  Floating, Pressed, Sheet and Modal.
- Pressed removes the exterior drop and uses a dual inner cavity.
- Technical tables and dense data remain flat.

## Variables and components

- `VariableCollectionId:3:8` — `FS / Color`, day/night modes. Family
  variables are `brand/mint`, `family/analysis`, `family/model`,
  `family/civil`, `family/project`, `family/connections` and
  `family/learning`.
- Action tokens are distinct from product-family colors:
  `action/primary` `#1AA57A`, `action/primary-hover` `#159A72`,
  `action/primary-pressed` `#148F69`, `focus/ring` `#0E7C60`, plus
  success, info, warning and error state tokens.
- Blue is reserved for Axial, Info and Connections. It is not used for
  primary CTAs or navigation.
- Technical signals use StructureCo CRI-12C sources: axial `#0F95D1`,
  moment `#ED4B46`, shear `#468C09`, deformed `#8B5CF6`, influence
  `#D85AC9` and warning `#D9720A`.
- `205:98` — `Button / Clay System v2`, 24 editable variants:
  four hierarchies × Rest, Hover, Pressed, Focus, Loading and Disabled.
  Rest/Hover/Pressed states include prototype transitions.
- `207:8` — `Surface / Clay v2`, 6 depth variants.
- `207:13` — `Field / Clay v2`, 2 variants.
- `207:18` — `Feedback / Clay v2`, 2 variants.
- `207:27` — `IconButton / Clay v2`, 4 variants.
- `207:34` — `Chip / Clay v2`, 3 variants.
- `207:35` — `Segmented / Clay v2`.
- `155:121` — FamilyGlyph system, 6 editable variants.
- `212:162` — `Application / Brand Mockups v2`, 6 editable variants.
- Six family cards in `153:71` are editable components.
- Final master inventory: 74 components, 9 component sets and 14 canonical
  brand-mark instances.

## Product evidence

Eight raster fills are intentional. Four are declared real product captures:

- `166:69` — FStructure · day
- `166:72` — FStructure · night
- `166:75` — Space 3D · real editor
- `166:78` — FusionStructure web reference

Four are generated concept references with canonical vector brand overlays:

- `212:3` — PPE / helmet and vest
- `212:11` — construction-site signage
- `212:19` — technical report and drawings
- `212:27` — corporate identity and workstation

Their source PNGs are preserved in `docs/brandbook-assets/generated/`.
Section `157:71` also contains six fully editable brand application
components. There is no stock photography.

## Validation record

- Exactly one Figma page and one top-level canonical master.
- Twelve continuous sections, day/night guidance and clay depth hierarchy.
- Eight intentional IMAGE fills only: four real captures and four generated,
  explicitly labelled concept references.
- Remaining `#0F95D1` fills are limited to Axial technical evidence.
- Primary mint with ink is 6.05:1; focus ring on paper is 4.81:1.
- No descendant exceeds its section bounds.
- Legacy frames `108:2` and `110:2` removed.
- No remaining instances depend on deleted legacy components.
- Section screenshots reviewed at high resolution after final consolidation.
- Web smoke evidence remains in
  `brandbook-site/output/playwright/final-audit.json`.
