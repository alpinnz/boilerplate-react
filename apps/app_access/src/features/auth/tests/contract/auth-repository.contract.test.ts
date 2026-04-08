import { describe, expect, it, vi } from 'vitest';
import * as shared from '@repo/lib_shared';
import { requestLogin } from '../../repository/auth.repository';

describe('auth repository contract', () => {
  it('parses login payload with schema and returns token envelope', async () => {
    vi.spyOn(shared, 'loginRequest').mockResolvedValue({
      traceId: 'trace-123',
      data: {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        expiresAt: '2030-01-01T00:00:00Z',
      },
    });

    const result = await requestLogin({ username: 'alice', password: 'secret' });

    expect(result.traceId).toBe('trace-123');
    expect(result.token.accessToken).toBe('access-token');
  });

  it('throws normalized error when request fails', async () => {
    vi.spyOn(shared, 'loginRequest').mockRejectedValue({
      isAxiosError: true,
      message: 'Network down',
      response: undefined,
    });

    await expect(requestLogin({ username: 'alice', password: 'secret' })).rejects.toMatchObject({
      code: 'HTTP_ERROR',
      source: 'network',
    });
  });
});
