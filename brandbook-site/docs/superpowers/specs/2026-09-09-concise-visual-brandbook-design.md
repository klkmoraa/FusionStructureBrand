# Concise Visual Brandbook Design

## Goal

Turn the current long-form brandbook into a faster visual reference without
losing the rules needed to build or review FusionStructure product surfaces.
The final page must feel like a working structural instrument: demonstrate
first, state the rule once, and expose implementation detail only on demand.

This specification is a companion to
`2026-09-09-hard-clay-system-design.md`. The information architecture and the
hard-edge clay material system ship as one release, but remain independently
testable.

## Evidence from the audit

The current document exposes twelve primary navigation stops across five
chapter wrappers and is approximately 29,392 px tall at 1280 px. Its rendered
order is `01, 02, 03, 04, 05, 08, 11, 06, 07, 09, 10, 12`, so the visible
sequence contradicts its numbering. The main copy module is 2,375 lines and
several ideas appear in an introduction, panel note, rule strip, and closing
sentence.

The densest areas are Tools, References, and Identity. References exposes
fifteen compositions at once; Tools exposes roadmap detail before a user asks
for it; Hero repeats navigation with two calls to action and repeats the
system inventory with a `6 / 3 / 1` ledger. English mode also leaks Spanish
strings and one translation changes the intended meaning.

## Information architecture

Replace the twelve-item primary index with eight sequential blocks. Existing
topic anchors remain available for deep links and accessibility, but the
sticky index observes and navigates the eight block wrappers.

| Block | Primary label | Included topics | Primary job |
| --- | --- | --- | --- |
| 01 | Norte | Hero | Establish the promise through the live structural board. |
| 02 | Identidad | Mark construction and lockups | Make correct and incorrect use visually undeniable. |
| 03 | Sistema | Tools and Color | Connect product family, status, and signal semantics. |
| 04 | Lenguaje | Typography, Iconography, and Voice | Show how the system reads, draws, and names. |
| 05 | Interacción | Motion and Material | Demonstrate response, depth, and reduced motion. |
| 06 | Patrones | Desktop, mobile, and four product states | Show the pieces working together. |
| 07 | Casos | References | Compare a small set of canonical product views. |
| 08 | Entrega | Tokens, assets, checks, and ownership | Hand implementation a compact source of truth. |

Each block has one primary heading, one short introduction, one dominant live
demonstration, and one persistent rule. Supporting topics use compact
subheads inside the demonstration instead of another full-width section
introduction. The page does not display the old chapter-intro bands.

## Content grammar

Every always-visible piece of copy must perform exactly one of four jobs:

1. **Name** — a heading or control label.
2. **Orient** — one short sentence before the demonstration.
3. **Measure** — a value, unit, state, or token attached to the visual object.
4. **Rule** — one imperative or declarative guardrail after the demonstration.

Rationale, implementation detail, and roadmap context are disclosed by an
explicit click, not by hover. No essential instruction may exist only inside
a tooltip or animation. Repeated prose is deleted rather than hidden.

The always-visible content budget is:

- exactly eight primary index entries and eight primary block headings;
- no chapter-intro bands, index description paragraph, or duplicated topic
  eyebrow;
- at most two sentences and 180 characters per block introduction in either
  language;
- one persistent rule strip per block;
- no paragraph below a visual that merely restates its labels;
- a final document height no greater than 22,000 px at a 1280 × 843 viewport
  after fonts settle.

## Block decisions

### 01 · Norte

Keep the fixed English signature, one localized lead, the interactive
structural board, and the closing axiom. Remove both Hero calls to action and
the `6 / 3 / 1` ledger because the sticky index already provides navigation
and the inventory appears in Sistema.

### 02 · Identidad

Keep construction geometry, minimum size, clearspace, five approved variants,
lockup selection, and prohibited transformations. Shorten captions to direct
labels and overlay measurements on the mark wherever possible. Remove the
duplicated family inventory. The visible variant count must equal five.

### 03 · Sistema

Combine Tools and Color into one visual matrix. A collapsed tool card exposes
only code, name, family, and status. Selecting it reveals role, current scope,
next step, gate, and reference. A single specimen switches between signal,
family, and status scales; signal definitions live here only. Hide zero-count
status filters while retaining their normative definition in the disclosure.

### 04 · Lenguaje

Use one structural inspector specimen to demonstrate display type, interface
type, numeric data, icon size, mono/color behavior, and voice. Keep the
before/after rewriter, glossary, and non-overpromise disclaimer. Remove the
second signal gallery and repeated prose about drawing rules. Fixed product
terms may remain bilingual only when the rule explicitly names them as fixed.

### 05 · Interacción

Combine the motion demonstration and material levels. The active specimen
shows state change, duration, easing, depth, Day/Night, and Calm without
separate explanatory cards. Keep six material levels and the reduced-motion
contract. Component examples stay only when they reveal a distinct state;
generic duplicate button and table catalogues are removed.

### 06 · Patrones

Keep the desktop and mobile workbench. Integrate empty, processing, error, and
resolved states into that same workbench instead of rendering a second large
state card. Explanatory labels attach to the affected surface.

### 07 · Casos

Replace the simultaneous reference wall with one explorer containing no more
than four canonical CSS/SVG scenes. Controls switch scene, viewport, and
theme. No photograph, generated raster, or downloaded reference asset becomes
part of the repository.

### 08 · Entrega

Keep downloadable/copyable tokens, asset inventory, validation gates,
maturity, and ownership. Show only an 8–12 line token preview while the copy
action retains the complete source. Connect each check to the block that
visually demonstrates it and remove closing prose that restates the checklist.

## Copy and source-of-truth rules

`app/brand/copy.ts` is the single source for all localized visible copy and
ARIA labels. Section components must not provide fallback Spanish title/body
props that are silently overridden. Remove dead local copy arrays once their
rendered equivalent is confirmed in the centralized module.

Spanish and English must have equivalent information, not literal word count.
English mode must contain no unintended Spanish in visible text or ARIA.
The fixed signature `Make complexity legible.` remains unchanged. The English
description for Voice must mean “language that does not overpromise.”

## Interaction and material relationship

The eight-block structure uses the companion hard-edge clay system. Raised,
recessed, selected, and flat treatments communicate interaction hierarchy;
they are not decoration. Removing a paragraph should normally strengthen the
adjacent visual state, label, or measurement rather than create empty space.

Buttons, disclosures, selectors, and workbench tools use zero-blur hard clay.
Tables, data rows, diagrams, rule strips, and passive labels remain flat.
Day/Night change colour only; geometry and upper-left light direction remain
identical. Calm and `prefers-reduced-motion` preserve meaning without motion.

## Accessibility and responsive behavior

- The eight primary index controls scroll to the correct block and expose the
  active block with `aria-current="location"`.
- The twelve legacy topic anchors remain unique and reachable by deep link.
- Disclosures are keyboard operable and never depend on hover.
- Focus remains visible in Day and Night independently of clay shadows.
- At 390, 560, 768, 1008, 1080, 1280, and 1440 px, the page and every control
  satisfy `scrollWidth <= clientWidth`.
- Controls retain a minimum 44 px target when they trigger a primary action;
  compact filters may remain 32–34 px when surrounded by adequate spacing.

## Verification

Source contracts must assert the eight-block inventory, one centralized copy
source, removal of Hero actions/ledger, maximum four reference scenes, and a
token preview capped at twelve lines. Existing canonical family, palette,
asset, and fixed-signature contracts remain.

Browser verification covers both languages, both themes, Active and Calm, all
specified viewports, primary navigation, legacy deep links, disclosures,
keyboard focus, zero horizontal overflow, console errors, and failed requests.
At 1280 × 843 it also records total document height and fails above 22,000 px.

Run asset generation, source contracts, TypeScript, lint, the static Pages
build, and a production smoke test. The public GitHub Page is complete only
when it serves the deployed commit and reproduces the local browser checks.
