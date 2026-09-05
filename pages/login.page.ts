import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loggedInUserText: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.locator('[data-qa="login-email"]');

    this.passwordInput = page.locator('[data-qa="login-password"]');

    this.loginButton = page.locator('[data-qa="login-button"]');

    this.loggedInUserText = page.getByText(/logged in as/i);

    this.loginErrorMessage = page.getByText(
      'Your email or password is incorrect!',
      { exact: true },
    );
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}