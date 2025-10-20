import { Page, Locator } from '@playwright/test';
import { ElementHelper } from '../helpMethods/ElementHelper';
import { CustomerLoginPage as CustomerLoginLocators } from '../pageLocators/CustomerLoginLocators';

export class CustomerLoginPage {
    private readonly page: Page;
    private readonly elementHelper: ElementHelper;
    private readonly locators: CustomerLoginLocators;

    constructor(page: Page) {
        this.page = page;
        this.elementHelper = new ElementHelper(page);
        this.locators = new CustomerLoginLocators(page);
    }
    
    private getLocatorString(locator: Locator): string {
        return locator.toString();
    }

    public get loginLocator(): Locator {
        return this.locators.loginButton;
    }

    public async selectCustomerName(fullNameValue: string): Promise<void> {
        await this.locators.customersListDropdown.selectOption({ label: fullNameValue });
    }

    public async selectLoginButton(): Promise<void> {
        await this.locators.loginButton.click();
    }

    public async selectCustomerNameList(): Promise<void> {
        await this.locators.customersListDropdown.click();
    }

    public async isCustomerPresent(fullName: string): Promise<boolean> {
        const optionsLocator = this.locators.customerOptions;
        
        const allOptions = await optionsLocator.allTextContents();
        
        return allOptions.some((optionText: string) => 
            optionText.trim().toLowerCase() === fullName.toLowerCase()
        );
    }
}