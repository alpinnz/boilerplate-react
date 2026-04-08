import { describe, expect, it } from 'vitest';
import { normalizeHttpError } from '../../lib/http-client';
import { mapLoginResponse } from '../../modules/auth/repository/auth-session.mapper';

describe('error normalization and mapper helpers', () => {
  it('normalizes network-like axios errors', () => {
    const normalized = normalizeHttpError({
      isAxiosError: true,
      message: 'Network error',
      response: undefined,
    });

    expect(normalized.code).toBe('HTTP_ERROR');
    expect(normalized.source).toBe('network');
  });

  it('maps and validates login response payload', () => {
    const mapped = mapLoginResponse({
      accessToken: 'access',
      refreshToken: 'refresh',
      expiresAt: '2030-01-01T00:00:00Z',
    });

    expect(mapped.accessToken).toBe('access');
  });
});
