import { defaultColorMode, getFoundationColorTokens, isColorMode, type ColorMode } from './foundation/color.tokens';
import { createComponentColorTokens, createSemanticColorTokens } from './semantic/color.semantic';

export type TypographyMode = 'desktop' | 'mobile';
export type FoundationMode = 'desktop' | 'mobile';

export type ThemeModeSelection = {
  color: ColorMode;
  typography: TypographyMode;
  foundation: FoundationMode;
};

const defaultThemeModeSelection: ThemeModeSelection = {
  color: defaultColorMode,
  typography: 'desktop',
  foundation: 'desktop',
};

function isTypographyMode(value: string): value is TypographyMode {
  return value === 'desktop' || value === 'mobile';
}

function isFoundationMode(value: string): value is FoundationMode {
  return value === 'desktop' || value === 'mobile';
}

export function resolveThemeModeSelection(input: Partial<ThemeModeSelection> = {}): ThemeModeSelection {
  const color = typeof input.color === 'string' && isColorMode(input.color)
    ? input.color
    : defaultThemeModeSelection.color;

  const typography = typeof input.typography === 'string' && isTypographyMode(input.typography)
    ? input.typography
    : defaultThemeModeSelection.typography;

  const foundation = typeof input.foundation === 'string' && isFoundationMode(input.foundation)
    ? input.foundation
    : defaultThemeModeSelection.foundation;

  return {
    color,
    typography,
    foundation,
  };
}

export function selectThemeTokens(input: Partial<ThemeModeSelection> = {}) {
  const mode = resolveThemeModeSelection(input);

  return {
    mode,
    foundation: getFoundationColorTokens(mode.color),
    semantic: createSemanticColorTokens(mode.color),
    component: createComponentColorTokens(mode.color),
  };
}
