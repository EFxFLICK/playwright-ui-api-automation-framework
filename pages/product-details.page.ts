import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
  readonly productInformation: Locator;
  readonly productName: Locator;
  readonly category: Locator;
  readonly price: Locator;
  readonly availability: Locator;
  readonly condition: Locator;
  readonly brand: Locator;

  constructor(page: Page) {
    super(page);

    this.productInformation = page.locator('.product-information');

    this.productName = this.productInformation.locator('h2');

    this.category = this.productInformation.getByText(/category:/i);

    this.price = this.productInformation.getByText(/Rs\./i).first();

    this.availability = this.productInformation.getByText(
      /availability:/i,
    );

    this.condition = this.productInformation.getByText(/condition:/i);

    this.brand = this.productInformation.getByText(/brand:/i);
  }

  async getProductName(): Promise<string> {
    return (await this.productName.textContent())?.trim() ?? '';
  }
}