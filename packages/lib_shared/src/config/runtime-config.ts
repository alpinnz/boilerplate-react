export type RuntimeConfig = {
  apiBaseUrl: string;
  appName: string;
};

export type RuntimeEnv = {
  VITE_API_BASE_URL?: string;
  VITE_APP_NAME?: string;
};

export function getRuntimeConfig(env: RuntimeEnv): RuntimeConfig {
  return {
    apiBaseUrl: env.VITE_API_BASE_URL ?? '',
    appName: env.VITE_APP_NAME ?? 'unknown-app',
  };
}
