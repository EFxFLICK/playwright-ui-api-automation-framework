import { test, expect } from '../../../fixtures/ui.fixture';
import { testUsers } from '../../../test-data/users';
import { testPayment } from '../../../test-data/payment';

test.describe('Checkout', () => {
  test.describe.configure({ mode: 'serial' });
   test('should navigate to checkout successfully', async ({
     loginPage,
     productsPage,
     cartPage,
     checkoutPage,
   }) => {
     await loginPage.navigate('/login');

     await loginPage.login(
       testUsers.validUser.email,
       testUsers.validUser.password,
     );

     await expect(loginPage.loggedInUserText).toBeVisible();

     await cartPage.open();

       if (await cartPage.hasProduct('Blue Top')) {
             await cartPage.removeProduct('Blue Top');
          }

     await productsPage.open();

     await productsPage.addProductToCart('Blue Top');

     await cartPage.open();

     await expect(cartPage.cartTable).toBeVisible();

     await cartPage.proceedToCheckout();

     await expect(checkoutPage.addressDetails).toBeVisible();

     await expect(checkoutPage.orderReview).toBeVisible();

     await expect(checkoutPage.placeOrderButton).toBeVisible();

     expect(await checkoutPage.hasProduct('Blue Top')).toBe(true);

     expect(
       await checkoutPage.getProductQuantity('Blue Top'),
     ).toBe('1');

     expect(
       await checkoutPage.getProductTotal('Blue Top'),
     ).toBe('Rs. 500');
   });

    test('should display the payment form on checkout', async ({
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
   await loginPage.navigate('/login');

   await loginPage.login(
     testUsers.validUser.email,
     testUsers.validUser.password,
   );

   await expect(loginPage.loggedInUserText).toBeVisible();

   await cartPage.open();

   if (await cartPage.hasProduct('Blue Top')) {
     await cartPage.removeProduct('Blue Top');
   }

   await productsPage.open();

   await productsPage.addProductToCart('Blue Top');

   await cartPage.open();

   await expect(cartPage.cartTable).toBeVisible();

   await cartPage.proceedToCheckout();

   await expect(checkoutPage.addressDetails).toBeVisible();
   await expect(checkoutPage.orderReview).toBeVisible();

   await checkoutPage.placeOrder();

   await expect(checkoutPage.paymentForm).toBeVisible();

   await expect(checkoutPage.cardNameInput).toBeVisible();
   await expect(checkoutPage.cardNumberInput).toBeVisible();
   await expect(checkoutPage.cvcInput).toBeVisible();
   await expect(checkoutPage.expiryMonthInput).toBeVisible();
   await expect(checkoutPage.expiryYearInput).toBeVisible();
 
   await expect(checkoutPage.payAndConfirmOrderButton).toBeVisible();
  });

   test('should place an order successfully with valid payment details', async ({
   loginPage,
   productsPage,
   cartPage,
   checkoutPage,
  }) => {
   await loginPage.navigate('/login');

   await loginPage.login(
     testUsers.validUser.email,
     testUsers.validUser.password,
   );

   await expect(loginPage.loggedInUserText).toBeVisible();

   await cartPage.open();

   if (await cartPage.hasProduct('Blue Top')) {
     await cartPage.removeProduct('Blue Top');
   }

   await productsPage.open();

   await productsPage.addProductToCart('Blue Top');

   await cartPage.open();

   await expect(cartPage.cartTable).toBeVisible();

   await cartPage.proceedToCheckout();

   await expect(checkoutPage.addressDetails).toBeVisible();
   await expect(checkoutPage.orderReview).toBeVisible();

   await checkoutPage.placeOrder();

   await expect(checkoutPage.paymentForm).toBeVisible();

   await checkoutPage.enterPaymentDetails(
     testPayment.cardName,
     testPayment.cardNumber,
     testPayment.cvc,
     testPayment.expiryMonth,
     testPayment.expiryYear,
   );

   await checkoutPage.payAndConfirmOrder();

   await expect(checkoutPage.orderSuccessMessage).toBeVisible();
  });
 });

