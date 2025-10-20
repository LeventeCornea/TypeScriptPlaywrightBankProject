import { Page, Locator, expect } from '@playwright/test';

export class ElementHelper {
    constructor(private page: Page) {}

    private getLocator(locator: string | Locator): Locator {
        return typeof locator === 'string' ? this.page.locator(locator) : locator;
    }
    
    public async clickLocator(locator: Locator): Promise<void> {
        await locator.click();
    }

    public async clickJS(locator: Locator): Promise<void> {
        await locator.evaluate((el) => (el as HTMLElement).click());
    }

    public async waitForElementVisible(locator: string | Locator): Promise<void> {
        const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
        await element.waitFor({ state: 'visible', timeout: 10000 });
    }

    public async fill(locator: Locator, value: string): Promise<void> {
        const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
        await element.fill(value);
    }


    public async selectByVisibleText(locator: Locator, value: string): Promise<void> {
        await locator.selectOption({ label: value });
    }

    public async isElementDisplayed(selectorOrLocator: string | Locator): Promise<boolean> {
        if (typeof selectorOrLocator === 'string') {
            return await this.page.isVisible(selectorOrLocator);
        } else {
            return await selectorOrLocator.isVisible();
        }
    }

    public async clearFieldWithBackspace(locator: Locator): Promise<void> {
        await locator.press('Control+A');
        await locator.press('Backspace');
    }

    public async validateContainTextLocator(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });

        const text = await locator.textContent();
        if (!text) {
            throw new Error(`Element text is empty or not found for locator: ${locator}`);
        }

        expect(text).toContain(value);
    }
}
