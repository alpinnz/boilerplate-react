import React, { forwardRef, type ButtonHTMLAttributes } from 'react';
import './button.component.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
export type ButtonState = 'default' | 'error' | 'success';

export type ButtonComponentProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
  state?: ButtonState;
};

export const ButtonComponent = forwardRef<HTMLButtonElement, ButtonComponentProps>(function ButtonComponent(
  {
    children,
    className,
    variant = 'primary',
    state = 'default',
    isLoading = false,
    disabled,
    ...buttonProps
  },
  ref,
) {
  const resolvedDisabled = disabled || isLoading;
  const resolvedClassName = ['shared-button', className].filter(Boolean).join(' ');

  return (
    <button
      {...buttonProps}
      ref={ref}
      type={buttonProps.type ?? 'button'}
      className={resolvedClassName}
      disabled={resolvedDisabled}
      data-variant={variant}
      data-state={state}
      data-loading={isLoading ? 'true' : 'false'}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
});
