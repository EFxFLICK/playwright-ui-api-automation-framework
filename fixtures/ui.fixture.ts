import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { blockAds } from '../utils/ad-blocker';

type UIFixtures = {
  homePage: HomePage;
};

export const test = base.extend<UIFixtures>({
  homePage: async ({ page }, use) => {
    await blockAds(page);

    const homePage = new HomePage(page);

    await use(homePage);
  },
});

export { expect };