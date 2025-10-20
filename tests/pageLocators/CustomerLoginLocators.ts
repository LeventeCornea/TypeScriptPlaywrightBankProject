import { Page, Locator } from '@playwright/test';

export class CustomerLoginPage {
    
    public readonly customersListDropdown: Locator;
    public readonly loginButton: Locator;
    public readonly customerOptions: Locator;

    constructor(page: Page) {
        
        this.customersListDropdown = page.locator('#userSelect'); 
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.customerOptions = page.locator('#userSelect option');
    }
    
    public async loginAsCustomer(customerName: string): Promise<void> {
        await this.customersListDropdown.selectOption({ label: customerName });
        await this.loginButton.click();
    }
}