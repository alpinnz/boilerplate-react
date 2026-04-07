---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED. Every user story MUST define right-sized automated coverage (unit/contract/integration and E2E/Storybook when relevant).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **App source**: `apps/<app>/src/app`, `apps/<app>/src/features`
- **App E2E**: `apps/<app>/e2e`
- **Shared package**: `packages/lib_shared/src/*`
- **Feature tests**: `apps/<app>/src/features/<feature>/tests/{unit,contract,integration}`
- Paths shown below are examples - always replace with actual plan.md paths

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize [language] project with [framework] dependencies
- [ ] T003 [P] Configure linting and formatting tools
- [ ] T004 [P] Establish token/theme and style entry wiring for affected app/package paths

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T005 Define feature boundaries and public API exports (`index.ts`) for affected modules
- [ ] T006 [P] Setup API client/repository/service layering skeleton
- [ ] T007 [P] Configure TanStack Query keys and cache conventions for the feature scope
- [ ] T008 Configure normalized error handling and schema validation helpers
- [ ] T009 Setup environment configuration wrapper usage (no scattered direct env access)
- [ ] T010 [P] Setup Storybook story scaffold for impacted shared UI (if any)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (REQUIRED) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T011 [P] `US1` Unit test for logic/mappers in <real-path>
- [ ] T012 [P] `US1` Contract/schema test for API mapping in <real-path>
- [ ] T013 [P] `US1` Integration/component test for <user-journey> in <real-path>

### Implementation for User Story 1

- [ ] T014 [P] `US1` Implement UI/page/hook flow in <real-path>
- [ ] T015 `US1` Implement service/repository/API client changes in <real-path>
- [ ] T016 `US1` Add schema validation + normalized error mapping in <real-path>
- [ ] T017 `US1` Apply token-compliant styling (no hardcoded visual literals)
- [ ] T018 `US1` Add/Update Storybook stories for impacted shared UI states (if applicable)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (REQUIRED) ⚠️

- [ ] T019 [P] `US2` Unit test for logic/mappers in <real-path>
- [ ] T020 [P] `US2` Contract/schema test for API mapping in <real-path>
- [ ] T021 [P] `US2` Integration/component test for <user-journey> in <real-path>

### Implementation for User Story 2

- [ ] T022 [P] `US2` Implement UI/page/hook flow in <real-path>
- [ ] T023 `US2` Implement service/repository/API client changes in <real-path>
- [ ] T024 `US2` Add schema validation + normalized error mapping in <real-path>
- [ ] T025 `US2` Add/Update Storybook states and accessibility checks (if applicable)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (REQUIRED) ⚠️

- [ ] T026 [P] `US3` Unit test for logic/mappers in <real-path>
- [ ] T027 [P] `US3` Contract/schema test for API mapping in <real-path>
- [ ] T028 [P] `US3` Integration/component test for <user-journey> in <real-path>

### Implementation for User Story 3

- [ ] T029 [P] `US3` Implement UI/page/hook flow in <real-path>
- [ ] T030 `US3` Implement service/repository/API client changes in <real-path>
- [ ] T031 `US3` Add schema validation + normalized error mapping in <real-path>
- [ ] T032 `US3` Add/Update Storybook states and accessibility checks (if applicable)

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Final regression tests for bug-prone paths
- [ ] TXXX Security hardening
- [ ] TXXX Run quickstart.md validation
- [ ] TXXX Verify CI gates pass: lint, typecheck, tests, build

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
