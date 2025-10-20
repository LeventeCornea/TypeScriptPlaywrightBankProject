import { Page, Locator } from '@playwright/test';

export class CustomersPage {
    
    public readonly customerNameSearchField: Locator;
    public readonly customerRows: Locator;

    constructor(page: Page) {
        
        this.customerNameSearchField = page.getByPlaceholder('Search Customer'); 
        this.customerRows = page.locator('tr.ng-scope');
    }
    
    public async searchCustomer(name: string): Promise<void> {
        await this.customerNameSearchField.fill(name);
    }
    
    public getDeleteButtonForCustomer(name: string): Locator {
        return this.customerRows
            .filter({ hasText: name })
            .locator('button', { hasText: 'Delete' }); 
    }
}