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

  test('should display product details when a product is selected', async ({
  productsPage,
  productDetailsPage,
}) => {
    await productsPage.open();

    await productsPage.openProduct('Blue Top');

     await expect(productDetailsPage.productInformation).toBeVisible();

     await expect(productDetailsPage.productName).toHaveText('Blue Top');

     await expect(productDetailsPage.category).toContainText('Category:');

     await expect(productDetailsPage.price).toContainText('Rs.');

     await expect(productDetailsPage.availability).toContainText('Availability:',);

     await expect(productDetailsPage.condition).toContainText('Condition:');

     await expect(productDetailsPage.brand).toContainText('Brand:');
  });

});