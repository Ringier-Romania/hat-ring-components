import {Page, Locator, TestType} from 'playwright/test';
import {PlaywrightTest} from "../tests/types.js";
import {LogHelper_warn} from "./LogHelper";

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
                LogHelper_warn('Failed to parse JSON-LD:', e);
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

export async function TestsHelper_elementExists({page, playwrightTest, locatorOptions, selector, description} :{page: Page, playwrightTest: PlaywrightTest, description: string, selector: string, locatorOptions?: {
    has?: Locator;
    hasNot?: Locator;
    hasNotText?: string|RegExp;
    hasText?: string|RegExp;
}}): Promise<void> {
    await playwrightTest.test.step(description, async () => {
        await playwrightTest.expect(await page.locator(selector, locatorOptions).count()).toBeGreaterThan(0);
    })
}

export async function TestsHelper_elementNotEmpty({page, playwrightTest, description, selector, locatorOptions} : {page: Page, playwrightTest: PlaywrightTest, description: string, selector: string, locatorOptions?: {
        has?: Locator;
        hasNot?: Locator;
        hasNotText?: string|RegExp;
        hasText?: string|RegExp;
    }}): Promise<void> {
    await playwrightTest.test.step(description, async () => {
        await playwrightTest.expect(await page.locator(selector, locatorOptions)).not.toBeEmpty();
    })
}

export async function TestsHelper_elementContainsText({page, playwrightTest, description, selector, locatorOptions, expectedText}: {page: Page, playwrightTest: PlaywrightTest, description: string, selector: string, expectedText: string, locatorOptions?: {
        has?: Locator;
        hasNot?: Locator;
        hasNotText?: string|RegExp;
        hasText?: string|RegExp;
    }}): Promise<void> {
    await playwrightTest.test.step(description, async () => {
        await playwrightTest.expect(await page.locator(selector, locatorOptions)).toHaveText(expectedText);
    })
}

export function TestsHelper_attachDOMAtFailedTests({playwrightTest}: { playwrightTest: PlaywrightTest }) {
    playwrightTest.test.afterEach(async ({ page }) => {
        if (playwrightTest.test.info().error) {
            await playwrightTest.test.info().attach("DOM", {body: await page.content(), contentType: "text/html"});
        }
    })
}

/**
 * In K8s / CI environments, ocdn.eu may resolve to a private/local IP address.
 * Chromium's Private Network Access (PNA) blocks requests from a public origin
 * to local address space. This route handler intercepts matching requests and
 * fulfills them via Node.js fetch (which is not subject to CORS/PNA).
 *
 * Call this before page.goto() so that routes are registered before navigation.
 *
 * @param page      Playwright Page instance
 * @param domains   Glob patterns for domains to proxy (default: ['ocdn.eu'])
 */
export async function TestsHelper_setupPageRoutes(
    page: Page,
    {domains = ['ocdn.eu']}: { domains?: string[] } = {}
): Promise<void> {
    for (const domain of domains) {
        await page.route(`**://${domain}/**`, async (route) => {
            try {
                const url = route.request().url();
                const response = await fetch(url);
                const body = Buffer.from(await response.arrayBuffer());
                const headers: Record<string, string> = {};
                response.headers.forEach((value, key) => { headers[key] = value; });
                await route.fulfill({status: response.status, headers, body});
            } catch {
                await route.abort('connectionfailed');
            }
        });
    }
}
