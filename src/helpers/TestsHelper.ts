import {Page, Locator} from 'playwright/test';
import {PlaywrightTest} from "../tests/types.js";

export async function TestsHelper_getMetaContent(page: Page, selector: string): Promise<string | null> {
    return await page.locator(selector).getAttribute('content');
}

export async function TestsHelper_getStructuredData(page: Page): Promise<any[]> {
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    const data: any[] = [];
    for (const script of scripts) {
        const content = await script.textContent();
        if (content) {
            try {
                data.push(JSON.parse(content));
            } catch (e) {
                console.warn('Failed to parse JSON-LD:', e);
            }
        }
    }
    return data;
}

export function TestsHelper_getUrl({url, withoutPort = false} : {url: string, withoutPort?: boolean}): string {
    const urlObj = new URL(url);
    if (process.env.NODE_ENV !== 'production') {
        return urlObj.href.replace(urlObj.origin, `${withoutPort ? 'http://localhost' : 'http://localhost:4321'}`);
    }

    if (process.env.ACCELERATOR_VARIANT_BASE64) {
        urlObj.searchParams.set('__acc_variant', process.env.ACCELERATOR_VARIANT_BASE64);
        return urlObj.href;
    }

    return url;
}

export function TestsHelper_elementExists({playwrightTest, locatorOptions, selector, description} :{playwrightTest: PlaywrightTest, description: string, selector: string, locatorOptions?: {
    has?: Locator;
    hasNot?: Locator;
    hasNotText?: string|RegExp;
    hasText?: string|RegExp;
}}): void {
    playwrightTest.test(description, async ({ page }) => {
        await playwrightTest.expect(await page.locator(selector, locatorOptions).count()).toBeGreaterThan(0);
    })
}

export function TestsHelper_elementNotEmpty({playwrightTest, description, selector, locatorOptions} : {playwrightTest: PlaywrightTest, description: string, selector: string, locatorOptions?: {
        has?: Locator;
        hasNot?: Locator;
        hasNotText?: string|RegExp;
        hasText?: string|RegExp;
    }}): void {
    playwrightTest.test(description, async ({ page }) => {
        await playwrightTest.expect(await page.locator(selector, locatorOptions)).not.toBeEmpty();
    })
}

export function TestsHelper_elementContainsText({playwrightTest, description, selector, locatorOptions, expectedText}: {playwrightTest: PlaywrightTest, description: string, selector: string, expectedText: string, locatorOptions?: {
    has?: Locator;
    hasNot?: Locator;
    hasNotText?: string|RegExp;
    hasText?: string|RegExp;
}}): void {
    playwrightTest.test(description, async ({ page }) => {
        await playwrightTest.expect(await page.locator(selector, locatorOptions)).toHaveText(expectedText);
    })
}