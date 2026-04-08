# Quickstart - Implementasi Baseline Frontend Multi-App

## Prerequisites

- Node.js LTS
- yarn
- Git
- Spec-Kit CLI terpasang

## 1. Setup workspace

1. Inisialisasi struktur monorepo apps dan packages sesuai plan.
2. Siapkan package bersama:
   - eslint-config
   - ts-config
   - storybook-config
   - tailwind-config
   - testing-config
3. Siapkan packages/lib_shared sebagai pusat reusable capability.

## 2. Foundation phase

1. Siapkan app shell per app:
   - src/app/core/config
   - src/app/core/providers
   - src/app/core/router
   - src/app/core/state
   - src/app/core/styles
   - src/app/app.tsx
   - src/features
   - src/main.tsx
2. Implement abstraction layer:
   - API client wrapper
   - repository base
   - env config adapter
   - storage adapter
3. Implement token foundation + semantic + component mapping + CSS variable bridge.

## 3. Testability and component standard phase

1. Aktifkan Storybook sebagai kontrak shared UI.
2. Sediakan primitive v1 dan stories wajib.
3. Aktifkan testing baseline:
   - Vitest + RTL
   - MSW
   - Playwright
4. Terapkan selector contract dan pattern loading/empty/error.

## 4. Scalability hardening phase

1. Terapkan restricted imports dan deteksi circular dependency.
2. Finalisasi auth shared capability dan permission helper.
3. Finalisasi dokumen governance di docs.
4. Pastikan gate lint/typecheck/test/build berjalan pada CI.

## 5. Validation checklist

- Boundary feature/app/shared tervalidasi.
- Tidak ada hardcoded visual literals.
- Semua akses data melewati layered data flow.
- Observability dan privacy contract lulus.
- Browser matrix dan target Web Vitals tervalidasi untuk alur kritikal.

## 6. Suggested command flow

1. Generate tasks: /speckit.tasks
2. Implement incrementally per phase output
3. Run CI checks before merge

## 7. Verification Notes (2026-04-08)

- Gate `check:boundaries`: passed.
- Gate `check:cycles`: passed as placeholder command (no detector wired yet).
- Workspace lint traversal: passed on all workspaces.
- Workspace typecheck traversal: passed on all workspaces.
- Workspace test traversal: passed on all workspaces.
- Workspace build traversal: passed on all workspaces.
- Known non-blocking warnings: React Router v7 future flags warning on integration tests.
- Release reminder: define and execute browser-matrix E2E job before production rollout (Playwright config/dependency not yet wired).
