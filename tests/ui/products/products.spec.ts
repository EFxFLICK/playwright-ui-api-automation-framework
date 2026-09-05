import { test, expect } from '../../../fixtures/ui.fixture';

test.describe('Products', () => {
  test('should display the products listing', async ({ productsPage }) => {
    await productsPage.open();

    await expect(productsPage.productsList).toBeVisible();

    const productCount = await productsPage.getProductCount();

    expect(productCount).toBeGreaterThan(0);
  });

  test('should search for a product successfully', async ({
    productsPage,
  }) => {
    await productsPage.open();

    await productsPage.searchProduct('Blue Top');

    await expect(productsPage.searchResultsTitle).toBeVisible();

    const productCount = await productsPage.getProductCount();

    expect(productCount).toBeGreaterThan(0);
  });
});