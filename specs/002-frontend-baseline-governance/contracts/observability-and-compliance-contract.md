# Contract: Observability, Privacy, and Compliance

## Purpose

Mendefinisikan kontrak telemetry frontend yang dapat ditelusuri end-to-end sekaligus patuh privacy baseline.

## Event Schema (minimum)

- level: debug | info | warn | error
- event: string
- app: string
- feature: string
- timestamp: ISO datetime
- traceId: string
- userSessionId: string
- payload: object (sanitized)

## Required Behaviors

1. Error tracking terpusat wajib aktif untuk seluruh app.
2. Web Vitals (LCP, INP, CLS) wajib dikirim pada alur kritikal.
3. Structured logs wajib menggunakan schema minimum di atas.
4. traceId wajib dipropagasikan ke API client untuk korelasi client-to-API.
5. PII masking wajib diterapkan sebelum event dikirim.
6. Consent guard wajib memblok telemetry non-essential saat consent tidak valid.
7. Data retention policy telemetry wajib mengikuti kebijakan terpusat.

## Security Constraints

- Tidak boleh mengirim token auth atau data sensitif mentah pada payload event.
- Wajib ada sanitization middleware sebelum emitter.

## Quality Checks

- Contract tests untuk schema event.
- Integration test untuk traceId propagation.
- Compliance smoke test untuk masking dan consent gating.
