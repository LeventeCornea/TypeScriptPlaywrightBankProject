import { Page } from '@playwright/test';
import { ElementHelper } from '../helpMethods/ElementHelper';
import { BankManagerLocators } from '../pageLocators/BankManagerLocators';

export class BankManagerPage {
    private readonly page: Page;
    private readonly elementHelper: ElementHelper;
    private readonly locators: BankManagerLocators;

    constructor(page: Page) {
        this.page = page;
        this.elementHelper = new ElementHelper(page);
        this.locators = new BankManagerLocators(page);
    }

    public async clickAddCustomerElement(): Promise<void> {
        await this.elementHelper.clickLocator(this.locators.addCustomerElement);
    }

    public async clickOpenAccountElement(): Promise<void> {
        await this.elementHelper.clickLocator(this.locators.openAccountElement);
    }

    public async clickCustomersElement(): Promise<void> {
        await this.elementHelper.clickLocator(this.locators.customersElement);
    }
}
