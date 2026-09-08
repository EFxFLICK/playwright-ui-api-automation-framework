import { test, expect } from '../../../fixtures/ui.fixture';

test.describe('Cart', () => {
  test('should add a product to the cart successfully', async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.open();

    await productsPage.addProductToCart('Blue Top');

    await cartPage.open();

    await expect(cartPage.cartTable).toBeVisible();

    const productCount = await cartPage.getProductCount();

    expect(productCount).toBeGreaterThan(0);

    expect(await cartPage.hasProduct('Blue Top')).toBe(true);

    expect(await cartPage.getProductPrice('Blue Top')).toBe('Rs. 500');

    expect(await cartPage.getProductQuantity('Blue Top')).toBe('1');

    expect(await cartPage.getProductTotal('Blue Top')).toBe('Rs. 500');
  });
});

test('should add a product with the correct quantity', async ({
  productsPage,
  productDetailsPage,
  cartPage,
}) => {
  await productsPage.open();

  await productsPage.openProduct('Blue Top');

  await expect(productDetailsPage.productInformation).toBeVisible();

  await productDetailsPage.setQuantity(4);

  await expect(productDetailsPage.quantityInput).toHaveValue('4');

  await productDetailsPage.addToCart();

  await expect(productDetailsPage.viewCartButton).toBeVisible();

  await productDetailsPage.goToCartFromModal();

  await expect(cartPage.cartTable).toBeVisible();

  expect(await cartPage.getProductQuantity('Blue Top')).toBe('4');
});

test('should remove a product from the cart successfully', async ({
  productsPage,
  cartPage,
}) => {
  await productsPage.open();

  await productsPage.addProductToCart('Blue Top');

  await cartPage.open();

  await expect(cartPage.cartTable).toBeVisible();

  expect(await cartPage.hasProduct('Blue Top')).toBe(true);

  await cartPage.removeProduct('Blue Top');

  await expect
    .poll(() => cartPage.hasProduct('Blue Top'))
    .toBe(false);
});

test('should add multiple products to the cart successfully', async ({
  productsPage,
  cartPage,
}) => {
  await productsPage.open();

  await productsPage.addProductToCart('Blue Top');

  await productsPage.addProductToCart('Men Tshirt');

  await cartPage.open();

  await expect(cartPage.cartTable).toBeVisible();

  expect(await cartPage.hasProduct('Blue Top')).toBe(true);
  expect(await cartPage.hasProduct('Men Tshirt')).toBe(true);

  expect(await cartPage.getProductPrice('Blue Top')).toBe('Rs. 500');
  expect(await cartPage.getProductPrice('Men Tshirt')).toBe('Rs. 400');

  expect(await cartPage.getProductQuantity('Blue Top')).toBe('1');
  expect(await cartPage.getProductQuantity('Men Tshirt')).toBe('1');

  expect(await cartPage.getProductTotal('Blue Top')).toBe('Rs. 500');
  expect(await cartPage.getProductTotal('Men Tshirt')).toBe('Rs. 400');
});