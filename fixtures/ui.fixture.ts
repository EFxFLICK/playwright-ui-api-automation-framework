import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { blockAds } from '../utils/ad-blocker';

type UIFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
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
});

export { expect };