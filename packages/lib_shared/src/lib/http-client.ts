import axios, { type AxiosError } from 'axios';

export type NormalizedError = {
  code: string;
  message: string;
  details?: unknown;
  traceId?: string;
  source: 'client' | 'network' | 'server';
};

export const httpClient = axios.create({
  timeout: 15000,
});

export function normalizeHttpError(error: unknown): NormalizedError {
  const axiosError = error as AxiosError<{ message?: string; code?: string; details?: unknown; traceId?: string }>;

  if (axiosError?.isAxiosError) {
    const payload = axiosError.response?.data;
    return {
      code: payload?.code ?? 'HTTP_ERROR',
      message: payload?.message ?? axiosError.message,
      details: payload?.details,
      traceId: payload?.traceId,
      source: axiosError.response ? 'server' : 'network',
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'Unexpected client error',
    source: 'client',
  };
}
