import { test } from '../../../../sharedData/SharedFixture';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';

test.describe('Newly created customers', () => {
    test('Create customers, open accounts, login and logout', async ({ page }) => {
        await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

        const indexPage = new IndexPage(page);
        const bankManagerPage = new BankManagerPage(page);
        const addCustomerPage = new AddCustomerPage(page);
        const openAccountPage = new OpenAccountPage(page);
        const customersListPage = new CustomerLoginPage(page);
        const customerAccountPage = new CustomerAccountPage(page);

        await indexPage.clickManagerLoginMenu();

        await bankManagerPage.clickAddCustomerElement();

        const firstNames = ['Levente', 'Alice', 'Bob', 'Jason'];
        const lastNames = ['Cornea', 'Johnson', 'Smith', 'Angelo'];
        const postCodes = ['251569', '123456', '654321', '556678'];
        const fullNames = firstNames.map((first, i) => `${first} ${lastNames[i]}`);
        const currency = 'Dollar';

        for (let i = 0; i < firstNames.length; i++) {
            await addCustomerPage.fillFirstName(firstNames[i]);
            await addCustomerPage.fillLastName(lastNames[i]);
            await addCustomerPage.fillPostCode(postCodes[i]);
            await addCustomerPage.clickAddCustomerButton();
        }

        await bankManagerPage.clickOpenAccountElement();
        for (const fullName of fullNames) {
            await openAccountPage.selectCustomerName(fullName);
            await openAccountPage.selectCurrency(currency);
            await openAccountPage.selectButton();
        }

        await indexPage.clickHomePageButton();
        await indexPage.clickCustomerLogin();

        for (const fullName of fullNames) {
            await customersListPage.selectCustomerName(fullName);
            await customersListPage.selectLoginButton();
            await customerAccountPage.selectLogoutButton();
        }
    });
});