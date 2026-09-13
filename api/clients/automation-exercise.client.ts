import {
  APIRequestContext,
  APIResponse,
} from '@playwright/test';

import { env } from '../../config/env';

type FormData = Record<string, string | number | boolean>;

export class AutomationExerciseClient {
  private readonly apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  async get(endpoint: string): Promise<APIResponse> {
    return this.apiContext.get(
      `${env.apiBaseUrl}${endpoint}`,
    );
  }

  async post(
    endpoint: string,
    data?: FormData,
  ): Promise<APIResponse> {
    return this.apiContext.post(
      `${env.apiBaseUrl}${endpoint}`,
      {
        form: data,
      },
    );
  }

  async put(
    endpoint: string,
    data?: FormData,
  ): Promise<APIResponse> {
    return this.apiContext.put(
      `${env.apiBaseUrl}${endpoint}`,
      {
        form: data,
      },
    );
  }

  async delete(
    endpoint: string,
    data?: FormData,
  ): Promise<APIResponse> {
    return this.apiContext.delete(
      `${env.apiBaseUrl}${endpoint}`,
      {
        form: data,
      },
    );
  }
}