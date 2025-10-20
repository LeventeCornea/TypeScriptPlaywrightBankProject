import { Page, Locator } from '@playwright/test';

export class AddCustomerLocators {
    public readonly firstNameElement: Locator;
    public readonly lastNameElement: Locator;
    public readonly postCodeElement: Locator;
    public readonly addCustomerButton: Locator;

    constructor(page: Page) {
        this.firstNameElement = page.getByPlaceholder('First Name');
        this.lastNameElement = page.getByPlaceholder('Last Name');
        this.postCodeElement = page.getByPlaceholder('Post Code');
        this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    }
}
