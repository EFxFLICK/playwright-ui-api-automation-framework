import { APIResponse } from '@playwright/test';
import { AutomationExerciseClient } from '../clients/automation-exercise.client';

export class LoginService {
  private readonly client: AutomationExerciseClient;

  constructor(client: AutomationExerciseClient) {
    this.client = client;
  }

  async verifyLogin(
    email: string,
    password: string,
  ): Promise<APIResponse> {
    return this.client.post('/api/verifyLogin', {
      email,
      password,
    });
  }

  async verifyLoginWithoutParameters(): Promise<APIResponse> {
  return this.client.post('/api/verifyLogin');
  }
}