# Coding Standard

## Scope

Dokumen ini menetapkan standar coding minimal untuk seluruh aplikasi dan package frontend dalam monorepo.

## Naming and File Suffix

- React component: `*.tsx` dengan PascalCase export.
- Hook: `use-*.hook.ts` atau `use*.ts` (prefix `use` wajib).
- Schema: `*.schema.ts`.
- Repository: `*.repository.ts`.
- Service: `*.service.ts`.
- Store: `*.store.ts`.
- Contract test: `*.contract.test.ts`.
- Integration/component test: `*.integration.test.tsx`.

## Layer and Boundary Rules

- Wajib mengikuti urutan data flow: Page -> Hook -> Service -> Repository -> API Client.
- Komponen/page dilarang mengakses API langsung.
- `lib_shared` dilarang import dari app code.
- Konsumsi package/feature lintas boundary wajib via public API (`index.ts`), bukan deep import.

## State and Side Effects

- Server state dikelola oleh TanStack Query.
- Shared client state gunakan Zustand/Context sesuai scope kebutuhan.
- State presentasional tetap lokal pada komponen.
- Side effect eksternal (network/storage/analytics/env) hanya lewat abstraction layer.

## UI and Styling

- Nilai visual hardcoded dilarang pada feature/shared component.
- Gunakan semantic/component token melalui CSS variable bridge.
- Mode `data-color`, `data-typography`, dan `data-foundation` harus tetap kompatibel.

## Error and Observability

- Gunakan model error ternormalisasi sebelum dipresentasikan ke UI.
- Event telemetry wajib melewati sanitizer dan consent guard.
- Payload observability tidak boleh mengandung PII mentah.

## Testing Standards

- Selector priority: `getByRole` -> `getByLabelText` -> `getByText` -> `data-testid`.
- Perubahan perilaku wajib diiringi update test pada layer paling tepat.
- Bug fix produksi wajib menambahkan regression test.

## Pull Request Minimum

- Lolos gate: boundary, lint, typecheck, test, build.
- Tidak memperkenalkan deep import lintas boundary.
- Dokumentasi kontrak diperbarui jika perilaku lintas tim berubah.
