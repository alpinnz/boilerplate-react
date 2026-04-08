import { authenticate } from '../repository/auth-session.repository';
import { saveTokenEnvelope, type TokenStorageStrategy } from '../repository/token-storage.repository';
import { type LoginPayload } from '../repository/auth-api-client';

export async function login(payload: LoginPayload, strategy: TokenStorageStrategy = 'localStorage'): Promise<{ traceId: string }> {
  const result = await authenticate(payload);
  saveTokenEnvelope(result.token, strategy);

  return {
    traceId: result.traceId,
  };
}
