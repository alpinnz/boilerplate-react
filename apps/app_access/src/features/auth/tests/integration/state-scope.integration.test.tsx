import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as authService from '../../services/auth.service';
import { LoginPage } from '../../pages/login.page';
import { useAuthFeatureStore } from '../../state/auth-feature.store';

describe('auth state scope integration', () => {
  it('updates feature local shared state separately from server mutation state', async () => {
    const loginSpy = vi.spyOn(authService, 'loginWithCredentials').mockResolvedValue({
      traceId: 'trace-999',
      token: {
        accessToken: 'a',
        refreshToken: 'b',
        expiresAt: '2030-01-01T00:00:00Z',
      },
    });

    useAuthFeatureStore.setState({ draftUsername: '', loginAttemptCount: 0 });

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <LoginPage />
      </QueryClientProvider>,
    );
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), 'state-user');
    await user.type(screen.getByLabelText(/password/i), 'secret');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => expect(loginSpy).toHaveBeenCalledTimes(1));

    expect(useAuthFeatureStore.getState().draftUsername).toBe('state-user');
    expect(useAuthFeatureStore.getState().loginAttemptCount).toBe(1);
    expect(screen.getByLabelText('login-attempt-count').textContent).toContain('Attempts: 1');
  });
});
