import { Page, expect } from '@playwright/test';
import { ElementHelper } from '../helpMethods/ElementHelper';
import { AlertHelper } from '../helpMethods/AlertHelper';
import { OpenAccountPage as OpenAccountLocators } from '../pageLocators/OpenAccountLocators';

export class OpenAccountPage {
    private readonly page: Page;
    private readonly elementHelper: ElementHelper;
    private readonly alertHelper: AlertHelper;
    private readonly locators: OpenAccountLocators;

    constructor(page: Page) {
        this.page = page;
        this.elementHelper = new ElementHelper(page);
        this.alertHelper = new AlertHelper(page);
        this.locators = new OpenAccountLocators(page);
    }

    public async selectCustomerName(fullNameValue: string): Promise<void> {
        await this.elementHelper.selectByVisibleText(this.locators.customerNameDropdown, fullNameValue);
    }

    public async selectCurrency(currencyValue: string): Promise<void> {
        await this.elementHelper.selectByVisibleText(this.locators.currencyDropdown, currencyValue);
    }

    public async selectButton(): Promise<void> {
        await this.elementHelper.clickJS(this.locators.processButton);
    }

    public async selectButton2(): Promise<void> {
        await this.elementHelper.clickLocator(this.locators.processButton);
    }

    public async isOpenCustomerButtonDisplayed(): Promise<boolean> {
        return await this.elementHelper.isElementDisplayed(this.locators.processButton);
    }

    public async selectCurrenciesList(): Promise<void> {
        await this.elementHelper.clickJS(this.locators.currenciesListContainer);
    }

    public async isCurrencyDisplayed(currency: string): Promise<boolean> {
        const optionsLocator = this.locators.currencyDropdown.locator('option');
        const allOptions = await optionsLocator.allTextContents();

        return allOptions.some((optionText: string) => 
            optionText.trim().toLowerCase() === currency.toLowerCase()
        );
    }

    public async assertCurrencyNotExists(currency: string) {
        const exists = await this.isCurrencyDisplayed(currency);
        expect(exists).toBeFalsy();
    }

    public async isCurrencyOptionDisplayed(optionText: string): Promise<boolean> {
        const optionsLocator = this.locators.processButton.locator('option');
        const allOptions = await optionsLocator.allTextContents();

        return allOptions.some(
            (text) => text.trim().toLowerCase() === optionText.toLowerCase()
        );
    }
    
    public async getCurrencyFieldValidationMessage(): Promise<string> {
        return await this.locators.currencyDropdown.evaluate(
            (input: HTMLInputElement) => input.validationMessage
    )};

    public async getNameFieldValidationMessage(): Promise<string> {
        return await this.locators.customerNameDropdown.evaluate(
            (input: HTMLInputElement) => input.validationMessage
    )};
}
