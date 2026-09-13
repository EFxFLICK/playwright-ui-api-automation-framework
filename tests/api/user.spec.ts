import { test, expect } from '../../fixtures/api.fixture';
import { createTestUser } from '../../test-data/users';
import {
  expectSuccessfulResponse,
  expectResponseCode,
  expectResponseMessage,
} from '../../utils/api-assertions';


test.describe('User Account API', () => {
  test('should create and delete a user account successfully', async ({
    userService,
  }) => {
    // Arrange
    const userData = createTestUser();

    // Act — Create account
    const createResponse = await userService.createAccount(userData);
    const createBody = await createResponse.json();

    // Assert — Account created
    expectSuccessfulResponse(createResponse);
    expectResponseCode(createBody, 201);
    expectResponseMessage(createBody, 'User created!');

    // Act — Delete account
    const deleteResponse = await userService.deleteAccount(
    userData.email,
    userData.password,
    );

    const deleteBody = await deleteResponse.json();

    // Assert — Account deleted
     expect(deleteResponse.status()).toBe(200);
     expectResponseCode(deleteBody, 200);
     expectResponseMessage(
      deleteBody,
     'Account deleted!',
     );
  });

  test('should reject account creation with an existing email', async ({
  userService,}) => {
  // Arrange
  const userData = createTestUser();

  // Act — Create the account first
    const firstResponse = await userService.createAccount(userData);
    const firstBody = await firstResponse.json();

  // Assert — Initial account creation succeeded
     expectSuccessfulResponse(firstResponse);
     expectResponseCode(firstBody, 201);
     expectResponseMessage(firstBody, 'User created!');

  // Act — Try creating another account with the same email
    const duplicateResponse = await userService.createAccount(userData);
    const duplicateBody = await duplicateResponse.json();

  // Assert — Duplicate account is rejected
    expect(duplicateResponse.status()).toBe(200);
    expectResponseCode(duplicateBody, 400);
    expectResponseMessage(
    duplicateBody,
    'Email already exists!',
   );

  // Cleanup — Delete the account created during the test
    const deleteResponse = await userService.deleteAccount(
      userData.email,
      userData.password,
    );

    const deleteBody = await deleteResponse.json();

    expectSuccessfulResponse(deleteResponse);
    expectResponseCode(deleteBody, 200);
    expectResponseMessage(deleteBody, 'Account deleted!');
  });


  test('should not allow login after account deletion', async ({
    userService,
    loginService,}) => {
    // Arrange
    const userData = createTestUser();
    // Create account
    const createResponse = await userService.createAccount(userData);
    const createBody = await createResponse.json();

    expectSuccessfulResponse(createResponse);
    expectResponseCode(createBody, 201);
    expectResponseMessage(createBody, 'User created!');

    // Delete account
    const deleteResponse = await userService.deleteAccount(
     userData.email,
     userData.password,
    );
    const deleteBody = await deleteResponse.json();

    expectSuccessfulResponse(deleteResponse);
    expectResponseCode(deleteBody, 200);
    expectResponseMessage(deleteBody, 'Account deleted!');

    // Act — Try logging in after deletion
    const loginResponse = await loginService.verifyLogin(
     userData.email,
     userData.password,
    );
    const loginBody = await loginResponse.json();

    // Assert — Login should fail
    expectSuccessfulResponse(loginResponse);
    expectResponseCode(loginBody, 404);
    expectResponseMessage(loginBody, 'User not found!');
  });

  test('should update a user account successfully', async ({
  userService,
}) => {
  // Arrange
  const userData = createTestUser();

  // Act — Create account
  const createResponse = await userService.createAccount(userData);
  const createBody = await createResponse.json();

  // Assert — Account created
  expectSuccessfulResponse(createResponse);
  expectResponseCode(createBody, 201);
  expectResponseMessage(createBody, 'User created!');

  // Arrange — Updated user data
  const updatedUserData = {
    ...userData,
    name: 'Updated QA Automation User',
    firstname: 'Updated',
    lastname: 'Automation',
    company: 'Updated Test Company',
    city: 'Mumbai',
  };

  // Act — Update account
  const updateResponse =
    await userService.updateAccount(updatedUserData);

  const updateBody = await updateResponse.json();

  // Assert — Account updated
  expectSuccessfulResponse(updateResponse);
  expectResponseCode(updateBody, 200);
  expectResponseMessage(updateBody, 'User updated!');

  // Cleanup — Delete account
  const deleteResponse = await userService.deleteAccount(
    userData.email,
    userData.password,
  );

  const deleteBody = await deleteResponse.json();

  expectSuccessfulResponse(deleteResponse);
  expectResponseCode(deleteBody, 200);
  expectResponseMessage(deleteBody, 'Account deleted!');
});

test('should get user details by email successfully', async ({
  userService,
}) => {
  // Arrange
  const userData = createTestUser();

  // Act — Create account
  const createResponse = await userService.createAccount(userData);
  const createBody = await createResponse.json();

  // Assert — Account created
  expectSuccessfulResponse(createResponse);
  expectResponseCode(createBody, 201);
  expectResponseMessage(createBody, 'User created!');

  // Act — Get user details
  const response = await userService.getUserDetailByEmail(
    userData.email,
  );

  const responseBody = await response.json();

  // Assert — User details returned
  expectSuccessfulResponse(response);
  expect(responseBody).toHaveProperty('user');

  const user = responseBody.user;

  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name', userData.name);
  expect(user).toHaveProperty('email', userData.email);
  expect(user).toHaveProperty('title', userData.title);
  expect(user).toHaveProperty('birth_day', userData.birth_date);
  expect(user).toHaveProperty('birth_month', userData.birth_month);
  expect(user).toHaveProperty('birth_year', userData.birth_year);
  expect(user).toHaveProperty('first_name', userData.firstname);
  expect(user).toHaveProperty('last_name', userData.lastname);
  expect(user).toHaveProperty('company', userData.company);
  expect(user).toHaveProperty('address1', userData.address1);
  expect(user).toHaveProperty('country', userData.country);
  expect(user).toHaveProperty('state', userData.state);
  expect(user).toHaveProperty('city', userData.city);
  expect(user).toHaveProperty('zipcode', userData.zipcode);

  // Cleanup — Delete account
  const deleteResponse = await userService.deleteAccount(
    userData.email,
    userData.password,
  );

  const deleteBody = await deleteResponse.json();

  expectSuccessfulResponse(deleteResponse);
  expectResponseCode(deleteBody, 200);
  expectResponseMessage(deleteBody, 'Account deleted!');
});

test('should reject user details request for non-existing email', async ({
  userService,
}) => {
  // Arrange
  const email = `non_existing_${Date.now()}@example.com`;

  // Act
  const response = await userService.getUserDetailByEmail(email);
  const responseBody = await response.json();

  // Assert
  expectSuccessfulResponse(response);
  expectResponseCode(responseBody, 404);
  expectResponseMessage(
  responseBody,
  'Account not found with this email, try another email!',
  );
});

});