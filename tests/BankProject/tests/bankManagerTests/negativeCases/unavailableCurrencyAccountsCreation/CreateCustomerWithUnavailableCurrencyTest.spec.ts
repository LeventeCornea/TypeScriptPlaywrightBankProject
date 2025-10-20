import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';

test.describe('Open Account With Unavailable Currency', () => {
  test('Should not allow customer to create account with unavailable currency', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
        await indexPage.clickManagerLoginMenu();

        const bankManagerPage = new BankManagerPage(page);
        await bankManagerPage.clickAddCustomerElement();

        const firstNameValue = 'Levente';
        const lastNameValue = 'Cornea';
        const postCodeValue = '251569';
        const fullNameValue = `${firstNameValue} ${lastNameValue}`;
        const currency = 'Yen';

        const addCustomerPage = new AddCustomerPage(page);
        await addCustomerPage.fillFirstName(firstNameValue);
        await addCustomerPage.fillLastName(lastNameValue);
        await addCustomerPage.fillPostCode(postCodeValue);
        await addCustomerPage.clickAddCustomerButton();

        await bankManagerPage.clickOpenAccountElement();

        const openAccountPage = new OpenAccountPage(page);
        await openAccountPage.selectCustomerName(fullNameValue);
        await openAccountPage.assertCurrencyNotExists(currency);
        
  });
});
