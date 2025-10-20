import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';

test.describe('Create Customer with Multi-Currency Account', () => {
  test('Should create a customer and open multiple currency accounts', async ({ page }) => {
    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);

    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    await indexPage.clickManagerLoginMenu();
    await bankManagerPage.clickAddCustomerElement();

    const firstNameValue = 'Levente';
    const lastNameValue = 'Cornea';
    const postCodeValue = '251569';
    const fullNameValue = `${firstNameValue} ${lastNameValue}`;
    const currencies = ['Dollar', 'Pound', 'Rupee'];

    await addCustomerPage.fillFirstName(firstNameValue);
    await addCustomerPage.fillLastName(lastNameValue);
    await addCustomerPage.fillPostCode(postCodeValue);
    await addCustomerPage.clickAddCustomerButton();

    await bankManagerPage.clickOpenAccountElement();

    for (const currency of currencies) {
      await openAccountPage.selectCustomerName(fullNameValue);
      await openAccountPage.selectCurrency(currency);
      await openAccountPage.selectButton();
    }
  });
});
