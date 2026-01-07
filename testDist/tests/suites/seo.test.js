"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoTest_pageTitle = SeoTest_pageTitle;
exports.SeoTest_pageDescription = SeoTest_pageDescription;
exports.SeoTest_pageRobots = SeoTest_pageRobots;
exports.SeoTest_canonical = SeoTest_canonical;
exports.SeoTest_htmlLangAttribute = SeoTest_htmlLangAttribute;
exports.SeoTest_schemaOrg = SeoTest_schemaOrg;
exports.SeoTest_imageAlts = SeoTest_imageAlts;
exports.SeoTest_paginationLinks = SeoTest_paginationLinks;
const TestsHelper_1 = require("../../helpers/TestsHelper");
function SeoTest_pageTitle(playwrightTest, expectedValue) {
    const { test, expect } = playwrightTest;
    test('should have valid title tag', async ({ page }) => {
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title).not.toMatch(/undefined|null|NaN/);
        expect(await page.title()).toBe(expectedValue);
    });
}
function SeoTest_pageDescription(playwrightTest, expectedValue) {
    const { test, expect } = playwrightTest;
    test('should have meta description', async ({ page }) => {
        test.skip(!expectedValue);
        const description = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[name="description"]');
        expect(description).toBeTruthy();
        expect(description).not.toMatch(/undefined|null|NaN/);
        expect(description).toBe(expectedValue);
    });
}
function SeoTest_pageRobots(playwrightTest, expectedValue) {
    const { test, expect } = playwrightTest;
    test('should have robots meta tag', async ({ page }) => {
        const robots = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[name="robots"]');
        expect(robots).toBeTruthy();
        expect(robots).not.toMatch(/undefined|null|NaN/);
        expect(robots).toBe(expectedValue);
    });
}
function SeoTest_canonical(playwrightTest, expectedValue) {
    const { test, expect } = playwrightTest;
    test('should have canonical URL', async ({ page }) => {
        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
        expect(canonical).toBeTruthy();
        expect(canonical).not.toMatch(/undefined|null|NaN/);
        expect(canonical).toBe(expectedValue);
    });
}
function SeoTest_htmlLangAttribute(playwrightTest, expectedValue) {
    const { test, expect } = playwrightTest;
    test('should have lang attribute', async ({ page }) => {
        const lang = await page.locator('html').getAttribute('lang');
        expect(lang).toBeTruthy();
        expect(lang).not.toMatch(/undefined|null|NaN/);
        expect(lang).toBe(expectedValue);
    });
}
function SeoTest_schemaOrg(playwrightTest, expectedValue) {
    const { test, expect } = playwrightTest;
    test('should have Schema.org structured data', async ({ page }) => {
        const schemas = await (0, TestsHelper_1.TestsHelper_getStructuredData)(page);
        expect(schemas).toEqual(expectedValue);
    });
}
function SeoTest_imageAlts(playwrightTest) {
    const { test, expect } = playwrightTest;
    test('images should have alt', async ({ page }) => {
        const images = await page.locator('img').all();
        for (const img of images) {
            const alt = await img.getAttribute('alt');
            expect(alt).not.toBeNull();
        }
    });
}
function SeoTest_paginationLinks(playwrightTest, expectedValue) {
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