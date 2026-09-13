import { test as base } from '@playwright/test';

import { AutomationExerciseClient } from '../api/clients/automation-exercise.client';
import { ProductsService } from '../api/services/products.service';
import { BrandsService } from '../api/services/brands.service';
import { LoginService } from '../api/services/login.service';
import { UserService } from '../api/services/user.service';

type APIFixtures = {
  apiClient: AutomationExerciseClient;
  productsService: ProductsService;
  brandsService: BrandsService;
  loginService: LoginService;
  userService: UserService;
};

export const test = base.extend<APIFixtures>({
  apiClient: async ({ request }, use) => {
    const apiClient = new AutomationExerciseClient(request);

    await use(apiClient);
  },

  productsService: async ({ apiClient }, use) => {
    const productsService = new ProductsService(apiClient);

    await use(productsService);
  },

  brandsService: async ({ apiClient }, use) => {
    const brandsService = new BrandsService(apiClient);

    await use(brandsService);
  },

  loginService: async ({ apiClient }, use) => {
    const loginService = new LoginService(apiClient);

    await use(loginService);
  },

   userService: async ({ apiClient }, use) => {
    const userService = new UserService(apiClient);

    await use(userService);
   },
});

export { expect } from '@playwright/test';