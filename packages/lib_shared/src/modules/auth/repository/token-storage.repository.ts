export type TokenEnvelope = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
};

export type TokenStorageStrategy = 'localStorage' | 'sessionStorage';

const ACCESS_TOKEN_KEY = 'groapp.auth.access-token';
const REFRESH_TOKEN_KEY = 'groapp.auth.refresh-token';
const EXPIRES_AT_KEY = 'groapp.auth.expires-at';

function getStorage(strategy: TokenStorageStrategy): Storage {
  return strategy === 'sessionStorage' ? sessionStorage : localStorage;
}

export function saveTokenEnvelope(token: TokenEnvelope, strategy: TokenStorageStrategy = 'localStorage'): void {
  const storage = getStorage(strategy);
  storage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
  storage.setItem(REFRESH_TOKEN_KEY, token.refreshToken);
  storage.setItem(EXPIRES_AT_KEY, token.expiresAt);
}

export function loadTokenEnvelope(strategy: TokenStorageStrategy = 'localStorage'): TokenEnvelope | null {
  const storage = getStorage(strategy);
  const accessToken = storage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = storage.getItem(REFRESH_TOKEN_KEY);
  const expiresAt = storage.getItem(EXPIRES_AT_KEY);

  if (!accessToken || !refreshToken || !expiresAt) {
    return null;
  }

  return {
    accessToken,
    refreshToken,
    expiresAt,
  };
}

export function clearTokenEnvelope(strategy: TokenStorageStrategy = 'localStorage'): void {
  const storage = getStorage(strategy);
  storage.removeItem(ACCESS_TOKEN_KEY);
  storage.removeItem(REFRESH_TOKEN_KEY);
  storage.removeItem(EXPIRES_AT_KEY);
}
