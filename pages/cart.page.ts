import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly cartTable: Locator;
  readonly cartRows: Locator;

  constructor(page: Page) {
    super(page);

    this.cartTable = page.locator('#cart_info_table');
    this.cartRows = this.cartTable.locator('tbody tr');
  }

  async open(): Promise<void> {
    await this.navigate('/view_cart');
  }

  async getProductCount(): Promise<number> {
    return this.cartRows.count();
  }

  async hasProduct(productName: string): Promise<boolean> {
    const count = await this.cartRows
      .filter({ hasText: productName })
      .count();

    return count > 0;
  }

  async getProductRow(productName: string): Promise<Locator> {
    return this.cartRows.filter({ hasText: productName }).first();
  }

  async getProductPrice(productName: string): Promise<string> {
  const row = await this.getProductRow(productName);

  return (await row.locator('.cart_price').textContent())?.trim() ?? '';
}

async getProductQuantity(productName: string): Promise<string> {
  const row = await this.getProductRow(productName);

  return (await row.locator('.cart_quantity').textContent())?.trim() ?? '';
}

async getProductTotal(productName: string): Promise<string> {
  const row = await this.getProductRow(productName);

  return (await row.locator('.cart_total').textContent())?.trim() ?? '';
}

async removeProduct(productName: string): Promise<void> {
  const row = await this.getProductRow(productName);

  await row.locator('.cart_quantity_delete').click();
}
}