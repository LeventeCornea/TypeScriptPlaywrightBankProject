import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';

test.describe('Open Account Without Selecting Currency', () => {
  test('Should show validation message when currency is not selected', async ({ page }) => {
    const firstNameValue = 'Harry';
    const lastNameValue = 'Potter';
    const fullNameValue = `${firstNameValue} ${lastNameValue}`;

    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const openAccountPage = new OpenAccountPage(page);

    await indexPage.clickManagerLoginMenu();
    await bankManagerPage.clickOpenAccountElement();

    await openAccountPage.selectCustomerName(fullNameValue);
    await openAccountPage.selectButton2();

    const validationMessage = await openAccountPage.getCurrencyFieldValidationMessage();
    console.log('Validation message shown:', validationMessage);
    expect(validationMessage).toBe('Please select an item in the list.');
  });
});
