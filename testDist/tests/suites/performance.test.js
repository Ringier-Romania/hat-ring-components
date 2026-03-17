"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestPerformance_imagesLoadingStrategy = TestPerformance_imagesLoadingStrategy;
exports.TestPerformance_visibleIframesLazyLoading = TestPerformance_visibleIframesLazyLoading;
async function TestPerformance_imagesLoadingStrategy({ page, playwrightTest, imageSrcToSkip = [] }) {
    const { expect } = playwrightTest;
    await playwrightTest.test.step('images should have lazy-loading or preload', async () => {
        const images = await page.locator('img:visible').all();
        let lazyLoadedCount = 0;
        let preloadCount = 0;
        let skippedCount = 0;
        const imagesWithoutStrategy = [];
        for (const img of images) {
            const src = await img.getAttribute('src');
            if (src && imageSrcToSkip.some(skipSrc => src.includes(skipSrc))) {
                skippedCount++;
                continue;
            }
            const loading = await img.getAttribute('loading');
            if (loading === 'lazy') {
                lazyLoadedCount++;
            }
            else if (loading === 'eager') {
                const isPreloaded = await page.locator(`link[rel="preload"][as="image"][imagesrcset="${src}"]`).count();
                if (isPreloaded) {
                    preloadCount++;
                }
                else {
                    imagesWithoutStrategy.push(`img with src="${src || 'no src'}" has loading="eager" but no preload`);
                }
            }
            else {
                imagesWithoutStrategy.push(`img with src="${src || 'no src'}" has loading="${loading}"`);
            }
        }
        const expectedCount = images.length - skippedCount;
        expect(lazyLoadedCount + preloadCount, `Found ${images.length} images (${skippedCount} skipped), but only ${lazyLoadedCount + preloadCount} have proper loading strategy.\nImages without proper strategy:\n${imagesWithoutStrategy.join('\n')}`).toBe(expectedCount);
    });
}
async function TestPerformance_visibleIframesLazyLoading({ page, playwrightTest, iframeSrcToSkip = [] }) {
    const { expect } = playwrightTest;
    await playwrightTest.test.step('visible iframes should have lazy-loading', async () => {
        await page.waitForLoadState("load");
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        const iframes = await page.locator('iframe:visible').all();
        const filteredIframes = [];
        for (const ifr of iframes) {
            const box = await ifr.boundingBox();
            if (box && box.height >= 30) {
                filteredIframes.push(ifr);
            }
        }
        let lazyLoadedCount = 0;
        let skippedCount = 0;
        const iframesWithoutLazy = [];
        for (const ifr of filteredIframes) {
            const src = await ifr.getAttribute('src');
            if (!src) {
                skippedCount++;
                continue;
            }
            if (iframeSrcToSkip.some(skipSrc => src.includes(skipSrc))) {
                skippedCount++;
                continue;
            }
            const loading = await ifr.getAttribute('loading');
            if (loading === 'lazy') {
                lazyLoadedCount++;
            }
            else {
                iframesWithoutLazy.push(`iframe with src="${src}" has loading="${loading}"`);
            }
        }
        const expectedCount = filteredIframes.length - skippedCount;
        expect(lazyLoadedCount, `Found ${filteredIframes.length} visible iframes (${skippedCount} skipped), but only ${lazyLoadedCount} have lazy loading.\nIframes without lazy loading:\n${iframesWithoutLazy.join('\n')}`).toBe(expectedCount);
    });
}
//# sourceMappingURL=performance.test.js.map