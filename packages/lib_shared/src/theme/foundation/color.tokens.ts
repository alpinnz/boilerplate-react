export type ColorMode = 'access' | 'accounting' | 'pocket' | 'wireframe';

export type FoundationColorTokens = {
  accent500: string;
  accent600: string;
  neutral000: string;
  neutral100: string;
  neutral300: string;
  neutral900: string;
  success500: string;
  danger500: string;
};

export const defaultColorMode: ColorMode = 'access';

const foundationTokensByMode: Record<ColorMode, FoundationColorTokens> = {
  access: {
    accent500: '#0a7ea4',
    accent600: '#085f7c',
    neutral000: '#ffffff',
    neutral100: '#eef6f9',
    neutral300: '#b8d4df',
    neutral900: '#0f2730',
    success500: '#107d53',
    danger500: '#b22f2f',
  },
  accounting: {
    accent500: '#1a936f',
    accent600: '#106a50',
    neutral000: '#ffffff',
    neutral100: '#eefaf6',
    neutral300: '#b9dfd3',
    neutral900: '#0f3024',
    success500: '#0a7a54',
    danger500: '#b33d2e',
  },
  pocket: {
    accent500: '#ff8f00',
    accent600: '#c36a00',
    neutral000: '#ffffff',
    neutral100: '#fff5e8',
    neutral300: '#f0cf9d',
    neutral900: '#33210a',
    success500: '#1e8f5e',
    danger500: '#b33d2e',
  },
  wireframe: {
    accent500: '#4b5563',
    accent600: '#374151',
    neutral000: '#ffffff',
    neutral100: '#f3f4f6',
    neutral300: '#d1d5db',
    neutral900: '#111827',
    success500: '#10b981',
    danger500: '#ef4444',
  },
};

export function isColorMode(value: string): value is ColorMode {
  return Object.prototype.hasOwnProperty.call(foundationTokensByMode, value);
}

export function getFoundationColorTokens(mode: ColorMode = defaultColorMode): FoundationColorTokens {
  return foundationTokensByMode[mode];
}
