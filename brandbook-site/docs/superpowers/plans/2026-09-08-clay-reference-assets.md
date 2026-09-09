# Clay Reference Assets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three generated, zero-blur clay-minimal reference images and a unified physical interaction grammar to the published FusionStructure brandbook without replacing live technical UI.

**Architecture:** Reference stills live under `public/brandbook/clay/` and are rendered only by the existing Atlas Clay reference cards through `publicAsset()`. The interactive sections remain HTML/SVG/CSS; `References.tsx` owns image metadata, `copy.ts` owns bilingual descriptive text, and the existing CSS motion tokens own all physical feedback and reduced-motion behavior.

**Tech Stack:** React 19, TypeScript, Vite static Pages build, CSS custom properties, Node test runner, built-in image generation, Playwright browser QA.

**Spec:** `docs/superpowers/specs/2026-09-08-clay-reference-assets-design.md`

## Global Constraints

- Work only in `brandbook-site/` inside `fusionstructure-web`; Pages must retain the `/fusionstructure-web/` base path.
- Preserve every live analysis board, SVG mark, tool filter, lab, technical value, keyboard flow, and bilingual interaction.
- Never add CSS `blur`, `backdrop-filter`, or visual `filter`; generated stills may not contain readable text, logos, glow, haze, glass, or broad diffuse shadow.
- Use `publicAsset()` for every new public URL, explicit image dimensions, `loading="lazy"`, `decoding="async"`, responsive `sizes`, and localized alt text.
- Do not modify or reuse `public/proposals/clay/`; it remains a local reference set.
- Prefer CSS motion over a new Framer Motion dependency. Physical motion is limited to a one-pixel press/release or short transform-only reveal and must settle immediately in Calm and reduced-motion modes.

---

### Task 1: Lock the generated-image and zero-blur contract with a failing test

**Files:**
- Modify: `test/brandbook-canonical.test.mjs`
- Read: `app/sections/References.tsx`, `app/brand/copy.ts`, `app/atlas.css`, `app/globals.css`
- Expected future assets: `public/brandbook/clay/mark-relief-day.avif`, `public/brandbook/clay/field-editorial-day.avif`, `public/brandbook/clay/results-console-night.avif`

**Interfaces:**
- Consumes: `publicAsset()` in `app/brand/paths.ts` and the existing `CLAY_REFERENCES` render loop.
- Produces: a regression test that fails if a required still, the Pages-safe asset helper, localized image descriptions, or the zero-blur CSS rule disappears.

- [ ] **Step 1: Add the test before creating assets or changing production code.**

  Add `access` from `node:fs/promises`, then append this test:

  ```js
  test('publishes local clay references without visual blur', async () => {
    const [references, copy, atlas, globals] = await Promise.all([
      read('../app/sections/References.tsx'),
      read('../app/brand/copy.ts'),
      read('../app/atlas.css'),
      read('../app/globals.css'),
    ]);
    const assets = [
      '../public/brandbook/clay/mark-relief-day.avif',
      '../public/brandbook/clay/field-editorial-day.avif',
      '../public/brandbook/clay/results-console-night.avif',
    ];

    await Promise.all(assets.map((asset) => access(new URL(asset, import.meta.url))));
    assert.match(references, /import \{ publicAsset \} from '..\/brand\/paths';/);
    assert.match(references, /publicAsset\(item\.image\)/);
    assert.match(references, /loading="lazy"/);
    assert.match(references, /decoding="async"/);
    assert.match(copy, /clayAlt:/);
    assert.doesNotMatch(`${atlas}\n${globals}`, /(?:backdrop-filter|filter:\s*[^n]|\bblur\()/i);
  });
  ```

- [ ] **Step 2: Run the test to verify it fails for the intended missing feature.**

  Run:

  ```sh
  FS_NODE="/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
  "$FS_NODE" --test test/brandbook-canonical.test.mjs
  ```

  Expected: failure from `access()` because `public/brandbook/clay/mark-relief-day.avif` does not exist. Do not proceed if it fails for a syntax error.

- [ ] **Step 3: Commit the red test separately.**

  ```sh
  git add test/brandbook-canonical.test.mjs
  git commit -m "test: define clay reference asset contract"
  ```

### Task 2: Capture the live references and create the three final clay stills

**Files:**
- Create: `public/brandbook/clay/mark-relief-day.avif`
- Create: `public/brandbook/clay/field-editorial-day.avif`
- Create: `public/brandbook/clay/results-console-night.avif`
- Read: `docs/superpowers/specs/2026-09-08-clay-reference-assets-design.md`
- Read: `app/sections/References.tsx`, `app/atlas.css`

**Interfaces:**
- Consumes: current rendered Atlas Clay cards as composition references and the canonical color tokens from the spec.
- Produces: three optimized 4:3 raster assets with no embedded interface copy or brand mark, ready for `publicAsset('/brandbook/clay/<name>.avif')`.

- [ ] **Step 1: Capture source references at their real dimensions.**

  Build the static Pages output, serve it under `/fusionstructure-web/`, and use the browser at 1440 px. Capture the Atlas in Day, then switch to Noche and capture the same section. Store temporary captures outside `public/` so Vite does not deploy them.

  Capture targets:

  ```text
  Day: #referencias .clay-atlas
  Night: #referencias .clay-atlas
  ```

  Verify that each capture contains current live HTML/SVG composition before using it as an image-generation reference.

- [ ] **Step 2: Generate and inspect `mark-relief-day`.**

  Use the Day capture only as a composition reference with this production prompt:

  ```text
  Use case: stylized-concept
  Asset type: 4:3 editorial brandbook reference still
  Input image: current FusionStructure Atlas Clay card, composition reference only
  Primary request: a tactile structural cantilever-F study made from matte mineral paper clay, with a structural grid engraved into the field and small circular joints
  Style/medium: precise premium clay-minimal editorial still, physical but not photorealistic
  Lighting/mood: upper-left contact edge, short crisp lower-right contact shadow, no ambient glow
  Color palette: #F7F6F1 paper, #FFFFFF raised surface, #14171A graphite, restrained #1AA57A mint inlay
  Constraints: 4:3 composition; no readable text; no logo; no watermark; no blur; no depth of field; no haze; no glass; no gradients; no broad soft shadows
  ```

  Inspect the generated result visually. Reject any variant with text, a fabricated FusionStructure mark, blur, a gradient wash, or diffuse photography. Keep the selected master outside `public/` until optimized.

- [ ] **Step 3: Generate and inspect `field-editorial-day`.**

  Use the Day capture only as a composition reference with this prompt:

  ```text
  Use case: stylized-concept
  Asset type: 4:3 editorial brandbook reference still
  Input image: current FusionStructure editorial Atlas card, composition reference only
  Primary request: a molded mineral-paper field containing an engraved engineering grid, a small cantilever member, circular joints, and six distinct small clay color samples arranged with measured spacing
  Style/medium: clean clay-minimal editorial artifact with crisp bevels and quiet negative space
  Lighting/mood: upper-left edge light and short directional contact shadows only
  Color palette: warm paper #F7F6F1, graphite #14171A, mint #1AA57A, coral #ED4B46, violet #7657D5, green #468C09, amber #D9720A, blue #3A72E3, pink #C94A8F
  Constraints: 4:3 composition; no readable text; no letters; no logos; no watermark; no blur; no glow; no depth of field; no glass; no gradients
  ```

- [ ] **Step 4: Generate and inspect `results-console-night`.**

  Use the Night capture only as a composition reference with this prompt:

  ```text
  Use case: stylized-concept
  Asset type: 4:3 editorial brandbook reference still
  Input image: current FusionStructure Atlas Clay night card, composition reference only
  Primary request: a molded graphite physical results console with a recessed structural canvas, abstract axial blue, moment coral, and shear green traces, plus a tiny mint inlay
  Style/medium: precise clay-minimal engineering artifact, matte graphite and charcoal, no simulated screen glass
  Lighting/mood: restrained ambient graphite top-left edge and short black lower-right contact shadows, tactile and high-contrast
  Color palette: #14171A paper, #1B1F22 surface, #53E0B2 mint, blue, coral, and green signals
  Constraints: 4:3 composition; no readable text; no numbers; no logo; no watermark; no blur; no bloom; no haze; no gradients; no glass
  ```

- [ ] **Step 5: Optimize and validate delivery files.**

  Convert only accepted masters to 4:3 AVIF delivery files, set their exact dimensions in the final component, and keep each under 500 KB when the encoder permits. Confirm each file is a real image, not a renamed PNG:

  ```sh
  file public/brandbook/clay/*.avif
  du -h public/brandbook/clay/*.avif
  ```

  If the local encoder cannot produce AVIF, use optimized WebP and update both this plan's expected paths and the red test in the same commit; do not ship large PNGs as a fallback.

- [ ] **Step 6: Re-run the test to prove the asset part is green and commit the assets.**

  Run the test from Task 1. It may still fail only at component integration assertions; confirm the missing-file failure is gone, then commit the accepted binary assets:

  ```sh
  git add public/brandbook/clay
  git commit -m "assets: add clay reference stills"
  ```

### Task 3: Render the stills accessibly and strengthen the tactile motion grammar

**Files:**
- Modify: `app/sections/References.tsx`
- Modify: `app/brand/copy.ts`
- Modify: `app/atlas.css`
- Modify: `app/globals.css`
- Modify: `test/brandbook-canonical.test.mjs` only if WebP fallback was necessary in Task 2

**Interfaces:**
- Consumes: the three files from Task 2, `publicAsset()` from `app/brand/paths.ts`, `REFERENCE_COPY[language]`, `--fs-shadow-*`, and `--fs-motion-*` tokens.
- Produces: Pages-safe responsive images, localized descriptions, and physical button/card motion that remains calm/reduced-motion safe.

- [ ] **Step 1: Extend the Atlas metadata and bilingual copy.**

  In `CLAY_REFERENCES`, replace `scene` with stable metadata including:

  ```ts
  image: '/brandbook/clay/mark-relief-day.avif',
  imageKey: 'markRelief',
  width: 1200,
  height: 900,
  ```

  Use the matching names for `fieldEditorial` and `resultsConsole`. Add to both `REFERENCE_COPY.es` and `REFERENCE_COPY.en`:

  ```ts
  clayAlt: {
    markRelief: '...',
    fieldEditorial: '...',
    resultsConsole: '...',
  },
  ```

  The Spanish and English strings describe material, structural cues, and the intended mode. They do not repeat the figure caption verbatim and must never claim text that exists only in the raster.

- [ ] **Step 2: Replace the decorative JSX scenes with semantic images.**

  Import `publicAsset` into `References.tsx`. Replace the three-way `item.scene` conditional with this explicit responsive image contract:

  ```tsx
  <img
    src={publicAsset(item.image)}
    width={item.width}
    height={item.height}
    loading="lazy"
    decoding="async"
    sizes="(max-width: 760px) calc(100vw - 64px), (max-width: 1180px) calc(50vw - 48px), 400px"
    alt={copy.clayAlt[item.imageKey]}
  />
  ```

  Preserve the `figure`, its HTML figcaption, its labels, and the rest of the References product/device gallery.

- [ ] **Step 3: Replace zoom-like image behavior with physical clay feedback.**

  In `app/atlas.css`, make `.clay-reference__image` fixed at `aspect-ratio: 4 / 3`, opaque, and clipped. Remove the image `scale()` hover. Instead, on fine-pointer hover, shift the whole `.clay-reference` by at most `-1px` and use `--fs-shadow-floating`; on active, use `translateY(1px)` and `--fs-shadow-interior`. Retain no transform under `.brandbook--calma` or `prefers-reduced-motion`.

  Also replace the existing shared control active transform:

  ```css
  transform: translateY(1px) scale(0.99);
  ```

  with exactly:

  ```css
  transform: translateY(1px);
  ```

  Preserve the existing 86 px desktop, 38 px tablet, and 34 px mobile control geometry; do not introduce a new animation package or a blur/shadow expansion.

- [ ] **Step 4: Add a transform-only arrival for the reference cards.**

  Add a single `@keyframes atlas-clay-arrive` that moves the card from
  `translateY(8px)` to `translateY(0)` without opacity, filter, or scale.
  Apply it only when `.brandbook:not(.brandbook--calma)` is present; the
  existing global Calm/reduced-motion rules must settle it immediately.

- [ ] **Step 5: Run the focused test to verify the integration turns green.**

  Run:

  ```sh
  FS_NODE="/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
  "$FS_NODE" --test test/brandbook-canonical.test.mjs
  ```

  Expected: all canonical tests pass, including `publishes local clay references without visual blur`.

- [ ] **Step 6: Format, typecheck, and commit the implementation.**

  Run:

  ```sh
  FS_NODE="/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
  FS_NODE_BIN="/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin"
  "$FS_NODE" ./node_modules/typescript/bin/tsc --noEmit
  PATH="$FS_NODE_BIN:$PATH" ./node_modules/.bin/oxfmt app/sections/References.tsx app/brand/copy.ts app/atlas.css app/globals.css test/brandbook-canonical.test.mjs
  PATH="$FS_NODE_BIN:$PATH" ./node_modules/.bin/oxlint
  ```

  Commit:

  ```sh
  git add app/sections/References.tsx app/brand/copy.ts app/atlas.css app/globals.css test/brandbook-canonical.test.mjs
  git commit -m "feat: render tactile clay references"
  ```

### Task 4: Verify static behavior, visual quality, and GH Pages deployment

**Files:**
- Verify: `dist-pages/` (ignored build output)
- Verify: `app/sections/References.tsx`, `app/atlas.css`, `app/globals.css`
- Verify production: `https://klkmoraa.github.io/fusionstructure-web/`

**Interfaces:**
- Consumes: completed asset and integration work from Tasks 2–3.
- Produces: evidence that each new image is delivered under the Pages base path, the modes stay usable, and production serves the current build.

- [ ] **Step 1: Run the full local verification suite.**

  ```sh
  FS_NODE="/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
  FS_NODE_BIN="/Users/crismora/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin"
  "$FS_NODE" scripts/build-brand-assets.mjs
  "$FS_NODE" --test test/brandbook-canonical.test.mjs
  "$FS_NODE" ./node_modules/typescript/bin/tsc --noEmit
  PATH="$FS_NODE_BIN:$PATH" ./node_modules/.bin/oxlint
  NEXT_PUBLIC_BASE_PATH=/fusionstructure-web/ "$FS_NODE" ./node_modules/vite/bin/vite.js build --config vite.pages.config.ts
  ! rg -n -i "\bblur\b|backdrop-filter|filter:" app --glob '*.css'
  ```

- [ ] **Step 2: Perform browser QA against the static Pages build.**

  Serve `dist-pages/` under a local `/fusionstructure-web/` directory and test:

  ```text
  widths: 390, 768, 1280, 1440
  themes: Día and Noche
  languages: ES and EN
  interactions: open/close index, switch theme, switch language, click an Atlas CTA
  assertions: all three <img> URLs return 200, no page error, no 404, no horizontal overflow,
              4:3 images are opaque, controls preserve equal geometry, Calm mode settles motion
  ```

  Save Day/Night Atlas screenshots and visually reject any result with blur,
  glow, visual text inside a generated still, insufficient caption contrast,
  incorrect crop, or a light-themed image unintentionally filtered by Noche.

- [ ] **Step 3: Push and validate the live deployment.**

  ```sh
  git push origin main
  ```

  Wait for both CI and Deploy Brandbook Pages for the pushed SHA to complete.
  Fetch the public URL and confirm it returns HTTP 200, the current CSS/JS
  hashes, and `/fusionstructure-web/brandbook/clay/` assets rather than root
  paths. Run one public browser visit through theme toggle and inspect the
  same no-404/no-overflow checks.

- [ ] **Step 4: Commit only verification-related changes if any are required.**

  No build artifact, screenshot, temporary capture, or generated reject may be
  committed. If verification exposes a source change, return to the relevant
  task, create a failing regression test first, make the minimal fix, and
  repeat this task.
