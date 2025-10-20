import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';

test.describe('Existing Customers Account IDs', () => {
  test('Should login multiple customers and validate account IDs', async ({ page }) => {
    const indexPage = new IndexPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const customerAccountPage = new CustomerAccountPage(page);

    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    await indexPage.clickCustomerLogin();

    const firstNameValues = ['Harry', 'Ron', 'Neville'];
    const lastNameValues = ['Potter', 'Weasly', 'Longbottom'];
    const fullNameValues = firstNameValues.map((first, i) => `${first} ${lastNameValues[i]}`);

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
