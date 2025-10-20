import { Page, Locator } from '@playwright/test';
import { ElementHelper } from '../helpMethods/ElementHelper';
import { CustomerAccountPage as CustomerAccountLocators } from '../pageLocators/CustomerAccountLocators';

export class CustomerAccountPage {
    private readonly page: Page;
    private readonly elementHelper: ElementHelper;
    private readonly locators: CustomerAccountLocators;

    constructor(page: Page) {
        this.page = page;
        this.elementHelper = new ElementHelper(page);
        this.locators = new CustomerAccountLocators(page);
    }

    public get logoutLocator(): Locator {
        return this.locators.logoutButton;
    }

    public async selectLogoutButton(): Promise<void> {
        await this.locators.logoutButton.click();
    }

    public async getAllAccountNumbers(): Promise<string[]> {
        const options = await this.locators.customerAccountNumber.locator('option').allTextContents();
        return options.map(opt => opt.trim());
    }

    public async selectAccountNumber(accountNumber: string): Promise<void> {
        await this.locators.customerAccountNumber.selectOption({ label: accountNumber });
    }

    public async getSelectedAccountNumber(): Promise<string> {
        const value = await this.locators.customerAccountNumber.inputValue();
        return value.trim();
    }

    public async isAccountPageDisplayed(): Promise<boolean> {
        return await this.elementHelper.isElementDisplayed(this.locators.customerAccountNumber);
    }

    public async selectTransactionsHistoryButton(): Promise<void> {
        await this.elementHelper.clickLocator(this.locators.transactionsHistoryButton);
    }

    public async selectDepositButton(): Promise<void> {
        await this.elementHelper.clickLocator(this.locators.depositButton);
    }

    public async fillDepositAmount(depositSum: string): Promise<void> {
        await this.elementHelper.fill(this.locators.amountInputField, depositSum);
    }

    public async selectConfirmDepositButton(): Promise<void> {
        await this.elementHelper.clickLocator(this.locators.confirmDepositSubmitButton);
    }

    public async selectWithdrawButton(): Promise<void> {
        await this.elementHelper.clickLocator(this.locators.withdrawButton);
    }

    public async fillWithdrawAmount(withdrawSum: string): Promise<void> {
        await this.elementHelper.fill(this.locators.amountInputField, withdrawSum);
    }

    public async selectConfirmWithdrawalButton(): Promise<void> {
        await this.elementHelper.clickLocator(this.locators.confirmWithdrawalSubmitButton);
    }
}
