import { test, expect } from '@playwright/test';

test('should load the Automation Exercise home page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Automation Exercise/);
});