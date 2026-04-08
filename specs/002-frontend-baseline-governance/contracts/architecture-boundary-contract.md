# Contract: Architecture Boundary and Public API

## Purpose

Menetapkan kontrak boundary untuk app, feature, dan shared modules agar tidak terjadi coupling lintas layer.

## Contract Rules

1. Layer ownership:
   - app layer: bootstrap, providers, router, runtime config, global style entry.
   - feature layer: domain pages/components/hooks/services/repository/schemas/state.
   - shared layer: reusable cross-app capability dalam packages/lib_shared.
2. Forbidden imports:
   - lib_shared tidak boleh import dari apps atau features.
   - feature tidak boleh deep import internals shared module.
   - app tidak boleh menaruh domain logic feature.
3. Public API discipline:
   - setiap feature/module yang dikonsumsi lintas boundary wajib expose index.ts.
   - konsumsi lintas boundary wajib melalui public API.
4. Page placement:
   - seluruh page harus berada pada features/{feature}/pages.
   - src/pages root app dilarang.

## Compliance Signals

- Import lint rules memblok deep import.
- CI check gagal jika pelanggaran boundary ditemukan.
- PR review wajib validasi boundary checklist.

## Consumer

- apps/*
- packages/lib_shared
- tooling lint/config governance
