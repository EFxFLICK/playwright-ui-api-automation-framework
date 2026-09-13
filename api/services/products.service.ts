import { APIResponse } from '@playwright/test';
import { AutomationExerciseClient } from '../clients/automation-exercise.client';

export class ProductsService {
  private readonly client: AutomationExerciseClient;

  constructor(client: AutomationExerciseClient) {
    this.client = client;
  }

  async getProductsList(): Promise<APIResponse> {
    return this.client.get('/api/productsList');
  }

  async createProductsList(): Promise<APIResponse> {
    return this.client.post('/api/productsList');
  }

  async searchProduct(searchTerm: string): Promise<APIResponse> {
  return this.client.post('/api/searchProduct', {
    search_product: searchTerm,});
  }

  async searchProductWithoutParameter(): Promise<APIResponse> {
  return this.client.post('/api/searchProduct');
  }
}