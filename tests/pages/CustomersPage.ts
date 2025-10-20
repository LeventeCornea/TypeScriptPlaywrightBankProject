import { Page, Locator } from '@playwright/test';
import { ElementHelper } from '../helpMethods/ElementHelper';
import { CustomersPage as CustomersLocators } from '../pageLocators/CustomersLocators';

export class CustomersPage {
    private readonly page: Page;
    private readonly elementHelper: ElementHelper;
    private readonly locators: CustomersLocators;

    constructor(page: Page) {
        this.page = page;
        this.elementHelper = new ElementHelper(page);
        this.locators = new CustomersLocators(page);
    }
    
    private getLocatorString(locator: Locator): string {
        return locator.toString();
    }

    public async searchCustomers(lastNameValue: string): Promise<void> {
        await this.elementHelper.fill(this.locators.customerNameSearchField, lastNameValue);
    }

    public async validateCustomer(firstNameValue: string, lastNameValue: string, postCodeValue: string): Promise<void> {        
        await this.elementHelper.validateContainTextLocator(this.locators.customerRows, firstNameValue);
        await this.elementHelper.validateContainTextLocator(this.locators.customerRows, lastNameValue);
        await this.elementHelper.validateContainTextLocator(this.locators.customerRows, postCodeValue);
    }
    
    public async clickOnCustomerNameField(): Promise<void> {
        await this.elementHelper.clickLocator(this.locators.customerNameSearchField);
}
    
    public async deleteCustomer(): Promise<void> {
        await this.elementHelper.clearFieldWithBackspace;
    }
}