import { test } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';
import { CustomerAccountTransactionsPage } from '../../../../pages/CustomerAccountTransactionsPage';

test.describe('Existing Customer Deposit and Withdraw', () => {
  test('Should deposit and withdraw, then validate transactions', async ({ page }) => {
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

    const depositSum = '50';
    await accountPage.selectDepositButton();
    await accountPage.fillDepositAmount(depositSum);
    await accountPage.selectConfirmDepositButton();
    
    await page.waitForTimeout(2000);

    await accountPage.selectTransactionsHistoryButton();
    const transactionDate = await transactionsPage.getCurrentTransactionDate();
    await page.waitForTimeout(2000);
    await transactionsPage.validateCustomerData(transactionDate, depositSum, 'Credit');
    await transactionsPage.selectBackButton();

    const withdrawSum = '40';
    await accountPage.selectWithdrawButton();
    await accountPage.fillWithdrawAmount(withdrawSum);
    await accountPage.selectConfirmWithdrawalButton();

    await accountPage.selectTransactionsHistoryButton();
    await transactionsPage.validateDateAndSumvalidateDateAndSum(transactionDate, depositSum);

    await transactionsPage.selectResetButton();
    await accountPage.selectLogoutButton();
  });
});
