# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [e.g., library/cli/web-service/mobile-app/compiler/desktop-app or NEEDS CLARIFICATION]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [ ] Feature-first boundary is preserved (`src/features/*` owns domain logic; `app/*` only orchestration)
- [ ] Reuse placement is explicit (`packages/lib_shared` for cross-app/shared capability; no app-specific code in shared)
- [ ] Public API discipline is defined (`index.ts` exports; no planned deep imports to private internals)
- [ ] Data layering is respected (`Page -> Hook -> Service -> Repository -> API Client`)
- [ ] State strategy is explicit (TanStack Query for server state, scoped Zustand/Context for shared client state, local UI state stays local by default)
- [ ] Styling follows token governance (no hardcoded visual literals; Tailwind v4 used as consumption layer)
- [ ] Shared UI impact is covered (Storybook contract updates and accessibility smoke checks when applicable)
- [ ] Delivery gates are planned (lint, typecheck, test baseline, build all required before merge)

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace this baseline tree with concrete paths for the
  affected app(s) and package(s). The delivered plan must use real directories.
-->

```text
apps/
├── <app_name>/
│   ├── src/
│   │   ├── app/
│   │   │   └── core/
│   │   └── features/
│   └── e2e/
packages/
└── lib_shared/
    └── src/
        ├── ui/
        ├── theme/
        ├── hooks/
        ├── modules/
        └── testing/
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
