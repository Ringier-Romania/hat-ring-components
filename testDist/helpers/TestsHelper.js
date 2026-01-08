"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestsHelper_getMetaContent = TestsHelper_getMetaContent;
exports.TestsHelper_getStructuredData = TestsHelper_getStructuredData;
exports.TestsHelper_getUrl = TestsHelper_getUrl;
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
//# sourceMappingURL=TestsHelper.js.map