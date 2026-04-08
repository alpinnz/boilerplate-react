import { describe, expect, it } from 'vitest';
import { createObservabilityEmitter } from '../../services/observability/observability-emitter';

describe('observability event contract', () => {
  it('blocks non-essential telemetry when consent is missing', () => {
    const events: unknown[] = [];
    const emitter = createObservabilityEmitter({
      app: 'app_access',
      userSessionId: 'session-1',
      isConsentGranted: () => false,
      transport: (event) => events.push(event),
    });

    const emitted = emitter.emit({
      level: 'info',
      event: 'ui.button.click',
      feature: 'auth',
      payload: {
        email: 'alice@example.com',
      },
    });

    expect(emitted).toBeNull();
    expect(events).toHaveLength(0);
  });

  it('masks sensitive fields and emits essential error events', () => {
    const events: ReturnType<ReturnType<typeof createObservabilityEmitter>['emit']>[] = [];
    const emitter = createObservabilityEmitter({
      app: 'app_access',
      userSessionId: 'session-2',
      isConsentGranted: () => false,
      transport: (event) => events.push(event),
      now: () => new Date('2026-04-08T10:00:00.000Z'),
    });

    const emitted = emitter.emit({
      level: 'error',
      event: 'auth.login.failed',
      feature: 'auth',
      payload: {
        email: 'alice@example.com',
        accessToken: 'token-value',
        nested: {
          password: 'secret-password',
        },
      },
    });

    expect(emitted).not.toBeNull();
    expect(emitted?.payload).toEqual({
      email: '[MASKED]',
      accessToken: '[MASKED]',
      nested: {
        password: '[MASKED]',
      },
    });
    expect(emitted?.timestamp).toBe('2026-04-08T10:00:00.000Z');
    expect(events).toHaveLength(1);
    expect(events[0]?.traceId).toBeTruthy();
  });
});
