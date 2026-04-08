import { test, expect } from '@playwright/test';

test('app shell loads home route', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /groapp access baseline/i })).toBeVisible();
});
