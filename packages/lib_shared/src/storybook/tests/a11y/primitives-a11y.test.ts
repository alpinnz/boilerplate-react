import { createElement, type ReactElement } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import meta, {
  Default,
  Disabled,
  Empty,
  Error,
  Loading,
  Mobile,
  Success,
  ThemeVariant,
} from '../../../ui/button/button.stories';
import { ButtonComponent, type ButtonComponentProps } from '../../../ui/button/button.component';

type StoryLike = {
  args?: Partial<ButtonComponentProps>;
  render?: (args: ButtonComponentProps) => ReactElement;
};

function renderStory(story: StoryLike) {
  const baseArgs = (meta.args ?? {}) as Partial<ButtonComponentProps>;
  const resolvedArgs = {
    ...baseArgs,
    ...story.args,
  } as ButtonComponentProps;

  if (story.render) {
    return render(story.render(resolvedArgs));
  }

  return render(createElement(ButtonComponent, resolvedArgs));
}

afterEach(() => {
  cleanup();
});

describe('storybook primitive accessibility smoke', () => {
  it('keeps semantic button role and accessible labeling for mandatory stories', () => {
    const stories: StoryLike[] = [Default, Disabled, Loading, Error, Success, ThemeVariant, Mobile];

    for (const story of stories) {
      renderStory(story);
      const button = screen.getByRole('button');
      const label = button.textContent?.trim() ?? '';
      expect(button.getAttribute('type')).toBe('button');
      expect(label.length > 0).toBe(true);
      cleanup();
    }
  });

  it('supports empty visual state with explicit aria label', () => {
    renderStory(Empty);

    const button = screen.getByRole('button', { name: /empty button/i });
    expect(button).toBeTruthy();
  });
});
