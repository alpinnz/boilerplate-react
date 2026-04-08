# Architecture

## Baseline Overview

- Monorepo dengan apps sebagai boundary runtime.
- packages/lib_shared sebagai source reusable global.
- Feature-first modular architecture untuk seluruh domain.

## Core Rules

- App layer hanya orchestration.
- Domain logic berada di src/features.
- Public API wajib via index.ts.
