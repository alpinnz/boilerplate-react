export type TailwindThemeBridge = {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  fontSize: Record<string, string>;
};

export const tailwindThemeBridge: TailwindThemeBridge = {
  colors: {
    surface: 'var(--color-background-surface)',
    canvas: 'var(--color-background-canvas)',
    text: 'var(--color-text-primary)',
    border: 'var(--color-border-subtle)',
    primary: 'var(--color-action-primary)',
    primaryHover: 'var(--color-action-primary-hover)',
    success: 'var(--color-state-success)',
    error: 'var(--color-state-error)',
  },
  spacing: {
    md: 'var(--space-md)',
    lg: 'var(--space-lg)',
  },
  borderRadius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
  },
  fontSize: {
    base: 'var(--font-size-base)',
  },
};

export function createTailwindThemeBridge(prefix = ''): TailwindThemeBridge {
  if (!prefix) {
    return tailwindThemeBridge;
  }

  const withPrefix = (value: string): string => value.replace('var(--', `var(--${prefix}-`);

  return {
    colors: Object.fromEntries(
      Object.entries(tailwindThemeBridge.colors).map(([key, value]) => [key, withPrefix(value)]),
    ),
    spacing: Object.fromEntries(
      Object.entries(tailwindThemeBridge.spacing).map(([key, value]) => [key, withPrefix(value)]),
    ),
    borderRadius: Object.fromEntries(
      Object.entries(tailwindThemeBridge.borderRadius).map(([key, value]) => [key, withPrefix(value)]),
    ),
    fontSize: Object.fromEntries(
      Object.entries(tailwindThemeBridge.fontSize).map(([key, value]) => [key, withPrefix(value)]),
    ),
  };
}
