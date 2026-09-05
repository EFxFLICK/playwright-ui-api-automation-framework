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
});