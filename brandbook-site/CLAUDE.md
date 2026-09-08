# Brandbook Site — Atlas Clay–Minimal

## Scope

This site is the editorial brandbook for FusionStructure. It is implemented before the portal landing and must not import code from `src/` or alter the portal while this work is in progress.

## Source of truth

- `app/brand/system.ts`: SectionId, signals, neutrals, families, states, surface levels, motion, type, voice, and handoff data.
- `app/brand/copy.ts`: bilingual copy catalog (`es` / `en`), chapter groupings, status labels, alt text, and ARIA copy.
- `app/globals.css` + `app/atlas.css`: CSS tokens and Atlas layout/component layers.
- `app/sections/`: existing interactive sections. Preserve filters, labs, signal selection, lockups, motion demos, material levels, patterns, rewrites, and token copy.
- `public/proposals/clay/`: the three approved Clay reference images. Keep them local and use descriptive alt text.

## Component and token conventions

Use existing components before adding new ones. Shared UI primitives live in `app/brand/ui.tsx`, marks and glyphs in `app/brand/marks.tsx`, and generated assets in `app/brand/generated/` (do not hand-edit generated files).

Use `--fs-*` tokens for new CSS. The `--n-*`, `--paper`, `--surface`, and legacy aliases remain compatibility aliases for existing sections. Clay depth is functional only: controls, active panels, samples, tool cards, lab frames, and selected references. Do not add decorative shadows to every element.

## Bilingual behavior

The `BrandbookContext` owns `language`, `theme`, `motionMode`, and signal state. Every new user-facing string must be present in `app/brand/copy.ts`. Spanish and English changes must preserve the current section, filters, signal, theme, motion mode, technical values, units, and clipboard payload.

## Figma-to-code flow

The Figma file `FusionStructure · Brandbook 2026 — Clay Minimal` is in Drafts. Preserve existing files. For changes: use the Figma plugin API sequentially, record returned IDs, inspect `get_metadata`/design context, and capture a screenshot after each page or phase. Keep variable names and code syntax aligned to `var(--fs-...)`. Do not use destructive cleanup.

## Assets and accessibility

Use local assets, explicit dimensions, responsive `sizes`, and meaningful alt text. Never commit an expiring Figma MCP asset URL. Preserve visible focus, keyboard navigation, landmark semantics, reduced-motion behavior, and explicit statuses: Disponible, Experimental, Planeado, No comprometido.

## Responsive validation

Review at 390, 768, 1280, and 1440 px in both languages and themes. Confirm the mobile index opens and closes, no horizontal scroll appears, chapter wrappers do not overlap section IDs, images have no 404s, and technical values/units remain unchanged.

## Motion and states

Motion is explanatory, not decorative. Calm mode and `prefers-reduced-motion` must settle content without removing semantic information. Status, signal, family, and theme colors must remain distinct and must never be the only carrier of meaning.

## Commands

Run from `brandbook-site/`:

```sh
PATH="/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH" ./node_modules/.bin/oxlint
PATH="/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH" ./node_modules/.bin/tsc --noEmit
PATH="/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH" ./node_modules/.bin/vinext build
```

The desktop runtime does not expose `npm`/`npx` directly; use the bundled Node path above when validating locally.
