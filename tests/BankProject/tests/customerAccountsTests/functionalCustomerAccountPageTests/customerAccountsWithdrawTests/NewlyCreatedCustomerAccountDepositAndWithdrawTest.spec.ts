import { test } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';
import { CustomerAccountTransactionsPage } from '../../../../pages/CustomerAccountTransactionsPage';

test.describe('Newly Created Customer Deposit and Withdraw', () => {
  test('Should deposit and withdraw and validate transactions', async ({ page }) => {
    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const accountPage = new CustomerAccountPage(page);
    const transactionsPage = new CustomerAccountTransactionsPage(page);

    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    await indexPage.clickManagerLoginMenu();

    const firstNameValue = 'Levente';
    const lastNameValue = 'Cornea';
    const postCodeValue = '251569';
    const fullNameValue = `${firstNameValue} ${lastNameValue}`;
    const currency = 'Dollar';
    const depositSum = '50';
    const withdrawSum = '40';
    const transactionType = 'Credit';

    await bankManagerPage.clickAddCustomerElement();
    await addCustomerPage.fillFirstName(firstNameValue);
    await addCustomerPage.fillLastName(lastNameValue);
    await addCustomerPage.fillPostCode(postCodeValue);
    await addCustomerPage.clickAddCustomerButton();

    await bankManagerPage.clickOpenAccountElement();
    await openAccountPage.selectCustomerName(fullNameValue);
    await openAccountPage.selectCurrency(currency);
    await openAccountPage.selectButton();

    await indexPage.clickHomePageButton();
    await indexPage.clickCustomerLogin();
    await customerLoginPage.selectCustomerName(fullNameValue);
    await customerLoginPage.selectLoginButton();

    await accountPage.selectDepositButton();
    await accountPage.fillDepositAmount(depositSum);
    await accountPage.selectConfirmDepositButton();

    await page.waitForTimeout(2000);

    await accountPage.selectTransactionsHistoryButton();
    await page.waitForTimeout(2000);
    const transactionDate = await transactionsPage.getCurrentTransactionDate();
    await transactionsPage.validateCustomerData(transactionDate, depositSum, transactionType);
    await transactionsPage.selectBackButton();

    await accountPage.selectWithdrawButton();
    await accountPage.fillWithdrawAmount(withdrawSum);
    await accountPage.selectConfirmWithdrawalButton();

    await accountPage.selectTransactionsHistoryButton();
    await transactionsPage.validateDateAndSumvalidateDateAndSum(transactionDate, depositSum);

    await transactionsPage.selectResetButton();
    await accountPage.selectLogoutButton();
  });
});
