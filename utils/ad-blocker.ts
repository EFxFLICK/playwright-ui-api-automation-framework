import { Page } from '@playwright/test';

export async function blockAds(page: Page): Promise<void> {
  await page.route('**/*', async (route) => {
    const url = route.request().url();

    if (url.includes('googleads.') || url.includes('google_vignette')) {
      await route.abort();
      return;
    }

    await route.continue();
  });
}