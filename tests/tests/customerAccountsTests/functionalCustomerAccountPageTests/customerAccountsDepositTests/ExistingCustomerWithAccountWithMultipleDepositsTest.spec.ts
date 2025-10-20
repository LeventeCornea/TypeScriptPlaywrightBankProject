import { test, expect, Page } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';
import { CustomerAccountTransactionsPage } from '../../../../pages/CustomerAccountTransactionsPage';

test.describe('Existing Customer Multiple Deposits', () => {
  test('Should perform multiple deposits and validate transaction history', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const accountPage = new CustomerAccountPage(page);
    const transactionsPage = new CustomerAccountTransactionsPage(page);

    await indexPage.clickCustomerLogin();

    const firstNameValue = 'Harry';
    const lastNameValue = 'Potter';
    const fullNameValue = `${firstNameValue} ${lastNameValue}`;
    const deposits = ['50', '25', '125'];
    const transactionType = 'Credit';

    await customerLoginPage.selectCustomerName(fullNameValue);
    await customerLoginPage.selectLoginButton();

    await page.waitForTimeout(2000);

    for (const amount of deposits) {
      await accountPage.selectDepositButton();
      await accountPage.fillDepositAmount(amount);
      await accountPage.selectConfirmDepositButton();

      await accountPage.selectTransactionsHistoryButton();
      const transactionDate = await transactionsPage.getCurrentTransactionDate();
      await transactionsPage.validateTransactionRow(transactionDate, amount, transactionType);

      await transactionsPage.selectBackButton();
    }
    await accountPage.selectTransactionsHistoryButton();
    await transactionsPage.selectResetButton();
    await accountPage.selectLogoutButton();
  });
});
