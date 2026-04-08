import { loginRequest, normalizeHttpError, type LoginPayload } from '@repo/lib_shared';
import { authResponseSchema, type AuthResponse } from '../schemas/auth-response.schema';

export async function requestLogin(payload: LoginPayload): Promise<{ traceId: string; token: AuthResponse }> {
  try {
    const result = await loginRequest(payload);
    const token = authResponseSchema.parse(result.data);

    return {
      traceId: result.traceId,
      token,
    };
  } catch (error) {
    throw normalizeHttpError(error);
  }
}
