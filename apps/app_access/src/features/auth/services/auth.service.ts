import { saveTokenEnvelope, type TokenStorageStrategy } from '@repo/lib_shared';
import { requestLogin } from '../repository/auth.repository';
import { type LoginForm } from '../types/auth.types';

export async function loginWithCredentials(payload: LoginForm, strategy: TokenStorageStrategy = 'localStorage') {
  const result = await requestLogin(payload);
  saveTokenEnvelope(result.token, strategy);
  return result;
}
