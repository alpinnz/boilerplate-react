<!--
Sync Impact Report
- Version change: 0.0.0-template -> 1.0.0
- Modified principles:
  - PRINCIPLE_1_NAME -> I. Feature-First Modular Architecture
  - PRINCIPLE_2_NAME -> II. Shared Library Governance & Public API Discipline
  - PRINCIPLE_3_NAME -> III. Layered Data Access & State Discipline
  - PRINCIPLE_4_NAME -> IV. Token-Driven UI & Tailwind Consumption
  - PRINCIPLE_5_NAME -> V. Testing, Storybook Contract, and Delivery Gates (NON-NEGOTIABLE)
- Added sections:
  - Technology Baseline & Repository Constraints
  - Delivery Workflow & Quality Enforcement
- Removed sections:
  - None
- Templates requiring updates:
  - ✅ updated: .specify/templates/plan-template.md
  - ✅ updated: .specify/templates/spec-template.md
  - ✅ updated: .specify/templates/tasks-template.md
  - ⚠ pending: .specify/templates/commands/*.md (directory not found)
  - ⚠ pending: README.md, docs/quickstart.md (not found in workspace)
- Follow-up TODOs:
  - None
-->

# Boilerplate React Constitution

## Core Principles

### I. Feature-First Modular Architecture
All domain behavior MUST live under `src/features/<feature-name>`, and page-level composition MUST
stay inside each feature. `app` layers MUST be limited to bootstrap, provider composition, routing,
theme activation, and runtime wiring. `src/pages` and ad-hoc domain logic in app orchestration are
forbidden to preserve clear ownership boundaries and avoid architecture drift.

### II. Shared Library Governance & Public API Discipline
Cross-feature and cross-app reusable capabilities MUST be placed in `packages/lib_shared`, and
`lib_shared` MUST NOT import from app or feature code. Every consumable feature/shared module MUST
publish a stable `index.ts` public API, and deep imports into internal/private paths are forbidden.
This keeps reuse intentional, prevents tight coupling, and protects future extraction/refactor work.

### III. Layered Data Access & State Discipline
Data flow MUST follow `Page -> Hook -> Service -> Repository -> API Client`. Components/pages MUST NOT
call raw endpoints directly. Critical API responses MUST be validated (for example with Zod), and
errors MUST be normalized to a shared shape. Server state MUST use TanStack Query, app/feature shared
client state MUST use scoped Zustand/Context, and local UI state MUST stay local unless a concrete
sharing need is documented.

### IV. Token-Driven UI & Tailwind Consumption
Visual decisions MUST follow `Figma Variables -> CSS Variables -> Semantic Tokens -> Component Tokens ->
Tailwind Consumption -> UI`. Hardcoded visual literals (hex color, raw spacing, raw radius, raw
font-size, literal shadow, arbitrary non-token values) are forbidden in feature and shared UI code.
Tailwind CSS v4 is a consumption layer only, not the source of truth. Semantic tokens are mandatory to
maintain consistency across brand and mode variants.

### V. Testing, Storybook Contract, and Delivery Gates (NON-NEGOTIABLE)
Every change MUST include right-sized automated coverage and pass quality gates before merge:
lint, typecheck, tests, and build. Shared UI changes MUST include Storybook stories covering baseline
states (default, interactive, disabled/loading/error as relevant) and accessibility smoke checks.
Production regressions MUST be backfilled with at least one automated test or story contract to prevent
repeat incidents.

## Technology Baseline & Repository Constraints

The governed baseline is React 18+, TypeScript strict, Vite (CSR default), Tailwind CSS v4,
TanStack Query, Zustand, React Hook Form + Zod, Storybook, Vitest + RTL + MSW, and Playwright.

Repository layout MUST follow monorepo conventions:
- apps in `apps/*`
- shared packages in `packages/*`
- feature-first source structure per app

Environment access MUST go through validated config wrappers (for example `app/core/config/env.ts`);
scattered direct `import.meta.env` usage is forbidden.

## Delivery Workflow & Quality Enforcement

Implementation work MUST start from a spec and plan that explicitly pass constitution gates
(architecture boundary, state choice, API layering, token compliance, testing strategy). PR review MUST
use the project checklist: architecture boundary, readability, state correctness, token/styling
compliance, shared UI contract impact, and delivery safety.

Before merge, each affected app MUST pass CI minimum checks:
1. install dependencies
2. lint
3. typecheck
4. test baseline
5. build

## Governance

This constitution is the highest engineering policy for this repository. Conflicting local conventions
are invalid unless this document is amended.

Amendment process:
1. Submit a PR that includes the proposed constitution diff, rationale, and impacted templates/docs.
2. Classify version impact using semantic versioning policy below.
3. Obtain approval from maintainers responsible for architecture and frontend platform governance.
4. Merge required template/runtime-doc updates in the same change set or track explicit follow-up tasks.

Versioning policy:
- MAJOR: backward-incompatible governance changes, principle removals, or principle redefinitions.
- MINOR: new principle/section or materially expanded mandatory guidance.
- PATCH: clarification, wording improvements, typo fixes, and non-semantic refinements.

Compliance review expectations:
- Every `/speckit.plan` output MUST pass Constitution Check gates before implementation.
- Every `/speckit.spec` and `/speckit.tasks` output MUST map decisions and tasks to constitution rules.
- PR reviews MUST explicitly verify compliance for changed areas.
- Periodic governance review SHOULD be run at least once per quarter; missed reviews MUST be logged with
  owner and due date.

**Version**: 1.0.0 | **Ratified**: 2026-04-07 | **Last Amended**: 2026-04-07
