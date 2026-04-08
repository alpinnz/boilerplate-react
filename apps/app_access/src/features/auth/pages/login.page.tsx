import { useState, type FormEvent } from 'react';
import { useLogin } from '../hooks/use-login.hook';
import { useAuthFeatureStore } from '../state/auth-feature.store';

export function LoginPage() {
  const [password, setPassword] = useState('');
  const mutation = useLogin();
  const draftUsername = useAuthFeatureStore((state) => state.draftUsername);
  const setDraftUsername = useAuthFeatureStore((state) => state.setDraftUsername);
  const incrementLoginAttemptCount = useAuthFeatureStore((state) => state.incrementLoginAttemptCount);
  const loginAttemptCount = useAuthFeatureStore((state) => state.loginAttemptCount);

  const canSubmit = draftUsername.length > 0 && password.length > 0;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    incrementLoginAttemptCount();
    await mutation.mutateAsync({ username: draftUsername, password });
  }

  return (
    <main className="platform-home-page">
      <h1>Login</h1>
      <p>Auth flow baseline with repository-service-hook layering.</p>
      <p aria-label="login-attempt-count">Attempts: {loginAttemptCount}</p>

      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={draftUsername}
          onChange={(event) => setDraftUsername(event.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit" disabled={!canSubmit || mutation.isPending}>
          {mutation.isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      {mutation.isSuccess ? <p role="status">Login success</p> : null}
      {mutation.isError ? <p role="alert">Login failed</p> : null}
    </main>
  );
}
