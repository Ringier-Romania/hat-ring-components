import {TestsHelper_getMetaContent, TestsHelper_getStructuredData} from '../../helpers/TestsHelper';
import {PlaywrightTest} from "../types.js";
import type {Page} from "playwright/test";

export async function TestSeo_pageTitle({page, playwrightTest, expectedValue} : {page: Page, playwrightTest: PlaywrightTest, expectedValue?: string}) {
    const { expect } = playwrightTest;
    await playwrightTest.test.step('should have valid title tag', async () => {
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title).not.toMatch(/\b(?:undefined|null|NaN)\b/);
        if(expectedValue) {
            expect(title).toBe(expectedValue)
        }
    });
}

export async function TestSeo_pageDescription({page, playwrightTest, expectedValue} : {page: Page, playwrightTest: PlaywrightTest, expectedValue?: string}) {
    const { expect } = playwrightTest;
    await playwrightTest.test.step('should have meta description', async () => {
        const description = await TestsHelper_getMetaContent(page, 'meta[name="description"]');
        expect(description).toBeTruthy();
        expect(description).not.toMatch(/\b(?:undefined|null|NaN)\b/);
        if(expectedValue) {
            expect(description).toBe(expectedValue)
        }
    });
}

export async function TestSeo_pageRobots({page, playwrightTest, expectedValue} : {page: Page, playwrightTest: PlaywrightTest, expectedValue?: string}) {
    const { expect } = playwrightTest;
    await playwrightTest.test.step('should have robots meta tag', async () => {
        const robots = await TestsHelper_getMetaContent(page, 'meta[name="robots"]');
        expect(robots).toBeTruthy();
        expect(robots).not.toMatch(/\b(?:undefined|null|NaN)\b/);
        if (expectedValue) {
            expect(robots).toBe(expectedValue)
        }
    });
}

export async function TestSeo_canonical({page, playwrightTest, expectedValue} : {page: Page, playwrightTest: PlaywrightTest, expectedValue?: string}) {
    const { expect } = playwrightTest;
    await playwrightTest.test.step('should have canonical URL', async () => {
        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
        expect(canonical).toBeTruthy();
        expect(canonical).not.toMatch(/\b(?:undefined|null|NaN)\b/);
        if (expectedValue) {
            expect(canonical).toBe(expectedValue);
        }
    });
}

export async function TestSeo_htmlLangAttribute({page, playwrightTest, expectedValue} : {page: Page, playwrightTest: PlaywrightTest, expectedValue?: string}) {
    const { expect } = playwrightTest;
    await playwrightTest.test.step('should have lang attribute', async () => {
        const lang = await page.locator('html').getAttribute('lang');
        expect(lang).toBeTruthy();
        expect(lang).not.toMatch(/\b(?:undefined|null|NaN)\b/);
        if (expectedValue) {
            expect(lang).toBe(expectedValue);
        }
    });
}

export async function TestSeo_schemaOrg({page, playwrightTest, expectedValue, compareMode = 'exact'} : {page: Page, playwrightTest: PlaywrightTest, expectedValue: any, compareMode?: 'exact' | 'contains'}) {
    const { expect } = playwrightTest;
    await playwrightTest.test.step('should have Schema.org structured data', async () => {
        const schemas = await TestsHelper_getStructuredData(page);

        if (compareMode === 'exact') {
            expect(schemas, `Expected exact match but got:\n${JSON.stringify(schemas, null, 2)}\nExpected:\n${JSON.stringify(expectedValue, null, 2)}`).toEqual(expectedValue);
        } else {
            expect(schemas, `Expected array containing items but got mismatch:\nActual:\n${JSON.stringify(schemas, null, 2)}\nExpected to contain:\n${JSON.stringify(expectedValue, null, 2)}`).toEqual(expect.arrayContaining(expectedValue.map((item: any) => expect.objectContaining(item))));
        }
    });
}

export async function TestSeo_imageAlts({page, playwrightTest, imageSrcToSkip = []} : {page: Page, playwrightTest: PlaywrightTest, imageSrcToSkip?: string[]}) {
    const { expect } = playwrightTest;
    await playwrightTest.test.step('images should have alt', async () => {
        const images = await page.locator('img:visible').all();
        let skippedCount = 0;
        const imagesWithoutAlt: string[] = [];

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

export async function TestSeo_paginationLinks({page, playwrightTest, expectedValue} : {page: Page, playwrightTest: PlaywrightTest, expectedValue: {next?: string, prev?: string}}) {
    const { expect } = playwrightTest;
    await playwrightTest.test.step('should have next/prev links', async () => {
        if (expectedValue?.next) {
            const nextLink = await page.locator('link[rel="next"]').getAttribute('href');
            expect(nextLink).toBeTruthy();
            expect(nextLink).not.toMatch(/\b(?:undefined|null|NaN)\b/);
            expect(nextLink).toBe(expectedValue.next);
        }
        if (expectedValue?.prev) {
            const prevLink = await page.locator('link[rel="prev"]').getAttribute('href');
            expect(prevLink).toBeTruthy();
            expect(prevLink).not.toMatch(/\b(?:undefined|null|NaN)\b/);
            expect(prevLink).toBe(expectedValue.prev);
        }
    });
}
