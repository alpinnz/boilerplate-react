import { useMutation } from '@tanstack/react-query';
import { loginWithCredentials } from '../services/auth.service';
import { authQueryKeys } from '../repository/auth-query-keys';
import { type LoginForm } from '../types/auth.types';

export function useLogin() {
  return useMutation({
    mutationKey: authQueryKeys.login,
    mutationFn: (payload: LoginForm) => loginWithCredentials(payload),
  });
}
