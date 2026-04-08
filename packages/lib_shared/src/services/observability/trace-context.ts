const TRACE_HEADER = 'x-trace-id';

export function createTraceId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

export function buildTraceHeaders(traceId: string): Record<string, string> {
  return {
    [TRACE_HEADER]: traceId,
  };
}
