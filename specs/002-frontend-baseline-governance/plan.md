# Implementation Plan: Baseline Arsitektur Frontend React TypeScript

**Branch**: `002-frontend-baseline-governance` | **Date**: 2026-04-08 | **Spec**: `/specs/002-frontend-baseline-governance/spec.md`
**Input**: Feature specification from `/specs/002-frontend-baseline-governance/spec.md`

## Summary

Membangun baseline frontend monorepo React + TypeScript strict untuk multi-app dengan arsitektur feature-first, `lib_shared` sebagai pusat reusable capability, token-driven styling, dan governance testability yang enforceable lewat quality gates. Pendekatan teknis menegakkan layering data (`Page -> Hook -> Service -> Repository -> API Client`), pemisahan state sesuai scope (TanStack Query/Zustand/Context), serta kontrak observability, privacy, dan performance Web Vitals agar implementasi konsisten lintas aplikasi.

## Technical Context

**Language/Version**: TypeScript 5.x (strict), React 18+  
**Primary Dependencies**: Vite, React Router, TanStack Query, Zustand, Axios, React Hook Form, Zod, Tailwind CSS v4, Storybook, Vitest, React Testing Library, MSW, Playwright  
**Storage**: Browser `localStorage`/`sessionStorage` untuk auth token (via abstraction), in-memory query cache, tanpa database frontend  
**Testing**: Vitest + RTL + MSW (unit/integration), Storybook (visual contract), Playwright (E2E)  
**Target Platform**: Browser evergreen modern (Chrome/Edge/Firefox/Safari) dua versi mayor terakhir  
**Project Type**: Monorepo frontend multi-app + shared packages  
**Performance Goals**: p75 Web Vitals alur kritikal: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1  
**Constraints**: Tidak ada `src/pages`/`src/local` di root app, no deep import private internals, no hardcoded visual literals, CSP + token rotation + consent-aware observability, traceId propagation end-to-end  
**Scale/Scope**: 4 aplikasi awal (`app_access`, `app_accounting`, `app_pocket`, `app_storybook`) + `lib_shared` sebagai reuse center lintas aplikasi

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Feature-first boundary is preserved (`src/features/*` owns domain logic; `app/*` only orchestration)
- [x] Reuse placement is explicit (`packages/lib_shared` for cross-app/shared capability; no app-specific code in shared)
- [x] Public API discipline is defined (`index.ts` exports; no planned deep imports to private internals)
- [x] Data layering is respected (`Page -> Hook -> Service -> Repository -> API Client`)
- [x] State strategy is explicit (TanStack Query for server state, scoped Zustand/Context for shared client state, local UI state stays local by default)
- [x] Styling follows token governance (no hardcoded visual literals; Tailwind v4 used as consumption layer)
- [x] Shared UI impact is covered (Storybook contract updates and accessibility smoke checks when applicable)
- [x] Delivery gates are planned (lint, typecheck, test baseline, build all required before merge)

Pre-Phase 0 Gate Result: **PASS**

## Project Structure

### Documentation (this feature)

```text
specs/002-frontend-baseline-governance/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
apps/
├── app_access/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   │   ├── config/
│   │   │   │   ├── providers/
│   │   │   │   ├── router/
│   │   │   │   ├── state/
│   │   │   │   └── styles/
│   │   │   └── app.tsx
│   │   ├── features/
│   │   └── main.tsx
│   └── e2e/
├── app_accounting/
├── app_pocket/
└── app_storybook/
packages/
├── lib_shared/
│   └── src/
│       ├── ui/
│       ├── theme/
│       ├── hooks/
│       ├── lib/
│       ├── services/
│       ├── repository/
│       ├── state/
│       ├── schemas/
│       ├── types/
│       ├── constants/
│       ├── config/
│       ├── testing/
│       ├── storybook/
│       ├── context/
│       └── modules/
│           ├── auth/
│           ├── permission/
│           ├── table/
│           └── upload/
├── eslint-config/
├── ts-config/
├── storybook-config/
├── tailwind-config/
└── testing-config/
docs/
├── architecture.md
├── boundary-rules.md
├── feature-template.md
├── coding-standard.md
├── testing-guideline.md
├── storybook-guideline.md
├── token-governance.md
├── review-checklist.md
└── adr/
```

**Structure Decision**: Menggunakan monorepo `apps/*` + `packages/*` dengan feature-first per app dan `lib_shared` sebagai sumber dependency reusable global. `app/core` dibatasi untuk orchestration runtime. Semua domain page berada pada `features/*/pages` untuk menjaga ownership boundary.

## Phase 0: Research Plan

1. Finalisasi keputusan teknis baseline stack, dependency strategy, dan boundary enforcement lintas app.
2. Finalisasi kontrak keamanan session storage (CSP, token rotation, logout cleanup) dan privacy observability (PII masking, consent, retention).
3. Finalisasi target quality non-fungsional (browser matrix, Web Vitals p75, traceability `traceId`) beserta alternatif yang ditolak.

Output: `research.md` dengan semua keputusan tanpa `NEEDS CLARIFICATION` tersisa.

## Phase 1: Design & Contracts Plan

1. Turunkan model data/kontrak baseline ke entitas plan-level (`data-model.md`) untuk arsitektur, token, observability, compliance, dan quality gates.
2. Definisikan kontrak antarmuka di `contracts/` mencakup boundary module, observability event schema, dan quality gates matrix.
3. Susun `quickstart.md` untuk urutan implementasi Foundation -> Testability -> Scalability Hardening.
4. Jalankan pembaruan agent context agar konteks teknologi tersinkronisasi dengan keputusan plan.

Output: `data-model.md`, `contracts/*`, `quickstart.md`, pembaruan agent context.

## Post-Design Constitution Check

- [x] Feature-first boundary tetap konsisten pada struktur target app/feature.
- [x] Reuse placement tetap di `packages/lib_shared` tanpa dependensi balik dari shared ke app.
- [x] Public API discipline dijaga melalui `index.ts` untuk feature/shared modules.
- [x] Data/state/token/testing gates tetap mengikuti prinsip konstitusi.

Post-Phase 1 Gate Result: **PASS**

## Complexity Tracking

Tidak ada pelanggaran konstitusi yang memerlukan pengecualian pada fase planning ini.
