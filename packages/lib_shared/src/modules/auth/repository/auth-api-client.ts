import { buildTraceHeaders, createTraceId } from '../../../services/observability/trace-context';
import { httpClient } from '../../../lib/http-client';

export type LoginPayload = {
  username: string;
  password: string;
};

export async function loginRequest(payload: LoginPayload) {
  const traceId = createTraceId();
  const response = await httpClient.post('/auth/login', payload, {
    headers: buildTraceHeaders(traceId),
  });

  return {
    traceId,
    data: response.data,
  };
}
