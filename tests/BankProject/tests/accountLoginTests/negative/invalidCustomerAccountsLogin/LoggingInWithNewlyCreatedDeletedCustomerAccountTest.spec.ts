import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';
import { CustomersPage } from '../../../../pages/CustomersPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';

test.describe('Invalid Customer Login - Newly Created and Deleted Account', () => {
  test('Customer should not be able to log in after deletion', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customersPage = new CustomersPage(page);
    const customerLoginPage = new CustomerLoginPage(page);

    await indexPage.clickManagerLoginMenu();

    const firstNameValue = 'Levente';
    const lastNameValue = 'Cornea';
    const postCodeValue = '251569';
    const fullNameValue = `${firstNameValue} ${lastNameValue}`;
    const currency = 'Dollar';

    await bankManagerPage.clickAddCustomerElement();
    await addCustomerPage.fillFirstName(firstNameValue);
    await addCustomerPage.fillLastName(lastNameValue);
    await addCustomerPage.fillPostCode(postCodeValue);

    page.once('dialog', async dialog => {
      console.log(`→ ALERT: ${dialog.message()}`);
      await dialog.accept();
    });
    await addCustomerPage.clickAddCustomerButton();

    await bankManagerPage.clickOpenAccountElement();
    await openAccountPage.selectCustomerName(fullNameValue);
    await openAccountPage.selectCurrency(currency);

    page.once('dialog', async dialog => {
      console.log(`→ ALERT: ${dialog.message()}`);
      await dialog.accept();
    });
    await openAccountPage.selectButton();

    await bankManagerPage.clickCustomersElement();
    await customersPage.searchCustomers(lastNameValue);
    await customersPage.validateCustomer(firstNameValue, lastNameValue, postCodeValue);
    await customersPage.deleteCustomer();

    await indexPage.clickHomePageButton();
    await indexPage.clickCustomerLogin();

    await customerLoginPage.selectCustomerName(fullNameValue);
    const isPresent = await customerLoginPage.selectLoginButton();

    expect(isPresent, `Customer '${fullNameValue}' was still found, but it should have been deleted!`).toBeFalsy();
  });
});
