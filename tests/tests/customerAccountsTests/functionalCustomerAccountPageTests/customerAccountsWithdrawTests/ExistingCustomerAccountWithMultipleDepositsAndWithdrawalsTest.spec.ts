import { test } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';
import { CustomerAccountTransactionsPage } from '../../../../pages/CustomerAccountTransactionsPage';

test.describe('Existing Customer Multiple Deposits and Withdrawals', () => {
  test('Should deposit and withdraw multiple amounts and validate transactions', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const accountPage = new CustomerAccountPage(page);
    const transactionsPage = new CustomerAccountTransactionsPage(page);

    const firstNameValue = 'Harry';
    const lastNameValue = 'Potter';
    const fullNameValue = `${firstNameValue} ${lastNameValue}`;
    const depositAmounts = ['50', '25', '125'];
    const withdrawAmounts = ['40', '15', '125'];
    const transactionType = 'Credit';

    await indexPage.clickCustomerLogin();
    await customerLoginPage.selectCustomerName(fullNameValue);
    await customerLoginPage.selectLoginButton();

    for (let i = 0; i < depositAmounts.length; i++) {
      await accountPage.selectDepositButton();
      await accountPage.fillDepositAmount(depositAmounts[i]);
      await accountPage.selectConfirmDepositButton();

      await accountPage.selectTransactionsHistoryButton();
      const transactionDate = await transactionsPage.getCurrentTransactionDate();
      await transactionsPage.validateTransactionRow(transactionDate, depositAmounts[i], transactionType);
      await transactionsPage.selectBackButton();

      await accountPage.selectWithdrawButton();
      await accountPage.fillWithdrawAmount(withdrawAmounts[i]);
      await accountPage.selectConfirmWithdrawalButton();

      await accountPage.selectTransactionsHistoryButton();
      await transactionsPage.validateDateAndSumvalidateDateAndSum(transactionDate, depositAmounts[i]);
      await transactionsPage.selectBackButton();
    }

    await accountPage.selectTransactionsHistoryButton();
    await transactionsPage.selectResetButton();
    await accountPage.selectLogoutButton();
  });
});
