"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaTest_openGraphAndTwitterCards = SocialMediaTest_openGraphAndTwitterCards;
const TestsHelper_1 = require("../../helpers/TestsHelper.js");
function SocialMediaTest_openGraphAndTwitterCards(playwrightTest, expectedValue) {
    const { test, expect } = playwrightTest;
    test('should have title og tag', async ({ page }) => {
        test.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogTitle));
        const ogTitle = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:title"]');
        expect(ogTitle).toBeTruthy();
        expect(ogTitle).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogTitle);
    });
    test('should have description og tag', async ({ page }) => {
        test.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogDescription));
        const ogDescription = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:description"]');
        expect(ogDescription).toBeTruthy();
        expect(ogDescription).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogDescription);
    });
    test('should have image og tag', async ({ page }) => {
        test.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImage));
        const ogImage = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:image"]');
        expect(ogImage).toBeTruthy();
        expect(ogImage).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImage);
    });
    test('should have url og tag', async ({ page }) => {
        test.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogUrl));
        const ogUrl = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:url"]');
        expect(ogUrl).toBeTruthy();
        expect(ogUrl).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogUrl);
    });
    test('should have type og tag', async ({ page }) => {
        test.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogType));
        const ogType = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:type"]');
        expect(ogType).toBeTruthy();
        expect(ogType).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogType);
    });
    test('should have site_name og tag', async ({ page }) => {
        test.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogSiteName));
        const ogSiteName = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:site_name"]');
        expect(ogSiteName).toBeTruthy();
        expect(ogSiteName).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogSiteName);
    });
    test('should have locale og tag', async ({ page }) => {
        test.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogLocale));
        const ogLocale = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:locale"]');
        expect(ogLocale).toBeTruthy();
        expect(ogLocale).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogLocale);
    });
    test('should have image:url og tag', async ({ page }) => {
        test.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageUrl));
        const ogImageUrl = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:image:url"]');
        expect(ogImageUrl).toBeTruthy();
        expect(ogImageUrl).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageUrl);
    });
    test('should have image:type og tag', async ({ page }) => {
        test.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageType));
        const ogImageType = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:image:type"]');
        expect(ogImageType).toBeTruthy();
        expect(ogImageType).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageType);
    });
    test('should have image:width og tag', async ({ page }) => {
        test.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageWidth));
        const ogImageWidth = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:image:width"]');
        expect(ogImageWidth).toBeTruthy();
        expect(ogImageWidth).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageWidth);
    });
    test('should have image:height og tag', async ({ page }) => {
        test.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageHeight));
        const ogImageHeight = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[property="og:image:height"]');
        expect(ogImageHeight).toBeTruthy();
        expect(ogImageHeight).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.ogImageHeight);
    });
    test('should have twitter card meta tag', async ({ page }) => {
        test.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.twitterCard));
        const twitterCard = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[name="twitter:card"]');
        expect(twitterCard).toBeTruthy();
        expect(twitterCard).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.twitterCard);
    });
    test('should have twitter title meta tag', async ({ page }) => {
        test.skip(!(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.twitterTitle));
        const twitterTitle = await (0, TestsHelper_1.TestsHelper_getMetaContent)(page, 'meta[name="twitter:title"]');
        expect(twitterTitle).toBeTruthy();
        expect(twitterTitle).toBe(expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.twitterTitle);
    });
}
//# sourceMappingURL=socialMedia.test.js.map