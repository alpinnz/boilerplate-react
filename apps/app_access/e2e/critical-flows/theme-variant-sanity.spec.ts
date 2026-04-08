import { test, expect } from '@playwright/test';

test('theme variant can switch color mode at runtime', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('data-color', 'access');
  await page.getByRole('button', { name: /switch to accounting mode/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-color', 'accounting');
});

test('theme variant can toggle mobile foundation mode', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('data-foundation', 'desktop');
  await page.getByRole('button', { name: /toggle mobile foundation/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-foundation', 'mobile');
});
