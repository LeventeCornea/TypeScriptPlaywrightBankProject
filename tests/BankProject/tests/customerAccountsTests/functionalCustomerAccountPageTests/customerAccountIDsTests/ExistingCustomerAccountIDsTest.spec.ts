import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';

test.describe('Existing Customer Account IDs', () => {
  test('Should login as existing customer and validate account IDs', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const customerAccountPage = new CustomerAccountPage(page);

    await indexPage.clickCustomerLogin();

    const firstNameValue = 'Harry';
    const lastNameValue = 'Potter';
    const fullNameValue = `${firstNameValue} ${lastNameValue}`;

    await customerLoginPage.selectCustomerName(fullNameValue);
    await customerLoginPage.selectLoginButton();

    await page.waitForTimeout(2000);

    const allAccounts: string[] = await customerAccountPage.getAllAccountNumbers();
    console.log(`All accounts for ${fullNameValue}: ${allAccounts}`);

    for (const accountNumber of allAccounts) {
      await customerAccountPage.selectAccountNumber(accountNumber);

      await page.waitForTimeout(5000);

      const selected = await customerAccountPage.getSelectedAccountNumber();
      console.log(`Selected account: ${selected}`);
    }

    await customerAccountPage.selectLogoutButton();
  });
});
