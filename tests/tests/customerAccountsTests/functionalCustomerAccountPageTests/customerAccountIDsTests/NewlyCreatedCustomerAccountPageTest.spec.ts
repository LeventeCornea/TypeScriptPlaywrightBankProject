import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';

test.describe('Newly Created Customer Account', () => {
  test('Should create customer, open account, login and validate accounts', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const customerAccountPage = new CustomerAccountPage(page);

    await indexPage.clickManagerLoginMenu();
    await bankManagerPage.clickAddCustomerElement();

    const firstNameValue = 'Levente';
    const lastNameValue = 'Cornea';
    const postCodeValue = '251569';
    const fullNameValue = `${firstNameValue} ${lastNameValue}`;
    const currencyValue = 'Dollar';

    await addCustomerPage.fillFirstName(firstNameValue);
    await addCustomerPage.fillLastName(lastNameValue);
    await addCustomerPage.fillPostCode(postCodeValue);
    await addCustomerPage.clickAddCustomerButton();

    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.waitForTimeout(2000);

    await bankManagerPage.clickOpenAccountElement();
    await openAccountPage.selectCustomerName(fullNameValue);
    await openAccountPage.selectCurrency(currencyValue);
    await openAccountPage.selectButton();

    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.waitForTimeout(2000);

    await indexPage.clickHomePageButton();
    await indexPage.clickCustomerLogin();
    await customerLoginPage.selectCustomerName(fullNameValue);
    await customerLoginPage.selectLoginButton();

    await page.waitForTimeout(2000);

    const allAccounts: string[] = await customerAccountPage.getAllAccountNumbers();
    console.log(`All accounts for ${fullNameValue}: ${allAccounts}`);

    for (const accountNumber of allAccounts) {
      await customerAccountPage.selectAccountNumber(accountNumber);

      const selected = await customerAccountPage.getSelectedAccountNumber();
      console.log(`Selected account: ${selected}`);

      expect(selected).toBe("number:" + accountNumber);
    }
    await customerAccountPage.selectLogoutButton();
  });
});
