# Review Checklist

## Code Review Gate

- [ ] Boundary app-feature-shared tetap sesuai kontrak.
- [ ] Tidak ada deep import ke internal path package/feature.
- [ ] Data flow tetap mengikuti Page -> Hook -> Service -> Repository -> API Client.
- [ ] Server state tidak dipindahkan ke global store.
- [ ] Tidak ada hardcoded visual literals.
- [ ] Token semantic/component digunakan pada komponen UI.
- [ ] Error handling memakai model normalisasi bersama.
- [ ] Telemetry melewati consent guard + PII masking.

## Test Review Gate

- [ ] Unit/contract/integration tests relevan tersedia untuk perubahan.
- [ ] Test selector policy mengikuti prioritas role/label/text.
- [ ] Snapshot/story kontrak diperbarui untuk perubahan shared UI.
- [ ] E2E/smoke coverage diperbarui untuk alur kritikal terdampak.

## Regression Policy

- Setiap bug produksi severity medium ke atas wajib memiliki regression test sebelum merge.
- Regression test ditempatkan pada layer paling rendah yang dapat mencegah bug terulang.
- Satu bug dapat memiliki lebih dari satu regression test jika memengaruhi lintas layer.

## Bug-to-Test Trace Template

Gunakan template berikut pada PR untuk bug fix:

```md
### Bug-to-Test Trace
- Bug ID:
- Root cause summary:
- Affected flow:
- Added test file(s):
- Test level(s): unit | contract | integration | story | e2e
- Failure before fix (ringkas):
- Pass evidence after fix (ringkas):
```

## Release Readiness Check

- [ ] Browser matrix policy telah dipenuhi atau ada exception yang disetujui.
- [ ] Web Vitals gates sudah dievaluasi pada alur kritikal.
- [ ] Compliance gates (consent, masking, retention) tervalidasi.
