import { expect, APIResponse } from '@playwright/test';

export function expectSuccessfulResponse(
  response: APIResponse,
): void {
  expect(response.status()).toBe(200);
}

export function expectResponseCode(
  responseBody: unknown,
  expectedCode: number,
): void {
  expect(responseBody).toMatchObject({
    responseCode: expectedCode,
  });
}

export function expectResponseMessage(
  responseBody: unknown,
  expectedMessage: string,
): void {
  expect(responseBody).toMatchObject({
    message: expectedMessage,
  });
}