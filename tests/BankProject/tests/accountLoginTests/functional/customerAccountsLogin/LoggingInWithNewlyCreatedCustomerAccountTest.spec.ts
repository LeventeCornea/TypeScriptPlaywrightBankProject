import { test } from '../../../../sharedData/SharedFixture';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';
import { OpenAccountPage } from '../../../../pages/OpenAccountPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';

test.describe('Newly created customer', () => {
  test('Create customer, open account, login and logout', async ({ page, testName }) => {
    console.log(`Running test: ${testName}`);

    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customersListPage = new CustomerLoginPage(page);
    const customerAccountPage = new CustomerAccountPage(page);

    const firstNamevalue = 'Levente';
    const lastNamevalue = 'Cornea';
    const postCodevalue = '251569';
    const fullNamevalue = `${firstNamevalue} ${lastNamevalue}`;
    const currency = 'Dollar';

    await indexPage.clickManagerLoginMenu();

    await bankManagerPage.clickAddCustomerElement();
    await addCustomerPage.fillFirstName(firstNamevalue);
    await addCustomerPage.fillLastName(lastNamevalue);
    await addCustomerPage.fillPostCode(postCodevalue);
    await addCustomerPage.clickAddCustomerButton();

    await page.keyboard.press('Enter');

    await bankManagerPage.clickOpenAccountElement();
    await openAccountPage.selectCustomerName(fullNamevalue);
    await openAccountPage.selectCurrency(currency);
    await openAccountPage.selectButton();

    await indexPage.clickHomePageButton();
    await indexPage.clickCustomerLogin();
    await customersListPage.selectCustomerName(fullNamevalue);
    await customersListPage.selectLoginButton();
    await customerAccountPage.selectLogoutButton();
  });
});