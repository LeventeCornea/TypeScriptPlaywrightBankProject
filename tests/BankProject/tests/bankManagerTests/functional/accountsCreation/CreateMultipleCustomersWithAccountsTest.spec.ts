import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';
import { CustomersPage } from '../../../../pages/CustomersPage';

test.describe('Create multiple customers with accounts', () => {
  test('Should create, open accounts, validate and delete customers', async ({ page }) => {
    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customersPage = new CustomersPage(page);

    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    await indexPage.clickManagerLoginMenu();
    await bankManagerPage.clickAddCustomerElement();

    const firstNameValues = ['Levente', 'Alice', 'Bob', 'Jason'];
    const lastNameValues = ['Cornea', 'Johnson', 'Smith', 'Angelo'];
    const postCodeValues = ['251569', '123456', '654321', '556678'];
    const fullNameValues = firstNameValues.map((first, i) => `${first} ${lastNameValues[i]}`);
    const currency = 'Dollar';

    for (let i = 0; i < firstNameValues.length; i++) {
      await addCustomerPage.fillFirstName(firstNameValues[i]);
      await addCustomerPage.fillLastName(lastNameValues[i]);
      await addCustomerPage.fillPostCode(postCodeValues[i]);
      await addCustomerPage.clickAddCustomerButton();
    }

    await bankManagerPage.clickOpenAccountElement();
    for (const fullName of fullNameValues) {
      await openAccountPage.selectCustomerName(fullName);
      await openAccountPage.selectCurrency(currency);
      await openAccountPage.selectButton();
    }

    await bankManagerPage.clickCustomersElement();
    for (let i = 0; i < lastNameValues.length; i++) {
      await customersPage.searchCustomers(lastNameValues[i]);
      await customersPage.validateCustomer(firstNameValues[i], lastNameValues[i], postCodeValues[i]);
      await customersPage.clickOnCustomerNameField();
      await customersPage.deleteCustomer();
    }
  });
});
