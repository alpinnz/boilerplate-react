import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as authService from '../../services/auth.service';
import { LoginPage } from '../../pages/login.page';

describe('auth login flow integration', () => {
  it('submits login form through hook-service-repository chain', async () => {
    const loginSpy = vi.spyOn(authService, 'loginWithCredentials').mockResolvedValue({
      traceId: 'trace-321',
      token: {
        accessToken: 'a',
        refreshToken: 'b',
        expiresAt: '2030-01-01T00:00:00Z',
      },
    });

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <LoginPage />
      </QueryClientProvider>,
    );

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/username/i), 'alice');
    await user.type(screen.getByLabelText(/password/i), 'secret');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(loginSpy).toHaveBeenCalledWith({ username: 'alice', password: 'secret' });
    });

    expect(screen.getByRole('status').textContent).toContain('Login success');
  });
});
