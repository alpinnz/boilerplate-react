# Testing Guideline

## Selector Contract

1. getByRole
2. getByLabelText
3. getByText
4. data-testid (hanya bila perlu)

## Baseline Tools

- Unit/Integration: Vitest + RTL + MSW
- E2E: Playwright
- Visual contract: Storybook

## Data and State Coverage Rules

- Test repository contract parsing untuk respons API kritikal.
- Test integration flow untuk jalur Page -> Hook -> Service -> Repository.
- Pastikan server state (TanStack Query) tidak dipindahkan ke store global.
- Validasi state feature (Zustand/Context) hanya untuk kebutuhan berbagi lintas komponen feature.

## Release Readiness Audit (2026-04-08)

### Browser Matrix

- Target baseline: Chrome, Edge, Firefox, Safari pada dua versi mayor terakhir.
- Status saat ini: scenario E2E tersedia di folder `apps/app_access/e2e/critical-flows`, namun runner browser matrix belum aktif karena Playwright config/dependency belum wired.
- Audit result: **Partially Ready**.

### Performance Gates

- Target baseline p75: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.
- Status saat ini: evaluator dan service baseline tersedia di `packages/lib_shared/src/services/observability/web-vitals.service.ts`.
- Audit result: **Implementation Ready, Pipeline Evidence Pending**.

### Compliance and Observability Gates

- PII masking + consent guard + structured telemetry contract sudah diimplementasikan dan lulus contract tests.
- Trace propagation baseline tersedia melalui trace context + auth API client integration.
- Audit result: **Ready for Integration** (final environment audit tetap wajib pada pipeline release).

### Required Pre-Release Actions

1. Aktifkan Playwright config + dependency dan jalankan smoke browser matrix.
2. Sambungkan collector Web Vitals ke telemetry transport release.
3. Jalankan audit consent + masking pada alur kritikal di environment staging.
