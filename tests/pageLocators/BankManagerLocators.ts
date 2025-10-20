import { Page, Locator } from '@playwright/test';

export class BankManagerLocators {
    
    public readonly addCustomerElement: Locator;
    public readonly openAccountElement: Locator;
    public readonly customersElement: Locator;

    constructor(page: Page) {

        this.addCustomerElement = page.getByRole('button', { name: 'Add Customer' }); 
        this.openAccountElement = page.getByRole('button', { name: 'Open Account' });
        this.customersElement = page.getByRole('button', { name: 'Customers' });
    }
    
    public async goToCustomersList(): Promise<void> {
        await this.customersElement.click();
    }
}