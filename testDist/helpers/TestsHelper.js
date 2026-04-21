"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestsHelper_getMetaContent = TestsHelper_getMetaContent;
exports.TestsHelper_getStructuredData = TestsHelper_getStructuredData;
exports.TestsHelper_getUrl = TestsHelper_getUrl;
exports.TestsHelper_elementExists = TestsHelper_elementExists;
exports.TestsHelper_elementNotEmpty = TestsHelper_elementNotEmpty;
exports.TestsHelper_elementContainsText = TestsHelper_elementContainsText;
exports.TestsHelper_attachDOMAtFailedTests = TestsHelper_attachDOMAtFailedTests;
const LogHelper_1 = require("./LogHelper");
async function TestsHelper_getMetaContent(page, selector) {
    return await page.locator(selector).getAttribute('content');
}
async function TestsHelper_getStructuredData(page) {
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    const data = [];
    for (const script of scripts) {
        const content = await script.textContent();
        if (content) {
            try {
                data.push(JSON.parse(content));
            }
            catch (e) {
                (0, LogHelper_1.LogHelper_warn)('Failed to parse JSON-LD:', e);
            }
        }
    }
    return data;
}
function TestsHelper_getUrl({ url, withoutPort = false }) {
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
async function TestsHelper_elementExists({ page, playwrightTest, locatorOptions, selector, description }) {
    await playwrightTest.test.step(description, async () => {
        await playwrightTest.expect(await page.locator(selector, locatorOptions).count()).toBeGreaterThan(0);
    });
}
async function TestsHelper_elementNotEmpty({ page, playwrightTest, description, selector, locatorOptions }) {
    await playwrightTest.test.step(description, async () => {
        await playwrightTest.expect(await page.locator(selector, locatorOptions)).not.toBeEmpty();
    });
}
async function TestsHelper_elementContainsText({ page, playwrightTest, description, selector, locatorOptions, expectedText }) {
    await playwrightTest.test.step(description, async () => {
        await playwrightTest.expect(await page.locator(selector, locatorOptions)).toHaveText(expectedText);
    });
}
function TestsHelper_attachDOMAtFailedTests({ playwrightTest }) {
    playwrightTest.test.afterEach(async ({ page }) => {
        if (playwrightTest.test.info().error) {
            await playwrightTest.test.info().attach("DOM", { body: await page.content(), contentType: "text/html" });
        }
    });
}
//# sourceMappingURL=TestsHelper.js.map