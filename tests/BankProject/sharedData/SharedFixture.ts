import { test as base, chromium, Browser, Page } from '@playwright/test';

type SharedDataFixture = {
  browser: Browser;
  page: Page;
  testName: string;
};

export const test = base.extend<SharedDataFixture>({
  browser: async ({}, use) => {
    const browser = await chromium.launch({ headless: false });
    await use(browser);
    await browser.close();
  },

  page: async ({ browser }, use) => {
    const page = await browser.newPage();
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await use(page);
  },

  testName: async ({}, use, testInfo) => {
    const testName = testInfo.title;
    console.log(`Starting test: ${testName}`);
    await use(testName);
  },
});

test.afterEach(async ({ testName }) => {
  console.log(`Finished test: ${testName}`);
});
