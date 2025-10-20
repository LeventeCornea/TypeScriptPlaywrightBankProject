import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';
import { CustomersPage } from '../../../../pages/CustomersPage';

test.describe('Create customer with account', () => {
  test('Should create a customer, open account, validate, and delete', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customersPage = new CustomersPage(page);

    await indexPage.clickManagerLoginMenu();
    await bankManagerPage.clickAddCustomerElement();

    const firstNameValue = 'Levente';
    const lastNameValue = 'Cornea';
    const postCodeValue = '251569';
    const fullNameValue = `${firstNameValue} ${lastNameValue}`;
    const currency = 'Dollar';

    await addCustomerPage.fillFirstName(firstNameValue);
    await addCustomerPage.fillLastName(lastNameValue);
    await addCustomerPage.fillPostCode(postCodeValue);
    await addCustomerPage.clickAddCustomerButton();

    await bankManagerPage.clickOpenAccountElement();
    await openAccountPage.selectCustomerName(fullNameValue);
    await openAccountPage.selectCurrency(currency);
    await openAccountPage.selectButton();

    await bankManagerPage.clickCustomersElement();
    await customersPage.searchCustomers(lastNameValue);
    await customersPage.validateCustomer(firstNameValue, lastNameValue, postCodeValue);

    await customersPage.deleteCustomer();
  });
});
