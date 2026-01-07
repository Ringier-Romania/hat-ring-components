"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestsHelper_getMetaContent = TestsHelper_getMetaContent;
exports.TestsHelper_getStructuredData = TestsHelper_getStructuredData;
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
//# sourceMappingURL=TestsHelper.js.map