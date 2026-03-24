"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSocialMedia_openGraphAndTwitterCards = TestSocialMedia_openGraphAndTwitterCards;
const TestsHelper_1 = require("../../helpers/TestsHelper");
async function TestSocialMedia_openGraphAndTwitterCards({ page, playwrightTest, expectedValue }) {
    const { test, expect } = playwrightTest;
    await playwrightTest.test.step('should have title og tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogTitle));
        const ogTitle = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:title"]');
        expect(ogTitle).toBeTruthy();
        expect(ogTitle).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogTitle);
    });
    await playwrightTest.test.step('should have description og tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogDescription));
        const ogDescription = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:description"]');
        expect(ogDescription).toBeTruthy();
        expect(ogDescription).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogDescription);
    });
    await playwrightTest.test.step('should have image og tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImage));
        const ogImage = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:image"]');
        expect(ogImage).toBeTruthy();
        expect(ogImage).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImage);
    });
    await playwrightTest.test.step('should have url og tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogUrl));
        const ogUrl = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:url"]');
        expect(ogUrl).toBeTruthy();
        expect(ogUrl).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogUrl);
    });
    await playwrightTest.test.step('should have type og tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogType));
        const ogType = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:type"]');
        expect(ogType).toBeTruthy();
        expect(ogType).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogType);
    });
    await playwrightTest.test.step('should have site_name og tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogSiteName));
        const ogSiteName = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:site_name"]');
        expect(ogSiteName).toBeTruthy();
        expect(ogSiteName).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogSiteName);
    });
    await playwrightTest.test.step('should have locale og tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogLocale));
        const ogLocale = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:locale"]');
        expect(ogLocale).toBeTruthy();
        expect(ogLocale).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogLocale);
    });
    await playwrightTest.test.step('should have image:url og tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageUrl));
        const ogImageUrl = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:image:url"]');
        expect(ogImageUrl).toBeTruthy();
        expect(ogImageUrl).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageUrl);
    });
    await playwrightTest.test.step('should have image:secure_url og tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageSecureUrl));
        const ogImageSecureUrl = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:image:secure_url"]');
        expect(ogImageSecureUrl).toBeTruthy();
        expect(ogImageSecureUrl).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageSecureUrl);
    });
    await playwrightTest.test.step('should have image:type og tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageType));
        const ogImageType = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:image:type"]');
        expect(ogImageType).toBeTruthy();
        expect(ogImageType).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageType);
    });
    await playwrightTest.test.step('should have image:width og tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageWidth));
        const ogImageWidth = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:image:width"]');
        expect(ogImageWidth).toBeTruthy();
        expect(ogImageWidth).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageWidth);
    });
    await playwrightTest.test.step('should have image:height og tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageHeight));
        const ogImageHeight = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:image:height"]');
        expect(ogImageHeight).toBeTruthy();
        expect(ogImageHeight).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageHeight);
    });
    await playwrightTest.test.step('should have twitter card meta tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.twitterCard));
        const twitterCard = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[name="twitter:card"]');
        expect(twitterCard).toBeTruthy();
        expect(twitterCard).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.twitterCard);
    });
    await playwrightTest.test.step('should have twitter title meta tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.twitterTitle));
        const twitterTitle = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[name="twitter:title"]');
        expect(twitterTitle).toBeTruthy();
        expect(twitterTitle).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.twitterTitle);
    });
    await playwrightTest.test.step('should have twitter description meta tag', async (step) => {
        step.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.twitterDescription));
        const twitterDescription = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[name="twitter:description"]');
        expect(twitterDescription).toBeTruthy();
        expect(twitterDescription).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.twitterDescription);
    });
}
//# sourceMappingURL=socialMedia.test.js.map