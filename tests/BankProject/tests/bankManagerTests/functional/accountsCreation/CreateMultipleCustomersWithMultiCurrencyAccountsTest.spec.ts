import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';
import { CustomersPage } from '../../../../pages/CustomersPage';

test.describe('Bank Manager - Create Multiple Customers with Multi-Currency Accounts', () => {
  test('Should create multiple customers with accounts in different currencies', async ({ page }) => {

    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customersPage = new CustomersPage(page);

    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    await indexPage.clickManagerLoginMenu();

    const firstNames = ['Levente', 'Alice', 'Bob', 'Jason'];
    const lastNames = ['Cornea', 'Johnson', 'Smith', 'Angelo'];
    const postCodes = ['251569', '123456', '654321', '556678'];
    const currencies = ['Dollar', 'Rupee', 'Pound', 'Dollar'];

    const fullNames = firstNames.map((f, i) => `${f} ${lastNames[i]}`);

    await bankManagerPage.clickAddCustomerElement();

    for (let i = 0; i < firstNames.length; i++) {
      await addCustomerPage.fillFirstName(firstNames[i]);
      await addCustomerPage.fillLastName(lastNames[i]);
      await addCustomerPage.fillPostCode(postCodes[i]);
      await addCustomerPage.clickAddCustomerButton();
    }

    await bankManagerPage.clickOpenAccountElement();

    for (let i = 0; i < fullNames.length; i++) {
      await openAccountPage.selectCustomerName(fullNames[i]);
      await openAccountPage.selectCurrency(currencies[i]);
      await openAccountPage.selectButton();
    }

    await bankManagerPage.clickCustomersElement();

    for (let i = 0; i < fullNames.length; i++) {
      await customersPage.searchCustomers(lastNames[i]);
      await customersPage.clickOnCustomerNameField();
      await customersPage.deleteCustomer();
      await page.waitForTimeout(500);
    }

    await indexPage.clickHomePageButton();
  });
});
