import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';

test.describe('Open Account Without Entering Any Data', () => {
  test('Should show validation message when both fields are left empty', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const openAccountPage = new OpenAccountPage(page);

    await indexPage.clickManagerLoginMenu();
    await bankManagerPage.clickOpenAccountElement();
    await openAccountPage.selectButton2();

    const validationMessage = await openAccountPage.getNameFieldValidationMessage();
    console.log('Validation message shown:', validationMessage);
    expect(validationMessage).toBe('Please select an item in the list.');
  });
});
