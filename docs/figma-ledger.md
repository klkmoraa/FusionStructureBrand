# FusionStructure · Brandbook 2026 — Figma ledger

Updated: 2026-09-08

This is the handoff index for the editable Figma file. IDs are recorded here
so a future pass can inspect or update a node without guessing. The file is
kept in Drafts and no previous Figma file was deleted.

## File

- File key: `fItlN7p0jk8AtvPSRaIcAq`
- URL: <https://www.figma.com/design/fItlN7p0jk8AtvPSRaIcAq>
- Name: `FusionStructure · Brandbook 2026 — Clay Minimal`
- Team: `team::1631916999167126267`

## Pages and boards

| Page | Page ID | Primary frames |
| --- | --- | --- |
| `00 · Cover` | `0:1` | `5:2` Atlas Cover / 1440 |
| `01 · Foundations` | `3:2` | `5:19` Foundations / 1440; `30:2` Type · Space · Material · Motion |
| `02 · Brand` | `3:3` | `13:2` logo family; `7:60` Brand / 1440; `23:2` identity manual; `33:29` lockups · voice · principles |
| `03 · Semantic UI` | `3:4` | `32:2` component docs; `78:2` complete 14-primitive contract; `39:2` 25-tool inventory |
| `04 · Labs` | `3:5` | `9:2` Labs / 1440; `34:2` Motion · States · Stress |
| `05 · Atlas Web` | `3:6` | `9:42` desktop / 1440; `9:72` mobile / 390; `36:32` annotated mockups |
| `06 · Handoff` | `3:7` | `9:84` Handoff / 1440; `37:2` anchor map; `37:37` token matrix; `49:2` reference benchmarks; `93:2` extended benchmarks |

## Editable identity

- `23:3` — `BrandMark / Canonical / 48u` master component.
- `25:38` — `Lockup / Stacked` component.
- `13:2` — complete logo family board.
- `23:2` — bilingual identity manual: construction, clear space, sizes,
  lockups and six misuse examples.
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

- 25 components, 2 component sets.
- Sets: `7:37` Action and `7:50` StatusPill.
- Primitives: `7:4` BrandMark, `7:7` Surface, `7:10` IndexLink,
  `7:13` ChapterIntro, `7:16` RuleStrip, `7:19` SignalSwatch, `7:22`
  ToolTile, `7:25` ToolCard, `7:28` LabFrame, `7:51` LanguageToggle,
  `7:54` ThemeToggle, `7:57` MotionToggle.
- Logo components: `13:5`, `13:9`, `13:13`, `13:20`, `13:26`, `23:3`,
  `25:38`.

## Validation record

- Top-level overlap audit: zero overlaps on all seven pages.
- Final API audit: 37 variables across four collections, 25 components, two
  component sets, 20 visual top-level board frames bound to the paper token,
  and no invalid variable code syntax. (The API also reports 37 top-level
  nodes because the Semantic UI page intentionally exposes primitive
  components and text specimens alongside its three board frames.)
- Screenshots reviewed for identity, component docs, inventory, Atlas desktop
  and mobile, annotated mockups, anchor map, token matrix and benchmarks.
- No destructive Figma operations were used; old placeholders remain hidden
  where replaced by the canonical mark.
- `93:2` — `Reference benchmarks / Extended · Material 3 · Fluent 2 · NASA · Apple`;
  four editable benchmark cards (`96:2`, `96:9`, `97:2`, `97:9`) plus provenance
  footer (`98:2`–`98:4`). The board records official names and links only; no
  third-party assets were imported.
- Extended benchmark screenshot reviewed after each incremental phase; card
  grid and footer have no visible clipping or overlap.
- Local Clay references are copied to
  `brandbook-site/public/proposals/clay/`; no temporary Figma asset URL is
  used by the web app.
- Web smoke evidence is recorded in
  `brandbook-site/output/playwright/final-audit.json` (390, 768, 1280 and
  1440 px; ES → EN, night theme and mobile index included).
