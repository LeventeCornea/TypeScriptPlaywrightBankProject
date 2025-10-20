import { test } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';
import { CustomerAccountTransactionsPage } from '../../../../pages/CustomerAccountTransactionsPage';

test.describe('Newly Created Customers Multiple Deposits and Withdrawals', () => {
  test('Should deposit and withdraw multiple amounts for multiple customers', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const accountPage = new CustomerAccountPage(page);
    const transactionsPage = new CustomerAccountTransactionsPage(page);

    await indexPage.clickManagerLoginMenu();

    const firstNameValues = ['Levente', 'Alice', 'Bob', 'Jason'];
    const lastNameValues = ['Cornea', 'Johnson', 'Smith', 'Angelo'];
    const postCodeValues = ['251569', '123456', '654321', '556678'];
    const fullNameValues = firstNameValues.map((f, i) => `${f} ${lastNameValues[i]}`);
    const currency = 'Dollar';
    const depositAmounts = ['50', '25', '125', '1000'];
    const withdrawAmounts = ['40', '15', '125', '900'];
    const transactionType = 'Credit';

    await bankManagerPage.clickAddCustomerElement();
    for (let i = 0; i < firstNameValues.length; i++) {
      await addCustomerPage.fillFirstName(firstNameValues[i]);
      await addCustomerPage.fillLastName(lastNameValues[i]);
      await addCustomerPage.fillPostCode(postCodeValues[i]);
      await addCustomerPage.clickAddCustomerButton();
    }

    await bankManagerPage.clickOpenAccountElement();
    for (let i = 0; i < fullNameValues.length; i++) {
      await openAccountPage.selectCustomerName(fullNameValues[i]);
      await openAccountPage.selectCurrency(currency);
      await openAccountPage.selectButton();
    }

    await indexPage.clickHomePageButton();
    await indexPage.clickCustomerLogin();

    for (let i = 0; i < fullNameValues.length; i++) {
      const fullName = fullNameValues[i];
      const deposit = depositAmounts[i];
      const withdraw = withdrawAmounts[i];

      await customerLoginPage.selectCustomerName(fullName);
      await customerLoginPage.selectLoginButton();

      await accountPage.selectDepositButton();
      await accountPage.fillDepositAmount(deposit);
      await accountPage.selectConfirmDepositButton();

      await accountPage.selectTransactionsHistoryButton();
      const transactionDate = await transactionsPage.getCurrentTransactionDate();
      await transactionsPage.validateTransactionRow(transactionDate, deposit, transactionType);
      await transactionsPage.selectBackButton();

      await accountPage.selectWithdrawButton();
      await accountPage.fillWithdrawAmount(withdraw);
      await accountPage.selectConfirmWithdrawalButton();

      await accountPage.selectTransactionsHistoryButton();
      await transactionsPage.validateDateAndSumvalidateDateAndSum(transactionDate, deposit);
      await transactionsPage.selectResetButton();

      await accountPage.selectLogoutButton();
      await indexPage.clickHomePageButton();
      await indexPage.clickCustomerLogin();
    }
  });
});
