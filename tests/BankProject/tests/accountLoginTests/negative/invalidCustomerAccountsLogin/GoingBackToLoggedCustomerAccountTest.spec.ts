import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';

test.describe('Customer Login Consistency', () => {
  test('Customer should remain logged in when going back to login page', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');
    
    const indexPage = new IndexPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const customerAccountPage = new CustomerAccountPage(page);

    await indexPage.clickCustomerLogin();

    const firstName = 'Harry';
    const lastName = 'Potter';
    const fullName = `${firstName} ${lastName}`;

    await customerLoginPage.selectCustomerName(fullName);
    await customerLoginPage.selectLoginButton();

    await page.waitForTimeout(2000);

    await indexPage.clickHomePageButton();
    await indexPage.clickCustomerLogin();

    const isAccountPageVisible = await customerAccountPage.isAccountPageDisplayed();
    expect(isAccountPageVisible).toBe(true);
  });
});