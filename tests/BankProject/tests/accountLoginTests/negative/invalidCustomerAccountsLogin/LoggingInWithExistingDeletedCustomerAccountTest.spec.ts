import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { CustomersPage } from '../../../../pages/CustomersPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';

test.describe('Logging in with an existing deleted customer account', () => {

  test('Customer should not appear in login list after deletion', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');
    
    const indexPage = new IndexPage(page);
    await indexPage.clickManagerLoginMenu();

    const bankManagerPage = new BankManagerPage(page);
    const firstNameValue = 'Harry';
    const lastNameValue = 'Potter';
    const fullNameValue = `${firstNameValue} ${lastNameValue}`;

    await bankManagerPage.clickCustomersElement();

    const customersPage = new CustomersPage(page);
    await customersPage.searchCustomers(lastNameValue);
    await customersPage.deleteCustomer();

    await indexPage.clickHomePageButton();
    await indexPage.clickCustomerLogin();

    const customerLoginPage = new CustomerLoginPage(page);
    await customerLoginPage.selectCustomerName(fullNameValue);
    const isPresent = await customerLoginPage.selectLoginButton();

    expect(isPresent, `Customer '${fullNameValue}' was still found, but it should have been deleted!`).toBeFalsy();
  });
});
