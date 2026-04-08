# Contract: Quality Gates and Release Readiness

## Purpose

Menetapkan gate wajib sebelum perubahan frontend dapat di-merge.

## Mandatory Gates

1. Lint pass
2. Typecheck pass
3. Test baseline pass (unit/integration sesuai area perubahan)
4. Build pass untuk app/package terdampak
5. Storybook contract check untuk perubahan shared UI
6. Observability and compliance checks (traceId, masking, consent)
7. Web Vitals target review untuk alur kritikal

## Test Selector Policy

Urutan prioritas selector:

1. getByRole
2. getByLabelText
3. getByText
4. data-testid (hanya bila semantik tidak cukup)

## Regression Policy

Setiap bug produksi yang lolos wajib menghasilkan minimal satu coverage baru pada layer yang paling tepat:

- unit
- contract/schema
- integration
- story contract
- e2e

## Acceptance Thresholds

- Browser support: evergreen modern dua versi mayor terakhir.
- Web Vitals p75 alur kritikal:
  - LCP <= 2.5s
  - INP <= 200ms
  - CLS <= 0.1
- Compliance:
  - 100% event observability alur kritikal lulus PII masking dan consent validation.

## Release Decision

Perubahan dinyatakan release-ready hanya jika semua mandatory gates lulus.
