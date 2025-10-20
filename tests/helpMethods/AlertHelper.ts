import { Page, Dialog } from '@playwright/test';

export class AlertHelper {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private async waitForAlertVisible(): Promise<Dialog> {
        const dialog = await this.page.waitForEvent('dialog', { timeout: 10000 });
        return dialog;
    }

    public async acceptAlert(): Promise<string> {
        const dialog = await this.waitForAlertVisible();
        const alertText = dialog.message();
        console.log(`Alert text: ${alertText}`);
        await dialog.accept();
        return alertText;
    }

    public async getAlertText(): Promise<string> {
        const dialog = await this.waitForAlertVisible();
        const alertText = dialog.message();
        return alertText;
    }
}
