import { Page, Locator } from '@playwright/test';

export class OpenAccountPage {
    
    public readonly customerNameDropdown: Locator;
    public readonly currencyDropdown: Locator;
    public readonly processButton: Locator;
    public readonly currenciesListContainer: Locator;

    constructor(page: Page) {
        
        this.customerNameDropdown = page.locator('#userSelect'); 
        this.currencyDropdown = page.locator('#currency');
        this.processButton = page.getByRole('button', { name: 'Process' });
        this.currenciesListContainer = page.locator('div.form-group');
    }
    
    public async openNewAccount(customerName: string, currency: string): Promise<void> {
        await this.customerNameDropdown.selectOption({ label: customerName });
        await this.currencyDropdown.selectOption({ label: currency });
        await this.processButton.click();
    }
}