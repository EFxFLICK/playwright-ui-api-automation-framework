import { test, expect } from '../../fixtures/api.fixture';
import {
  expectSuccessfulResponse,
  expectResponseCode,
  expectResponseMessage,
} from '../../utils/api-assertions';

test.describe('Login API', () => {
  test('should verify login with valid credentials', async ({
    loginService,
  }) => {
    // Arrange
    const email = process.env.TEST_USER_EMAIL!;
    const password = process.env.TEST_USER_PASSWORD!;

    // Act
    const response = await loginService.verifyLogin(
      email,
      password,
    );

    const responseBody = await response.json();

    // Assert
    expectSuccessfulResponse(response);
    expectResponseCode(responseBody, 200);
    expectResponseMessage(responseBody, 'User exists!');
  });

  test('should reject login with invalid credentials', async ({
    loginService,
  }) => {
    // Arrange
    const email = 'invalid-user@example.com';
    const password = 'wrong-password';

    // Act
    const response = await loginService.verifyLogin(
      email,
      password,
    );

    const responseBody = await response.json();

    // Assert
    expectSuccessfulResponse(response);
    expectResponseCode(responseBody, 404);
    expectResponseMessage(
      responseBody,
      'User not found!',
    );
  });

  test('should reject login request without parameters', async ({
    loginService,
  }) => {
    // Arrange
    const response =
      await loginService.verifyLoginWithoutParameters();

    // Act
    const responseBody = await response.json();

    // Assert
    expectSuccessfulResponse(response);
    expectResponseCode(responseBody, 400);
    expectResponseMessage(
      responseBody,
      'Bad request, email or password parameter is missing in POST request.',
    );
  });
});