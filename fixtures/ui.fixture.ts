import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { ProductDetailsPage } from '../pages/product-details.page';
import { ProductsPage } from '../pages/products.page';
import { blockAds } from '../utils/ad-blocker';

type UIFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  productDetailsPage: ProductDetailsPage;
};

export const test = base.extend<UIFixtures>({
  homePage: async ({ page }, use) => {
    await blockAds(page);

    const homePage = new HomePage(page);

    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    await blockAds(page);

    const loginPage = new LoginPage(page);

    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    await blockAds(page);

    const productsPage = new ProductsPage(page);

    await use(productsPage);
  },

  productDetailsPage: async ({ page }, use) => {
    await blockAds(page);

    const productDetailsPage = new ProductDetailsPage(page);

    await use(productDetailsPage);
  },
});

export { expect };