import { type EmitObservabilityEventInput } from './observability-emitter';

export type WebVitalName = 'LCP' | 'INP' | 'CLS';

export type WebVitalMetric = {
  name: WebVitalName;
  value: number;
};

export type WebVitalThresholds = {
  LCP: number;
  INP: number;
  CLS: number;
};

export type WebVitalEvaluation = {
  name: WebVitalName;
  value: number;
  threshold: number;
  status: 'pass' | 'fail';
};

export type WebVitalsReleaseEvaluation = {
  passed: boolean;
  evaluations: WebVitalEvaluation[];
  failedMetrics: WebVitalName[];
};

export const defaultWebVitalThresholds: WebVitalThresholds = {
  LCP: 2.5,
  INP: 200,
  CLS: 0.1,
};

export function evaluateWebVitalMetric(
  metric: WebVitalMetric,
  thresholds: WebVitalThresholds = defaultWebVitalThresholds,
): WebVitalEvaluation {
  const threshold = thresholds[metric.name];

  return {
    name: metric.name,
    value: metric.value,
    threshold,
    status: metric.value <= threshold ? 'pass' : 'fail',
  };
}

export function evaluateWebVitalsRelease(
  metrics: WebVitalMetric[],
  thresholds: WebVitalThresholds = defaultWebVitalThresholds,
): WebVitalsReleaseEvaluation {
  const evaluations = metrics.map((metric) => evaluateWebVitalMetric(metric, thresholds));
  const failedMetrics = evaluations.filter((item) => item.status === 'fail').map((item) => item.name);

  return {
    passed: failedMetrics.length === 0,
    evaluations,
    failedMetrics,
  };
}

export function createWebVitalsService(
  emit: (event: EmitObservabilityEventInput) => unknown,
  thresholds: WebVitalThresholds = defaultWebVitalThresholds,
) {
  return {
    report(metric: WebVitalMetric, app: string, feature: string, userSessionId: string): WebVitalEvaluation {
      const evaluation = evaluateWebVitalMetric(metric, thresholds);

      emit({
        level: evaluation.status === 'pass' ? 'info' : 'warn',
        event: 'web_vital.measurement',
        feature,
        payload: {
          app,
          userSessionId,
          metric: metric.name,
          value: metric.value,
          threshold: evaluation.threshold,
          status: evaluation.status,
        },
      });

      return evaluation;
    },
    evaluateRelease(metrics: WebVitalMetric[]): WebVitalsReleaseEvaluation {
      return evaluateWebVitalsRelease(metrics, thresholds);
    },
  };
}
