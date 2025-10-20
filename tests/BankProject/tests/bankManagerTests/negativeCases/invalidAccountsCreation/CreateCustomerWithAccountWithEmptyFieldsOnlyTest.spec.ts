import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';

test.describe('Invalid Account Creation - Empty Fields Validation', () => {
  test('Should display browser validation message when Add Customer fields are empty', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);

    await indexPage.clickManagerLoginMenu();
    await bankManagerPage.clickAddCustomerElement();

    await addCustomerPage.clickAddCustomerButton();
    
    const validationMessage = await addCustomerPage.getFirstNameFieldValidationMessage();
    console.log('Validation message shown:', validationMessage);
    expect(validationMessage).toBe('Please fill out this field.');
  });
});
