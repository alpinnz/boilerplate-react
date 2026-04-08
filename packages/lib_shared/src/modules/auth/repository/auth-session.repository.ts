import { loginRequest, type LoginPayload } from './auth-api-client';
import { type LoginResponse } from '../schemas/login-response.schema';
import { mapLoginResponse } from './auth-session.mapper';

export type AuthSessionResult = {
  traceId: string;
  token: LoginResponse;
};

export async function authenticate(payload: LoginPayload): Promise<AuthSessionResult> {
  const result = await loginRequest(payload);
  const token = mapLoginResponse(result.data);

  return {
    traceId: result.traceId,
    token,
  };
}
