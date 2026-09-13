import { APIResponse } from '@playwright/test';
import { AutomationExerciseClient } from '../clients/automation-exercise.client';

export class BrandsService {
  private readonly client: AutomationExerciseClient;

  constructor(client: AutomationExerciseClient) {
    this.client = client;
  }

  async getBrandsList(): Promise<APIResponse> {
    return this.client.get('/api/brandsList');
  }

  async updateBrandsList(): Promise<APIResponse> {
    return this.client.put('/api/brandsList');
  }
}