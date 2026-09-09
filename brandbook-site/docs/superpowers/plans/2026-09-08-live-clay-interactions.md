# Live Clay Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the live, image-free Clay Atlas and every shared physical press state without changing the published brandbook’s content model.

**Architecture:** The existing live `ClayRelief`, `EditorialScene`, and `ProductMockup` remain in `References.tsx`. A narrow canonical test replaces the superseded raster-asset contract, while `atlas.css` owns the Atlas card motion and `globals.css` makes Calm/reduced-motion static at the brandbook level.

**Tech Stack:** React 19, TypeScript, CSS custom properties, Node test runner, Vite static Pages build, Playwright browser QA.

**Spec:** `docs/superpowers/specs/2026-09-08-live-clay-interactions-design.md`

## Global Constraints

- Work only in `brandbook-site/` inside `fusionstructure-web`; Pages must retain the `/fusionstructure-web/` base path.
- Add no generated, downloaded, or raster image. Do not modify or reuse `public/proposals/clay/`.
- Preserve every live analysis board, SVG mark, tool filter, lab, technical value, keyboard flow, and bilingual interaction.
- Never add CSS `blur`, `backdrop-filter`, visual `filter`, or `scale(0.99)` press feedback.
- Use existing CSS motion tokens only. Hover and press travel at most one pixel; Calm and reduced-motion states must settle immediately.
- Preserve the 86 px desktop, 38 px tablet, and 34 px mobile control geometry.

---

### Task 1: Replace the superseded image contract with a red live-clay interaction contract

**Files:**
- Modify: `test/brandbook-canonical.test.mjs`
- Read: `app/sections/References.tsx`, `app/atlas.css`, `app/globals.css`

**Interfaces:**
- Consumes: the existing three live Clay Atlas scenes and CSS motion tokens.
- Produces: a regression test that rejects raster Clay Atlas wiring, zoom/scale press feedback, and visual blur while requiring the physical card interaction contract.

- [ ] **Step 1: Replace the asset test before changing production CSS.**

  Remove `access` from the `node:fs/promises` import and replace
  `publishes local clay references without visual blur` with:

  ```js
  test('keeps the live Clay Atlas tactile and image-free', async () => {
    const [references, atlas, globals] = await Promise.all([
      read('../app/sections/References.tsx'),
      read('../app/atlas.css'),
      read('../app/globals.css'),
    ]);

    assert.match(references, /<ClayRelief/);
    assert.match(references, /<EditorialScene/);
    assert.match(references, /<ProductMockup kind="results" compact/);
    assert.doesNotMatch(references, /brandbook\/clay|publicAsset\(/);
    assert.match(atlas, /@keyframes atlas-clay-arrive/);
    assert.match(atlas, /\.clay-reference:hover\s*\{[^}]*translateY\(-1px\)/s);
    assert.match(atlas, /\.clay-reference:active\s*\{[^}]*translateY\(1px\)/s);
    assert.doesNotMatch(
      `${atlas}\n${globals}`,
      /(?:backdrop-filter|filter:\s*[^n]|\bblur\(|scale\(0\.99\))/i,
    );
  });
  ```

- [ ] **Step 2: Prove the contract is red.**

  ```sh
  FS_NODE="/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
  "$FS_NODE" --test test/brandbook-canonical.test.mjs
  ```

  Expected: the new test fails because `atlas-clay-arrive` and the whole-card
  hover/active rules do not exist yet. It must not fail because of missing
  image files or test syntax.

- [ ] **Step 3: Commit the red test.**

  ```sh
  git add test/brandbook-canonical.test.mjs
  git commit -m "test: define live clay interaction contract"
  ```

### Task 2: Make the live Atlas and shared controls physically consistent

**Files:**
- Modify: `app/atlas.css`
- Modify: `app/globals.css`
- Verify unchanged: `app/sections/References.tsx`

**Interfaces:**
- Consumes: the red test from Task 1, `--fs-shadow-elevated`,
  `--fs-shadow-floating`, `--fs-shadow-interior`, `--fs-motion-quick`, and
  `--fs-ease`.
- Produces: tactile live Clay Atlas cards that require no new assets and are
  static in Calm/reduced-motion modes.

- [ ] **Step 1: Add narrow whole-card contact feedback in `app/atlas.css`.**

  Directly after the base `.clay-reference` rule, add a transition for
  `transform` and `box-shadow`, a base `var(--fs-shadow-elevated)` contact
  shadow, and the following interaction rules:

  ```css
  @media (hover: hover) and (pointer: fine) {
    .brandbook:not(.brandbook--calma) .clay-reference:hover {
      box-shadow: var(--fs-shadow-floating);
      transform: translateY(-1px);
    }
  }

  .clay-reference:active {
    box-shadow: var(--fs-shadow-interior);
    transform: translateY(1px);
  }
  ```

  Remove the `.clay-reference:hover img` zoom rule. Do not alter the live
  scene markup or add an image element.

- [ ] **Step 2: Add the transform-only arrival and static overrides.**

  Add exactly one keyframe:

  ```css
  @keyframes atlas-clay-arrive {
    from { transform: translateY(8px); }
    to { transform: translateY(0); }
  }
  ```

  Apply it only to `.brandbook:not(.brandbook--calma) .clay-reference`, with
  a short existing motion token and small stagger offsets for the second and
  third cards. In the existing `prefers-reduced-motion` block, replace the
  image-hover override with rules that set the cards’ `animation` to `none`
  and `transform` to `none` for base, hover, and active states.

- [ ] **Step 3: Normalize every press gesture.**

  Replace this existing shared control declaration in `app/atlas.css`:

  ```css
  transform: translateY(1px) scale(0.99);
  ```

  with exactly:

  ```css
  transform: translateY(1px);
  ```

  Do not change any size, width, height, padding, or breakpoint rule for
  `.top-control` or hero actions.

- [ ] **Step 4: Make Calm and reduced motion unconditionally static in `app/globals.css`.**

  Add `.brandbook--calma .clay-reference`, its hover state, and its active
  state to the existing Calm transform-reset selector group. Add the matching
  three selectors to the existing reduced-motion transform-reset group. They
  must use `transform: none`; the existing global 1 ms motion reset handles
  the arrival animation without a second package.

- [ ] **Step 5: Turn the focused test green, format, typecheck, and lint.**

  ```sh
  FS_NODE="/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
  FS_NODE_BIN="/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin"
  "$FS_NODE" --test test/brandbook-canonical.test.mjs
  "$FS_NODE" ./node_modules/typescript/bin/tsc --noEmit
  PATH="$FS_NODE_BIN:$PATH" ./node_modules/.bin/oxfmt app/atlas.css app/globals.css test/brandbook-canonical.test.mjs
  PATH="$FS_NODE_BIN:$PATH" ./node_modules/.bin/oxlint
  ```

- [ ] **Step 6: Commit the CSS implementation.**

  ```sh
  git add app/atlas.css app/globals.css test/brandbook-canonical.test.mjs
  git commit -m "feat: strengthen live clay interactions"
  ```

### Task 3: Verify the static brandbook and publish the image-free polish

**Files:**
- Verify: `dist-pages/` (ignored build output)
- Verify: `app/sections/References.tsx`, `app/atlas.css`, `app/globals.css`

**Interfaces:**
- Consumes: the live-only Clay Atlas and its Calm/reduced-motion contract.
- Produces: evidence that the GitHub Pages build preserves interaction and has
  no image additions, blur, errors, overflow, or broken controls.

- [ ] **Step 1: Run the complete local suite.**

  ```sh
  FS_NODE="/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
  FS_NODE_BIN="/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin"
  "$FS_NODE" scripts/build-brand-assets.mjs
  "$FS_NODE" --test test/brandbook-canonical.test.mjs
  "$FS_NODE" ./node_modules/typescript/bin/tsc --noEmit
  PATH="$FS_NODE_BIN:$PATH" ./node_modules/.bin/oxlint
  NEXT_PUBLIC_BASE_PATH=/fusionstructure-web/ "$FS_NODE" ./node_modules/vite/bin/vite.js build --config vite.pages.config.ts
  ! rg -n -i "\\bblur\\b|backdrop-filter|filter:" app --glob '*.css'
  ! rg -n "brandbook/clay" app public --glob '!public/proposals/clay/**'
  ```

- [ ] **Step 2: Perform static-browser QA.**

  Serve `dist-pages/` beneath a local `/fusionstructure-web/` directory.
  At 390, 768, 1280, and 1440 px, test Día and Noche in ES and EN. Open and
  close the index, switch theme and language, activate an Atlas CTA, and
  select Calm mode. Assert no page errors, no 404s, no horizontal overflow,
  equal control geometry, no new raster requests, live Atlas scene markup,
  and static Calm/reduced-motion card transforms. Save no screenshot in git.

- [ ] **Step 3: Push only after the branch passes final review.**

  Merge the reviewed branch into `main`, push `main`, wait for CI and Deploy
  Brandbook Pages on the pushed SHA, and verify
  `https://klkmoraa.github.io/fusionstructure-web/` returns 200 with the
  no-404/no-overflow controls intact. Do not commit build output, captures,
  or raster assets.

