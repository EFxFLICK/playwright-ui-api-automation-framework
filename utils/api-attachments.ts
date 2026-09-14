import { test } from '@playwright/test';
import { APIResponse } from '@playwright/test';

export async function attachApiResponse(
  response: APIResponse,
): Promise<string> {
  const body = await response.text();

  await test.info().attach('API Response', {
    body: JSON.stringify(
      {
        status: response.status(),
        headers: response.headers(),
        body,
      },
      null,
      2,
    ),
    contentType: 'application/json',
  });

  return body;
}