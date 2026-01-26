import {PlaywrightTest} from "../types";
import {Locator} from "playwright";

export function TestPerformance_imagesLoadingStrategy(playwrightTest: PlaywrightTest, imageSrcToSkip: string[] = []) {
    const {test, expect} = playwrightTest;

    test('images should have lazy-loading or preload', async ({page}) => {
        const images = await page.locator('img').all();

        let lazyLoadedCount = 0;
        let preloadCount = 0;
        let skippedCount = 0;
        const imagesWithoutStrategy: string[] = [];

        for (const img of images) {
            const src = await img.getAttribute('src');
            if (src && imageSrcToSkip.some(skipSrc => src.includes(skipSrc))) {
                skippedCount++;
                continue;
            }

            const loading = await img.getAttribute('loading');
            if (loading === 'lazy') {
                lazyLoadedCount++;
            } else if (loading === 'eager') {
                const isPreloaded = await page.locator(`link[rel="preload"][as="image"][imagesrcset="${src}"]`).count();
                if (isPreloaded) {
                    preloadCount++;
                } else {
                    imagesWithoutStrategy.push(`img with src="${src || 'no src'}" has loading="eager" but no preload`);
                }
            } else {
                imagesWithoutStrategy.push(`img with src="${src || 'no src'}" has loading="${loading}"`);
            }
        }

        const expectedCount = images.length - skippedCount;
        expect(lazyLoadedCount + preloadCount, `Found ${images.length} images (${skippedCount} skipped), but only ${lazyLoadedCount + preloadCount} have proper loading strategy.\nImages without proper strategy:\n${imagesWithoutStrategy.join('\n')}`).toBe(expectedCount);
    });
}

export function TestPerformance_visibleIframesLazyLoading(playwrightTest: PlaywrightTest, iframeSrcToSkip: string[] = []) {
    const {test, expect} = playwrightTest;
    test('visible iframes should have lazy-loading', async ({page}) => {
        await page.waitForLoadState("domcontentloaded");
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        const iframes = await page.locator('iframe').all();
        const filteredIframes: Locator[] = [];

        for (const ifr of iframes) {
            const box = await ifr.boundingBox();
            if (box && box.height >= 30) {
                filteredIframes.push(ifr);
            }
        }

        let lazyLoadedCount = 0;
        let skippedCount = 0;
        const iframesWithoutLazy: string[] = [];

        for (const ifr of filteredIframes) {
            const src = await ifr.getAttribute('src');
            if (src && iframeSrcToSkip.some(skipSrc => src.includes(skipSrc))) {
                skippedCount++;
                continue;
            }

            const loading = await ifr.getAttribute('loading');
            if (loading === 'lazy') {
                lazyLoadedCount++;
            } else {
                iframesWithoutLazy.push(`iframe with src="${src || 'no src'}" has loading="${loading}"`);
            }
        }

        const expectedCount = filteredIframes.length - skippedCount;
        expect(lazyLoadedCount, `Found ${filteredIframes.length} visible iframes (${skippedCount} skipped), but only ${lazyLoadedCount} have lazy loading.\nIframes without lazy loading:\n${iframesWithoutLazy.join('\n')}`).toBe(expectedCount);
    });
}
