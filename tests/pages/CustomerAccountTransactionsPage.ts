import { Page, Locator, expect } from '@playwright/test';
import { ElementHelper } from '../helpMethods/ElementHelper';
import { CustomerAccountTransactionsLocators } from '../pageLocators/CustomerAccountTransactionsLocators';

export class CustomerAccountTransactionsPage {
    private readonly page: Page;
    private readonly elementHelper: ElementHelper;
    private readonly locators: CustomerAccountTransactionsLocators;
    private readonly transactionsTableRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.elementHelper = new ElementHelper(page);
        this.locators = new CustomerAccountTransactionsLocators(page);
        this.transactionsTableRows = page.locator("//table[@class='table table-bordered table-striped']/tbody/tr");
    }

    public async selectBackButton(): Promise<void> {
        await this.elementHelper.clickLocator(this.locators.backButton);
    }

    public getCurrentTransactionDate(): string {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = { 
            month: 'short', day: '2-digit', year: 'numeric', 
            hour: 'numeric', minute: '2-digit', hour12: true 
        };
        const formattedDate = now.toLocaleString('en-US', options);
        return formattedDate.replace(/, (\d{4}),/g, ', $1').replace(/, /g, ', ').replace(/, \s/g, ', ').replace(/,\s(\d{4})/g, ', $1').replace(/\s(\d{4}),\s/g, ' $1 ');
    }

    public async validateCustomerData(expectedDate: string, depositSum: string, transactionType: string): Promise<void> {
        const allRows = await this.transactionsTableRows.all();
        if (allRows.length === 0) {
            throw new Error("No transactions found to validate.");
        }

        const lastRow = allRows[allRows.length - 1];
        const cellsLocator = lastRow.locator('td.ng-binding');
        const cellTexts = await cellsLocator.allTextContents();

        const actualDateText = cellTexts[0]?.trim() || "";
        const actualSum = cellTexts[1]?.trim() || "";
        const actualType = cellTexts[2]?.trim() || "";

        const actualDateFormatted = this.normalizeDate(actualDateText);
        const expectedDateFormatted = this.normalizeDate(expectedDate);

        expect(actualDateFormatted, "Transaction date does not match").toEqual(expectedDateFormatted);
        expect(actualSum, `Expected deposit sum ${depositSum} but found ${actualSum}`).toEqual(depositSum);
        expect(actualType, `Expected transaction type ${transactionType} but found ${actualType}`).toEqual(transactionType);

    }

        private normalizeDate(dateText: string): string {
            try {
                const date = new Date(dateText);
                if (isNaN(date.getTime())) throw new Error("Invalid Date");

                const options: Intl.DateTimeFormatOptions = { 
                    month: 'short', day: '2-digit', year: 'numeric', 
                    hour: 'numeric', minute: '2-digit', hour12: true 
                };
                let formatted = date.toLocaleString('en-US', options);
                formatted = formatted.replace(/, (\d{4}),/g, ', $1').replace(/, /g, ', ').replace(/, \s/g, ', ').replace(/,\s(\d{4})/g, ', $1').replace(/\s(\d{4}),\s/g, ' $1 ');
                return formatted;
            } catch {
                throw new Error("Failed to parse date: " + dateText);
            }
        }

        public async isCustomerRowDisplayed(): Promise<boolean> {
            return await this.elementHelper.isElementDisplayed(this.locators.transactionData);
        }

        public async selectResetButton(): Promise<void> {
            await this.elementHelper.clickJS(this.locators.resetButton);
        }

        public validateTransactionRow(transactionDate: string, sum: string, transactionType: string): void {}
        public validateDateAndSumvalidateDateAndSum(transactionDate: string, sum: string): void {}
        public validateTransactionSum(sum: string): void {}
}
