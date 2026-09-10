import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly addressDetails: Locator;
  readonly orderReview: Locator;
  readonly orderComment: Locator;
  readonly placeOrderButton: Locator;
  readonly orderTable: Locator;
  readonly orderRows: Locator;
  readonly totalAmount: Locator;
  readonly paymentForm: Locator;
  readonly cardNameInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payAndConfirmOrderButton: Locator;
  readonly orderSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.addressDetails = page.getByText('Address Details', {
      exact: true,
    });

    this.orderReview = page.getByText('Review Your Order', {
      exact: true,
    });

    this.orderComment = page.locator('textarea[name="message"]');

    this.placeOrderButton = page.getByRole('link', {
      name: 'Place Order',
    });

    this.orderTable = page.locator('#cart_info');

    this.orderRows = this.orderTable.locator('tbody tr');

    this.totalAmount = page.getByText(/Total Amount/i);

    this.paymentForm = page.locator('#payment-form');

    this.cardNameInput = page.locator('[name="name_on_card"]');

    this.cardNumberInput = page.locator('[name="card_number"]');

    this.cvcInput = page.locator('[name="cvc"]');

    this.expiryMonthInput = page.locator('[name="expiry_month"]');

    this.expiryYearInput = page.locator('[name="expiry_year"]');

    this.payAndConfirmOrderButton = page.getByRole('button', {name: /pay and confirm order/i,});

    this.orderSuccessMessage = page.getByText(
    'Congratulations! Your order has been confirmed!',{ exact: true },
    )};

  async isCheckoutPage(): Promise<boolean> {
    return this.currentUrl.includes('/checkout');
  }

  async hasProduct(productName: string): Promise<boolean> {
  const count = await this.orderRows
    .filter({ hasText: productName })
    .count();

  return count > 0;
}

async getProductQuantity(productName: string): Promise<string> {
  const row = this.orderRows
    .filter({ hasText: productName })
    .first();

  return (await row.locator('.cart_quantity').textContent())?.trim() ?? '';
}

async getProductTotal(productName: string): Promise<string> {
  const row = this.orderRows
    .filter({ hasText: productName })
    .first();

  return (await row.locator('.cart_total').textContent())?.trim() ?? '';
}

async enterPaymentDetails(
  cardName: string,
  cardNumber: string,
  cvc: string,
  expiryMonth: string,
  expiryYear: string,
): Promise<void> {
  await this.cardNameInput.fill(cardName);
  await this.cardNumberInput.fill(cardNumber);
  await this.cvcInput.fill(cvc);
  await this.expiryMonthInput.fill(expiryMonth);
  await this.expiryYearInput.fill(expiryYear);
}

async payAndConfirmOrder(): Promise<void> {
  await this.payAndConfirmOrderButton.click();
}

async placeOrder(): Promise<void> {
  await this.placeOrderButton.click();
}
};