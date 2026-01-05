export async function TestsHelper_getMetaContent(page, selector) {
    return await page.locator(selector).getAttribute('content');
}
export async function TestsHelper_getStructuredData(page) {
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