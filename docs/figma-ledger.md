# FusionStructure · Brandbook 2026 — Figma ledger

Updated: 2026-09-08

This is the handoff index for the editable Figma file. IDs are recorded here
so a future pass can inspect or update a node without guessing. By explicit
product direction, the file was consolidated and rebuilt as one continuous
page; the legacy pages were removed after their coverage was reconstructed.

## File

- File key: `fItlN7p0jk8AtvPSRaIcAq`
- URL: <https://www.figma.com/design/fItlN7p0jk8AtvPSRaIcAq>
- Name: `FusionStructure · Brandbook 2026 — Clay Minimal`
- Team: `team::1631916999167126267`

## Pages and boards

| Page | Page ID | Primary frames |
| --- | --- | --- |
| `FusionStructure · Brandbook 2026 / Single Page` | `116:56` | `108:2` editable continuous web; `110:2` Clay System 2026 component kit |

## Editable identity

- `126:101` — `BrandMark / Rebuilt` set: Signal, Mono and Inverse.
- `126:103` — horizontal lockup; `126:111` — signature lockup.
- `126:86` — rebuilt identity, typography and spacing section.
- Canonical geometry: `M8 5h9v38H8z M17 5h24v5.5L17 14z` plus
  `M17 21h17v5L17 30z`.
- Body: `#14171A`; signal arm: `#63C5FF`; wordmark: `FusionStructure`.
- Slogan lockup: `Make complexity legible.` is a fixed English signature in the
  Figma lockup and in every web mode (including the Spanish North-star intro,
  hero and footer); explanatory copy remains bilingual.

## Variables and styles

- `VariableCollectionId:3:8` — `FS / Color`, modes `Día` / `Noche`, 22
  variables (`VariableID:3:12`–`VariableID:3:33`).
- `VariableCollectionId:3:9` — `FS / Space`, mode `Base`, 8 variables
  (`VariableID:3:34`–`VariableID:3:41`).
- `VariableCollectionId:3:10` — `FS / Shape`, mode `Base`, 4 variables
  (`VariableID:3:42`–`VariableID:3:45`).
- `VariableCollectionId:3:11` — `FS / Motion`, mode `Base`, 3 variables
  (`VariableID:3:46`–`VariableID:3:48`).
- 37 variables total, 22 paint styles and 11 local text styles. The five
  `FS / Type / ...` text styles are Space Grotesk, Inter and IBM Plex Mono.
- All 20 visual top-level board frames bind their background paint to
  `FS / Color → neutral/paper` (`VariableID:3:12`).
- Code syntax uses the matching `--fs-*` variables from the web source,
  including `--fs-neutral-*`, `--fs-radius-*` and `--fs-motion-*` aliases.

## Component inventory

- Single-page clay kit: `112:45` Action / Clay (8 variants), `113:51`
  Card / Clay (3 variants), `114:102` Color Token / FS (15 variants) and six
  editable vector icon components inside `110:2`.
- Rebuilt identity: `126:101` BrandMark (3 variants) plus two lockup
  components. The continuous web frame contains all 12 anchors, five chapters,
  proprietary clay mockups and the full bilingual brand guidance.

## Validation record

- Final API audit: exactly one page, two top-level frames and zero IMAGE fills.
- The web capture is 1280 × 34163 px; the editable kit is 1440 × 3451 px.
- Screenshots reviewed after buttons, cards, tokens, modes and rebuilt identity.
- All former pages were removed only after their required coverage had been
  rebuilt in the continuous web and component kit.
- Web smoke evidence is recorded in
  `brandbook-site/output/playwright/final-audit.json` (390, 768, 1280 and
  1440 px; ES → EN, night theme and mobile index included).
