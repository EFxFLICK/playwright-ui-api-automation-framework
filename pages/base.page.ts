import { Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get currentUrl(): string {
    return this.page.url();
  }

  async navigate(path = '/'): Promise<void> {
  await this.page.goto(path, {
    waitUntil: 'domcontentloaded',
  });
}

  async getPageText(): Promise<string> {
    return this.page.locator('body').innerText();
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}