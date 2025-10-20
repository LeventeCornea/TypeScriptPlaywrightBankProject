import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';

test.describe('Invalid Account Creation - Add Customer with Invalid Data', () => {
  test('Should not allow creation of customers with invalid input formats', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);

    await indexPage.clickManagerLoginMenu();
    await bankManagerPage.clickAddCustomerElement();

    const firstNameValue1 = '3525H%';
    const firstNameValue2 = 'Levente';
    const lastNameValue1 = '$lv2/';
    const lastNameValue2 = 'Cornea';
    const postCodeValue1 = 'Levente';
    const postCodeValue2 = '558877';

    const getAlertText = async (action: () => Promise<void>) => {
      let alertText = '';
      page.once('dialog', async dialog => {
        alertText = dialog.message();
        console.log('→ ALERT SAYS:', alertText);
        await dialog.accept();
      });
      await action();
      return alertText;
    };

    const results: string[] = [];

    results.push(await getAlertText(async () => {
      await addCustomerPage.fillFirstName(firstNameValue1);
      await addCustomerPage.fillLastName(lastNameValue1);
      await addCustomerPage.fillPostCode(postCodeValue1);
      await addCustomerPage.clickAddCustomerButton();
    }));

    results.push(await getAlertText(async () => {
      await addCustomerPage.fillFirstName(firstNameValue1);
      await addCustomerPage.fillLastName(lastNameValue1);
      await addCustomerPage.fillPostCode(postCodeValue2);
      await addCustomerPage.clickAddCustomerButton();
    }));

    results.push(await getAlertText(async () => {
      await addCustomerPage.fillFirstName(firstNameValue2);
      await addCustomerPage.fillLastName(lastNameValue1);
      await addCustomerPage.fillPostCode(postCodeValue1);
      await addCustomerPage.clickAddCustomerButton();
    }));

    results.push(await getAlertText(async () => {
      await addCustomerPage.fillFirstName(firstNameValue1);
      await addCustomerPage.fillLastName(lastNameValue2);
      await addCustomerPage.fillPostCode(postCodeValue1);
      await addCustomerPage.clickAddCustomerButton();
    }));

    results.push(await getAlertText(async () => {
      await addCustomerPage.fillFirstName(firstNameValue2);
      await addCustomerPage.fillLastName(lastNameValue2);
      await addCustomerPage.fillPostCode(postCodeValue1);
      await addCustomerPage.clickAddCustomerButton();
    }));

    results.push(await getAlertText(async () => {
      await addCustomerPage.fillFirstName(firstNameValue1);
      await addCustomerPage.fillLastName(lastNameValue2);
      await addCustomerPage.fillPostCode(postCodeValue2);
      await addCustomerPage.clickAddCustomerButton();
    }));

    results.push(await getAlertText(async () => {
      await addCustomerPage.fillFirstName(firstNameValue2);
      await addCustomerPage.fillLastName(lastNameValue1);
      await addCustomerPage.fillPostCode(postCodeValue2);
      await addCustomerPage.clickAddCustomerButton();
    }));

    for (const [i, alertText] of results.entries()) {
      expect(alertText).not.toContain('Customer added successfully');
      console.log(`Assertion ${i + 1}: Alert text did not indicate success.`);
    }
  });
});
