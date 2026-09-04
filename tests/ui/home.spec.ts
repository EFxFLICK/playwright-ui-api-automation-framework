import { test, expect } from '../../fixtures/ui.fixture';

test('should navigate to the Products page from the header', async ({
  homePage,
}) => {
  await homePage.open();

  await homePage.header.goToProducts();

  await expect(homePage.currentUrl).toMatch(/\/products/);
});