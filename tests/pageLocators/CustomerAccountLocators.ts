import { Page, Locator } from '@playwright/test';

export class CustomerAccountPage {
    
    public readonly customerAccountNumber: Locator;
    public readonly transactionsHistoryButton: Locator;
    public readonly depositButton: Locator;
    public readonly withdrawButton: Locator;
    public readonly amountInputField: Locator;
    public readonly confirmDepositSubmitButton: Locator;
    public readonly confirmWithdrawalSubmitButton: Locator
    public readonly logoutButton: Locator;

    constructor(page: Page) {
        
        this.customerAccountNumber = page.locator('#accountSelect'); 
        this.transactionsHistoryButton = page.locator('button[ng-class="btnClass1"]');
        this.depositButton = page.locator('button[ng-class="btnClass2"]');
        this.withdrawButton = page.locator('button[ng-class="btnClass3"]');
        this.amountInputField = page.locator('input[ng-model="amount"]');
        this.confirmDepositSubmitButton = page.locator('button[type="submit"]', { hasText: 'Deposit' });
        this.confirmWithdrawalSubmitButton = page.locator('button[type="submit"]', { hasText: 'Withdraw' });
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
    }
    
    public async fillDepositAmountAndConfirm(amount: string): Promise<void> {
        await this.amountInputField.fill(amount);
        await this.confirmDepositSubmitButton.click();
    }
}