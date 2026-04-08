import React from 'react';
import { ButtonComponent, type ButtonComponentProps } from './button.component';

type Story = {
  args?: Partial<ButtonComponentProps>;
  parameters?: Record<string, unknown>;
  render?: (args: ButtonComponentProps) => JSX.Element;
};

const meta = {
  title: 'Shared/Primitives/Button',
  component: ButtonComponent,
  args: {
    children: 'Continue',
    variant: 'primary',
  } satisfies Partial<ButtonComponentProps>,
};

export default meta;

export const Default: Story = {};

export const HoverFocus: Story = {
  parameters: {
    pseudo: {
      hover: true,
      focusVisible: true,
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    children: '',
    'aria-label': 'Empty button',
  },
};

export const Error: Story = {
  args: {
    variant: 'danger',
    state: 'error',
    children: 'Retry',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    state: 'success',
    children: 'Saved',
  },
};

export const Mobile: Story = {
  render: (args) => (
    <div data-typography="mobile" data-foundation="mobile">
      <ButtonComponent {...args} />
    </div>
  ),
};

export const ThemeVariant: Story = {
  render: (args) => (
    <div data-color="accounting">
      <ButtonComponent {...args} />
    </div>
  ),
};
