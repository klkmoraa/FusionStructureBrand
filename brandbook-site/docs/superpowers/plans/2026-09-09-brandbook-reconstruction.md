# Brandbook Reconstruction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish an eight-block, image-free visual brandbook with concise bilingual content and a zero-blur hard-clay material system.

**Architecture:** Keep the twelve topic components and deep-link IDs, but group them under eight observed `atlas-block` wrappers. The first topic in each block owns the full introduction; supporting topics use compact subheads. CSS exposes one canonical hard-clay token family shared by Day and Night, while data surfaces remain flat.

**Tech Stack:** React 19, TypeScript 5.9, CSS, Node test runner, Vite 8, GitHub Actions/Pages.

**Spec:** `docs/superpowers/specs/2026-09-09-concise-visual-brandbook-design.md` and `docs/superpowers/specs/2026-09-09-hard-clay-system-design.md`

## Global Constraints

- Change only `brandbook-site` and its existing repository workflows; do not change the landing page.
- Add no raster, downloaded, or generated image asset.
- Keep all twelve existing topic IDs unique and deep-linkable.
- Render exactly eight primary index controls in sequential order.
- Every material `box-shadow` layer uses a `0` blur radius; no `filter`, `backdrop-filter`, `blur()`, text glow, or neon halo.
- Day and Night keep identical material geometry and light direction.
- Preserve ES/EN, keyboard navigation, focus, Active/Calm, and `prefers-reduced-motion`.
- Work TDD: prove each source contract fails before production edits and passes afterward.

---

### Task 1: Lock the reconstruction contracts

**Files:**
- Modify: `test/brandbook-canonical.test.mjs`

**Interfaces:**
- Consumes: existing `read(path)` helper.
- Produces: source contracts for `BRANDBOOK_BLOCKS`, content pruning, centralized copy, and zero-blur material recipes.

- [ ] **Step 1: Add failing contracts**

Add tests that read `system.ts`, `page.tsx`, `Hero.tsx`, `References.tsx`, `Handoff.tsx`, `ui.tsx`, `atlas.css`, and `globals.css`. Assert eight block IDs, twelve legacy topic IDs, no `hero__actions` or `hero__ledger`, no `MOCKUPS`, `SectionIntro` accepts `compact`, and the Handoff renders `sheet.split('\n').slice(0, 12).join('\n')` while copying `sheet`.

Add a helper that parses every `--shadow-*` and `--fs-shadow-*` declaration and rejects a non-zero third length in each comma-separated layer:

```js
const shadowLayers = (source) =>
  [...source.matchAll(/--(?:fs-)?shadow-[\w-]+:\s*([^;]+);/g)].flatMap(([, value]) =>
    value.split(/,(?![^()]*\))/).map((layer) => layer.trim()),
  );

const blurLength = (layer) => {
  const lengths = [...layer.matchAll(/-?\d*\.?\d+(?:px|rem)/g)].map((match) => match[0]);
  return lengths[layer.startsWith('inset') ? 2 : 2] ?? '0px';
};

for (const layer of shadowLayers(`${atlas}\n${globals}`)) {
  assert.match(blurLength(layer), /^0(?:px|rem)$/);
}
```

- [ ] **Step 2: Run the red suite**

Run:

```bash
/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test test/brandbook-canonical.test.mjs
```

Expected: FAIL on missing blocks, retained Hero/References content, and non-zero shadow blur.

- [ ] **Step 3: Commit the red contracts**

```bash
git add test/brandbook-canonical.test.mjs
git commit -m "test: define concise hard-clay contracts"
```

---

### Task 2: Build eight-block navigation and remove Hero duplication

**Files:**
- Modify: `app/brand/system.ts`
- Modify: `app/brand/copy.ts`
- Modify: `app/page.tsx`
- Modify: `app/sections/Hero.tsx`
- Modify: `app/brand/ui.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `BrandbookBlockId`, `BRANDBOOK_BLOCKS`, `BLOCK_COPY`, and `SectionIntro({ compact?: boolean })`.
- Preserves: `SectionId`, `SECTIONS`, and all twelve topic anchors.

- [ ] **Step 1: Add the block model**

Implement this exact structural interface in `system.ts`:

```ts
export type BrandbookBlockId =
  | 'norte' | 'identidad' | 'sistema' | 'lenguaje'
  | 'interaccion' | 'patrones' | 'casos' | 'entrega';

export const BRANDBOOK_BLOCKS = [
  { id: 'norte', index: '01', sectionIds: ['norte'] },
  { id: 'identidad', index: '02', sectionIds: ['identidad'] },
  { id: 'sistema', index: '03', sectionIds: ['herramientas', 'color'] },
  { id: 'lenguaje', index: '04', sectionIds: ['tipografia', 'iconografia', 'voz'] },
  { id: 'interaccion', index: '05', sectionIds: ['movimiento', 'materia'] },
  { id: 'patrones', index: '06', sectionIds: ['patrones'] },
  { id: 'casos', index: '07', sectionIds: ['referencias'] },
  { id: 'entrega', index: '08', sectionIds: ['entrega'] },
] as const satisfies readonly { id: BrandbookBlockId; index: string; sectionIds: readonly SectionId[] }[];
```

Add localized `BLOCK_COPY` labels/details in `copy.ts`.

- [ ] **Step 2: Render and observe block wrappers**

In `page.tsx`, replace the chapter loop with eight `<div id={`bloque-${block.id}`} className="atlas-block">` wrappers, observe those IDs for the active index, and render the existing topic components inside the declared grouping. The primary index uses `BRANDBOOK_BLOCKS`; legacy topic elements keep their IDs.

- [ ] **Step 3: Add compact supporting intros**

Extend `SectionIntro` with `compact = false`; render `h3` and `.section-intro--compact` when true. Pass `compact` from Color, Iconography, Voice, and Material. Remove duplicate hardcoded fallback copy props where `SECTION_INTROS[index]` exists.

- [ ] **Step 4: Remove Hero actions and ledger**

Delete the `onGoTo` prop, Arrow imports, `.hero__actions`, and `.hero__ledger`. Render `<Hero />` and keep headline, lead, board, and axiom.

- [ ] **Step 5: Add block spacing CSS and run tests**

Use `.atlas-block > .section + .section` to remove repeated top borders and reduce supporting-topic top padding. Run the canonical suite and TypeScript; the navigation/Hero assertions must pass while shadow assertions remain red.

- [ ] **Step 6: Commit**

```bash
git add app/brand/system.ts app/brand/copy.ts app/page.tsx app/brand/ui.tsx app/sections/Hero.tsx app/sections/Color.tsx app/sections/Iconography.tsx app/sections/Voice.tsx app/sections/Material.tsx app/globals.css test/brandbook-canonical.test.mjs
git commit -m "feat: organize brandbook into eight visual blocks"
```

---

### Task 3: Prune content and consolidate demonstrations

**Files:**
- Modify: `app/brand/copy.ts`
- Modify: `app/sections/Identity.tsx`
- Modify: `app/sections/Tools.tsx`
- Modify: `app/sections/Color.tsx`
- Modify: `app/sections/Typography.tsx`
- Modify: `app/sections/Iconography.tsx`
- Modify: `app/sections/Voice.tsx`
- Modify: `app/sections/Motion.tsx`
- Modify: `app/sections/Material.tsx`
- Modify: `app/sections/Patterns.tsx`
- Modify: `app/sections/References.tsx`
- Modify: `app/sections/Handoff.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: eight block wrappers and compact `SectionIntro`.
- Produces: concise visible content with detail available through existing click interactions.

- [ ] **Step 1: Centralize and shorten copy**

Make every block introduction at most two sentences and 180 characters per language. Correct `language that overpromises less` to `language that does not overpromise`; localize visible/ARIA strings in References and Hero. Delete component-local fallback prose that duplicates `copy.ts`.

- [ ] **Step 2: Reduce dense blocks**

Apply the approved decisions: five Identity variants; closed Tool cards show code/name/family/status only; signal definitions appear only in Sistema; zero-count status filters are hidden; the icon signal gallery is removed; Material removes duplicate generic catalogues; Pattern states live inside the workbench.

- [ ] **Step 3: Replace the reference wall**

In `References.tsx`, keep `CLAY_REFERENCES` and add one active-scene selector. Remove `MOCKUPS`, `DeviceStudy`, both simultaneous device figures, and both mockup galleries. Render exactly one scene at a time from a maximum of four CSS/SVG definitions.

- [ ] **Step 4: Shorten Handoff without losing payload**

Use:

```ts
const preview = sheet.split('\n').slice(0, 12).join('\n');
```

Render `preview` in `<pre>` and keep `copyValue(sheet, copy.tokens)` on the action. Remove the closing block and prose that repeats panel labels.

- [ ] **Step 5: Verify density and commit**

Run source tests and TypeScript. In a 1280 × 843 browser, require `document.documentElement.scrollHeight <= 22000` and no horizontal overflow. Commit:

```bash
git add app/brand/copy.ts app/sections app/globals.css test/brandbook-canonical.test.mjs
git commit -m "feat: turn brandbook copy into visual guidance"
```

---

### Task 4: Install the canonical hard-clay material system

**Files:**
- Modify: `app/globals.css`
- Modify: `app/atlas.css`
- Modify: `app/brand/system.ts`
- Modify: `test/brandbook-canonical.test.mjs`

**Interfaces:**
- Produces: `--shadow-raised`, `--shadow-float`, `--shadow-lifted`, `--shadow-inset`, `--shadow-selected`, `--shadow-sheet`, with `--fs-shadow-*` aliases.

- [ ] **Step 1: Replace all material recipes**

Use zero-blur geometry:

```css
--shadow-raised: -2px -2px 0 var(--clay-light), 3px 3px 0 var(--clay-dark), inset 1px 1px 0 var(--clay-light);
--shadow-float: -3px -3px 0 var(--clay-light), 5px 5px 0 var(--clay-dark-strong), inset 1px 1px 0 var(--clay-light);
--shadow-lifted: -4px -4px 0 var(--clay-light), 7px 7px 0 var(--clay-dark-strong);
--shadow-inset: inset 2px 2px 0 var(--clay-dark), inset -2px -2px 0 var(--clay-light);
--shadow-selected: inset 2px 2px 0 var(--clay-dark), inset -1px -1px 0 var(--clay-light), 0 0 0 1px color-mix(in srgb, var(--active-signal) 55%, transparent);
```

Day uses neutral white/dark edges; Night changes only `--clay-light`, `--clay-dark`, and `--clay-dark-strong`. Publish identical values through `MATERIAL_TOKENS` in `system.ts`; make `--fs-shadow-interior/elevated/floating` aliases.

- [ ] **Step 2: Map component states**

Raised: `.top-control`, `.action`, `.ui-button`, `.icon-button`, `.copy-chip`, `.workbench__tool`, panels and mockup shells. Recessed: segmented tracks, fields, searches, and `:active`. Selected: active segmented/chip/picker/tool/index states. Flat: tables, data rows, diagrams, status labels, rule strips, and passive glyph cells.

Remove the Atlas SVG mini-surface rule and dead `.segmented label` selector. Primary actions use a solid signal fill and crisp contact edge; disabled and quiet controls remain flat.

- [ ] **Step 3: Preserve motion/accessibility**

Keep one-pixel press travel, fine-pointer hover lift, focus outline, Calm, and reduced motion. No scale feedback or ambient arrival glow.

- [ ] **Step 4: Run the green suite and commit**

Run canonical tests, TypeScript, and lint. Every hard-clay assertion must pass.

```bash
git add app/globals.css app/atlas.css app/brand/system.ts test/brandbook-canonical.test.mjs
git commit -m "feat: apply zero-blur structural clay"
```

---

### Task 5: Verify responsive behavior and release gates

**Files:**
- Modify: `package.json`
- Modify: `.github/workflows/ci.yml`
- Test: `test/brandbook-canonical.test.mjs`

**Interfaces:**
- Produces: `typecheck` and `verify` scripts; CI verifies generated assets remain clean.

- [ ] **Step 1: Add deterministic scripts**

Add:

```json
"typecheck": "tsc --noEmit --incremental false",
"verify": "npm run brand:assets && git diff --exit-code && npm run test:brandbook && npm run typecheck && npm run lint && npm run build:pages"
```

Run equivalent commands locally with the bundled Node executable.

- [ ] **Step 2: Strengthen CI**

After `npm run brand:assets`, run `git diff --exit-code`; then run tests, typecheck, lint, and Pages build. Do not change the Pages publication target.

- [ ] **Step 3: Browser matrix**

Verify ES/EN × Day/Night × Active/Calm at widths 390, 560, 768, 1008, 1080, 1280, and 1440. Assert no page/control overflow, eight working index links, twelve unique deep links, visible focus, no console errors/failed requests, document height budget, and computed zero-blur shadows for the user-reported control families.

- [ ] **Step 4: Commit**

```bash
git add package.json .github/workflows/ci.yml test/brandbook-canonical.test.mjs
git commit -m "ci: verify concise hard-clay brandbook"
```

---

### Task 6: Review, integrate, deploy, and smoke-test

**Files:**
- Review: all changes from `4df4a48..HEAD`

**Interfaces:**
- Consumes: completed tasks 1–5.
- Produces: reviewed `main`, successful CI/Pages runs, and verified public GitHub Page.

- [ ] **Step 1: Run full local verification**

Run asset generation, clean-diff check, canonical tests, TypeScript, lint, Pages build, and the complete browser matrix.

- [ ] **Step 2: Request whole-branch code and visual review**

Review against both specs; fix every high/medium issue and repeat affected gates.

- [ ] **Step 3: Merge and push**

Merge `feat/hard-clay-system` into `main`, push `origin/main`, and wait for both CI and Pages workflows to finish successfully.

- [ ] **Step 4: Verify production**

Open `https://klkmoraa.github.io/fusionstructure-web/`, confirm it serves the new release, rerun the 1008 px user-reported controls plus mobile/desktop smoke checks, and record final evidence.
