# Data Model - Baseline Arsitektur Frontend React TypeScript

## Entity: AppShellContract

- Description: Kontrak orchestration level aplikasi.
- Fields:
  - appId (string, required, enum: app_access | app_accounting | app_pocket | app_storybook)
  - providers (array, required)
  - routerConfig (object, required)
  - runtimeConfigRef (string, required)
  - themeSelectorRef (string, required)
- Validation Rules:
  - appId wajib unik per app.
  - Tidak boleh mengandung domain logic feature.
- Relationships:
  - Depends on SharedCapabilityModule.
  - Composes FeatureModule routes.

## Entity: FeatureModuleContract

- Description: Kontrak struktur dan public API untuk satu feature.
- Fields:
  - featureName (string, required)
  - modulePath (string, required)
  - publicApiFile (string, required, default: index.ts)
  - hasPagesFolder (boolean, must be true)
  - hasRepositoryLayer (boolean, must be true)
  - hasSchemasLayer (boolean, must be true)
- Validation Rules:
  - Folder wajib: components, hooks, pages, repository, schemas, services, state, tests, types, utils.
  - Deep import ke internal module dilarang.
- Relationships:
  - Consumes SharedCapabilityModule via public API.
  - Emits QueryContract usage.

## Entity: SharedCapabilityModule

- Description: Modul reusable lintas app dalam lib_shared.
- Fields:
  - moduleName (string, required, enum includes auth | permission | table | upload)
  - scope (string, required, enum: cross-app)
  - publicApiFile (string, required)
  - ownsState (boolean)
  - ownsRepository (boolean)
- Validation Rules:
  - Tidak boleh import dari app/feature.
  - Wajib expose public API stabil.
- Relationships:
  - Used by AppShellContract and FeatureModuleContract.

## Entity: TokenHierarchy

- Description: Hirarki token visual dan mode theming.
- Fields:
  - foundationTokens (object, required)
  - semanticTokens (object, required)
  - componentTokens (object, required)
  - modeSelectors (object, required)
- Validation Rules:
  - Feature/shared UI hanya boleh konsumsi semantic/component token.
  - Atomic/base token hanya boleh dipakai layer mapping foundation/theme.
  - Hardcoded literals visual dilarang.
- Relationships:
  - Applied by UIPrimitiveContract.

## Entity: ThemeModeProfile

- Description: Profil mode tema lintas brand/foundation/typography.
- Fields:
  - colorMode (string, required, enum: GroAccess | GroAccounting | GroPocket | Wireframe)
  - typographyMode (string, required, enum: Desktop | Mobile)
  - foundationMode (string, required, enum: Desktop | Mobile)
- Validation Rules:
  - Harus dikendalikan oleh data attributes konsisten.
- Relationships:
  - References TokenHierarchy.

## Entity: UIPrimitiveContract

- Description: Kontrak komponen primitive shared UI v1.
- Fields:
  - componentName (string, required)
  - variants (array, required)
  - accessibilityBaseline (object, required)
  - storyStates (array, required)
- Validation Rules:
  - Story minimal: default, hover/focus, disabled, loading, empty, error, success, mobile, theme-variant.
- Relationships:
  - Uses TokenHierarchy.
  - Validated by QualityGateResult.

## Entity: QueryContract

- Description: Kontrak query/mutation server state.
- Fields:
  - queryKey (string, required)
  - ownerFeature (string, required)
  - repositoryMethod (string, required)
  - cachePolicy (object, required)
  - invalidationEvents (array, required)
- Validation Rules:
  - Query key tidak boleh acak/duplikat lintas domain tanpa namespace.
  - Endpoint detail tidak boleh bocor ke page/component.
- Relationships:
  - Bound to DataAccessPipeline.

## Entity: SessionTokenEnvelope

- Description: Kontrak token auth di browser storage.
- Fields:
  - accessToken (string, required)
  - refreshToken (string, required)
  - expiresAt (string, required, ISO datetime)
  - storageStrategy (string, required, enum: localStorage | sessionStorage)
- Validation Rules:
  - Harus dikelola lewat auth abstraction.
  - Harus mendukung rotasi token dan cleanup saat logout/session invalid.
- Relationships:
  - Used by SharedCapabilityModule(auth).

## Entity: ObservabilityEvent

- Description: Kontrak event log/error/performance terstruktur.
- Fields:
  - level (string, required, enum: debug | info | warn | error)
  - event (string, required)
  - app (string, required)
  - feature (string, required)
  - traceId (string, required)
  - userSessionId (string, required)
  - payload (object, optional, sanitized)
- Validation Rules:
  - PII wajib dimasking sebelum emit.
  - Consent valid wajib diverifikasi sebelum event analytics dikirim.
- Relationships:
  - Correlates with backend traces via traceId.

## Entity: ConsentRecord

- Description: Status persetujuan user untuk telemetry/analytics.
- Fields:
  - userSessionId (string, required)
  - consentStatus (string, required, enum: granted | denied | partial)
  - consentVersion (string, required)
  - updatedAt (string, required, ISO datetime)
- Validation Rules:
  - Event analytics non-essential hanya boleh dikirim saat consentStatus mengizinkan.
- Relationships:
  - Governs ObservabilityEvent emission.

## Entity: QualityGateResult

- Description: Hasil evaluasi gate delivery per perubahan.
- Fields:
  - lintPass (boolean, required)
  - typecheckPass (boolean, required)
  - testPass (boolean, required)
  - buildPass (boolean, required)
  - webVitalsPass (boolean, required)
  - compliancePass (boolean, required)
- Validation Rules:
  - Semua field wajib true sebelum merge.
- Relationships:
  - Depends on UIPrimitiveContract, QueryContract, ObservabilityEvent.

## State Transitions

## SessionTokenEnvelope lifecycle

- created -> active -> rotating -> active
- active -> expired
- active -> revoked
- expired -> removed
- revoked -> removed

## ConsentRecord lifecycle

- unknown -> granted
- unknown -> denied
- denied -> granted
- granted -> denied
- granted -> partial
- partial -> granted

## QualityGateResult lifecycle

- pending -> running -> passed
- pending -> running -> failed
- failed -> rerun -> passed
