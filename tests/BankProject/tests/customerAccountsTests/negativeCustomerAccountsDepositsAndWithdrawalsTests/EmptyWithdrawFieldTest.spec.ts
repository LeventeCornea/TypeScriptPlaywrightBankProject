import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../pages/IndexPage';
import { CustomerLoginPage } from '../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../pages/CustomerAccountPage';
import { CustomerAccountTransactionsPage } from '../../../pages/CustomerAccountTransactionsPage';

test.describe('Empty Withdraw Field Negative Test', () => {
  test('Should not allow withdrawal if field is empty', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const accountPage = new CustomerAccountPage(page);
    const transactionsPage = new CustomerAccountTransactionsPage(page);

    const firstNameValue = 'Harry';
    const lastNameValue = 'Potter';
    const fullNameValue = `${firstNameValue} ${lastNameValue}`;

    await indexPage.clickCustomerLogin();
    await customerLoginPage.selectCustomerName(fullNameValue);
    await customerLoginPage.selectLoginButton();

    await accountPage.selectWithdrawButton();
    await accountPage.selectConfirmWithdrawalButton();

    await accountPage.selectTransactionsHistoryButton();

    const rowExists = await transactionsPage.isCustomerRowDisplayed();
    expect(rowExists).toBeFalsy();
  });
});
