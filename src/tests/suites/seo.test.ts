import {TestsHelper_getMetaContent, TestsHelper_getStructuredData} from '../../helpers/TestsHelper';
import {PlaywrightTest} from "../types.js";

export function SeoTest_pageTitle(playwrightTest: PlaywrightTest, expectedValue: string) {
    const {test, expect} = playwrightTest;
    test('should have valid title tag', async ({page}) => {
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title).not.toMatch(/undefined|null|NaN/);
        expect(await page.title()).toBe(expectedValue)
    });
}

export function SeoTest_pageDescription(playwrightTest: PlaywrightTest, expectedValue: string) {
    const {test, expect} = playwrightTest;
    test('should have meta description', async ({page}) => {
        test.skip(!expectedValue);
        const description = await TestsHelper_getMetaContent(page, 'meta[name="description"]');
        expect(description).toBeTruthy();
        expect(description).not.toMatch(/undefined|null|NaN/);
        expect(description).toBe(expectedValue)
    });
}

export function SeoTest_pageRobots(playwrightTest: PlaywrightTest, expectedValue: string) {
    const {test, expect} = playwrightTest;
    test('should have robots meta tag', async ({page}) => {
        const robots = await TestsHelper_getMetaContent(page, 'meta[name="robots"]');
        expect(robots).toBeTruthy();
        expect(robots).not.toMatch(/undefined|null|NaN/);
        expect(robots).toBe(expectedValue)
    });
}

export function SeoTest_canonical(playwrightTest: PlaywrightTest, expectedValue: string) {
    const {test, expect} = playwrightTest;
    test('should have canonical URL', async ({page}) => {
        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
        expect(canonical).toBeTruthy();
        expect(canonical).not.toMatch(/undefined|null|NaN/);
        expect(canonical).toBe(expectedValue);
    });
}

export function SeoTest_htmlLangAttribute(playwrightTest: PlaywrightTest, expectedValue: string) {
    const {test, expect} = playwrightTest;
    test('should have lang attribute', async ({page}) => {
        const lang = await page.locator('html').getAttribute('lang');
        expect(lang).toBeTruthy();
        expect(lang).not.toMatch(/undefined|null|NaN/);
        expect(lang).toBe(expectedValue);
    });
}

export function SeoTest_schemaOrg(playwrightTest: PlaywrightTest, expectedValue: any, compareMode: 'exact' | 'contains' = 'exact') {
    const {test, expect} = playwrightTest;
    test('should have Schema.org structured data', async ({page}) => {
        const schemas = await TestsHelper_getStructuredData(page);
        if (compareMode === 'exact') {
            expect(schemas).toEqual(expectedValue);
        } else {
            expect(schemas).toEqual(expect.arrayContaining(expectedValue.map((item: any) => expect.objectContaining(item))));
        }
    });
}

export function SeoTest_imageAlts(playwrightTest: PlaywrightTest) {
    const {test, expect} = playwrightTest;
    test('images should have alt', async ({page}) => {
        const images = await page.locator('img').all();

        for (const img of images) {
            const alt = await img.getAttribute('alt');
            expect(alt).not.toBeNull();
        }
    });
}

export function SeoTest_paginationLinks(playwrightTest: PlaywrightTest, expectedValue: {next?: string, prev?: string}) {
    const {test, expect} = playwrightTest;
    test('should have next/prev links', async ({page}) => {
        if (expectedValue?.next) {
            const nextLink = await page.locator('link[rel="next"]').getAttribute('href');
            expect(nextLink).toBeTruthy();
            expect(nextLink).not.toMatch(/undefined|null|NaN/);
            expect(nextLink).toBe(expectedValue.next);
        }
        if (expectedValue?.prev) {
            const prevLink = await page.locator('link[rel="prev"]').getAttribute('href');
            expect(prevLink).toBeTruthy();
            expect(prevLink).not.toMatch(/undefined|null|NaN/);
            expect(prevLink).toBe(expectedValue.prev);
        }
    });
}
