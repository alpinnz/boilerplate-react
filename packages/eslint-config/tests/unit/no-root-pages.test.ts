import { describe, expect, it } from 'vitest';

import * as rule from '../../src/rules/no-root-pages';

describe('no-root-pages rule', () => {
  it('reports violation for src/pages', () => {
    const reports: Array<{ messageId?: string }> = [];
    const context = {
      getFilename: () => '/repo/apps/app_access/src/pages/home.page.tsx',
      report: (payload: { messageId?: string }) => reports.push(payload),
    };

    const visitors = rule.create(context);
    expect(visitors.Program).toBeTypeOf('function');
    visitors.Program?.({ type: 'Program' });

    expect(reports).toHaveLength(1);
    expect(reports[0]?.messageId).toBe('forbiddenRootDir');
  });

  it('does not report for feature pages', () => {
    const reports: Array<{ messageId?: string }> = [];
    const context = {
      getFilename: () => '/repo/apps/app_access/src/features/auth/pages/login.page.tsx',
      report: (payload: { messageId?: string }) => reports.push(payload),
    };

    const visitors = rule.create(context);

    expect(visitors.Program).toBeUndefined();
    expect(reports).toHaveLength(0);
  });
});
