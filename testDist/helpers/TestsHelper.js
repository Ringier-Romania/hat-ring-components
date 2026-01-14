"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestsHelper_getMetaContent = TestsHelper_getMetaContent;
exports.TestsHelper_getStructuredData = TestsHelper_getStructuredData;
exports.TestsHelper_getUrl = TestsHelper_getUrl;
exports.TestsHelper_elementExists = TestsHelper_elementExists;
exports.TestsHelper_elementNotEmpty = TestsHelper_elementNotEmpty;
exports.TestsHelper_elementContainsText = TestsHelper_elementContainsText;
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
                console.warn('Failed to parse JSON-LD:', e);
            }
        }
    }
    return data;
}
function TestsHelper_getUrl(url) {
    const urlObj = new URL(url);
    if (process.env.NODE_ENV !== 'production') {
        return urlObj.href.replace(urlObj.origin, 'http://localhost:4321');
    }
    if (process.env.ACCELERATOR_VARIANT_BASE64) {
        urlObj.searchParams.set('__acc_variant', process.env.ACCELERATOR_VARIANT_BASE64);
        return urlObj.href;
    }
    return url;
}
function TestsHelper_elementExists(playwrightTest, description, selector) {
    playwrightTest.test(description, async ({ page }) => {
        playwrightTest.expect(await page.locator(selector).count()).toBeGreaterThan(0);
    });
}
function TestsHelper_elementNotEmpty(playwrightTest, description, selector) {
    playwrightTest.test(description, async ({ page }) => {
        await playwrightTest.expect(page.locator(selector)).not.toBeEmpty();
    });
}
function TestsHelper_elementContainsText(playwrightTest, description, selector, expectedText) {
    playwrightTest.test(description, async ({ page }) => {
        await playwrightTest.expect(page.locator(selector)).toHaveText(expectedText);
    });
}
//# sourceMappingURL=TestsHelper.js.map