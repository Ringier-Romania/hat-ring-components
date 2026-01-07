"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceTest_imagesLoadingStrategy = PerformanceTest_imagesLoadingStrategy;
exports.PerformanceTest_visibleIframesLazyLoading = PerformanceTest_visibleIframesLazyLoading;
function PerformanceTest_imagesLoadingStrategy(playwrightTest) {
    const { test, expect } = playwrightTest;
    test('images should have lazy-loading or preload', async ({ page }) => {
        const images = await page.locator('img').all();
        let lazyLoadedCount = 0;
        let preloadCount = 0;
        for (const img of images) {
            const loading = await img.getAttribute('loading');
            if (loading === 'lazy') {
                lazyLoadedCount++;
            }
            if (loading === 'eager') {
                const isPreloaded = await page.locator(`link[rel="preload"][as="image"][imagesrcset="${await img.getAttribute('src')}"]`).count();
                if (isPreloaded) {
                    preloadCount++;
                }
            }
        }
        expect(lazyLoadedCount + preloadCount).toBe(images.length);
    });
}
function PerformanceTest_visibleIframesLazyLoading(playwrightTest) {
    const { test, expect } = playwrightTest;
    test('visible iframes should have lazy-loading', async ({ page }) => {
        await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
        const iframes = await page.locator('iframe').all();
        const filteredIframes = iframes.filter(async (ifr) => {
            return await ifr.isVisible();
        });
        let lazyLoadedCount = 0;
        for (const ifr of filteredIframes) {
            const loading = await ifr.getAttribute('loading');
            if (loading === 'lazy') {
                lazyLoadedCount++;
            }
        }
        expect(lazyLoadedCount).toBe(filteredIframes.length);
    });
}
//# sourceMappingURL=performance.test.js.map