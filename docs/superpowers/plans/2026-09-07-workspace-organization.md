# Workspace Organization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish one clear active workspace for the FusionStructure landing, brandbook, and motion while safely removing only reproducible portal artifacts.

**Architecture:** Keep the existing independent repositories intact. Use a root workspace map for navigation and a portal-local map for ownership, commands, boundaries, and validation. Remove generated directories only from the clean, inactive portal checkout.

**Tech Stack:** Markdown, Git, React/Vite portal, Vinext brandbook, HyperFrames motion.

**Spec:** `docs/superpowers/specs/2026-09-07-workspace-organization-design.md`

## Global Constraints

- Keep `Historial-y-Contratos/` untouched because its monolith contains local work and running brandbook processes.
- Preserve all tracked source files, public assets, documentation, Git repositories, and worktrees.
- Delete only Git-ignored generated outputs in `Plataforma/Landing-y-Brandbook/`.
- Do not push or open a pull request.

---

### Task 1: Establish the workspace map

**Files:**
- Create: `../../README.md`
- Create: `docs/WORKSPACE.md`

**Interfaces:**
- Consumes: the existing repository layout and `README.md`/`MIGRATION.md` portal contracts.
- Produces: one workspace entry point and one portal surface map.

- [x] **Step 1: Document the root ownership boundaries**

Write `../../README.md` with the active portal, landing, brandbook, motion,
and historical repository roles.

- [x] **Step 2: Document portal ownership and validation**

Write `docs/WORKSPACE.md` with source paths, generated-output boundaries, and
the narrowest command required to validate each surface.

- [x] **Step 3: Verify document links and paths**

Run: `test -f ../../README.md && test -f docs/WORKSPACE.md`

Expected: both workspace maps exist.

### Task 2: Remove reproducible portal outputs

**Files:**
- Delete: `node_modules/`
- Delete: `dist/`
- Delete: `brandbook-site/node_modules/`
- Delete: `brandbook-site/dist/`
- Delete: `brandbook-site/.next/`
- Delete: `brandbook-site/.wrangler/`

**Interfaces:**
- Consumes: `.gitignore`, `package.json`, and `package-lock.json` for each portal surface.
- Produces: a source-only checkout that can be restored with the documented install/build commands.

- [x] **Step 1: Confirm every candidate is Git-ignored**

Run `git check-ignore` with every exact directory before deletion.

- [x] **Step 2: Remove only the verified portal candidates**

Remove the six explicit directories listed above. Do not traverse into
`../../Historial-y-Contratos/`.

- [x] **Step 3: Verify sources remain and generated outputs are absent**

Run `test -f package.json && test -f brandbook-site/package.json` and confirm
that the six generated directories no longer exist.

### Task 3: Verify the handoff state

**Files:**
- Create: `docs/superpowers/specs/2026-09-07-workspace-organization-design.md`
- Create: `docs/superpowers/plans/2026-09-07-workspace-organization.md`

**Interfaces:**
- Consumes: Git status and the workspace map.
- Produces: a documented and auditable organization baseline.

- [x] **Step 1: Confirm the portal source tree remains clean except for organization docs**

Run: `git status --short`

Expected: only the new documentation files are listed.

- [x] **Step 2: Confirm historical work remains outside this change**

Run `git -C ../../Historial-y-Contratos/Sistema-Anterior-Integrado status --short`.

Expected: its pre-existing changes remain visible and are not modified.

- [x] **Step 3: Record verification results in the handoff**

Report the exact directories removed, source boundaries preserved, and any
verification deliberately not run because dependencies were purged.
