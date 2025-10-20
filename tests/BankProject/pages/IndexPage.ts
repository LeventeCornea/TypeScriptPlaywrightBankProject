import { Page, Locator } from '@playwright/test';
import { ElementHelper } from '../helpMethods/ElementHelper';
import { IndexPage as IndexLocators } from '../pageLocators/IndexLocators'; 

export class IndexPage {
    private readonly page: Page;
    private readonly elementHelper: ElementHelper;
    private readonly locators: IndexLocators;

    constructor(page: Page) {
        this.page = page;
        this.elementHelper = new ElementHelper(page);
        this.locators = new IndexLocators(page);
    }
    
    private getLocatorString(locator: Locator): string {
        return locator.toString();
    }

    public async clickManagerLoginMenu(): Promise<void> {
        await this.locators.bankManagerLoginMenu.click();
    }

    public async clickHomePageButton(): Promise<void> {
        await this.locators.homePageButton.click();
    }

    public async clickCustomerLogin(): Promise<void> {
        await this.locators.customerLoginMenu.click();
    }
}