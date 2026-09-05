import { test, expect } from '../../../fixtures/ui.fixture';
import { testUsers } from '../../../test-data/users';

test.describe('Login', () => {
  test('should login successfully with valid credentials', async ({
    loginPage,
  }) => {
    await loginPage.navigate('/login');

    await loginPage.login(
      testUsers.validUser.email,
      testUsers.validUser.password,
    );

    await expect(loginPage.loggedInUserText).toBeVisible();
  });

  test('should display an error message with invalid credentials', async ({
    loginPage,
  }) => {
    await loginPage.navigate('/login');

    await loginPage.login(
      testUsers.invalidUser.email,
      testUsers.invalidUser.password,
    );

    await expect(loginPage.loginErrorMessage).toBeVisible();
  });

  test('should logout successfully after login', async ({
    loginPage,
    homePage,
  }) => {
    await loginPage.navigate('/login');

    await loginPage.login(
      testUsers.validUser.email,
      testUsers.validUser.password,
    );

    await expect(loginPage.loggedInUserText).toBeVisible();

    await homePage.header.logout();

    await expect.poll(() => loginPage.isLoginPage()).toBe(true);
  });
});