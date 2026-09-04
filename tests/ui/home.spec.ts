import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { blockAds } from '../../utils/ad-blocker';

test('should navigate to the Products page from the header', async ({ page }) => {
  await blockAds(page);

  const homePage = new HomePage(page);

  await homePage.open();

  await homePage.header.goToProducts();

  await expect(page).toHaveURL(/products/);
});