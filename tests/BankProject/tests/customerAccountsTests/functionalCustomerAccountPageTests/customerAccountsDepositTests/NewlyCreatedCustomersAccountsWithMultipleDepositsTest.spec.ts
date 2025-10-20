import { test } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';
import { CustomerAccountTransactionsPage } from '../../../../pages/CustomerAccountTransactionsPage';

test.describe('Newly Created Customers with Multiple Deposits', () => {
  test('Should create multiple customers, open accounts, deposit, and validate', async ({ page }) => {
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

    for (let i = 0; i < fullNameValues.length; i++) {
      await indexPage.clickHomePageButton();
      await indexPage.clickCustomerLogin();
      await customerLoginPage.selectCustomerName(fullNameValues[i]);
      await customerLoginPage.selectLoginButton();

      await accountPage.selectDepositButton();
      await accountPage.fillDepositAmount(depositAmounts[i]);
      await accountPage.selectConfirmDepositButton();

      await accountPage.selectTransactionsHistoryButton();
      const transactionDate = await transactionsPage.getCurrentTransactionDate();
      await transactionsPage.validateTransactionRow(transactionDate, depositAmounts[i], transactionType);

      await transactionsPage.selectResetButton();
      await transactionsPage.selectBackButton();
      await accountPage.selectLogoutButton();
    }
  });
});
