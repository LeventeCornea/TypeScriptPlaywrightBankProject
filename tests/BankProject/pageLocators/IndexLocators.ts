import { Page, Locator } from '@playwright/test';

export class IndexPage {
    
    public readonly bankManagerLoginMenu: Locator;
    public readonly customerLoginMenu: Locator;
    public readonly homePageButton: Locator;
    public readonly logo: Locator;
    public readonly topBackgroundDisplayed: Locator;
    public readonly mainBackgroundDisplayed: Locator;
    public readonly header: Locator;
    public readonly contentWindow: Locator;

    constructor(page: Page) {
        
        this.bankManagerLoginMenu = page.getByRole('button', { name: 'Bank Manager Login' }); 
        this.customerLoginMenu = page.getByRole('button', { name: 'Customer Login' });
        this.homePageButton = page.getByRole('button', { name: 'Home' });
        this.logo = page.locator('strong');
        this.topBackgroundDisplayed = page.locator('div.box.mainhdr');
        this.mainBackgroundDisplayed = page.locator('.borderM.box.padT20');
        this.header = page.locator('.box.mainhdr');
        this.contentWindow = page.locator('.borderM.box.padT20');
    }
    
    public async goToBankManagerLogin(): Promise<void> {
        await this.bankManagerLoginMenu.click();
    }
}