import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';
import { CustomerAccountTransactionsPage } from '../../../../pages/CustomerAccountTransactionsPage';

test.describe('Existing Customer Account Deposit', () => {
  test('Should deposit amount and validate transaction history', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const accountPage = new CustomerAccountPage(page);
    const transactionsPage = new CustomerAccountTransactionsPage(page);


    await indexPage.clickCustomerLogin();

    const firstNameValue = 'Harry';
    const lastNameValue = 'Potter';
    const fullNameValue = `${firstNameValue} ${lastNameValue}`;
    const depositSum = '50';
    const transactionType = 'Credit';

    await customerLoginPage.selectCustomerName(fullNameValue);
    await customerLoginPage.selectLoginButton();

    await page.waitForTimeout(2000);

    await accountPage.selectDepositButton();
    await accountPage.fillDepositAmount(depositSum);
    await page.waitForTimeout(5000);
    await accountPage.selectConfirmDepositButton();

    await accountPage.selectTransactionsHistoryButton();
    const transactionDate = await transactionsPage.getCurrentTransactionDate();
    await page.waitForTimeout(5000);
    await transactionsPage.validateCustomerData(transactionDate, depositSum, transactionType);

    await transactionsPage.selectResetButton();
    await transactionsPage.selectBackButton();

    await accountPage.selectLogoutButton();
  });
});
