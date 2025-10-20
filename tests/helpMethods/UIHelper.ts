import { Locator, expect } from '@playwright/test';

type CssProperties = Record<string, string>;

export class UIHelper {
    
    public static async validateCssProperties(locator: Locator, expectedProperties: CssProperties): Promise<void> {
        
        for (const [property, expectedValue] of Object.entries(expectedProperties)) {
            
            const actualValue = await locator.evaluate((element, prop) => {
                return window.getComputedStyle(element).getPropertyValue(prop);
            }, property);

            if (actualValue !== expectedValue) {
                 throw new Error(
                    "Mismatch for CSS property: " + property +
                    " | Expected: " + expectedValue +
                    " | Found: " + actualValue
                );
            }
        }
    }
}