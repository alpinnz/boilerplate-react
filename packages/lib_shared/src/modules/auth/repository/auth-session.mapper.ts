import { loginResponseSchema, type LoginResponse } from '../schemas/login-response.schema';

export function mapLoginResponse(raw: unknown): LoginResponse {
  return loginResponseSchema.parse(raw);
}
