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
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly viewCartButton: Locator;

  constructor(page: Page) {
    super(page);

    this.productInformation = page.locator('.product-information');

    this.productName = this.productInformation.locator('h2');

    this.category = this.productInformation.getByText(/category:/i);

    this.price = this.productInformation.getByText(/Rs\./i).first();

    this.availability =
      this.productInformation.getByText(/availability:/i);

    this.condition =
      this.productInformation.getByText(/condition:/i);

    this.brand =
      this.productInformation.getByText(/brand:/i);

    this.quantityInput = page.locator('#quantity');

    this.addToCartButton = page.locator('button.cart:visible');

    this.viewCartButton = page.locator('#cartModal').getByRole('link', {
         name: 'View Cart',});

  }

  async getProductName(): Promise<string> {
    return (await this.productName.textContent())?.trim() ?? '';
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart(): Promise<void> {
  await this.addToCartButton.click();
  }

  async goToCartFromModal(): Promise<void> {
  await this.viewCartButton.click();
  }

} 