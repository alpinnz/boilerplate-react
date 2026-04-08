import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../../../../app/app';

describe('App shell bootstrap', () => {
  it('renders baseline home page', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /groapp access baseline/i })).toBeTruthy();
  });
});
