import { Page } from '@playwright/test';
import { ElementHelper } from '../helpMethods/ElementHelper';
import { AlertHelper } from '../helpMethods/AlertHelper';
import { AddCustomerLocators as Locators } from '../pageLocators/AddCustomerLocators';

export class AddCustomerPage {
    private readonly page: Page;
    private readonly elementHelper: ElementHelper;
    private readonly alertHelper: AlertHelper;
    private readonly locators: Locators;

    constructor(page: Page) {
        this.page = page;
        this.elementHelper = new ElementHelper(page);
        this.alertHelper = new AlertHelper(page);
        this.locators = new Locators(page);
    }

    public async fillFirstName(firstNameValue: string): Promise<void> {
        await this.elementHelper.fill(this.locators.firstNameElement, firstNameValue);
    }

    public async fillLastName(lastNameValue: string): Promise<void> {
        await this.elementHelper.fill(this.locators.lastNameElement, lastNameValue);
    }

    public async fillPostCode(postCodeValue: string): Promise<void> {
        await this.elementHelper.fill(this.locators.postCodeElement, postCodeValue);
    }

    public async clickAddCustomerButton(): Promise<void> {
        await this.elementHelper.clickJS(this.locators.addCustomerButton);
    }

    public async clearFirstName(): Promise<void> {
        await this.elementHelper.clearFieldWithBackspace(this.locators.firstNameElement);
    }

    public async clearLastName(): Promise<void> {
        await this.elementHelper.clearFieldWithBackspace(this.locators.lastNameElement);
    }

    public async clearPostCode(): Promise<void> {
        await this.elementHelper.clearFieldWithBackspace(this.locators.postCodeElement);
    }

    public async isAddCustomerButtonDisplayed(): Promise<boolean> {
        return await this.elementHelper.isElementDisplayed(this.locators.addCustomerButton);
    }  

    public async getAlertTextAndAccept(): Promise<string> {
        return await this.alertHelper.getAlertText();
    }

    public async getFirstNameFieldValidationMessage(): Promise<string> {
        return await this.locators.firstNameElement.evaluate(
            (input: HTMLInputElement) => input.validationMessage
    )};

    public async getLastNameFieldValidationMessage(): Promise<string> {
        return await this.locators.lastNameElement.evaluate(
            (input: HTMLInputElement) => input.validationMessage
    )};

    public async getPostCodeFieldValidationMessage(): Promise<string> {
        return await this.locators.postCodeElement.evaluate(
            (input: HTMLInputElement) => input.validationMessage
    )};
}
