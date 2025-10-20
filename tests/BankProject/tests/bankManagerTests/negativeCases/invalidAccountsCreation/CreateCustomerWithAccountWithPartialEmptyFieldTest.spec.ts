import { test, expect } from '@playwright/test';
import { IndexPage } from '../../../../pages/IndexPage';
import { BankManagerPage } from '../../../../pages/BankManagerPage';
import { AddCustomerPage } from '../../../../pages/AddCustomerPage';

test.describe('Invalid Account Creation - Partial Empty Fields Validation', () => {
  test('Should display validation messages when Add Customer has partial empty fields', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');

    const indexPage = new IndexPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);

    await indexPage.clickManagerLoginMenu();
    await bankManagerPage.clickAddCustomerElement();

    const firstNameValue = 'Levente';
    const lastNameValue = 'Cornea';
    const postCodeValue = '251569';

    await addCustomerPage.fillFirstName(firstNameValue);
    await addCustomerPage.fillLastName(lastNameValue);
    await addCustomerPage.clickAddCustomerButton();
    const postCodeValidation = await addCustomerPage.getPostCodeFieldValidationMessage();
    console.log('Validation message:', postCodeValidation);
    expect(postCodeValidation).toBe('Please fill out this field.');

    await addCustomerPage.clearFirstName();
    await addCustomerPage.clearLastName();
    await addCustomerPage.fillLastName(lastNameValue);
    await addCustomerPage.fillPostCode(postCodeValue);
    await addCustomerPage.clickAddCustomerButton();
    const firstNameValidation = await addCustomerPage.getFirstNameFieldValidationMessage();
    console.log('Validation message:', firstNameValidation);
    expect(firstNameValidation).toBe('Please fill out this field.');

    await addCustomerPage.clearLastName();
    await addCustomerPage.clearPostCode();
    await addCustomerPage.fillFirstName(firstNameValue);
    await addCustomerPage.fillPostCode(postCodeValue);
    await addCustomerPage.clickAddCustomerButton();
    const lastNameValidation = await addCustomerPage.getLastNameFieldValidationMessage();
    console.log('Validation message:', lastNameValidation);
    expect(lastNameValidation).toBe('Please fill out this field.');

    await addCustomerPage.clearFirstName();
    await addCustomerPage.clearPostCode();
    await addCustomerPage.fillFirstName(firstNameValue);
    await addCustomerPage.clickAddCustomerButton();
    const lastNameValidation2 = await addCustomerPage.getLastNameFieldValidationMessage();
    const postCodeValidation2 = await addCustomerPage.getPostCodeFieldValidationMessage();
    console.log('Validation messages:', lastNameValidation2, postCodeValidation2);
    expect(lastNameValidation2).toBe('Please fill out this field.');
    expect(postCodeValidation2).toBe('Please fill out this field.');

    await addCustomerPage.clearFirstName();
    await addCustomerPage.fillLastName(lastNameValue);
    await addCustomerPage.clickAddCustomerButton();
    const firstNameValidation2 = await addCustomerPage.getFirstNameFieldValidationMessage();
    const postCodeValidation3 = await addCustomerPage.getPostCodeFieldValidationMessage();
    console.log('Validation messages:', firstNameValidation2, postCodeValidation3);
    expect(firstNameValidation2).toBe('Please fill out this field.');
    expect(postCodeValidation3).toBe('Please fill out this field.');

    await addCustomerPage.clearLastName();
    await addCustomerPage.fillPostCode(postCodeValue);
    await addCustomerPage.clickAddCustomerButton();
    const firstNameValidation3 = await addCustomerPage.getFirstNameFieldValidationMessage();
    const lastNameValidation3 = await addCustomerPage.getLastNameFieldValidationMessage();
    console.log('Validation messages:', firstNameValidation3, lastNameValidation3);
    expect(firstNameValidation3).toBe('Please fill out this field.');
    expect(lastNameValidation3).toBe('Please fill out this field.');
  });
});
