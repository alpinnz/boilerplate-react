# Token Governance

## Token Hierarchy

- Foundation token: nilai dasar brand/foundation, tidak dikonsumsi langsung oleh feature.
- Semantic token: abstraksi makna UI (surface, text, action, border, state).
- Component token: mapping semantic per komponen.

## Mandatory Rules

- Feature dan shared UI wajib memakai semantic/component token.
- Direct consumption foundation/atomic token dari feature dilarang.
- Hardcoded warna, spacing, radius, dan typography literal dilarang.

## Theme Mode Contract

- Runtime mode harus mendukung atribut:
  - `data-color`
  - `data-typography`
  - `data-foundation`
- Perubahan mode harus menghasilkan update CSS variable bridge tanpa patch manual per komponen.

## Story Contract for Primitive UI

Setiap primitive wajib memiliki state berikut:

- default
- hover/focus
- disabled
- loading
- empty
- error
- success
- mobile
- theme-variant

## Final Token Governance Checks

- [ ] Foundation -> Semantic -> Component mapping tersedia.
- [ ] CSS variable bridge tersedia dan aktif di app shell.
- [ ] Tailwind bridge (atau utility bridge sejenis) mengarah ke CSS variables.
- [ ] Story states mandatory tersedia untuk primitive baru/terdampak.
- [ ] Audit tidak menemukan hardcoded visual literals pada perubahan.

## Change Procedure

1. Tambah/perbarui foundation token.
2. Propagasi ke semantic token.
3. Propagasi ke component token.
4. Perbarui bridge CSS/Tailwind bila dibutuhkan.
5. Perbarui stories + tests + checklist review.
