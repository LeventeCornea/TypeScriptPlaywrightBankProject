import { Page, Locator } from '@playwright/test';

export class CustomerAccountTransactionsLocators {
    
    public readonly backButton: Locator;
    public readonly transactionData: Locator;
    public readonly resetButton: Locator;

    constructor(page: Page) {
        
        this.backButton = page.locator('button[ng-click="back()"]'); 
        this.transactionData = page.locator('td.ng-binding');
        this.resetButton = page.locator('button[ng-click="reset()"]');
    }
    
    public async clickBackButton(): Promise<void> {
        await this.backButton.click();
    }
    
    public async getAllTransactionData(): Promise<string[]> {
        return await this.transactionData.allTextContents();
    }
}