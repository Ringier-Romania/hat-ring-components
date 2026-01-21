"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSeo_pageTitle = TestSeo_pageTitle;
exports.TestSeo_pageDescription = TestSeo_pageDescription;
exports.TestSeo_pageRobots = TestSeo_pageRobots;
exports.TestSeo_canonical = TestSeo_canonical;
exports.TestSeo_htmlLangAttribute = TestSeo_htmlLangAttribute;
exports.TestSeo_schemaOrg = TestSeo_schemaOrg;
exports.TestSeo_imageAlts = TestSeo_imageAlts;
exports.TestSeo_paginationLinks = TestSeo_paginationLinks;
const TestsHelper_1 = require("../../helpers/TestsHelper");
function TestSeo_pageTitle(playwrightTest, expectedValue) {
    const { test, expect } = playwrightTest;
    test('should have valid title tag', async ({ page }) => {
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title).not.toMatch(/undefined|null|NaN/);
        expect(title).toBe(expectedValue);
    });
}
function TestSeo_pageDescription(playwrightTest, expectedValue) {
    const { test, expect } = playwrightTest;
    test('should have meta description', async ({ page }) => {
        test.skip(!expectedValue);
        const description = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[name="description"]');
        expect(description).toBeTruthy();
        expect(description).not.toMatch(/undefined|null|NaN/);
        expect(description).toBe(expectedValue);
    });
}
function TestSeo_pageRobots(playwrightTest, expectedValue) {
    const { test, expect } = playwrightTest;
    test('should have robots meta tag', async ({ page }) => {
        const robots = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[name="robots"]');
        expect(robots).toBeTruthy();
        expect(robots).not.toMatch(/undefined|null|NaN/);
        expect(robots).toBe(expectedValue);
    });
}
function TestSeo_canonical(playwrightTest, expectedValue) {
    const { test, expect } = playwrightTest;
    test('should have canonical URL', async ({ page }) => {
        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
        expect(canonical).toBeTruthy();
        expect(canonical).not.toMatch(/undefined|null|NaN/);
        expect(canonical).toBe(expectedValue);
    });
}
function TestSeo_htmlLangAttribute(playwrightTest, expectedValue) {
    const { test, expect } = playwrightTest;
    test('should have lang attribute', async ({ page }) => {
        const lang = await page.locator('html').getAttribute('lang');
        expect(lang).toBeTruthy();
        expect(lang).not.toMatch(/undefined|null|NaN/);
        expect(lang).toBe(expectedValue);
    });
}
function TestSeo_schemaOrg(playwrightTest, expectedValue, compareMode = 'exact') {
    const { test, expect } = playwrightTest;
    test('should have Schema.org structured data', async ({ page }) => {
        const schemas = await (0, TestsHelper_1.TestsHelper_getStructuredData)(page);
        if (compareMode === 'exact') {
            expect(schemas, `Expected exact match but got:\n${JSON.stringify(schemas, null, 2)}\nExpected:\n${JSON.stringify(expectedValue, null, 2)}`).toEqual(expectedValue);
        }
        else {
            expect(schemas, `Expected array containing items but got mismatch:\nActual:\n${JSON.stringify(schemas, null, 2)}\nExpected to contain:\n${JSON.stringify(expectedValue, null, 2)}`).toEqual(expect.arrayContaining(expectedValue.map((item) => expect.objectContaining(item))));
        }
    });
}
function TestSeo_imageAlts(playwrightTest, imageSrcToSkip = []) {
    const { test, expect } = playwrightTest;
    test('images should have alt', async ({ page }) => {
        const images = await page.locator('img').all();
        let skippedCount = 0;
        const imagesWithoutAlt = [];
        for (const img of images) {
            const src = await img.getAttribute('src');
            if (src && imageSrcToSkip.some(skipSrc => src.includes(skipSrc))) {
                skippedCount++;
                continue;
            }
            const alt = await img.getAttribute('alt');
            if (alt === null) {
                imagesWithoutAlt.push(`img with src="${src || 'no src'}" has no alt attribute`);
            }
        }
        expect(imagesWithoutAlt.length, `Found ${images.length} images (${skippedCount} skipped), but ${imagesWithoutAlt.length} are missing alt attribute.\nImages without alt:\n${imagesWithoutAlt.join('\n')}`).toBe(0);
    });
}
function TestSeo_paginationLinks(playwrightTest, expectedValue) {
    const { test, expect } = playwrightTest;
    test('should have next/prev links', async ({ page }) => {
        if (expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.next) {
            const nextLink = await page.locator('link[rel="next"]').getAttribute('href');
            expect(nextLink).toBeTruthy();
            expect(nextLink).not.toMatch(/undefined|null|NaN/);
            expect(nextLink).toBe(expectedValue.next);
        }
        if (expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.prev) {
            const prevLink = await page.locator('link[rel="prev"]').getAttribute('href');
            expect(prevLink).toBeTruthy();
            expect(prevLink).not.toMatch(/undefined|null|NaN/);
            expect(prevLink).toBe(expectedValue.prev);
        }
    });
}
//# sourceMappingURL=seo.test.js.map