import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  readonly productsList: Locator;
  readonly productItems: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResultsTitle: Locator;

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
}