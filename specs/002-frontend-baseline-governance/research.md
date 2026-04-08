# Phase 0 Research - Baseline Arsitektur Frontend React TypeScript

## Scope

Dokumen ini mengunci keputusan teknis untuk baseline frontend multi-app sebelum implementasi dimulai.
Semua butir NEEDS CLARIFICATION telah diselesaikan pada fase clarify.

## Decision 1: Baseline stack resmi

- Decision: Gunakan React 18+, TypeScript strict, Vite, React Router, TanStack Query, Zustand, Axios wrapper, React Hook Form + Zod, Tailwind CSS v4, Storybook, Vitest + RTL + MSW + Playwright.
- Rationale: Stack ini sesuai konstitusi repo, selaras dengan target testability, dan matang untuk skala multi-app.
- Alternatives considered:
  - Next.js: ditolak untuk baseline karena fokus sekarang CSR multi-app platform dengan orchestration app-level yang eksplisit.
  - Redux Toolkit: ditolak untuk default karena kebutuhan state global ringan lebih cocok dengan Zustand.
  - Cypress/Jest: ditolak sebagai default karena baseline sudah menetapkan Playwright + Vitest.

## Decision 2: Boundary arsitektur dan ownership

- Decision: Terapkan feature-first secara ketat; domain ada di apps/*/src/features, app layer hanya orchestration, reusable lintas app ada di packages/lib_shared.
- Rationale: Meminimalkan duplikasi, memperjelas ownership domain, dan menjaga kesiapan scale-out.
- Alternatives considered:
  - Menempatkan pages di src/pages root app: ditolak karena melanggar boundary dan memperlemah ownership feature.
  - Menaruh reusable di masing-masing app: ditolak karena menghasilkan divergence lintas aplikasi.

## Decision 3: Data layering dan state discipline

- Decision: Wajib alur Page -> Hook -> Service -> Repository -> API Client. Server state dikelola TanStack Query. Client shared state memakai Zustand/Context sesuai scope.
- Rationale: Menjaga separasi concern, memudahkan test per layer, dan menghindari coupling UI ke endpoint mentah.
- Alternatives considered:
  - API call langsung dari page/component: ditolak karena sulit diuji dan melanggar prinsip layered access.
  - Memindahkan cache server ke store global: ditolak karena menyalahi lifecycle server state.

## Decision 4: Token-driven UI dan theming

- Decision: Terapkan hirarki token Atomic/Base -> Semantic/Alias -> Component -> UI; konsumsi feature/shared UI wajib via semantic/component token.
- Rationale: Konsistensi visual lintas brand/mode dan pencegahan hardcoded visual literals.
- Alternatives considered:
  - Hardcoded style values di komponen: ditolak karena melanggar governance token.
  - CSS Modules sebagai default: ditolak karena baseline memilih Tailwind v4 sebagai consumption layer token.

## Decision 5: Auth/session storage strategy

- Decision: Access token dan refresh token disimpan di localStorage/sessionStorage melalui abstraction layer auth terpusat.
- Rationale: Selaras hasil clarify dan memungkinkan kontrol lifecycle token lintas app secara konsisten.
- Alternatives considered:
  - HttpOnly cookie default: tidak dipilih untuk baseline ini karena keputusan clarify menetapkan browser storage.
  - Bebas per-app: ditolak karena menimbulkan variasi keamanan dan maintenance.

## Decision 6: Security, observability, dan compliance baseline

- Decision: Wajib CSP ketat, token rotation, expiry access token pendek, logout cleanup; observability terpusat (error tracking + Web Vitals + structured logs + traceId propagation); privacy wajib (PII masking + consent tracking + retention policy terpusat).
- Rationale: Menyeimbangkan operability dan kontrol risiko pada baseline lintas aplikasi.
- Alternatives considered:
  - Observability parsial tanpa traceId: ditolak karena sulit korelasi client-to-API.
  - Compliance ditunda: ditolak karena meningkatkan risiko data leakage sejak fase awal.

## Decision 7: Browser support dan performance target

- Decision: Dukungan browser evergreen modern (Chrome, Edge, Firefox, Safari) dua versi mayor terakhir. Target p75 Web Vitals alur kritikal: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.
- Rationale: Target ini realistis untuk baseline modern dan memberi KPI kualitas yang terukur.
- Alternatives considered:
  - Tanpa target numerik performa: ditolak karena tidak enforceable di delivery gate.
  - Browser support terlalu luas termasuk legacy: ditolak agar kompleksitas baseline tetap terkendali.

## Resolved Clarifications

- Browser support minimum: evergreen modern, 2 versi mayor terakhir.
- Auth/session default: token di localStorage/sessionStorage.
- Observability minimum: error tracking + Web Vitals + structured logs + traceId.
- Privacy/compliance minimum: PII masking + consent tracking + retention policy.
- Performance target default: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 (p75).

## Final Research Outcome

Semua keputusan kunci untuk fase desain dan kontrak telah ditetapkan.
Tidak ada item NEEDS CLARIFICATION tersisa.
