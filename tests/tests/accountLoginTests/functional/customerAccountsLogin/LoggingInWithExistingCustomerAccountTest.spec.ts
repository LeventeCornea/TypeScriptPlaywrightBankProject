import { test } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';

test.describe('Customer Accounts Login - Functional', () => {
  test('Logging in with existing customer account', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    await indexPage.clickCustomerLogin();

    const firstNameValue = 'Harry';
    const lastNameValue = 'Potter';
    const fullNameValue = `${firstNameValue} ${lastNameValue}`;

    const customerLoginPage = new CustomerLoginPage(page);
    const customerAccountPage = new CustomerAccountPage(page);
    await customerLoginPage.selectCustomerNameList();
    await customerLoginPage.selectCustomerName(fullNameValue);
    await customerLoginPage.selectLoginButton();
    await customerAccountPage.selectLogoutButton();
  });
});
