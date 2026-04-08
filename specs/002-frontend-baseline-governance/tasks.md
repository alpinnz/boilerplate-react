# Tasks: Baseline Arsitektur Frontend React TypeScript

**Input**: Design documents from /specs/002-frontend-baseline-governance/
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED. Every user story defines unit, contract, integration/component, and where relevant Storybook/E2E coverage.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and workspace scaffolding for monorepo baseline.

- [x] T001 Create workspace manifest and package globs in package.json workspaces field
- [x] T002 Create root scripts and baseline commands in package.json
- [x] T003 [P] Create base TypeScript config in tsconfig.base.json
- [x] T004 [P] Create shared TypeScript package config in packages/ts-config/package.json
- [x] T005 [P] Create shared ESLint config package in packages/eslint-config/package.json
- [x] T006 [P] Create shared Storybook, Tailwind, and Testing package manifests in packages/storybook-config/package.json, packages/tailwind-config/package.json, and packages/testing-config/package.json
- [x] T007 Create app package manifests for app_access, app_accounting, app_pocket, and app_storybook in apps/app_access/package.json, apps/app_accounting/package.json, apps/app_pocket/package.json, and apps/app_storybook/package.json
- [x] T008 Create governance docs skeleton in docs/architecture.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core architecture, boundary, and quality infrastructure that blocks all user stories until complete.

**CRITICAL**: No user story implementation starts before this phase passes.

- [x] T009 Define import boundary and no-deep-import lint rules in packages/eslint-config/src/index.js
- [x] T010 Define forbidden src/pages and src/local root checks in packages/eslint-config/src/rules/no-root-pages.js
- [x] T011 [P] Create shared public API entry for lib_shared in packages/lib_shared/src/index.ts
- [x] T012 [P] Create base API client and normalized error model in packages/lib_shared/src/lib/http-client.ts
- [x] T013 [P] Create env/storage abstraction adapters in packages/lib_shared/src/config/runtime-config.ts
- [x] T014 [P] Create query key and query client conventions in packages/lib_shared/src/repository/query-keys.ts
- [x] T015 Create observability core types and trace context in packages/lib_shared/src/services/observability/trace-context.ts
- [x] T016 Create privacy consent and retention policy config in packages/lib_shared/src/config/privacy-policy.ts
- [x] T017 [P] Create shared testing and MSW baseline in packages/lib_shared/src/testing/msw/server.ts
- [x] T018 Create CI quality gate workflow in .github/workflows/frontend-quality-gates.yml

**Checkpoint**: Foundation ready - user story work can start.

---

## Phase 3: User Story 1 - Menetapkan Baseline Monorepo Frontend (Priority: P1) MVP

**Goal**: Menetapkan struktur app/package final, boundary ownership, dan public API discipline lintas aplikasi.

**Independent Test**: Struktur apps/packages dapat diaudit, boundary lint rule aktif, dan app shell minimal berjalan tanpa src/pages/src/local di root app.

### Tests for User Story 1 (REQUIRED)

- [x] T019 [P] [US1] Add unit tests for boundary rule helpers in packages/eslint-config/tests/unit/no-root-pages.test.ts
- [x] T020 [P] [US1] Add contract tests for public API export discipline in packages/lib_shared/src/tests/contract/public-api.contract.test.ts
- [x] T021 [P] [US1] Add integration test for app shell bootstrap wiring in apps/app_access/src/features/platform-baseline/tests/integration/app-shell-bootstrap.integration.test.tsx
- [x] T022 [P] [US1] Add E2E smoke test for baseline route boot in apps/app_access/e2e/critical-flows/app-shell-smoke.spec.ts

### Implementation for User Story 1

- [x] T023 [P] [US1] Scaffold app source structure for app_access in apps/app_access/src/main.tsx
- [x] T024 [P] [US1] Scaffold app source structure for app_accounting in apps/app_accounting/src/main.tsx
- [x] T025 [P] [US1] Scaffold app source structure for app_pocket in apps/app_pocket/src/main.tsx
- [x] T026 [P] [US1] Scaffold app source structure for app_storybook in apps/app_storybook/src/main.tsx
- [x] T027 [US1] Implement app/core provider composition for app_access in apps/app_access/src/app/app.tsx
- [x] T028 [US1] Implement router wiring and feature page placement baseline in apps/app_access/src/app/core/router/routes.tsx
- [x] T029 [US1] Create shared module skeletons with public APIs in packages/lib_shared/src/modules/auth/index.ts
- [x] T030 [US1] Enforce restricted imports and circular dependency checks in package.json and .github/workflows/frontend-quality-gates.yml
- [x] T031 [US1] Finalize boundary governance docs in docs/boundary-rules.md

**Checkpoint**: User Story 1 works independently and forms MVP baseline.

---

## Phase 4: User Story 2 - Menstandarkan Alur Data, State, dan Integrasi API (Priority: P2)

**Goal**: Menetapkan layer data/state baku dan abstraction usage sehingga page/component tidak mengakses API langsung.

**Independent Test**: Satu alur fitur contoh berjalan penuh melalui Page -> Hook -> Service -> Repository -> API Client, dengan schema validation dan state discipline yang tervalidasi.

### Tests for User Story 2 (REQUIRED)

- [x] T032 [P] [US2] Add unit tests for error normalization and mapper helpers in packages/lib_shared/src/tests/unit/error-normalizer.test.ts
- [x] T033 [P] [US2] Add contract tests for repository response parsing with schema in apps/app_access/src/features/auth/tests/contract/auth-repository.contract.test.ts
- [x] T034 [P] [US2] Add integration test for query-hook-service flow in apps/app_access/src/features/auth/tests/integration/auth-flow.integration.test.tsx
- [x] T035 [P] [US2] Add integration test for server-state vs client-state separation in apps/app_access/src/features/auth/tests/integration/state-scope.integration.test.tsx

### Implementation for User Story 2

- [x] T036 [US2] Implement auth API client abstraction with trace propagation in packages/lib_shared/src/modules/auth/repository/auth-api-client.ts
- [x] T037 [US2] Implement shared auth repository/service layering in packages/lib_shared/src/modules/auth/services/auth-session.service.ts
- [x] T038 [US2] Implement app auth feature hook/service/repository composition in apps/app_access/src/features/auth/hooks/use-login.hook.ts
- [x] T039 [US2] Implement schema validation and API-domain mappers for auth in apps/app_access/src/features/auth/schemas/auth-response.schema.ts
- [x] T040 [US2] Implement query key namespace and invalidation strategy in apps/app_access/src/features/auth/repository/auth-query-keys.ts
- [x] T041 [US2] Implement state scope examples (local/feature/app/shared) in apps/app_access/src/features/auth/state/auth-feature.store.ts
- [x] T042 [US2] Implement browser token storage adapter and session lifecycle handling in packages/lib_shared/src/modules/auth/repository/token-storage.repository.ts
- [x] T043 [US2] Update data/state strategy guidance in docs/testing-guideline.md

**Checkpoint**: User Stories 1 and 2 are independently functional and testable.

---

## Phase 5: User Story 3 - Menetapkan Kontrak UI Token, Storybook, dan Testing (Priority: P3)

**Goal**: Menegakkan token-driven UI, kontrak Storybook, dan baseline testing lintas level termasuk observability/privacy/performance gates.

**Independent Test**: Primitive UI v1 dan story states wajib tersedia, mode theme berfungsi, dan quality gate testing + observability + compliance dapat dijalankan.

### Tests for User Story 3 (REQUIRED)

- [x] T044 [P] [US3] Add unit tests for token mapping and mode selector logic in packages/lib_shared/src/theme/tests/unit/theme-selector.test.ts
- [x] T045 [P] [US3] Add contract tests for observability event sanitization in packages/lib_shared/src/tests/contract/observability-event.contract.test.ts
- [x] T046 [P] [US3] Add integration tests for primitive states rendering in packages/lib_shared/src/ui/tests/integration/primitives-states.integration.test.tsx
- [x] T047 [P] [US3] Add Storybook accessibility smoke tests for shared primitives in packages/lib_shared/src/storybook/tests/a11y/primitives-a11y.test.ts
- [x] T048 [P] [US3] Add E2E sanity flow for per-app variant mode in apps/app_access/e2e/critical-flows/theme-variant-sanity.spec.ts

### Implementation for User Story 3

- [x] T049 [US3] Implement foundation token files in packages/lib_shared/src/theme/foundation/color.tokens.ts
- [x] T050 [US3] Implement semantic and component token mapping in packages/lib_shared/src/theme/semantic/color.semantic.ts
- [x] T051 [US3] Implement theme mode files and CSS variable bridge in packages/lib_shared/src/theme/css/theme-global.css
- [x] T052 [US3] Implement Tailwind token bridge and shared preset in packages/lib_shared/src/theme/tailwind/tailwind-theme-bridge.ts
- [x] T053 [US3] Implement primitive UI components v1 baseline in packages/lib_shared/src/ui/button/button.component.tsx
- [x] T054 [US3] Implement mandatory Storybook states and mode switchers in packages/lib_shared/src/ui/button/button.stories.tsx
- [x] T055 [US3] Implement observability + consent guard middleware in packages/lib_shared/src/services/observability/observability-emitter.ts
- [x] T056 [US3] Implement Web Vitals collection and release-threshold evaluator in packages/lib_shared/src/services/observability/web-vitals.service.ts

**Checkpoint**: All three user stories are independently functional and compliant.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final hardening, documentation completion, and release readiness checks across stories.

- [x] T057 [P] Finalize coding standard and review checklist docs in docs/coding-standard.md
- [x] T058 [P] Add regression policy and bug-to-test trace template in docs/review-checklist.md
- [x] T059 [P] Add token governance final checks in docs/token-governance.md
- [x] T060 Validate quickstart execution path and update verification notes in specs/002-frontend-baseline-governance/quickstart.md
- [x] T061 Run and document final quality gates validation in specs/002-frontend-baseline-governance/checklists/requirements.md
- [x] T062 Perform release readiness audit for browser matrix and performance/compliance gates in docs/testing-guideline.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 (Setup): No dependencies.
- Phase 2 (Foundational): Depends on Phase 1 and blocks all user stories.
- Phase 3 (US1): Depends on Phase 2.
- Phase 4 (US2): Depends on Phase 2 and can run parallel to US1 if staffed.
- Phase 5 (US3): Depends on Phase 2 and can run parallel to US1/US2 if staffed.
- Phase 6 (Polish): Depends on completion of selected user stories.

### User Story Dependencies

- US1 (P1): No dependency on other stories after foundational phase.
- US2 (P2): Independent of US1 business flow, but may reuse shared baseline from US1 outputs.
- US3 (P3): Independent feature value, integrates with shared baseline from US1 and layering from US2.

### Within Each User Story

- Tests are created first and expected to fail before implementation.
- Contract/schema work precedes service integration.
- Core implementation precedes E2E and release checks.

### Parallel Opportunities

- Setup tasks with [P] can run in parallel.
- Foundational tasks with [P] can run in parallel.
- After Foundational checkpoint, US1/US2/US3 can be implemented in parallel by separate contributors.
- Story test tasks with [P] can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Parallel test tasks for US1:
T019, T020, T021, T022

# Parallel implementation tasks for US1 app scaffolding:
T023, T024, T025, T026
```

## Parallel Example: User Story 2

```bash
# Parallel tests for US2:
T032, T033, T034, T035

# Parallel implementation chunks for US2:
T036, T039, T041, T042
```

## Parallel Example: User Story 3

```bash
# Parallel tests for US3:
T044, T045, T046, T047, T048

# Parallel implementation chunks for US3:
T049, T050, T051, T052
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 Setup.
2. Complete Phase 2 Foundational.
3. Complete US1 (Phase 3) and validate independently.
4. Demo baseline monorepo boundary and app shell readiness.

### Incremental Delivery

1. Foundation baseline (Phase 1-2).
2. Deliver US1 as MVP.
3. Deliver US2 for layered data/state discipline.
4. Deliver US3 for token/UI/testing contract hardening.
5. Finish with Phase 6 cross-cutting release checks.

### Parallel Team Strategy

1. Team aligns on Phase 1-2 together.
2. After checkpoint:
   - Engineer A owns US1.
   - Engineer B owns US2.
   - Engineer C owns US3.
3. Converge in Phase 6 for unified release readiness.

---

## Notes

- [P] tasks indicate no file conflict expected and can be developed concurrently.
- [USx] labels map implementation traceability from task to user story.
- Keep public API discipline strict to prevent deep-import regressions.
- Use Storybook and automated tests as contract, not optional documentation.
