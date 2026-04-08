import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ButtonComponent } from '../../button/button.component';

describe('primitive button states', () => {
  it('renders default state with semantic role and label', () => {
    render(<ButtonComponent>Continue</ButtonComponent>);

    const button = screen.getByRole('button', { name: /continue/i });
    expect(button).toBeTruthy();
    expect(button.getAttribute('data-variant')).toBe('primary');
  });

  it('applies disabled and loading states', () => {
    render(<ButtonComponent isLoading>Submit</ButtonComponent>);

    const button = screen.getByRole('button', { name: /loading/i });
    expect(button.getAttribute('data-loading')).toBe('true');
    expect(button.hasAttribute('disabled')).toBe(true);
  });

  it('renders variant and state attributes for error and success contexts', () => {
    const { rerender } = render(
      <ButtonComponent variant="danger" state="error">
        Retry
      </ButtonComponent>,
    );

    const errorButton = screen.getByRole('button', { name: /retry/i });
    expect(errorButton.getAttribute('data-variant')).toBe('danger');
    expect(errorButton.getAttribute('data-state')).toBe('error');

    rerender(
      <ButtonComponent variant="success" state="success">
        Saved
      </ButtonComponent>,
    );

    const successButton = screen.getByRole('button', { name: /saved/i });
    expect(successButton.getAttribute('data-variant')).toBe('success');
    expect(successButton.getAttribute('data-state')).toBe('success');
  });
});
