import { APIResponse } from '@playwright/test';
import { AutomationExerciseClient } from '../clients/automation-exercise.client';

export type CreateUserData = {
  name: string;
  email: string;
  password: string;
  title: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
};

export class UserService {
  private readonly client: AutomationExerciseClient;

  constructor(client: AutomationExerciseClient) {
    this.client = client;
  }

  async createAccount(
    userData: CreateUserData,
  ): Promise<APIResponse> {
    return this.client.post('/api/createAccount', userData);
  }

  async deleteAccount(
    email: string,
    password: string,
  ): Promise<APIResponse> {
    return this.client.delete('/api/deleteAccount', {
      email,
      password,
    });
  }

  async getUserDetailByEmail(
  email: string,
  ): Promise<APIResponse> {
   return this.client.get(
    `/api/getUserDetailByEmail?email=${encodeURIComponent(email)}`,
   );
  }

  async updateAccount(
    userData: CreateUserData,
  ): Promise<APIResponse> {
    return this.client.put('/api/updateAccount', userData);
  }
}