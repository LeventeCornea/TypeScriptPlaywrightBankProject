import { test } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';
import { CustomerAccountTransactionsPage } from '../../../../pages/CustomerAccountTransactionsPage';

test.describe('Newly Created Customer Deposit', () => {
  test('Should create customer, open account, deposit, and validate', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const accountPage = new CustomerAccountPage(page);
    const transactionsPage = new CustomerAccountTransactionsPage(page);

    await indexPage.clickManagerLoginMenu();

    const firstNameValue = 'Levente';
    const lastNameValue = 'Cornea';
    const postCodeValue = '251569';
    const fullNameValue = `${firstNameValue} ${lastNameValue}`;
    const currency = 'Dollar';
    const depositSum = '50';
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
    await page.waitForTimeout(5000);
    await accountPage.selectConfirmDepositButton();

    await accountPage.selectTransactionsHistoryButton();
    await page.waitForTimeout(5000);
    const transactionDate = await transactionsPage.getCurrentTransactionDate();
    await transactionsPage.validateCustomerData(transactionDate, depositSum, transactionType);

    await transactionsPage.selectResetButton();
    await transactionsPage.selectBackButton();
    await accountPage.selectLogoutButton();
  });
});
