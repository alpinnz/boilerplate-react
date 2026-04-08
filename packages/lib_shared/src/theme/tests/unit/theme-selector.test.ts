import { describe, expect, it } from 'vitest';
import { resolveThemeModeSelection, selectThemeTokens } from '../../theme-selector';

describe('theme selector', () => {
  it('falls back to defaults for unsupported modes', () => {
    const mode = resolveThemeModeSelection({
      color: 'invalid' as never,
      typography: 'invalid' as never,
      foundation: 'invalid' as never,
    });

    expect(mode).toEqual({
      color: 'access',
      typography: 'desktop',
      foundation: 'desktop',
    });
  });

  it('maps selected color mode into semantic and component tokens', () => {
    const selected = selectThemeTokens({ color: 'accounting', typography: 'mobile', foundation: 'mobile' });

    expect(selected.mode).toEqual({
      color: 'accounting',
      typography: 'mobile',
      foundation: 'mobile',
    });
    expect(selected.semantic.actionPrimary).toBe('#1a936f');
    expect(selected.component.button.primaryBackground).toBe(selected.semantic.actionPrimary);
    expect(selected.foundation.neutral100).toBe('#eefaf6');
  });
});
