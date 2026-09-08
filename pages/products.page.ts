import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  readonly productsList: Locator;
  readonly productItems: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResultsTitle: Locator;
  readonly addedToCartModal: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);

    this.productsList = page.locator('.features_items');

    this.productItems = this.productsList.locator(
      '.product-image-wrapper',
    );

    this.searchInput = page.locator('#search_product');

    this.searchButton = page.locator('#submit_search');

    this.searchResultsTitle = page.getByText('Searched Products', {
      exact: true,
    });

    this.addedToCartModal = page.getByText(
      'Your product has been added to cart.',
      { exact: true },
    );

    this.continueShoppingButton = page.getByRole('button', {
      name: 'Continue Shopping',
    });
  }

  async open(): Promise<void> {
    await this.navigate('/products');
  }

  async getProductCount(): Promise<number> {
    return this.productItems.count();
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async openProduct(productName: string): Promise<void> {
  const product = this.productItems.filter({
    hasText: productName,
  });

  await Promise.all([
    this.page.waitForURL(/\/product_details\/\d+/),
    product
      .getByRole('link', { name: /view product/i })
      .click(),
  ]);
}

  async addProductToCart(productName: string): Promise<void> {
  const product = this.productItems.filter({
    hasText: productName,
  });

  await product
    .locator('.productinfo')
    .getByText('Add to cart', { exact: true })
    .click();

  await expect(this.addedToCartModal).toBeVisible();

  await this.continueShoppingButton.click();

  await expect(this.addedToCartModal).toBeHidden();
}
}