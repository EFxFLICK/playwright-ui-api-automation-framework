import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  private readonly page: Page;

  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signupLoginLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.homeLink = page.getByRole('link', { name: /home/i });
    this.productsLink = page.getByRole('link', { name: /products/i });
    this.cartLink = page.getByRole('link', { name: /cart/i });
    this.signupLoginLink = page.getByRole('link', {
      name: /signup\s*\/\s*login/i,
    });
  }

  async goToHome(): Promise<void> {
    await this.homeLink.click();
  }

  async goToProducts(): Promise<void> {
    await this.productsLink.click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async goToSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }
}