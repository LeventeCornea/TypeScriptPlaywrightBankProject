import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../pages/IndexPage';
import { CustomerLoginPage } from '../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../pages/CustomerAccountPage';
import { CustomerAccountTransactionsPage } from '../../../pages/CustomerAccountTransactionsPage';

test.describe('Invalid Sum Figure Deposit Test', () => {
  test('Should handle deposit of an extremely large sum', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');
    
    const indexPage = new IndexPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const accountPage = new CustomerAccountPage(page);
    const transactionsPage = new CustomerAccountTransactionsPage(page);

    const firstName = 'Harry';
    const lastName = 'Potter';
    const fullName = `${firstName} ${lastName}`;
    const depositSum = '10000000000';

    await indexPage.clickCustomerLogin();
    await customerLoginPage.selectCustomerName(fullName);
    await customerLoginPage.selectLoginButton();

    await accountPage.selectDepositButton();
    await accountPage.fillDepositAmount(depositSum);
    await accountPage.selectConfirmDepositButton();

    await accountPage.selectTransactionsHistoryButton();

    await transactionsPage.validateTransactionSum(depositSum);

    const rowExists = await transactionsPage.isCustomerRowDisplayed();
    expect(rowExists).toBeTruthy();

    await transactionsPage.selectBackButton();
  });
});
