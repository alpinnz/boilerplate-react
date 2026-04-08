# Feature Specification: Baseline Arsitektur Frontend React TypeScript

**Feature Branch**: `002-frontend-baseline-governance`  
**Created**: 2026-04-08  
**Status**: Draft  
**Input**: User description: "FINAL - React TypeScript Frontend Planning (Spec-Kit Ready)"

## Clarifications

### Session 2026-04-08

- Q: Target dukungan browser minimum untuk baseline web ini? → A: Evergreen modern browsers dengan dukungan 2 versi mayor terakhir (Chrome, Edge, Firefox, Safari).
- Q: Standar auth/session default di baseline web? → A: Access token dan refresh token disimpan di localStorage/sessionStorage.
- Q: Standar minimum observability frontend pada baseline? → A: Error tracking terpusat + Web Vitals + structured client logs + propagasi traceId ke API.
- Q: Kebijakan privacy/compliance minimum untuk baseline frontend? → A: PII masking wajib di log/analytics + consent tracking + data retention policy terpusat.
- Q: Target performa Web Vitals default untuk alur kritikal? → A: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 pada p75.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Menetapkan Baseline Monorepo Frontend (Priority: P1)

Sebagai frontend platform lead, saya ingin baseline arsitektur resmi lintas aplikasi ditetapkan dalam struktur repository, aturan boundary, dan kontrak dependency agar onboarding aplikasi/fitur baru konsisten dan tidak terjadi arsitektur ganda.

**Why this priority**: Ini fondasi untuk semua pekerjaan berikutnya. Tanpa baseline ini, konsistensi, skalabilitas multi-app, dan kualitas engineering tidak dapat dijamin.

**Independent Test**: Dapat diuji dengan memverifikasi bahwa struktur folder target, batas app-feature-shared, dan aturan anti deep-import dapat diaudit dari repository tanpa implementasi business feature tambahan.

**Acceptance Scenarios**:

1. **Given** repository baseline sudah dibuat, **When** tim menambahkan aplikasi baru di `apps/`, **Then** aplikasi mengikuti struktur standar `src/app/core`, `src/features`, `src/main.tsx`, dan tidak memiliki `src/pages` atau `src/local` di root app.
2. **Given** modul reusable dibutuhkan lintas app, **When** modul tersebut dibuat, **Then** modul ditempatkan di `packages/lib_shared` dengan `index.ts` sebagai public API dan tanpa deep import ke internal path.
3. **Given** tim melakukan review arsitektur, **When** review checklist dijalankan, **Then** seluruh boundary dependency `lib_shared -> app assembly -> features consumer` tervalidasi sesuai konstitusi.

---

### User Story 2 - Menstandarkan Alur Data, State, dan Integrasi API (Priority: P2)

Sebagai developer fitur, saya ingin pola data dan state yang baku agar implementasi halaman selalu testable, terpisah concern, dan tidak ada akses API/env/storage langsung dari komponen presentasi.

**Why this priority**: Paling besar dampaknya ke maintainability, regresi, dan kemudahan debugging pada skala multi-app.

**Independent Test**: Dapat diuji dengan membuat satu fitur contoh yang melewati alur `Page -> Hook -> Service -> Repository -> API Client`, memakai validasi respons kritikal, serta memisahkan server-state dan UI-state sesuai aturan.

**Acceptance Scenarios**:

1. **Given** sebuah halaman fitur mengambil data backend, **When** implementasi selesai, **Then** halaman tidak memanggil endpoint secara langsung dan seluruh akses network melewati repository serta API client abstraction.
2. **Given** data server di-cache untuk UI, **When** developer menambah state global, **Then** cache server tidak dipindahkan ke global store dan tetap dikelola oleh mekanisme server-state.
3. **Given** ada data respons kritikal, **When** respons diterima, **Then** respons diparse/validasi schema sebelum dipakai UI dan error dinormalisasi ke bentuk bersama.

---

### User Story 3 - Menetapkan Kontrak UI Token, Storybook, dan Testing (Priority: P3)

Sebagai design system engineer dan QA, saya ingin kontrak token-driven UI, story coverage, dan strategi testing lintas level agar konsistensi visual serta kualitas rilis terukur dan dapat dipertahankan.

**Why this priority**: Menjamin konsistensi visual lintas mode/brand/device sekaligus mencegah bug berulang melalui kontrak test dan visual regression.

**Independent Test**: Dapat diuji dengan merilis komponen primitive v1 ke shared UI dengan stories wajib, menjalankan test unit/integration/e2e, dan memastikan aturan selector/testing util/regression policy diterapkan.

**Acceptance Scenarios**:

1. **Given** komponen primitive v1 dibuat, **When** storybook dijalankan, **Then** setiap komponen memiliki story minimal state default, hover/focus, disabled, loading, empty, error, success, mobile, dan theme-variant.
2. **Given** mode token diubah melalui data attributes, **When** UI ditampilkan, **Then** tampilan berubah sesuai mode Color, Typography, dan Foundation tanpa hardcoded visual literal.
3. **Given** bug produksi ditemukan pada alur tertentu, **When** perbaikan dilakukan, **Then** test regresi otomatis untuk alur yang sama wajib ditambahkan sebelum merge.

---

### Edge Cases

- Bagaimana jika aplikasi baru dibuat tetapi tidak memiliki `src/app/core/providers` lengkap saat bootstrap pertama.
- Bagaimana jika sebuah fitur mencoba mengakses token atomic/base secara langsung, bukan semantic/component token.
- Bagaimana jika endpoint mengembalikan payload parsial yang tidak memenuhi schema untuk field kritikal.
- Bagaimana jika route dan query key diduplikasi antar fitur sehingga invalidasi menjadi tidak akurat.
- Bagaimana jika story komponen belum mencakup mode `data-Color`, `data-Typography`, atau `data-Foundation`.
- Bagaimana jika environment variable penting tidak tersedia saat runtime bootstrap.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Sistem HARUS menggunakan baseline runtime React dengan TypeScript strict untuk seluruh aplikasi frontend dalam monorepo ini.
- **FR-002**: Sistem HARUS menggunakan Vite sebagai mekanisme build dan bootstrap aplikasi.
- **FR-003**: Sistem HARUS menyediakan struktur repository resmi: `apps/{app_access, app_accounting, app_pocket, app_storybook}` dan `packages/{lib_shared, eslint-config, ts-config, storybook-config, tailwind-config, testing-config}`.
- **FR-004**: Setiap app HARUS menempatkan source di struktur `src/app/core/{config,providers,router,state,styles}`, `src/app/app.tsx`, `src/features`, `src/main.tsx`.
- **FR-005**: Sistem HARUS melarang keberadaan `src/pages` dan `src/local` di root app.
- **FR-006**: Setiap fitur HARUS mengikuti struktur minimal: `components`, `hooks`, `pages`, `repository`, `schemas`, `services`, `state`, `tests`, `types`, `utils`, `index.ts`.
- **FR-007**: Sistem HARUS menempatkan kapabilitas reusable global di `packages/lib_shared` dengan struktur `ui`, `theme`, `hooks`, `lib`, `services`, `repository`, `state`, `schemas`, `types`, `constants`, `config`, `testing`, `storybook`, `context`, `modules`.
- **FR-008**: Modul inti `auth`, `permission`, `table`, dan `upload` HARUS tersedia sebagai modul resmi di `packages/lib_shared/modules/*` dengan ekspor public API.
- **FR-009**: App layer HARUS dibatasi pada orkestrasi bootstrap, provider composition, router wiring, env wiring, style activation, dan runtime composition.
- **FR-010**: Akses API, storage, analytics, env, auth, session, dan permission HARUS melalui abstraction layer; akses langsung dari page/component DILARANG.
- **FR-011**: Pola data HARUS mengikuti urutan `Page -> Hook -> Service -> Repository -> API Client`.
- **FR-012**: Komponen/page HARUS dilarang memanggil API langsung; repository HARUS bersifat React-agnostic; service HARUS bebas JSX.
- **FR-013**: Query hook HARUS menyembunyikan detail endpoint mentah dari page/component.
- **FR-014**: Respons kritikal HARUS diparse dan divalidasi menggunakan schema sebelum dipakai oleh UI.
- **FR-015**: Server state HARUS dikelola hanya oleh mekanisme server-state; cache server tidak boleh dipindah ke global store.
- **FR-016**: State UI lokal HARUS memakai state lokal komponen; state berbagi fitur/app/cross-app HARUS mengikuti scope resmi dan justifikasi kebutuhan berbagi.
- **FR-017**: Sistem HARUS menggunakan token-driven UI dari atomic/base ke semantic/alias ke component token sebelum konsumsi UI.
- **FR-018**: Fitur HARUS mengonsumsi semantic/component token; konsumsi atomic token langsung dari fitur DILARANG.
- **FR-019**: Sistem HARUS mendukung mode melalui data attributes untuk Color (Access/Accounting/Pocket/Wireframe), Typography (Desktop/Mobile), dan Foundation (Desktop/Mobile).
- **FR-020**: Sistem HARUS menyediakan bridge CSS variable dan integrasi ke layer utility styling agar tidak ada hardcoded visual value.
- **FR-021**: Primitive component v1 HARUS tersedia: Button, Input, Textarea, Select, Checkbox, Switch, Badge, Alert, Modal/Dialog, Table base, Loader, EmptyState, Pagination.
- **FR-022**: Seluruh primitive component HARUS memenuhi baseline aksesibilitas, dukungan variant, semantic/component token, dan story kontrak.
- **FR-023**: Shared UI HARUS memiliki stories untuk state default, hover/focus, disabled, loading, empty, error, success, mobile, dan theme-variant.
- **FR-024**: Strategi testing HARUS menerapkan urutan selector: `getByRole`, `getByLabelText`, `getByText`, dan `data-testid` hanya bila diperlukan.
- **FR-025**: Sistem HARUS menetapkan cakupan test: unit, component/integration dengan mocking jaringan, end-to-end, dan visual contract berbasis Storybook.
- **FR-026**: Utilitas testing bersama HARUS tersedia di `packages/lib_shared/testing`, dan struktur e2e app-level HARUS konsisten per aplikasi.
- **FR-027**: Sistem HARUS melarang hardcoded API base URL, storage key, permission code, route berulang, query key acak, serta mapping error shared yang diduplikasi.
- **FR-028**: Sistem HARUS menegakkan public API lintas package/feature dan melarang deep import ke path privat.
- **FR-029**: Standar coding HARUS mendefinisikan naming/suffix convention minimal: komponen `*.tsx` PascalCase, hook `use*.ts`, schema `*.schema.ts`, repository `*.repository.ts`, service `*.service.ts`, store `*.store.ts`, test `*.test.ts(x)`.
- **FR-030**: Sistem HARUS menyediakan dokumen governance di `docs/` mencakup architecture, boundaries, coding standards, testing guideline, token governance, review checklist, serta ADR.
- **FR-031**: Implementasi HARUS dibagi dalam roadmap 3 fase (Foundation, Testability & Component Standard, Scalability Hardening) dengan kriteria selesai terukur per fase.
- **FR-032**: Baseline web HARUS mendukung browser evergreen modern (Chrome, Edge, Firefox, Safari) dengan cakupan minimum dua versi mayor terakhir pada tiap browser.
- **FR-033**: Baseline auth/session HARUS menggunakan penyimpanan access token dan refresh token pada localStorage/sessionStorage melalui abstraction layer auth terpusat.
- **FR-034**: Karena token disimpan di browser storage, baseline HARUS menerapkan mitigasi keamanan minimum: CSP ketat, rotasi token, expiry pendek untuk access token, dan pembersihan token saat logout/session invalid.
- **FR-035**: Baseline observability HARUS menyediakan error tracking terpusat lintas app dengan konfigurasi dan taxonomy event yang konsisten.
- **FR-036**: Baseline HARUS mengumpulkan metrik Web Vitals utama (LCP, INP, CLS) untuk alur kritikal dan menyediakan jalur pelaporan terstandar.
- **FR-037**: Baseline HARUS menerapkan structured client logs dengan field minimum `level`, `event`, `feature`, `app`, `timestamp`, `traceId`, dan `userSessionId` (tanpa data sensitif langsung).
- **FR-038**: Baseline HARUS mempropagasikan `traceId` dari client ke API client abstraction untuk korelasi observability end-to-end.
- **FR-039**: Baseline HARUS menerapkan PII masking wajib untuk log, analytics event, dan error payload sebelum data dikirim ke backend observability.
- **FR-040**: Baseline HARUS menyediakan consent tracking terpusat dengan status consent yang dapat diaudit lintas app.
- **FR-041**: Baseline HARUS mendefinisikan dan menegakkan data retention policy terpusat untuk log/analytics frontend sesuai kebijakan organisasi.
- **FR-042**: Baseline HARUS menetapkan target performa default pada alur kritikal dengan threshold p75: LCP <= 2.5 detik, INP <= 200 ms, dan CLS <= 0.1.

### Implementation Roadmap & Done Criteria

1. **Phase 1 - Foundation**
   - Selesai bila struktur monorepo target tersedia, boundary app-feature-shared diterapkan, abstraction layer aktif, dan aturan anti-hardcode dasar dapat diaudit.
2. **Phase 2 - Testability & Component Standard**
   - Selesai bila primitive component v1 tersedia di shared UI, stories wajib lengkap, util testing bersama aktif, dan regression policy dijalankan di alur kritikal.
3. **Phase 3 - Scalability Hardening**
   - Selesai bila dependency governance lintas app stabil, token mode lintas brand/device tervalidasi, aturan public API/no deep import ditegakkan konsisten, dan readiness multi-app terbukti pada onboarding app/feature baru.

## Constitution Alignment *(mandatory)*

### Architecture & Boundaries

- Feature placement: Implementasi domain ditempatkan di `apps/<app>/src/features/<feature>`; halaman berada di dalam folder feature, bukan di root app.
- Shared extraction: Reusable capability lintas fitur/app (auth core, permission, upload, table, shared UI, shared testing utilities) wajib berada di `packages/lib_shared`.
- Public API: Setiap feature/module/package memiliki `index.ts` sebagai kontrak ekspor resmi; deep import ke internals privat dilarang oleh governance.
- Principle mapping: Selaras dengan Prinsip I dan II pada konstitusi (feature-first modular architecture dan shared library governance).

### Data & State Strategy

- Server state: Data server dikelola oleh query hooks dengan query key terstandar per domain, invalidasi berbasis event domain, dan tanpa pemindahan cache server ke global store.
- Client state: Scope state mengikuti kebutuhan berbagi: feature state di feature scope, app-wide state di app scope, cross-app shared state di `lib_shared/state` atau `lib_shared/context`.
- Local UI state: Interaksi presentasional (toggle, input local draft, modal open/close) tetap pada scope komponen.
- Principle mapping: Selaras dengan Prinsip III pada konstitusi (layered data access & state discipline).

### API Contract & Validation

- Layering: Wajib memakai alur `Page -> Hook -> Service -> Repository -> API Client` untuk setiap interaksi data.
- Validation: Semua payload kritikal (auth/session, permission, daftar tabel utama, upload result, konfigurasi runtime) divalidasi schema sebelum dipakai.
- Error model: UI mengonsumsi error terstandar dengan atribut minimal `code`, `message`, `details`, `traceId`, dan `source` agar pemetaan error tidak berulang.
- Session handling: Modul auth menggunakan token dari localStorage/sessionStorage melalui adapter terstandar agar lifecycle login, refresh, dan logout konsisten lintas app.
- Privacy controls: Seluruh event logging/analytics/error wajib melalui sanitization dan consent guard agar tidak mengirim PII tanpa izin valid.
- Principle mapping: Selaras dengan Prinsip III.

### Token & Styling Compliance

- Token path: Konsumsi visual wajib melalui semantic/component token; atomic/base hanya dikelola oleh layer theme foundation.
- Tailwind usage: Utility styling hanya sebagai layer konsumsi token dengan CSS variable bridge; hardcoded literal visual dilarang.
- Theme impact: Semua komponen dan halaman yang terdampak diverifikasi pada mode `data-Color`, `data-Typography`, dan `data-Foundation`.
- Principle mapping: Selaras dengan Prinsip IV.

### Testing & Quality Gates

- Planned tests: Unit untuk util/service/repository, integration untuk page-hook-service dengan mocking jaringan, story contract untuk shared UI, dan E2E untuk alur utama per app.
- Regression policy: Setiap bug produksi harus menghasilkan minimal satu test regresi otomatis pada layer paling tepat (unit/integration/e2e/story contract).
- CI gates: Perubahan hanya siap merge jika lulus lint, typecheck, test, dan build pada app/package terdampak.
- Testing strategy alignment: Urutan selector pengujian wajib memprioritaskan role/label/text sebelum `data-testid`; util test bersama wajib dipakai ulang antar fitur.
- Observability gates: Alur kritikal wajib tervalidasi mengirim event error/performance/log terstruktur dengan `traceId` yang dapat ditelusuri.
- Performance gates: Monitoring field data untuk alur kritikal harus dievaluasi terhadap target Web Vitals p75 sebelum rilis mayor.
- Principle mapping: Selaras dengan Prinsip V.

### Key Entities *(include if feature involves data)*

- **AppShell Contract**: Mendefinisikan komposisi app layer (bootstrap, provider, router, env, styles, runtime) dan batas orkestrasi non-domain.
- **FeatureModule Contract**: Mendefinisikan struktur wajib fitur, public API `index.ts`, dan relasi dependency ke shared package.
- **SharedCapability Module**: Kapabilitas reusable di `lib_shared` (auth, permission, table, upload, UI, testing) yang dikonsumsi app/feature.
- **TokenSet Hierarchy**: Kumpulan token atomic/base, semantic/alias, component, dan mode attributes yang menjadi sumber styling lintas app.
- **DataAccess Pipeline**: Entitas alur Page-Hook-Service-Repository-API Client beserta aturan validasi respons dan normalisasi error.
- **QualityGate Matrix**: Kontrak kualitas linting, type safety, automated test, visual contract, dan build readiness sebelum merge.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% aplikasi target mengikuti struktur source dan boundary resmi tanpa `src/pages`/`src/local` pada root app.
- **SC-002**: 100% endpoint akses data di fitur baru melewati abstraction layer dan tidak ditemukan pemanggilan API langsung dari page/component saat review.
- **SC-003**: Minimal 95% komponen shared primitive v1 memiliki story lengkap sesuai state kontrak dan tervalidasi pada mode Color, Typography, dan Foundation.
- **SC-004**: Minimal 90% bug produksi prioritas medium-ke-atas mendapatkan test regresi otomatis pada rilis berikutnya.
- **SC-005**: Waktu onboarding app baru ke baseline arsitektur turun menjadi maksimal 1 hari kerja sejak inisialisasi hingga lolos quality gate minimum.
- **SC-006**: 100% pull request pada area frontend platform lolos quality gate wajib (lint, type safety, automated test, build) sebelum merge.
- **SC-007**: 100% alur kritikal lintas app lulus smoke validation pada matrix browser evergreen modern dua versi mayor terakhir.
- **SC-008**: Minimal 95% error production severity tinggi memiliki jejak korelasi lintas client-to-API melalui `traceId` pada dashboard observability.
- **SC-009**: 100% event observability frontend pada alur kritikal lulus validasi PII masking dan consent compliance pada audit rilis.
- **SC-010**: Minimal 90% alur kritikal lintas app memenuhi target Web Vitals p75 (LCP <= 2.5s, INP <= 200ms, CLS <= 0.1) pada evaluasi rilis.

## Assumptions

- Repository ini dikelola sebagai monorepo dengan kebijakan dependency workspace terpusat.
- Tim frontend akan menegakkan konstitusi repository sebagai kebijakan engineering tertinggi.
- Kebutuhan SSR/native app tidak termasuk cakupan baseline ini; fokus pada web frontend multi-app.
- Integrasi backend utama tersedia melalui endpoint yang dapat diakses oleh API client abstraction.
- Kebutuhan brand/mode awal mencakup Access, Accounting, Pocket, dan Wireframe sesuai requirement sumber.
- Storybook digunakan sebagai kontrak visual resmi untuk shared UI, bukan sekadar dokumentasi opsional.
- Semua package/app terdampak dapat menjalankan pipeline quality gate pada lingkungan CI yang sama.
