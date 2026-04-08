import { describe, expect, it } from 'vitest';
import * as publicApi from '../../index';

describe('lib_shared public API contract', () => {
  it('exports expected baseline symbols', () => {
    const requiredExports = [
      'httpClient',
      'normalizeHttpError',
      'getRuntimeConfig',
      'queryKeys',
      'createTraceId',
      'buildTraceHeaders',
      'login',
      'loginRequest',
      'saveTokenEnvelope',
      'clearTokenEnvelope',
    ];

    for (const symbol of requiredExports) {
      expect(publicApi).toHaveProperty(symbol);
    }
  });
});
