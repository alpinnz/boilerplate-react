import { defaultColorMode, getFoundationColorTokens, type ColorMode } from '../foundation/color.tokens';

export type SemanticColorTokens = {
  backgroundCanvas: string;
  backgroundSurface: string;
  textPrimary: string;
  textOnAction: string;
  borderSubtle: string;
  actionPrimary: string;
  actionPrimaryHover: string;
  stateSuccess: string;
  stateError: string;
};

export type ComponentColorTokens = {
  button: {
    primaryBackground: string;
    primaryForeground: string;
    secondaryBackground: string;
    secondaryForeground: string;
    dangerBackground: string;
    successBackground: string;
  };
};

export function createSemanticColorTokens(mode: ColorMode = defaultColorMode): SemanticColorTokens {
  const foundation = getFoundationColorTokens(mode);

  return {
    backgroundCanvas: foundation.neutral000,
    backgroundSurface: foundation.neutral100,
    textPrimary: foundation.neutral900,
    textOnAction: foundation.neutral000,
    borderSubtle: foundation.neutral300,
    actionPrimary: foundation.accent500,
    actionPrimaryHover: foundation.accent600,
    stateSuccess: foundation.success500,
    stateError: foundation.danger500,
  };
}

export function createComponentColorTokens(mode: ColorMode = defaultColorMode): ComponentColorTokens {
  const semantic = createSemanticColorTokens(mode);

  return {
    button: {
      primaryBackground: semantic.actionPrimary,
      primaryForeground: semantic.textOnAction,
      secondaryBackground: semantic.backgroundSurface,
      secondaryForeground: semantic.textPrimary,
      dangerBackground: semantic.stateError,
      successBackground: semantic.stateSuccess,
    },
  };
}
