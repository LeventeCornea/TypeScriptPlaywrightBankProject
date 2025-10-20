import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../pages/IndexPage';
import { CustomerLoginPage } from '../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../pages/CustomerAccountPage';
import { CustomerAccountTransactionsPage } from '../../../pages/CustomerAccountTransactionsPage';

test.describe('Empty Deposit Field Negative Test', () => {
  test('Should not allow deposit if field is empty', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');
    
    const indexPage = new IndexPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const accountPage = new CustomerAccountPage(page);
    const transactionsPage = new CustomerAccountTransactionsPage(page);


    const firstName = 'Harry';
    const lastName = 'Potter';
    const fullName = `${firstName} ${lastName}`;

    await indexPage.clickCustomerLogin();
    await customerLoginPage.selectCustomerName(fullName);
    await customerLoginPage.selectLoginButton();

    await accountPage.selectDepositButton();
    await accountPage.selectConfirmDepositButton();

    await accountPage.selectTransactionsHistoryButton();

    const rowExists = await transactionsPage.isCustomerRowDisplayed();
    expect(rowExists).toBeFalsy();
  });
});
