import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';

test.describe('Newly Created Customers Accounts', () => {
  test('Should create multiple customers, open accounts, login, and validate accounts', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page)
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const customerAccountPage = new CustomerAccountPage(page);

    await indexPage.clickManagerLoginMenu();
    await bankManagerPage.clickAddCustomerElement();

    const firstNameValues = ['Levente', 'Alice', 'Bob', 'Jason'];
    const lastNameValues = ['Cornea', 'Johnson', 'Smith', 'Angelo'];
    const postCodeValues = ['251569', '123456', '654321', '556678'];
    const fullNameValues = firstNameValues.map((first, i) => `${first} ${lastNameValues[i]}`);
    const currencyValue = 'Dollar';

    for (let i = 0; i < firstNameValues.length; i++) {
      await addCustomerPage.fillFirstName(firstNameValues[i]);
      await addCustomerPage.fillLastName(lastNameValues[i]);
      await addCustomerPage.fillPostCode(postCodeValues[i]);
      await addCustomerPage.clickAddCustomerButton();
    }

    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.waitForTimeout(2000);

    await bankManagerPage.clickOpenAccountElement();
    for (const fullName of fullNameValues) {
      await openAccountPage.selectCustomerName(fullName);
      await openAccountPage.selectCurrency(currencyValue);
      await openAccountPage.selectButton();
    }

    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.waitForTimeout(2000);

    await indexPage.clickHomePageButton();
    await indexPage.clickCustomerLogin();

    for (const fullName of fullNameValues) {
      await customerLoginPage.selectCustomerName(fullName);
      await customerLoginPage.selectLoginButton();

      await page.waitForTimeout(2000);

      const allAccounts: string[] = await customerAccountPage.getAllAccountNumbers();
      console.log(`All accounts for ${fullName}: ${allAccounts}`);

      for (const accountNumber of allAccounts) {
        await customerAccountPage.selectAccountNumber(accountNumber);

        const selected = await customerAccountPage.getSelectedAccountNumber();
        console.log(`Selected account: ${selected}`);

        expect(selected).toBe("number:" + accountNumber);
      }
      await customerAccountPage.selectLogoutButton();
    }
  });
});
