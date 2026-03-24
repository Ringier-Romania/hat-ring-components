import {PlaywrightTest} from "../types";
import {TestsHelper_getMetaContent} from "../../helpers/TestsHelper";
import type {Page} from "playwright/test";

export async function TestSocialMedia_openGraphAndTwitterCards({page, playwrightTest, expectedValue} : {page: Page, playwrightTest: PlaywrightTest, expectedValue: {
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
    ogUrl?: string
    ogType?: string
    ogSiteName?: string
    ogImageUrl?: string
    ogImageSecureUrl?: string
    ogImageType?: string
    ogImageWidth?: string
    ogImageHeight?: string
    ogLocale?: string
    twitterCard?: string
    twitterTitle?: string
    twitterDescription?: string
}}) {
    const {test, expect} = playwrightTest;

    await playwrightTest.test.step('should have title og tag', async (step) => {
        step.skip(!expectedValue?.ogTitle);
        const ogTitle = await TestsHelper_getMetaContent(page, 'meta[property="og:title"]');
        expect(ogTitle).toBeTruthy();
        expect(ogTitle).toBe(expectedValue?.ogTitle);
    });
    await playwrightTest.test.step('should have description og tag', async (step) => {
        step.skip(!expectedValue?.ogDescription);
        const ogDescription = await TestsHelper_getMetaContent(page, 'meta[property="og:description"]');
        expect(ogDescription).toBeTruthy();
        expect(ogDescription).toBe(expectedValue?.ogDescription);
    });
    await playwrightTest.test.step('should have image og tag', async (step) => {
        step.skip(!expectedValue?.ogImage);
        const ogImage = await TestsHelper_getMetaContent(page, 'meta[property="og:image"]');
        expect(ogImage).toBeTruthy();
        expect(ogImage).toBe(expectedValue?.ogImage);
    });
    await playwrightTest.test.step('should have url og tag', async (step) => {
        step.skip(!expectedValue?.ogUrl);
        const ogUrl = await TestsHelper_getMetaContent(page, 'meta[property="og:url"]');
        expect(ogUrl).toBeTruthy();
        expect(ogUrl).toBe(expectedValue?.ogUrl);
    });
    await playwrightTest.test.step('should have type og tag', async (step) => {
        step.skip(!expectedValue?.ogType);
        const ogType = await TestsHelper_getMetaContent(page, 'meta[property="og:type"]');
        expect(ogType).toBeTruthy();
        expect(ogType).toBe(expectedValue?.ogType);
    });
    await playwrightTest.test.step('should have site_name og tag', async (step) => {
        step.skip(!expectedValue?.ogSiteName);
        const ogSiteName = await TestsHelper_getMetaContent(page, 'meta[property="og:site_name"]');
        expect(ogSiteName).toBeTruthy();
        expect(ogSiteName).toBe(expectedValue?.ogSiteName);
    });
    await playwrightTest.test.step('should have locale og tag', async (step) => {
        step.skip(!expectedValue?.ogLocale);
        const ogLocale = await TestsHelper_getMetaContent(page, 'meta[property="og:locale"]');
        expect(ogLocale).toBeTruthy();
        expect(ogLocale).toBe(expectedValue?.ogLocale);
    });
    await playwrightTest.test.step('should have image:url og tag', async (step) => {
        step.skip(!expectedValue?.ogImageUrl);
        const ogImageUrl = await TestsHelper_getMetaContent(page, 'meta[property="og:image:url"]');
        expect(ogImageUrl).toBeTruthy();
        expect(ogImageUrl).toBe(expectedValue?.ogImageUrl);
    });
    await playwrightTest.test.step('should have image:secure_url og tag', async (step) => {
        step.skip(!expectedValue?.ogImageSecureUrl);
        const ogImageSecureUrl = await TestsHelper_getMetaContent(page, 'meta[property="og:image:secure_url"]');
        expect(ogImageSecureUrl).toBeTruthy();
        expect(ogImageSecureUrl).toBe(expectedValue?.ogImageSecureUrl);
    });
    await playwrightTest.test.step('should have image:type og tag', async (step) => {
        step.skip(!expectedValue?.ogImageType);
        const ogImageType = await TestsHelper_getMetaContent(page, 'meta[property="og:image:type"]');
        expect(ogImageType).toBeTruthy();
        expect(ogImageType).toBe(expectedValue?.ogImageType);
    });
    await playwrightTest.test.step('should have image:width og tag', async (step) => {
        step.skip(!expectedValue?.ogImageWidth);
        const ogImageWidth = await TestsHelper_getMetaContent(page, 'meta[property="og:image:width"]');
        expect(ogImageWidth).toBeTruthy();
        expect(ogImageWidth).toBe(expectedValue?.ogImageWidth);
    });
    await playwrightTest.test.step('should have image:height og tag', async (step) => {
        step.skip(!expectedValue?.ogImageHeight);
        const ogImageHeight = await TestsHelper_getMetaContent(page, 'meta[property="og:image:height"]');
        expect(ogImageHeight).toBeTruthy();
        expect(ogImageHeight).toBe(expectedValue?.ogImageHeight);
    });

    await playwrightTest.test.step('should have twitter card meta tag', async (step) => {
        step.skip(!expectedValue?.twitterCard);
        const twitterCard = await TestsHelper_getMetaContent(page, 'meta[name="twitter:card"]');
        expect(twitterCard).toBeTruthy();
        expect(twitterCard).toBe(expectedValue?.twitterCard);
    });
    await playwrightTest.test.step('should have twitter title meta tag', async (step) => {
        step.skip(!expectedValue?.twitterTitle);
        const twitterTitle = await TestsHelper_getMetaContent(page, 'meta[name="twitter:title"]');
        expect(twitterTitle).toBeTruthy();
        expect(twitterTitle).toBe(expectedValue?.twitterTitle);
    });
    await playwrightTest.test.step('should have twitter description meta tag', async (step) => {
        step.skip(!expectedValue?.twitterDescription);
        const twitterDescription = await TestsHelper_getMetaContent(page, 'meta[name="twitter:description"]');
        expect(twitterDescription).toBeTruthy();
        expect(twitterDescription).toBe(expectedValue?.twitterDescription);
    });
}
