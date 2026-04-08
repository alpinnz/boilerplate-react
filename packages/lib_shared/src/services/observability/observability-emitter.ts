import { defaultPrivacyPolicy, type PrivacyPolicy } from '../../config/privacy-policy';
import { createTraceId } from './trace-context';

const PII_KEY_PATTERN = /(password|token|secret|authorization|email|phone|ssn|session)/i;

export type ObservabilityLevel = 'debug' | 'info' | 'warn' | 'error';

export type ObservabilityEvent = {
  level: ObservabilityLevel;
  event: string;
  app: string;
  feature: string;
  timestamp: string;
  traceId: string;
  userSessionId: string;
  payload: Record<string, unknown>;
  retentionDays: number;
};

export type EmitObservabilityEventInput = {
  level: ObservabilityLevel;
  event: string;
  feature: string;
  payload?: Record<string, unknown>;
  traceId?: string;
  essential?: boolean;
};

export type ObservabilityEmitterConfig = {
  app: string;
  userSessionId: string;
  isConsentGranted: () => boolean;
  transport?: (event: ObservabilityEvent) => void;
  policy?: PrivacyPolicy;
  now?: () => Date;
};

function sanitizeValue(value: unknown, policy: PrivacyPolicy): unknown {
  if (!policy.piiMaskingEnabled) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item, policy));
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const sanitized = Object.entries(record).reduce<Record<string, unknown>>((accumulator, [key, nestedValue]) => {
      if (PII_KEY_PATTERN.test(key)) {
        accumulator[key] = '[MASKED]';
      } else {
        accumulator[key] = sanitizeValue(nestedValue, policy);
      }
      return accumulator;
    }, {});

    return sanitized;
  }

  return value;
}

export function sanitizeObservabilityPayload(
  payload: Record<string, unknown> | undefined,
  policy: PrivacyPolicy = defaultPrivacyPolicy,
): Record<string, unknown> {
  if (!payload) {
    return {};
  }

  return sanitizeValue(payload, policy) as Record<string, unknown>;
}

export function createObservabilityEmitter(config: ObservabilityEmitterConfig) {
  const transport = config.transport ?? (() => undefined);
  const policy = config.policy ?? defaultPrivacyPolicy;
  const now = config.now ?? (() => new Date());

  return {
    emit(input: EmitObservabilityEventInput): ObservabilityEvent | null {
      const consentGranted = config.isConsentGranted();
      const isEssential = input.essential ?? input.level === 'error';

      if (!consentGranted && !isEssential) {
        return null;
      }

      const event: ObservabilityEvent = {
        level: input.level,
        event: input.event,
        app: config.app,
        feature: input.feature,
        timestamp: now().toISOString(),
        traceId: input.traceId ?? createTraceId(),
        userSessionId: config.userSessionId,
        payload: sanitizeObservabilityPayload(input.payload, policy),
        retentionDays: policy.retentionDays,
      };

      transport(event);
      return event;
    },
  };
}
