import { test } from '../../../../sharedData/SharedFixture';
import { IndexPage } from '../../../../pages/IndexPage';
import { CustomerLoginPage } from '../../../../pages/CustomerLoginPage';
import { CustomerAccountPage } from '../../../../pages/CustomerAccountPage';

test.describe('Logging in multiple existing customer accounts', () => {
  test('Login and logout for multiple customers', async ({ page, testName }) => {
    console.log(`Running test: ${testName}`);

    const indexPage = new IndexPage(page);
    const customersListPage = new CustomerLoginPage(page);
    const customerAccountPage = new CustomerAccountPage(page);
    await indexPage.clickCustomerLogin();

    const firstNameValue = ['Harry', 'Ron', 'Neville'];
    const lastNamesValue = ['Potter', 'Weasly', 'Longbottom'];

    const fullNameValue = firstNameValue.map((first, i) => `${first} ${lastNamesValue[i]}`);

    for (const fullName of fullNameValue) {
      await customersListPage.selectCustomerName(fullName);
      await customersListPage.selectLoginButton();
      await customerAccountPage.selectLogoutButton();
    }
  });
});
